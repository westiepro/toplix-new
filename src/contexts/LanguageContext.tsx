"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export type LanguageCode = "en" | "pt" | "es" | "fr" | "de" | "sv";

export interface Language {
	code: LanguageCode;
	name: string;
	flag_emoji: string;
	is_active: boolean;
}

export interface Translation {
	key: string;
	value: string;
	is_auto_translated: boolean;
	namespace: string;
}

interface LanguageContextType {
	currentLanguage: LanguageCode;
	setLanguage: (lang: LanguageCode) => void;
	languages: Language[];
	translations: Record<string, string>;
	isLoading: boolean;
	refreshTranslations: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
	children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
	const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Record<string, string>>({});
	const [isLoading, setIsLoading] = useState(true);

	// Load languages from Supabase
	const loadLanguages = async () => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			// Supabase not configured - use default English only
			setLanguages([
				{ code: "en", name: "English", flag_emoji: "🇬🇧", is_active: true }
			]);
			return;
		}

		try {
			const { data, error } = await supabase
				.from("languages")
				.select("*")
				.eq("is_active", true)
				.order("code");

			if (error) {
				// Languages table doesn't exist yet - use default English
				console.warn("Languages table not found. Using English as default.");
				setLanguages([
					{ code: "en", name: "English", flag_emoji: "🇬🇧", is_active: true }
				]);
				return;
			}

			if (data && data.length > 0) {
				setLanguages(data);
			} else {
				// No languages in database - use default
				setLanguages([
					{ code: "en", name: "English", flag_emoji: "🇬🇧", is_active: true }
				]);
			}
		} catch (error) {
			// Fail gracefully
			console.warn("Could not load languages. Using English as default.");
			setLanguages([
				{ code: "en", name: "English", flag_emoji: "🇬🇧", is_active: true }
			]);
		}
	};

	// Load translations for current language
	const loadTranslations = async (languageCode: LanguageCode) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			// Supabase not configured, use empty translations
			setTranslations({});
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			const { data, error } = await supabase
				.from("translations")
				.select("key, value")
				.eq("language_code", languageCode);

			if (error) {
				// Translation table might not exist yet - fail gracefully
				console.warn("Translation system not initialized yet. Run the SQL schema and initialization script.");
				console.warn("See TRANSLATION_SETUP_GUIDE.md for instructions.");
				setTranslations({});
				setIsLoading(false);
				return;
			}

			if (data) {
				const translationsMap: Record<string, string> = {};
				data.forEach((t) => {
					translationsMap[t.key] = t.value;
				});
				setTranslations(translationsMap);
			} else {
				setTranslations({});
			}
		} catch (error) {
			// Fail gracefully - don't break the app
			console.warn("Translation system not initialized. App will use translation keys as fallback.");
			setTranslations({});
		} finally {
			setIsLoading(false);
		}
	};

	// Refresh translations manually
	const refreshTranslations = async () => {
		await loadTranslations(currentLanguage);
	};

	// Initialize on mount
	useEffect(() => {
		// Load saved language from localStorage
		const savedLanguage = localStorage.getItem("preferred-language") as LanguageCode;
		if (savedLanguage && ["en", "pt", "es", "fr", "de", "sv"].includes(savedLanguage)) {
			setCurrentLanguage(savedLanguage);
		}

		loadLanguages();
	}, []);

	// Load translations when language changes
	useEffect(() => {
		loadTranslations(currentLanguage);
	}, [currentLanguage]);

	// Change language and persist to localStorage
	const setLanguage = (lang: LanguageCode) => {
		setCurrentLanguage(lang);
		localStorage.setItem("preferred-language", lang);
	};

	const value: LanguageContextType = {
		currentLanguage,
		setLanguage,
		languages,
		translations,
		isLoading,
		refreshTranslations,
	};

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

