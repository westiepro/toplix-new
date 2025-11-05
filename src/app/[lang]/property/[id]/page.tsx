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
import { generatePropertyUrl } from "@/lib/generate-property-url";
import type { Locale } from "@/lib/i18n-config";

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
				beds,
				baths,
				area,
				property_type,
				lat,
				lng,
				description,
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
			.eq('id', id)
			.single();

		if (error || !property) {
			console.error('Error fetching property:', error);
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

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
	const R = 6371; // Earth's radius in kilometers
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = 
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

// Fetch similar properties within 20km radius
async function getSimilarProperties(lat: number, lng: number, excludeId: string): Promise<Property[]> {
	try {
		if (!supabaseUrl || !supabaseKey) {
			return [];
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		// Fetch all active properties (excluding current one)
		const { data, error } = await supabase
			.from('properties')
			.select(`
				id,
				price,
				address,
				city,
				country,
				beds,
				baths,
				area,
				property_type,
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
			.neq('id', excludeId)
			.eq('status', 'active')
			.not('lat', 'is', null)
			.not('lng', 'is', null);

		if (error || !data) {
			console.error('Error fetching properties:', error);
			return [];
		}

		// Calculate distance for each property and filter by 20km radius
		const propertiesWithDistance = data
			.map((property: any) => {
				const distance = calculateDistance(lat, lng, property.lat, property.lng);
				return { property, distance };
			})
			.filter(({ distance }) => distance <= 20) // Within 20km
			.sort((a, b) => a.distance - b.distance) // Sort by distance (closest first)
			.slice(0, 3); // Take top 3 closest

		return propertiesWithDistance.map(({ property }) => {
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
	params: Promise<{ id: string; lang: string }>;
}) {
	const { id, lang } = await params;
	
	// Fetch property
	const property = await getProperty(id);

	// Show 404 if property not found
	if (!property) {
		notFound();
	}

	// Redirect to new localized URL structure
	const newUrl = generatePropertyUrl(property, lang as Locale);
	redirect(newUrl);

	// Fetch similar properties within 20km radius
	const similarProperties = await getSimilarProperties(property.lat, property.lng, id);

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
									<p className="text-xs font-medium text-purple-700 mb-1">Bedrooms</p>
									<p className="text-lg font-bold text-gray-900">{property.beds}</p>
								</div>
							</div>
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<Bath className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-emerald-700 mb-1">Bathrooms</p>
									<p className="text-lg font-bold text-gray-900">{property.baths}</p>
								</div>
							</div>
							<div className="group relative flex items-center gap-4 p-5 bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
								<div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
									<Maximize className="h-6 w-6 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-amber-700 mb-1">Area</p>
									<p className="text-lg font-bold text-gray-900">{property.area} m²</p>
								</div>
							</div>
						</div>
						</div>

						{/* About This Property */}
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
							<div className="text-gray-700 leading-relaxed space-y-3">
								<p>
									{property.description || `This stunning ${property.property_type?.toLowerCase() || "property"} offers luxurious living in the heart of ${property.city}. With ${property.beds} bedrooms and ${property.baths} bathrooms, this property combines modern design with exceptional comfort.`}
								</p>
								<p>
									The property features high-end finishes throughout, spacious living areas with abundant natural light, and a modern kitchen equipped with premium appliances. The master bedroom includes an en-suite bathroom and access to a large terrace with breathtaking views.
								</p>
								<p>
									Located in a prime area, you'll be just steps away from boutiques, restaurants, nightlife, beautiful beaches, and world-class golf courses. This property also offers excellent rental income potential.
								</p>
								<p>
									Additional amenities include 24-hour concierge service, a communal pool, landscaped gardens, underground parking, storage space, and high-quality construction throughout.
								</p>
							</div>
						</div>

						{/* Property Features */}
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{propertyFeatures.map((feature, index) => (
									<div key={index} className="flex items-center gap-2">
										<div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
											<Check className="h-3 w-3 text-green-600" />
										</div>
										<span className="text-gray-700">{feature}</span>
									</div>
								))}
							</div>
						</div>

					{/* Location */}
					<div className="bg-white rounded-lg p-6 shadow-sm">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
						<div className="h-[400px] rounded-lg overflow-hidden mb-4">
							<MapView properties={[property]} />
						</div>
						<p className="text-gray-700">
							This property is located in the heart of {property.city}, offering easy access to local amenities, beaches, and attractions.
						</p>
					</div>

					{/* Similar Properties Section - Right below the map */}
					{similarProperties.length > 0 && (
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties Nearby</h2>
							<p className="text-sm text-gray-600 mb-4">Properties within 20km of this location</p>
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

				{/* Right Column - Sidebar */}
				<div className="lg:col-span-1">
					<ContactAgentForm
						propertyId={property.id}
						propertyAddress={property.address}
					/>
				</div>
			</div>
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
