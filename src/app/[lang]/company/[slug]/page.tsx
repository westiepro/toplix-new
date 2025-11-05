import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/company-page/HeroSection";
import { QuickStats } from "@/components/company-page/QuickStats";
import { FeaturedProperties } from "@/components/company-page/FeaturedProperties";
import { AboutCompany } from "@/components/company-page/AboutCompany";
import { TeamSection } from "@/components/company-page/TeamSection";
import { AllListings } from "@/components/company-page/AllListings";
import { ServicesSection } from "@/components/company-page/ServicesSection";
import { TestimonialsSection } from "@/components/company-page/TestimonialsSection";
import { CoverageAreas } from "@/components/company-page/CoverageAreas";
import { WhyChooseUs } from "@/components/company-page/WhyChooseUs";
import { ContactSection } from "@/components/company-page/ContactSection";
import { createClient } from '@supabase/supabase-js';
import { notFound } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Company data interface
interface CompanyData {
	id: string;
	name: string;
	slug: string;
	tagline: string;
	description: string;
	logo_url?: string;
	hero_image_url?: string;
	founded_year: number;
	email: string;
	phone: string;
	address: string;
	website?: string;
	facebook?: string;
	instagram?: string;
	linkedin?: string;
	youtube?: string;
	total_properties?: number;
	properties_sold?: number;
	active_agents?: number;
	rating?: number;
	created_at?: string;
}

// Fetch company data from Supabase
async function getCompanyData(slug: string): Promise<CompanyData | null> {
	try {
		if (!supabaseUrl || !supabaseKey) {
			console.error('Supabase not configured');
			return null;
		}

		const supabase = createClient(supabaseUrl, supabaseKey);

		const { data, error } = await supabase
			.from('companies')
			.select('*')
			.eq('slug', slug)
			.eq('status', 'active')
			.single();

		if (error || !data) {
			console.error('Error fetching company:', error);
			return null;
		}

		return data;
	} catch (error) {
		console.error('Failed to fetch company data:', error);
		return null;
	}
}

export default async function CompanyPage({
	params,
}: {
	params: Promise<{ slug: string; lang: string }>;
}) {
	const { slug, lang } = await params;
	
	// Fetch company data
	const company = await getCompanyData(slug);

	// If company not found, show 404
	if (!company) {
		notFound();
	}

	// Mock data - will be replaced with real data from Supabase
	const companyData = {
		...company,
		// Additional mock data for demonstration
		stats: {
			yearsInBusiness: new Date().getFullYear() - company.founded_year,
			propertiesSold: company.properties_sold || 500,
			happyClients: 450,
			activeListings: company.total_properties || 24,
			rating: company.rating || 4.8,
		},
	};

	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			
			{/* Hero Section */}
			<HeroSection company={companyData} />

			{/* Quick Stats */}
			<QuickStats stats={companyData.stats} />

			{/* Featured Properties */}
			<FeaturedProperties companyId={company.id} />

			{/* About Company */}
			<AboutCompany company={companyData} />

			{/* Team Section */}
			<TeamSection companyId={company.id} />

			{/* All Listings */}
			<AllListings companyId={company.id} companyName={company.name} />

			{/* Services */}
			<ServicesSection />

			{/* Testimonials */}
			<TestimonialsSection companyId={company.id} />

			{/* Coverage Areas */}
			<CoverageAreas />

			{/* Why Choose Us */}
			<WhyChooseUs stats={companyData.stats} companyName={company.name} />

			{/* Contact Section */}
			<ContactSection company={companyData} />

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="mx-auto max-w-7xl px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="font-bold text-lg mb-4">{company.name}</h3>
							<p className="text-gray-400 text-sm">{company.tagline}</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li><a href="#properties" className="hover:text-white">Properties</a></li>
								<li><a href="#about" className="hover:text-white">About Us</a></li>
								<li><a href="#team" className="hover:text-white">Our Team</a></li>
								<li><a href="#contact" className="hover:text-white">Contact</a></li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Contact</h4>
							<ul className="space-y-2 text-sm text-gray-400">
								<li>{company.phone}</li>
								<li>{company.email}</li>
								<li className="text-xs">{company.address}</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Follow Us</h4>
							<div className="flex gap-4">
								{company.facebook && (
									<a href={company.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
										Facebook
									</a>
								)}
								{company.instagram && (
									<a href={company.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
										Instagram
									</a>
								)}
							</div>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
						<p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</main>
	);
}

