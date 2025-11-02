import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for API routes
 * Uses service role key to bypass RLS for admin operations
 */
export function getSupabaseServer() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	// Try service role key first (for admin operations), fallback to anon key
	const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		console.error("Missing Supabase environment variables");
		return null;
	}

	return createClient(supabaseUrl, supabaseKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	});
}

