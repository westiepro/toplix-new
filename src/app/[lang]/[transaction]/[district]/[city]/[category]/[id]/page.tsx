import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import type { Property, PropertyImage } from "@/components/PropertyCard";
import { Bed, Bath, Maximize, MapPin, Check } from "lucide-react";
import { PropertyImageGallery } from "@/components/PropertyImageGallery";
import { ContactAgentForm } from "@/components/ContactAgentForm";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyPageClient } from "@/components/PropertyPageClient";
import { notFound, redirect } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";
import { getTransactionTypeFromSlug, getCategoryFromSlug, normalizeSlug } from "@/lib/url-translations";
import { generatePropertyUrl } from "@/lib/generate-property-url";
import type { Metadata } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Property features list
const propertyFeatures = [
	"Marina Views",
	"Large Terrace",
	"Underground Parking",
	"Storage Room",
	"Air Conditioning",
	"Double Glazing",
	"Lift Access",
	"Front Line Location",
	"Concierge 24h",
	"Communal Pool",
	"Wine Fridge",
	"Underfloor Heating",
	"Security System",
	"Fiber Internet",
];

// Fetch property data directly from Supabase
async function getProperty(id: string): Promise<Property | null> {
	try {
		if (!supabaseUrl || !supabaseKey) {
			console.error('Supabase not configured');
			return null;
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		// Fetch property with all images
		const { data: property, error } = await supabase
			.from('properties')
			.select(`
				id,
				price,
				address,
				city,
				country,
				district,
				beds,
				baths,
				area,
				property_type,
				transaction_type,
				url_slug_id,
				lat,
				lng,
				description,
				status,
				property_images(
					id,
					image_url,
					display_order,
					is_featured
				)
			`)
			.or(`id.eq.${id},url_slug_id.eq.${id}`) // Match either UUID or url_slug_id
			.eq('status', 'active')
			.single();

		if (error || !property) {
			console.error('Property fetch error:', error);
			return null;
		}

		// Sort images by display_order
		const images = (property.property_images || [])
			.sort((a: any, b: any) => a.display_order - b.display_order)
			.map((img: any) => ({
				id: img.id,
				image_url: img.image_url,
				display_order: img.display_order,
				is_featured: img.is_featured,
			}));

		return {
			id: property.id,
			price: property.price,
			address: property.address,
			city: property.city,
			country: property.country,
			district: property.district,
			beds: property.beds,
			baths: property.baths,
			area: property.area,
			property_type: property.property_type,
			transaction_type: property.transaction_type || 'buy',
			url_slug_id: property.url_slug_id,
			lat: property.lat,
			lng: property.lng,
			description: property.description,
			imageUrl: images[0]?.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
			images: images,
		};
	} catch (error) {
		console.error('Failed to fetch property:', error);
		return null;
	}
}

// Fetch similar properties
async function getSimilarProperties(city: string, excludeId: string): Promise<Property[]> {
	try {
		if (!supabaseUrl || !supabaseKey) {
			return [];
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		const { data, error } = await supabase
			.from('properties')
			.select(`
				id,
				price,
				address,
				city,
				country,
				district,
				beds,
				baths,
				area,
				property_type,
				transaction_type,
				url_slug_id,
				lat,
				lng,
				description,
				status,
				property_images(
					id,
					image_url,
					display_order,
					is_featured
				)
			`)
			.eq('city', city)
			.neq('id', excludeId)
			.eq('status', 'active')
			.limit(3);

		if (error || !data) {
			return [];
		}

		return data.map((property: any) => {
			const images = (property.property_images || [])
				.sort((a: any, b: any) => a.display_order - b.display_order)
				.map((img: any) => ({
					id: img.id,
					image_url: img.image_url,
					display_order: img.display_order,
					is_featured: img.is_featured,
				}));

			return {
				id: property.id,
				price: property.price,
				address: property.address,
				city: property.city,
				country: property.country,
				district: property.district,
				beds: property.beds,
				baths: property.baths,
				area: property.area,
				property_type: property.property_type,
				transaction_type: property.transaction_type || 'buy',
				url_slug_id: property.url_slug_id,
				lat: property.lat,
				lng: property.lng,
				description: property.description,
				imageUrl: images[0]?.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
				images: images,
			};
		});
	} catch (error) {
		console.error('Failed to fetch similar properties:', error);
		return [];
	}
}

// Generate static params for popular properties (optional - enables ISR)
export async function generateStaticParams() {
	// This is optional and can be implemented later
	// For now, all property pages will be dynamically generated
	// To enable static generation, uncomment and implement:
	/*
	const properties = await fetch top 100 properties
	return properties.flatMap(property => 
		locales.map(lang => ({
			lang,
			transaction: getTransactionSlug(property.transaction_type, lang),
			district: normalizeSlug(property.district),
			city: normalizeSlug(property.city),
			category: getCategorySlug(property.property_type, lang),
			id: property.url_slug_id || property.id,
		}))
	);
	*/
	return []; // Return empty for now - all pages dynamically generated
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: {
	params: Promise<{
		lang: Locale;
		transaction: string;
		district: string;
		city: string;
		category: string;
		id: string;
	}>;
}): Promise<Metadata> {
	const { lang, transaction, district, city, category, id } = await params;
	
	const property = await getProperty(id);
	
	if (!property) {
		return {
			title: 'Property Not Found',
		};
	}

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';
	const currentUrl = `${baseUrl}/${lang}/${transaction}/${district}/${city}/${category}/${id}`;
	
	// Generate alternate language URLs
	const alternateLanguages: Record<string, string> = {};
	locales.forEach((locale) => {
		const localizedUrl = generatePropertyUrl(property, locale);
		alternateLanguages[locale] = `${baseUrl}${localizedUrl}`;
	});

	const title = `${property.property_type} in ${property.city}, ${property.district || property.country} - ${property.transaction_type === 'rent' ? 'For Rent' : 'For Sale'}`;
	const description = property.description || `${property.beds} bedroom, ${property.baths} bathroom ${property.property_type.toLowerCase()} in ${property.city}. ${property.area} sqft. Price: €${property.price.toLocaleString()}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: currentUrl,
			siteName: 'Toplix Real Estate',
			images: [
				{
					url: property.imageUrl,
					width: 1200,
					height: 630,
					alt: property.address,
				},
			],
			locale: lang,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [property.imageUrl],
		},
		alternates: {
			canonical: currentUrl,
			languages: alternateLanguages,
		},
	};
}

// Server Component - data fetched before render
export default async function PropertyPage({
	params,
}: {
	params: Promise<{
		lang: Locale;
		transaction: string;
		district: string;
		city: string;
		category: string;
		id: string;
	}>;
}) {
	const { lang, transaction, district, city, category, id } = await params;
	
	// Fetch property
	const property = await getProperty(id);

	// Show 404 if property not found
	if (!property) {
		notFound();
	}

	// Validate URL segments match property data (SEO best practice)
	const expectedUrl = generatePropertyUrl(property, lang);
	const currentPath = `/${lang}/${transaction}/${district}/${city}/${category}/${id}`;
	
	// If URL doesn't match, redirect to canonical URL
	if (expectedUrl !== currentPath) {
		console.log('URL mismatch, redirecting to canonical:', expectedUrl);
		redirect(expectedUrl);
	}

	// Fetch similar properties
	const similarProperties = await getSimilarProperties(property.city, id);

	return (
		<PropertyPageClient 
			property={property} 
			similarProperties={similarProperties}
			propertyFeatures={propertyFeatures}
		/>
	);
}

