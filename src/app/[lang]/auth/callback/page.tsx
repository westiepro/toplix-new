"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const handleCallback = async () => {
			try {
				const supabase = getSupabaseClient();
				if (!supabase) {
					setError("Supabase not configured");
					return;
				}

				// The auth token is in the URL hash - Supabase will automatically exchange it
				const { data, error: authError } = await supabase.auth.getSession();

				if (authError) {
					console.error("Auth callback error:", authError);
					setError(authError.message);
					setTimeout(() => router.push("/"), 3000);
					return;
				}

				if (data.session) {
					// Successfully authenticated! Redirect to dashboard
					console.log("Auth callback successful, redirecting to dashboard");
					router.push("/user-dashboard");
				} else {
					// No session found
					console.warn("No session found in auth callback");
					setError("No session found. Please try again.");
					setTimeout(() => router.push("/"), 3000);
				}
			} catch (err) {
				console.error("Error in auth callback:", err);
				setError("An error occurred during authentication");
				setTimeout(() => router.push("/"), 3000);
			}
		};

		handleCallback();
	}, [router]);

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
				<div className="text-center">
					<p className="text-red-600 mb-2">{error}</p>
					<p className="text-sm text-muted-foreground">Redirecting to home...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<div className="text-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
				<p className="text-sm text-muted-foreground">Completing sign in...</p>
			</div>
		</div>
	);
}

