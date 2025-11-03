"use client";

import { LocaleLink } from "@/components/LocaleLink";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { trackPropertyCardClick, trackPropertyFavorite } from "@/lib/analytics-events";
import { useShare } from "@/hooks/useShare";
import { ShareModal } from "@/components/ShareModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export type AIStyle = {
	style_name: string;
	image_url: string;
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
};

export function formatPrice(price: number): string {
	if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
	if (price >= 1_000) return `$${Math.round(price / 1_000)}K`;
	return `$${price}`;
}

export function PropertyCard({ property, highlighted, position = 0, source = 'search_results' }: { 
	property: Property; 
	highlighted?: boolean;
	position?: number;
	source?: 'search_results' | 'map_popup' | 'favorites' | 'homepage';
}) {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const { currentLanguage } = useLanguage();
	const { t } = useTranslation();
	const favorited = isFavorite(property.id);

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

	return (
		<>
			<LocaleLink href={`/property/${property.id}`} onClick={handleCardClick}>
				<Card className={`overflow-hidden transition hover:shadow-lg ${highlighted ? "ring-2 ring-green-600" : ""} p-0`}>
					<div className="relative h-56 w-full">
						<Image src={property.imageUrl} alt={property.address} fill className="object-cover" />
					</div>
					<CardContent className="space-y-1.5 px-3 py-2.5">
						<div className="flex items-start justify-between gap-2">
							<div className="text-xl font-bold">{formatPrice(property.price)}</div>
							<div className="flex gap-1 flex-shrink-0 -mt-0.5">
								<button
									onClick={handleShareClick}
									className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
									aria-label="Share this property"
								>
									<Share2 className="h-5 w-5 text-gray-400 hover:text-gray-600" />
								</button>
								<button
									onClick={handleFavoriteClick}
									className="p-1 hover:bg-gray-100 rounded-full transition-colors"
								>
									<Heart
										className={`h-5 w-5 transition-colors ${
											favorited ? "fill-red-500 text-red-500" : "text-gray-400"
										}`}
									/>
								</button>
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
		</>
	);
}


