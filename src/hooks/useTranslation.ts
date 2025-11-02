"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface InterpolationParams {
	[key: string]: string | number;
}

export function useTranslation() {
	const { translations, currentLanguage, isLoading } = useLanguage();

	/**
	 * Translate a key to the current language
	 * @param key - The translation key (e.g., "home.hero.title")
	 * @param params - Optional interpolation parameters (e.g., { name: "John" })
	 * @returns The translated string, or the key if translation not found
	 */
	const t = (key: string, params?: InterpolationParams): string => {
		let translation = translations[key];

		// Fallback to key if translation not found
		if (!translation) {
			console.warn(`Translation missing for key: ${key} (language: ${currentLanguage})`);
			return key;
		}

		// Handle interpolation if params provided
		if (params) {
			Object.keys(params).forEach((paramKey) => {
				const placeholder = `{{${paramKey}}}`;
				translation = translation.replace(new RegExp(placeholder, "g"), String(params[paramKey]));
			});
		}

		return translation;
	};

	/**
	 * Check if a translation exists for the given key
	 */
	const hasTranslation = (key: string): boolean => {
		return key in translations;
	};

	/**
	 * Get translation or return a default value if not found
	 */
	const tOr = (key: string, defaultValue: string, params?: InterpolationParams): string => {
		if (!hasTranslation(key)) {
			return defaultValue;
		}
		return t(key, params);
	};

	return {
		t,
		hasTranslation,
		tOr,
		currentLanguage,
		isLoading,
	};
}

