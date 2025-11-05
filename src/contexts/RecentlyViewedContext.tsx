"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ViewedProperty {
	propertyId: string;
	viewedAt: string;
}

type RecentlyViewedContextType = {
	recentlyViewed: ViewedProperty[];
	addToRecentlyViewed: (propertyId: string) => void;
	getRecentlyViewedIds: () => string[];
	clearRecentlyViewed: () => void;
	syncFromSupabase: () => Promise<void>;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
	const [recentlyViewed, setRecentlyViewed] = useState<ViewedProperty[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load recently viewed from localStorage on mount
	useEffect(() => {
		const stored = localStorage.getItem("recently-viewed");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setRecentlyViewed(Array.isArray(parsed) ? parsed : []);
			} catch (e) {
				console.error("Failed to parse recently viewed from localStorage", e);
				setRecentlyViewed([]);
			}
		}
		setIsLoaded(true);
	}, []);

	// Save recently viewed to localStorage whenever they change
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("recently-viewed", JSON.stringify(recentlyViewed));
		}
	}, [recentlyViewed, isLoaded]);

	// Sync from Supabase (fetch user's views from database)
	// Use useCallback to prevent function from changing on every render
	const syncFromSupabase = useCallback(async () => {
		try {
			// Get user ID from localStorage
			const userJson = localStorage.getItem("sb-user");
			if (!userJson) {
				console.log("No user found, skipping Supabase sync");
				return;
			}

			const userData = JSON.parse(userJson);
			const userId = userData?.id;
			
			if (!userId) {
				console.log("No user ID found");
				return;
			}

			const response = await fetch(`/api/user-views?userId=${userId}`);
			if (!response.ok) {
				console.error("Failed to fetch views from Supabase");
				return;
			}

			const data = await response.json();
			const views = data.views || [];
			
			// Update state with Supabase data
			const formattedViews = views.map((v: any) => ({
				propertyId: v.property_id,
				viewedAt: v.viewed_at,
			}));
			
			setRecentlyViewed(formattedViews);
			
			// Also update localStorage
			localStorage.setItem("recently-viewed", JSON.stringify(formattedViews));
			
			console.log(`Synced ${formattedViews.length} views from Supabase`);
		} catch (error) {
			console.error("Error syncing from Supabase:", error);
		}
	}, []); // Empty deps - function doesn't depend on any external values

	const addToRecentlyViewed = useCallback(async (propertyId: string) => {
		// Update local state immediately
		setRecentlyViewed((prev) => {
			// Remove if already exists (to move to front)
			const filtered = prev.filter((item) => item.propertyId !== propertyId);
			
			// Add to front with current timestamp
			const updated = [
				{ propertyId, viewedAt: new Date().toISOString() },
				...filtered,
			];
			
			// Keep only the last 20 viewed properties
			return updated.slice(0, 20);
		});

		// Save to Supabase in background (if user is logged in)
		try {
			const userJson = localStorage.getItem("sb-user");
			if (!userJson) return; // Guest user, only use localStorage

			const userData = JSON.parse(userJson);
			const userId = userData?.id;
			
			if (!userId) return;

			// Save to Supabase
			await fetch('/api/user-views', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId, propertyId }),
			});
		} catch (error) {
			console.error("Failed to save view to Supabase:", error);
			// Continue anyway - local tracking still works
		}
	}, []); // Empty deps - uses setRecentlyViewed functional update

	const getRecentlyViewedIds = useCallback(() => {
		return recentlyViewed.map((item) => item.propertyId);
	}, [recentlyViewed]);

	const clearRecentlyViewed = useCallback(() => {
		setRecentlyViewed([]);
		localStorage.removeItem("recently-viewed");
	}, []);

	return (
		<RecentlyViewedContext.Provider
			value={{
				recentlyViewed,
				addToRecentlyViewed,
				getRecentlyViewedIds,
				clearRecentlyViewed,
				syncFromSupabase,
			}}
		>
			{children}
		</RecentlyViewedContext.Provider>
	);
}

export function useRecentlyViewedContext() {
	const context = useContext(RecentlyViewedContext);
	if (context === undefined) {
		throw new Error("useRecentlyViewedContext must be used within a RecentlyViewedProvider");
	}
	return context;
}

