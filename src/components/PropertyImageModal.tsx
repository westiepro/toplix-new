"use client";

import { useState, useEffect } from "react";
import { X, Heart, Share2 } from "lucide-react";
import { PropertyGalleryTab } from "./PropertyGalleryTab";
import { AIDecorationTab, type AIStyledImage } from "./AIDecorationTab";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { trackPropertyShare } from "@/lib/analytics-events";

type PropertyImageModalProps = {
	isOpen: boolean;
	onClose: () => void;
	propertyId: string;
	propertyAddress: string;
	galleryImages: string[];
	originalImage?: string;
	aiStyledImages?: AIStyledImage[];
};

export function PropertyImageModal({
	isOpen,
	onClose,
	propertyId,
	propertyAddress,
	galleryImages,
	originalImage,
	aiStyledImages = [],
}: PropertyImageModalProps) {
	const [activeTab, setActiveTab] = useState<"gallery" | "ai-decoration">("gallery");
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
	const favorited = isFavorite(propertyId);

	// Set default tab when modal opens
	useEffect(() => {
		if (isOpen) {
			// Default to gallery tab
			setActiveTab("gallery");
		}
	}, [isOpen]);

	// Handle ESC key to close
	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen, onClose]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const hasAIDecoration = aiStyledImages.length > 0 && originalImage;

	const handleFavoriteClick = () => {
		if (favorited) {
			removeFavorite(propertyId);
			toast.success("Removed from favorites");
		} else {
			addFavorite(propertyId);
			toast.success("Added to favorites");
		}
	};

	const handleShareClick = () => {
		trackPropertyShare(propertyId, 'link');
		navigator.clipboard.writeText(window.location.href);
		toast.success("Link copied", {
			description: "Property link copied to clipboard",
		});
	};

	return (
		<div className="fixed inset-0 z-50 bg-black">
			{/* Top navigation bar */}
			<div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-4 md:px-6 bg-black/80 backdrop-blur-sm z-50">
				{/* Tabs */}
				<div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
					<button
						onClick={() => setActiveTab("gallery")}
						className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-200 ${
							activeTab === "gallery"
								? "bg-gray-700 text-white shadow-lg"
								: "text-gray-400 hover:text-white"
						}`}
					>
						Gallery
					</button>
					<button
						onClick={() => setActiveTab("ai-decoration")}
						className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-200 ${
							activeTab === "ai-decoration"
								? "bg-gray-700 text-white shadow-lg"
								: "text-gray-400 hover:text-white"
						}`}
						disabled={!hasAIDecoration}
						title={!hasAIDecoration ? "No AI-styled images available" : ""}
					>
						AI Decoration
						{!hasAIDecoration && (
							<span className="ml-1 text-xs opacity-50">(Coming Soon)</span>
						)}
					</button>
				</div>

				{/* Action icons */}
				<div className="flex items-center gap-2 md:gap-3">
					<button
						onClick={handleFavoriteClick}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
						aria-label="Favorite"
					>
						<Heart
							className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
								favorited ? "fill-red-500 text-red-500" : "text-white"
							}`}
						/>
					</button>
					<button
						onClick={handleShareClick}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
						aria-label="Share"
					>
						<Share2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</button>
					<button
						onClick={onClose}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
						aria-label="Close"
					>
						<X className="w-5 h-5 md:w-6 md:h-6 text-white" />
					</button>
				</div>
			</div>

			{/* Tab content */}
			<div className="h-full pt-14">
				{activeTab === "gallery" && <PropertyGalleryTab images={galleryImages} />}
				{activeTab === "ai-decoration" && hasAIDecoration && (
					<AIDecorationTab
						originalImage={originalImage!}
						styledImages={aiStyledImages}
						propertyId={propertyId}
					/>
				)}
			</div>
		</div>
	);
}

