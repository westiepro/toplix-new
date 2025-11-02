"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export function HeroSearch() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Filter cities based on input
	useEffect(() => {
		if (query.length > 0) {
			const filtered = POPULAR_CITIES
				.filter(city => 
					city.toLowerCase().startsWith(query.toLowerCase())
				)
				.slice(0, 10); // Limit to 10 suggestions
			setSuggestions(filtered);
			setShowSuggestions(filtered.length > 0);
			setSelectedIndex(-1);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, [query]);


	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setShowSuggestions(false);
		const params = new URLSearchParams();
		if (query.trim()) params.set("q", query.trim());
		router.push(`/homes?${params.toString()}`);
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
					setQuery(suggestions[selectedIndex]);
					setShowSuggestions(false);
					// Submit with selected city
					setTimeout(() => {
						const params = new URLSearchParams();
						params.set("q", suggestions[selectedIndex]);
						router.push(`/homes?${params.toString()}`);
					}, 0);
				}
				break;
			case "Escape":
				e.preventDefault();
				setShowSuggestions(false);
				break;
		}
	}

	function handleSelect(city: string) {
		setQuery(city);
		setShowSuggestions(false);
		// Optionally auto-submit on selection
		// router.push(`/homes?q=${encodeURIComponent(city)}`);
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
		<div className="relative mx-auto w-full max-w-2xl">
			<form onSubmit={onSubmit}>
				<div className="relative group">
					<Input
						ref={inputRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onFocus={() => query.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
						onKeyDown={handleKeyDown}
						placeholder="Enter a city, neighborhood, or ZIP"
						className="h-16 w-full rounded-full border-2 border-white/30 bg-white/95 backdrop-blur-md pl-6 pr-36 text-base shadow-2xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(25,135,84,0.3)] hover:border-[#198754]/50 focus:border-[#198754] focus:shadow-[0_20px_60px_rgba(25,135,84,0.4)] focus:bg-white placeholder:text-gray-400"
					/>
					<Button 
						type="submit" 
						className="absolute right-2 top-2 h-12 rounded-full px-8 bg-[#198754] hover:bg-[#0d5c37] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
					>
						Search
					</Button>
					{showSuggestions && suggestions.length > 0 && (
						<div
							ref={dropdownRef}
							className="absolute top-full left-0 right-0 z-50 mt-3 max-h-60 w-full overflow-auto rounded-2xl border border-white/20 bg-white/98 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300"
						>
							{suggestions.map((city, index) => (
								<button
									key={city}
									type="button"
									onClick={() => handleSelect(city)}
									className={`w-full px-6 py-3 text-left text-sm transition-all duration-200 cursor-pointer flex items-center gap-3 ${
										index === selectedIndex ? "bg-[#198754]/10 text-[#198754] font-medium" : "hover:bg-gray-50 text-gray-700"
									}`}
								>
									<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									{city}
								</button>
							))}
						</div>
					)}
				</div>
			</form>
		</div>
	);
}


