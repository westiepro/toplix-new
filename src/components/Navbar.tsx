"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Heart, User, Map, Home, LogOut, Settings, Briefcase, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { FavoritesDropdown } from "@/components/FavoritesDropdown";
import { getPropertiesByIds } from "@/lib/favorites-helper";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { LocaleLink } from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Property } from "@/components/PropertyCard";
import { toast } from "sonner";
import { prefetchProperties } from "@/lib/properties-cache";
import { TopLixLogoLink } from "@/components/TopLixLogo";

export function Navbar() {
	const { t } = useTranslation();
	const { currentLanguage } = useLanguage();
	const { setTheme } = useTheme();
	const router = useRouter();
	const pathname = usePathname();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { user, isGuest, signOut } = useAuth();
	const { getFavorites, cleanupStaleFavorites, clearAllFavorites } = useFavoritesContext();
	const favoriteIds = getFavorites();
	const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
	const [userDropdownOpen, setUserDropdownOpen] = useState(false);
	const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);
	const userTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const favoritesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);

	// Check if user is admin
	useEffect(() => {
		const adminUserJson = localStorage.getItem("admin-user");
		const isAdminAuth = localStorage.getItem("admin-authenticated") === "true";
		
		if (adminUserJson && isAdminAuth) {
			try {
				const adminUser = JSON.parse(adminUserJson);
				// Admin is authenticated via localStorage (not Supabase)
				setIsAdmin(true);
				console.log("👑 Admin detected in Navbar:", adminUser.email);
			} catch (e) {
				setIsAdmin(false);
			}
		} else {
			setIsAdmin(false);
		}
	}, [user]);
	
	// Force light theme on non-admin pages for admin users
	useEffect(() => {
		const isAdminRoute = pathname?.includes('/admin');
		const isAdminAuth = localStorage.getItem("admin-authenticated") === "true";
		
		// If admin is on a non-admin page, force light theme
		if (isAdminAuth && !isAdminRoute) {
			console.log("🎨 Admin on public page, forcing light theme");
			setTheme("light");
		}
	}, [pathname, setTheme]);

	// Load favorite properties
	useEffect(() => {
		const loadFavorites = async () => {
			const properties = await getPropertiesByIds(favoriteIds);
			setFavoriteProperties(properties);
			
			// Clean up stale favorites (IDs that don't exist in database)
			if (properties.length < favoriteIds.length) {
				const validIds = properties.map(p => p.id);
				cleanupStaleFavorites(validIds);
			}
		};
		loadFavorites();
	}, [favoriteIds, cleanupStaleFavorites]);

	const handleSignOut = async () => {
		// Check if admin is logged in
		const isAdminAuth = localStorage.getItem("admin-authenticated") === "true";
		
		console.log("🔴 Navbar handleSignOut called", { isAdminAuth });
		
		if (isAdminAuth) {
			// Admin logout: clear admin auth and redirect to admin login
			localStorage.removeItem("admin-authenticated");
			localStorage.removeItem("admin-user");
			localStorage.removeItem("admin-login-timestamp");
			toast.success("Admin signed out successfully");
			window.location.href = `/${currentLanguage}/admin/login`;
			return;
		}
		
		// Regular user logout
		// Clear favorites before signing out
		clearAllFavorites();
		
		// Show feedback
		toast.success("Signed out successfully");
		
		// Sign out (will redirect to home page)
		await signOut();
	};

	const handleDashboardClick = () => {
		console.log("Dashboard clicked - navigating to /user-dashboard");
		router.push(`/${currentLanguage}/user-dashboard`);
	};

	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur" suppressHydrationWarning>
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
					<TopLixLogoLink size="md" />
				<nav className="hidden items-center gap-6 md:flex">
					<LocaleLink href="/buy" className="text-sm text-muted-foreground hover:text-foreground" onMouseEnter={prefetchProperties}>{t("home.nav.buy")}</LocaleLink>
					<LocaleLink href="/buy?for=rent" className="text-sm text-muted-foreground hover:text-foreground" onMouseEnter={prefetchProperties}>{t("home.nav.rent")}</LocaleLink>
					<LocaleLink href="/sell" className="text-sm text-muted-foreground hover:text-foreground">{t("home.nav.sell")}</LocaleLink>
				</nav>
				<div className="flex items-center gap-2">
					<LocaleLink href="/buy" onMouseEnter={prefetchProperties}>
						<Button variant="secondary" size="sm" className="gap-2"><Map className="h-4 w-4" /> {t("navbar.explore")}</Button>
					</LocaleLink>
						
					{(user || isAdmin) ? (
						<DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
							<DropdownMenuTrigger asChild suppressHydrationWarning>
								<Button 
									variant="ghost" 
									size="sm" 
									className="gap-2" 
									suppressHydrationWarning
									onMouseEnter={() => {
										if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
										if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
										setFavoritesDropdownOpen(false); // Close favorites when entering user menu
										setUserDropdownOpen(true);
									}}
									onMouseLeave={() => {
										userTimeoutRef.current = setTimeout(() => setUserDropdownOpen(false), 1000);
									}}
								>
									<User className="h-4 w-4" />
									<span className="hidden md:inline truncate max-w-[150px]">
										{isAdmin 
											? JSON.parse(localStorage.getItem("admin-user") || '{}').email 
											: user?.email
										}
									</span>
									<ChevronDown className="h-3 w-3 opacity-50" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent 
								align="end" 
								className="w-64"
								sideOffset={12}
								onMouseEnter={() => {
									if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
									if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
									setFavoritesDropdownOpen(false); // Close favorites when entering user dropdown content
									setUserDropdownOpen(true);
								}}
								onMouseLeave={() => {
									userTimeoutRef.current = setTimeout(() => setUserDropdownOpen(false), 1000);
								}}
							>
								<div className="px-2 py-1.5 text-sm">
									<p className="font-medium truncate">
										{isAdmin 
											? JSON.parse(localStorage.getItem("admin-user") || '{}').email 
											: user?.email
										}
									</p>
									{isAdmin && (
										<p className="text-xs text-purple-600 font-medium mt-0.5">👑 Admin</p>
									)}
								</div>
								<DropdownMenuSeparator />
								{isAdmin && (
									<LocaleLink href="/admin/dashboard" className="block">
										<DropdownMenuItem className="cursor-pointer">
											<Settings className="mr-2 h-4 w-4 text-purple-600" />
											Admin Panel
										</DropdownMenuItem>
									</LocaleLink>
								)}
								<LocaleLink href="/user-dashboard" className="block">
									<DropdownMenuItem className="cursor-pointer">
										<Home className="mr-2 h-4 w-4 text-blue-600" />
										{t("navbar.dashboard")}
									</DropdownMenuItem>
								</LocaleLink>
								{isAdmin && (
									<LocaleLink href="/agent-dashboard" className="block">
										<DropdownMenuItem className="cursor-pointer">
											<Briefcase className="mr-2 h-4 w-4 text-cyan-600" />
											Agent Dashboard
										</DropdownMenuItem>
									</LocaleLink>
								)}
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
									<LogOut className="mr-2 h-4 w-4" />
									{t("navbar.signOut")}
								</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button 
								variant="ghost" 
								size="sm" 
								className="gap-2"
								onClick={() => setShowLoginModal(true)}
							>
								<User className="h-4 w-4" />
								{t("navbar.signIn")}
							</Button>
						)}

					<DropdownMenu open={favoritesDropdownOpen} onOpenChange={setFavoritesDropdownOpen}>
						<DropdownMenuTrigger asChild suppressHydrationWarning>
						<Button 
							variant="ghost" 
							size="sm" 
							className="gap-2 relative" 
							suppressHydrationWarning
							onMouseEnter={() => {
								if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
								if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
								setUserDropdownOpen(false); // Close user menu when entering favorites
								setFavoritesDropdownOpen(true);
							}}
							onMouseLeave={() => {
								favoritesTimeoutRef.current = setTimeout(() => setFavoritesDropdownOpen(false), 1000);
							}}
						>
							<Heart className="h-4 w-4" />
							<span className="hidden md:inline">{t("navbar.favorites")}</span>
							{favoriteProperties.length > 0 && (
								<Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5 text-xs">
									{favoriteProperties.length}
								</Badge>
							)}
							<ChevronDown className="h-3 w-3 opacity-50" />
							</Button>
						</DropdownMenuTrigger>
							<DropdownMenuContent 
								align="end" 
								className="p-0"
								sideOffset={12}
								onMouseEnter={() => {
									if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
									if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
									setUserDropdownOpen(false); // Close user menu when entering favorites dropdown content
									setFavoritesDropdownOpen(true);
								}}
								onMouseLeave={() => {
									favoritesTimeoutRef.current = setTimeout(() => setFavoritesDropdownOpen(false), 1000);
								}}
							>
								<FavoritesDropdown favorites={favoriteProperties} />
							</DropdownMenuContent>
						</DropdownMenu>

						<LanguageSwitcher />
					</div>
				</div>

				{/* Guest Mode Banner */}
				{isGuest && !user && (
					<div className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-900">
						<div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-sm">
							<p className="text-blue-900 dark:text-blue-100">
								{t("navbar.guestBanner")}
							</p>
							<Button 
								variant="link" 
								size="sm" 
								className="text-blue-600 dark:text-blue-400"
								onClick={() => setShowLoginModal(true)}
							>
								{t("navbar.guestSignIn")}
							</Button>
						</div>
					</div>
				)}
			</header>

			<LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
		</>
	);
}


