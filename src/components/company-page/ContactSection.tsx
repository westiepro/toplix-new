"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, Clock, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
	company: {
		name: string;
		email: string;
		phone: string;
		address: string;
		website?: string;
		facebook?: string;
		instagram?: string;
		linkedin?: string;
		youtube?: string;
	};
}

export function ContactSection({ company }: ContactSectionProps) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		interest: "",
		message: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// TODO: Send to API
		toast.success("Thank you! We'll get back to you within 24 hours.");
		
		// Reset form
		setFormData({
			name: "",
			email: "",
			phone: "",
			interest: "",
			message: "",
		});
	};

	return (
		<section id="contact" className="py-16 bg-gray-50">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
						<Phone className="h-8 w-8 text-blue-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Ready to find your dream property? Contact us today!
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Contact Info Cards */}
					<div className="space-y-6">
						{/* Phone */}
						<Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-100 rounded-lg">
										<Phone className="h-6 w-6 text-blue-600" />
									</div>
									<div>
										<h3 className="font-bold mb-1">Phone</h3>
										<a 
											href={`tel:${company.phone}`}
											className="text-blue-600 hover:underline"
										>
											{company.phone}
										</a>
										<p className="text-xs text-gray-500 mt-1">Click to call</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Email */}
						<Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-purple-100 rounded-lg">
										<Mail className="h-6 w-6 text-purple-600" />
									</div>
									<div>
										<h3 className="font-bold mb-1">Email</h3>
										<a 
											href={`mailto:${company.email}`}
											className="text-purple-600 hover:underline break-all"
										>
											{company.email}
										</a>
										<p className="text-xs text-gray-500 mt-1">Click to email</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Address */}
						<Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-green-100 rounded-lg">
										<MapPin className="h-6 w-6 text-green-600" />
									</div>
									<div>
										<h3 className="font-bold mb-1">Office Address</h3>
										<p className="text-gray-700 text-sm">{company.address}</p>
										<Button 
											variant="link" 
											className="text-xs p-0 h-auto mt-2 text-green-600"
											onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(company.address)}`, '_blank')}
										>
											View on Map →
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Office Hours */}
						<Card className="border-l-4 border-l-orange-600 hover:shadow-lg transition-shadow">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-orange-100 rounded-lg">
										<Clock className="h-6 w-6 text-orange-600" />
									</div>
									<div>
										<h3 className="font-bold mb-2">Office Hours</h3>
										<div className="text-sm space-y-1">
											<p className="text-gray-700">Mon - Fri: 9:00 - 18:00</p>
											<p className="text-gray-700">Saturday: 10:00 - 14:00</p>
											<p className="text-gray-500">Sunday: Closed</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Social Media */}
						<Card className="border-l-4 border-l-pink-600">
							<CardContent className="p-6">
								<h3 className="font-bold mb-4">Follow Us</h3>
								<div className="flex gap-3">
									{company.facebook && (
										<a 
											href={company.facebook}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
										>
											<Facebook className="h-5 w-5 text-blue-600" />
										</a>
									)}
									{company.instagram && (
										<a 
											href={company.instagram}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors"
										>
											<Instagram className="h-5 w-5 text-pink-600" />
										</a>
									)}
									{company.linkedin && (
										<a 
											href={company.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
										>
											<Linkedin className="h-5 w-5 text-blue-700" />
										</a>
									)}
									{company.youtube && (
										<a 
											href={company.youtube}
											target="_blank"
											rel="noopener noreferrer"
											className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
										>
											<Youtube className="h-5 w-5 text-red-600" />
										</a>
									)}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<Card className="lg:col-span-2 shadow-xl">
						<CardHeader>
							<CardTitle className="text-2xl">Send us a Message</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="name">Your Name *</Label>
										<Input
											id="name"
											required
											value={formData.name}
											onChange={(e) => setFormData({...formData, name: e.target.value})}
											placeholder="John Doe"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email Address *</Label>
										<Input
											id="email"
											type="email"
											required
											value={formData.email}
											onChange={(e) => setFormData({...formData, email: e.target.value})}
											placeholder="john@example.com"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number</Label>
										<Input
											id="phone"
											type="tel"
											value={formData.phone}
											onChange={(e) => setFormData({...formData, phone: e.target.value})}
											placeholder="+351 912 345 678"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="interest">I'm Interested In</Label>
										<Select 
											value={formData.interest}
											onValueChange={(value) => setFormData({...formData, interest: value})}
										>
											<SelectTrigger id="interest">
												<SelectValue placeholder="Select..." />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="buying">Buying a Property</SelectItem>
												<SelectItem value="selling">Selling a Property</SelectItem>
												<SelectItem value="renting">Renting a Property</SelectItem>
												<SelectItem value="investment">Investment Consulting</SelectItem>
												<SelectItem value="valuation">Property Valuation</SelectItem>
												<SelectItem value="other">Other Services</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Your Message *</Label>
									<Textarea
										id="message"
										required
										value={formData.message}
										onChange={(e) => setFormData({...formData, message: e.target.value})}
										rows={6}
										placeholder="Tell us more about what you're looking for..."
									/>
								</div>

								<Button 
									type="submit" 
									size="lg" 
									className="w-full bg-blue-600 hover:bg-blue-700"
								>
									<Send className="h-5 w-5 mr-2" />
									Send Message
								</Button>

								<p className="text-xs text-gray-500 text-center">
									We typically respond within 24 hours during business days
								</p>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Map */}
				<div className="mt-12">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5 text-blue-600" />
								Our Location
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
								<iframe
									src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo'}&q=${encodeURIComponent(company.address)}`}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Office Location"
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

