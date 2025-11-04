"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
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
	similarProperties?: Property[];
	propertyFeatures?: string[];
}

export function PropertyPageClient({ property, similarProperties = [], propertyFeatures = [] }: PropertyPageClientProps) {
	const { t } = useTranslation();
	const { currentLanguage } = useLanguage();
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const { user, isGuest } = useAuth();
	const [showLoginModal, setShowLoginModal] = useState(false);

	// Track property view on mount
	useEffect(() => {
		trackPropertyView(
			property.id,
			property.address,
			property.price,
			property.city
		);
	}, [property.id, property.address, property.price, property.city]);

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
		<main className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto max-w-7xl">
				{/* Action Buttons - Top Right */}
				<div className="fixed top-20 right-4 z-40 flex gap-3">
					<Button
						variant="outline"
						size="icon"
						onClick={handleFavoriteClick}
						className={`bg-white dark:bg-gray-800 shadow-lg ${isFavorite(property.id) ? "text-red-500" : ""}`}
					>
						<Heart
							className={`h-5 w-5 ${
								isFavorite(property.id) ? "fill-current" : ""
							}`}
						/>
					</Button>
					<Button 
						variant="outline" 
						size="icon" 
						onClick={handleShareClick}
						className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
						aria-label="Share this property"
					>
						<Share2 className="h-5 w-5" />
					</Button>
				</div>

				{/* Property Content */}
				<div className="p-6">
					<h1 className="text-3xl font-bold mb-2">
						{property.address}
					</h1>
					<p className="text-xl text-muted-foreground mb-6">
						{property.city}, {property.country}
					</p>

					{/* Property Details */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
							<div className="text-sm text-muted-foreground">{t("propertyDetail.bedrooms")}</div>
							<div className="text-2xl font-bold">{property.beds}</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
							<div className="text-sm text-muted-foreground">{t("propertyDetail.bathrooms")}</div>
							<div className="text-2xl font-bold">{property.baths}</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
							<div className="text-sm text-muted-foreground">{t("propertyDetail.area")}</div>
							<div className="text-2xl font-bold">{property.area} m²</div>
						</div>
						<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
							<div className="text-sm text-muted-foreground">Price</div>
							<div className="text-2xl font-bold">€{property.price.toLocaleString()}</div>
						</div>
					</div>

					{/* Description */}
					{property.description && (
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
							<h2 className="text-2xl font-bold mb-4">{t("propertyDetail.description")}</h2>
							<p className="text-muted-foreground">{property.description}</p>
						</div>
					)}

					{/* Property Features */}
					{propertyFeatures.length > 0 && (
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
							<h2 className="text-2xl font-bold mb-4">{t("propertyDetail.propertyFeatures")}</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								{propertyFeatures.map((feature) => (
									<div key={feature} className="flex items-center gap-2">
										<span className="text-green-600">✓</span>
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Similar Properties */}
					{similarProperties.length > 0 && (
						<div className="mt-8">
							<h2 className="text-2xl font-bold mb-4">Similar Properties</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{similarProperties.map((similarProp) => (
									<div key={similarProp.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
										<p className="font-semibold">{similarProp.address}</p>
										<p className="text-muted-foreground">{similarProp.city}</p>
										<p className="text-lg font-bold mt-2">€{similarProp.price.toLocaleString()}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
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
		</main>
	);
}

