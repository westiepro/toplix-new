"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ComponentProps } from "react";
import type { Locale } from "@/lib/i18n-config";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
	href: string;
};

// Route translations: canonical route to translated slug per language
const routeTranslations: Record<Locale, Record<string, string>> = {
	en: { buy: 'buy' },
	pt: { buy: 'comprar' },
	es: { buy: 'comprar' },
	fr: { buy: 'acheter' },
	de: { buy: 'kaufen' },
	sv: { buy: 'kop' },
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
	const { currentLanguage } = useLanguage();

	// Parse the href to translate route slugs
	let translatedHref = href;
	
	// Extract path and query
	const [path, query] = href.split('?');
	const segments = path.split('/').filter(Boolean);
	
	// Translate the first segment if it's a translatable route
	if (segments.length > 0 && routeTranslations[currentLanguage]?.[segments[0]]) {
		segments[0] = routeTranslations[currentLanguage][segments[0]];
		translatedHref = '/' + segments.join('/') + (query ? '?' + query : '');
	}

	// Add locale prefix if not already present
	const localizedHref = translatedHref.startsWith(`/${currentLanguage}`)
		? translatedHref
		: `/${currentLanguage}${translatedHref.startsWith('/') ? translatedHref : `/${translatedHref}`}`;

	return <Link href={localizedHref} {...props} />;
}

