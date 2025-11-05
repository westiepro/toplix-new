"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import maplibregl from "maplibre-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Property } from "@/lib/api";
import { MapControls } from "@/components/MapControls";
import { getSliderImage } from "@/lib/cloudinary";
import { Heart, Share2, X } from "lucide-react";
import { formatPriceShort } from "@/lib/utils";

type Bounds = { sw_lat: number; sw_lng: number; ne_lat: number; ne_lng: number };

interface MapViewProps {
  properties: Property[];
  onBoundsChange?: (b: Bounds) => void;
  onMarkerHover?: (id: string | null) => void;
  onMarkerClick?: (id: string | null) => void;
  selectedProperty?: Property | null;
  highlightedId?: string | null;
  location?: { lat: number; lng: number; zoom: number } | null;
  isLoading?: boolean;
}

export function MapView({
  properties,
  onBoundsChange,
  onMarkerHover,
  onMarkerClick,
  selectedProperty,
  highlightedId,
  location,
  isLoading = false,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker | maplibregl.Marker>>({});
  const clustersRef = useRef<Record<string, mapboxgl.Marker | maplibregl.Marker>>({});
  const popupRef = useRef<mapboxgl.Popup | maplibregl.Popup | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'dark'>('streets');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const lastLocationRef = useRef<{ lat: number; lng: number; zoom: number } | null>(null);
  const selectedPropertyRef = useRef<Property | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isMapbox = Boolean(token);

  const VOYAGER_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
  const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
  const SATELLITE_STYLE_MAPLIBRE = {
    version: 8,
    sources: {
      "esri-satellite": {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
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
  };

  // Initialize map
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

    const map = mapRef.current as any;

    map.on("load", () => {
      setStyleLoaded(true);
      
      // Fit bounds to show all properties on initial load
      if (properties.length > 0) {
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
    
    // Debounced bounds change
    map.on("moveend", () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        const b = map.getBounds();
        onBoundsChange?.({
          sw_lat: b.getSouth(),
          sw_lng: b.getWest(),
          ne_lat: b.getNorth(),
          ne_lng: b.getEast(),
        });
      }, 500); // 500ms debounce
    });

    map.on("click", (e: any) => {
      const target = e?.originalEvent?.target as HTMLElement | undefined;
      if (target && target.closest?.(".map-price-marker, .map-popup")) {
        return;
      }
      onMarkerClick?.(null);
    });

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      map.remove();
      mapRef.current = null;
    };
  }, [isMapbox, token, onBoundsChange, onMarkerClick]);

  // Update selectedPropertyRef
  useEffect(() => {
    selectedPropertyRef.current = selectedProperty || null;
  }, [selectedProperty]);

  // Clustering disabled - show all individual markers
  const clusterGroups = useMemo(() => {
    return []; // No clustering
  }, []);

  // Update markers and clusters
  useEffect(() => {
    if (!mapRef.current || !styleLoaded) return;
    
    const map = mapRef.current as any;
    const existing = markersRef.current;
    const existingClusters = clustersRef.current;
    
    // Show all properties individually (no clustering)
    const individualProperties = properties;

    // Remove old individual markers
    const nextIds = new Set(individualProperties.map((p) => p.id));
    for (const id of Object.keys(existing)) {
      if (!nextIds.has(id)) {
        existing[id].remove();
        delete existing[id];
      }
    }

    // Add/update individual markers
    for (const p of individualProperties) {
      if (existing[p.id]) continue;
      
      const el = document.createElement("div");
      el.className = "map-price-marker";
      el.style.cursor = "pointer";
      
      const inner = document.createElement("div");
      inner.className = "rounded-md bg-blue-600 text-white text-xs font-semibold shadow-lg px-2 py-1 transition-all duration-200";
      inner.textContent = formatPriceShort(p.price);
      inner.style.transformOrigin = "bottom center";
      inner.style.willChange = "transform";
      el.appendChild(inner);

      el.addEventListener("mouseenter", () => {
        const currentSelected = selectedPropertyRef.current;
        if (!currentSelected || currentSelected.id === p.id) {
          onMarkerHover?.(p.id);
        }
      });

      el.addEventListener("mouseleave", () => {
        const currentSelected = selectedPropertyRef.current;
        if (!currentSelected || currentSelected.id !== p.id) {
          onMarkerHover?.(null);
        }
      });

      el.addEventListener("click", (evt) => {
        evt.stopPropagation();
        onMarkerClick?.(p.id);
      });

      const MarkerClass = isMapbox ? mapboxgl.Marker : maplibregl.Marker;
      const marker = new MarkerClass({ element: el, anchor: "bottom" })
        .setLngLat([p.lng, p.lat])
        .addTo(map);
      
      existing[p.id] = marker;
    }

    // Handle marker highlighting
    const currentSelected = selectedPropertyRef.current;
    for (const p of individualProperties) {
      const root = markersRef.current[p.id]?.getElement?.();
      if (!root) continue;
      const inner = root.firstElementChild as HTMLElement | null;
      if (!inner) continue;
      
      const shouldHighlight = p.id === highlightedId && (!currentSelected || currentSelected.id === p.id);
      const isSelected = currentSelected?.id === p.id;
      
      inner.style.transform = shouldHighlight ? "scale(1.15)" : isSelected ? "scale(1.1)" : "scale(1)";
      inner.className = `rounded-md text-white text-xs font-semibold shadow-lg px-2 py-1 transition-all duration-200 ${
        shouldHighlight || isSelected ? 'bg-blue-700' : 'bg-blue-600'
      }`;
    }

    // Remove old clusters
    const nextClusterKeys = new Set(clusterGroups.map((c: any) => c.key));
    for (const key of Object.keys(existingClusters)) {
      if (!nextClusterKeys.has(key)) {
        existingClusters[key].remove();
        delete existingClusters[key];
      }
    }

    // Add/update clusters
    for (const cluster of clusterGroups as any[]) {
      if (existingClusters[cluster.key]) continue;

      const el = document.createElement("div");
      el.className = "map-cluster";
      el.style.cursor = "pointer";
      
      const inner = document.createElement("div");
      inner.className = "rounded-full bg-[#0d6efd] text-white text-sm font-bold shadow-lg w-12 h-12 flex items-center justify-center border-4 border-white";
      inner.textContent = cluster.count.toString();
      el.appendChild(inner);

      el.addEventListener("click", (evt) => {
        evt.stopPropagation();
        // Zoom into cluster
        map.flyTo({
          center: [cluster.lng, cluster.lat],
          zoom: Math.min(map.getZoom() + 2, 15),
          duration: 1000,
        });
      });

      const MarkerClass = isMapbox ? mapboxgl.Marker : maplibregl.Marker;
      const marker = new MarkerClass({ element: el, anchor: "center" })
        .setLngLat([cluster.lng, cluster.lat])
        .addTo(map);
      
      existingClusters[cluster.key] = marker;
    }
  }, [properties, clusterGroups, highlightedId, selectedProperty, isMapbox, styleLoaded, onMarkerClick, onMarkerHover]);

  // Enhanced popup with image slider
  useEffect(() => {
    if (!mapRef.current || !styleLoaded) return;
    
    popupRef.current?.remove();
    popupRef.current = null;
    setCurrentImageIndex(0);
    
    if (!selectedProperty) return;

    const map = mapRef.current as any;
    const PopupClass = isMapbox ? mapboxgl.Popup : maplibregl.Popup;

    // Create popup content container
    const popupContainer = document.createElement("div");
    popupContainer.className = "map-popup w-[280px]";
    
    // Render popup content with images
    popupContainer.innerHTML = `
      <div class="relative rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 max-w-[280px]">
        <div class="relative w-full h-[180px] bg-gray-200">
          <img 
            src="${getSliderImage(selectedProperty.imageUrl)}" 
            alt="${selectedProperty.address}" 
            class="w-full h-full object-cover"
          />
          <button 
            data-close 
            class="absolute right-2 top-2 h-7 w-7 rounded-full bg-white/95 hover:bg-white text-gray-900 flex items-center justify-center shadow-lg transition-all z-10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="p-3">
          <div class="text-lg font-bold text-gray-900 dark:text-white mb-1">${formatPriceShort(selectedProperty.price)}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">${selectedProperty.address}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-3">
            ${selectedProperty.beds} bd · ${selectedProperty.baths} ba · ${selectedProperty.area} m²
          </div>
          <div class="flex items-center gap-2 mb-3">
            <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              View details
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Add to favorites">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Share">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    const popup = new PopupClass({
      closeButton: false,
      offset: 15,
      className: "property-popup",
      maxWidth: "none",
    })
      .setLngLat([selectedProperty.lng, selectedProperty.lat])
      .setDOMContent(popupContainer)
      .addTo(map);

    popupRef.current = popup;

    // Add close button listener
    const closeBtn = popupContainer.querySelector("[data-close]");
    closeBtn?.addEventListener("click", () => onMarkerClick?.(null));

    return () => {
      popup.remove();
      popupRef.current = null;
    };
  }, [selectedProperty, isMapbox, styleLoaded, onMarkerClick]);

  // Fly to location
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const isNewLocation = !lastLocationRef.current || 
      lastLocationRef.current.lat !== location.lat || 
      lastLocationRef.current.lng !== location.lng ||
      lastLocationRef.current.zoom !== location.zoom;

    if (!isNewLocation) return;

    const map = mapRef.current as any;
    
    if (!map.isStyleLoaded()) {
      map.once('load', () => performFlyTo());
      return;
    }

    performFlyTo();

    function performFlyTo() {
      if (!mapRef.current || !location) return;
      const map = mapRef.current as any;
      
      map.flyTo({
        center: [location.lng, location.lat],
        zoom: location.zoom,
        duration: 2000,
        essential: true,
        curve: 1.5,
        speed: 1.2,
        easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      });
      
      lastLocationRef.current = location;
    }
  }, [location]);

  // Map control handlers
  const handleZoomIn = useCallback(() => {
    const map = mapRef.current as any;
    if (map) map.zoomIn({ duration: 300 });
  }, []);

  const handleZoomOut = useCallback(() => {
    const map = mapRef.current as any;
    if (map) map.zoomOut({ duration: 300 });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleToggleStyle = useCallback((style: 'streets' | 'satellite' | 'dark') => {
    const map = mapRef.current as any;
    if (!map) return;

    setMapStyle(style);

    if (isMapbox) {
      const styleUrl = style === 'satellite' 
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : style === 'dark'
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/streets-v12";
      map.setStyle(styleUrl);
    } else {
      const styleConfig = style === 'satellite'
        ? SATELLITE_STYLE_MAPLIBRE
        : style === 'dark'
        ? DARK_STYLE
        : VOYAGER_STYLE;
      map.setStyle(styleConfig);
    }
  }, [isMapbox]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-[#198754] border-t-transparent rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Updating results...</span>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleStyle={handleToggleStyle}
        isFullscreen={isFullscreen}
        currentStyle={mapStyle}
      />
    </div>
  );
}

