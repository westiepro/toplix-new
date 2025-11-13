"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface BedBathsFilterDropdownProps {
	beds?: number;
	baths?: number;
	onApply: (beds: number | undefined, baths: number | undefined) => void;
}

const BED_OPTIONS = [
	{ label: "Any", value: undefined },
	{ label: "Studio", value: 0 },
	{ label: "1", value: 1 },
	{ label: "2", value: 2 },
	{ label: "3", value: 3 },
	{ label: "4", value: 4 },
	{ label: "5+", value: 5 },
];

const BATH_OPTIONS = [
	{ label: "Any", value: undefined },
	{ label: "1+", value: 1 },
	{ label: "1.5+", value: 1.5 },
	{ label: "2+", value: 2 },
	{ label: "2.5+", value: 2.5 },
	{ label: "3+", value: 3 },
	{ label: "4+", value: 4 },
];

export function BedBathsFilterDropdown({
	beds,
	baths,
	onApply,
}: BedBathsFilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [localBeds, setLocalBeds] = useState<number | undefined>(beds);
	const [localBaths, setLocalBaths] = useState<number | undefined>(baths);
	const dropdownRef = useRef<HTMLDivElement>(null);
	
	// Update local state when props change
	useEffect(() => {
		setLocalBeds(beds);
		setLocalBaths(baths);
	}, [beds, baths]);
	
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
	
	const handleReset = () => {
		setLocalBeds(undefined);
		setLocalBaths(undefined);
	};
	
	const handleDone = () => {
		onApply(localBeds, localBaths);
		setIsOpen(false);
	};
	
	const getDisplayText = () => {
		const bedText = localBeds !== undefined 
			? BED_OPTIONS.find(opt => opt.value === localBeds)?.label || `${localBeds}+`
			: "Any";
		const bathText = localBaths !== undefined
			? BATH_OPTIONS.find(opt => opt.value === localBaths)?.label || `${localBaths}+`
			: "Any";
		
		if (bedText === "Any" && bathText === "Any") {
			return "Bed/Baths";
		}
		return `${bedText} bed${bedText !== "1" ? "s" : ""} / ${bathText} bath${bathText !== "1+" ? "s" : ""}`;
	};
	
	return (
		<div className="relative" ref={dropdownRef}>
			<Button
				type="button"
				variant="outline"
				onClick={() => setIsOpen(!isOpen)}
				className="w-[140px] justify-between"
			>
				<span className="truncate">{getDisplayText()}</span>
				<svg className="h-4 w-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</Button>
			
			{isOpen && (
				<div className="absolute top-full left-0 z-[1000] mt-2 w-[500px] bg-white rounded-lg border border-gray-200 shadow-2xl p-6">
					{/* Beds Section */}
					<div className="mb-8">
						<h3 className="text-lg font-bold text-gray-900 mb-1">Beds</h3>
						<p className="text-sm text-gray-400 mb-4">Tap two numbers to select a range.</p>
						<div className="flex items-center gap-0">
							{BED_OPTIONS.map((option, index) => {
								const isSelected = localBeds === option.value;
								const isLast = index === BED_OPTIONS.length - 1;
								
								return (
									<div key={option.value ?? 'any'} className="flex items-center">
										<button
											type="button"
											onClick={() => setLocalBeds(option.value)}
											className={`
												px-4 py-2 rounded-lg font-medium text-sm transition-all
												${isSelected 
													? 'border-2 border-teal-500 text-teal-600 bg-white' 
													: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50'
												}
												${index === 0 ? 'rounded-r-none' : ''}
												${isLast ? 'rounded-l-none' : ''}
												${!isLast && index > 0 ? 'rounded-none' : ''}
											`}
										>
											{option.label}
										</button>
										{!isLast && index < BED_OPTIONS.length - 1 && (
											<div className="h-6 w-px bg-gray-300 mx-0" />
										)}
									</div>
								);
							})}
						</div>
					</div>
					
					{/* Baths Section */}
					<div className="mb-8">
						<h3 className="text-lg font-bold text-gray-900 mb-4">Baths</h3>
						<div className="flex items-center gap-0">
							{BATH_OPTIONS.map((option, index) => {
								const isSelected = localBaths === option.value;
								const isLast = index === BATH_OPTIONS.length - 1;
								
								return (
									<div key={option.value ?? 'any'} className="flex items-center">
										<button
											type="button"
											onClick={() => setLocalBaths(option.value)}
											className={`
												px-4 py-2 rounded-lg font-medium text-sm transition-all
												${isSelected 
													? 'border-2 border-teal-500 text-teal-600 bg-white' 
													: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50'
												}
												${index === 0 ? 'rounded-r-none' : ''}
												${isLast ? 'rounded-l-none' : ''}
												${!isLast && index > 0 ? 'rounded-none' : ''}
											`}
										>
											{option.label}
										</button>
										{!isLast && index < BATH_OPTIONS.length - 1 && (
											<div className="h-6 w-px bg-gray-300 mx-0" />
										)}
									</div>
								);
							})}
						</div>
					</div>
					
					{/* Action Buttons */}
					<div className="flex items-center justify-end gap-4">
						<button
							type="button"
							onClick={handleReset}
							className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
						>
							Reset
						</button>
						<Button
							type="button"
							onClick={handleDone}
							className="bg-red-600 hover:bg-red-700 text-white px-6"
						>
							Done
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}










