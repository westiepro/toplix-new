"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export type AIStyle = {
	style_name: string;
	image_url: string;
};

type AIComparisonSliderProps = {
	original: string;
	styles: AIStyle[];
};

export default function AIComparisonSlider({ original, styles }: AIComparisonSliderProps) {
	const [position, setPosition] = useState(50);
	const [activeStyle, setActiveStyle] = useState(styles.length > 0 ? styles[0] : null);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	if (!original || styles.length === 0) {
		return null;
	}

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPosition(Number(e.target.value));
	};

	const handleStyleSelect = (style: AIStyle) => {
		setActiveStyle(style);
		// Reset slider to middle when changing styles
		setPosition(50);
	};

	// Handle mouse drag on the slider area
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
		setPosition(newPosition);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging || !containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
		setPosition(newPosition);
	};

	const handleMouseUp = () => {
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

	return (
		<div className="w-full max-w-4xl mx-auto my-8">
			<h2 className="text-2xl font-semibold mb-4">See It With AI Decoration</h2>
			
			<div 
				ref={containerRef}
				className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-xl bg-gray-100 cursor-ew-resize"
				onMouseDown={handleMouseDown}
			>
				{/* Original image (behind) */}
				<Image 
					src={original} 
					alt="Original" 
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, 896px"
				/>
				
				{/* AI styled image (revealed by slider) */}
				{activeStyle && (
					<div 
						className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-200" 
						style={{ width: `${position}%` }}
					>
						<Image 
							src={activeStyle.image_url} 
							alt={`${activeStyle.style_name} Style`} 
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 896px"
						/>
					</div>
				)}
				
				{/* Before/After labels */}
				<div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm z-20 pointer-events-none">
					Before
				</div>
				<div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium backdrop-blur-sm z-20 pointer-events-none">
					After
				</div>
				
				{/* Slider handle */}
				<div
					className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-lg pointer-events-none"
					style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
				>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
						<div className="flex gap-1">
							<div className="w-1 h-4 bg-gray-400 rounded"></div>
							<div className="w-1 h-4 bg-gray-400 rounded"></div>
						</div>
					</div>
				</div>
				
				{/* Slider input (hidden but still accessible for keyboard navigation) */}
				<input
					type="range"
					min="0"
					max="100"
					value={position}
					onChange={handleSliderChange}
					className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 md:w-2/3 h-2 bg-transparent appearance-none cursor-ew-resize z-30 slider-input"
				/>
			</div>

			{/* Style selection buttons */}
			{styles.length > 1 && (
				<div className="flex justify-center gap-3 mt-6 flex-wrap">
					{styles.map((style) => (
						<button
							key={style.style_name}
							onClick={() => handleStyleSelect(style)}
							className={`px-4 py-2 rounded-md border transition-all duration-200 font-medium ${
								activeStyle?.style_name === style.style_name
									? "bg-[#198754] text-white border-[#198754] shadow-md"
									: "bg-white text-gray-800 border-gray-300 hover:border-[#198754] hover:text-[#198754]"
							}`}
						>
							{style.style_name}
						</button>
					))}
				</div>
			)}
			
			<style jsx global>{`
				.slider-input::-webkit-slider-thumb {
					appearance: none;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: white;
					cursor: ew-resize;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
					border: 2px solid #198754;
				}
				
				.slider-input::-moz-range-thumb {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: white;
					cursor: ew-resize;
					border: 2px solid #198754;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
				}
			`}</style>
		</div>
	);
}
