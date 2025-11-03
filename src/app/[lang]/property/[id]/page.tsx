import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import type { Property } from "@/components/PropertyCard";
import { Bed, Bath, Maximize, MapPin, Check } from "lucide-react";
import { PropertyImageGallery } from "@/components/PropertyImageGallery";
import { ContactAgentForm } from "@/components/ContactAgentForm";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyPageClient } from "@/components/PropertyPageClient";
import { notFound } from "next/navigation";

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

// Fetch property data on the server
async function getProperty(id: string): Promise<Property | null> {
	try {
		// Use absolute URL for production, relative for local
		const baseUrl = process.env.VERCEL_URL 
			? `https://${process.env.VERCEL_URL}` 
			: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
		
		const response = await fetch(`${baseUrl}/api/properties/${id}`, {
			cache: 'no-store', // Always get fresh data
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		if (!response.ok) {
			console.error(`Failed to fetch property ${id}: ${response.status} ${response.statusText}`);
			return null;
		}
		
		const data = await response.json();
		return data.property;
	} catch (error) {
		console.error('Failed to fetch property:', error);
		return null;
	}
}

// Fetch similar properties on the server
async function getSimilarProperties(city: string, excludeId: string): Promise<Property[]> {
	try {
		// Use absolute URL for production, relative for local
		const baseUrl = process.env.VERCEL_URL 
			? `https://${process.env.VERCEL_URL}` 
			: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
		
		const response = await fetch(`${baseUrl}/api/properties?city=${encodeURIComponent(city)}`, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		
		if (!response.ok) {
			console.error(`Failed to fetch similar properties: ${response.status}`);
			return [];
		}
		
		const data = await response.json();
		return (data.properties || [])
			.filter((p: Property) => p.id !== excludeId)
			.slice(0, 3);
	} catch (error) {
		console.error('Failed to fetch similar properties:', error);
		return [];
	}
}

// Server Component - data fetched before render
export default async function PropertyPage({
	params,
}: {
	params: Promise<{ id: string; lang: string }>;
}) {
	const { id } = await params;
	
	// Fetch property and similar properties in parallel for maximum speed
	const [property, similarProperties] = await Promise.all([
		getProperty(id),
		getProperty(id).then(prop => 
			prop ? getSimilarProperties(prop.city, id) : []
		),
	]);

	// Show 404 if property not found
	if (!property) {
		notFound();
	}

	// Use images from API or fallback to imageUrl
	const propertyImages = property.images && property.images.length > 0 
		? property.images.map(img => typeof img === 'string' ? img : img.image_url)
		: [property.imageUrl];
	
	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
		
		{/* Main Content Container */}
		<div className="mx-auto max-w-[1440px] px-4 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Image Gallery */}
						<PropertyImageGallery images={propertyImages} />

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
