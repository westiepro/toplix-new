import type { Locale } from './i18n-config';

/**
 * Transaction type translations for URLs
 */
export const TRANSACTION_TRANSLATIONS = {
	buy: {
		en: 'buy',
		pt: 'comprar',
		es: 'comprar',
		fr: 'acheter',
		de: 'kaufen',
		sv: 'kopa',
	},
	rent: {
		en: 'rent',
		pt: 'alugar',
		es: 'alquilar',
		fr: 'louer',
		de: 'mieten',
		sv: 'hyra',
	},
} as const;

/**
 * Property category translations for URLs
 */
export const CATEGORY_TRANSLATIONS = {
	apartment: {
		en: 'apartments',
		pt: 'apartamentos',
		es: 'apartamentos',
		fr: 'appartements',
		de: 'wohnungen',
		sv: 'lagenheter',
	},
	villa: {
		en: 'villas',
		pt: 'moradias',
		es: 'villas',
		fr: 'villas',
		de: 'villen',
		sv: 'villor',
	},
	townhouse: {
		en: 'townhouses',
		pt: 'casas-geminadas',
		es: 'adosados',
		fr: 'maisons-de-ville',
		de: 'reihenhauser',
		sv: 'radhus',
	},
	land: {
		en: 'land',
		pt: 'terrenos',
		es: 'terrenos',
		fr: 'terrains',
		de: 'grundstucke',
		sv: 'mark',
	},
	commercial: {
		en: 'commercial',
		pt: 'comercial',
		es: 'comercial',
		fr: 'commercial',
		de: 'gewerbe',
		sv: 'kommersiellt',
	},
} as const;

export type TransactionType = keyof typeof TRANSACTION_TRANSLATIONS;
export type CategoryType = keyof typeof CATEGORY_TRANSLATIONS;

/**
 * Normalize text for URL slugs
 * Converts "São Paulo" → "sao-paulo"
 */
export function normalizeSlug(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD') // Decompose accented characters
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get translated transaction type slug for a locale
 */
export function getTransactionSlug(
	transactionType: TransactionType,
	locale: Locale
): string {
	return TRANSACTION_TRANSLATIONS[transactionType][locale];
}

/**
 * Get translated category slug for a locale
 */
export function getCategorySlug(
	category: string,
	locale: Locale
): string {
	// Normalize category to match our keys
	const normalizedCategory = category.toLowerCase() as CategoryType;
	
	if (normalizedCategory in CATEGORY_TRANSLATIONS) {
		return CATEGORY_TRANSLATIONS[normalizedCategory][locale];
	}
	
	// Fallback: just normalize the category name
	return normalizeSlug(category);
}

/**
 * Reverse lookup: Get transaction type from translated slug
 */
export function getTransactionTypeFromSlug(
	slug: string,
	locale: Locale
): TransactionType | null {
	for (const [key, translations] of Object.entries(TRANSACTION_TRANSLATIONS)) {
		if (translations[locale] === slug) {
			return key as TransactionType;
		}
	}
	return null;
}

/**
 * Reverse lookup: Get category from translated slug
 */
export function getCategoryFromSlug(
	slug: string,
	locale: Locale
): string | null {
	for (const [key, translations] of Object.entries(CATEGORY_TRANSLATIONS)) {
		if (translations[locale] === slug) {
			return key;
		}
	}
	return null;
}

/**
 * Generate a unique 8-9 digit ID for URL
 */
export function generateUrlSlugId(): string {
	// Generate random 8-9 digit number
	const min = 10000000; // 8 digits
	const max = 999999999; // 9 digits
	return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
