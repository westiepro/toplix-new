"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";
import { isPropertyUrl, parsePropertyUrl } from "@/lib/generate-property-url";
import { getTransactionSlug, getCategorySlug, normalizeSlug } from "@/lib/url-translations";

export type LanguageCode = Locale;

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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
	children: ReactNode;
	locale: Locale;
	translations: Record<string, string>;
	languages: Language[];
}

export function LanguageProvider({
	children,
	locale,
	translations,
	languages,
}: LanguageProviderProps) {
	const pathname = usePathname();
	const router = useRouter();

	const setLanguage = (newLocale: LanguageCode) => {
		if (!locales.includes(newLocale)) return;

		// Check if we're on a property page with localized URL
		if (isPropertyUrl(pathname)) {
			const parsed = parsePropertyUrl(pathname);
			if (parsed && parsed.transactionType && parsed.category) {
				// Rebuild URL with new locale and translated segments
				const transactionSlug = getTransactionSlug(
					parsed.transactionType as any,
					newLocale
				);
				const categorySlug = getCategorySlug(parsed.category, newLocale);
				const districtSlug = normalizeSlug(parsed.district);
				const citySlug = normalizeSlug(parsed.city);
				
				const newPath = `/${newLocale}/${transactionSlug}/${districtSlug}/${citySlug}/${categorySlug}/${parsed.id}`;
				
				// Set cookie and navigate
				document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
				router.push(newPath);
				return;
			}
		}

		// Default behavior for other pages
		const segments = pathname.split('/');
		segments[1] = newLocale; // Replace locale segment
		const newPath = segments.join('/');

		// Set cookie and navigate
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
		router.push(newPath);
	};

	const value: LanguageContextType = {
		currentLanguage: locale,
		setLanguage,
		languages,
		translations,
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

