"use client";

import { LocaleLink } from "@/components/LocaleLink";
import Image from "next/image";
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { trackPropertyCardClick, trackPropertyFavorite } from "@/lib/analytics-events";
import { useShare } from "@/hooks/useShare";
import { ShareModal } from "@/components/ShareModal";
import { LoginModal } from "@/components/LoginModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { formatPriceFull, formatPriceShort } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export type AIStyle = {
	style_name: string;
	image_url: string;
};

export type PropertyImage = {
	id?: string;
	image_url: string;
	display_order?: number;
	is_featured?: boolean;
};

export type Property = {
	id: string;
	price: number;
	address: string;
	city: string;
	country?: string;
	beds: number;
	baths: number;
	area: number; // sqft or m²
	property_type?: string;
	lat: number;
	lng: number;
	description?: string;
	imageUrl: string;
	original_image?: string; // Original property photo
	ai_styles?: AIStyle[]; // AI-generated style variations
	images?: PropertyImage[]; // Multiple property images
};

// Export both formats for backward compatibility
export const formatPrice = formatPriceFull; // Default to full format for cards
export { formatPriceShort };

export function PropertyCard({ property, highlighted, position = 0, source = 'search_results' }: { 
	property: Property; 
	highlighted?: boolean;
	position?: number;
	source?: 'search_results' | 'map_popup' | 'favorites' | 'homepage' | 'similar_properties';
}) {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const { currentLanguage } = useLanguage();
	const { t } = useTranslation();
	const { user, isGuest } = useAuth();
	const favorited = isFavorite(property.id);
	
	// Image navigation state
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isImageHovered, setIsImageHovered] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	
	// Get all available images with fallback
	const allImages = property.images && property.images.length > 0 
		? property.images.map(img => img.image_url).filter(url => url) // Filter out undefined/empty URLs
		: property.imageUrl ? [property.imageUrl] : ['https://via.placeholder.com/800x600?text=No+Image'];
	
	const totalImages = allImages.length;
	const currentImage = allImages[currentImageIndex] || 'https://via.placeholder.com/800x600?text=No+Image';

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

	const handleCardClick = () => {
		trackPropertyCardClick(property.id, position, source);
	};

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		// Check if user is logged in (not guest and has user object)
		if (!user || isGuest) {
			setShowLoginModal(true);
			return;
		}
		
		if (favorited) {
			removeFavorite(property.id);
			trackPropertyFavorite(property.id, 'remove');
			toast.success("Removed from favorites", {
				description: property.address,
			});
		} else {
			addFavorite(property.id);
			trackPropertyFavorite(property.id, 'add');
			toast.success("Added to favorites", {
				description: property.address,
			});
		}
	};

	const handleShareClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		handleShare();
	};

	const handlePreviousImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
	};

	const handleNextImage = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev + 1) % totalImages);
	};

	return (
		<>
			<LocaleLink href={`/property/${property.id}`} prefetch={true} onClick={handleCardClick}>
				<Card className={`overflow-hidden transition hover:shadow-lg ${highlighted ? "ring-2 ring-green-600" : ""} p-0 gap-0`}>
					<div 
						className="relative h-72 w-full group"
						onMouseEnter={() => setIsImageHovered(true)}
						onMouseLeave={() => setIsImageHovered(false)}
					>
						<Image 
							src={currentImage} 
							alt={property.address} 
							fill 
							className="object-cover" 
						/>
						
						{/* Navigation Arrows - Only visible on hover and when there are multiple images */}
						{totalImages > 1 && isImageHovered && (
							<>
								{/* Left Arrow */}
								<button
									onClick={handlePreviousImage}
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-800/80 text-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
									aria-label="Previous image"
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								
								{/* Right Arrow */}
								<button
									onClick={handleNextImage}
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-800/80 text-white rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 z-10"
									aria-label="Next image"
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</>
						)}
						
						{/* Image Counter - Only visible from second image onwards */}
						{totalImages > 1 && currentImageIndex > 0 && (
							<div className="absolute bottom-2 left-2 bg-gray-900/80 text-white px-2.5 py-1 rounded text-sm font-medium">
								{currentImageIndex + 1}/{totalImages}
							</div>
						)}
					</div>
					<CardContent className="space-y-1.5 px-3 pt-1 pb-3">
						<div className="flex items-start justify-between gap-2">
							<div className="text-xl font-bold">{formatPriceFull(property.price)}</div>
							<div className="flex gap-1 flex-shrink-0">
								<Button
									variant="outline"
									size="icon"
									onClick={handleShareClick}
									className="h-8 w-8 transition-all duration-200 hover:scale-105 active:scale-95"
									aria-label="Share this property"
								>
									<Share2 className="h-4 w-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									onClick={handleFavoriteClick}
									className={`h-8 w-8 ${favorited ? "text-red-500" : ""}`}
								>
									<Heart
										className={`h-4 w-4 ${
											favorited ? "fill-current" : ""
										}`}
									/>
								</Button>
							</div>
						</div>
						<div className="text-sm text-muted-foreground">
							{property.beds} beds · {property.baths} baths · {property.area} sq ft
						</div>
						<div className="text-sm font-medium">{property.address}</div>
						<div className="text-sm text-muted-foreground">{property.city}</div>
					</CardContent>
				</Card>
			</LocaleLink>

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


