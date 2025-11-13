import React from "react";
import { LocaleLink } from "./LocaleLink";

interface TopLixLogoProps {
	className?: string;
	showText?: boolean;
	size?: "sm" | "md" | "lg";
}

export function TopLixLogo({ className = "", showText = true, size = "md" }: TopLixLogoProps) {
	const sizeClasses = {
		sm: { icon: "h-6 w-6", text: "text-base" },
		md: { icon: "h-8 w-8", text: "text-lg" },
		lg: { icon: "h-10 w-10", text: "text-xl" },
	};

	const currentSize = sizeClasses[size];

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			{/* Red square with rounded corners containing white house icon */}
			<div className={`${currentSize.icon} flex-shrink-0`}>
				<svg
					viewBox="0 0 40 40"
					className="w-full h-full"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Red background with rounded corners */}
					<rect
						x="2"
						y="2"
						width="36"
						height="36"
						rx="6"
						fill="#DC2626"
					/>
					{/* White house icon */}
					<path
						d="M20 12L12 18V28H16V22H24V28H28V18L20 12Z"
						fill="white"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{/* Door outline */}
					<rect
						x="17"
						y="22"
						width="6"
						height="6"
						fill="none"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			{/* TopLix text */}
			{showText && (
				<span className={`font-bold text-gray-800 dark:text-gray-100 ${currentSize.text}`}>
					TopLix
				</span>
			)}
		</div>
	);
}

export function TopLixLogoLink({ className = "", showText = true, size = "md" }: TopLixLogoProps) {
	return (
		<LocaleLink href="/" className={`flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity ${className}`}>
			<TopLixLogo showText={showText} size={size} />
		</LocaleLink>
	);
}

