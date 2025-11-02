"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSearch } from "@/components/HeroSearch";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
	const { t } = useTranslation();

	return (
		<main className="min-h-screen">
			<Navbar />
			{/* Hero Section with Background Image */}
			<section className="relative h-[600px] md:h-[700px] overflow-hidden">
				{/* Background Image - No Overlay */}
				<div className="absolute inset-0 z-0">
					<Image
						src="/images/hero-garden-villa.jpg"
						alt="Luxury Algarve villa with infinity pool and ocean view"
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
				</div>

				{/* Content */}
				<div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
					{/* Single Container with Very Light White Overlay */}
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white/5 px-10 py-8 rounded-3xl shadow-2xl max-w-3xl w-full">
						{/* Title and Subtitle */}
						<div className="text-center mb-6">
							<h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.6), 0 4px 25px rgba(0,0,0,0.5)' }}>
								{t("home.hero.title")}
							</h1>
							<p className="text-base md:text-lg text-white/95 font-normal" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.5)' }}>
								{t("home.hero.subtitle")}
							</p>
						</div>

						{/* Search Interface */}
						<div className="w-full">
							<HeroSearch />
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-background">
				<div className="mx-auto max-w-6xl px-4">
					<div className="grid gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="mb-4 flex justify-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
									</svg>
								</div>
							</div>
							<h3 className="mb-2 text-xl font-semibold">{t("home.features.premium.title")}</h3>
							<p className="text-muted-foreground">
								{t("home.features.premium.description")}
							</p>
						</div>
						<div className="text-center">
							<div className="mb-4 flex justify-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
									</svg>
								</div>
							</div>
							<h3 className="mb-2 text-xl font-semibold">{t("home.features.maps.title")}</h3>
							<p className="text-muted-foreground">
								{t("home.features.maps.description")}
							</p>
						</div>
						<div className="text-center">
							<div className="mb-4 flex justify-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#198754] text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
								</div>
							</div>
							<h3 className="mb-2 text-xl font-semibold">{t("home.features.agents.title")}</h3>
							<p className="text-muted-foreground">
								{t("home.features.agents.description")}
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
