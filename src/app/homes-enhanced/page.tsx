"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Filters, FiltersState } from "@/components/Filters";
import { PropertyCard } from "@/components/PropertyCard";
import { MapView } from "@/components/MapViewEnhanced";
import { SearchBarEnhanced } from "@/components/SearchBarEnhanced";
import { PropertyBottomSheet } from "@/components/PropertyBottomSheet";
import { useProperties } from "@/lib/api";
import { useMapStore, useSyncURLWithMapStore } from "@/stores/mapStore";
import type { Property } from "@/lib/api";
import { Loader2 } from "lucide-react";

function HomesPageContent() {
  const {
    bounds,
    selectedCity,
    filters,
    isLoading: storeLoading,
    selectedPropertyId,
    hoveredPropertyId,
    center,
    setBounds,
    setLoading,
    setSelectedProperty,
    setHoveredProperty,
  } = useMapStore();

  // Sync URL params with store
  useSyncURLWithMapStore();

  // Fetch properties using SWR
  const { properties, count, isLoading: apiLoading } = useProperties(
    bounds,
    selectedCity,
    filters
  );

  // Combined loading state
  const isLoading = apiLoading || storeLoading;

  // Update store loading state
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading, setLoading]);

  // Selected property for popup
  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;

  // Ref for scrolling to properties
  const propertyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Scroll to property when hovered on map
  useEffect(() => {
    if (hoveredPropertyId && propertyRefs.current[hoveredPropertyId]) {
      propertyRefs.current[hoveredPropertyId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [hoveredPropertyId]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Desktop Layout */}
      <div className="hidden md:grid h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[45%_55%]">
        {/* Left: Property List */}
        <div className="flex min-h-0 flex-col border-r bg-gray-50 dark:bg-gray-900">
          {/* Search & Filters */}
          <div className="border-b bg-white dark:bg-gray-800 p-4">
            <div className="mb-3">
              <SearchBarEnhanced />
            </div>
            <Filters
              value={{
                q: selectedCity || "",
                ...filters,
              }}
              onChange={(newFilters: FiltersState) => {
                // This is handled by Zustand store now
              }}
              onClearBounds={() => setBounds(null)}
            />
          </div>

          {/* Results Header */}
          <div className="px-4 py-3 border-b bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {count} {count === 1 ? 'Property' : 'Properties'}
              </h2>
              {selectedCity && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  in {selectedCity}
                </span>
              )}
            </div>
          </div>

          {/* Property List */}
          <div className="min-h-0 flex-1 overflow-auto p-4">
            {isLoading && properties.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">Loading properties...</p>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">No properties found</p>
                  <p className="text-sm text-gray-500">Try adjusting your filters or search area</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    ref={el => propertyRefs.current[property.id] = el}
                    onMouseEnter={() => setHoveredProperty(property.id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                    className="transition-all duration-200"
                  >
                    <PropertyCard
                      property={property}
                      highlighted={hoveredPropertyId === property.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Map */}
        <div className="min-h-0 h-full">
          <MapView
            properties={properties}
            onBoundsChange={(b) => setBounds(b)}
            onMarkerHover={(id) => setHoveredProperty(id)}
            onMarkerClick={(id) => setSelectedProperty(id)}
            selectedProperty={selectedProperty}
            highlightedId={hoveredPropertyId}
            location={center}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-[calc(100vh-56px)] relative">
        {/* Full Screen Map */}
        <div className="absolute inset-0">
          <MapView
            properties={properties}
            onBoundsChange={(b) => setBounds(b)}
            onMarkerHover={(id) => setHoveredProperty(id)}
            onMarkerClick={(id) => setSelectedProperty(id)}
            selectedProperty={selectedProperty}
            highlightedId={hoveredPropertyId}
            location={center}
            isLoading={isLoading}
          />
        </div>

        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <SearchBarEnhanced />
        </div>

        {/* Bottom Sheet */}
        <PropertyBottomSheet
          properties={properties}
          onPropertyHover={(id) => setHoveredProperty(id)}
          highlightedId={hoveredPropertyId}
        />
      </div>
    </main>
  );
}

export default function HomesPageEnhanced() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <HomesPageContent />
    </Suspense>
  );
}

