import type { Property } from "@/components/PropertyCard";

// Cache for properties to avoid repeated API calls
let propertiesCache: Property[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all properties from the API
 */
export async function getAllProperties(): Promise<Property[]> {
	// Return cached data if still valid
	const now = Date.now();
	if (propertiesCache && (now - cacheTimestamp) < CACHE_DURATION) {
		return propertiesCache;
	}

	try {
		const response = await fetch('/api/properties');
		if (!response.ok) {
			console.error('Failed to fetch properties:', response.statusText);
			return [];
		}
		const data = await response.json();
		const properties = data.properties || [];
		propertiesCache = properties;
		cacheTimestamp = now;
		return properties;
	} catch (error) {
		console.error('Error fetching properties:', error);
		return [];
	}
}

/**
 * Get specific properties by their IDs
 */
export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
	if (ids.length === 0) return [];
	
	const allProperties = await getAllProperties();
	return allProperties.filter((property) => ids.includes(property.id));
}

/**
 * Clear the properties cache (useful when properties are updated)
 */
export function clearPropertiesCache(): void {
	propertiesCache = null;
	cacheTimestamp = 0;
}



