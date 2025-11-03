"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Property } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateFallbackPropertyUrl } from "@/lib/generate-property-url";

type FavoritesDropdownProps = {
	favorites: Property[];
};

export function FavoritesDropdown({ favorites }: FavoritesDropdownProps) {
	const { t } = useTranslation();
	const { currentLanguage } = useLanguage();

	if (favorites.length === 0) {
		return (
			<div className="w-80 p-6 text-center">
				<div className="flex justify-center mb-3">
					<div className="p-3 rounded-full bg-gray-100">
						<Heart className="h-8 w-8 text-gray-400" />
					</div>
				</div>
				<p className="text-sm text-muted-foreground mb-2">{t("favorites.noFavoritesYet")}</p>
				<p className="text-xs text-muted-foreground">
					{t("favorites.clickToSave")}
				</p>
			</div>
		);
	}

	const displayFavorites = favorites.slice(0, 5);

	return (
		<div className="w-96">
			<div className="max-h-96 overflow-y-auto">
				{displayFavorites.map((property) => {
					const propertyUrl = generateFallbackPropertyUrl(property, currentLanguage);
					return (
						<Link
							key={property.id}
							href={propertyUrl}
							className="flex gap-3 p-3 hover:bg-accent transition-colors border-b last:border-b-0"
						>
						<div className="relative w-20 h-16 flex-shrink-0 rounded-md overflow-hidden">
							<Image
								src={property.imageUrl}
								alt={property.address}
								fill
								className="object-cover"
								sizes="80px"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="font-semibold text-sm">{formatPrice(property.price)}</p>
							<p className="text-xs text-muted-foreground truncate">
								{property.address}
							</p>
							<p className="text-xs text-muted-foreground">
								{property.beds} {t("favorites.bd")} · {property.baths} {t("favorites.ba")}
							</p>
						</div>
					</Link>
					);
				})}
			</div>
			{favorites.length > 5 && (
				<div className="p-3 border-t bg-muted/50">
					<p className="text-xs text-center text-muted-foreground mb-2">
						+{favorites.length - 5} {t("favorites.moreFavorites")}
					</p>
				</div>
			)}
			<div className="p-3 border-t">
				<Button asChild variant="outline" className="w-full">
					<LocaleLink href="/dashboard">{t("favorites.viewAll")}</LocaleLink>
				</Button>
			</div>
		</div>
	);
}



