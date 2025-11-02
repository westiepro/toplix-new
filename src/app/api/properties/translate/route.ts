import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseServer } from "@/lib/supabaseServer";

// POST: Translate property content for all languages or specific language
export async function POST(request: NextRequest) {
	try {
		const { propertyId, title, description, address, targetLanguage } = await request.json();

		if (!propertyId || !title || !description) {
			return NextResponse.json(
				{ error: "Missing required fields: propertyId, title, description" },
				{ status: 400 }
			);
		}

		// Check if OpenAI API key is configured
		if (!process.env.OPENAI_API_KEY) {
			return NextResponse.json(
				{ error: "OpenAI API key not configured" },
				{ status: 500 }
			);
		}

		// Initialize OpenAI client only when needed
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const supabase = getSupabaseServer();
		if (!supabase) {
			return NextResponse.json(
				{ error: "Database not configured" },
				{ status: 500 }
			);
		}

		// Language mapping
		const languageNames: Record<string, string> = {
			pt: "Portuguese",
			es: "Spanish",
			fr: "French",
			de: "German",
			sv: "Swedish",
		};

		// Determine which languages to translate to
		const targetLanguages = targetLanguage
			? [targetLanguage]
			: Object.keys(languageNames);

		const results = [];

		for (const lang of targetLanguages) {
			const langName = languageNames[lang];
			if (!langName) continue;

			try {
				// Translate title, description, and address in a single call for better context
				const completion = await openai.chat.completions.create({
					model: "gpt-4o-mini",
					messages: [
						{
							role: "system",
							content: `You are a professional translator for a real estate website. 
							Translate the property information to ${langName}. 
							Maintain the professional tone appropriate for a real estate listing.
							Return the translation in the following JSON format:
							{
								"title": "translated title",
								"description": "translated description",
								"address": "translated address (keep street names mostly intact, translate generic terms)"
							}`,
						},
						{
							role: "user",
							content: JSON.stringify({
								title,
								description,
								address: address || "",
							}),
						},
					],
					temperature: 0.3,
					response_format: { type: "json_object" },
				});

				const translatedContent = JSON.parse(
					completion.choices[0]?.message?.content || "{}"
				);

				// Save property translation to database
				const { error } = await supabase.from("property_translations").upsert(
					{
						property_id: propertyId,
						language_code: lang,
						title: translatedContent.title,
						description: translatedContent.description,
						address: translatedContent.address || address,
					},
					{ onConflict: "property_id,language_code" }
				);

				if (error) {
					console.error(`Error saving ${lang} translation:`, error);
					results.push({ language: lang, success: false, error: error.message });
				} else {
					results.push({
						language: lang,
						success: true,
						translation: translatedContent,
					});
				}
			} catch (error) {
				console.error(`Error translating to ${lang}:`, error);
				results.push({ language: lang, success: false, error: String(error) });
			}
		}

		return NextResponse.json({
			success: true,
			propertyId,
			results,
		});
	} catch (error) {
		console.error("Property translation error:", error);
		return NextResponse.json(
			{ error: "Translation failed", details: String(error) },
			{ status: 500 }
		);
	}
}

