// Geocoding utility using Nominatim (OpenStreetMap)
// Optimized with local cache for instant results

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

// Local cache of popular cities for INSTANT results (no API call needed)
const POPULAR_CITIES_CACHE: SearchLocation[] = [
	// Portugal - Major Cities
	{ id: "pt-lisboa", name: "Lisboa", displayName: "Lisboa, Portugal", lat: 38.7223, lng: -9.1393, type: "city" },
	{ id: "pt-porto", name: "Porto", displayName: "Porto, Portugal", lat: 41.1579, lng: -8.6291, type: "city" },
	{ id: "pt-faro", name: "Faro", displayName: "Faro, Portugal", lat: 37.0194, lng: -7.9322, type: "city" },
	{ id: "pt-lagos", name: "Lagos", displayName: "Lagos, Portugal", lat: 37.1010, lng: -8.6730, type: "city" },
	{ id: "pt-albufeira", name: "Albufeira", displayName: "Albufeira, Portugal", lat: 37.0894, lng: -8.2500, type: "city" },
	{ id: "pt-portimao", name: "Portimão", displayName: "Portimão, Portugal", lat: 37.1180, lng: -8.5344, type: "city" },
	{ id: "pt-tavira", name: "Tavira", displayName: "Tavira, Portugal", lat: 37.1264, lng: -7.6485, type: "town" },
	{ id: "pt-vilamoura", name: "Vilamoura", displayName: "Vilamoura, Portugal", lat: 37.0758, lng: -8.1094, type: "town" },
	{ id: "pt-loule", name: "Loulé", displayName: "Loulé, Portugal", lat: 37.1378, lng: -8.0192, type: "city" },
	{ id: "pt-coimbra", name: "Coimbra", displayName: "Coimbra, Portugal", lat: 40.2033, lng: -8.4103, type: "city" },
	{ id: "pt-braga", name: "Braga", displayName: "Braga, Portugal", lat: 41.5454, lng: -8.4265, type: "city" },
	{ id: "pt-setubal", name: "Setúbal", displayName: "Setúbal, Portugal", lat: 38.5244, lng: -8.8882, type: "city" },
	{ id: "pt-funchal", name: "Funchal", displayName: "Funchal, Madeira, Portugal", lat: 32.6669, lng: -16.9250, type: "city" },
	{ id: "pt-evora", name: "Évora", displayName: "Évora, Portugal", lat: 38.5665, lng: -7.9077, type: "city" },
	{ id: "pt-aveiro", name: "Aveiro", displayName: "Aveiro, Portugal", lat: 40.6405, lng: -8.6538, type: "city" },
	{ id: "pt-quarteira", name: "Quarteira", displayName: "Quarteira, Portugal", lat: 37.0694, lng: -8.1006, type: "town" },
	{ id: "pt-carvoeiro", name: "Carvoeiro", displayName: "Carvoeiro, Portugal", lat: 37.0944, lng: -8.4736, type: "village" },
	{ id: "pt-olhao", name: "Olhão", displayName: "Olhão, Portugal", lat: 37.0260, lng: -7.8411, type: "city" },
	{ id: "pt-silves", name: "Silves", displayName: "Silves, Portugal", lat: 37.1901, lng: -8.4395, type: "city" },
	{ id: "pt-lagoa", name: "Lagoa", displayName: "Lagoa, Portugal", lat: 37.1353, lng: -8.4522, type: "city" },
	
	// Spain - Major Cities
	{ id: "es-madrid", name: "Madrid", displayName: "Madrid, Spain", lat: 40.4168, lng: -3.7038, type: "city" },
	{ id: "es-barcelona", name: "Barcelona", displayName: "Barcelona, Spain", lat: 41.3851, lng: 2.1734, type: "city" },
	{ id: "es-sevilla", name: "Sevilla", displayName: "Sevilla, Spain", lat: 37.3891, lng: -5.9845, type: "city" },
	{ id: "es-valencia", name: "Valencia", displayName: "Valencia, Spain", lat: 39.4699, lng: -0.3763, type: "city" },
	{ id: "es-malaga", name: "Málaga", displayName: "Málaga, Spain", lat: 36.7213, lng: -4.4214, type: "city" },
	{ id: "es-marbella", name: "Marbella", displayName: "Marbella, Spain", lat: 36.5102, lng: -4.8860, type: "city" },
	{ id: "es-granada", name: "Granada", displayName: "Granada, Spain", lat: 37.1773, lng: -3.5986, type: "city" },
	{ id: "es-cordoba", name: "Córdoba", displayName: "Córdoba, Spain", lat: 37.8882, lng: -4.7794, type: "city" },
	{ id: "es-cadiz", name: "Cádiz", displayName: "Cádiz, Spain", lat: 36.5270, lng: -6.2886, type: "city" },
	{ id: "es-alicante", name: "Alicante", displayName: "Alicante, Spain", lat: 38.3452, lng: -0.4810, type: "city" },
	{ id: "es-bilbao", name: "Bilbao", displayName: "Bilbao, Spain", lat: 43.2627, lng: -2.9253, type: "city" },
	{ id: "es-zaragoza", name: "Zaragoza", displayName: "Zaragoza, Spain", lat: 41.6488, lng: -0.8891, type: "city" },
	{ id: "es-murcia", name: "Murcia", displayName: "Murcia, Spain", lat: 37.9922, lng: -1.1307, type: "city" },
	{ id: "es-palma", name: "Palma", displayName: "Palma de Mallorca, Spain", lat: 39.5696, lng: 2.6502, type: "city" },
	{ id: "es-estepona", name: "Estepona", displayName: "Estepona, Spain", lat: 36.4267, lng: -5.1458, type: "town" },
	{ id: "es-nerja", name: "Nerja", displayName: "Nerja, Spain", lat: 36.7475, lng: -3.8747, type: "town" },
	{ id: "es-ronda", name: "Ronda", displayName: "Ronda, Spain", lat: 36.7420, lng: -5.1671, type: "city" },
	{ id: "es-almeria", name: "Almería", displayName: "Almería, Spain", lat: 36.8381, lng: -2.4597, type: "city" },
	{ id: "es-jerez", name: "Jerez", displayName: "Jerez de la Frontera, Spain", lat: 36.6866, lng: -6.1370, type: "city" },
	{ id: "es-torremolinos", name: "Torremolinos", displayName: "Torremolinos, Spain", lat: 36.6243, lng: -4.4997, type: "town" },
	{ id: "es-fuengirola", name: "Fuengirola", displayName: "Fuengirola, Spain", lat: 36.5423, lng: -4.6244, type: "city" },
];

/**
 * Search for locations in Portugal and Spain
 * Uses local cache for instant results + API for comprehensive search
 */
export async function searchLocations(query: string): Promise<SearchLocation[]> {
	if (!query || query.length < 2) {
		return [];
	}

	const lowerQuery = query.toLowerCase();

	// STEP 1: Search local cache for INSTANT results
	const cachedResults = POPULAR_CITIES_CACHE.filter(city =>
		city.name.toLowerCase().includes(lowerQuery) ||
		city.displayName.toLowerCase().includes(lowerQuery)
	).slice(0, 10);

	// If we have good cached results, return them immediately
	if (cachedResults.length >= 3) {
		return cachedResults;
	}

	// STEP 2: If cache doesn't have enough results, search API
	try {
		const apiResults = await searchWithAPI(query);
		
		// Merge cached and API results, prioritizing cache
		const combined = [...cachedResults];
		const cachedIds = new Set(cachedResults.map(r => r.id));
		
		for (const result of apiResults) {
			if (!cachedIds.has(result.id) && combined.length < 10) {
				combined.push(result);
			}
		}
		
		return combined;
	} catch (error) {
		console.error("Geocoding API error:", error);
		// Return cached results as fallback
		return cachedResults;
	}
}

/**
 * Search using Nominatim API (slower but comprehensive)
 */
async function searchWithAPI(query: string): Promise<SearchLocation[]> {
	// Search in both Portugal and Spain in parallel
	const [portugalResults, spainResults] = await Promise.all([
		searchInCountry(query, "Portugal"),
		searchInCountry(query, "Spain"),
	]);

	// Combine and limit results
	return [...portugalResults, ...spainResults].slice(0, 10);
}

async function searchInCountry(query: string, country: string): Promise<SearchLocation[]> {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", query);
	url.searchParams.set("countrycodes", country === "Portugal" ? "pt" : "es");
	url.searchParams.set("format", "json");
	url.searchParams.set("addressdetails", "1");
	url.searchParams.set("limit", "5"); // Increased to show more results including streets
	// Remove featuretype to allow all types including streets
	// url.searchParams.set("featuretype", "settlement");

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

	try {
		const response = await fetch(url.toString(), {
			headers: {
				"User-Agent": "NextEstate Real Estate App",
				"Accept": "application/json",
			},
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`Geocoding failed: ${response.statusText}`);
		}

		const text = await response.text();
		let results: GeocodingResult[];
		
		try {
			results = JSON.parse(text);
		} catch (e) {
			console.error("Invalid JSON from geocoding API:", text.substring(0, 200));
			return [];
		}

		return results.map((result) => {
			const addr = result.address;
			const road = (addr as any).road || "";
			const houseNumber = (addr as any).house_number || "";
			const cityName = 
				addr.city || 
				addr.town || 
				addr.village || 
				addr.municipality ||
				"";
			
			// Build street address if available
			const streetAddress = road 
				? `${road}${houseNumber ? ' ' + houseNumber : ''}`
				: "";

			// Create display name with street and city
			let displayName = "";
			let name = "";
			
			if (streetAddress && cityName) {
				displayName = `${streetAddress}, ${cityName}, ${country}`;
				name = streetAddress;
			} else if (streetAddress) {
				displayName = `${streetAddress}, ${country}`;
				name = streetAddress;
			} else if (cityName) {
				displayName = `${cityName}, ${country}`;
				name = cityName;
			} else {
				displayName = result.display_name;
				name = result.display_name.split(",")[0];
			}

			return {
				id: result.place_id,
				name,
				displayName,
				lat: parseFloat(result.lat),
				lng: parseFloat(result.lon),
				type: result.type,
			};
		});
	} catch (error: any) {
		if (error.name === 'AbortError') {
			console.warn(`Geocoding timeout for ${country}`);
		}
		clearTimeout(timeoutId);
		return [];
	}
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

/**
 * Reverse geocode coordinates to get address details
 */
export async function reverseGeocode(lat: number, lng: number): Promise<{
	address: string;
	city: string;
	country: string;
} | null> {
	try {
		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
		const response = await fetch(url, {
			headers: { 
				"User-Agent": "NextEstate Real Estate App",
				"Accept": "application/json",
			},
		});
		
		if (!response.ok) {
			console.error(`Geocoding failed: ${response.status}`);
			return null;
		}

		const text = await response.text();
		
		// Validate JSON response
		let data;
		try {
			data = JSON.parse(text);
		} catch (e) {
			console.error("Invalid JSON response from geocoding API:", text);
			return null;
		}
		
		const addr = data.address || {};
		
		const formattedAddress = [
			addr.road,
			addr.house_number,
			addr.postcode,
		].filter(Boolean).join(" ");
		
		return {
			address: formattedAddress || data.display_name?.split(",")[0] || "",
			city: addr.city || addr.town || addr.village || addr.municipality || "",
			country: addr.country || "",
		};
	} catch (error) {
		console.error("Reverse geocoding error:", error);
		return null;
	}
}

