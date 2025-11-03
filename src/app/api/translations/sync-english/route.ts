import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ENGLISH_TRANSLATIONS } from '@/lib/translation-keys';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
	try {
		if (!supabaseUrl || !supabaseKey) {
			return NextResponse.json(
				{ error: 'Supabase not configured' },
				{ status: 500 }
			);
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		// Prepare English translations for insertion
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

		console.log(`Syncing ${translationsToInsert.length} English translations...`);

		// Use upsert to insert or update
		const { data, error } = await supabase
			.from("translations")
			.upsert(translationsToInsert, { onConflict: "key,language_code" });

		if (error) {
			console.error('Error syncing English translations:', error);
			return NextResponse.json(
				{ error: 'Failed to sync translations', details: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			synced: translationsToInsert.length,
			message: `Successfully synced ${translationsToInsert.length} English translation keys`,
		});
	} catch (error) {
		console.error('API error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

