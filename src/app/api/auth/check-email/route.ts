import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		if (!email || typeof email !== "string" || !email.includes("@")) {
			return NextResponse.json(
				{ error: "Valid email is required" },
				{ status: 400 }
			);
		}

		// Use Supabase Admin API to check if user exists
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

		if (!supabaseUrl || !supabaseServiceKey) {
			console.error("Supabase environment variables not configured");
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 }
			);
		}

		// Create admin client with service role key
		const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		});

		// Query auth.users to check if email exists
		const { data, error } = await supabaseAdmin.auth.admin.listUsers();

		if (error) {
			console.error("Error checking email:", error);
			return NextResponse.json(
				{ error: "Failed to check email" },
				{ status: 500 }
			);
		}

		// Check if any user has this email
		const userExists = data.users.some(
			(user) => user.email?.toLowerCase() === email.toLowerCase()
		);

		return NextResponse.json({ exists: userExists });
	} catch (error) {
		console.error("Error in check-email endpoint:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

