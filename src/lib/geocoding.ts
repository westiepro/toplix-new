// Geocoding utility using Nominatim (OpenStreetMap)
// Searches for locations in Portugal and Spain

export interface GeocodingResult {
	place_id: string;
	display_name: string;
	lat: string;
	lon: string;
	type: string;
	address: {
		city?: string;
		town?: string;
		village?: string;
		municipality?: string;
		state?: string;
		country?: string;
		postcode?: string;
	};
}

export interface SearchLocation {
	id: string;
	name: string;
	displayName: string;
	lat: number;
	lng: number;
	type: string;
}

/**
 * Search for locations in Portugal and Spain using Nominatim geocoding
 */
export async function searchLocations(query: string): Promise<SearchLocation[]> {
	if (!query || query.length < 2) {
		return [];
	}

	try {
		// Search in both Portugal and Spain
		const [portugalResults, spainResults] = await Promise.all([
			searchInCountry(query, "Portugal"),
			searchInCountry(query, "Spain"),
		]);

		// Combine and deduplicate results
		const allResults = [...portugalResults, ...spainResults];
		
		// Limit to 10 results
		return allResults.slice(0, 10);
	} catch (error) {
		console.error("Geocoding error:", error);
		return [];
	}
}

async function searchInCountry(query: string, country: string): Promise<SearchLocation[]> {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", query);
	url.searchParams.set("countrycodes", country === "Portugal" ? "pt" : "es");
	url.searchParams.set("format", "json");
	url.searchParams.set("addressdetails", "1");
	url.searchParams.set("limit", "5");
	// Prioritize cities, towns, and villages
	url.searchParams.set("featuretype", "settlement");

	const response = await fetch(url.toString(), {
		headers: {
			"User-Agent": "NextEstate Real Estate App",
		},
	});

	if (!response.ok) {
		throw new Error(`Geocoding failed: ${response.statusText}`);
	}

	const results: GeocodingResult[] = await response.json();

	return results.map((result) => {
		const cityName = 
			result.address.city || 
			result.address.town || 
			result.address.village || 
			result.address.municipality ||
			"";

		const displayName = cityName 
			? `${cityName}, ${country}`
			: result.display_name;

		return {
			id: result.place_id,
			name: cityName || result.display_name.split(",")[0],
			displayName,
			lat: parseFloat(result.lat),
			lng: parseFloat(result.lon),
			type: result.type,
		};
	});
}

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

