import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
	try {
		const { key, sourceText, targetLanguage, namespace } = await request.json();

		if (!key || !sourceText || !targetLanguage || !namespace) {
			return NextResponse.json(
				{ error: "Missing required fields: key, sourceText, targetLanguage, namespace" },
				{ status: 400 }
			);
		}

		// Check if OpenAI API key is configured
		if (!process.env.OPENAI_API_KEY) {
			console.error("OpenAI API key not found in environment variables");
			return NextResponse.json(
				{ error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file and restart the server." },
				{ status: 500 }
			);
		}

		// Initialize OpenAI client only when needed
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		// Language mapping for better context
		const languageNames: Record<string, string> = {
			en: "English",
			pt: "Portuguese",
			es: "Spanish",
			fr: "French",
			de: "German",
			sv: "Swedish",
		};

		const targetLanguageName = languageNames[targetLanguage] || targetLanguage;

		// Use OpenAI to translate
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: `You are a professional translator for a real estate website. Translate the given text to ${targetLanguageName}. 
					Maintain the tone and style appropriate for a real estate platform. 
					If there are any placeholders like {{name}} or {{count}}, keep them exactly as they are.
					Only respond with the translated text, nothing else.`,
				},
				{
					role: "user",
					content: sourceText,
				},
			],
			temperature: 0.3,
		});

		const translatedText = completion.choices[0]?.message?.content?.trim();

		if (!translatedText) {
			return NextResponse.json(
				{ error: "Translation failed - no response from AI" },
				{ status: 500 }
			);
		}

		// Save translation to database
		const supabase = getSupabaseServer();
		if (supabase) {
			const { error } = await supabase.from("translations").upsert(
				{
					key,
					language_code: targetLanguage,
					value: translatedText,
					is_auto_translated: true,
					namespace,
				},
				{ onConflict: "key,language_code" }
			);

			if (error) {
				console.error("Error saving translation to database:", error);
			}
		}

		return NextResponse.json({
			success: true,
			key,
			targetLanguage,
			translatedText,
		});
	} catch (error) {
		console.error("Translation error:", error);
		return NextResponse.json(
			{ error: "Translation failed", details: String(error) },
			{ status: 500 }
		);
	}
}

