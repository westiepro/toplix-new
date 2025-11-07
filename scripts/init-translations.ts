/**
 * Script to initialize translations system
 * Run with: npx ts-node scripts/init-translations.ts
 */

import { createClient } from "@supabase/supabase-js";
import { ENGLISH_TRANSLATIONS, getAllTranslationKeys } from "../src/lib/translation-keys";

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.error("Error: Supabase environment variables not set");
	console.error("Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seedLanguages() {
	console.log("📝 Seeding languages...");

	const languages = [
		{ code: "en", name: "English", flag_emoji: "🇬🇧", is_active: true },
		{ code: "pt", name: "Portuguese", flag_emoji: "🇵🇹", is_active: true },
		{ code: "es", name: "Spanish", flag_emoji: "🇪🇸", is_active: true },
		{ code: "fr", name: "French", flag_emoji: "🇫🇷", is_active: true },
		{ code: "de", name: "German", flag_emoji: "🇩🇪", is_active: true },
		{ code: "sv", name: "Swedish", flag_emoji: "🇸🇪", is_active: true },
	];

	const { error } = await supabase
		.from("languages")
		.upsert(languages, { onConflict: "code" });

	if (error) {
		console.error("❌ Error seeding languages:", error);
		return false;
	}

	console.log("✅ Languages seeded successfully");
	return true;
}

async function seedEnglishTranslations() {
	console.log("📝 Seeding English translations...");

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

	console.log(`   Inserting ${translationsToInsert.length} English translations...`);

	const { error } = await supabase
		.from("translations")
		.upsert(translationsToInsert, { onConflict: "key,language_code" });

	if (error) {
		console.error("❌ Error seeding English translations:", error);
		return false;
	}

	console.log("✅ English translations seeded successfully");
	return true;
}

async function autoTranslateLanguage(languageCode: string, languageName: string) {
	console.log(`\n🌐 Auto-translating to ${languageName}...`);

	// Check if OPENAI_API_KEY is set
	if (!process.env.OPENAI_API_KEY) {
		console.error("⚠️  OPENAI_API_KEY not set - skipping auto-translation");
		console.log("   Set OPENAI_API_KEY to enable auto-translation");
		return false;
	}

	// Get missing translations
	const allKeys = getAllTranslationKeys();
	const { data: existingTranslations } = await supabase
		.from("translations")
		.select("key")
		.eq("language_code", languageCode);

	const existingKeys = new Set(existingTranslations?.map((t) => t.key) || []);
	const missingKeys = allKeys.filter((key) => !existingKeys.has(key));

	if (missingKeys.length === 0) {
		console.log(`✅ ${languageName} already fully translated`);
		return true;
	}

	console.log(`   Found ${missingKeys.length} missing translations`);
	console.log(`   This may take a few minutes...`);

	let translated = 0;
	let failed = 0;

	// Translate in batches to avoid rate limits
	const batchSize = 5;
	for (let i = 0; i < missingKeys.length; i += batchSize) {
		const batch = missingKeys.slice(i, i + batchSize);
		
		const promises = batch.map(async (key) => {
			const sourceText = ENGLISH_TRANSLATIONS[key];
			if (!sourceText) return;

			try {
				const response = await fetch("http://localhost:3000/api/translate", {
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
					process.stdout.write(`\r   Progress: ${translated}/${missingKeys.length}`);
				} else {
					failed++;
				}
			} catch (error) {
				failed++;
			}
		});

		await Promise.all(promises);
		
		// Small delay between batches to avoid rate limits
		if (i + batchSize < missingKeys.length) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	console.log(`\n✅ ${languageName} translation complete: ${translated} success, ${failed} failed`);
	return failed === 0;
}

async function main() {
	console.log("🚀 Starting translation system initialization...\n");

	// Step 1: Seed languages
	const languagesSeeded = await seedLanguages();
	if (!languagesSeeded) {
		console.error("Failed to seed languages");
		process.exit(1);
	}

	// Step 2: Seed English translations
	const englishSeeded = await seedEnglishTranslations();
	if (!englishSeeded) {
		console.error("Failed to seed English translations");
		process.exit(1);
	}

	console.log("\n📊 Translation system initialized successfully!");
	console.log("\n📋 Next steps:");
	console.log("   1. Ensure your Next.js dev server is running (npm run dev)");
	console.log("   2. Set OPENAI_API_KEY in your .env.local file");
	console.log("   3. Visit /admin/translations to manage translations");
	console.log("   4. Click 'Auto-translate' buttons to translate all missing keys");
	console.log("\nAlternatively, you can auto-translate now by answering the prompt below:\n");

	// Optional: Auto-translate all languages now
	const readline = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	readline.question("Would you like to auto-translate all languages now? (y/n): ", async (answer: string) => {
		readline.close();

		if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
			console.log("\n🌍 Starting auto-translation for all languages...");
			console.log("⚠️  Make sure your Next.js dev server is running on http://localhost:3000\n");

			const languages = [
				{ code: "pt", name: "Portuguese" },
				{ code: "es", name: "Spanish" },
				{ code: "fr", name: "French" },
				{ code: "de", name: "German" },
				{ code: "sv", name: "Swedish" },
			];

			for (const lang of languages) {
				await autoTranslateLanguage(lang.code, lang.name);
			}

			console.log("\n🎉 All translations complete!");
		} else {
			console.log("\n👍 You can auto-translate later from the admin panel");
		}

		console.log("\n✨ Initialization complete!\n");
		process.exit(0);
	});
}

main().catch((error) => {
	console.error("❌ Fatal error:", error);
	process.exit(1);
});








