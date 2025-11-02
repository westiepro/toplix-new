import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { ENGLISH_TRANSLATIONS } from "@/lib/translation-keys";

// GET: Fetch all translations for a language
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const languageCode = searchParams.get("language");

		if (!languageCode) {
			return NextResponse.json(
				{ error: "Missing language parameter" },
				{ status: 400 }
			);
		}

		const supabase = getSupabaseServer();
		if (!supabase) {
			return NextResponse.json(
				{ error: "Database not configured" },
				{ status: 500 }
			);
		}

		const { data, error } = await supabase
			.from("translations")
			.select("*")
			.eq("language_code", languageCode)
			.order("key");

		if (error) {
			console.error("Error fetching translations:", error);
			return NextResponse.json(
				{ error: "Failed to fetch translations" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ translations: data || [] });
	} catch (error) {
		console.error("Error in GET /api/translations:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// POST: Bulk translate missing keys for a language
export async function POST(request: NextRequest) {
	try {
		const { languageCode, keys } = await request.json();

		if (!languageCode) {
			return NextResponse.json(
				{ error: "Missing languageCode" },
				{ status: 400 }
			);
		}

		const supabase = getSupabaseServer();
		if (!supabase) {
			return NextResponse.json(
				{ error: "Database not configured" },
				{ status: 500 }
			);
		}

		// If no keys provided, translate all missing keys
		let keysToTranslate = keys || Object.keys(ENGLISH_TRANSLATIONS);

		// Get existing translations to avoid re-translating
		const { data: existingData } = await supabase
			.from("translations")
			.select("key")
			.eq("language_code", languageCode);

		const existingKeys = new Set(existingData?.map((t) => t.key) || []);
		keysToTranslate = keysToTranslate.filter((key: string) => !existingKeys.has(key));

		if (keysToTranslate.length === 0) {
			return NextResponse.json({
				success: true,
				message: "No missing translations",
				translated: 0,
			});
		}

		// Translate in batches (to avoid overwhelming the API)
		const batchSize = 10;
		let translated = 0;
		const failed: string[] = [];

		for (let i = 0; i < keysToTranslate.length; i += batchSize) {
			const batch = keysToTranslate.slice(i, i + batchSize);

			const promises = batch.map(async (key: string) => {
				const sourceText = ENGLISH_TRANSLATIONS[key];
				if (!sourceText) return;

				try {
					const response = await fetch(`${request.nextUrl.origin}/api/translate`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							key,
							sourceText,
							targetLanguage: languageCode,
							namespace: key.split(".")[0],
						}),
					});

					if (response.ok) {
						translated++;
					} else {
						const errorData = await response.json();
						console.error(`Failed to translate ${key}:`, errorData);
						failed.push(key);
					}
				} catch (error) {
					console.error(`Failed to translate ${key}:`, error);
					failed.push(key);
				}
			});

			await Promise.all(promises);
		}

		return NextResponse.json({
			success: true,
			translated,
			failed,
			total: keysToTranslate.length,
		});
	} catch (error) {
		console.error("Error in POST /api/translations:", error);
		return NextResponse.json(
			{ error: "Bulk translation failed", details: String(error) },
			{ status: 500 }
		);
	}
}

