"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	loading: boolean;
	isGuest: boolean;
	signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
	signUp: (email: string) => Promise<{ error: AuthError | null; data?: any }>;
	signInWithOAuth: (provider: "google" | "apple") => Promise<{ error: AuthError | null }>;
	signOut: () => Promise<void>;
	setPassword: (password: string) => Promise<{ error: AuthError | null }>;
	sendMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
	requestPasswordReset: (email: string) => Promise<{ error: AuthError | null }>;
	continueAsGuest: () => void;
	exitGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [isGuest, setIsGuest] = useState(false);

	useEffect(() => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			setLoading(false);
			return;
		}

		// Check if admin is logged in - if so, create a mock user object
		const isAdminAuth = localStorage.getItem("admin-authenticated") === "true";
		const adminUser = localStorage.getItem("admin-user");
		if (isAdminAuth && adminUser) {
			console.log("👑 Admin session detected, creating admin user context");
			try {
				const parsedAdminUser = JSON.parse(adminUser);
				// Create a mock User object for admin
				const mockAdminUser: User = {
					id: parsedAdminUser.id || 'admin-id',
					email: parsedAdminUser.email || 'admin@toplix.com',
					user_metadata: { ...parsedAdminUser },
					app_metadata: { role: 'admin' },
					aud: 'authenticated',
					created_at: parsedAdminUser.created_at || new Date().toISOString(),
					role: 'authenticated',
				} as User;
				setUser(mockAdminUser);
				setIsGuest(false);
			} catch (e) {
				console.error("Failed to parse admin user", e);
			}
			setLoading(false);
			return;
		}

		// Check for guest mode
		const guestMode = localStorage.getItem("guest_mode");
		if (guestMode === "true") {
			setIsGuest(true);
		}

		console.log("🔐 AuthContext initializing...");

		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log("🔐 Initial session:", session ? "exists" : "none");
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("🔐 Auth state changed:", _event, session ? "has session" : "no session");
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
			
			// Clear guest mode if user signs in
			if (session) {
				localStorage.removeItem("guest_mode");
				setIsGuest(false);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	const signIn = async (email: string, password: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Detect country from IP address (to update user metadata if missing)
		let country: string | undefined;
		try {
			const geoResponse = await fetch('/api/geolocation');
			if (geoResponse.ok) {
				const geoData = await geoResponse.json();
				country = geoData.country;
			}
		} catch (error) {
			console.error("Error detecting country:", error);
		}

		const { error, data } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		// Update user metadata with country if detected and not already set
		if (!error && data?.user && country && !data.user.user_metadata?.country) {
			try {
				await supabase.auth.updateUser({
					data: {
						...data.user.user_metadata,
						country: country,
					},
				});
				console.log("Updated user country to:", country);
			} catch (updateError) {
				console.error("Error updating user country:", updateError);
				// Don't fail sign-in if country update fails
			}
		}

		return { error };
	};

	const signUp = async (email: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Get current locale from URL or cookie
		const pathSegments = window.location.pathname.split('/');
		const locale = pathSegments[1] || 'en'; // Default to 'en' if not found

		// Try to detect country client-side as fallback
		let clientCountry: string | undefined;
		try {
			const geoResponse = await fetch('/api/geolocation');
			if (geoResponse.ok) {
				const geoData = await geoResponse.json();
				clientCountry = geoData.country;
				console.log('🌍 Client-side country detection:', clientCountry);
			}
		} catch (error) {
			console.error("Error detecting country client-side:", error);
		}

		// Use server-side signup API for proper country detection
		// This ensures Vercel geo headers are available
		console.log("Attempting server-side signup for:", email);
		
		try {
			const signupResponse = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					locale,
					clientCountry, // Send client-detected country as fallback
				}),
			});

			const signupData = await signupResponse.json();

			if (!signupResponse.ok) {
				return { error: new Error(signupData.error || 'Signup failed') as AuthError };
			}

			console.log("✅ Server-side signup successful:", {
				userId: signupData.user?.id,
				country: signupData.country,
				hasSession: !!signupData.session,
			});

			// If we got a session from server-side signup, we're done
			if (signupData.session) {
				return { error: null, data: { user: signupData.user, session: signupData.session } };
			}

			// If user was created successfully by server, don't try to create again
			// Just send OTP for login
			if (signupData.user && !signupData.session) {
				console.log("User created by server, sending OTP for login");
				const { error: otpError } = await supabase.auth.signInWithOtp({
					email,
					options: {
						shouldCreateUser: false,
					},
				});
				return { error: otpError, data: { user: signupData.user } };
			}

			// Fallback: if server didn't create user, try client-side
			const { data, error } = await supabase.auth.signUp({
				email,
				password: Math.random().toString(36).slice(-12) + "Aa1!",
				options: {
					emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
					data: {
						instant_signup: true,
						country: signupData.country || clientCountry, // Use country from server or client
					},
				},
			});

			// Handle "already registered" error
			if (error?.message?.includes("already registered")) {
				console.log("User already exists, trying OTP");
				const { error: otpError } = await supabase.auth.signInWithOtp({
					email,
					options: {
						shouldCreateUser: false,
					},
				});
				return { error: otpError };
			}

			// Check if email confirmation is required
			if (data?.user && !data.session) {
				console.warn("Email confirmation required! User created but not logged in.");
				return { 
					error: new Error("Email confirmation is enabled. Please disable it in Supabase Dashboard → Authentication → Providers → Email → Turn OFF 'Confirm email'") as AuthError,
					data 
				};
			}

			return { error, data };
		} catch (error) {
			console.error("❌ Server-side signup error, falling back to client-side:", error);
			
			// Fallback to client-side signup if server-side fails
			const tempPassword = Math.random().toString(36).slice(-12) + "Aa1!";
			const { data, error: signupError } = await supabase.auth.signUp({
				email,
				password: tempPassword,
				options: {
					emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
					data: {
						instant_signup: true,
						country: clientCountry, // Use client-detected country
					},
				},
			});

			// Handle "already registered" error in fallback
			if (signupError?.message?.includes("already registered")) {
				console.log("User already exists, trying OTP");
				const { error: otpError } = await supabase.auth.signInWithOtp({
					email,
					options: {
						shouldCreateUser: false,
					},
				});
				return { error: otpError };
			}

			// Check if email confirmation is required
			if (data?.user && !data.session) {
				console.warn("Email confirmation required! User created but not logged in.");
				return { 
					error: new Error("Email confirmation is enabled. Please disable it in Supabase Dashboard → Authentication → Providers → Email → Turn OFF 'Confirm email'") as AuthError,
					data 
				};
			}

			return { error: signupError, data };
		}
	};

	const signInWithOAuth = async (provider: "google" | "apple") => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Get current locale from URL or cookie
		const pathSegments = window.location.pathname.split('/');
		const locale = pathSegments[1] || 'en'; // Default to 'en' if not found

		// Detect country from IP address (for new users)
		let country: string | undefined;
		try {
			const geoResponse = await fetch('/api/geolocation');
			if (geoResponse.ok) {
				const geoData = await geoResponse.json();
				country = geoData.country;
			}
		} catch (error) {
			console.error("Error detecting country:", error);
			// Continue without country - not critical
		}

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/${locale}/auth/callback`,
				queryParams: country ? {
					// Pass country as query param to be picked up in callback
					country: country,
				} : undefined,
			},
		});

		return { error };
	};

	const signOut = async () => {
		const supabase = getSupabaseClient();
		if (!supabase) return;

		// Check if admin before doing anything
		const isAdminAuth = localStorage.getItem("admin-authenticated") === "true";
		
		console.log("🚪 SignOut called", { isAdminAuth });
		
		// DO NOT sign out if admin is logged in!
		if (isAdminAuth) {
			console.log("⚠️ BLOCKED: Admin session active, ignoring signOut request");
			return; // Don't do anything for admin sessions
		}

		await supabase.auth.signOut();
		
		// Clear all user-specific data from localStorage
		localStorage.removeItem("guest_mode");
		localStorage.removeItem("favorites");
		
		setIsGuest(false);
		
		// Redirect to homepage
		console.log("🚪 Redirecting to homepage after signOut");
		window.location.href = '/';
	};

	const setPassword = async (password: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		const { error } = await supabase.auth.updateUser({
			password,
		});

		return { error };
	};

	const sendMagicLink = async (email: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Get current locale from URL or cookie
		const pathSegments = window.location.pathname.split('/');
		const locale = pathSegments[1] || 'en'; // Default to 'en' if not found

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
				shouldCreateUser: false,
			},
		});

		return { error };
	};

	const requestPasswordReset = async (email: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Get current locale from URL or cookie
		const pathSegments = window.location.pathname.split('/');
		const locale = pathSegments[1] || 'en'; // Default to 'en' if not found

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/${locale}/reset-password`,
		});

		return { error };
	};

	const continueAsGuest = () => {
		localStorage.setItem("guest_mode", "true");
		setIsGuest(true);
	};

	const exitGuestMode = () => {
		localStorage.removeItem("guest_mode");
		setIsGuest(false);
	};

	const value = {
		user,
		session,
		loading,
		isGuest,
		signIn,
		signUp,
		signInWithOAuth,
		signOut,
		setPassword,
		sendMagicLink,
		requestPasswordReset,
		continueAsGuest,
		exitGuestMode,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

