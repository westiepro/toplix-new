import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getTranslations } from "@/lib/get-translations";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n-config";
import { createClient } from "@supabase/supabase-js";
import { GoogleAnalytics } from '@next/third-parties/google';
import { LiveViewerTracker } from "@/components/LiveViewerTracker";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	return {
		title: "Real Estate Portal",
		description: "Modern real estate portal with interactive maps",
	};
}

export async function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

async function getLanguages() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		return locales.map((code) => ({
			code,
			name: localeNames[code],
			flag_emoji: localeFlags[code],
			is_active: true,
		}));
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseAnonKey);
		const { data, error } = await supabase
			.from("languages")
			.select("*")
			.eq("is_active", true)
			.order("code");

		if (error || !data || data.length === 0) {
			return locales.map((code) => ({
				code,
				name: localeNames[code],
				flag_emoji: localeFlags[code],
				is_active: true,
			}));
		}

		return data;
	} catch (error) {
		return locales.map((code) => ({
			code,
			name: localeNames[code],
			flag_emoji: localeFlags[code],
			is_active: true,
		}));
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	// Validate and cast to Locale
	const validLang = locales.includes(lang as Locale) ? (lang as Locale) : 'en';
	const translations = await getTranslations(validLang);
	const languages = await getLanguages();

	return (
		<Providers>
			<LanguageProvider
				locale={validLang}
				translations={translations}
				languages={languages}
			>
				{children}
			</LanguageProvider>
			
			{/* Live Viewer Tracker - tracks all visitors */}
			<LiveViewerTracker />
			
			{/* Google Analytics 4 */}
			{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
			)}
		</Providers>
	);
}

