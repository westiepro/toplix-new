"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock, Globe, TrendingUp, Heart, Headphones } from "lucide-react";

interface WhyChooseUsProps {
	stats: {
		yearsInBusiness: number;
		rating: number;
	};
	companyName: string;
}

export function WhyChooseUs({ stats, companyName }: WhyChooseUsProps) {
	const reasons = [
		{
			icon: Award,
			title: `${stats.yearsInBusiness}+ Years Experience`,
			description: "Decades of expertise in the Portuguese real estate market",
			color: "blue",
		},
		{
			icon: Users,
			title: "Multilingual Team",
			description: "Fluent in English, Portuguese, French, Spanish, and German",
			color: "purple",
		},
		{
			icon: Shield,
			title: "Verified Properties",
			description: "All listings thoroughly checked and legally compliant",
			color: "green",
		},
		{
			icon: Globe,
			title: "International Network",
			description: "Global connections to serve buyers from around the world",
			color: "teal",
		},
		{
			icon: TrendingUp,
			title: "Market Leaders",
			description: "Top-performing agency with proven track record",
			color: "orange",
		},
		{
			icon: Headphones,
			title: "24/7 Support",
			description: "Always available to answer your questions and concerns",
			color: "pink",
		},
		{
			icon: Heart,
			title: "Client-First Approach",
			description: "Your satisfaction is our top priority, every time",
			color: "red",
		},
		{
			icon: Clock,
			title: "Fast Response Time",
			description: "Average response within 2 hours during business days",
			color: "indigo",
		},
	];

	const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
		blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200" },
		purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200" },
		green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-200" },
		teal: { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-200" },
		orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-200" },
		pink: { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-200" },
		red: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200" },
		indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-200" },
	};

	return (
		<section className="py-16 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose {companyName}?</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						We go above and beyond to deliver exceptional real estate experiences
					</p>
				</div>

				{/* Reasons Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{reasons.map((reason, index) => {
						const colors = colorClasses[reason.color];
						const Icon = reason.icon;

						return (
							<Card 
								key={index}
								className={`border ${colors.border} hover:shadow-lg transition-shadow`}
							>
								<CardContent className="p-6 text-center">
									<div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
										<Icon className={`h-8 w-8 ${colors.icon}`} />
									</div>
									<h3 className="font-bold text-lg mb-2 text-gray-900">{reason.title}</h3>
									<p className="text-sm text-gray-600">{reason.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Trust Badges */}
				<div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
					<h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Trusted & Certified</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
								<Award className="h-10 w-10 text-yellow-600" />
							</div>
							<p className="text-sm font-medium">ISO Certified</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
								<Shield className="h-10 w-10 text-blue-600" />
							</div>
							<p className="text-sm font-medium">Licensed Agency</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
								<Users className="h-10 w-10 text-purple-600" />
							</div>
							<p className="text-sm font-medium">Professional Team</p>
						</div>
						<div className="text-center">
							<div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mx-auto mb-3">
								<TrendingUp className="h-10 w-10 text-green-600" />
							</div>
							<p className="text-sm font-medium">Market Leader</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

