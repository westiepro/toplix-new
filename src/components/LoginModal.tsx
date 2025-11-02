"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface LoginModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

type ModalState = "initial" | "existing_user" | "check_email";

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modalState, setModalState] = useState<ModalState>("initial");
	const [isLoading, setIsLoading] = useState(false);
	const { signIn, signUp, signInWithOAuth, continueAsGuest } = useAuth();

	// Reset state when modal closes
	useEffect(() => {
		if (!open) {
			setTimeout(() => {
				setEmail("");
				setPassword("");
				setModalState("initial");
				setIsLoading(false);
			}, 200);
		}
	}, [open]);

	const handleContinueWithEmail = async () => {
		if (!email || !email.includes("@")) {
			toast.error(t("login.enterValidEmail"));
			return;
		}

		setIsLoading(true);

		console.log("Continue with email clicked for:", email);

		// Try to sign up - this will create user and log them in instantly
		const { error: signUpError, data } = await signUp(email);
		
		console.log("Sign up response:", { error: signUpError, data });
		
		if (signUpError) {
			// If error is "already registered", show password field for existing users
			if (signUpError.message?.includes("already registered") || signUpError.message?.includes("User already registered")) {
				setModalState("existing_user");
				setIsLoading(false);
				return;
			}
			
			// Show detailed error message
			toast.error(signUpError.message, {
				duration: 10000,
			});
			setIsLoading(false);
		} else {
			// Success! User is created and logged in instantly
			console.log("User created successfully!");
			toast.success(t("login.welcomeLoggedIn"));
			setIsLoading(false);
			onOpenChange(false);
			// The AuthContext will handle the session automatically
		}
	};

	const handleSignIn = async () => {
		if (!password) {
			toast.error(t("login.enterPassword"));
			return;
		}

		setIsLoading(true);
		const { error } = await signIn(email, password);

		if (error) {
			toast.error(error.message);
			setIsLoading(false);
		} else {
			toast.success(t("login.signedInSuccess"));
			onOpenChange(false);
		}
	};

	const handleOAuthSignIn = async (provider: "google" | "apple") => {
		setIsLoading(true);
		const { error } = await signInWithOAuth(provider);

		if (error) {
			toast.error(error.message);
			setIsLoading(false);
		}
		// OAuth will redirect, so we don't need to close the modal
	};

	const handleGuestMode = () => {
		continueAsGuest();
		toast.success(t("login.browsingAsGuest"));
		onOpenChange(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			if (modalState === "existing_user") {
				handleSignIn();
			} else if (modalState === "initial") {
				handleContinueWithEmail();
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[440px] p-0">
				<button
					onClick={() => onOpenChange(false)}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">{t("login.close")}</span>
				</button>

				<div className="p-6 pt-8">
				<DialogHeader className="mb-6">
					<DialogTitle className="text-center text-xl font-semibold">
						{t("login.title")}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Social Login Buttons */}
							<Button
								variant="outline"
								className="w-full justify-start gap-3 h-11"
								onClick={() => handleOAuthSignIn("google")}
								disabled={isLoading}
							>
								<svg className="h-5 w-5" viewBox="0 0 24 24">
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								<span>{t("login.continueWithGoogle")}</span>
							</Button>

							<Button
								variant="default"
								className="w-full justify-start gap-3 h-11 bg-black hover:bg-black/90 text-white"
								onClick={() => handleOAuthSignIn("apple")}
								disabled={isLoading}
							>
								<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
								</svg>
								<span>{t("login.continueWithApple")}</span>
							</Button>

							{/* Divider */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										{t("login.orEnterEmail")}
									</span>
								</div>
							</div>

							{/* Email Input */}
							<div className="space-y-3">
								<Input
									type="email"
									placeholder={t("login.emailPlaceholder")}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onKeyPress={handleKeyPress}
									disabled={isLoading || modalState === "existing_user"}
									className="h-11"
								/>

								{/* Password field for existing users */}
								{modalState === "existing_user" && (
									<Input
										type="password"
										placeholder={t("login.passwordPlaceholder")}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										onKeyPress={handleKeyPress}
										disabled={isLoading}
										className="h-11"
									/>
								)}

								{modalState === "existing_user" ? (
									<div className="space-y-2">
										<Button
											onClick={handleSignIn}
											disabled={isLoading}
											className="w-full h-11"
										>
											{isLoading ? t("login.signingIn") : t("login.signIn")}
										</Button>
										<Button
											variant="ghost"
											onClick={() => setModalState("initial")}
											disabled={isLoading}
											className="w-full"
										>
											{t("login.back")}
										</Button>
									</div>
								) : (
									<Button
										onClick={handleContinueWithEmail}
										disabled={isLoading}
										className="w-full h-11"
									>
										{isLoading ? t("login.pleaseWait") : t("login.continueWithEmail")}
									</Button>
								)}
							</div>

					{/* Guest Mode Link */}
					{modalState === "initial" && (
						<div className="pt-2 text-center">
							<button
								onClick={handleGuestMode}
								className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
							>
								{t("login.continueAsGuest")}
							</button>
						</div>
					)}
				</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

