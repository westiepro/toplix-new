"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FuzzyLocationMapProps {
	lat: number;
	lng: number;
	radius?: number; // in meters, default 1000 (1km)
}

export function FuzzyLocationMap({ lat, lng, radius = 1000 }: FuzzyLocationMapProps) {
	// Add random offset to circle center for privacy (so exact location isn't in center)
	// Offset is random within 0-800 meters in any direction
	const getOffsetCoordinates = (originalLat: number, originalLng: number) => {
		const offsetMeters = Math.random() * 800; // Random 0-800m
		const angle = Math.random() * 2 * Math.PI; // Random direction
		
		// Convert meters to degrees (approximate)
		const latOffset = (offsetMeters / 111320) * Math.cos(angle);
		const lngOffset = (offsetMeters / (111320 * Math.cos(originalLat * Math.PI / 180))) * Math.sin(angle);
		
		return {
			lat: originalLat + latOffset,
			lng: originalLng + lngOffset,
		};
	};
	
	const offsetCoords = getOffsetCoordinates(lat, lng);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | maplibregl.Map | null>(null);
	const [isSatellite, setIsSatellite] = useState(false);
	const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
	const isMapbox = token && token.length > 0;

	useEffect(() => {
		if (!containerRef.current) return;

		// Initialize map
		let map: mapboxgl.Map | maplibregl.Map;
		
		if (isMapbox && token) {
			(mapboxgl as any).accessToken = token;
			map = new (mapboxgl as any).Map({
				container: containerRef.current,
				center: [offsetCoords.lng, offsetCoords.lat], // Use offset center
				zoom: 12.5, // Zoomed in more to show 1km radius
				style: isSatellite 
					? "mapbox://styles/mapbox/satellite-streets-v12"
					: "mapbox://styles/mapbox/streets-v12",
			});
		} else {
			map = new (maplibregl as any).Map({
				container: containerRef.current,
				center: [offsetCoords.lng, offsetCoords.lat], // Use offset center
				zoom: 12.5, // Zoomed in more to show 1km radius
				style: isSatellite
					? "https://api.maptiler.com/maps/hybrid/style.json?key=demo"
					: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
			});
		}

		mapRef.current = map;

		map.on("load", () => {
			// Add circle source (using offset coordinates)
			map.addSource("fuzzy-location", {
				type: "geojson",
				data: {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [offsetCoords.lng, offsetCoords.lat],
					},
					properties: {},
				},
			});

			// Add grey circle layer
			map.addLayer({
				id: "fuzzy-circle",
				type: "circle",
				source: "fuzzy-location",
				paint: {
					"circle-radius": {
						stops: [
							[0, 0],
							[20, metersToPixelsAtMaxZoom(radius, lat)],
						],
						base: 2,
					},
					"circle-color": "#6B7280", // Grey-500
					"circle-opacity": 0.3,
					"circle-stroke-width": 2,
					"circle-stroke-color": "#6B7280",
					"circle-stroke-opacity": 0.5,
				},
			});
		});

		return () => {
			map.remove();
		};
	}, [lat, lng, radius, isMapbox, token, isSatellite]);

	// Handle satellite toggle
	const toggleSatellite = () => {
		if (!mapRef.current) return;
		
		const newStyle = !isSatellite;
		setIsSatellite(newStyle);
		
		const map = mapRef.current;
		
		// Set new style
		if (isMapbox && token) {
			(map as any).setStyle(
				newStyle 
					? "mapbox://styles/mapbox/satellite-streets-v12"
					: "mapbox://styles/mapbox/streets-v12"
			);
		} else {
			(map as any).setStyle(
				newStyle
					? "https://api.maptiler.com/maps/hybrid/style.json?key=demo"
					: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
			);
		}

		// Re-add the grey circle after style loads
		(map as any).once("style.load", () => {
			// Re-add circle source (using offset coordinates)
			if (!(map as any).getSource("fuzzy-location")) {
				(map as any).addSource("fuzzy-location", {
					type: "geojson",
					data: {
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [offsetCoords.lng, offsetCoords.lat],
						},
						properties: {},
					},
				});
			}

			// Re-add grey circle layer
			if (!(map as any).getLayer("fuzzy-circle")) {
				(map as any).addLayer({
					id: "fuzzy-circle",
					type: "circle",
					source: "fuzzy-location",
					paint: {
						"circle-radius": {
							stops: [
								[0, 0],
								[20, metersToPixelsAtMaxZoom(radius, lat)],
							],
							base: 2,
						},
						"circle-color": "#6B7280",
						"circle-opacity": 0.3,
						"circle-stroke-width": 2,
						"circle-stroke-color": "#6B7280",
						"circle-stroke-opacity": 0.5,
					},
				});
			}
		});
	};

	// Zoom controls
	const zoomIn = () => {
		if (!mapRef.current) return;
		const currentZoom = (mapRef.current as any).getZoom();
		(mapRef.current as any).setZoom(currentZoom + 1);
	};

	const zoomOut = () => {
		if (!mapRef.current) return;
		const currentZoom = (mapRef.current as any).getZoom();
		(mapRef.current as any).setZoom(currentZoom - 1);
	};

	return (
		<div className="relative w-full h-full">
			<div ref={containerRef} className="w-full h-full" />
			
			{/* Privacy Notice Overlay */}
			<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-lg border border-gray-200">
				<div className="flex items-center gap-2">
				<div className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
				<div>
					<p className="text-sm font-medium text-gray-900">Approximate Location</p>
					<p className="text-xs text-gray-600">Within 1km radius</p>
				</div>
				</div>
			</div>

			{/* Zoom Controls */}
			<div className="absolute top-4 right-4 flex flex-col gap-2">
				<Button
					size="icon"
					variant="secondary"
					className="bg-white hover:bg-gray-100 shadow-lg"
					onClick={zoomIn}
				>
					<Plus className="h-5 w-5" />
				</Button>
				<Button
					size="icon"
					variant="secondary"
					className="bg-white hover:bg-gray-100 shadow-lg"
					onClick={zoomOut}
				>
					<Minus className="h-5 w-5" />
				</Button>
			</div>

			{/* Satellite Toggle */}
			<div className="absolute bottom-4 left-4">
				<Button
					variant="secondary"
					size="sm"
					className="bg-white hover:bg-gray-100 shadow-lg gap-2"
					onClick={toggleSatellite}
				>
					<svg 
						className="h-4 w-4" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path 
							strokeLinecap="round" 
							strokeLinejoin="round" 
							strokeWidth={2} 
							d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
						/>
					</svg>
					{isSatellite ? "Street" : "Satellite"}
				</Button>
			</div>
		</div>
	);
}

// Helper function to convert meters to pixels at max zoom
function metersToPixelsAtMaxZoom(meters: number, latitude: number): number {
	return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
}

