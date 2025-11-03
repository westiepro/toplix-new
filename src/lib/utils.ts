import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in full format: €350,000
export function formatPriceFull(price: number): string {
  return `€${price.toLocaleString()}`;
}

// Format price in short format: €350K
export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) return `€${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `€${Math.round(price / 1_000)}K`;
  return `€${price}`;
}
