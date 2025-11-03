"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FavoritesContextType = {
	favorites: string[];
	addFavorite: (propertyId: string) => void;
	removeFavorite: (propertyId: string) => void;
	isFavorite: (propertyId: string) => boolean;
	getFavorites: () => string[];
	cleanupStaleFavorites: (validPropertyIds: string[]) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [favorites, setFavorites] = useState<string[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load favorites from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem("favorites");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setFavorites(Array.isArray(parsed) ? parsed : []);
			} catch (e) {
				console.error("Failed to parse favorites from localStorage", e);
				setFavorites([]);
			}
		}
		setIsLoaded(true);
	}, []);

	// Save favorites to localStorage whenever they change
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	}, [favorites, isLoaded]);

	const addFavorite = (propertyId: string) => {
		setFavorites((prev) => {
			if (prev.includes(propertyId)) return prev;
			return [...prev, propertyId];
		});
	};

	const removeFavorite = (propertyId: string) => {
		setFavorites((prev) => prev.filter((id) => id !== propertyId));
	};

	const isFavorite = (propertyId: string) => {
		return favorites.includes(propertyId);
	};

	const getFavorites = () => {
		return favorites;
	};

	const cleanupStaleFavorites = (validPropertyIds: string[]) => {
		setFavorites((prev) => {
			const cleaned = prev.filter((id) => validPropertyIds.includes(id));
			// Only update if there were stale favorites
			if (cleaned.length !== prev.length) {
				console.log(`Cleaned ${prev.length - cleaned.length} stale favorites`);
			}
			return cleaned;
		});
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
				isFavorite,
				getFavorites,
				cleanupStaleFavorites,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavoritesContext() {
	const context = useContext(FavoritesContext);
	if (context === undefined) {
		throw new Error("useFavoritesContext must be used within a FavoritesProvider");
	}
	return context;
}




