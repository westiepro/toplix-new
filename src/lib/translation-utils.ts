import { getSupabaseClient } from "./supabaseClient";
import { ENGLISH_TRANSLATIONS, getAllTranslationKeys, getAllNamespaces } from "./translation-keys";

/**
 * Seed initial English translations to the database
 */
export async function seedEnglishTranslations(): Promise<{ success: boolean; error?: string }> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return { success: false, error: "Supabase client not available" };
	}

	try {
		const translationsToInsert = Object.entries(ENGLISH_TRANSLATIONS).map(([key, value]) => {
			const namespace = key.split(".")[0];
			return {
				key,
				language_code: "en",
				value,
				is_auto_translated: false,
				namespace,
			};
		});

		// Insert all English translations (ignore conflicts)
		const { error } = await supabase
			.from("translations")
			.upsert(translationsToInsert, { onConflict: "key,language_code" });

		if (error) {
			console.error("Error seeding English translations:", error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (error) {
		console.error("Error seeding English translations:", error);
		return { success: false, error: String(error) };
	}
}

/**
 * Get missing translation keys for a specific language
 */
export async function getMissingTranslations(languageCode: string): Promise<string[]> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return [];
	}

	try {
		// Get all existing translations for this language
		const { data, error } = await supabase
			.from("translations")
			.select("key")
			.eq("language_code", languageCode);

		if (error) {
			console.error("Error fetching translations:", error);
			return [];
		}

		const existingKeys = new Set(data?.map((t) => t.key) || []);
		const allKeys = getAllTranslationKeys();

		// Return keys that don't exist yet
		return allKeys.filter((key) => !existingKeys.has(key));
	} catch (error) {
		console.error("Error getting missing translations:", error);
		return [];
	}
}

/**
 * Calculate translation progress for a language
 */
export async function getTranslationProgress(languageCode: string): Promise<{
	total: number;
	translated: number;
	percentage: number;
}> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return { total: 0, translated: 0, percentage: 0 };
	}

	try {
		const allKeys = getAllTranslationKeys();
		const total = allKeys.length;

		const { data, error } = await supabase
			.from("translations")
			.select("key")
			.eq("language_code", languageCode);

		if (error) {
			console.error("Error fetching translation progress:", error);
			return { total, translated: 0, percentage: 0 };
		}

		const translated = data?.length || 0;
		const percentage = total > 0 ? Math.round((translated / total) * 100) : 0;

		return { total, translated, percentage };
	} catch (error) {
		console.error("Error calculating translation progress:", error);
		return { total: 0, translated: 0, percentage: 0 };
	}
}

/**
 * Export translations for a specific language as JSON
 */
export async function exportTranslations(languageCode: string): Promise<Record<string, string>> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return {};
	}

	try {
		const { data, error } = await supabase
			.from("translations")
			.select("key, value")
			.eq("language_code", languageCode);

		if (error) {
			console.error("Error exporting translations:", error);
			return {};
		}

		const translations: Record<string, string> = {};
		data?.forEach((t) => {
			translations[t.key] = t.value;
		});

		return translations;
	} catch (error) {
		console.error("Error exporting translations:", error);
		return {};
	}
}

/**
 * Import translations from JSON
 */
export async function importTranslations(
	languageCode: string,
	translations: Record<string, string>,
	isAutoTranslated = false
): Promise<{ success: boolean; error?: string; imported: number }> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return { success: false, error: "Supabase client not available", imported: 0 };
	}

	try {
		const translationsToInsert = Object.entries(translations).map(([key, value]) => {
			const namespace = key.split(".")[0];
			return {
				key,
				language_code: languageCode,
				value,
				is_auto_translated: isAutoTranslated,
				namespace,
			};
		});

		const { error } = await supabase
			.from("translations")
			.upsert(translationsToInsert, { onConflict: "key,language_code" });

		if (error) {
			console.error("Error importing translations:", error);
			return { success: false, error: error.message, imported: 0 };
		}

		return { success: true, imported: translationsToInsert.length };
	} catch (error) {
		console.error("Error importing translations:", error);
		return { success: false, error: String(error), imported: 0 };
	}
}

/**
 * Get namespace from translation key
 */
export function getNamespaceFromKey(key: string): string {
	return key.split(".")[0];
}

/**
 * Group translations by namespace
 */
export function groupTranslationsByNamespace(
	translations: Array<{ key: string; value: string }>
): Record<string, Array<{ key: string; value: string }>> {
	const grouped: Record<string, Array<{ key: string; value: string }>> = {};

	translations.forEach((t) => {
		const namespace = getNamespaceFromKey(t.key);
		if (!grouped[namespace]) {
			grouped[namespace] = [];
		}
		grouped[namespace].push(t);
	});

	return grouped;
}








