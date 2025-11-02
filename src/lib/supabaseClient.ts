"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

// Environment variables required in .env.local:
// NEXT_PUBLIC_SUPABASE_URL=your_project_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !key) {
		return null;
	}
	if (!supabase) {
		supabase = createBrowserClient(url, key);
	}
	return supabase;
}

export function hasSupabaseEnv(): boolean {
	return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Get the Supabase client instance (throws error if not configured)
export function requireSupabaseClient(): SupabaseClient {
	const client = getSupabaseClient();
	if (!client) {
		throw new Error(
			"Supabase client not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
		);
	}
	return client;
}




