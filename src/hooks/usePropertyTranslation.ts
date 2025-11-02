"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface PropertyTranslation {
	title?: string;
	description?: string;
	address?: string;
}

interface Property {
	id: string;
	title: string;
	description: string;
	address?: string;
	[key: string]: any;
}

/**
 * Hook to get translated property content based on current language
 */
export function usePropertyTranslation(property: Property | null): Property | null {
	const { currentLanguage } = useLanguage();
	const [translatedProperty, setTranslatedProperty] = useState<Property | null>(property);

	useEffect(() => {
		if (!property) {
			setTranslatedProperty(null);
			return;
		}

		// If English, return original
		if (currentLanguage === "en") {
			setTranslatedProperty(property);
			return;
		}

		// Fetch translation for current language
		const fetchTranslation = async () => {
			const supabase = getSupabaseClient();
			if (!supabase) {
				setTranslatedProperty(property);
				return;
			}

			const { data, error } = await supabase
				.from("property_translations")
				.select("*")
				.eq("property_id", property.id)
				.eq("language_code", currentLanguage)
				.single();

			if (error || !data) {
				// Fallback to original if translation not found
				setTranslatedProperty(property);
				return;
			}

			// Merge translation with original property
			setTranslatedProperty({
				...property,
				title: data.title || property.title,
				description: data.description || property.description,
				address: data.address || property.address,
			});
		};

		fetchTranslation();
	}, [property, currentLanguage]);

	return translatedProperty;
}

/**
 * Hook to get translations for multiple properties
 */
export function usePropertiesTranslation(properties: Property[]): Property[] {
	const { currentLanguage } = useLanguage();
	const [translatedProperties, setTranslatedProperties] = useState<Property[]>(properties);

	useEffect(() => {
		if (!properties || properties.length === 0) {
			setTranslatedProperties([]);
			return;
		}

		// If English, return original
		if (currentLanguage === "en") {
			setTranslatedProperties(properties);
			return;
		}

		// Fetch translations for all properties
		const fetchTranslations = async () => {
			const supabase = getSupabaseClient();
			if (!supabase) {
				setTranslatedProperties(properties);
				return;
			}

			const propertyIds = properties.map((p) => p.id);

			const { data, error } = await supabase
				.from("property_translations")
				.select("*")
				.in("property_id", propertyIds)
				.eq("language_code", currentLanguage);

			if (error || !data) {
				setTranslatedProperties(properties);
				return;
			}

			// Create a map of translations
			const translationsMap = new Map<string, PropertyTranslation>();
			data.forEach((t) => {
				translationsMap.set(t.property_id, {
					title: t.title,
					description: t.description,
					address: t.address,
				});
			});

			// Merge translations with properties
			const translated = properties.map((property) => {
				const translation = translationsMap.get(property.id);
				if (!translation) return property;

				return {
					...property,
					title: translation.title || property.title,
					description: translation.description || property.description,
					address: translation.address || property.address,
				};
			});

			setTranslatedProperties(translated);
		};

		fetchTranslations();
	}, [properties, currentLanguage]);

	return translatedProperties;
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

