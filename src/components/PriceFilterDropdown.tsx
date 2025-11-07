"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PriceFilterDropdownProps {
	minPrice?: number;
	maxPrice?: number;
	onApply: (minPrice: number | undefined, maxPrice: number | undefined) => void;
}

// Generate price steps based on requirements
function generatePriceSteps(): number[] {
	const steps: number[] = [];
	
	// From €50K to €1M with step of 50K
	for (let price = 50000; price <= 1000000; price += 50000) {
		steps.push(price);
	}
	
	// From €1M to €5M with step of 250K
	for (let price = 1250000; price <= 5000000; price += 250000) {
		steps.push(price);
	}
	
	// From €5M to €10M with step of €1M
	for (let price = 6000000; price <= 10000000; price += 1000000) {
		steps.push(price);
	}
	
	return steps;
}

const PRICE_STEPS = generatePriceSteps();
const MIN_PRICE = 50000;
const MAX_PRICE = 10000000;

// Find closest step index for a given price
function findClosestStepIndex(price: number): number {
	if (price <= MIN_PRICE) return 0;
	if (price >= MAX_PRICE) return PRICE_STEPS.length - 1;
	
	let closestIndex = 0;
	let minDiff = Math.abs(PRICE_STEPS[0] - price);
	
	for (let i = 1; i < PRICE_STEPS.length; i++) {
		const diff = Math.abs(PRICE_STEPS[i] - price);
		if (diff < minDiff) {
			minDiff = diff;
			closestIndex = i;
		}
	}
	
	return closestIndex;
}

// Convert step index to price
function indexToPrice(index: number): number {
	return PRICE_STEPS[Math.max(0, Math.min(index, PRICE_STEPS.length - 1))];
}

// Generate histogram data (mock data for visualization)
function generateHistogramData(): number[] {
	const bins = 25; // Match the image - approximately 25 bars
	const data: number[] = [];
	
	// Simulate price distribution (more properties in lower ranges)
	for (let i = 0; i < bins; i++) {
		const position = i / bins;
		// Higher density in lower price ranges, peaks around middle-left
		const peakPosition = 0.3; // Peak around 30% of range
		const distanceFromPeak = Math.abs(position - peakPosition);
		const density = Math.max(0, 1 - distanceFromPeak * 1.5) + Math.random() * 0.2;
		data.push(Math.max(0.15, density));
	}
	
	return data;
}

const HISTOGRAM_DATA = generateHistogramData();

export function PriceFilterDropdown({
	minPrice,
	maxPrice,
	onApply,
}: PriceFilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(minPrice || MIN_PRICE);
	const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(maxPrice || MAX_PRICE);
	const dropdownRef = useRef<HTMLDivElement>(null);
	
	// Update local state when props change
	useEffect(() => {
		setLocalMinPrice(minPrice || MIN_PRICE);
		setLocalMaxPrice(maxPrice || MAX_PRICE);
	}, [minPrice, maxPrice]);
	
	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [isOpen]);
	
	const minIndex = findClosestStepIndex(localMinPrice || MIN_PRICE);
	const maxIndex = findClosestStepIndex(localMaxPrice || MAX_PRICE);
	
	const handleSliderChange = (values: number[]) => {
		const [minIdx, maxIdx] = values;
		const newMin = indexToPrice(minIdx);
		const newMax = indexToPrice(maxIdx);
		// Ensure min <= max
		if (newMin <= newMax) {
			setLocalMinPrice(newMin);
			setLocalMaxPrice(newMax);
		}
	};
	
	const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || MIN_PRICE;
		const clamped = Math.max(MIN_PRICE, Math.min(value, localMaxPrice || MAX_PRICE));
		// Snap to nearest step
		const snapped = indexToPrice(findClosestStepIndex(clamped));
		setLocalMinPrice(snapped);
	};
	
	const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || MAX_PRICE;
		const clamped = Math.max(localMinPrice || MIN_PRICE, Math.min(value, MAX_PRICE));
		// Snap to nearest step
		const snapped = indexToPrice(findClosestStepIndex(clamped));
		setLocalMaxPrice(snapped);
	};
	
	const handleReset = () => {
		setLocalMinPrice(MIN_PRICE);
		setLocalMaxPrice(MAX_PRICE);
	};
	
	const handleDone = () => {
		const finalMin = localMinPrice === MIN_PRICE ? undefined : localMinPrice;
		const finalMax = localMaxPrice === MAX_PRICE ? undefined : localMaxPrice;
		onApply(finalMin, finalMax);
		setIsOpen(false);
	};
	
	const formatPrice = (price: number) => {
		return `${price.toLocaleString('en-US')}€`;
	};
	
	const displayText = minPrice || maxPrice
		? `${minPrice ? formatPrice(minPrice) : formatPrice(MIN_PRICE)} - ${maxPrice ? formatPrice(maxPrice) : formatPrice(MAX_PRICE)}`
		: "Price";
	
	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				type="button"
				variant="outline"
				onClick={() => setIsOpen(!isOpen)}
				className="w-[140px] justify-between"
			>
				<span className="truncate">{displayText}</span>
				<svg className="h-4 w-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</Button>
			
			{isOpen && (
				<div className="absolute top-full left-0 z-[1000] mt-2 w-[500px] bg-white rounded-lg border border-gray-200 shadow-2xl p-6">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-gray-900">Price</h3>
						<button
							onClick={() => setIsOpen(false)}
							className="text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="Close"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					
					{/* Histogram - Match image design with ~25 dark grey bars */}
					<div className="mb-4 h-20 flex items-end gap-[2px]">
						{HISTOGRAM_DATA.map((height, index) => {
							const position = index / HISTOGRAM_DATA.length;
							const priceAtPosition = MIN_PRICE + (MAX_PRICE - MIN_PRICE) * position;
							const isInRange = priceAtPosition >= (localMinPrice || MIN_PRICE) && priceAtPosition <= (localMaxPrice || MAX_PRICE);
							
							return (
								<div
									key={index}
									className="flex-1 rounded-t-sm transition-colors"
									style={{
										height: `${Math.max(12, height * 100)}%`,
										backgroundColor: isInRange ? '#3b82f6' : '#6b7280', // Dark grey when not selected, blue when selected
										minHeight: '12px',
										maxHeight: '100%',
									}}
								/>
							);
						})}
					</div>
					
					{/* Slider - Light grey track with white handles and dark grey borders */}
					<div className="mb-6">
						<Slider
							value={[minIndex, maxIndex]}
							onValueChange={handleSliderChange}
							min={0}
							max={PRICE_STEPS.length - 1}
							step={1}
							className="w-full [&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-gray-600 [&_[data-slot=slider-thumb]]:size-5"
						/>
					</div>
					
					{/* Price Range Display - Bold black text */}
					<div className="mb-6 text-center">
						<div className="text-2xl font-bold text-gray-900">
							{formatPrice(localMinPrice || MIN_PRICE)} – {formatPrice(localMaxPrice || MAX_PRICE)}
						</div>
					</div>
					
					{/* Input Fields */}
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Min Price
							</label>
							<Input
								type="text"
								value={localMinPrice?.toLocaleString() || ''}
								onChange={handleMinInputChange}
								placeholder="50,000"
								className="w-full"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Max Price
							</label>
							<Input
								type="text"
								value={localMaxPrice?.toLocaleString() || ''}
								onChange={handleMaxInputChange}
								placeholder="10,000,000"
								className="w-full"
							/>
						</div>
					</div>
					
					{/* Buttons */}
					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={handleReset}
							className="flex-1"
						>
							Reset
						</Button>
						<Button
							type="button"
							onClick={handleDone}
							className="flex-1 bg-red-600 hover:bg-red-700 text-white"
						>
							Done
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

