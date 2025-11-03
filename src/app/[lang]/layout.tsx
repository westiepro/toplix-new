import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/Providers";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getTranslations } from "@/lib/get-translations";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n-config";
import { createClient } from "@supabase/supabase-js";
import PlausibleProvider from "next-plausible";

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
	params: Promise<{ lang: Locale }>;
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
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const translations = await getTranslations(lang);
	const languages = await getLanguages();

	return (
		<html lang={lang} suppressHydrationWarning>
			<head>
				<PlausibleProvider
					domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "localhost"}
					customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_URL}
					trackOutboundLinks
					trackFileDownloads
					enabled={!!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<LanguageProvider
						locale={lang}
						translations={translations}
						languages={languages}
					>
						{children}
					</LanguageProvider>
				</Providers>
			</body>
		</html>
	);
}

