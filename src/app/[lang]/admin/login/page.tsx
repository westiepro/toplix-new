"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Home, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import { useLanguage } from "@/contexts/LanguageContext";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
	const router = useRouter();
	const { currentLanguage } = useLanguage();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginForm) => {
		setIsLoading(true);
		
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				// Show error message
				const errorDiv = document.getElementById('login-error');
				if (errorDiv) {
					errorDiv.textContent = result.error || 'Login failed';
					errorDiv.classList.remove('hidden');
				}
				setIsLoading(false);
				return;
			}

			// Store authentication info
			localStorage.setItem("admin-authenticated", "true");
			localStorage.setItem("admin-user", JSON.stringify(result.admin));
			
			// Redirect to dashboard
			router.push(`/${currentLanguage}/admin/dashboard`);
		} catch (error) {
			console.error('Login error:', error);
			const errorDiv = document.getElementById('login-error');
			if (errorDiv) {
				errorDiv.textContent = 'Failed to connect to server';
				errorDiv.classList.remove('hidden');
			}
			setIsLoading(false);
		}
	};

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#198754] via-[#198754] to-[#0d5c37] p-4">
				<Card className="w-full max-w-md shadow-2xl">
					<CardHeader className="space-y-1 text-center">
						<div className="flex justify-center mb-4">
							<div className="h-12 w-12 rounded-lg bg-[#198754] flex items-center justify-center">
								<Home className="h-7 w-7 text-white" />
							</div>
						</div>
						<CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
						<CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							{/* Error Message */}
							<div id="login-error" className="hidden bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm"></div>
							
							<div className="space-y-2">
								<label htmlFor="email" className="text-sm font-medium">
									Email
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="email"
										type="email"
										placeholder="admin@example.com"
										className="pl-10"
										{...register("email")}
									/>
								</div>
								{errors.email && (
									<p className="text-sm text-destructive">{errors.email.message}</p>
								)}
							</div>

							<div className="space-y-2">
								<label htmlFor="password" className="text-sm font-medium">
									Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="password"
										type="password"
										placeholder="••••••••"
										className="pl-10"
										{...register("password")}
									/>
								</div>
								{errors.password && (
									<p className="text-sm text-destructive">{errors.password.message}</p>
								)}
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Signing in..." : "Sign In"}
							</Button>
						</form>

						<div className="mt-4 text-center text-sm text-muted-foreground">
							<p>Use your admin credentials to login</p>
							<p className="text-xs mt-1">Default: admin@example.com (check database for password)</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</ThemeProvider>
	);
}



