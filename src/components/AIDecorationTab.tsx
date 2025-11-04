"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { trackAIStyleView } from "@/lib/analytics-events";

export type AIStyledImage = {
	style_name: string;
	image_url: string;
};

type AIDecorationTabProps = {
	originalImage: string;
	styledImages: AIStyledImage[];
	propertyId: string;
};

const STYLE_NAMES = [
	"Modern",
	"Scandinavian",
	"Minimalist",
	"Boho",
	"Industrial",
	"Contemporary",
	"Mediterranean",
	"Rustic",
	"Luxury",
	"French Country",
	"Algarve Style",
	"Portuguese Traditional",
	"Lisbon Modern",
];

export function AIDecorationTab({ originalImage, styledImages, propertyId }: AIDecorationTabProps) {
	const [position, setPosition] = useState(50);
	const [activeStyle, setActiveStyle] = useState<AIStyledImage | null>(
		styledImages.length > 0 ? styledImages[0] : null
	);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Track style view when changed
	useEffect(() => {
		if (activeStyle) {
			trackAIStyleView(propertyId, activeStyle.style_name);
		}
	}, [activeStyle, propertyId]);

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPosition(Number(e.target.value));
	};

	const handleStyleSelect = (style: AIStyledImage) => {
		setActiveStyle(style);
		setPosition(50); // Reset to middle when changing styles
	};

	// Mouse drag handling
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		updatePosition(e.clientX);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;
		updatePosition(e.clientX);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const updatePosition = (clientX: number) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
		setPosition(newPosition);
	};

	// Touch handling for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		const touch = e.touches[0];
		updatePosition(touch.clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		const touch = e.touches[0];
		updatePosition(touch.clientX);
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
	};

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setPosition((prev) => Math.min(100, prev + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

	if (!originalImage || !activeStyle) {
		return (
			<div className="flex items-center justify-center h-full text-white">
				<p>No AI-styled images available for this property</p>
			</div>
		);
	}

	// Group styles by row (7 in first row, rest in second)
	const row1Styles = styledImages.filter((s) =>
		["Modern", "Scandinavian", "Minimalist", "Boho", "Industrial", "Contemporary", "Mediterranean"].includes(
			s.style_name
		)
	);
	const row2Styles = styledImages.filter((s) =>
		["Rustic", "Luxury", "French Country", "Algarve Style", "Portuguese Traditional", "Lisbon Modern"].includes(
			s.style_name
		)
	);

	return (
		<div className="flex flex-col h-full">
			{/* Main comparison area */}
			<div className="flex-1 flex items-center justify-center p-4 md:p-8">
				<div className="w-full max-w-6xl">
					<div
						ref={containerRef}
						className="relative w-full aspect-[16/10] overflow-hidden rounded-lg shadow-2xl bg-gray-900 cursor-ew-resize select-none"
						onMouseDown={handleMouseDown}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{/* Original image (Before - right side) */}
						<div className="absolute inset-0">
							<Image
								src={originalImage}
								alt="Original"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 1200px"
								priority
							/>
						</div>

						{/* AI styled image (After - left side, clipped) */}
						<div
							className="absolute top-0 left-0 h-full overflow-hidden"
							style={{ width: `${position}%` }}
						>
							<div className="relative w-full h-full" style={{ width: `${(100 / position) * 100}%` }}>
								<Image
									src={activeStyle.image_url}
									alt={`${activeStyle.style_name} Style`}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 1200px"
								/>
							</div>
						</div>

						{/* Labels */}
						<div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm z-20 pointer-events-none">
							After (AI Styled)
						</div>
						<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm z-20 pointer-events-none">
							Before
						</div>

						{/* Slider divider line */}
						<div
							className="absolute top-0 bottom-0 w-0.5 bg-white z-30 pointer-events-none shadow-lg"
							style={{ left: `${position}%`, transform: "translateX(-50%)" }}
						>
							{/* Slider handle */}
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize">
								<div className="flex gap-0.5 items-center">
									<svg
										className="w-3 h-3 text-gray-700"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
									</svg>
									<svg
										className="w-3 h-3 text-gray-700"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</div>

						{/* Hidden range input for accessibility */}
						<input
							type="range"
							min="0"
							max="100"
							value={position}
							onChange={handleSliderChange}
							className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
							aria-label="Comparison slider"
						/>
					</div>
				</div>
			</div>

			{/* Style selection buttons */}
			{styledImages.length > 0 && (
				<div className="px-4 md:px-8 pb-6 space-y-3">
					{/* First row */}
					{row1Styles.length > 0 && (
						<div className="flex justify-center gap-2 md:gap-3 flex-wrap">
							{row1Styles.map((style) => (
								<button
									key={style.style_name}
									onClick={() => handleStyleSelect(style)}
									className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
										activeStyle?.style_name === style.style_name
											? "bg-white text-black shadow-lg scale-105"
											: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
									}`}
								>
									{style.style_name}
								</button>
							))}
						</div>
					)}

					{/* Second row */}
					{row2Styles.length > 0 && (
						<div className="flex justify-center gap-2 md:gap-3 flex-wrap">
							{row2Styles.map((style) => (
								<button
									key={style.style_name}
									onClick={() => handleStyleSelect(style)}
									className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
										activeStyle?.style_name === style.style_name
											? "bg-white text-black shadow-lg scale-105"
											: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
									}`}
								>
									{style.style_name}
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

