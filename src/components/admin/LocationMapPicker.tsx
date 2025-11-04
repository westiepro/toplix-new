"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, Loader2 } from "lucide-react";
import { searchLocations, type SearchLocation } from "@/lib/geocoding";

interface LocationMapPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect: (location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  }) => void;
}

export function LocationMapPicker({
  initialLat = 37.1010,
  initialLng = -8.6730,
  onLocationSelect,
}: LocationMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street");

  // Initialize map (only once on mount)
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [initialLng, initialLat],
      zoom: 14,
      scrollZoom: false, // Disable scroll/touchpad zoom
    });

    // Add zoom controls
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add marker
    const marker = new maplibregl.Marker({
      draggable: true,
      color: "#ef4444", // Red color
    })
      .setLngLat([initialLng, initialLat])
      .addTo(map);

    // Handle marker drag
    marker.on("dragend", async () => {
      const lngLat = marker.getLngLat();
      await reverseGeocode(lngLat.lat, lngLat.lng);
    });

    // Handle map click
    map.on("click", async (e) => {
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      await reverseGeocode(e.lngLat.lat, e.lngLat.lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Initial reverse geocode
    reverseGeocode(initialLat, initialLng);

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []); // Only run once on mount, never recreate the map

  // Handle map style change (only when user toggles)
  const lastAppliedStyleRef = useRef<"street" | "satellite">("street");
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Only apply style if it actually changed (user clicked toggle)
    if (lastAppliedStyleRef.current === mapStyle) return;
    
    lastAppliedStyleRef.current = mapStyle;

    const styleUrls = {
      street: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      satellite: {
        version: 8,
        sources: {
          "esri-satellite": {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256,
            attribution: "© Esri"
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
      }
    };

    const currentCenter = mapRef.current.getCenter();
    const currentZoom = mapRef.current.getZoom();
    const currentMarkerPos = markerRef.current?.getLngLat();

    const style = mapStyle === "street" ? styleUrls.street : styleUrls.satellite;
    
    // Change style while preserving position and zoom
    mapRef.current.setStyle(style as any);
    
    // Restore zoom and center after style loads
    mapRef.current.once('style.load', () => {
      if (!mapRef.current) return;
      mapRef.current.jumpTo({
        center: currentCenter,
        zoom: currentZoom,
      });
      if (markerRef.current && currentMarkerPos) {
        markerRef.current.setLngLat(currentMarkerPos);
      }
    });
  }, [mapStyle]);

  const toggleMapStyle = () => {
    setMapStyle((prev) => (prev === "street" ? "satellite" : "street"));
  };

  // Search locations
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        const results = await searchLocations(searchQuery);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoadingLocation(true);
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
      const response = await fetch(url, {
        headers: { 
          "User-Agent": "NextEstate Real Estate App",
          "Accept": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error(`Geocoding failed: ${response.status}`);
      }

      const text = await response.text();
      
      // Check if response is valid JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Invalid JSON response:", text);
        throw new Error("Invalid geocoding response");
      }
      
      const address = data.address || {};
      const formattedAddress = data.display_name?.split(",").slice(0, 2).join(",") || "Unknown location";
      const city = address.city || address.town || address.village || address.municipality || "";
      const country = address.country || "";

      setSelectedAddress(formattedAddress);
      
      onLocationSelect({
        address: formattedAddress,
        city,
        country,
        lat,
        lng,
      });
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      // Fallback with basic location info
      setSelectedAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      onLocationSelect({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        city: "",
        country: "Portugal",
        lat,
        lng,
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Handle location selection from search
  const handleLocationSelect = (location: SearchLocation) => {
    if (!mapRef.current || !markerRef.current) return;

    // Move map center without changing zoom level
    mapRef.current.panTo([location.lng, location.lat], {
      duration: 1000,
    });

    markerRef.current.setLngLat([location.lng, location.lat]);
    setSearchQuery(location.name);
    setShowSuggestions(false);

    reverseGeocode(location.lat, location.lng);
  };

  // Use current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (mapRef.current && markerRef.current) {
          // Move map center without changing zoom level
          mapRef.current.panTo([longitude, latitude], {
            duration: 1000,
          });
          markerRef.current.setLngLat([longitude, latitude]);
        }

        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get your location");
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Location</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Locate className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Use My Location</span>
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <MapPin className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search for location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className="pl-10"
        />
        
        {/* Search suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-lg border bg-white shadow-lg">
            {suggestions.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 border-b last:border-b-0"
              >
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-gray-500">{location.displayName}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative w-full h-[400px] rounded-lg border-2 border-gray-200 overflow-hidden shadow-md">
        <div
          ref={mapContainerRef}
          className="w-full h-full"
        />
        
        {/* Satellite/Street View Toggle */}
        <button
          type="button"
          onClick={toggleMapStyle}
          className="absolute top-3 left-3 z-10 bg-white hover:bg-gray-100 text-gray-800 px-3 py-2 rounded-md shadow-md border border-gray-300 text-sm font-medium transition-colors"
        >
          {mapStyle === "street" ? "🛰️ Satellite" : "🗺️ Street"}
        </button>
      </div>

      {/* Selected address display */}
      {selectedAddress && (
        <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-800">
            <p className="font-medium">Selected Location:</p>
            <p>{selectedAddress}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        💡 Click on the map or drag the red marker to select a precise location.
        Address, city, country, and coordinates will be auto-filled.
      </p>
    </div>
  );
}

