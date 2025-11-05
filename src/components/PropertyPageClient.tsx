"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { useRecentlyViewedContext } from "@/contexts/RecentlyViewedContext";
import { toast } from "sonner";
import { useShare } from "@/hooks/useShare";
import { ShareModal } from "@/components/ShareModal";
import { LoginModal } from "@/components/LoginModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPropertyView, trackPropertyShare } from "@/lib/analytics-events";
import { useEffect, useState } from "react";
import type { Property } from "@/components/PropertyCard";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyPageClientProps {
	property: Property;
}

export function PropertyPageClient({ property }: PropertyPageClientProps) {
	const { t } = useTranslation();
	const { currentLanguage } = useLanguage();
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const { addToRecentlyViewed } = useRecentlyViewedContext();
	const { user, isGuest } = useAuth();
	const [showLoginModal, setShowLoginModal] = useState(false);

	// Track property view on mount
	useEffect(() => {
		// Track for analytics
		trackPropertyView(
			property.id,
			property.address,
			property.price,
			property.city
		);
		
		// Add to recently viewed
		addToRecentlyViewed(property.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [property.id]); // Only re-run when property ID changes

	// Share functionality
	const {
		handleShare,
		isShareModalOpen,
		setIsShareModalOpen,
		copyLink,
		shareViaEmail,
		shareOnFacebook,
		shareOnTwitter,
		shareOnLinkedIn,
		shareOnWhatsApp,
	} = useShare(
		{
			id: property.id,
			address: property.address,
			city: property.city,
			price: property.price,
			country: property.country,
		},
		currentLanguage,
		t
	);

	const handleFavoriteClick = () => {
		// Check if user is logged in (not guest and has user object)
		if (!user || isGuest) {
			setShowLoginModal(true);
			return;
		}
		
		if (isFavorite(property.id)) {
			removeFavorite(property.id);
			toast.success("Removed from favorites");
		} else {
			addFavorite(property.id);
			toast.success("Added to favorites");
		}
	};

	const handleShareClick = () => {
		trackPropertyShare(property.id, 'link');
		handleShare();
	};

	return (
		<>
			<div className="flex gap-3">
				<Button
					variant="outline"
					size="icon"
					onClick={handleFavoriteClick}
					className={isFavorite(property.id) ? "text-red-500" : ""}
				>
					<Heart
						className={`h-8 w-8 ${
							isFavorite(property.id) ? "fill-current" : ""
						}`}
					/>
				</Button>
				<Button 
					variant="outline" 
					size="icon" 
					onClick={handleShareClick}
					className="transition-all duration-200 hover:scale-105 active:scale-95"
					aria-label="Share this property"
				>
					<Share2 className="h-8 w-8" />
				</Button>
			</div>

			{/* Share Modal */}
			<ShareModal
				isOpen={isShareModalOpen}
				onClose={() => setIsShareModalOpen(false)}
				propertyAddress={property.address}
				propertyCity={property.city}
				onCopyLink={copyLink}
				onShareEmail={shareViaEmail}
				onShareFacebook={shareOnFacebook}
				onShareTwitter={shareOnTwitter}
				onShareLinkedIn={shareOnLinkedIn}
				onShareWhatsApp={shareOnWhatsApp}
			/>

			{/* Login Modal */}
			<LoginModal
				open={showLoginModal}
				onOpenChange={setShowLoginModal}
			/>
		</>
	);
}

