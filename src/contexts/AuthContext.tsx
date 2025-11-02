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

		// Check for guest mode
		const guestMode = localStorage.getItem("guest_mode");
		if (guestMode === "true") {
			setIsGuest(true);
		}

		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
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

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		return { error };
	};

	const signUp = async (email: string) => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		// Create user with a temporary random password
		// They'll be logged in immediately without email verification
		const tempPassword = Math.random().toString(36).slice(-12) + "Aa1!";
		
		console.log("Attempting instant signup for:", email);
		
		const { data, error } = await supabase.auth.signUp({
			email,
			password: tempPassword,
			options: {
				emailRedirectTo: `${window.location.origin}/dashboard`,
				data: {
					instant_signup: true,
				},
			},
		});

		console.log("Signup result:", { data, error });

		// If user already exists, try to sign in with magic link for instant login
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
	};

	const signInWithOAuth = async (provider: "google" | "apple") => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			return { error: new Error("Supabase not configured") as AuthError };
		}

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/dashboard`,
			},
		});

		return { error };
	};

	const signOut = async () => {
		const supabase = getSupabaseClient();
		if (!supabase) return;

		await supabase.auth.signOut();
		localStorage.removeItem("guest_mode");
		setIsGuest(false);
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

