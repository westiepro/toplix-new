"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { normalizeSlug, getHousesApartmentsSlug } from "@/lib/url-translations";

interface PropertyBreadcrumbsProps {
	transaction: string;
	city: string;
	propertyAddress: string;
}

export function PropertyBreadcrumbs({
	transaction,
	city,
	propertyAddress,
}: PropertyBreadcrumbsProps) {
	const { currentLanguage } = useLanguage();
	const housesApartmentsSlug = getHousesApartmentsSlug(currentLanguage);

	const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	return (
		<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto">
			<Link
				href={`/${currentLanguage}`}
				className="flex items-center gap-1 hover:text-foreground transition-colors whitespace-nowrap"
			>
				<Home className="h-4 w-4" />
				<span>Home</span>
			</Link>
			
			<ChevronRight className="h-4 w-4 flex-shrink-0" />
			
			<Link
				href={`/${currentLanguage}/${transaction}`}
				className="hover:text-foreground transition-colors whitespace-nowrap"
			>
				{capitalizeFirst(transaction)}
			</Link>
			
			<ChevronRight className="h-4 w-4 flex-shrink-0" />
			
			<Link
				href={`/${currentLanguage}/${transaction}/${normalizeSlug(city)}`}
				className="hover:text-foreground transition-colors whitespace-nowrap"
			>
				{capitalizeFirst(city)}
			</Link>
			
			<ChevronRight className="h-4 w-4 flex-shrink-0" />
			
			<Link
				href={`/${currentLanguage}/${transaction}/${normalizeSlug(city)}/${housesApartmentsSlug}`}
				className="hover:text-foreground transition-colors whitespace-nowrap"
			>
				{capitalizeFirst(housesApartmentsSlug.replace(/-/g, ' '))}
			</Link>
			
			<ChevronRight className="h-4 w-4 flex-shrink-0" />
			
			<span className="text-foreground font-medium truncate max-w-xs">
				{propertyAddress}
			</span>
		</nav>
	);
}
