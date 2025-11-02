"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Portugal and Spain cities list
const POPULAR_CITIES = [
	// Portugal - Algarve region
	"Lagos, Portugal",
	"Faro, Portugal",
	"Albufeira, Portugal",
	"Tavira, Portugal",
	"Vilamoura, Portugal",
	"Portimão, Portugal",
	"Loulé, Portugal",
	"Carvoeiro, Portugal",
	"Olhão, Portugal",
	"Quarteira, Portugal",
	"Vila do Bispo, Portugal",
	"Lagoa, Portugal",
	"Silves, Portugal",
	"Armação de Pêra, Portugal",
	// Portugal - Other regions
	"Lisboa, Portugal",
	"Porto, Portugal",
	"Coimbra, Portugal",
	"Braga, Portugal",
	"Évora, Portugal",
	"Setúbal, Portugal",
	"Aveiro, Portugal",
	"Funchal, Portugal",
	// Spain - Andalusia (near Portugal)
	"Sevilla, Spain",
	"Málaga, Spain",
	"Cádiz, Spain",
	"Granada, Spain",
	"Córdoba, Spain",
	"Jerez de la Frontera, Spain",
	"Marbella, Spain",
	"Almería, Spain",
	"Ronda, Spain",
	"Estepona, Spain",
	"Nerja, Spain",
	"Torremolinos, Spain",
	"Fuengirola, Spain",
	// Spain - Other major cities
	"Madrid, Spain",
	"Barcelona, Spain",
	"Valencia, Spain",
	"Bilbao, Spain",
	"Zaragoza, Spain",
	"Murcia, Spain",
	"Alicante, Spain",
	"Palma, Spain",
];

export type FiltersState = {
	q?: string;
	minPrice?: number;
	maxPrice?: number;
	beds?: number;
	baths?: number;
	propertyType?: string;
	minArea?: number;
	location?: { lat: number; lng: number; zoom: number };
};

export function Filters({ value, onChange, onClearBounds }: { value: FiltersState; onChange: (v: FiltersState) => void; onClearBounds?: () => void; }) {
	const [local, setLocal] = useState<FiltersState>(value);
	const [searchQuery, setSearchQuery] = useState(value.q || "");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Sync local state with value prop changes
	useEffect(() => {
		setLocal(value);
		setSearchQuery(value.q || "");
	}, [value]);

	// Filter cities based on input
	useEffect(() => {
		if (searchQuery.length > 0) {
			const filtered = POPULAR_CITIES
				.filter(city => 
					city.toLowerCase().startsWith(searchQuery.toLowerCase())
				)
				.slice(0, 10);
			setSuggestions(filtered);
			setShowSuggestions(filtered.length > 0);
			setSelectedIndex(-1);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, [searchQuery]);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				searchInputRef.current &&
				!searchInputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function update<K extends keyof FiltersState>(key: K, val: FiltersState[K]) {
		const next = { ...local, [key]: val };
		setLocal(next);
		onChange(next);
	}

	function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value);
		// Don't update filter while typing - only when city is selected from dropdown
		// update("q", e.target.value);
	}

	function handleClearCity() {
		setSearchQuery("");
		update("q", undefined);
		// Reset map to default Algarve view to show all properties
		update("location", { lat: 37.06, lng: -8.3, zoom: 9 });
		// Clear bounds to show all properties immediately
		onClearBounds?.();
		setShowSuggestions(false);
		searchInputRef.current?.focus();
	}

	function handleSelectCity(city: string) {
		setSearchQuery(city);
		const cityCoords = getCityCoordinates(city);
		// Update location first to trigger zoom, then update query
		if (cityCoords) {
			// Create new object to ensure React detects the change
			update("location", { ...cityCoords });
		}
		// Only update filter when city is selected from dropdown
		update("q", city);
		setShowSuggestions(false);
	}

	// City coordinates mapping
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

	function handleSearchKeyDown(e: React.KeyboardEvent) {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (selectedIndex >= 0 && suggestions[selectedIndex]) {
				// Select city from dropdown if one is highlighted
				handleSelectCity(suggestions[selectedIndex]);
			} else if (searchQuery && POPULAR_CITIES.includes(searchQuery)) {
				// If typed city matches exactly a city in the list, select it
				handleSelectCity(searchQuery);
			}
			// Otherwise, don't filter - wait for user to select from dropdown
		} else if (e.key === "Escape") {
			setShowSuggestions(false);
		}
	}

	return (
		<div className="flex flex-wrap items-end gap-3 p-3">
			<div className="relative w-[240px]">
				<div className="relative">
					<Input 
						ref={searchInputRef}
						placeholder="Search city or address" 
						value={searchQuery}
						onChange={handleSearchChange}
						onFocus={() => searchQuery.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
						onKeyDown={handleSearchKeyDown}
						className={searchQuery ? "pr-8" : ""}
					/>
					{searchQuery && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200"
							onClick={handleClearCity}
							aria-label="Clear search"
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
				{showSuggestions && suggestions.length > 0 && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-0 right-0 z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md border-2 border-gray-300 bg-white text-black shadow-xl"
						style={{ 
							position: 'absolute',
							top: '100%',
							left: 0,
							right: 0,
							zIndex: 1000,
							marginTop: '4px',
							backgroundColor: 'white'
						}}
					>
						{suggestions.map((city, index) => (
							<button
								key={city}
								type="button"
								onClick={() => handleSelectCity(city)}
								className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-200 transition-colors cursor-pointer ${
									index === selectedIndex ? "bg-blue-200" : "bg-white"
								}`}
							>
								{city}
							</button>
						))}
					</div>
				)}
			</div>
			<div>
				<Select onValueChange={(v) => update("minPrice", Number(v))}>
					<SelectTrigger className="w-[140px]"><SelectValue placeholder="Min price" /></SelectTrigger>
					<SelectContent>
						{[0, 250000, 500000, 750000, 1000000].map((p) => (
							<SelectItem key={p} value={String(p)}>{p === 0 ? "No min" : `$${p.toLocaleString()}`}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("maxPrice", Number(v))}>
					<SelectTrigger className="w-[140px]"><SelectValue placeholder="Max price" /></SelectTrigger>
					<SelectContent>
						{[500000, 750000, 1000000, 1500000, 2000000].map((p) => (
							<SelectItem key={p} value={String(p)}>{`$${p.toLocaleString()}`}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("beds", Number(v))}>
					<SelectTrigger className="w-[120px]"><SelectValue placeholder="Beds" /></SelectTrigger>
					<SelectContent>
						{[1, 2, 3, 4, 5].map((n) => (<SelectItem key={n} value={String(n)}>{n}+</SelectItem>))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("baths", Number(v))}>
					<SelectTrigger className="w-[120px]"><SelectValue placeholder="Baths" /></SelectTrigger>
					<SelectContent>
						{[1, 2, 3, 4].map((n) => (<SelectItem key={n} value={String(n)}>{n}+</SelectItem>))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("propertyType", v === "any" ? undefined : v)}>
					<SelectTrigger className="w-[160px]"><SelectValue placeholder="Property type" /></SelectTrigger>
					<SelectContent>
						{["Any", "Apartment", "Villa", "Townhouse", "Land", "Commercial"].map((t) => (
							<SelectItem key={t} value={t === "Any" ? "any" : t}>{t}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-3">
				<span className="text-sm text-muted-foreground">Min area</span>
				<Slider className="w-[180px]" min={0} max={5000} step={100} defaultValue={[local.minArea ?? 0]} onValueChange={(v) => update("minArea", v[0] ?? 0)} />
			</div>
		</div>
	);
}


