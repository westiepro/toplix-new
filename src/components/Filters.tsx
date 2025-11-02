"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { searchLocations, debounce, type SearchLocation } from "@/lib/geocoding";

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
	const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isSearching, setIsSearching] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Sync local state with value prop changes
	useEffect(() => {
		setLocal(value);
		setSearchQuery(value.q || "");
	}, [value]);

	// Instant search with smart caching
	const performSearch = useCallback(async (searchQuery: string) => {
		if (searchQuery.length < 2) {
			setSuggestions([]);
			setShowSuggestions(false);
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		const results = await searchLocations(searchQuery);
		setSuggestions(results);
		setShowSuggestions(results.length > 0);
		setSelectedIndex(-1);
		setIsSearching(false);
	}, []);

	// Trigger instant search when query changes
	useEffect(() => {
		performSearch(searchQuery);
	}, [searchQuery, performSearch]);

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

	function handleSelectCity(location: SearchLocation) {
		setSearchQuery(location.name);
		// Update location to trigger map zoom
		update("location", {
			lat: location.lat,
			lng: location.lng,
			zoom: 12,
		});
		// Update query with location name
		update("q", location.name);
		setShowSuggestions(false);
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
				// Select location from dropdown if one is highlighted
				handleSelectCity(suggestions[selectedIndex]);
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
					{isSearching && (
						<div className="absolute right-9 top-1/2 -translate-y-1/2">
							<Loader2 className="h-4 w-4 animate-spin text-gray-400" />
						</div>
					)}
				</div>
				{showSuggestions && suggestions.length > 0 && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-0 right-0 z-[1000] mt-1 max-h-72 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-2xl"
					>
						{suggestions.map((location, index) => (
							<button
								key={location.id}
								type="button"
								onClick={() => handleSelectCity(location)}
								className={`w-full px-4 py-3 text-left text-sm transition-colors cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
									index === selectedIndex ? "bg-[#2C477D]/10 text-[#2C477D]" : "hover:bg-gray-50 text-gray-700"
								}`}
							>
								<MapPin className={`h-4 w-4 flex-shrink-0 ${index === selectedIndex ? "text-[#2C477D]" : "text-gray-400"}`} />
								<div className="flex-1 min-w-0">
									<div className="font-medium truncate">{location.name}</div>
									<div className="text-xs text-gray-500 truncate">{location.displayName}</div>
								</div>
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


