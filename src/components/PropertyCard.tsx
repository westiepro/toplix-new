"use client";

import { LocaleLink } from "@/components/LocaleLink";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

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

export function PropertyCard({ property, highlighted }: { property: Property; highlighted?: boolean; }) {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const favorited = isFavorite(property.id);

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		if (favorited) {
			removeFavorite(property.id);
			toast.success("Removed from favorites", {
				description: property.address,
			});
		} else {
			addFavorite(property.id);
			toast.success("Added to favorites", {
				description: property.address,
			});
		}
	};

	return (
		<LocaleLink href={`/property/${property.id}`}>
			<Card className={`overflow-hidden transition hover:shadow-lg ${highlighted ? "ring-2 ring-green-600" : ""} p-0`}>
				<div className="relative h-56 w-full">
					<Image src={property.imageUrl} alt={property.address} fill className="object-cover" />
				</div>
				<CardContent className="space-y-1.5 px-3 py-2.5">
					<div className="flex items-start justify-between gap-2">
						<div className="text-xl font-bold">{formatPrice(property.price)}</div>
						<button
							onClick={handleFavoriteClick}
							className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 -mt-0.5"
						>
							<Heart
								className={`h-5 w-5 transition-colors ${
									favorited ? "fill-red-500 text-red-500" : "text-gray-400"
								}`}
							/>
						</button>
					</div>
					<div className="text-sm text-muted-foreground">
						{property.beds} beds · {property.baths} baths · {property.area} sq ft
					</div>
					<div className="text-sm font-medium">{property.address}</div>
					<div className="text-sm text-muted-foreground">{property.city}</div>
				</CardContent>
			</Card>
		</LocaleLink>
	);
}


