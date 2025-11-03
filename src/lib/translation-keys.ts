/**
 * Translation keys organized by namespace
 * This ensures type safety and makes it easy to find all translatable strings
 */

export const TRANSLATION_KEYS = {
	// Home page translations
	home: {
		hero: {
			title: "home.hero.title",
			subtitle: "home.hero.subtitle",
			searchPlaceholder: "home.hero.searchPlaceholder",
			searchHint: "home.hero.searchHint",
		},
		nav: {
			buy: "home.nav.buy",
			rent: "home.nav.rent",
			sell: "home.nav.sell",
		},
		features: {
			premium: {
				title: "home.features.premium.title",
				description: "home.features.premium.description",
			},
			maps: {
				title: "home.features.maps.title",
				description: "home.features.maps.description",
			},
			agents: {
				title: "home.features.agents.title",
				description: "home.features.agents.description",
			},
		},
	},

	// Navbar translations
	navbar: {
		brand: "navbar.brand",
		explore: "navbar.explore",
		favorites: "navbar.favorites",
		myAccount: "navbar.myAccount",
		signIn: "navbar.signIn",
		signOut: "navbar.signOut",
		dashboard: "navbar.dashboard",
		guestBanner: "navbar.guestBanner",
		guestSignIn: "navbar.guestSignIn",
	},

	// Search and filters
	search: {
		location: "search.location",
		priceRange: "search.priceRange",
		propertyType: "search.propertyType",
		bedrooms: "search.bedrooms",
		bathrooms: "search.bathrooms",
		search: "search.search",
		filters: "search.filters",
		applyFilters: "search.applyFilters",
		clearFilters: "search.clearFilters",
	},

	// Filters
	filters: {
		searchCityOrAddress: "filters.searchCityOrAddress",
		minPrice: "filters.minPrice",
		maxPrice: "filters.maxPrice",
		beds: "filters.beds",
		baths: "filters.baths",
		propertyType: "filters.propertyType",
		minArea: "filters.minArea",
		noMin: "filters.noMin",
		any: "filters.any",
		apartment: "filters.apartment",
		villa: "filters.villa",
		townhouse: "filters.townhouse",
		land: "filters.land",
		commercial: "filters.commercial",
	},

	// Property card
	property: {
		beds: "property.beds",
		baths: "property.baths",
		sqft: "property.sqft",
		viewDetails: "property.viewDetails",
		addToFavorites: "property.addToFavorites",
		removeFromFavorites: "property.removeFromFavorites",
		forSale: "property.forSale",
		forRent: "property.forRent",
	},

	// Property detail page
	propertyDetail: {
		notFound: "propertyDetail.notFound",
		bd: "propertyDetail.bd",
		ba: "propertyDetail.ba",
		sqft: "propertyDetail.sqft",
		favorite: "propertyDetail.favorite",
		share: "propertyDetail.share",
		description: "propertyDetail.description",
		defaultDescription: "propertyDetail.defaultDescription",
		features: "propertyDetail.features",
		location: "propertyDetail.location",
		contactAgent: "propertyDetail.contactAgent",
		scheduleViewing: "propertyDetail.scheduleViewing",
		requestInfo: "propertyDetail.requestInfo",
		propertyId: "propertyDetail.propertyId",
		listedBy: "propertyDetail.listedBy",
		listingDate: "propertyDetail.listingDate",
		propertyType: "propertyDetail.propertyType",
		yearBuilt: "propertyDetail.yearBuilt",
		lotSize: "propertyDetail.lotSize",
		parking: "propertyDetail.parking",
		heating: "propertyDetail.heating",
		cooling: "propertyDetail.cooling",
		appliances: "propertyDetail.appliances",
		flooring: "propertyDetail.flooring",
		view: "propertyDetail.view",
		neighborhood: "propertyDetail.neighborhood",
		schools: "propertyDetail.schools",
		shopping: "propertyDetail.shopping",
		dining: "propertyDetail.dining",
		transportation: "propertyDetail.transportation",
	},

	// Property listings page
	listings: {
		property: "listings.property",
		properties: "listings.properties",
		inCity: "listings.inCity",
		loadingProperties: "listings.loadingProperties",
		noPropertiesFound: "listings.noPropertiesFound",
		tryAdjustingFilters: "listings.tryAdjustingFilters",
		showing: "listings.showing",
		results: "listings.results",
		sortBy: "listings.sortBy",
		priceHighToLow: "listings.priceHighToLow",
		priceLowToHigh: "listings.priceLowToHigh",
		newest: "listings.newest",
		oldest: "listings.oldest",
		featured: "listings.featured",
	},

	// Share modal
	share: {
		title: "share.title",
		inCity: "share.inCity",
		copyLink: "share.copyLink",
		copyLinkDescription: "share.copyLinkDescription",
		shareViaEmail: "share.shareViaEmail",
		shareViaEmailDescription: "share.shareViaEmailDescription",
		shareOnSocialMedia: "share.shareOnSocialMedia",
		facebook: "share.facebook",
		twitter: "share.twitter",
		linkedin: "share.linkedin",
		whatsapp: "share.whatsapp",
		close: "share.close",
		linkCopied: "share.linkCopied",
		linkCopiedDescription: "share.linkCopiedDescription",
		sharedSuccessfully: "share.sharedSuccessfully",
		failedToCopyLink: "share.failedToCopyLink",
		openingEmailClient: "share.openingEmailClient",
		openingFacebook: "share.openingFacebook",
		openingTwitter: "share.openingTwitter",
		openingLinkedIn: "share.openingLinkedIn",
		openingWhatsApp: "share.openingWhatsApp",
		checkOutProperty: "share.checkOutProperty",
		viewProperty: "share.viewProperty",
		discoverMore: "share.discoverMore",
	},

	// Admin dashboard
	admin: {
		dashboard: {
			title: "admin.dashboard.title",
			overview: "admin.dashboard.overview",
			totalVisitors: "admin.dashboard.totalVisitors",
			pageViews: "admin.dashboard.pageViews",
			totalProperties: "admin.dashboard.totalProperties",
			activeAgents: "admin.dashboard.activeAgents",
			export: "admin.dashboard.export",
			lastUpdated: "admin.dashboard.lastUpdated",
			analytics: "admin.dashboard.analytics",
			properties: "admin.dashboard.properties",
			agents: "admin.dashboard.agents",
			visitorsOverTime: "admin.dashboard.visitorsOverTime",
			trafficSources: "admin.dashboard.trafficSources",
			propertiesByCity: "admin.dashboard.propertiesByCity",
			propertiesByPrice: "admin.dashboard.propertiesByPrice",
			avgPrice: "admin.dashboard.avgPrice",
			avgViews: "admin.dashboard.avgViews",
			topProperties: "admin.dashboard.topProperties",
			agentPerformance: "admin.dashboard.agentPerformance",
		},
		nav: {
			dashboard: "admin.nav.dashboard",
			properties: "admin.nav.properties",
			agents: "admin.nav.agents",
			analytics: "admin.nav.analytics",
			settings: "admin.nav.settings",
			translations: "admin.nav.translations",
		},
		translations: {
			title: "admin.translations.title",
			description: "admin.translations.description",
			key: "admin.translations.key",
			namespace: "admin.translations.namespace",
			search: "admin.translations.search",
			filterByNamespace: "admin.translations.filterByNamespace",
			allNamespaces: "admin.translations.allNamespaces",
			autoTranslated: "admin.translations.autoTranslated",
			manuallyEdited: "admin.translations.manuallyEdited",
			edit: "admin.translations.edit",
			save: "admin.translations.save",
			cancel: "admin.translations.cancel",
			autoTranslateAll: "admin.translations.autoTranslateAll",
			export: "admin.translations.export",
			import: "admin.translations.import",
			translating: "admin.translations.translating",
			translationProgress: "admin.translations.translationProgress",
			missingTranslations: "admin.translations.missingTranslations",
		},
	},

	// Favorites
	favorites: {
		noFavoritesYet: "favorites.noFavoritesYet",
		clickToSave: "favorites.clickToSave",
		moreFavorites: "favorites.moreFavorites",
		viewAll: "favorites.viewAll",
		bd: "favorites.bd",
		ba: "favorites.ba",
	},

	// Login Modal
	login: {
		title: "login.title",
		continueWithGoogle: "login.continueWithGoogle",
		continueWithApple: "login.continueWithApple",
		orEnterEmail: "login.orEnterEmail",
		emailPlaceholder: "login.emailPlaceholder",
		passwordPlaceholder: "login.passwordPlaceholder",
		continueWithEmail: "login.continueWithEmail",
		continueAsGuest: "login.continueAsGuest",
		signIn: "login.signIn",
		signingIn: "login.signingIn",
		back: "login.back",
		pleaseWait: "login.pleaseWait",
		close: "login.close",
		enterValidEmail: "login.enterValidEmail",
		enterPassword: "login.enterPassword",
		signedInSuccess: "login.signedInSuccess",
		welcomeLoggedIn: "login.welcomeLoggedIn",
		browsingAsGuest: "login.browsingAsGuest",
	},

	// Common
	common: {
		loading: "common.loading",
		error: "common.error",
		success: "common.success",
		save: "common.save",
		cancel: "common.cancel",
		delete: "common.delete",
		edit: "common.edit",
		close: "common.close",
		confirm: "common.confirm",
		yes: "common.yes",
		no: "common.no",
	},
} as const;

// English translations (source language)
export const ENGLISH_TRANSLATIONS: Record<string, string> = {
	// Home
	"home.hero.title": "Find Your Dream Home",
	"home.hero.subtitle": "Discover beautiful properties in southern Europe",
	"home.hero.searchPlaceholder": "Search by city or location...",
	"home.hero.searchHint": 'Try searching "Lagos", "Faro", or "Albufeira"',
	"home.nav.buy": "Buy",
	"home.nav.rent": "Rent",
	"home.nav.sell": "Sell",
	"home.features.premium.title": "Premium Properties",
	"home.features.premium.description": "Handpicked villas, apartments, and traditional homes throughout Portugal",
	"home.features.maps.title": "Interactive Maps",
	"home.features.maps.description": "Explore properties with our advanced map search and filtering tools",
	"home.features.agents.title": "Expert Agents",
	"home.features.agents.description": "Work with experienced local agents who know the market inside out",

	// Navbar
	"navbar.brand": "NextEstate",
	"navbar.explore": "Explore",
	"navbar.favorites": "Favorites",
	"navbar.myAccount": "My Account",
	"navbar.signIn": "Sign In",
	"navbar.signOut": "Sign Out",
	"navbar.dashboard": "Dashboard",
	"navbar.guestBanner": "Browsing as guest - Sign in to save favorites and access all features",
	"navbar.guestSignIn": "Sign In",

	// Search
	"search.location": "Location",
	"search.priceRange": "Price Range",
	"search.propertyType": "Property Type",
	"search.bedrooms": "Bedrooms",
	"search.bathrooms": "Bathrooms",
	"search.search": "Search",
	"search.filters": "Filters",
	"search.applyFilters": "Apply Filters",
	"search.clearFilters": "Clear Filters",

	// Filters
	"filters.searchCityOrAddress": "Search city or address",
	"filters.minPrice": "Min price",
	"filters.maxPrice": "Max price",
	"filters.beds": "Beds",
	"filters.baths": "Baths",
	"filters.propertyType": "Property type",
	"filters.minArea": "Min area",
	"filters.noMin": "No min",
	"filters.any": "Any",
	"filters.apartment": "Apartment",
	"filters.villa": "Villa",
	"filters.townhouse": "Townhouse",
	"filters.land": "Land",
	"filters.commercial": "Commercial",

	// Property
	"property.beds": "beds",
	"property.baths": "baths",
	"property.sqft": "sqft",
	"property.viewDetails": "View Details",
	"property.addToFavorites": "Add to Favorites",
	"property.removeFromFavorites": "Remove from Favorites",
	"property.forSale": "For Sale",
	"property.forRent": "For Rent",

	// Property Detail
	"propertyDetail.notFound": "Property not found",
	"propertyDetail.bd": "bd",
	"propertyDetail.ba": "ba",
	"propertyDetail.sqft": "sqft",
	"propertyDetail.favorite": "Favorite",
	"propertyDetail.share": "Share",
	"propertyDetail.description": "Description",
	"propertyDetail.defaultDescription": "Beautiful home in the heart of the city with modern finishes and plenty of natural light.",
	"propertyDetail.features": "Features",
	"propertyDetail.location": "Location",
	"propertyDetail.contactAgent": "Contact Agent",
	"propertyDetail.scheduleViewing": "Schedule Viewing",
	"propertyDetail.requestInfo": "Request Information",
	"propertyDetail.propertyId": "Property ID",
	"propertyDetail.listedBy": "Listed by",
	"propertyDetail.listingDate": "Listing Date",
	"propertyDetail.propertyType": "Property Type",
	"propertyDetail.yearBuilt": "Year Built",
	"propertyDetail.lotSize": "Lot Size",
	"propertyDetail.parking": "Parking",
	"propertyDetail.heating": "Heating",
	"propertyDetail.cooling": "Cooling",
	"propertyDetail.appliances": "Appliances",
	"propertyDetail.flooring": "Flooring",
	"propertyDetail.view": "View",
	"propertyDetail.neighborhood": "Neighborhood",
	"propertyDetail.schools": "Schools",
	"propertyDetail.shopping": "Shopping",
	"propertyDetail.dining": "Dining",
	"propertyDetail.transportation": "Transportation",

	// Property Listings
	"listings.property": "Property",
	"listings.properties": "Properties",
	"listings.inCity": "in",
	"listings.loadingProperties": "Loading properties...",
	"listings.noPropertiesFound": "No properties found",
	"listings.tryAdjustingFilters": "Try adjusting your filters or search area",
	"listings.showing": "Showing",
	"listings.results": "results",
	"listings.sortBy": "Sort by",
	"listings.priceHighToLow": "Price: High to Low",
	"listings.priceLowToHigh": "Price: Low to High",
	"listings.newest": "Newest",
	"listings.oldest": "Oldest",
	"listings.featured": "Featured",

	// Share Modal
	"share.title": "Share Property",
	"share.inCity": "in",
	"share.copyLink": "Copy Link",
	"share.copyLinkDescription": "Copy property URL to clipboard",
	"share.shareViaEmail": "Share via Email",
	"share.shareViaEmailDescription": "Send property link by email",
	"share.shareOnSocialMedia": "Share on Social Media",
	"share.facebook": "Facebook",
	"share.twitter": "Twitter",
	"share.linkedin": "LinkedIn",
	"share.whatsapp": "WhatsApp",
	"share.close": "Close",
	"share.linkCopied": "Link copied to clipboard!",
	"share.linkCopiedDescription": "Property link has been copied to clipboard",
	"share.sharedSuccessfully": "Shared successfully!",
	"share.failedToCopyLink": "Failed to copy link",
	"share.openingEmailClient": "Opening email client...",
	"share.openingFacebook": "Opening Facebook...",
	"share.openingTwitter": "Opening Twitter...",
	"share.openingLinkedIn": "Opening LinkedIn...",
	"share.openingWhatsApp": "Opening WhatsApp...",
	"share.checkOutProperty": "Check out this property",
	"share.viewProperty": "View property",
	"share.discoverMore": "Discover more properties on Toplix!",

	// Admin Dashboard
	"admin.dashboard.title": "Dashboard",
	"admin.dashboard.overview": "Overview of your real estate portal",
	"admin.dashboard.totalVisitors": "Total Visitors",
	"admin.dashboard.pageViews": "Page Views",
	"admin.dashboard.totalProperties": "Total Properties",
	"admin.dashboard.activeAgents": "Active Agents",
	"admin.dashboard.export": "Export",
	"admin.dashboard.lastUpdated": "Last updated",
	"admin.dashboard.analytics": "Analytics",
	"admin.dashboard.properties": "Properties",
	"admin.dashboard.agents": "Agents",
	"admin.dashboard.visitorsOverTime": "Visitors Over Time",
	"admin.dashboard.trafficSources": "Traffic Sources",
	"admin.dashboard.propertiesByCity": "Properties by City",
	"admin.dashboard.propertiesByPrice": "Properties by Price Range",
	"admin.dashboard.avgPrice": "Average Price",
	"admin.dashboard.avgViews": "Average Views",
	"admin.dashboard.topProperties": "Top Performing Properties",
	"admin.dashboard.agentPerformance": "Agent Performance",

	// Admin Nav
	"admin.nav.dashboard": "Dashboard",
	"admin.nav.properties": "Properties",
	"admin.nav.agents": "Agents",
	"admin.nav.analytics": "Analytics",
	"admin.nav.settings": "Settings",
	"admin.nav.translations": "Translations",

	// Admin Translations
	"admin.translations.title": "Translation Management",
	"admin.translations.description": "Manage translations for all languages",
	"admin.translations.key": "Key",
	"admin.translations.namespace": "Namespace",
	"admin.translations.search": "Search translations...",
	"admin.translations.filterByNamespace": "Filter by namespace",
	"admin.translations.allNamespaces": "All Namespaces",
	"admin.translations.autoTranslated": "Auto-translated",
	"admin.translations.manuallyEdited": "Manually edited",
	"admin.translations.edit": "Edit",
	"admin.translations.save": "Save",
	"admin.translations.cancel": "Cancel",
	"admin.translations.autoTranslateAll": "Auto-translate all missing",
	"admin.translations.export": "Export",
	"admin.translations.import": "Import",
	"admin.translations.translating": "Translating...",
	"admin.translations.translationProgress": "Translation Progress",
	"admin.translations.missingTranslations": "missing translations",

	// Favorites
	"favorites.noFavoritesYet": "No favorites yet",
	"favorites.clickToSave": "Click the heart icon on properties to save them here",
	"favorites.moreFavorites": "more favorites",
	"favorites.viewAll": "View All Favorites",
	"favorites.bd": "bd",
	"favorites.ba": "ba",

	// Login Modal
	"login.title": "Sign in or Create Account",
	"login.continueWithGoogle": "Continue with Google",
	"login.continueWithApple": "Continue with Apple",
	"login.orEnterEmail": "or enter your e-mail",
	"login.emailPlaceholder": "E-mail",
	"login.passwordPlaceholder": "Password",
	"login.continueWithEmail": "Continue with e-mail",
	"login.continueAsGuest": "Continue as guest",
	"login.signIn": "Sign In",
	"login.signingIn": "Signing in...",
	"login.back": "Back",
	"login.pleaseWait": "Please wait...",
	"login.close": "Close",
	"login.enterValidEmail": "Please enter a valid email address",
	"login.enterPassword": "Please enter your password",
	"login.signedInSuccess": "Signed in successfully!",
	"login.welcomeLoggedIn": "Welcome! You're now logged in.",
	"login.browsingAsGuest": "Browsing as guest",

	// Common
	"common.loading": "Loading...",
	"common.error": "Error",
	"common.success": "Success",
	"common.save": "Save",
	"common.cancel": "Cancel",
	"common.delete": "Delete",
	"common.edit": "Edit",
	"common.close": "Close",
	"common.confirm": "Confirm",
	"common.yes": "Yes",
	"common.no": "No",
};

/**
 * Get all translation keys as a flat array
 */
export function getAllTranslationKeys(): string[] {
	return Object.keys(ENGLISH_TRANSLATIONS);
}

/**
 * Get all namespaces
 */
export function getAllNamespaces(): string[] {
	const namespaces = new Set<string>();
	Object.keys(ENGLISH_TRANSLATIONS).forEach((key) => {
		const namespace = key.split(".")[0];
		namespaces.add(namespace);
	});
	return Array.from(namespaces).sort();
}

/**
 * Get translation keys by namespace
 */
export function getKeysByNamespace(namespace: string): string[] {
	return Object.keys(ENGLISH_TRANSLATIONS).filter((key) => key.startsWith(`${namespace}.`));
}

