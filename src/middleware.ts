import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// Check if Supabase is configured
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		// Supabase not configured, allow access (for development)
		console.log("Middleware: Supabase not configured, allowing access");
		return supabaseResponse;
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
					cookiesToSet.forEach(({ name, value, options }) => {
						supabaseResponse.cookies.set(name, value, options);
					});
				},
			},
		}
	);

	// Refresh session - this is important for server-side auth
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
		return supabaseResponse;
	}

	// If accessing a protected route without a session, redirect to home
	if (isProtectedRoute && !session) {
		console.log("Middleware: No session found, redirecting to home");
		const redirectUrl = new URL("/", request.url);
		const redirectResponse = NextResponse.redirect(redirectUrl);
		return redirectResponse;
	}

	console.log("Middleware: User authenticated, allowing access to", request.nextUrl.pathname);
	return supabaseResponse;
}

export const config = {
	matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};



