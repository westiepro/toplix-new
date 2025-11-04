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
		pt: 'arrendar',
		es: 'alquilar',
		fr: 'louer',
		de: 'mieten',
		sv: 'hyra',
	},
} as const;

/**
 * Fixed "houses-apartments" segment translations
 */
export const HOUSES_APARTMENTS_TRANSLATIONS = {
	en: 'houses-apartments',
	pt: 'casas-apartamentos',
	es: 'casas-apartamentos',
	fr: 'maisons-appartements',
	de: 'hauser-wohnungen',
	sv: 'hus-lagenheter',
} as const;

export type TransactionType = keyof typeof TRANSACTION_TRANSLATIONS;

/**
 * Normalize text for URL slugs
 * Converts "São Paulo" → "sao-paulo"
 */
export function normalizeSlug(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
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
 * Get translated houses-apartments slug for a locale
 */
export function getHousesApartmentsSlug(locale: Locale): string {
	return HOUSES_APARTMENTS_TRANSLATIONS[locale];
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
 * Generate a unique 8-9 digit ID for URL
 */
export function generateUrlSlugId(): string {
	const min = 10000000;
	const max = 999999999;
	return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
