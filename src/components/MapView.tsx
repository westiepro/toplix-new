"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Property } from "@/lib/api";
import { MapControls } from "@/components/MapControls";
import { usePropertyImages } from "@/lib/api";
import { getSliderImage } from "@/lib/cloudinary";
import ReactDOM from "react-dom/client";
import { Heart, Share2 } from "lucide-react";
import { trackMapInteraction } from "@/lib/analytics-events";
import { formatPriceShort } from "@/lib/utils";
import { generateFallbackPropertyUrl } from "@/lib/generate-property-url";
import { useLanguage } from "@/contexts/LanguageContext";

type Bounds = { minLat: number; maxLat: number; minLng: number; maxLng: number };

export function MapView({
	properties,
	onBoundsChange,
	onMarkerHover,
	onMarkerClick,
	selectedProperty,
	highlightedId,
	location,
}: {
	properties: Property[];
	onBoundsChange?: (b: Bounds) => void;
	onMarkerHover?: (id: string | null) => void;
	onMarkerClick?: (id: string | null) => void;
	selectedProperty?: Property | null;
	highlightedId?: string | null;
	location?: { lat: number; lng: number; zoom: number } | null;
}) {
	const { currentLanguage } = useLanguage();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | maplibregl.Map | null>(null);
	const markersRef = useRef<Record<string, mapboxgl.Marker | maplibregl.Marker>>({});
	const popupRef = useRef<mapboxgl.Popup | maplibregl.Popup | null>(null);
	const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
	const [styleLoaded, setStyleLoaded] = useState(false);
	const [isSatellite, setIsSatellite] = useState(false);
	const lastLocationRef = useRef<{ lat: number; lng: number; zoom: number } | null>(null);
	const selectedPropertyRef = useRef<Property | null>(null);
	const lastZoomRef = useRef<number | null>(null);

	const isMapbox = Boolean(token);

	const VOYAGER_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
	const SATELLITE_STYLE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

	useEffect(() => {
		if (!containerRef.current || mapRef.current) return;
		if (isMapbox) {
			(mapboxgl as any).accessToken = token as string;
			mapRef.current = new mapboxgl.Map({
				container: containerRef.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [-8.3, 37.06],
				zoom: 9,
			});
		} else {
			mapRef.current = new maplibregl.Map({
				container: containerRef.current,
				style: VOYAGER_STYLE,
				center: [-8.3, 37.06],
				zoom: 9,
			});
		}
		(mapRef.current as any).on("load", () => {
			setStyleLoaded(true);
			
			// Fit bounds to show all properties on initial load
			if (properties.length > 1) {
				const map = mapRef.current as any;
				const bounds = new (isMapbox ? mapboxgl.LngLatBounds : maplibregl.LngLatBounds)();
				properties.forEach(p => {
					bounds.extend([p.lng, p.lat]);
				});
				
				map.fitBounds(bounds, {
					padding: { top: 80, bottom: 80, left: 80, right: 80 },
					maxZoom: 14,
					duration: 1000,
				});
			}
		});
		;(mapRef.current as any).on("moveend", () => {
			const b = (mapRef.current as any).getBounds();
			onBoundsChange?.({ minLat: b.getSouth(), maxLat: b.getNorth(), minLng: b.getWest(), maxLng: b.getEast() });
			trackMapInteraction('pan');
		});
		;(mapRef.current as any).on("zoomend", () => {
			const zoom = (mapRef.current as any).getZoom();
			trackMapInteraction(zoom > (lastZoomRef.current || 9) ? 'zoom_in' : 'zoom_out', { zoom });
			lastZoomRef.current = zoom;
		});
		;(mapRef.current as any).on("click", (e: any) => {
			// Close popup only when not clicking on a marker element
			const target = (e && e.originalEvent && (e.originalEvent as any).target) as HTMLElement | undefined;
			if (target && (target as HTMLElement).closest?.(".map-price-marker")) {
				return;
			}
			onMarkerClick?.(null);
		});
		return () => {
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [isMapbox, token, onBoundsChange]);

	// Update selectedPropertyRef when selectedProperty changes
	useEffect(() => {
		selectedPropertyRef.current = selectedProperty || null;
	}, [selectedProperty]);

	useEffect(() => {
		if (!mapRef.current || !styleLoaded) return;
		// Update markers
		const map = mapRef.current as any;
		const existing = markersRef.current;
		const nextIds = new Set(properties.map((p) => p.id));
		
		// Remove any existing circle layers (not needed)
		if (map.getLayer('property-circle')) {
			map.removeLayer('property-circle');
		}
		if (map.getLayer('property-circle-outline')) {
			map.removeLayer('property-circle-outline');
		}
		if (map.getSource('property-circle')) {
			map.removeSource('property-circle');
		}
		
		for (const id of Object.keys(existing)) {
			if (!nextIds.has(id)) {
				existing[id].remove();
				delete existing[id];
			}
		}
		for (const p of properties) {
			if (existing[p.id]) continue;
			const el = document.createElement("div");
			el.style.cursor = "pointer";
			// Inner node receives visual styles so we don't clobber map's transform on the root
			const inner = document.createElement("div");
			inner.className = "map-price-marker rounded-md bg-blue-600 text-white text-xs font-semibold shadow px-1.5 py-0.5";
			inner.textContent = formatPriceShort(p.price);
			inner.style.transformOrigin = "bottom center";
			inner.style.willChange = "transform";
			el.appendChild(inner);
			el.addEventListener("mouseenter", () => {
				// Check current state using ref - don't trigger hover if a popup is open for any marker
				const currentSelected = selectedPropertyRef.current;
				if (!currentSelected || currentSelected.id === p.id) {
					onMarkerHover?.(p.id);
				}
			});
			el.addEventListener("mouseleave", () => {
				// Check current state using ref - only clear hover if no popup or popup is for different marker
				const currentSelected = selectedPropertyRef.current;
				if (!currentSelected || currentSelected.id !== p.id) {
					onMarkerHover?.(null);
				}
			});
			el.addEventListener("click", (evt) => { 
				(evt as MouseEvent).stopPropagation(); 
				trackMapInteraction('marker_click', { property_id: p.id });
				onMarkerClick?.(p.id); 
			});
			const marker = new (isMapbox ? (mapboxgl as any).Marker : (maplibregl as any).Marker)({ element: el, anchor: "bottom" })
				.setLngLat([p.lng, p.lat])
				.addTo(map);
			existing[p.id] = marker;
		}
		// Highlight - only highlight if no popup is open or if highlighting the marker with the popup
		const currentSelected = selectedPropertyRef.current;
		for (const p of properties) {
			const root = markersRef.current[p.id]?.getElement?.();
			if (!root) continue;
			const inner = root.firstElementChild as HTMLElement | null;
			if (!inner) continue;
			// Only apply highlight if no popup is open, or if this is the marker with the popup
			const shouldHighlight = p.id === highlightedId && (!currentSelected || currentSelected.id === p.id);
			inner.style.transform = shouldHighlight ? "scale(1.05)" : "scale(1)";
			inner.style.opacity = shouldHighlight ? "0.98" : "1";
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [properties.length, highlightedId, selectedProperty?.id, isMapbox, onMarkerClick, onMarkerHover, styleLoaded]);

	// Manage popup for selected property
	useEffect(() => {
		if (!mapRef.current || !styleLoaded) return;
		// Clear existing popup
		popupRef.current?.remove();
		popupRef.current = null;
		if (!selectedProperty) return;
		
		const map = mapRef.current as any;
		
		// Calculate optimal popup position based on marker location
		const calculatePopupPosition = (lng: number, lat: number) => {
			const buffer = 20;
			const popupWidth = 220;
			const popupHeight = 200; // approximate height
			
			try {
				const markerPoint = map.project([lng, lat]);
				const container = map.getContainer().getBoundingClientRect();
				const containerWidth = container.width;
				const containerHeight = container.height;
				
				let anchor: "top" | "bottom" | "left" | "right" = "bottom";
				let offset: [number, number] = [0, 12];
				
				// Check vertical position
				if (markerPoint.y < buffer * 3) {
					// Near top edge, show popup below
					anchor = "top";
					offset = [0, 12];
				} else if (markerPoint.y > containerHeight - buffer * 3) {
					// Near bottom edge, show popup above
					anchor = "bottom";
					offset = [0, 12];
				}
				
				// Check horizontal position
				if (markerPoint.x < buffer * 2 + popupWidth) {
					// Near left edge, show popup to the right
					if (anchor === "top" || anchor === "bottom") {
						anchor = markerPoint.y < containerHeight / 2 ? "top" : "bottom";
					}
					offset[0] = 12;
				} else if (markerPoint.x > containerWidth - buffer * 2 - popupWidth) {
					// Near right edge, show popup to the left
					if (anchor === "top" || anchor === "bottom") {
						anchor = markerPoint.y < containerHeight / 2 ? "top" : "bottom";
					}
					offset[0] = -12;
				}
				
				// Refine anchor based on available space
				const spaceAbove = markerPoint.y;
				const spaceBelow = containerHeight - markerPoint.y;
				const spaceLeft = markerPoint.x;
				const spaceRight = containerWidth - markerPoint.x;
				
				if (spaceAbove < popupHeight + buffer && spaceBelow > popupHeight + buffer) {
					anchor = "top";
					offset[1] = 12;
				} else if (spaceBelow < popupHeight + buffer && spaceAbove > popupHeight + buffer) {
					anchor = "bottom";
					offset[1] = 12;
				} else if (spaceLeft < popupWidth + buffer && spaceRight > popupWidth + buffer) {
					anchor = "right";
					offset = [12, 0];
				} else if (spaceRight < popupWidth + buffer && spaceLeft > popupWidth + buffer) {
					anchor = "left";
					offset = [-12, 0];
				}
				
				return { anchor, offset };
			} catch (e) {
				// Fallback to default if projection fails
				return { anchor: "bottom" as const, offset: [0, 12] as [number, number] };
			}
		};
		
		// Function to update popup position
		const updatePopupPosition = () => {
			if (!popupRef.current || !selectedProperty) return;
			
			const { anchor, offset } = calculatePopupPosition(selectedProperty.lng, selectedProperty.lat);
			
			// Get the HTML content from the current popup
			const popupElement = popupRef.current.getElement();
			const oldContent = popupElement?.querySelector(".mapboxgl-popup-content") || popupElement?.querySelector(".maplibregl-popup-content");
			if (oldContent) {
				const htmlContent = (oldContent as HTMLElement).innerHTML;
				popupRef.current.remove();
				
				const newContent = document.createElement("div");
				newContent.className = "w-[220px] transition-opacity duration-200";
				newContent.style.opacity = "1";
				newContent.innerHTML = htmlContent;
				
				const PopupClass = isMapbox ? (mapboxgl as any).Popup : (maplibregl as any).Popup;
				const popup = new PopupClass({ closeButton: false, offset, anchor })
					.setLngLat([selectedProperty.lng, selectedProperty.lat])
					.setDOMContent(newContent)
					.addTo(map);
				popupRef.current = popup;
				
				// Reattach close button listener
				const closeBtn = newContent.querySelector("[data-close]");
				if (closeBtn) {
					(closeBtn as HTMLElement).addEventListener("click", () => onMarkerClick?.(null));
				}
			}
		};
		
		// Prevent popup position updates when hovering (only update on map move/zoom/resize, not on hover)
		
		const { anchor, offset } = calculatePopupPosition(selectedProperty.lng, selectedProperty.lat);
		
		const content = document.createElement("div");
		content.className = "w-[220px] transition-opacity duration-200";
		const propertyUrl = generateFallbackPropertyUrl(selectedProperty, currentLanguage);
		const isApproximate = (selectedProperty as any).show_exact_location === false;
		content.style.opacity = "0";
		content.innerHTML = `
			<div class="relative rounded-md overflow-hidden shadow-lg bg-white text-black transition-all duration-200">
				<div class="relative w-full h-[120px]"><img src="${selectedProperty.imageUrl}" alt="${selectedProperty.address}" style="width:100%;height:100%;object-fit:cover;" /></div>
				<div class="p-2">
					<div class="text-sm font-semibold">${formatPriceShort(selectedProperty.price)}</div>
					<div class="text-xs text-gray-600">${selectedProperty.address}, ${selectedProperty.city}</div>
					<div class="text-xs">${selectedProperty.beds} bd · ${selectedProperty.baths} ba · ${selectedProperty.area} sqft</div>
					<a href="${propertyUrl}" class="inline-block mt-2 text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition-colors">View details</a>
					${isApproximate ? `
						<div class="mt-2 pt-2 border-t border-gray-200 flex items-center gap-1.5 justify-center">
							<span class="w-2 h-2 bg-gray-500 rounded-full"></span>
							<span class="text-[10px] text-gray-500 italic">Approximated location</span>
						</div>
					` : ''}
				</div>
				<button data-close class="absolute right-1 top-1 h-6 w-6 rounded-full bg-white/90 text-black text-xs hover:bg-white transition-colors">×</button>
			</div>
		`;
		
		// Fade in animation
		setTimeout(() => {
			content.style.opacity = "1";
		}, 10);
		
		const PopupClass = isMapbox ? (mapboxgl as any).Popup : (maplibregl as any).Popup;
		const popup = new PopupClass({ closeButton: false, offset, anchor })
			.setLngLat([selectedProperty.lng, selectedProperty.lat])
			.setDOMContent(content)
			.addTo(map);
		popupRef.current = popup;
		
		const closeBtn = content.querySelector("[data-close]");
		closeBtn?.addEventListener("click", () => onMarkerClick?.(null));
		
		// Add event listeners for repositioning (only on map changes, not hover)
		const handleMove = () => {
			// Only update if popup is still for the same property
			if (selectedPropertyRef.current?.id === selectedProperty.id) {
				updatePopupPosition();
			}
		};
		const handleZoom = () => {
			if (selectedPropertyRef.current?.id === selectedProperty.id) {
				updatePopupPosition();
			}
		};
		const handleResize = () => {
			if (selectedPropertyRef.current?.id === selectedProperty.id) {
				updatePopupPosition();
			}
		};
		
		map.on("move", handleMove);
		map.on("zoom", handleZoom);
		window.addEventListener("resize", handleResize);
		
		return () => {
			popup.remove();
			popupRef.current = null;
			map.off("move", handleMove);
			map.off("zoom", handleZoom);
			window.removeEventListener("resize", handleResize);
		};
	}, [selectedProperty, isMapbox, styleLoaded, onMarkerClick, highlightedId]);

	// Zoom to selected location when city is selected
	useEffect(() => {
		if (!mapRef.current) {
			// Store location for when map is ready
			if (location) {
				lastLocationRef.current = location;
			}
			return;
		}

		// If location is cleared (null), reset the last location ref
		if (!location) {
			lastLocationRef.current = null;
			return;
		}

		// Check if this is a new location (avoid re-zooming to same location)
		const isNewLocation = !lastLocationRef.current || 
			lastLocationRef.current.lat !== location.lat || 
			lastLocationRef.current.lng !== location.lng ||
			lastLocationRef.current.zoom !== location.zoom;

		if (!isNewLocation) return;

		const map = mapRef.current as any;
		
		// Wait for map to be fully loaded before zooming
		const performZoom = () => {
			if (!mapRef.current) return;
			
			// Check if style is loaded
			if (!map.isStyleLoaded()) {
				// If style not loaded, wait for it
				map.once('load', performZoom);
				return;
			}
			
			// Smooth fly animation with easing
			map.flyTo({
				center: [location.lng, location.lat],
				zoom: location.zoom,
				duration: 2000, // Increased to 2 seconds for smoother effect
				essential: true,
				curve: 1.5, // More dramatic curve for the flight path
				speed: 1.2, // Slightly faster speed
				easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Custom easing function
			});
			
			lastLocationRef.current = location;
		};

		performZoom();
	}, [location, styleLoaded]);

	const toggleMapStyle = () => {
		if (!mapRef.current) return;
		
		const map = mapRef.current as any;
		
		if (isSatellite) {
			// Switch to Voyager (map view)
			if (isMapbox) {
				map.setStyle("mapbox://styles/mapbox/streets-v12");
			} else {
				map.setStyle(VOYAGER_STYLE);
			}
			setIsSatellite(false);
		} else {
			// Switch to Satellite view
			if (isMapbox) {
				map.setStyle("mapbox://styles/mapbox/satellite-streets-v12");
			} else {
				// Create satellite style for MapLibre
				map.setStyle({
					version: 8,
					sources: {
						"esri-satellite": {
							type: "raster",
							tiles: [SATELLITE_STYLE],
							tileSize: 256,
							attribution: "Powered by Esri"
						}
					},
					layers: [
						{
							id: "esri-satellite-layer",
							type: "raster",
							source: "esri-satellite",
							minzoom: 0,
							maxzoom: 22
						}
					]
				});
			}
			setIsSatellite(true);
		}
	};

	return (
		<div className="relative h-full w-full">
			<div ref={containerRef} className="h-full w-full" />
			
			{/* Map/Satellite Toggle Button */}
			<button
				onClick={toggleMapStyle}
				className="absolute top-4 left-4 z-10 px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
			>
				{isSatellite ? (
					<>
						<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
						</svg>
						Map
					</>
				) : (
					<>
						<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Satellite
					</>
				)}
			</button>
		</div>
	);
}

