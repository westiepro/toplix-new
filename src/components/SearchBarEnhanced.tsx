"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, MapPin, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations, type SearchLocation } from "@/lib/geocoding";
import { useMapStore } from "@/stores/mapStore";

export function SearchBarEnhanced() {
  const { selectedCity, setCity, setCenter } = useMapStore();
  const [searchQuery, setSearchQuery] = useState(selectedCity || "");
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with store
  useEffect(() => {
    if (selectedCity) {
      setSearchQuery(selectedCity);
    }
  }, [selectedCity]);

  // Perform search
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = await searchLocations(query);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setSelectedIndex(-1);
    setIsSearching(false);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearCity = () => {
    setSearchQuery("");
    setCity(null);
    setCenter({ lat: 37.06, lng: -8.3, zoom: 9 });
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleSelectCity = (location: SearchLocation) => {
    setSearchQuery(location.name);
    setCity(location.name);
    setCenter({
      lat: location.lat,
      lng: location.lng,
      zoom: 12,
    });
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectCity(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          ref={searchInputRef}
          placeholder="Search city, region, or area..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleSearchKeyDown}
          className={`pl-10 ${searchQuery ? 'pr-10' : 'pr-4'} h-12 text-base shadow-lg`}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-200"
            onClick={handleClearCity}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isSearching && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-[1000] mt-2 max-h-96 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-2xl"
        >
          {suggestions.map((location, index) => (
            <button
              key={location.id}
              type="button"
              onClick={() => handleSelectCity(location)}
              className={`w-full px-4 py-3 text-left transition-colors cursor-pointer flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? "bg-[#2C477D]/10" : "hover:bg-gray-50"
              }`}
            >
              <MapPin className={`h-5 w-5 flex-shrink-0 ${index === selectedIndex ? "text-[#2C477D]" : "text-gray-400"}`} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{location.name}</div>
                <div className="text-sm text-gray-500 truncate">{location.displayName}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

