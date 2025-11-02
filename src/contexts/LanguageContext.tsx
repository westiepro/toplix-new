"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";

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

		// Get current path without locale prefix
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

