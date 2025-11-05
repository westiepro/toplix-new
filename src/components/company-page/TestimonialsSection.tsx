"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Image from "next/image";

interface TestimonialsSectionProps {
	companyId: string;
}

export function TestimonialsSection({ companyId }: TestimonialsSectionProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Mock testimonials - will be replaced with real data
	const testimonials = [
		{
			id: "1",
			name: "Maria Silva",
			role: "Apartment Buyer",
			photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
			rating: 5,
			text: "Exceptional service from start to finish! The team was professional, responsive, and helped us find our dream apartment in Lisbon. Highly recommended!",
			property: "Modern Apartment in Parque das Nações",
			date: "3 months ago",
			verified: true,
		},
		{
			id: "2",
			name: "David Brown",
			role: "Villa Seller",
			photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
			rating: 5,
			text: "Sold my villa within 2 months at an excellent price. The marketing strategy was outstanding, and the team handled everything professionally.",
			property: "Luxury Villa in Algarve",
			date: "1 month ago",
			verified: true,
		},
		{
			id: "3",
			name: "Sophie Laurent",
			role: "International Buyer",
			photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
			rating: 5,
			text: "As a French buyer, I appreciated the multilingual support and expertise. They made the entire process smooth and stress-free.",
			property: "Beachfront Property in Cascais",
			date: "2 weeks ago",
			verified: true,
		},
		{
			id: "4",
			name: "João Pereira",
			role: "First-Time Buyer",
			photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
			rating: 5,
			text: "Being a first-time buyer, I had many questions. The team was patient, informative, and guided me through every step. Couldn't be happier!",
			property: "Apartment in Porto",
			date: "1 week ago",
			verified: true,
		},
	];

	const nextTestimonial = () => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const currentTestimonial = testimonials[currentIndex];

	return (
		<section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
						<Star className="h-8 w-8 text-yellow-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Real experiences from real people we've helped
					</p>
				</div>

				{/* Main Testimonial Card */}
				<div className="max-w-4xl mx-auto mb-8">
					<Card className="border-2 border-blue-200 shadow-2xl">
						<CardContent className="p-8 md:p-12">
							<Quote className="h-12 w-12 text-blue-600 mb-6 opacity-50" />
							
							{/* Stars */}
							<div className="flex gap-1 mb-6">
								{[...Array(5)].map((_, i) => (
									<Star 
										key={i} 
										className={`h-6 w-6 ${
											i < currentTestimonial.rating 
												? "fill-yellow-400 text-yellow-400" 
												: "text-gray-300"
										}`}
									/>
								))}
							</div>

							{/* Testimonial Text */}
							<p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
								"{currentTestimonial.text}"
							</p>

							{/* Author Info */}
							<div className="flex items-center gap-4">
								<div className="relative h-16 w-16 rounded-full overflow-hidden">
									<Image
										src={currentTestimonial.photo}
										alt={currentTestimonial.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
										{currentTestimonial.verified && (
											<CheckCircle className="h-5 w-5 text-blue-600" />
										)}
									</div>
									<p className="text-sm text-gray-600">{currentTestimonial.role}</p>
									<p className="text-xs text-gray-500 mt-1">
										{currentTestimonial.property} • {currentTestimonial.date}
									</p>
								</div>
							</div>

							{/* Navigation */}
							<div className="flex items-center justify-between mt-8 pt-8 border-t">
								<Button
									variant="outline"
									size="icon"
									onClick={prevTestimonial}
									className="rounded-full"
								>
									<ChevronLeft className="h-5 w-5" />
								</Button>

								<div className="flex gap-2">
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentIndex(index)}
											className={`w-2 h-2 rounded-full transition-all ${
												index === currentIndex 
													? "bg-blue-600 w-8" 
													: "bg-gray-300 hover:bg-gray-400"
											}`}
										/>
									))}
								</div>

								<Button
									variant="outline"
									size="icon"
									onClick={nextTestimonial}
									className="rounded-full"
								>
									<ChevronRight className="h-5 w-5" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* All Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{testimonials.map((testimonial, index) => (
						<Card 
							key={testimonial.id}
							className={`cursor-pointer transition-all ${
								index === currentIndex 
									? "ring-2 ring-blue-600 shadow-lg" 
									: "hover:shadow-md"
							}`}
							onClick={() => setCurrentIndex(index)}
						>
							<CardContent className="p-4">
								<div className="flex gap-1 mb-2">
									{[...Array(5)].map((_, i) => (
										<Star 
											key={i} 
											className={`h-3 w-3 ${
												i < testimonial.rating 
													? "fill-yellow-400 text-yellow-400" 
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<p className="text-xs text-gray-700 line-clamp-3 mb-3">
									"{testimonial.text}"
								</p>
								<div className="flex items-center gap-2">
									<div className="relative h-8 w-8 rounded-full overflow-hidden">
										<Image
											src={testimonial.photo}
											alt={testimonial.name}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="font-semibold text-xs">{testimonial.name}</p>
										<p className="text-xs text-gray-500">{testimonial.role}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

