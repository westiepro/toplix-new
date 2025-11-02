"use client";

interface Property {
	id: string;
	title?: string;
	description: string;
	address?: string;
	[key: string]: any;
}

/**
 * Hook to get translated property content based on current language
 * NOTE: Properties are now translated server-side via the API, so this is a simple pass-through
 */
export function usePropertyTranslation(property: Property | null): Property | null {
	return property;
}

/**
 * Hook to get translations for multiple properties
 * NOTE: Properties are now translated server-side via the API, so this is a simple pass-through
 */
export function usePropertiesTranslation(properties: Property[]): Property[] {
	return properties;
}

/**
 * Function to trigger translation for a property (admin use)
 */
export async function translateProperty(
	propertyId: string,
	title: string,
	description: string,
	address?: string,
	targetLanguage?: string
): Promise<{ success: boolean; error?: string }> {
	try {
		const response = await fetch("/api/properties/translate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				propertyId,
				title,
				description,
				address,
				targetLanguage, // If not provided, translates to all languages
			}),
		});

		const result = await response.json();

		if (result.success) {
			return { success: true };
		} else {
			return { success: false, error: result.error };
		}
	} catch (error) {
		return { success: false, error: String(error) };
	}
}

