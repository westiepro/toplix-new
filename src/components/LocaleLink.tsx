"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ComponentProps } from "react";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
	href: string;
};

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
	const { currentLanguage } = useLanguage();

	// Add locale prefix if not already present
	const localizedHref = href.startsWith(`/${currentLanguage}`)
		? href
		: `/${currentLanguage}${href.startsWith('/') ? href : `/${href}`}`;

	return <Link href={localizedHref} {...props} />;
}

