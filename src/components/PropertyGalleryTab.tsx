"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropertyGalleryTabProps = {
	images: string[];
};

export function PropertyGalleryTab({ images }: PropertyGalleryTabProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!images || images.length === 0) {
		return (
			<div className="flex items-center justify-center h-full text-white">
				<p>No images available</p>
			</div>
		);
	}

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const goToImage = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className="flex flex-col h-full">
			{/* Main image display */}
			<div className="flex-1 flex items-center justify-center p-4 md:p-8">
				<div className="relative w-full max-w-6xl aspect-[16/10]">
					<Image
						src={images[currentIndex]}
						alt={`Property image ${currentIndex + 1}`}
						fill
						className="object-contain"
						sizes="(max-width: 768px) 100vw, 1200px"
						priority={currentIndex === 0}
					/>

					{/* Navigation arrows */}
					{images.length > 1 && (
						<>
							<button
								onClick={goToPrevious}
								className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10"
								aria-label="Previous image"
							>
								<ChevronLeft className="w-6 h-6" />
							</button>
							<button
								onClick={goToNext}
								className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10"
								aria-label="Next image"
							>
								<ChevronRight className="w-6 h-6" />
							</button>
						</>
					)}

					{/* Image counter */}
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
						{currentIndex + 1} of {images.length}
					</div>
				</div>
			</div>

			{/* Thumbnail navigation */}
			{images.length > 1 && (
				<div className="px-4 md:px-8 pb-6">
					<div className="flex justify-center gap-2 md:gap-3 overflow-x-auto max-w-full mx-auto pb-2">
						<div className="flex gap-2 md:gap-3 min-w-min">
							{images.map((image, index) => (
								<button
									key={index}
									onClick={() => goToImage(index)}
									className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
										currentIndex === index
											? "ring-2 ring-white scale-105 shadow-lg"
											: "opacity-60 hover:opacity-100"
									}`}
								>
									<Image
										src={image}
										alt={`Thumbnail ${index + 1}`}
										fill
										className="object-cover"
										sizes="80px"
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

