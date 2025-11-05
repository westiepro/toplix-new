"use client";

import { Button } from "@/components/ui/button";
import { Building2, Phone, Mail, Star, TrendingUp, Users, Home } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
	company: {
		name: string;
		tagline: string;
		logo_url?: string;
		hero_image_url?: string;
		stats: {
			yearsInBusiness: number;
			propertiesSold: number;
			happyClients: number;
			activeListings: number;
			rating: number;
		};
	};
}

export function HeroSection({ company }: HeroSectionProps) {
	const heroImage = company.hero_image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80";

	return (
		<section className="relative h-[600px] flex items-center justify-center overflow-hidden">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0 z-0">
				<Image
					src={heroImage}
					alt={company.name}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
				{/* Logo */}
				{company.logo_url && (
					<div className="mb-6 flex justify-center">
						<div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full bg-white p-4 shadow-2xl">
							<Image
								src={company.logo_url}
								alt={`${company.name} Logo`}
								fill
								className="object-contain p-2"
							/>
						</div>
					</div>
				)}

				{/* Company Name */}
				<h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
					{company.name}
				</h1>

				{/* Tagline */}
				<p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
					{company.tagline}
				</p>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
					<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
						<div className="text-3xl font-bold mb-1">{company.stats.yearsInBusiness}+</div>
						<div className="text-sm text-blue-100">Years in Business</div>
					</div>
					<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
						<div className="text-3xl font-bold mb-1">{company.stats.propertiesSold}+</div>
						<div className="text-sm text-blue-100">Properties Sold</div>
					</div>
					<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
						<div className="text-3xl font-bold mb-1">{company.stats.happyClients}+</div>
						<div className="text-sm text-blue-100">Happy Clients</div>
					</div>
					<div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
						<div className="flex items-center justify-center gap-1 text-3xl font-bold mb-1">
							{company.stats.rating}
							<Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
						</div>
						<div className="text-sm text-blue-100">Average Rating</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-6"
						onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
					>
						<Home className="h-5 w-5 mr-2" />
						View Our Properties
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
						onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
					>
						<Phone className="h-5 w-5 mr-2" />
						Contact Us
					</Button>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
					<div className="w-1 h-3 bg-white rounded-full mt-2"></div>
				</div>
			</div>
		</section>
	);
}

