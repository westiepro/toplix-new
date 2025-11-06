"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { searchLocations, type SearchLocation } from "@/lib/geocoding";
import { useTranslation } from "@/hooks/useTranslation";
import { EnhancedSearchDropdown } from "@/components/EnhancedSearchDropdown";
import type { Property } from "@/components/PropertyCard";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { generatePropertyUrl } from "@/lib/generate-property-url";

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
	const { t } = useTranslation();
	const router = useRouter();
	const { currentLanguage } = useLanguage();
	const [local, setLocal] = useState<FiltersState>(value);
	const [searchQuery, setSearchQuery] = useState(value.q || "");
	const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [propertyCounts, setPropertyCounts] = useState<Record<string, number>>({});
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isSearching, setIsSearching] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	
	// Cache for search results
	const searchCache = useRef<Map<string, { cities: SearchLocation[], properties: Property[], counts: Record<string, number> }>>(new Map());

	// Sync local state with value prop changes
	useEffect(() => {
		setLocal(value);
		setSearchQuery(value.q || "");
	}, [value]);

	// Instant search with smart caching
	const performSearch = useCallback(async (searchQuery: string) => {
		if (searchQuery.length < 2) {
			setSuggestions([]);
			setProperties([]);
			setPropertyCounts({});
			setShowSuggestions(false);
			setIsSearching(false);
			return;
		}

		// Check cache first for instant results
		const cached = searchCache.current.get(searchQuery.toLowerCase());
		if (cached) {
			setSuggestions(cached.cities);
			setProperties(cached.properties);
			setPropertyCounts(cached.counts);
			setShowSuggestions(cached.cities.length > 0 || cached.properties.length > 0);
			setSelectedIndex(-1);
			return;
		}

		setIsSearching(true);
		
		// Search both cities and properties in parallel (optimized - only 2 API calls!)
		const [cityResults, apiResponse] = await Promise.all([
			searchLocations(searchQuery),
			fetch(`/api/properties?search=${encodeURIComponent(searchQuery)}&limit=5&includeCityCounts=true`)
				.then(res => res.ok ? res.json() : { properties: [], cityCounts: {} })
				.catch(() => ({ properties: [], cityCounts: {} }))
		]);
		
		const propertyResults = apiResponse.properties || [];
		const counts = apiResponse.cityCounts || {};
		
		// Cache the results for instant retrieval
		searchCache.current.set(searchQuery.toLowerCase(), {
			cities: cityResults.slice(0, 5),
			properties: propertyResults.slice(0, 5),
			counts
		});
		
		// Limit cache size to prevent memory issues
		if (searchCache.current.size > 50) {
			const firstKey = searchCache.current.keys().next().value;
			if (firstKey) {
				searchCache.current.delete(firstKey);
			}
		}
		
		setSuggestions(cityResults.slice(0, 5));
		setProperties(propertyResults.slice(0, 5));
		setPropertyCounts(counts);
		setShowSuggestions(cityResults.length > 0 || propertyResults.length > 0);
		setSelectedIndex(-1);
		setIsSearching(false);
	}, []);

	// Debounced search for better performance
	const debouncedSearch = useCallback(
		(() => {
			let timeoutId: NodeJS.Timeout;
			return (searchQuery: string) => {
				clearTimeout(timeoutId);
				if (searchQuery.length < 2) {
					performSearch(searchQuery);
					return;
				}
				timeoutId = setTimeout(() => {
					performSearch(searchQuery);
				}, 200); // 200ms delay for optimal responsiveness
			};
		})(),
		[performSearch]
	);

	// Trigger debounced search when query changes
	useEffect(() => {
		debouncedSearch(searchQuery);
	}, [searchQuery, debouncedSearch]);

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

	function handleCitySelect(location: SearchLocation) {
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

	function handlePropertySelect(property: Property) {
		setShowSuggestions(false);
		// Navigate to property detail page
		const propertyUrl = generatePropertyUrl(
			{
				id: property.id,
				url_slug_id: property.url_slug_id,
				transaction_type: property.transaction_type || 'buy',
				city: property.city,
			},
			currentLanguage
		);
		router.push(propertyUrl);
	}

	function handleSearchKeyDown(e: React.KeyboardEvent) {
		const totalItems = suggestions.length + properties.length;
		
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex(prev => prev < totalItems - 1 ? prev + 1 : prev);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (selectedIndex >= 0) {
				// Check if selection is a city or property
				if (selectedIndex < suggestions.length) {
					// City selected
					handleCitySelect(suggestions[selectedIndex]);
				} else {
					// Property selected
					const propertyIndex = selectedIndex - suggestions.length;
					const property = properties[propertyIndex];
					handlePropertySelect(property);
				}
			}
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
						placeholder={t("filters.searchCityOrAddress")}
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
				{showSuggestions && (suggestions.length > 0 || properties.length > 0) && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-0 z-[1000] mt-1"
					>
						<EnhancedSearchDropdown
							cities={suggestions}
							properties={properties}
							propertyCounts={propertyCounts}
							selectedIndex={selectedIndex}
							onCitySelect={handleCitySelect}
							onPropertySelect={handlePropertySelect}
						/>
					</div>
				)}
			</div>
			<div>
				<Select onValueChange={(v) => update("minPrice", Number(v))}>
					<SelectTrigger className="w-[140px]"><SelectValue placeholder={t("filters.minPrice")} /></SelectTrigger>
					<SelectContent>
						{[0, 250000, 500000, 750000, 1000000].map((p) => (
							<SelectItem key={p} value={String(p)}>{p === 0 ? t("filters.noMin") : `$${p.toLocaleString()}`}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("maxPrice", Number(v))}>
					<SelectTrigger className="w-[140px]"><SelectValue placeholder={t("filters.maxPrice")} /></SelectTrigger>
					<SelectContent>
						{[500000, 750000, 1000000, 1500000, 2000000].map((p) => (
							<SelectItem key={p} value={String(p)}>{`$${p.toLocaleString()}`}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("beds", Number(v))}>
					<SelectTrigger className="w-[120px]"><SelectValue placeholder={t("filters.beds")} /></SelectTrigger>
					<SelectContent>
						{[1, 2, 3, 4, 5].map((n) => (<SelectItem key={n} value={String(n)}>{n}+</SelectItem>))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("baths", Number(v))}>
					<SelectTrigger className="w-[120px]"><SelectValue placeholder={t("filters.baths")} /></SelectTrigger>
					<SelectContent>
						{[1, 2, 3, 4].map((n) => (<SelectItem key={n} value={String(n)}>{n}+</SelectItem>))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select onValueChange={(v) => update("propertyType", v === "any" ? undefined : v)}>
					<SelectTrigger className="w-[160px]"><SelectValue placeholder={t("filters.propertyType")} /></SelectTrigger>
					<SelectContent>
						<SelectItem value="any">{t("filters.any")}</SelectItem>
						<SelectItem value="Apartment">{t("filters.apartment")}</SelectItem>
						<SelectItem value="Villa">{t("filters.villa")}</SelectItem>
						<SelectItem value="Townhouse">{t("filters.townhouse")}</SelectItem>
						<SelectItem value="Land">{t("filters.land")}</SelectItem>
						<SelectItem value="Commercial">{t("filters.commercial")}</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center gap-3">
				<span className="text-sm text-muted-foreground">{t("filters.minArea")}</span>
				<Slider className="w-[180px]" min={0} max={5000} step={100} defaultValue={[local.minArea ?? 0]} onValueChange={(v) => update("minArea", v[0] ?? 0)} />
			</div>
		</div>
	);
}


