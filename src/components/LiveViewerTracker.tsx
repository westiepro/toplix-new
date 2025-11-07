"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Global component to track live viewers across all pages
 * This component registers the current session as an active viewer
 * and sends heartbeat pings to keep the session active
 */
export function LiveViewerTracker() {
	const pathname = usePathname();
	const sessionIdRef = useRef<string | null>(null);
	const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Generate or retrieve session ID (persists across page navigations)
	useEffect(() => {
		if (!sessionIdRef.current) {
			// Try to get from sessionStorage first (persists across page navigations)
			const stored = sessionStorage.getItem('liveViewerSessionId');
			if (stored) {
				sessionIdRef.current = stored;
			} else {
				sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
				sessionStorage.setItem('liveViewerSessionId', sessionIdRef.current);
			}
		}
	}, []);

	// Register as live viewer and set up heartbeat
	useEffect(() => {
		if (!sessionIdRef.current) return;

		const registerViewer = async () => {
			try {
				// Try to detect country from browser locale/timezone
				let country: string | undefined;
				try {
					// Use Intl API to get locale
					const locale = Intl.DateTimeFormat().resolvedOptions().locale;
					// Extract country code from locale (e.g., "en-US" -> "US")
					const countryMatch = locale.match(/-([A-Z]{2})$/);
					if (countryMatch) {
						country = countryMatch[1];
					}
				} catch (e) {
					// Fallback: use timezone to infer country
					try {
						const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
						// Simple timezone to country mapping (basic)
						const tzToCountry: Record<string, string> = {
							'America/New_York': 'US',
							'America/Los_Angeles': 'US',
							'America/Chicago': 'US',
							'Europe/London': 'GB',
							'Europe/Paris': 'FR',
							'Europe/Berlin': 'DE',
							'Europe/Madrid': 'ES',
							'Europe/Rome': 'IT',
							'Europe/Lisbon': 'PT',
							'Asia/Tokyo': 'JP',
							'Asia/Shanghai': 'CN',
							'Australia/Sydney': 'AU',
						};
						country = tzToCountry[timezone];
					} catch (e2) {
						// Ignore errors
					}
				}

				await fetch('/api/analytics/live-viewers', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						sessionId: sessionIdRef.current,
						path: pathname,
						userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
						country: country,
					}),
				});
			} catch (error) {
				// Silently fail - don't interrupt user experience
				console.debug('Live viewer tracking error:', error);
			}
		};

		// Register immediately when component mounts or pathname changes
		registerViewer();

		// Set up heartbeat (ping every 15 seconds to keep session active)
		heartbeatIntervalRef.current = setInterval(() => {
			registerViewer();
		}, 15000);

		// Cleanup on unmount or pathname change
		return () => {
			if (heartbeatIntervalRef.current) {
				clearInterval(heartbeatIntervalRef.current);
			}
		};
	}, [pathname]);

	// Cleanup on page unload
	useEffect(() => {
		const handleBeforeUnload = () => {
			// Note: This won't fire reliably, but the cleanup interval will handle inactive sessions
			if (heartbeatIntervalRef.current) {
				clearInterval(heartbeatIntervalRef.current);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	// This component doesn't render anything
	return null;
}

