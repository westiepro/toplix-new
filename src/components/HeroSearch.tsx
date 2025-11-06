"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations, debounce, type SearchLocation } from "@/lib/geocoding";
import { MapPin, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n-config";
import { prefetchProperties } from "@/lib/properties-cache";

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
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isSearching, setIsSearching] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
		performSearch(query);
	}, [query, performSearch]);


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

	// Handle keyboard navigation
	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" && (!showSuggestions || suggestions.length === 0 || selectedIndex < 0)) {
			// Let form handle submit if no suggestion is selected
			return;
		}

		if (!showSuggestions || suggestions.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex(prev => 
					prev < suggestions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
				break;
			case "Enter":
				e.preventDefault();
				if (selectedIndex >= 0) {
					const location = suggestions[selectedIndex];
					setQuery(location.name);
					setShowSuggestions(false);
					// Prefetch and submit with selected location
					prefetchProperties();
					setTimeout(() => {
						const buyRoute = routeTranslations[currentLanguage]?.buy || 'buy';
						const params = new URLSearchParams();
						params.set("lat", location.lat.toString());
						params.set("lng", location.lng.toString());
						params.set("zoom", "12");
						params.set("q", location.name);
						params.set("for", searchType);
						router.push(`/${currentLanguage}/${buyRoute}?${params.toString()}`);
					}, 0);
				}
				break;
			case "Escape":
				e.preventDefault();
				setShowSuggestions(false);
				break;
		}
	}

	function handleSelect(location: SearchLocation) {
		setQuery(location.name);
		setShowSuggestions(false);
		// Prefetch and auto-submit with geocoded location
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

				{/* Autocomplete Dropdown */}
				{showSuggestions && suggestions.length > 0 && (
					<div
						ref={dropdownRef}
						className="absolute top-full left-[180px] right-[65px] z-50 mt-3 max-h-80 overflow-auto rounded-xl border border-gray-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300"
					>
						{suggestions.map((location, index) => (
							<button
								key={location.id}
								type="button"
								onClick={() => handleSelect(location)}
								className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
									index === selectedIndex ? "bg-[#2C477D]/10 text-[#2C477D] font-medium" : "hover:bg-gray-50 text-gray-700"
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
			</form>
		</div>
	);
}


