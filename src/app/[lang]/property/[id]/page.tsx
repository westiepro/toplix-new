"use client";

import { useMemo, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import type { Property } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bed, Bath, Maximize, MapPin, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { trackPropertyView, trackPropertyShare } from "@/lib/analytics-events";
import { PropertyImageGallery } from "@/components/PropertyImageGallery";
import { ContactAgentForm } from "@/components/ContactAgentForm";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { useShare } from "@/hooks/useShare";
import { ShareModal } from "@/components/ShareModal";
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function PropertyPage() {
	const { t } = useTranslation();
	const { currentLanguage } = useLanguage();
	const params = useParams<{ id: string }>();
	const [property, setProperty] = useState<Property | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
	
	// Fetch property from API
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				const response = await fetch(`/api/properties/${params.id}`);
				if (response.ok) {
					const data = await response.json();
					setProperty(data.property);
				} else {
					setProperty(null);
				}
			} catch (error) {
				console.error('Failed to fetch property:', error);
				setProperty(null);
			} finally {
				setIsLoading(false);
			}
		};
		
		fetchProperty();
	}, [params.id]);

	// Fetch similar properties from API
	useEffect(() => {
		const fetchSimilar = async () => {
			if (!property) return;
			
			try {
				const response = await fetch(`/api/properties?city=${property.city}`);
				if (response.ok) {
					const data = await response.json();
					const filtered = (data.properties || [])
						.filter((p: Property) => p.id !== property.id)
						.slice(0, 3);
					setSimilarProperties(filtered);
				}
			} catch (error) {
				console.error('Failed to fetch similar properties:', error);
			}
		};
		
		fetchSimilar();
	}, [property]);
	
	// Track property view
	useEffect(() => {
		if (property) {
			trackPropertyView(
				property.id,
				property.address,
				property.price,
				property.city
			);
		}
	}, [property]);

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
		property
			? {
					id: property.id,
					address: property.address,
					city: property.city,
					price: property.price,
					country: property.country,
			  }
			: { id: "", address: "", city: "", price: 0 },
		currentLanguage,
		t
	);

	const handleFavoriteClick = () => {
		if (!property) return;
		
		if (isFavorite(property.id)) {
			removeFavorite(property.id);
			toast.success("Removed from favorites");
		} else {
			addFavorite(property.id);
			toast.success("Added to favorites");
		}
	};

	const handleShareClick = () => {
		if (property) {
			trackPropertyShare(property.id, 'link');
			handleShare();
		}
	};
	
	if (isLoading) {
		return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<section className="mx-auto max-w-[1440px] p-4">
				<div className="flex items-center justify-center h-96">
					<p className="text-xl text-muted-foreground">Loading...</p>
				</div>
			</section>
		</main>
		);
	}

	if (!property) {
		return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<section className="mx-auto max-w-[1440px] p-4">
				<div className="flex items-center justify-center h-96">
					<p className="text-xl text-muted-foreground">Property not found</p>
				</div>
			</section>
		</main>
		);
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
							<div className="flex gap-3">
								<Button
									variant="outline"
									size="icon"
									onClick={handleFavoriteClick}
									className={isFavorite(property.id) ? "text-red-500" : ""}
								>
									<Heart
										className={`h-8 w-8 ${
											isFavorite(property.id) ? "fill-current" : ""
										}`}
									/>
								</Button>
								<Button 
									variant="outline" 
									size="icon" 
									onClick={handleShareClick}
									className="transition-all duration-200 hover:scale-105 active:scale-95"
									aria-label="Share this property"
								>
									<Share2 className="h-8 w-8" />
								</Button>
							</div>
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
			</div>

		{/* Footer */}
		<footer className="bg-white border-t mt-16">
			<div className="max-w-[1440px] mx-auto px-4 py-6 text-center text-gray-600 text-sm">
				© 2024 Toplix. All rights reserved.
			</div>
		</footer>

		{/* Share Modal */}
		{property && (
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
		)}
		</main>
	);
}


