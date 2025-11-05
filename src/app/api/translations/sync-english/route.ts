import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ENGLISH_TRANSLATIONS } from '@/lib/translation-keys';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
	try {
		if (!supabaseUrl || !supabaseServiceKey) {
			console.error('Supabase configuration missing:', {
				hasUrl: !!supabaseUrl,
				hasServiceKey: !!supabaseServiceKey
			});
			return NextResponse.json(
				{ error: 'Supabase not configured properly. Check environment variables.' },
				{ status: 500 }
			);
		}

		// Use service role key to bypass RLS for admin operations
		const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
			.upsert(translationsToInsert, { 
				onConflict: "key,language_code",
				ignoreDuplicates: false 
			});

		if (error) {
			console.error('Error syncing English translations:', error);
			console.error('Error details:', {
				message: error.message,
				details: error.details,
				hint: error.hint,
				code: error.code
			});
			return NextResponse.json(
				{ 
					error: 'Failed to sync translations', 
					details: error.message,
					hint: error.hint,
					code: error.code 
				},
				{ status: 500 }
			);
		}

		console.log('Successfully synced English translations');

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


