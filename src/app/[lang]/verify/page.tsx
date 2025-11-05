"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

function VerifyContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { setPassword, user } = useAuth();
	const [password, setPasswordValue] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isVerifying, setIsVerifying] = useState(true);
	const [isVerified, setIsVerified] = useState(false);
	const [verificationError, setVerificationError] = useState<string | null>(null);

	const validatePassword = (pwd: string): string | null => {
		if (pwd.length < 8) {
			return "Password must be at least 8 characters long";
		}
		if (!/[A-Z]/.test(pwd)) {
			return "Password must contain at least one uppercase letter";
		}
		if (!/[a-z]/.test(pwd)) {
			return "Password must contain at least one lowercase letter";
		}
		if (!/[0-9]/.test(pwd)) {
			return "Password must contain at least one number";
		}
		if (!/[^A-Za-z0-9]/.test(pwd)) {
			return "Password must contain at least one special character";
		}
		return null;
	};

	useEffect(() => {
		const handleEmailConfirmation = async () => {
			// Supabase automatically handles the token from the URL hash
			// We just need to check if the user is authenticated after the redirect
			
			// Wait a moment for Supabase to process the URL hash
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Import Supabase client
			const { getSupabaseClient } = await import("@/lib/supabaseClient");
			const supabase = getSupabaseClient();

			if (!supabase) {
				setVerificationError("Authentication service not configured");
				setIsVerifying(false);
				return;
			}

			// Check if user is now authenticated
			const { data: { session }, error } = await supabase.auth.getSession();

			if (error) {
				console.error("Session error:", error);
				setVerificationError(error.message);
				setIsVerifying(false);
				return;
			}

			if (session) {
				// User is authenticated - email was verified
				toast.success("Email verified! Please set your password.");
				setIsVerifying(false);
			} else {
				// No session found
				setVerificationError("Unable to verify email. The link may have expired. Please try signing up again.");
				setIsVerifying(false);
			}
		};

		handleEmailConfirmation();
	}, [searchParams, user]);

	const handleSetPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate password
		const validationError = validatePassword(password);
		if (validationError) {
			toast.error(validationError);
			return;
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setIsLoading(true);

		const { error } = await setPassword(password);

		if (error) {
			toast.error(error.message);
			setIsLoading(false);
		} else {
			toast.success("Password set successfully! Redirecting...");
			setIsVerified(true);
			setTimeout(() => {
				router.push("/user-dashboard");
			}, 1500);
		}
	};

	if (isVerifying) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardContent className="flex flex-col items-center justify-center py-16">
						<Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
						<p className="text-lg font-medium">Verifying your email...</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (verificationError) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<CardTitle className="text-red-600">Verification Failed</CardTitle>
						<CardDescription>
							{verificationError}
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<Button onClick={() => router.push("/")} variant="outline" className="w-full">
							Return to Home
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isVerified) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
							<CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
						</div>
						<CardTitle>Email Verified!</CardTitle>
						<CardDescription>
							Your account has been verified. Redirecting to dashboard...
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Set Your Password</CardTitle>
					<CardDescription>
						Your email has been verified. Please set a secure password for your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSetPassword} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPasswordValue(e.target.value)}
								placeholder="Enter your password"
								disabled={isLoading}
								required
							/>
							<p className="text-xs text-muted-foreground">
								Must be at least 8 characters with uppercase, lowercase, number, and special character
							</p>
						</div>

						<div className="space-y-2">
							<label htmlFor="confirmPassword" className="text-sm font-medium">
								Confirm Password
							</label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm your password"
								disabled={isLoading}
								required
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Setting password...
								</>
							) : (
								"Save Password and Continue"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default function VerifyPage() {
	return (
		<Suspense fallback={
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		}>
			<VerifyContent />
		</Suspense>
	);
}

