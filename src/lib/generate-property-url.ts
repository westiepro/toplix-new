import type { Locale } from './i18n-config';
import {
	normalizeSlug,
	getTransactionSlug,
	getHousesApartmentsSlug,
	getTransactionTypeFromSlug,
	type TransactionType,
} from './url-translations';

export interface PropertyUrlData {
	id: string;
	url_slug_id?: string;
	transaction_type?: string;
	city: string;
}

/**
 * Generate a localized SEO-friendly URL for a property
 * Example: /pt/comprar/lisboa/casas-apartamentos/145734848
 */
export function generatePropertyUrl(
	property: PropertyUrlData,
	locale: Locale
): string {
	const {
		url_slug_id,
		transaction_type = 'buy',
		city,
	} = property;

	// Use url_slug_id if available, otherwise fall back to id
	const urlId = url_slug_id || property.id;

	// Get translated transaction type (buy/rent)
	const transactionSlug = getTransactionSlug(
		transaction_type as TransactionType,
		locale
	);

	// Normalize city for URL
	const citySlug = normalizeSlug(city);

	// Get translated houses-apartments segment
	const housesApartmentsSlug = getHousesApartmentsSlug(locale);

	// Build the URL: /[lang]/[transaction]/[city]/[houses-apartments]/[id]
	return `/${locale}/${transactionSlug}/${citySlug}/${housesApartmentsSlug}/${urlId}`;
}

/**
 * Parse a property URL to extract components
 * Example: /pt/comprar/lisboa/casas-apartamentos/145734848
 */
export function parsePropertyUrl(pathname: string): {
	locale: Locale;
	transactionType: string | null;
	city: string;
	id: string;
} | null {
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');

	// Expect: [locale, transaction, city, houses-apartments, id]
	if (segments.length !== 5) {
		return null;
	}

	const [locale, transactionSlug, city, housesApartmentsSlug, id] = segments;

	// Validate houses-apartments segment
	const expectedSlug = getHousesApartmentsSlug(locale as Locale);
	if (housesApartmentsSlug !== expectedSlug) {
		return null;
	}

	// Get transaction type from slug
	const transactionType = getTransactionTypeFromSlug(
		transactionSlug,
		locale as Locale
	);

	return {
		locale: locale as Locale,
		transactionType,
		city,
		id,
	};
}

/**
 * Check if a pathname matches the new property URL pattern
 */
export function isPropertyUrl(pathname: string): boolean {
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');
	
	// Must have exactly 5 segments
	if (segments.length !== 5) {
		return false;
	}

	// Last segment should be a number
	const id = segments[4];
	return /^\d{1,15}$/.test(id);
}

/**
 * Check if a pathname matches the old property URL pattern
 */
export function isOldPropertyUrl(pathname: string): boolean {
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');
	
	if (segments.length !== 3) {
		return false;
	}

	return segments[1] === 'property' && /^[a-f0-9-]{36}|^\d+$/.test(segments[2]);
}

/**
 * Generate fallback URL for properties without complete data
 */
export function generateFallbackPropertyUrl(
	property: Partial<PropertyUrlData>,
	locale: Locale
): string {
	if (!property.id) {
		return `/${locale}/property/unknown`;
	}

	if (property.city && (property.url_slug_id || property.id)) {
		return generatePropertyUrl(property as PropertyUrlData, locale);
	}

	// Fallback to old format
	return `/${locale}/property/${property.id}`;
}

/**
 * Build a search/listing URL
 * Example: /pt/comprar/lisboa
 */
export function generateListingUrl(
	locale: Locale,
	transactionType: TransactionType,
	city?: string
): string {
	const transactionSlug = getTransactionSlug(transactionType, locale);
	
	if (city) {
		const citySlug = normalizeSlug(city);
		return `/${locale}/${transactionSlug}/${citySlug}`;
	}
	
	return `/${locale}/${transactionSlug}`;
}
