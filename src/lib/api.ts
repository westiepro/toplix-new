import useSWR from 'swr';
import { MapBounds, PropertyFilters } from '@/stores/mapStore';

export interface Property {
  id: string;
  price: number;
  address: string;
  city: string;
  country?: string;
  district?: string;
  beds: number;
  baths: number;
  area: number;
  property_type?: string;
  transaction_type?: 'buy' | 'rent';
  url_slug_id?: string;
  lat: number;
  lng: number;
  description?: string;
  show_exact_location?: boolean;
  imageUrl: string;
  images?: PropertyImage[]; // Multiple property images
}

export interface PropertyImage {
  id?: string;
  property_id?: string;
  image_url: string;
  display_order?: number;
  is_featured?: boolean;
}

interface PropertiesResponse {
  properties: Property[];
  count: number;
  filters: any;
}

interface ImagesResponse {
  images: PropertyImage[];
  count: number;
}

interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  bounds: MapBounds | null;
  filters: PropertyFilters;
  city: string | null;
  created_at: string;
}

interface SavedSearchesResponse {
  savedSearches: SavedSearch[];
  count: number;
}

/**
 * Fetcher function for SWR
 */
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Build query string from filters
 */
function buildPropertiesQuery(
  bounds?: MapBounds | null,
  city?: string | null,
  filters?: PropertyFilters,
  lang?: string
): string {
  const params = new URLSearchParams();

  if (city) {
    params.set('city', city);
  }

  if (bounds) {
    params.set('sw_lat', bounds.sw_lat.toString());
    params.set('sw_lng', bounds.sw_lng.toString());
    params.set('ne_lat', bounds.ne_lat.toString());
    params.set('ne_lng', bounds.ne_lng.toString());
  }

  if (filters?.minPrice) params.set('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
  if (filters?.beds) params.set('beds', filters.beds.toString());
  if (filters?.baths) params.set('baths', filters.baths.toString());
  if (filters?.propertyType) params.set('propertyType', filters.propertyType);
  if (filters?.minArea) params.set('minArea', filters.minArea.toString());
  
  // Add language parameter
  if (lang) {
    params.set('lang', lang);
  }

  return params.toString();
}

/**
 * Hook to fetch properties with SWR caching
 */
export function useProperties(
  bounds?: MapBounds | null,
  city?: string | null,
  filters?: PropertyFilters,
  lang?: string
) {
  const queryString = buildPropertiesQuery(bounds, city, filters, lang);
  const url = `/api/properties${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<PropertiesResponse>(
    // Only fetch if we have either bounds or city
    bounds || city ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 2000, // Prevent duplicate requests within 2s
    }
  );

  return {
    properties: data?.properties || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch property images
 */
export function usePropertyImages(propertyId: string | null) {
  const { data, error, isLoading } = useSWR<ImagesResponse>(
    propertyId ? `/api/properties/${propertyId}/images` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    images: data?.images || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch saved searches
 */
export function useSavedSearches() {
  const { data, error, isLoading, mutate } = useSWR<SavedSearchesResponse>(
    '/api/saved-searches',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    savedSearches: data?.savedSearches || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Save a new search
 */
export async function saveSearch(
  name: string,
  bounds: MapBounds | null,
  filters: PropertyFilters,
  city: string | null
): Promise<SavedSearch> {
  const response = await fetch('/api/saved-searches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, bounds, filters, city }),
  });

  if (!response.ok) {
    throw new Error('Failed to save search');
  }

  const data = await response.json();
  return data.savedSearch;
}

/**
 * Delete a saved search
 */
export async function deleteSavedSearch(searchId: string): Promise<void> {
  const response = await fetch(`/api/saved-searches?id=${searchId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete search');
  }
}
