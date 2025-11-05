"use client";

import { useLanguage, type LanguageCode } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
	const { currentLanguage, setLanguage, languages } = useLanguage();

	const currentLang = languages.find((l) => l.code === currentLanguage);

	if (languages.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild suppressHydrationWarning>
				<Button variant="ghost" size="sm" className="px-2" suppressHydrationWarning>
					<span className="text-2xl hover:scale-110 transition-transform">
						{currentLang?.flag_emoji || "🌐"}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48" suppressHydrationWarning>
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.code}
						onClick={() => setLanguage(language.code as LanguageCode)}
						className={`flex items-center gap-3 ${
							currentLanguage === language.code ? "bg-accent" : ""
						}`}
					>
						<span className="text-xl">{language.flag_emoji}</span>
						<span className="flex-1">{language.name}</span>
						{currentLanguage === language.code && (
							<span className="text-green-600">✓</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

