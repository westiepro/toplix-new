"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { MapView } from "@/components/MapView";
import type { Property } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import AIComparisonSlider from "@/components/AIComparisonSlider";
import { useTranslation } from "@/hooks/useTranslation";

function sample(id: string): Property | null {
	const list: Property[] = [
		{ 
			id: "1", 
			price: 350000, 
			address: "Rua da Praia 45", 
			city: "Lagos", 
			beds: 2, 
			baths: 2, 
			area: 1100, 
			lat: 37.1010, 
			lng: -8.6730, 
			imageUrl: "https://picsum.photos/seed/lagos1/800/600",
			original_image: "https://picsum.photos/seed/lagos1/800/600",
			ai_styles: [
				{ style_name: "Modern", image_url: "https://picsum.photos/seed/lagos-modern/800/600" },
				{ style_name: "Scandinavian", image_url: "https://picsum.photos/seed/lagos-scandi/800/600" },
				{ style_name: "Minimalist", image_url: "https://picsum.photos/seed/lagos-minimal/800/600" },
			]
		},
		{ 
			id: "2", 
			price: 485000, 
			address: "Avenida da República 120", 
			city: "Faro", 
			beds: 3, 
			baths: 2, 
			area: 1500, 
			lat: 37.0194, 
			lng: -7.9322, 
			imageUrl: "https://picsum.photos/seed/faro1/800/600",
			original_image: "https://picsum.photos/seed/faro1/800/600",
			ai_styles: [
				{ style_name: "Modern", image_url: "https://picsum.photos/seed/faro-modern/800/600" },
				{ style_name: "Boho", image_url: "https://picsum.photos/seed/faro-boho/800/600" },
			]
		},
		{ 
			id: "3", 
			price: 620000, 
			address: "Praia da Falésia", 
			city: "Albufeira", 
			beds: 4, 
			baths: 3, 
			area: 2200, 
			lat: 37.0894, 
			lng: -8.2500, 
			imageUrl: "https://picsum.photos/seed/albufeira1/800/600",
			original_image: "https://picsum.photos/seed/albufeira1/800/600",
			ai_styles: [
				{ style_name: "Modern", image_url: "https://picsum.photos/seed/albufeira-modern/800/600" },
				{ style_name: "Scandinavian", image_url: "https://picsum.photos/seed/albufeira-scandi/800/600" },
				{ style_name: "Minimalist", image_url: "https://picsum.photos/seed/albufeira-minimal/800/600" },
			]
		},
		{ 
			id: "4", 
			price: 275000, 
			address: "Rua 5 de Outubro 78", 
			city: "Tavira", 
			beds: 2, 
			baths: 1, 
			area: 950, 
			lat: 37.1264, 
			lng: -7.6485, 
			imageUrl: "https://picsum.photos/seed/tavira1/800/600",
			original_image: "https://picsum.photos/seed/tavira1/800/600",
			ai_styles: [
				{ style_name: "Modern", image_url: "https://picsum.photos/seed/tavira-modern/800/600" },
			]
		},
		{ 
			id: "5", 
			price: 890000, 
			address: "Marina de Vilamoura", 
			city: "Vilamoura", 
			beds: 5, 
			baths: 4, 
			area: 2800, 
			lat: 37.0758, 
			lng: -8.1094, 
			imageUrl: "https://picsum.photos/seed/vilamoura1/800/600",
			original_image: "https://picsum.photos/seed/vilamoura1/800/600",
			ai_styles: [
				{ style_name: "Modern", image_url: "https://picsum.photos/seed/vilamoura-modern/800/600" },
				{ style_name: "Scandinavian", image_url: "https://picsum.photos/seed/vilamoura-scandi/800/600" },
				{ style_name: "Minimalist", image_url: "https://picsum.photos/seed/vilamoura-minimal/800/600" },
				{ style_name: "Boho", image_url: "https://picsum.photos/seed/vilamoura-boho/800/600" },
			]
		},
		{ id: "6", price: 195000, address: "Rua da Igreja 12", city: "Olhão", beds: 1, baths: 1, area: 650, lat: 37.0260, lng: -7.8411, imageUrl: "https://picsum.photos/seed/olhao1/800/600" },
		{ id: "7", price: 745000, address: "Praia da Rocha", city: "Portimão", beds: 4, baths: 3, area: 2400, lat: 37.1180, lng: -8.5344, imageUrl: "https://picsum.photos/seed/portimao1/800/600" },
		{ id: "8", price: 425000, address: "Rua do Comércio 33", city: "Loulé", beds: 3, baths: 2, area: 1400, lat: 37.1378, lng: -8.0192, imageUrl: "https://picsum.photos/seed/loule1/800/600" },
		{ id: "9", price: 380000, address: "Praia do Carvoeiro", city: "Carvoeiro", beds: 3, baths: 2, area: 1300, lat: 37.0944, lng: -8.4736, imageUrl: "https://picsum.photos/seed/carvoeiro1/800/600" },
		{ id: "10", price: 950000, address: "Marina de Portimão", city: "Portimão", beds: 5, baths: 4, area: 3000, lat: 37.1265, lng: -8.5247, imageUrl: "https://picsum.photos/seed/portimao2/800/600" },
		{ id: "11", price: 320000, address: "Avenida Marginal 67", city: "Quarteira", beds: 2, baths: 2, area: 1150, lat: 37.0694, lng: -8.1006, imageUrl: "https://picsum.photos/seed/quarteira1/800/600" },
		{ id: "12", price: 555000, address: "Costa da Caparica", city: "Lagos", beds: 4, baths: 2, area: 1800, lat: 37.0919, lng: -8.6738, imageUrl: "https://picsum.photos/seed/lagos2/800/600" },
		{ id: "13", price: 225000, address: "Rua Dom Paio Peres Correia", city: "Tavira", beds: 2, baths: 1, area: 800, lat: 37.1289, lng: -7.6508, imageUrl: "https://picsum.photos/seed/tavira2/800/600" },
		{ id: "14", price: 675000, address: "Vale do Lobo", city: "Loulé", beds: 4, baths: 3, area: 2600, lat: 37.0822, lng: -8.0011, imageUrl: "https://picsum.photos/seed/loule2/800/600" },
		{ id: "15", price: 295000, address: "Rua da Liberdade 89", city: "Olhão", beds: 2, baths: 1, area: 1000, lat: 37.0283, lng: -7.8425, imageUrl: "https://picsum.photos/seed/olhao2/800/600" },
		{ id: "16", price: 825000, address: "Praia da Rocha Marina", city: "Portimão", beds: 5, baths: 4, area: 2900, lat: 37.1147, lng: -8.5356, imageUrl: "https://picsum.photos/seed/portimao3/800/600" },
		{ id: "17", price: 445000, address: "Avenida Infante Dom Henrique", city: "Faro", beds: 3, baths: 2, area: 1600, lat: 37.0161, lng: -7.9350, imageUrl: "https://picsum.photos/seed/faro2/800/600" },
		{ id: "18", price: 365000, address: "Rua das Flores 23", city: "Lagos", beds: 3, baths: 2, area: 1250, lat: 37.0989, lng: -8.6756, imageUrl: "https://picsum.photos/seed/lagos3/800/600" },
		{ id: "19", price: 595000, address: "Pinhal do Concelho", city: "Albufeira", beds: 4, baths: 3, area: 2000, lat: 37.0956, lng: -8.2456, imageUrl: "https://picsum.photos/seed/albufeira2/800/600" },
		{ id: "20", price: 515000, address: "Sagres Point", city: "Vila do Bispo", beds: 3, baths: 3, area: 1700, lat: 37.0084, lng: -8.9431, imageUrl: "https://picsum.photos/seed/sagres1/800/600" },
	];
	return list.find((p) => p.id === id) ?? null;
}

export default function PropertyPage() {
	const { t } = useTranslation();
	const params = useParams<{ id: string }>();
	const property = useMemo(() => sample(params.id), [params.id]);
	
	if (!property) {
		return (
			<main className="min-h-screen">
				<Navbar />
				<section className="mx-auto max-w-6xl p-4">
					<div className="flex items-center justify-center h-96">
						<p className="text-xl text-muted-foreground">{t("propertyDetail.notFound")}</p>
					</div>
				</section>
			</main>
		);
	}
	
	return (
		<main className="min-h-screen">
			<Navbar />
			<section className="mx-auto max-w-6xl p-4">
				<div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
					<Image src={property.imageUrl} alt={property.address} fill className="object-cover" />
				</div>
				<div className="mt-4 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-semibold">${(property.price).toLocaleString()}</h1>
						<p className="text-muted-foreground">{property.address}, {property.city}</p>
						<p className="text-sm">
							{property.beds} {t("propertyDetail.bd")} · {property.baths} {t("propertyDetail.ba")} · {property.area} {t("propertyDetail.sqft")}
						</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" className="gap-2">
							<Heart className="h-4 w-4" /> {t("propertyDetail.favorite")}
						</Button>
						<Button variant="outline" className="gap-2">
							<Share2 className="h-4 w-4" /> {t("propertyDetail.share")}
						</Button>
					</div>
				</div>
				{/* AI Comparison Slider */}
				{property.original_image && property.ai_styles && property.ai_styles.length > 0 && (
					<AIComparisonSlider 
						original={property.original_image} 
						styles={property.ai_styles} 
					/>
				)}
				
				<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<h2 className="mb-2 text-lg font-medium">{t("propertyDetail.description")}</h2>
						<p className="text-sm text-muted-foreground">
							{property.description || t("propertyDetail.defaultDescription")}
						</p>
					</div>
					<div className="h-[320px] overflow-hidden rounded-md">
						<MapView properties={[property]} />
					</div>
				</div>
			</section>
		</main>
	);
}


