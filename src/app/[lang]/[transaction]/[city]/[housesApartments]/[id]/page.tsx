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
import { getTranslations } from "@/lib/get-translations";
import type { Locale } from "@/lib/i18n-config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Available property features (master list for admin selection)
export const AVAILABLE_FEATURES = [
	"marinaViews",
	"undergroundParking",
	"airConditioning",
	"liftAccess",
	"concierge24h",
	"wineFridge",
	"securitySystem",
	"largeTerrace",
	"storageRoom",
	"doubleGlazing",
	"frontLineLocation",
	"communalPool",
	"underfloorHeating",
	"fiberInternet",
] as const;

// Fetch property data directly from Supabase
async function getProperty(id: string): Promise<Property | null> {
	try {
		if (!supabaseUrl || !supabaseKey) {
			console.error('Supabase not configured');
			return null;
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		// Fetch property with all images
		// Try to fetch by url_slug_id first, then by UUID
		let propertyQuery = supabase
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
				features,
				status,
				property_images(
					id,
					image_url,
					display_order,
					is_featured,
					style_name,
					is_original,
					image_category
				)
			`)
			.eq('status', 'active');

		// Check if id is a number (url_slug_id) or UUID
		if (/^\d+$/.test(id)) {
			// It's a url_slug_id
			propertyQuery = propertyQuery.eq('url_slug_id', id);
		} else {
			// It's a UUID
			propertyQuery = propertyQuery.eq('id', id);
		}

		const { data: property, error } = await propertyQuery.single();

		if (error || !property) {
			console.error('Error fetching property:', { error, id, isNumeric: /^\d+$/.test(id) });
			return null;
		}

		// Sort and organize images
		const allImages = (property.property_images || [])
			.sort((a: any, b: any) => a.display_order - b.display_order);
		
		const galleryImages = allImages
			.filter((img: any) => img.image_category === 'gallery' || !img.image_category)
			.map((img: any) => ({
				id: img.id,
				image_url: img.image_url,
				display_order: img.display_order,
				is_featured: img.is_featured,
				style_name: img.style_name,
				is_original: img.is_original,
				image_category: img.image_category,
			}));
		
		const originalImage = allImages.find((img: any) => img.is_original || img.image_category === 'original');
		
		const aiStyledImages = allImages
			.filter((img: any) => img.image_category === 'ai_styled' && img.style_name)
			.map((img: any) => ({
				style_name: img.style_name,
				image_url: img.image_url,
			}));

		// Transform to match Property type
		return {
			id: property.id,
			price: property.price,
			address: property.address,
			city: property.city,
			country: property.country,
			beds: property.beds,
			baths: property.baths,
			area: property.area,
			property_type: property.property_type,
			lat: property.lat,
			lng: property.lng,
			description: property.description,
			imageUrl: galleryImages[0]?.image_url || allImages[0]?.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
			images: galleryImages,
			originalImage: originalImage?.image_url,
			aiStyledImages: aiStyledImages,
		};
	} catch (error) {
		console.error('Failed to fetch property:', error);
		return null;
	}
}

// Fetch similar properties directly from Supabase
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
				beds: property.beds,
				baths: property.baths,
				area: property.area,
				property_type: property.property_type,
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

// Server Component  
export default async function PropertyPage({
	params,
}: {
	params: Promise<{
		lang: string;
		transaction: string;
		city: string;
		housesApartments: string;
		id: string;
	}>;
}) {
	const { id, lang, transaction, city, housesApartments } = await params;
	
	// Fetch translations for server-side rendering
	const translations = await getTranslations(lang as Locale);
	const t = (key: string) => translations[key] || key;
	
	// Fetch property
	const property = await getProperty(id);

	// Show 404 if property not found
	if (!property) {
		notFound();
	}

	// Fetch property description translation for current language (server-side)
	let displayDescription = property.description;
	
	if (lang !== 'en') {
		try {
			const supabase = createClient(supabaseUrl, supabaseKey);
			const { data: translation } = await supabase
				.from("property_translations")
				.select("description")
				.eq("property_id", property.id)
				.eq("language_code", lang)
				.single();
			
			if (translation?.description) {
				displayDescription = translation.description;
			}
		} catch (error) {
			console.warn("Failed to fetch property translation:", error);
			// Fall back to original description
		}
	}

	// Validate URL segments match property data (optional - can be disabled for flexibility)
	// Uncomment to enable strict URL validation:
	/*
	const expectedUrl = generatePropertyUrl(property, lang as any);
	const currentPath = `/${lang}/${transaction}/${city}/${housesApartments}/${id}`;
	if (expectedUrl !== currentPath) {
		redirect(expectedUrl);
	}
	*/

	// Fetch similar properties
	const similarProperties = await getSimilarProperties(property.city, id);

	// Use images from API or fallback to imageUrl
	const propertyImages = property.images && property.images.length > 0 
		? property.images.map(img => typeof img === 'string' ? img : img.image_url)
		: [property.imageUrl];
	
	return (
		<main className="min-h-screen bg-gray-50" suppressHydrationWarning>
			<Navbar />
		
		{/* Main Content Container */}
		<div className="mx-auto max-w-[1440px] px-4 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Image Gallery with AI Decoration */}
						<PropertyImageGallery 
							images={propertyImages}
							propertyId={property.id}
							propertyAddress={property.address}
							originalImage={property.originalImage}
							aiStyledImages={property.aiStyledImages}
						/>

						{/* Property Overview */}
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<div className="flex items-start justify-between mb-4">
								<div>
									<h1 className="text-4xl font-bold text-gray-900 mb-2">
										€{property.price.toLocaleString()}
									</h1>
									<h2 className="text-2xl font-semibold text-gray-800 mb-1">
										{property.property_type || "Marina Apartment"} in {property.city}
									</h2>
									<p className="text-gray-600 flex items-center gap-1">
										<MapPin className="h-4 w-4" />
										{property.city}, {property.country || "Portugal"}
									</p>
								</div>
								
								{/* Client-side interactive buttons */}
								<PropertyPageClient property={property} />
							</div>

						{/* Key Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<rect x="3" y="3" width="7" height="7" rx="1"/>
										<rect x="14" y="3" width="7" height="7" rx="1"/>
										<rect x="14" y="14" width="7" height="7" rx="1"/>
										<rect x="3" y="14" width="7" height="7" rx="1"/>
									</svg>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-blue-700 mb-1">Country</p>
									<p className="text-lg font-bold text-gray-900 truncate">{property.country || "Portugal"}</p>
								</div>
							</div>
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<Bed className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-purple-700 mb-1">{t("propertyDetail.bedrooms")}</p>
									<p className="text-lg font-bold text-gray-900">{property.beds}</p>
								</div>
							</div>
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<Bath className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-emerald-700 mb-1">{t("propertyDetail.bathrooms")}</p>
									<p className="text-lg font-bold text-gray-900">{property.baths}</p>
								</div>
							</div>
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<Maximize className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-amber-700 mb-1">{t("propertyDetail.area")}</p>
									<p className="text-lg font-bold text-gray-900">{property.area} m²</p>
								</div>
							</div>
						</div>
						</div>

						{/* About This Property */}
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">{t("propertyDetail.aboutThisProperty")}</h2>
							<div className="text-gray-700 leading-relaxed space-y-3">
								<p className="whitespace-pre-wrap">
									{displayDescription || `This stunning ${property.property_type?.toLowerCase() || "property"} offers luxurious living in the heart of ${property.city}. With ${property.beds} bedrooms and ${property.baths} bathrooms, this property combines modern design with exceptional comfort.`}
								</p>
							</div>
						</div>

						{/* Property Features */}
						{property.features && property.features.length > 0 && (
							<div className="bg-white rounded-lg p-6 shadow-sm">
								<h2 className="text-2xl font-bold text-gray-900 mb-4">{t("propertyDetail.propertyFeatures")}</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{property.features.map((featureKey, index) => (
										<div key={index} className="flex items-center gap-2">
											<div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
												<Check className="h-3 w-3 text-green-600" />
											</div>
											<span className="text-gray-700">
												{t(`propertyDetail.${featureKey}`) !== `propertyDetail.${featureKey}` 
													? t(`propertyDetail.${featureKey}`)
													: featureKey}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Location */}
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">{t("map.location")}</h2>
							<div className="h-[400px] rounded-lg overflow-hidden">
								<MapView properties={[property]} />
							</div>
						</div>
					</div>

					{/* Right Column - Sidebar */}
					<div className="lg:col-span-1">
						<ContactAgentForm
							propertyId={property.id}
							propertyAddress={property.address}
						/>
					</div>
				</div>

				{/* Similar Properties Section */}
				{similarProperties.length > 0 && (
					<div className="mt-12">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties in the Area</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{similarProperties.map((similarProperty) => (
								<PropertyCard
									key={similarProperty.id}
									property={similarProperty}
									source="similar_properties"
								/>
							))}
						</div>
					</div>
				)}
			</div>

		{/* Footer */}
		<footer className="bg-white border-t mt-16">
			<div className="max-w-[1440px] mx-auto px-4 py-6 text-center text-gray-600 text-sm">
				© 2024 Toplix. All rights reserved.
			</div>
		</footer>
		</main>
	);
}
