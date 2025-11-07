"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PriceFilterModalProps {
	isOpen: boolean;
	onClose: () => void;
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
	const bins = 50;
	const data: number[] = [];
	
	// Simulate price distribution (more properties in lower ranges)
	for (let i = 0; i < bins; i++) {
		const position = i / bins;
		// Higher density in lower price ranges
		const density = Math.max(0, 1 - position * 0.7) + Math.random() * 0.3;
		data.push(Math.max(0.1, density));
	}
	
	return data;
}

const HISTOGRAM_DATA = generateHistogramData();

export function PriceFilterModal({
	isOpen,
	onClose,
	minPrice,
	maxPrice,
	onApply,
}: PriceFilterModalProps) {
	const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(minPrice || MIN_PRICE);
	const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(maxPrice || MAX_PRICE);
	
	// Update local state when props change
	useEffect(() => {
		setLocalMinPrice(minPrice || MIN_PRICE);
		setLocalMaxPrice(maxPrice || MAX_PRICE);
	}, [minPrice, maxPrice, isOpen]);
	
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
		onClose();
	};
	
	const formatPrice = (price: number) => {
		return `${price.toLocaleString('en-US')}€`;
	};
	
	if (!isOpen) return null;
	
	return (
		<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" onClick={onClose}>
			<div 
				className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-lg font-semibold text-gray-900">Price</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				
				{/* Histogram */}
				<div className="mb-4 h-20 flex items-end gap-[1px]">
					{HISTOGRAM_DATA.map((height, index) => {
						const position = index / HISTOGRAM_DATA.length;
						const priceAtPosition = MIN_PRICE + (MAX_PRICE - MIN_PRICE) * position;
						const isInRange = priceAtPosition >= (localMinPrice || MIN_PRICE) && priceAtPosition <= (localMaxPrice || MAX_PRICE);
						
						return (
							<div
								key={index}
								className="flex-1 rounded-t-sm transition-colors"
								style={{
									height: `${Math.max(8, height * 100)}%`,
									backgroundColor: isInRange ? '#3b82f6' : '#9ca3af',
									minHeight: '8px',
									maxHeight: '100%',
								}}
							/>
						);
					})}
				</div>
				
				{/* Slider */}
				<div className="mb-6">
					<Slider
						value={[minIndex, maxIndex]}
						onValueChange={handleSliderChange}
						min={0}
						max={PRICE_STEPS.length - 1}
						step={1}
						className="w-full"
					/>
				</div>
				
				{/* Price Range Display */}
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
		</div>
	);
}

