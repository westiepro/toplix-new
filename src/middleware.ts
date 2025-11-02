import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	// Check if Supabase is configured
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		// Supabase not configured, allow access
		return response;
	}

	// Create a Supabase client configured to use cookies
	const supabase = createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
					response = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// Refresh session if expired - required for Server Components
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Protected routes that require authentication
	const protectedRoutes = ["/dashboard", "/admin"];
	const isProtectedRoute = protectedRoutes.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	);

	// Admin login page should be accessible
	if (request.nextUrl.pathname === "/admin/login") {
		return response;
	}

	// If accessing a protected route without a session, redirect to home
	if (isProtectedRoute && !session) {
		const redirectUrl = new URL("/", request.url);
		return NextResponse.redirect(redirectUrl);
	}

	return response;
}

export const config = {
	matcher: ["/dashboard/:path*", "/admin/:path*"],
};



