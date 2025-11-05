"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function ResetPasswordContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user, setPassword } = useAuth();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isVerifying, setIsVerifying] = useState(true);
	const [hasValidToken, setHasValidToken] = useState(false);

	useEffect(() => {
		// Wait for Supabase to process the password reset token from URL
		const checkToken = async () => {
			// Give Supabase time to process the hash
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Check if user session exists (means token was valid)
			if (user) {
				setHasValidToken(true);
				setIsVerifying(false);
			} else {
				setHasValidToken(false);
				setIsVerifying(false);
				toast.error("Invalid or expired reset link. Please request a new one.");
			}
		};

		checkToken();
	}, [user]);

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setIsLoading(true);
		const { error } = await setPassword(newPassword);

		if (error) {
			toast.error(error.message);
			setIsLoading(false);
		} else {
			toast.success("Password reset successfully! Redirecting to dashboard...");
			setTimeout(() => {
				router.push("/user-dashboard");
			}, 1500);
		}
	};

	if (isVerifying) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
				<Card className="w-full max-w-md">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<p className="mt-4 text-sm text-muted-foreground">Verifying reset link...</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!hasValidToken) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Invalid Reset Link</CardTitle>
						<CardDescription>
							This password reset link is invalid or has expired.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={() => router.push("/")} className="w-full">
							Return to Home
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Reset Your Password</CardTitle>
					<CardDescription>
						Enter your new password below
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleResetPassword} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="new-password" className="text-sm font-medium">
								New Password
							</label>
							<Input
								id="new-password"
								type="password"
								placeholder="Enter new password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								disabled={isLoading}
								required
								minLength={6}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="confirm-password" className="text-sm font-medium">
								Confirm Password
							</label>
							<Input
								id="confirm-password"
								type="password"
								placeholder="Confirm new password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={isLoading}
								required
								minLength={6}
							/>
						</div>

						<Button
							type="submit"
							disabled={isLoading}
							className="w-full"
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Resetting Password...
								</>
							) : (
								"Reset Password"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		}>
			<ResetPasswordContent />
		</Suspense>
	);
}

