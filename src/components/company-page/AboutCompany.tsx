"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Eye, Heart, Award } from "lucide-react";

interface AboutCompanyProps {
	company: {
		name: string;
		description: string;
		founded_year: number;
		stats: {
			yearsInBusiness: number;
		};
	};
}

export function AboutCompany({ company }: AboutCompanyProps) {
	return (
		<section id="about" className="py-16 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left: Image/Stats */}
					<div className="relative">
						<div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
								alt="Our Office"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
							<div className="text-5xl font-bold mb-2">{company.stats.yearsInBusiness}+</div>
							<div className="text-lg">Years of Excellence</div>
						</div>
					</div>

					{/* Right: Content */}
					<div>
						<div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
							<Building2 className="h-8 w-8 text-blue-600" />
						</div>
						<h2 className="text-4xl font-bold text-gray-900 mb-6">About {company.name}</h2>
						<div className="prose prose-lg text-gray-600 mb-8">
							<p className="mb-4">{company.description}</p>
							<p>
								Founded in {company.founded_year}, we have established ourselves as a trusted name in the real estate industry.
								Our commitment to excellence, integrity, and personalized service has made us the preferred choice for buyers, sellers, and investors alike.
							</p>
						</div>

						{/* Mission, Vision, Values */}
						<div className="space-y-4">
							<Card className="border-l-4 border-l-blue-600">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<Target className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-bold text-lg mb-2">Our Mission</h3>
											<p className="text-gray-600">
												To help our clients achieve their real estate dreams by providing exceptional service, expert guidance, and unparalleled market knowledge.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="border-l-4 border-l-purple-600">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<Eye className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-bold text-lg mb-2">Our Vision</h3>
											<p className="text-gray-600">
												To be the most trusted and innovative real estate company, setting new standards in customer satisfaction and property excellence.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="border-l-4 border-l-green-600">
								<CardContent className="p-6">
									<div className="flex items-start gap-4">
										<Heart className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
										<div>
											<h3 className="font-bold text-lg mb-2">Our Values</h3>
											<p className="text-gray-600">
												Integrity, Excellence, Innovation, and Client-First approach in everything we do.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Awards/Certifications */}
						<div className="mt-8 p-6 bg-gray-50 rounded-xl">
							<div className="flex items-center gap-3 mb-4">
								<Award className="h-6 w-6 text-yellow-600" />
								<h3 className="font-bold text-lg">Awards & Recognition</h3>
							</div>
							<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
								<div>✓ Top Real Estate Agency {new Date().getFullYear()}</div>
								<div>✓ Best Customer Service Award</div>
								<div>✓ Industry Excellence Award</div>
								<div>✓ Certified Real Estate Professionals</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

