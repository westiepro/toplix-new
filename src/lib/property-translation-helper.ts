import { getSupabaseClient } from "./supabaseClient";

/**
 * Get property translation for a specific language
 */
export async function getPropertyTranslation(
	propertyId: string,
	languageCode: string
): Promise<{
	title?: string;
	description?: string;
	address?: string;
} | null> {
	if (languageCode === "en") {
		// No translation needed for English (source language)
		return null;
	}

	const supabase = getSupabaseClient();
	if (!supabase) return null;

	try {
		const { data, error } = await supabase
			.from("property_translations")
			.select("title, description, address")
			.eq("property_id", propertyId)
			.eq("language_code", languageCode)
			.single();

		if (error || !data) {
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error fetching property translation:", error);
		return null;
	}
}

/**
 * Get translations for multiple properties
 */
export async function getPropertiesTranslations(
	propertyIds: string[],
	languageCode: string
): Promise<Map<string, { title?: string; description?: string; address?: string }>> {
	const translationsMap = new Map();

	if (languageCode === "en" || propertyIds.length === 0) {
		return translationsMap;
	}

	const supabase = getSupabaseClient();
	if (!supabase) return translationsMap;

	try {
		const { data, error } = await supabase
			.from("property_translations")
			.select("*")
			.in("property_id", propertyIds)
			.eq("language_code", languageCode);

		if (error || !data) {
			return translationsMap;
		}

		data.forEach((t) => {
			translationsMap.set(t.property_id, {
				title: t.title,
				description: t.description,
				address: t.address,
			});
		});

		return translationsMap;
	} catch (error) {
		console.error("Error fetching property translations:", error);
		return translationsMap;
	}
}

/**
 * Manually update a property translation
 */
export async function updatePropertyTranslation(
	propertyId: string,
	languageCode: string,
	translation: {
		title?: string;
		description?: string;
		address?: string;
	}
): Promise<{ success: boolean; error?: string }> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return { success: false, error: "Database not configured" };
	}

	try {
		const { error } = await supabase.from("property_translations").upsert(
			{
				property_id: propertyId,
				language_code: languageCode,
				...translation,
			},
			{ onConflict: "property_id,language_code" }
		);

		if (error) {
			console.error("Error updating property translation:", error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (error) {
		console.error("Error updating property translation:", error);
		return { success: false, error: String(error) };
	}
}

/**
 * Delete a property translation
 */
export async function deletePropertyTranslation(
	propertyId: string,
	languageCode: string
): Promise<{ success: boolean; error?: string }> {
	const supabase = getSupabaseClient();
	if (!supabase) {
		return { success: false, error: "Database not configured" };
	}

	try {
		const { error } = await supabase
			.from("property_translations")
			.delete()
			.eq("property_id", propertyId)
			.eq("language_code", languageCode);

		if (error) {
			console.error("Error deleting property translation:", error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (error) {
		console.error("Error deleting property translation:", error);
		return { success: false, error: String(error) };
	}
}




