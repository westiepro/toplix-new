import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export interface MapBounds {
  sw_lat: number;
  sw_lng: number;
  ne_lat: number;
  ne_lng: number;
}

export interface MapCenter {
  lat: number;
  lng: number;
  zoom: number;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  propertyType?: string;
  minArea?: number;
}

interface MapState {
  // Map state
  center: MapCenter | null;
  bounds: MapBounds | null;
  
  // Search state
  selectedCity: string | null;
  filters: PropertyFilters;
  isLoading: boolean;
  
  // Selected/hovered properties
  selectedPropertyId: string | null;
  hoveredPropertyId: string | null;
  
  // Polygon drawing
  drawnPolygon: any | null;
  
  // Actions
  setCenter: (center: MapCenter) => void;
  setBounds: (bounds: MapBounds) => void;
  setCity: (city: string | null) => void;
  setFilters: (filters: PropertyFilters) => void;
  setLoading: (loading: boolean) => void;
  setSelectedProperty: (id: string | null) => void;
  setHoveredProperty: (id: string | null) => void;
  setDrawnPolygon: (polygon: any | null) => void;
  clearSearch: () => void;
  reset: () => void;
}

const initialState = {
  center: null,
  bounds: null,
  selectedCity: null,
  filters: {},
  isLoading: false,
  selectedPropertyId: null,
  hoveredPropertyId: null,
  drawnPolygon: null,
};

export const useMapStore = create<MapState>((set) => ({
  ...initialState,

  setCenter: (center) => set({ center }),
  
  setBounds: (bounds) => set({ bounds }),
  
  setCity: (city) => set({ selectedCity: city }),
  
  setFilters: (filters) => set({ filters }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSelectedProperty: (id) => set({ selectedPropertyId: id }),
  
  setHoveredProperty: (id) => set({ hoveredPropertyId: id }),
  
  setDrawnPolygon: (polygon) => set({ drawnPolygon: polygon }),
  
  clearSearch: () => set({
    selectedCity: null,
    filters: {},
    drawnPolygon: null,
  }),
  
  reset: () => set(initialState),
}));

/**
 * Hook to sync URL params with map store
 */
export function useSyncURLWithMapStore() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setCity, setFilters, setCenter } = useMapStore();

  // Sync URL params to store on mount
  useEffect(() => {
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoom = searchParams.get('zoom');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const propertyType = searchParams.get('propertyType');
    const minArea = searchParams.get('minArea');

    if (city) {
      setCity(city);
    }

    if (lat && lng) {
      setCenter({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        zoom: zoom ? parseFloat(zoom) : 12,
      });
    }

    const filters: PropertyFilters = {};
    if (minPrice) filters.minPrice = parseInt(minPrice);
    if (maxPrice) filters.maxPrice = parseInt(maxPrice);
    if (beds) filters.beds = parseInt(beds);
    if (baths) filters.baths = parseInt(baths);
    if (propertyType) filters.propertyType = propertyType;
    if (minArea) filters.minArea = parseInt(minArea);

    if (Object.keys(filters).length > 0) {
      setFilters(filters);
    }
  }, [searchParams, setCity, setFilters, setCenter]);
}

/**
 * Hook to update URL when store changes
 */
export function useUpdateURLFromStore() {
  const router = useRouter();
  const { selectedCity, filters, center } = useMapStore();

  const updateURL = () => {
    const params = new URLSearchParams();

    if (selectedCity) {
      params.set('city', selectedCity);
    }

    if (center) {
      params.set('lat', center.lat.toString());
      params.set('lng', center.lng.toString());
      params.set('zoom', center.zoom.toString());
    }

    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.beds) params.set('beds', filters.beds.toString());
    if (filters.baths) params.set('baths', filters.baths.toString());
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.minArea) params.set('minArea', filters.minArea.toString());

    const queryString = params.toString();
    const newURL = queryString ? `?${queryString}` : window.location.pathname;
    
    // Only update if different from current URL
    if (window.location.search !== `?${queryString}`) {
      router.push(newURL, { scroll: false });
    }
  };

  return updateURL;
}
