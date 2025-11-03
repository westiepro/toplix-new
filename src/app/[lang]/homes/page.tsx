"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Filters, FiltersState } from "@/components/Filters";
import { PropertyCard, type Property } from "@/components/PropertyCard";
import { MapView } from "@/components/MapView";

// Helper function to get city coordinates (shared with Filters)
function getCityCoordinates(city: string): { lat: number; lng: number; zoom: number } | null {
	const cityMap: Record<string, { lat: number; lng: number; zoom: number }> = {
		"Lagos, Portugal": { lat: 37.1010, lng: -8.6730, zoom: 12 },
		"Faro, Portugal": { lat: 37.0194, lng: -7.9322, zoom: 12 },
		"Albufeira, Portugal": { lat: 37.0894, lng: -8.2500, zoom: 12 },
		"Tavira, Portugal": { lat: 37.1264, lng: -7.6485, zoom: 12 },
		"Vilamoura, Portugal": { lat: 37.0758, lng: -8.1094, zoom: 13 },
		"Portimão, Portugal": { lat: 37.1180, lng: -8.5344, zoom: 12 },
		"Loulé, Portugal": { lat: 37.1378, lng: -8.0192, zoom: 12 },
		"Carvoeiro, Portugal": { lat: 37.0944, lng: -8.4736, zoom: 13 },
		"Olhão, Portugal": { lat: 37.0260, lng: -7.8411, zoom: 12 },
		"Quarteira, Portugal": { lat: 37.0694, lng: -8.1006, zoom: 13 },
		"Vila do Bispo, Portugal": { lat: 37.0084, lng: -8.9431, zoom: 12 },
		"Lagoa, Portugal": { lat: 37.1353, lng: -8.4522, zoom: 12 },
		"Silves, Portugal": { lat: 37.1901, lng: -8.4395, zoom: 12 },
		"Armação de Pêra, Portugal": { lat: 37.1028, lng: -8.3625, zoom: 13 },
		"Lisboa, Portugal": { lat: 38.7223, lng: -9.1393, zoom: 11 },
		"Porto, Portugal": { lat: 41.1579, lng: -8.6291, zoom: 11 },
		"Coimbra, Portugal": { lat: 40.2033, lng: -8.4103, zoom: 12 },
		"Braga, Portugal": { lat: 41.5454, lng: -8.4265, zoom: 12 },
		"Évora, Portugal": { lat: 38.5665, lng: -7.9077, zoom: 12 },
		"Setúbal, Portugal": { lat: 38.5244, lng: -8.8882, zoom: 12 },
		"Aveiro, Portugal": { lat: 40.6405, lng: -8.6538, zoom: 12 },
		"Funchal, Portugal": { lat: 32.6669, lng: -16.9250, zoom: 12 },
		"Sevilla, Spain": { lat: 37.3891, lng: -5.9845, zoom: 11 },
		"Málaga, Spain": { lat: 36.7213, lng: -4.4214, zoom: 11 },
		"Cádiz, Spain": { lat: 36.5270, lng: -6.2886, zoom: 12 },
		"Granada, Spain": { lat: 37.1773, lng: -3.5986, zoom: 11 },
		"Córdoba, Spain": { lat: 37.8882, lng: -4.7794, zoom: 11 },
		"Jerez de la Frontera, Spain": { lat: 36.6866, lng: -6.1370, zoom: 12 },
		"Marbella, Spain": { lat: 36.5102, lng: -4.8860, zoom: 12 },
		"Almería, Spain": { lat: 36.8381, lng: -2.4597, zoom: 12 },
		"Ronda, Spain": { lat: 36.7420, lng: -5.1671, zoom: 13 },
		"Estepona, Spain": { lat: 36.4267, lng: -5.1458, zoom: 13 },
		"Nerja, Spain": { lat: 36.7475, lng: -3.8747, zoom: 13 },
		"Torremolinos, Spain": { lat: 36.6243, lng: -4.4997, zoom: 13 },
		"Fuengirola, Spain": { lat: 36.5423, lng: -4.6244, zoom: 13 },
		"Madrid, Spain": { lat: 40.4168, lng: -3.7038, zoom: 11 },
		"Barcelona, Spain": { lat: 41.3851, lng: 2.1734, zoom: 11 },
		"Valencia, Spain": { lat: 39.4699, lng: -0.3763, zoom: 11 },
		"Bilbao, Spain": { lat: 43.2627, lng: -2.9253, zoom: 11 },
		"Zaragoza, Spain": { lat: 41.6488, lng: -0.8891, zoom: 11 },
		"Murcia, Spain": { lat: 37.9922, lng: -1.1307, zoom: 12 },
		"Alicante, Spain": { lat: 38.3452, lng: -0.4810, zoom: 12 },
		"Palma, Spain": { lat: 39.5696, lng: 2.6502, zoom: 12 },
	};
	return cityMap[city] || null;
}

// This function is no longer needed - we fetch from database

function HomesPageContent() {
	const searchParams = useSearchParams();
	const [filters, setFilters] = useState<FiltersState>({});
	const [hoverId, setHoverId] = useState<string | null>(null);
	const [openId, setOpenId] = useState<string | null>(null);
	const [properties, setProperties] = useState<Property[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalCount, setTotalCount] = useState<number>(0);

	const [bounds, setBounds] = useState<{ minLat: number; maxLat: number; minLng: number; maxLng: number } | null>(null);

	// Fetch properties from database
	useEffect(() => {
		const fetchProperties = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/properties');
				if (response.ok) {
					const data = await response.json();
					// Only show active properties on the public site
					const activeProperties = (data.properties || []).filter((p: any) => 
						p.status === 'active' || !p.status // Show if active or if status is not set
					);
					setProperties(activeProperties);
					setTotalCount(activeProperties.length);
				} else {
					console.error('Failed to fetch properties');
					setProperties([]);
					setTotalCount(0);
				}
			} catch (error) {
				console.error('Error fetching properties:', error);
				setProperties([]);
				setTotalCount(0);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProperties();
	}, []);

	// Initialize filters from URL params on mount
	useEffect(() => {
		const q = searchParams.get("q");
		const lat = searchParams.get("lat");
		const lng = searchParams.get("lng");
		const zoom = searchParams.get("zoom");
		
		if (lat && lng) {
			// Use geocoded coordinates from URL
			setFilters({
				q: q || "",
				location: {
					lat: parseFloat(lat),
					lng: parseFloat(lng),
					zoom: zoom ? parseFloat(zoom) : 12,
				},
			});
		} else if (q) {
			// Fallback to hardcoded city coordinates
			const cityCoords = getCityCoordinates(q);
			setFilters({
				q,
				...(cityCoords && { location: cityCoords }),
			});
		}
	}, [searchParams]);

	// Clear location after zoom completes to prevent re-zooming
	const handleFiltersChange = (newFilters: FiltersState) => {
		setFilters(newFilters);
		// Clear location after it's been used (unless it's the default reset view)
		if (newFilters.location) {
			const isDefaultView = newFilters.location.lat === 37.06 && 
				newFilters.location.lng === -8.3 && 
				newFilters.location.zoom === 9;
			
			if (!isDefaultView) {
				setTimeout(() => {
					setFilters(prev => {
						const { location, ...rest } = prev;
						return rest;
					});
				}, 2500); // Clear after 2.5s to allow full animation to complete
			}
		}
	};

	const filtered = useMemo(() => {
		return properties.filter((p) => {
			if (filters.q) {
				const q = filters.q.toLowerCase();
				if (!(`${p.address} ${p.city}`).toLowerCase().includes(q)) return false;
			}
			if (filters.minPrice && p.price < filters.minPrice) return false;
			if (filters.maxPrice && p.price > filters.maxPrice) return false;
			if (filters.beds && p.beds < filters.beds) return false;
			if (filters.baths && p.baths < filters.baths) return false;
			if (filters.minArea && p.area < filters.minArea) return false;
			if (bounds) {
				if (p.lat < bounds.minLat || p.lat > bounds.maxLat || p.lng < bounds.minLng || p.lng > bounds.maxLng) return false;
			}
			return true;
		});
	}, [properties, filters, bounds]);

	const selected = useMemo(() => filtered.find((p) => p.id === openId) ?? null, [filtered, openId]);
	// If selected falls out of filtered set (bounds/filters), clear it
	useMemo(() => {
		if (openId && !selected) setOpenId(null);
		return null;
	}, [openId, selected]);
	
	// Prevent hover from affecting highlightedId when a popup is open
	const handleMarkerHover = (id: string | null) => {
		// Only update hover if no popup is open
		if (!openId) {
			setHoverId(id);
		}
	};

	return (
		<main className="min-h-screen">
			<Navbar />
			<div className="grid h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[55%_45%]">
				<div className="flex min-h-0 flex-col border-r h-auto md:h-full overflow-auto md:overflow-hidden">
					<Filters value={filters} onChange={handleFiltersChange} onClearBounds={() => setBounds(null)} />
					
					{/* Property Counter Header */}
					{!isLoading && totalCount > 0 && (
						<div className="px-4 py-3 border-b bg-white">
							<h2 className="text-lg font-semibold text-gray-900">
								{totalCount} {totalCount === 1 ? 'Home' : 'Homes'}
							</h2>
						</div>
					)}
					
					<div className="min-h-[400px] md:min-h-0 flex-1 md:overflow-auto p-4">
						{isLoading ? (
							<div className="flex items-center justify-center h-full">
								<p className="text-muted-foreground">Loading properties...</p>
							</div>
						) : filtered.length === 0 ? (
							<div className="flex items-center justify-center min-h-[200px]">
								<p className="text-muted-foreground">No properties found</p>
							</div>
						) : (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
								{filtered.map((p, index) => (
									<div key={p.id} onMouseEnter={() => setHoverId(p.id)} onMouseLeave={() => setHoverId(null)}>
										<PropertyCard property={p} highlighted={hoverId === p.id} position={index} source="search_results" />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className="min-h-[300px] md:min-h-0 h-[400px] md:h-full">
					<MapView
						properties={filtered}
						onBoundsChange={setBounds}
						onMarkerHover={handleMarkerHover}
						onMarkerClick={(id) => setOpenId(id)}
						selectedProperty={selected}
						highlightedId={hoverId}
						location={filters.location || null}
					/>
				</div>
			</div>
		</main>
	);
}

export default function HomesPage() {
	return (
		<Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
			<HomesPageContent />
		</Suspense>
	);
}
