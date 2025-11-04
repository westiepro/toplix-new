import { Navbar } from "@/components/Navbar";
import { PropertyPageClient } from "@/components/PropertyPageClient";
import { notFound, redirect } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import type { Locale } from "@/lib/i18n-config";
import { locales } from "@/lib/i18n-config";
import { getHousesApartmentsSlug } from "@/lib/url-translations";
import { generatePropertyUrl } from "@/lib/generate-property-url";
import type { Metadata } from "next";
import type { Property } from "@/lib/api";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const propertyFeatures = [
	"Marina Views", "Large Terrace", "Underground Parking", "Storage Room",
	"Air Conditioning", "Double Glazing", "Lift Access", "Front Line Location",
	"Concierge 24h", "Communal Pool", "Wine Fridge", "Underfloor Heating",
	"Security System", "Fiber Internet",
];

async function getProperty(id: string): Promise<Property | null> {
	if (!supabaseUrl || !supabaseKey) return null;

	const supabase = createClient(supabaseUrl, supabaseKey);

	// Try to find by url_slug_id first (numeric), then by UUID id
	let query = supabase
		.from('properties')
		.select(`
			id, price, address, city, country, district, beds, baths, area,
			property_type, transaction_type, url_slug_id, lat, lng, description, status,
			property_images(id, image_url, display_order, is_featured)
		`)
		.eq('status', 'active');

	// If id is numeric (url_slug_id), query by that field
	// Otherwise, query by UUID id field
	if (/^\d+$/.test(id)) {
		query = query.eq('url_slug_id', id);
	} else {
		query = query.eq('id', id);
	}

	const { data: property, error } = await query.single();

	if (error || !property) return null;

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
		images,
	};
}

async function getSimilarProperties(city: string, excludeId: string): Promise<Property[]> {
	if (!supabaseUrl || !supabaseKey) return [];

	const supabase = createClient(supabaseUrl, supabaseKey);

	const { data, error } = await supabase
		.from('properties')
		.select(`
			id, price, address, city, country, district, beds, baths, area,
			property_type, transaction_type, url_slug_id, lat, lng, description, status,
			property_images(id, image_url, display_order, is_featured)
		`)
		.eq('city', city)
		.neq('id', excludeId)
		.eq('status', 'active')
		.limit(3);

	if (error || !data) return [];

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
			images,
		};
	});
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{
		lang: Locale;
		transaction: string;
		city: string;
		housesApartments: string;
		id: string;
	}>;
}): Promise<Metadata> {
	const { lang, id } = await params;
	const property = await getProperty(id);
	
	if (!property) return { title: 'Property Not Found' };

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';
	const currentUrl = generatePropertyUrl(property, lang);
	
	const alternateLanguages: Record<string, string> = {};
	locales.forEach((locale) => {
		alternateLanguages[locale] = `${baseUrl}${generatePropertyUrl(property, locale)}`;
	});

	const title = `${property.property_type || 'Property'} in ${property.city} - ${property.transaction_type === 'rent' ? 'For Rent' : 'For Sale'}`;
	const description = property.description || `${property.beds} bedroom, ${property.baths} bathroom ${property.property_type?.toLowerCase() || 'property'} in ${property.city}. ${property.area} sqft. Price: €${property.price.toLocaleString()}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${baseUrl}${currentUrl}`,
			siteName: 'Toplix Real Estate',
			images: [{ url: property.imageUrl, width: 1200, height: 630, alt: property.address }],
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
			canonical: `${baseUrl}${currentUrl}`,
			languages: alternateLanguages,
		},
	};
}

export default async function PropertyPage({
	params,
}: {
	params: Promise<{
		lang: Locale;
		transaction: string;
		city: string;
		housesApartments: string;
		id: string;
	}>;
}) {
	const { lang, transaction, city, housesApartments, id } = await params;
	
	const property = await getProperty(id);

	if (!property) {
		notFound();
	}

	// Validate URL segments match property data
	const expectedUrl = generatePropertyUrl(property, lang);
	const currentPath = `/${lang}/${transaction}/${city}/${housesApartments}/${id}`;
	
	if (expectedUrl !== currentPath) {
		console.log('URL mismatch, redirecting to canonical:', expectedUrl);
		redirect(expectedUrl);
	}

	const similarProperties = await getSimilarProperties(property.city, id);

	return (
		<PropertyPageClient 
			property={property} 
			similarProperties={similarProperties}
			propertyFeatures={propertyFeatures}
		/>
	);
}

