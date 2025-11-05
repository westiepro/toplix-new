"use client";

import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSupabaseClient, hasSupabaseEnv } from "@/lib/supabaseClient";

export default function AuthPage() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	async function continueWithEmail(e: React.FormEvent) {
		e.preventDefault();
		const supabase = getSupabaseClient();
		if (!supabase) {
			setMessage("Supabase keys missing. Add them to .env.local to enable auth.");
			return;
		}
		const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/user-dashboard` : undefined } });
		setMessage(error ? error.message : "Check your email for a login link.");
	}

	return (
		<main className="min-h-screen">
			<Navbar />
			<section className="mx-auto max-w-md p-4">
				<h1 className="mb-4 text-2xl font-semibold">Login</h1>
				<form onSubmit={continueWithEmail} className="space-y-3">
					<Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
					<Button type="submit" className="w-full">Continue with Email</Button>
					{!hasSupabaseEnv() && <p className="text-xs text-muted-foreground">Add Supabase keys to enable email and social login.</p>}
					{message && <p className="text-sm text-muted-foreground">{message}</p>}
				</form>
			</section>
		</main>
	);
}




