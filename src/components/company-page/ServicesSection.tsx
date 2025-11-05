"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Home, TrendingUp, Key, FileText, Calculator, Users, Briefcase, Globe } from "lucide-react";

export function ServicesSection() {
	const services = [
		{
			icon: Home,
			title: "Buying Assistance",
			description: "Expert guidance through every step of your property purchase journey",
			color: "blue",
		},
		{
			icon: TrendingUp,
			title: "Selling Services",
			description: "Professional marketing and negotiation to get the best price for your property",
			color: "green",
		},
		{
			icon: Key,
			title: "Rental Management",
			description: "Complete property management solutions for landlords and tenants",
			color: "purple",
		},
		{
			icon: Briefcase,
			title: "Investment Consulting",
			description: "Strategic advice for real estate investment and portfolio growth",
			color: "orange",
		},
		{
			icon: Calculator,
			title: "Property Valuation",
			description: "Accurate market valuations using advanced analytics and local expertise",
			color: "teal",
		},
		{
			icon: FileText,
			title: "Legal Support",
			description: "Assistance with contracts, documentation, and legal procedures",
			color: "indigo",
		},
		{
			icon: Users,
			title: "Relocation Services",
			description: "Comprehensive support for international buyers and relocating families",
			color: "pink",
		},
		{
			icon: Globe,
			title: "International Sales",
			description: "Multilingual service for clients from around the world",
			color: "cyan",
		},
	];

	const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
		blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
		green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
		purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
		orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
		teal: { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-200" },
		indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-200" },
		pink: { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200" },
		cyan: { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-200" },
	};

	return (
		<section className="py-16 bg-gray-50">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
						<Briefcase className="h-8 w-8 text-orange-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Comprehensive real estate solutions tailored to your needs
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{services.map((service, index) => {
						const colors = colorClasses[service.color];
						const Icon = service.icon;
						
						return (
							<Card 
								key={index} 
								className={`border-2 ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
							>
								<CardContent className="p-6">
									<div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
										<Icon className={`h-7 w-7 ${colors.icon}`} />
									</div>
									<h3 className="font-bold text-lg mb-2 text-gray-900">{service.title}</h3>
									<p className="text-sm text-gray-600">{service.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* How We Work */}
				<div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
					<h3 className="text-3xl font-bold mb-8 text-center">How We Work</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
								1
							</div>
							<h4 className="font-semibold mb-2">Consultation</h4>
							<p className="text-sm text-blue-100">Understand your needs and preferences</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
								2
							</div>
							<h4 className="font-semibold mb-2">Property Search</h4>
							<p className="text-sm text-blue-100">Find the perfect match from our portfolio</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
								3
							</div>
							<h4 className="font-semibold mb-2">Viewing & Negotiation</h4>
							<p className="text-sm text-blue-100">Schedule visits and secure the best deal</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
								4
							</div>
							<h4 className="font-semibold mb-2">Closing</h4>
							<p className="text-sm text-blue-100">Handle all paperwork and finalize the transaction</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

