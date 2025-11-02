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

function sampleProperties(): Property[] {
	return [
		{ id: "1", price: 350000, address: "Rua da Praia 45", city: "Lagos", beds: 2, baths: 2, area: 1100, lat: 37.1010, lng: -8.6730, imageUrl: "https://picsum.photos/seed/lagos1/800/600" },
		{ id: "2", price: 485000, address: "Avenida da República 120", city: "Faro", beds: 3, baths: 2, area: 1500, lat: 37.0194, lng: -7.9322, imageUrl: "https://picsum.photos/seed/faro1/800/600" },
		{ id: "3", price: 620000, address: "Praia da Falésia", city: "Albufeira", beds: 4, baths: 3, area: 2200, lat: 37.0894, lng: -8.2500, imageUrl: "https://picsum.photos/seed/albufeira1/800/600" },
		{ id: "4", price: 275000, address: "Rua 5 de Outubro 78", city: "Tavira", beds: 2, baths: 1, area: 950, lat: 37.1264, lng: -7.6485, imageUrl: "https://picsum.photos/seed/tavira1/800/600" },
		{ id: "5", price: 890000, address: "Marina de Vilamoura", city: "Vilamoura", beds: 5, baths: 4, area: 2800, lat: 37.0758, lng: -8.1094, imageUrl: "https://picsum.photos/seed/vilamoura1/800/600" },
		{ id: "6", price: 195000, address: "Rua da Igreja 12", city: "Olhão", beds: 1, baths: 1, area: 650, lat: 37.0260, lng: -7.8411, imageUrl: "https://picsum.photos/seed/olhao1/800/600" },
		{ id: "7", price: 745000, address: "Praia da Rocha", city: "Portimão", beds: 4, baths: 3, area: 2400, lat: 37.1180, lng: -8.5344, imageUrl: "https://picsum.photos/seed/portimao1/800/600" },
		{ id: "8", price: 425000, address: "Rua do Comércio 33", city: "Loulé", beds: 3, baths: 2, area: 1400, lat: 37.1378, lng: -8.0192, imageUrl: "https://picsum.photos/seed/loule1/800/600" },
		{ id: "9", price: 380000, address: "Praia do Carvoeiro", city: "Carvoeiro", beds: 3, baths: 2, area: 1300, lat: 37.0944, lng: -8.4736, imageUrl: "https://picsum.photos/seed/carvoeiro1/800/600" },
		{ id: "10", price: 950000, address: "Marina de Portimão", city: "Portimão", beds: 5, baths: 4, area: 3000, lat: 37.1265, lng: -8.5247, imageUrl: "https://picsum.photos/seed/portimao2/800/600" },
		{ id: "11", price: 320000, address: "Avenida Marginal 67", city: "Quarteira", beds: 2, baths: 2, area: 1150, lat: 37.0694, lng: -8.1006, imageUrl: "https://picsum.photos/seed/quarteira1/800/600" },
		{ id: "12", price: 555000, address: "Costa da Caparica", city: "Lagos", beds: 4, baths: 2, area: 1800, lat: 37.0919, lng: -8.6738, imageUrl: "https://picsum.photos/seed/lagos2/800/600" },
		{ id: "13", price: 225000, address: "Rua Dom Paio Peres Correia", city: "Tavira", beds: 2, baths: 1, area: 800, lat: 37.1289, lng: -7.6508, imageUrl: "https://picsum.photos/seed/tavira2/800/600" },
		{ id: "14", price: 675000, address: "Vale do Lobo", city: "Loulé", beds: 4, baths: 3, area: 2600, lat: 37.0822, lng: -8.0011, imageUrl: "https://picsum.photos/seed/loule2/800/600" },
		{ id: "15", price: 295000, address: "Rua da Liberdade 89", city: "Olhão", beds: 2, baths: 1, area: 1000, lat: 37.0283, lng: -7.8425, imageUrl: "https://picsum.photos/seed/olhao2/800/600" },
		{ id: "16", price: 825000, address: "Praia da Rocha Marina", city: "Portimão", beds: 5, baths: 4, area: 2900, lat: 37.1147, lng: -8.5356, imageUrl: "https://picsum.photos/seed/portimao3/800/600" },
		{ id: "17", price: 445000, address: "Avenida Infante Dom Henrique", city: "Faro", beds: 3, baths: 2, area: 1600, lat: 37.0161, lng: -7.9350, imageUrl: "https://picsum.photos/seed/faro2/800/600" },
		{ id: "18", price: 365000, address: "Rua das Flores 23", city: "Lagos", beds: 3, baths: 2, area: 1250, lat: 37.0989, lng: -8.6756, imageUrl: "https://picsum.photos/seed/lagos3/800/600" },
		{ id: "19", price: 595000, address: "Pinhal do Concelho", city: "Albufeira", beds: 4, baths: 3, area: 2000, lat: 37.0956, lng: -8.2456, imageUrl: "https://picsum.photos/seed/albufeira2/800/600" },
		{ id: "20", price: 515000, address: "Sagres Point", city: "Vila do Bispo", beds: 3, baths: 3, area: 1700, lat: 37.0084, lng: -8.9431, imageUrl: "https://picsum.photos/seed/sagres1/800/600" },
	];
}

function HomesPageContent() {
	const searchParams = useSearchParams();
	const [filters, setFilters] = useState<FiltersState>({});
	const [hoverId, setHoverId] = useState<string | null>(null);
	const [openId, setOpenId] = useState<string | null>(null);

	const [bounds, setBounds] = useState<{ minLat: number; maxLat: number; minLng: number; maxLng: number } | null>(null);

	// Initialize filters from URL params on mount
	useEffect(() => {
		const q = searchParams.get("q");
		if (q) {
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
				}, 1200); // Clear after animation completes
			}
		}
	};

	const all = useMemo(() => sampleProperties(), []);
	const filtered = useMemo(() => {
		return all.filter((p) => {
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
	}, [all, filters, bounds]);

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
				<div className="flex min-h-0 flex-col border-r">
					<Filters value={filters} onChange={handleFiltersChange} onClearBounds={() => setBounds(null)} />
					<div className="min-h-0 flex-1 overflow-auto p-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{filtered.map((p) => (
								<div key={p.id} onMouseEnter={() => setHoverId(p.id)} onMouseLeave={() => setHoverId(null)}>
									<PropertyCard property={p} highlighted={hoverId === p.id} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="min-h-0 h-full">
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
