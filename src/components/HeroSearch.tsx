"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations, type SearchLocation } from "@/lib/geocoding";
import { MapPin, Loader2, Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n-config";
import { EnhancedSearchDropdown } from "@/components/EnhancedSearchDropdown";
import type { Property } from "@/components/PropertyCard";
import { generatePropertyUrl } from "@/lib/generate-property-url";

// Route translations
const routeTranslations: Record<Locale, Record<string, string>> = {
	en: { buy: 'buy' },
	pt: { buy: 'comprar' },
	es: { buy: 'comprar' },
	fr: { buy: 'acheter' },
	de: { buy: 'kaufen' },
	sv: { buy: 'kop' },
};

export function HeroSearch() {
	const router = useRouter();
	const { currentLanguage } = useLanguage();
	const [query, setQuery] = useState("");
	const [searchType, setSearchType] = useState<"buy" | "rent">("buy");
	const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [propertyCounts, setPropertyCounts] = useState<Record<string, number>>({});
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isSearching, setIsSearching] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

		setIsSearching(true);
		
		// Search both cities and properties in parallel
		const [cityResults, propertyResults] = await Promise.all([
			searchLocations(searchQuery),
			fetch(`/api/properties?search=${encodeURIComponent(searchQuery)}&limit=5`)
				.then(res => res.ok ? res.json() : { properties: [] })
				.then(data => data.properties || [])
				.catch(() => [])
		]);
		
		// Count properties per city from full dataset
		const counts: Record<string, number> = {};
		if (cityResults.length > 0) {
			// Fetch counts for each city
			const countPromises = cityResults.slice(0, 5).map(async (city) => {
				try {
					const res = await fetch(`/api/properties?city=${encodeURIComponent(city.name.split(',')[0])}`);
					if (res.ok) {
						const data = await res.json();
						counts[city.name] = data.count || data.properties?.length || 0;
					}
				} catch (error) {
					counts[city.name] = 0;
				}
			});
			await Promise.all(countPromises);
		}
		
		setSuggestions(cityResults.slice(0, 5));
		setProperties(propertyResults.slice(0, 5));
		setPropertyCounts(counts);
		setShowSuggestions(cityResults.length > 0 || propertyResults.length > 0);
		setSelectedIndex(-1);
		setIsSearching(false);
	}, []);

	// Trigger instant search when query changes
	useEffect(() => {
		performSearch(query);
	}, [query, performSearch]);

	// Prefetch function (can be enhanced with actual prefetch logic)
	const prefetchProperties = () => {
		// Placeholder for property prefetching
		// Could pre-load property data here
	};


	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setShowSuggestions(false);
		
		// Prefetch properties before navigation
		prefetchProperties();
		
		// Get translated route for current language
		const buyRoute = routeTranslations[currentLanguage]?.buy || 'buy';
		
		// If there's a selected suggestion, use it
		if (selectedIndex >= 0 && suggestions[selectedIndex]) {
			const location = suggestions[selectedIndex];
			const params = new URLSearchParams();
			params.set("lat", location.lat.toString());
			params.set("lng", location.lng.toString());
			params.set("zoom", "12");
			params.set("q", location.name);
			params.set("for", searchType);
			router.push(`/${currentLanguage}/${buyRoute}?${params.toString()}`);
		} else if (query.trim()) {
			// Otherwise just use the query text
			const params = new URLSearchParams();
			params.set("q", query.trim());
			params.set("for", searchType);
			router.push(`/${currentLanguage}/${buyRoute}?${params.toString()}`);
		}
	}

	// Handle keyboard navigation across cities and properties
	function handleKeyDown(e: React.KeyboardEvent) {
		const totalItems = suggestions.length + properties.length;
		
		if (e.key === "Enter" && (!showSuggestions || totalItems === 0 || selectedIndex < 0)) {
			// Let form handle submit if no suggestion is selected
			return;
		}

		if (!showSuggestions || totalItems === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex(prev => 
					prev < totalItems - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
				break;
			case "Enter":
				e.preventDefault();
				if (selectedIndex >= 0) {
					// Check if selection is a city or property
					if (selectedIndex < suggestions.length) {
						// City selected
						const location = suggestions[selectedIndex];
						handleCitySelect(location);
					} else {
						// Property selected
						const propertyIndex = selectedIndex - suggestions.length;
						const property = properties[propertyIndex];
						handlePropertySelect(property);
					}
				}
				break;
			case "Escape":
				e.preventDefault();
				setShowSuggestions(false);
				break;
		}
	}

	function handleCitySelect(location: SearchLocation) {
		setQuery(location.name);
		setShowSuggestions(false);
		prefetchProperties();
		const buyRoute = routeTranslations[currentLanguage]?.buy || 'buy';
		const params = new URLSearchParams();
		params.set("lat", location.lat.toString());
		params.set("lng", location.lng.toString());
		params.set("zoom", "12");
		params.set("q", location.name);
		params.set("for", searchType);
		router.push(`/${currentLanguage}/${buyRoute}?${params.toString()}`);
	}

	function handlePropertySelect(property: Property) {
		setShowSuggestions(false);
		const propertyUrl = generatePropertyUrl(
			{
				id: property.id,
				url_slug_id: property.url_slug_id,
				transaction_type: property.transaction_type || searchType,
				city: property.city,
			},
			currentLanguage
		);
		router.push(propertyUrl);
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative mx-auto w-full">
			<form onSubmit={onSubmit}>
				<div className="relative group flex gap-2 items-center">
					{/* Buy/Rent Buttons */}
					<button
						type="button"
						onClick={() => setSearchType("buy")}
						className={`px-6 py-4 rounded-xl font-semibold transition-all text-base ${
							searchType === "buy"
								? "bg-[#2C477D] text-white border-2 border-[#6A90D0] shadow-lg"
								: "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
						}`}
					>
						Buy
					</button>
					<button
						type="button"
						onClick={() => setSearchType("rent")}
						className={`px-6 py-4 rounded-xl font-semibold transition-all text-base ${
							searchType === "rent"
								? "bg-[#2C477D] text-white border-2 border-[#6A90D0] shadow-lg"
								: "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
						}`}
					>
						Rent
					</button>

					{/* Search Input Container */}
					<div className="relative flex-1">
						<Input
							ref={inputRef}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onFocus={() => {
								if (query.length > 0 && suggestions.length > 0) setShowSuggestions(true);
								prefetchProperties(); // Start prefetching when user focuses on search
							}}
							onKeyDown={handleKeyDown}
							placeholder="Enter a city, neighborhood, or ZIP"
							className="h-16 w-full rounded-l-xl border-0 bg-white pl-6 pr-12 text-base shadow-md placeholder:text-gray-400 focus:ring-2 focus:ring-[#2C477D]"
						/>
						{isSearching && (
							<div className="absolute right-4 top-1/2 -translate-y-1/2">
								<Loader2 className="h-5 w-5 animate-spin text-gray-400" />
							</div>
						)}
					</div>

					{/* Search Button */}
					<Button 
						type="submit" 
						className="h-16 rounded-r-xl px-6 bg-[#2C477D] hover:bg-[#1e3a8a] shadow-md border-0"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</Button>
				</div>

				{/* Enhanced Search Dropdown */}
				{showSuggestions && (suggestions.length > 0 || properties.length > 0) && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-[180px] right-[65px] z-50 mt-3 animate-in fade-in slide-in-from-top-2 duration-300"
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
			</form>
		</div>
	);
}


