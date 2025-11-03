import type { Locale } from './i18n-config';
import {
	normalizeSlug,
	getTransactionSlug,
	getCategorySlug,
	getTransactionTypeFromSlug,
	getCategoryFromSlug,
	type TransactionType,
} from './url-translations';

export interface PropertyUrlData {
	id: string;
	url_slug_id?: string;
	transaction_type?: string;
	district?: string;
	city: string;
	property_type: string;
}

/**
 * Generate a localized SEO-friendly URL for a property
 * Example: /pt/comprar/lisboa/alfama/apartamentos/145734848
 */
export function generatePropertyUrl(
	property: PropertyUrlData,
	locale: Locale
): string {
	const {
		url_slug_id,
		transaction_type = 'buy',
		district,
		city,
		property_type,
	} = property;

	// Use url_slug_id if available, otherwise fall back to id
	const urlId = url_slug_id || property.id;

	// Get translated transaction type (buy/rent)
	const transactionSlug = getTransactionSlug(
		transaction_type as TransactionType,
		locale
	);

	// Normalize district and city for URL
	const districtSlug = normalizeSlug(district || city);
	const citySlug = normalizeSlug(city);

	// Get translated category
	const categorySlug = getCategorySlug(property_type, locale);

	// Build the URL
	return `/${locale}/${transactionSlug}/${districtSlug}/${citySlug}/${categorySlug}/${urlId}`;
}

/**
 * Parse a property URL to extract components
 * Example: /pt/comprar/lisboa/alfama/apartamentos/145734848
 * Returns: { locale: 'pt', transactionType: 'buy', district: 'lisboa', city: 'alfama', category: 'apartment', id: '145734848' }
 */
export function parsePropertyUrl(pathname: string): {
	locale: Locale;
	transactionType: string | null;
	district: string;
	city: string;
	category: string | null;
	id: string;
} | null {
	// Remove leading/trailing slashes and split
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');

	// Expect: [locale, transaction, district, city, category, id]
	if (segments.length !== 6) {
		return null;
	}

	const [locale, transactionSlug, district, city, categorySlug, id] = segments;

	// Get transaction type from slug
	const transactionType = getTransactionTypeFromSlug(
		transactionSlug,
		locale as Locale
	);

	// Get category from slug
	const category = getCategoryFromSlug(categorySlug, locale as Locale);

	return {
		locale: locale as Locale,
		transactionType,
		district,
		city,
		category,
		id,
	};
}

/**
 * Check if a pathname matches the new property URL pattern
 */
export function isPropertyUrl(pathname: string): boolean {
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');
	
	// Must have exactly 6 segments: [locale, transaction, district, city, category, id]
	if (segments.length !== 6) {
		return false;
	}

	// Last segment should be a number (url_slug_id or id)
	const id = segments[5];
	return /^\d{1,15}$/.test(id);
}

/**
 * Check if a pathname matches the old property URL pattern (/[lang]/property/[id])
 */
export function isOldPropertyUrl(pathname: string): boolean {
	const segments = pathname.replace(/^\/|\/$/g, '').split('/');
	
	// Must have exactly 3 segments: [locale, "property", id]
	if (segments.length !== 3) {
		return false;
	}

	return segments[1] === 'property' && /^[a-f0-9-]{36}|^\d+$/.test(segments[2]);
}

/**
 * Generate fallback URL for properties without complete data
 * Falls back to simpler URL structure if data is missing
 */
export function generateFallbackPropertyUrl(
	property: Partial<PropertyUrlData>,
	locale: Locale
): string {
	if (!property.id) {
		return `/${locale}/property/unknown`;
	}

	// If we have all required data, use full URL
	if (
		property.city &&
		property.property_type &&
		(property.url_slug_id || property.id)
	) {
		return generatePropertyUrl(property as PropertyUrlData, locale);
	}

	// Fallback to old format
	return `/${locale}/property/${property.id}`;
}

/**
 * Build a search/listing URL with filters
 * Example: /pt/comprar/lisboa or /en/rent/algarve
 */
export function generateListingUrl(
	locale: Locale,
	transactionType: TransactionType,
	district?: string,
	city?: string
): string {
	const transactionSlug = getTransactionSlug(transactionType, locale);
	
	if (city) {
		const districtSlug = normalizeSlug(district || city);
		const citySlug = normalizeSlug(city);
		return `/${locale}/${transactionSlug}/${districtSlug}/${citySlug}`;
	}
	
	if (district) {
		const districtSlug = normalizeSlug(district);
		return `/${locale}/${transactionSlug}/${districtSlug}`;
	}
	
	return `/${locale}/${transactionSlug}`;
}
