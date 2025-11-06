// Client-side cache for properties data
// This prevents refetching on every navigation and provides instant navigation

import type { Property } from "@/components/PropertyCard";

interface CacheEntry {
  data: Property[];
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let cache: CacheEntry | null = null;

export async function fetchProperties(forceRefresh = false): Promise<Property[]> {
  // Return cached data if valid and not forcing refresh
  if (!forceRefresh && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('✅ Using cached properties data');
    return cache.data;
  }

  console.log('🔄 Fetching fresh properties data');
  
  try {
    const response = await fetch('/api/properties', {
      // Enable browser caching
      next: { revalidate: 300 }, // 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    
    const data = await response.json();
    
    // Only show active properties
    const activeProperties = (data.properties || []).filter((p: any) => 
      p.status === 'active' || !p.status
    );
    
    // Update cache
    cache = {
      data: activeProperties,
      timestamp: Date.now(),
    };
    
    console.log('✅ Cached', activeProperties.length, 'properties');
    return activeProperties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    // Return stale cache if available, even if expired
    if (cache) {
      console.log('⚠️ Using stale cache due to error');
      return cache.data;
    }
    
    return [];
  }
}

// Get cached data synchronously (returns null if not cached)
export function getCachedProperties(): Property[] | null {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }
  return null;
}

// Check if we have valid cached data
export function hasCachedProperties(): boolean {
  return cache !== null && Date.now() - cache.timestamp < CACHE_DURATION;
}

// Clear cache (useful for admin actions)
export function clearPropertiesCache(): void {
  cache = null;
  console.log('🗑️ Properties cache cleared');
}

// Prefetch properties (useful for link hover)
export function prefetchProperties(): void {
  if (!hasCachedProperties()) {
    fetchProperties().catch(console.error);
  }
}

