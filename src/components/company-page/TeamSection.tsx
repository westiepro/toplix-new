"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Languages, Home as HomeIcon } from "lucide-react";
import Image from "next/image";

interface Agent {
	id: string;
	name: string;
	title: string;
	email: string;
	phone?: string;
	photo_url?: string;
	languages?: string;
	specialization?: string;
	properties_count?: number;
	years_experience?: number;
}

interface TeamSectionProps {
	companyId: string;
}

export function TeamSection({ companyId }: TeamSectionProps) {
	const [agents, setAgents] = useState<Agent[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Mock data - will be replaced with real API call
		const mockAgents: Agent[] = [
			{
				id: "1",
				name: "John Silva",
				title: "Senior Real Estate Agent",
				email: "john@company.com",
				phone: "+351 912 345 678",
				photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
				languages: "English, Portuguese, Spanish",
				specialization: "Luxury Villas",
				properties_count: 45,
				years_experience: 12,
			},
			{
				id: "2",
				name: "Maria Santos",
				title: "Property Consultant",
				email: "maria@company.com",
				phone: "+351 913 456 789",
				photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
				languages: "English, Portuguese, French",
				specialization: "Apartments & Condos",
				properties_count: 38,
				years_experience: 8,
			},
			{
				id: "3",
				name: "Carlos Rodrigues",
				title: "Investment Specialist",
				email: "carlos@company.com",
				phone: "+351 914 567 890",
				photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
				languages: "English, Portuguese",
				specialization: "Commercial Properties",
				properties_count: 29,
				years_experience: 15,
			},
		];

		// Simulate API call
		setTimeout(() => {
			setAgents(mockAgents);
			setIsLoading(false);
		}, 500);
	}, [companyId]);

	return (
		<section id="team" className="py-16 bg-gray-50">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
						<Users className="h-8 w-8 text-purple-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Dedicated professionals committed to helping you find your perfect property
					</p>
				</div>

				{/* Team Grid */}
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{agents.map((agent) => (
							<Card key={agent.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
								{/* Photo */}
								<div className="relative h-72 overflow-hidden">
									<Image
										src={agent.photo_url || "/placeholder-avatar.jpg"}
										alt={agent.name}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute bottom-4 left-4 text-white">
										<h3 className="text-2xl font-bold mb-1">{agent.name}</h3>
										<p className="text-sm text-gray-200">{agent.title}</p>
									</div>
								</div>

								<CardContent className="p-6 space-y-4">
									{/* Stats */}
									<div className="grid grid-cols-2 gap-4 pb-4 border-b">
										<div className="text-center">
											<div className="text-2xl font-bold text-blue-600">{agent.properties_count}</div>
											<div className="text-xs text-gray-600">Properties</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-purple-600">{agent.years_experience}+</div>
											<div className="text-xs text-gray-600">Years Exp.</div>
										</div>
									</div>

									{/* Info */}
									<div className="space-y-2 text-sm">
										{agent.specialization && (
											<div className="flex items-start gap-2">
												<HomeIcon className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
												<span className="text-gray-600">{agent.specialization}</span>
											</div>
										)}
										{agent.languages && (
											<div className="flex items-start gap-2">
												<Languages className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
												<span className="text-gray-600">{agent.languages}</span>
											</div>
										)}
									</div>

									{/* Contact Button */}
									<Button className="w-full bg-blue-600 hover:bg-blue-700">
										<Mail className="h-4 w-4 mr-2" />
										Contact {agent.name.split(' ')[0]}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

