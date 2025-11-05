// Property features/amenities configuration

export const AVAILABLE_FEATURES = [
	"marinaViews",
	"undergroundParking",
	"airConditioning",
	"liftAccess",
	"concierge24h",
	"wineFridge",
	"securitySystem",
	"largeTerrace",
	"storageRoom",
	"doubleGlazing",
	"frontLineLocation",
	"communalPool",
	"underfloorHeating",
	"fiberInternet",
] as const;

export type FeatureKey = typeof AVAILABLE_FEATURES[number];

// Feature display names (for admin panel)
export const FEATURE_LABELS: Record<FeatureKey, string> = {
	marinaViews: "Marina Views",
	undergroundParking: "Underground Parking",
	airConditioning: "Air Conditioning",
	liftAccess: "Lift Access",
	concierge24h: "Concierge 24h",
	wineFridge: "Wine Fridge",
	securitySystem: "Security System",
	largeTerrace: "Large Terrace",
	storageRoom: "Storage Room",
	doubleGlazing: "Double Glazing",
	frontLineLocation: "Front Line Location",
	communalPool: "Communal Pool",
	underfloorHeating: "Underfloor Heating",
	fiberInternet: "Fiber Internet",
};

