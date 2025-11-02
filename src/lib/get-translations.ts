import { createClient } from '@supabase/supabase-js';
import type { Locale } from './i18n-config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side translations cache
const translationsCache = new Map<Locale, Record<string, string>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map<Locale, number>();

export async function getTranslations(
	locale: Locale
): Promise<Record<string, string>> {
	// Check cache
	const cachedTime = cacheTimestamps.get(locale);
	if (cachedTime && Date.now() - cachedTime < CACHE_DURATION) {
		const cached = translationsCache.get(locale);
		if (cached) {
			return cached;
		}
	}

	// Fetch from Supabase
	if (!supabaseUrl || !supabaseKey) {
		console.warn('Supabase not configured, returning empty translations');
		return {};
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseKey);
		const { data, error } = await supabase
			.from('translations')
			.select('key, value')
			.eq('language_code', locale);

		if (error) {
			console.error(`Error fetching translations for ${locale}:`, error);
			return {};
		}

		const translations: Record<string, string> = {};
		data?.forEach((t) => {
			translations[t.key] = t.value;
		});

		// Update cache
		translationsCache.set(locale, translations);
		cacheTimestamps.set(locale, Date.now());

		return translations;
	} catch (error) {
		console.error(`Failed to load translations for ${locale}:`, error);
		return {};
	}
}

// Helper for property translations
export async function getPropertyTranslations(
	locale: Locale,
	propertyIds: string[]
) {
	if (locale === 'en' || !supabaseUrl || !supabaseKey || propertyIds.length === 0) {
		return {};
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseKey);
		const { data, error } = await supabase
			.from('property_translations')
			.select('*')
			.in('property_id', propertyIds)
			.eq('language_code', locale);

		if (error) {
			console.error('Error fetching property translations:', error);
			return {};
		}

		const translations: Record<string, any> = {};
		data?.forEach((t) => {
			translations[t.property_id] = t;
		});

		return translations;
	} catch (error) {
		console.error('Failed to load property translations:', error);
		return {};
	}
}

