"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, User, Map, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { FavoritesDropdown } from "@/components/FavoritesDropdown";
import { getPropertiesByIds } from "@/lib/favorites-helper";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";

export function Navbar() {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { user, isGuest, signOut } = useAuth();
	const { getFavorites } = useFavoritesContext();
	const favoriteIds = getFavorites();
	const favoriteProperties = getPropertiesByIds(favoriteIds);

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
				<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<Home className="h-5 w-5" />
						<span>NextEstate</span>
					</Link>
					<nav className="hidden items-center gap-6 md:flex">
						<Link href="/homes" className="text-sm text-muted-foreground hover:text-foreground">Buy</Link>
						<Link href="/homes?for=rent" className="text-sm text-muted-foreground hover:text-foreground">Rent</Link>
						<Link href="/sell" className="text-sm text-muted-foreground hover:text-foreground">Sell</Link>
					</nav>
					<div className="flex items-center gap-2">
						<Link href="/homes">
							<Button variant="secondary" size="sm" className="gap-2"><Map className="h-4 w-4" /> Explore</Button>
						</Link>
						
						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm" className="gap-2">
										<User className="h-4 w-4" />
										<span className="hidden md:inline">My Account</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<div className="px-2 py-1.5 text-sm">
										<p className="font-medium">{user.email}</p>
									</div>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleSignOut}>
										<LogOut className="mr-2 h-4 w-4" />
										Sign Out
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
								{isGuest ? "Sign In" : "Login"}
							</Button>
						)}

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm" className="gap-2 relative">
									<Heart className="h-4 w-4" />
									<span className="hidden md:inline">Favorites</span>
									{favoriteIds.length > 0 && (
										<Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5 text-xs">
											{favoriteIds.length}
										</Badge>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="p-0">
								<FavoritesDropdown favorites={favoriteProperties} />
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Guest Mode Banner */}
				{isGuest && !user && (
					<div className="bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-900">
						<div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-sm">
							<p className="text-blue-900 dark:text-blue-100">
								Browsing as guest - Sign in to save favorites and access all features
							</p>
							<Button 
								variant="link" 
								size="sm" 
								className="text-blue-600 dark:text-blue-400"
								onClick={() => setShowLoginModal(true)}
							>
								Sign In
							</Button>
						</div>
					</div>
				)}
			</header>

			<LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
		</>
	);
}


