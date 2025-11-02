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
	signUp: (email: string) => Promise<{ error: AuthError | null }>;
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

		// Use magic link (OTP) for signup
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${window.location.origin}/verify`,
			},
		});

		return { error };
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

