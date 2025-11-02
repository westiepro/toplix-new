"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, MapPin, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchLocations, type SearchLocation } from "@/lib/geocoding";
import { useMapStore } from "@/stores/mapStore";

type SearchBarProps = {
  onCitySelect?: (location: SearchLocation) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  onCitySelect,
  onClear,
  placeholder = "Search city, region, or address",
  className = "",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { selectedCity, flyToLocation } = useMapStore();

  // Sync with store's selected city
  useEffect(() => {
    if (selectedCity && selectedCity !== searchQuery) {
      setSearchQuery(selectedCity);
    }
  }, [selectedCity]);

  // Debounced search function
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

  // Trigger search when query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms debounce

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

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleClearSearch() {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    onClear?.();
    searchInputRef.current?.focus();
  }

  function handleSelectLocation(location: SearchLocation) {
    setSearchQuery(location.name);
    setShowSuggestions(false);
    
    // Fly to location on map
    flyToLocation({
      lat: location.lat,
      lng: location.lng,
      zoom: 12,
    }, location.name);
    
    // Call callback
    onCitySelect?.(location);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectLocation(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          ref={searchInputRef}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleSearchKeyDown}
          className={`pl-10 ${searchQuery ? 'pr-20' : 'pr-4'}`}
        />
        {isSearching && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-[1000] mt-1 max-h-80 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl"
        >
          {suggestions.map((location, index) => (
            <button
              key={location.id}
              type="button"
              onClick={() => handleSelectLocation(location)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors cursor-pointer flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                index === selectedIndex
                  ? "bg-[#2C477D]/10 text-[#2C477D] dark:bg-[#2C477D]/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <MapPin
                className={`h-4 w-4 flex-shrink-0 ${
                  index === selectedIndex
                    ? "text-[#2C477D]"
                    : "text-gray-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{location.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {location.displayName}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

