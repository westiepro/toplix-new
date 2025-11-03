/**
 * Script to initialize translations system using Service Role Key
 * This bypasses RLS for initial setup
 * Run with: SUPABASE_SERVICE_ROLE_KEY=your_key npx tsx scripts/init-translations-admin.ts
 */

import { createClient } from "@supabase/supabase-js";
import { ENGLISH_TRANSLATIONS, getAllTranslationKeys } from "../src/lib/translation-keys";

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
	console.error("❌ Error: Missing environment variables");
	console.error("Required:");
	console.error("  - NEXT_PUBLIC_SUPABASE_URL (from .env.local)");
	console.error("  - SUPABASE_SERVICE_ROLE_KEY (from Supabase dashboard)");
	console.error("");
	console.error("Run with:");
	console.error("  SUPABASE_SERVICE_ROLE_KEY=your_service_key npx tsx scripts/init-translations-admin.ts");
	process.exit(1);
}

// Use service role key to bypass RLS
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});

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

async function main() {
	console.log("🚀 Starting translation system initialization...\n");
	console.log("⚠️  Using Service Role Key (bypasses RLS)\n");

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

	console.log("\n✅ Translation system initialized successfully!");
	console.log("\n📋 Next steps:");
	console.log("   1. Visit /admin/translations in your app");
	console.log("   2. Set OPENAI_API_KEY in .env.local");
	console.log("   3. Click 'Auto-translate' buttons to translate all missing keys");
	console.log("\n✨ Initialization complete!\n");
	process.exit(0);
}

main().catch((error) => {
	console.error("❌ Fatal error:", error);
	process.exit(1);
});


