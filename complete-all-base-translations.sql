-- Complete Translations for All Languages
-- Generated: 2025-11-06T20:12:31.038Z
-- Total keys per language: 297
-- Languages: EN, PT, ES
-- Run this in your Supabase SQL Editor to get all languages to 100%

-- ============================================

-- EN TRANSLATIONS

-- ============================================


INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.title', 'en', 'Find Your Dream Home', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.subtitle', 'en', 'Discover beautiful properties in southern Europe', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchPlaceholder', 'en', 'Search by city or location...', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchHint', 'en', 'Try searching "Lagos", "Faro", or "Albufeira"', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.buy', 'en', 'Buy', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.rent', 'en', 'Rent', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.sell', 'en', 'Sell', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.title', 'en', 'Premium Properties', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.description', 'en', 'Handpicked villas, apartments, and traditional homes throughout Portugal', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.title', 'en', 'Interactive Maps', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.description', 'en', 'Explore properties with our advanced map search and filtering tools', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.title', 'en', 'Expert Agents', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.description', 'en', 'Work with experienced local agents who know the market inside out', 'home', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.brand', 'en', 'NextEstate', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.explore', 'en', 'Explore', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.favorites', 'en', 'Favorites', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.myAccount', 'en', 'My Account', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signIn', 'en', 'Sign In', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signOut', 'en', 'Sign Out', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.dashboard', 'en', 'My Dashboard', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestBanner', 'en', 'Browsing as guest - Sign in to save favorites and access all features', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestSignIn', 'en', 'Sign In', 'navbar', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.location', 'en', 'Location', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.priceRange', 'en', 'Price Range', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.propertyType', 'en', 'Property Type', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bedrooms', 'en', 'Bedrooms', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bathrooms', 'en', 'Bathrooms', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.search', 'en', 'Search', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.filters', 'en', 'Filters', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.applyFilters', 'en', 'Apply Filters', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.clearFilters', 'en', 'Clear Filters', 'search', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.searchCityOrAddress', 'en', 'Search city or address', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minPrice', 'en', 'Min price', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.maxPrice', 'en', 'Max price', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.beds', 'en', 'Beds', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.baths', 'en', 'Baths', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.propertyType', 'en', 'Property type', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minArea', 'en', 'Min area', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.noMin', 'en', 'No min', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.any', 'en', 'Any', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.apartment', 'en', 'Apartment', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.villa', 'en', 'Villa', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.townhouse', 'en', 'Townhouse', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.land', 'en', 'Land', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.commercial', 'en', 'Commercial', 'filters', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.beds', 'en', 'beds', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.baths', 'en', 'baths', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.sqft', 'en', 'sqft', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photo', 'en', 'photo', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photos', 'en', 'photos', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.viewDetails', 'en', 'View Details', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.addToFavorites', 'en', 'Add to Favorites', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.removeFromFavorites', 'en', 'Remove from Favorites', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forSale', 'en', 'For Sale', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forRent', 'en', 'For Rent', 'property', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.notFound', 'en', 'Property not found', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bd', 'en', 'bd', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.ba', 'en', 'ba', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.sqft', 'en', 'sqft', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.favorite', 'en', 'Favorite', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.share', 'en', 'Share', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.description', 'en', 'Description', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.defaultDescription', 'en', 'Beautiful home in the heart of the city with modern finishes and plenty of natural light.', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.features', 'en', 'Features', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.location', 'en', 'Location', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.contactAgent', 'en', 'Contact Agent', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.scheduleViewing', 'en', 'Schedule Viewing', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.requestInfo', 'en', 'Request Information', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyId', 'en', 'Property ID', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listedBy', 'en', 'Listed by', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listingDate', 'en', 'Listing Date', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyType', 'en', 'Property Type', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.yearBuilt', 'en', 'Year Built', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.lotSize', 'en', 'Lot Size', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.parking', 'en', 'Parking', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.heating', 'en', 'Heating', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.cooling', 'en', 'Cooling', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.appliances', 'en', 'Appliances', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.flooring', 'en', 'Flooring', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.view', 'en', 'View', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.neighborhood', 'en', 'Neighborhood', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.schools', 'en', 'Schools', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.shopping', 'en', 'Shopping', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.dining', 'en', 'Dining', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.transportation', 'en', 'Transportation', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.country', 'en', 'Country', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bedrooms', 'en', 'Bedrooms', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bathrooms', 'en', 'Bathrooms', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.area', 'en', 'Area', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.aboutThisProperty', 'en', 'About This Property', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyFeatures', 'en', 'Property Features', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.marinaViews', 'en', 'Marina Views', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.undergroundParking', 'en', 'Underground Parking', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.airConditioning', 'en', 'Air Conditioning', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.liftAccess', 'en', 'Lift Access', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.concierge24h', 'en', 'Concierge 24h', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.wineFridge', 'en', 'Wine Fridge', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.securitySystem', 'en', 'Security System', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.largeTerrace', 'en', 'Large Terrace', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.storageRoom', 'en', 'Storage Room', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.doubleGlazing', 'en', 'Double Glazing', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.frontLineLocation', 'en', 'Front Line Location', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.communalPool', 'en', 'Communal Pool', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.underfloorHeating', 'en', 'Underfloor Heating', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.fiberInternet', 'en', 'Fiber Internet', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.locationDescription', 'en', 'This property is located in the heart of {{city}}, offering easy access to local amenities, beaches, and attractions.', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.inTheHeartOf', 'en', 'in the heart of', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.offeringEasyAccess', 'en', 'offering easy access to', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.localAmenities', 'en', 'local amenities', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.beachesAndAttractions', 'en', 'beaches, and attractions', 'propertyDetail', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.property', 'en', 'Property', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.properties', 'en', 'Properties', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.inCity', 'en', 'in', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.loadingProperties', 'en', 'Loading properties...', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.noPropertiesFound', 'en', 'No properties found', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.tryAdjustingFilters', 'en', 'Try adjusting your filters or search area', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.showing', 'en', 'Showing', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.results', 'en', 'results', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.sortBy', 'en', 'Sort by', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceHighToLow', 'en', 'Price: High to Low', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceLowToHigh', 'en', 'Price: Low to High', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.newest', 'en', 'Newest', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.oldest', 'en', 'Oldest', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.featured', 'en', 'Featured', 'listings', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.title', 'en', 'Share Property', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.inCity', 'en', 'in', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLink', 'en', 'Copy Link', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLinkDescription', 'en', 'Copy property URL to clipboard', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmail', 'en', 'Share via Email', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmailDescription', 'en', 'Send property link by email', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareOnSocialMedia', 'en', 'Share on Social Media', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.facebook', 'en', 'Facebook', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.twitter', 'en', 'Twitter', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkedin', 'en', 'LinkedIn', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.whatsapp', 'en', 'WhatsApp', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.close', 'en', 'Close', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopied', 'en', 'Link copied to clipboard!', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopiedDescription', 'en', 'Property link has been copied to clipboard', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.sharedSuccessfully', 'en', 'Shared successfully!', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.failedToCopyLink', 'en', 'Failed to copy link', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingEmailClient', 'en', 'Opening email client...', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingFacebook', 'en', 'Opening Facebook...', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingTwitter', 'en', 'Opening Twitter...', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingLinkedIn', 'en', 'Opening LinkedIn...', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingWhatsApp', 'en', 'Opening WhatsApp...', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.checkOutProperty', 'en', 'Check out this property', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.viewProperty', 'en', 'View property', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.discoverMore', 'en', 'Discover more properties on Toplix!', 'share', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.title', 'en', 'Dashboard', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.overview', 'en', 'Overview of your real estate portal', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalVisitors', 'en', 'Total Visitors', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.pageViews', 'en', 'Page Views', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalProperties', 'en', 'Total Properties', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.activeAgents', 'en', 'Active Agents', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.export', 'en', 'Export', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.lastUpdated', 'en', 'Last updated', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.analytics', 'en', 'Analytics', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.properties', 'en', 'Properties', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agents', 'en', 'Agents', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.visitorsOverTime', 'en', 'Visitors Over Time', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.trafficSources', 'en', 'Traffic Sources', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByCity', 'en', 'Properties by City', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByPrice', 'en', 'Properties by Price Range', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgPrice', 'en', 'Average Price', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgViews', 'en', 'Average Views', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.topProperties', 'en', 'Top Performing Properties', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agentPerformance', 'en', 'Agent Performance', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.dashboard', 'en', 'Dashboard', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.properties', 'en', 'Properties', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.agents', 'en', 'Agents', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.analytics', 'en', 'Analytics', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.settings', 'en', 'Settings', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.translations', 'en', 'Translations', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.title', 'en', 'Translation Management', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.description', 'en', 'Manage translations for all languages', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.key', 'en', 'Key', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.namespace', 'en', 'Namespace', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.search', 'en', 'Search translations...', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.filterByNamespace', 'en', 'Filter by namespace', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.allNamespaces', 'en', 'All Namespaces', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslated', 'en', 'Auto-translated', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.manuallyEdited', 'en', 'Manually edited', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.edit', 'en', 'Edit', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.save', 'en', 'Save', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.cancel', 'en', 'Cancel', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslateAll', 'en', 'Auto-translate all missing', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.export', 'en', 'Export', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.import', 'en', 'Import', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translating', 'en', 'Translating...', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translationProgress', 'en', 'Translation Progress', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.missingTranslations', 'en', 'missing translations', 'admin', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.title', 'en', 'Contact Agent', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.namePlaceholder', 'en', 'Name', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.emailPlaceholder', 'en', 'Email', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.phonePlaceholder', 'en', 'Phone', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.messagePlaceholder', 'en', 'Message', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.defaultMessage', 'en', 'I''m interested in {{address}}. Please send me more information.', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sendButton', 'en', 'Send Message', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sending', 'en', 'Sending...', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successTitle', 'en', 'Message sent successfully!', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successDescription', 'en', 'An agent will contact you soon.', 'contact', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.noFavoritesYet', 'en', 'No favorites yet', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.clickToSave', 'en', 'Click the heart icon on properties to save them here', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.moreFavorites', 'en', 'more favorites', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.viewAll', 'en', 'View All Favorites', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.bd', 'en', 'bd', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.ba', 'en', 'ba', 'favorites', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.title', 'en', 'Sign in or Create Account', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithGoogle', 'en', 'Continue with Google', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithApple', 'en', 'Continue with Apple', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.orEnterEmail', 'en', 'or enter your e-mail', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.emailPlaceholder', 'en', 'E-mail', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.passwordPlaceholder', 'en', 'Password', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithEmail', 'en', 'Continue with e-mail', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueAsGuest', 'en', 'Continue as guest', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signIn', 'en', 'Sign In', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signingIn', 'en', 'Signing in...', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.back', 'en', 'Back', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.pleaseWait', 'en', 'Please wait...', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.close', 'en', 'Close', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterValidEmail', 'en', 'Please enter a valid email address', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterPassword', 'en', 'Please enter your password', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signedInSuccess', 'en', 'Signed in successfully!', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.welcomeLoggedIn', 'en', 'Welcome! You''re now logged in.', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.browsingAsGuest', 'en', 'Browsing as guest', 'login', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.title', 'en', 'My Dashboard', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.welcomeBack', 'en', 'Welcome back', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.signOut', 'en', 'Sign Out', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.myFavourites', 'en', 'My Favourites', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.savedSearches', 'en', 'Saved Searches', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.recentlyViewed', 'en', 'Recently Viewed', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.inbox', 'en', 'Inbox', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sellYourProperty', 'en', 'Sell your property', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.settings', 'en', 'Settings', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLove', 'en', 'Properties you love', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.beds', 'en', 'beds', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.baths', 'en', 'baths', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sqft', 'en', 'sq ft', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavourites', 'en', 'No favourites yet', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescription', 'en', 'Start adding properties to your favourites to see them here', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.startBrowsing', 'en', 'Start Browsing', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearches', 'en', 'No saved searches', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescription', 'en', 'Save your search criteria to quickly find properties later', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createSearch', 'en', 'Create Search', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViews', 'en', 'No recently viewed properties', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescription', 'en', 'Properties you view will appear here', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.exploreProperties', 'en', 'Explore Properties', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingFavorites', 'en', 'Loading your favorites...', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingRecentlyViewed', 'en', 'Loading recently viewed...', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescriptionFull', 'en', 'Start browsing properties and click the heart icon to save your favourites here for easy access.', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.browseProperties', 'en', 'Browse Properties', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.yourCustomSearchFilters', 'en', 'Your custom search filters', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescriptionFull', 'en', 'Save your search criteria to quickly find properties that match your preferences.', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createASearch', 'en', 'Create a Search', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLookedAt', 'en', 'Properties you''ve looked at', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescriptionFull', 'en', 'Properties you view will appear here for quick access.', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.compareMessageLayouts', 'en', 'Compare Message Layouts', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.chooseLayoutPreference', 'en', 'Choose which layout you prefer:', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message1Sections', 'en', 'Message1 (Sections)', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message2SubTabs', 'en', 'Message2 (Sub-tabs)', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message3Feed', 'en', 'Message3 (Feed)', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.listPropertyWithUs', 'en', 'List your property with us', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.readyToSellOrRent', 'en', 'Ready to sell or rent?', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.getPropertyInFront', 'en', 'Get your property in front of thousands of buyers', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactTeamAdvertising', 'en', 'Contact our team to learn more about advertising options.', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactUs', 'en', 'Contact Us', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.accountSettings', 'en', 'Account Settings', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageYourAccount', 'en', 'Manage your account', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.personalInformation', 'en', 'Personal Information', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updateProfileDetails', 'en', 'Update your profile details', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.fullName', 'en', 'Full Name', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.email', 'en', 'Email', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.phone', 'en', 'Phone', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.addPhoneNumber', 'en', 'Add your phone number', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.saveChanges', 'en', 'Save Changes', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifications', 'en', 'Notifications', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageNotificationPreferences', 'en', 'Manage your notification preferences', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.emailNotifications', 'en', 'Email Notifications', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.receiveUpdatesNewProperties', 'en', 'Receive updates about new properties', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.priceAlerts', 'en', 'Price Alerts', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifiedPriceChanges', 'en', 'Get notified of price changes', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.newListings', 'en', 'New Listings', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.alertNewProperties', 'en', 'Alert me about new properties', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updatePreferences', 'en', 'Update Preferences', 'dashboard', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.satellite', 'en', 'Satellite', 'map', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.location', 'en', 'Location', 'map', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.loading', 'en', 'Loading...', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.error', 'en', 'Error', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.success', 'en', 'Success', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.save', 'en', 'Save', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.cancel', 'en', 'Cancel', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.delete', 'en', 'Delete', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.edit', 'en', 'Edit', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.close', 'en', 'Close', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.confirm', 'en', 'Confirm', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.yes', 'en', 'Yes', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.no', 'en', 'No', 'common', false)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();




-- ============================================

-- PT TRANSLATIONS

-- ============================================


INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.title', 'pt', 'Encontre a Casa dos Seus Sonhos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.subtitle', 'pt', 'Descubra belas propriedades no sul da Europa', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchPlaceholder', 'pt', 'Pesquisar por cidade ou localização...', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchHint', 'pt', 'Tente pesquisar "Lagos", "Faro" ou "Albufeira"', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.buy', 'pt', 'Comprar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.rent', 'pt', 'Arrendar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.sell', 'pt', 'Vender', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.title', 'pt', 'Propriedades Premium', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.description', 'pt', 'Moradias, apartamentos e casas tradicionais selecionadas em todo Portugal', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.title', 'pt', 'Mapas Interativos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.description', 'pt', 'Explore propriedades com nossas ferramentas avançadas de pesquisa e filtragem em mapas', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.title', 'pt', 'Agentes Especializados', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.description', 'pt', 'Trabalhe com agentes locais experientes que conhecem o mercado por dentro e por fora', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.brand', 'pt', 'NextEstate', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.explore', 'pt', 'Explorar', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.favorites', 'pt', 'Favoritos', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.myAccount', 'pt', 'Minha Conta', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signIn', 'pt', 'Entrar', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signOut', 'pt', 'Sair', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.dashboard', 'pt', 'Meu Painel', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestBanner', 'pt', 'Navegando como convidado - Entre para guardar favoritos e aceder a todas as funcionalidades', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestSignIn', 'pt', 'Entrar', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.location', 'pt', 'Localização', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.priceRange', 'pt', 'Faixa de Preço', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.propertyType', 'pt', 'Tipo de Propriedade', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bedrooms', 'pt', 'Quartos', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bathrooms', 'pt', 'Casas de Banho', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.search', 'pt', 'Pesquisar', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.filters', 'pt', 'Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.applyFilters', 'pt', 'Aplicar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.clearFilters', 'pt', 'Limpar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.searchCityOrAddress', 'pt', 'Pesquisar cidade ou morada', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minPrice', 'pt', 'Preço mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.maxPrice', 'pt', 'Preço máximo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.beds', 'pt', 'Quartos', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.baths', 'pt', 'Casas de banho', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.propertyType', 'pt', 'Tipo de propriedade', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minArea', 'pt', 'Área mínima', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.noMin', 'pt', 'Sem mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.any', 'pt', 'Qualquer', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.apartment', 'pt', 'Apartamento', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.villa', 'pt', 'Moradia', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.townhouse', 'pt', 'Casa geminada', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.land', 'pt', 'Terreno', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.commercial', 'pt', 'Comercial', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.beds', 'pt', 'quartos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.baths', 'pt', 'casas de banho', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.sqft', 'pt', 'm²', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photo', 'pt', 'foto', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photos', 'pt', 'fotos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.viewDetails', 'pt', 'Ver Detalhes', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.addToFavorites', 'pt', 'Adicionar aos Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.removeFromFavorites', 'pt', 'Remover dos Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forSale', 'pt', 'À Venda', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forRent', 'pt', 'Para Arrendar', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.notFound', 'pt', 'Propriedade não encontrada', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bd', 'pt', 'qt', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.ba', 'pt', 'wc', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.sqft', 'pt', 'm²', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.favorite', 'pt', 'Favorito', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.share', 'pt', 'Partilhar', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.description', 'pt', 'Descrição', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.defaultDescription', 'pt', 'Linda casa no coração da cidade com acabamentos modernos e muita luz natural.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.features', 'pt', 'Características', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.location', 'pt', 'Localização', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.contactAgent', 'pt', 'Contactar Agente', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.scheduleViewing', 'pt', 'Agendar Visita', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.requestInfo', 'pt', 'Solicitar Informações', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyId', 'pt', 'ID da Propriedade', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listedBy', 'pt', 'Listado por', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listingDate', 'pt', 'Data de Listagem', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyType', 'pt', 'Tipo de Propriedade', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.yearBuilt', 'pt', 'Ano de Construção', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.lotSize', 'pt', 'Tamanho do Lote', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.parking', 'pt', 'Estacionamento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.heating', 'pt', 'Aquecimento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.cooling', 'pt', 'Refrigeração', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.appliances', 'pt', 'Eletrodomésticos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.flooring', 'pt', 'Pavimento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.view', 'pt', 'Vista', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.neighborhood', 'pt', 'Vizinhança', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.schools', 'pt', 'Escolas', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.shopping', 'pt', 'Compras', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.dining', 'pt', 'Restaurantes', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.transportation', 'pt', 'Transporte', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.country', 'pt', 'País', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bedrooms', 'pt', 'Quartos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bathrooms', 'pt', 'Casas de Banho', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.area', 'pt', 'Área', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.aboutThisProperty', 'pt', 'Sobre Esta Propriedade', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyFeatures', 'pt', 'Características da Propriedade', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.marinaViews', 'pt', 'Vista para a Marina', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.undergroundParking', 'pt', 'Estacionamento Subterrâneo', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.airConditioning', 'pt', 'Ar Condicionado', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.liftAccess', 'pt', 'Acesso por Elevador', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.concierge24h', 'pt', 'Portaria 24h', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.wineFridge', 'pt', 'Frigorífico para Vinhos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.securitySystem', 'pt', 'Sistema de Segurança', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.largeTerrace', 'pt', 'Terraço Grande', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.storageRoom', 'pt', 'Arrecadação', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.doubleGlazing', 'pt', 'Vidros Duplos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.frontLineLocation', 'pt', 'Localização em Primeira Linha', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.communalPool', 'pt', 'Piscina Comum', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.underfloorHeating', 'pt', 'Aquecimento por Piso Radiante', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.fiberInternet', 'pt', 'Internet por Fibra', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.locationDescription', 'pt', 'Esta propriedade está localizada no coração de {{city}}, oferecendo fácil acesso a comodidades locais, praias e atrações.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.inTheHeartOf', 'pt', 'no coração de', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.offeringEasyAccess', 'pt', 'oferecendo fácil acesso a', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.localAmenities', 'pt', 'comodidades locais', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.beachesAndAttractions', 'pt', 'praias e atrações', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.property', 'pt', 'Propriedade', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.properties', 'pt', 'Propriedades', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.inCity', 'pt', 'em', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.loadingProperties', 'pt', 'A carregar propriedades...', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.noPropertiesFound', 'pt', 'Nenhuma propriedade encontrada', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.tryAdjustingFilters', 'pt', 'Tente ajustar seus filtros ou área de pesquisa', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.showing', 'pt', 'A mostrar', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.results', 'pt', 'resultados', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.sortBy', 'pt', 'Ordenar por', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceHighToLow', 'pt', 'Preço: Maior para Menor', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceLowToHigh', 'pt', 'Preço: Menor para Maior', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.newest', 'pt', 'Mais Recentes', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.oldest', 'pt', 'Mais Antigos', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.featured', 'pt', 'Destaque', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.title', 'pt', 'Partilhar Propriedade', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.inCity', 'pt', 'em', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLink', 'pt', 'Copiar Link', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLinkDescription', 'pt', 'Copiar URL da propriedade para a área de transferência', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmail', 'pt', 'Partilhar por Email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmailDescription', 'pt', 'Enviar link da propriedade por email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareOnSocialMedia', 'pt', 'Partilhar nas Redes Sociais', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.facebook', 'pt', 'Facebook', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.twitter', 'pt', 'Twitter', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkedin', 'pt', 'LinkedIn', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.whatsapp', 'pt', 'WhatsApp', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.close', 'pt', 'Fechar', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopied', 'pt', 'Link copiado para a área de transferência!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopiedDescription', 'pt', 'O link da propriedade foi copiado para a área de transferência', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.sharedSuccessfully', 'pt', 'Partilhado com sucesso!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.failedToCopyLink', 'pt', 'Falha ao copiar link', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingEmailClient', 'pt', 'A abrir cliente de email...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingFacebook', 'pt', 'A abrir Facebook...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingTwitter', 'pt', 'A abrir Twitter...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingLinkedIn', 'pt', 'A abrir LinkedIn...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingWhatsApp', 'pt', 'A abrir WhatsApp...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.checkOutProperty', 'pt', 'Veja esta propriedade', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.viewProperty', 'pt', 'Ver propriedade', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.discoverMore', 'pt', 'Descubra mais propriedades no Toplix!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.title', 'pt', 'Painel de Controlo', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.overview', 'pt', 'Visão geral do seu portal imobiliário', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalVisitors', 'pt', 'Visitantes Totais', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.pageViews', 'pt', 'Visualizações de Página', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalProperties', 'pt', 'Propriedades Totais', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.activeAgents', 'pt', 'Agentes Ativos', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.export', 'pt', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.lastUpdated', 'pt', 'Última atualização', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.analytics', 'pt', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.properties', 'pt', 'Propriedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agents', 'pt', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.visitorsOverTime', 'pt', 'Visitantes ao Longo do Tempo', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.trafficSources', 'pt', 'Fontes de Tráfego', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByCity', 'pt', 'Propriedades por Cidade', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByPrice', 'pt', 'Propriedades por Faixa de Preço', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgPrice', 'pt', 'Preço Médio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgViews', 'pt', 'Visualizações Médias', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.topProperties', 'pt', 'Propriedades Mais Vistas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agentPerformance', 'pt', 'Desempenho de Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.dashboard', 'pt', 'Painel', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.properties', 'pt', 'Propriedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.agents', 'pt', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.analytics', 'pt', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.settings', 'pt', 'Configurações', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.translations', 'pt', 'Traduções', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.title', 'pt', 'Gestão de Traduções', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.description', 'pt', 'Gerir traduções para todos os idiomas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.key', 'pt', 'Chave', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.namespace', 'pt', 'Espaço de nomes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.search', 'pt', 'Pesquisar traduções...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.filterByNamespace', 'pt', 'Filtrar por espaço de nomes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.allNamespaces', 'pt', 'Todos os Espaços', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslated', 'pt', 'Auto-traduzido', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.manuallyEdited', 'pt', 'Editado manualmente', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.edit', 'pt', 'Editar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.save', 'pt', 'Guardar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.cancel', 'pt', 'Cancelar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslateAll', 'pt', 'Auto-traduzir todas as faltantes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.export', 'pt', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.import', 'pt', 'Importar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translating', 'pt', 'A traduzir...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translationProgress', 'pt', 'Progresso de Tradução', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.missingTranslations', 'pt', 'traduções em falta', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.title', 'pt', 'Contactar Agente', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.namePlaceholder', 'pt', 'Nome', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.emailPlaceholder', 'pt', 'Email', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.phonePlaceholder', 'pt', 'Telefone', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.messagePlaceholder', 'pt', 'Mensagem', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.defaultMessage', 'pt', 'Estou interessado em {{address}}. Por favor envie-me mais informações.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sendButton', 'pt', 'Enviar Mensagem', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sending', 'pt', 'A enviar...', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successTitle', 'pt', 'Mensagem enviada com sucesso!', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successDescription', 'pt', 'Um agente entrará em contacto em breve.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.noFavoritesYet', 'pt', 'Ainda sem favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.clickToSave', 'pt', 'Clique no ícone de coração nas propriedades para guardá-las aqui', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.moreFavorites', 'pt', 'mais favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.viewAll', 'pt', 'Ver Todos os Favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.bd', 'pt', 'qt', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.ba', 'pt', 'wc', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.title', 'pt', 'Entrar ou Criar Conta', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithGoogle', 'pt', 'Continuar com Google', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithApple', 'pt', 'Continuar com Apple', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.orEnterEmail', 'pt', 'ou insira o seu e-mail', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.emailPlaceholder', 'pt', 'E-mail', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.passwordPlaceholder', 'pt', 'Palavra-passe', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithEmail', 'pt', 'Continuar com e-mail', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueAsGuest', 'pt', 'Continuar como convidado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signIn', 'pt', 'Entrar', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signingIn', 'pt', 'A entrar...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.back', 'pt', 'Voltar', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.pleaseWait', 'pt', 'Por favor aguarde...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.close', 'pt', 'Fechar', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterValidEmail', 'pt', 'Por favor insira um endereço de email válido', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterPassword', 'pt', 'Por favor insira a sua palavra-passe', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signedInSuccess', 'pt', 'Sessão iniciada com sucesso!', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.welcomeLoggedIn', 'pt', 'Bem-vindo! A sua sessão foi iniciada.', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.browsingAsGuest', 'pt', 'Navegando como convidado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.title', 'pt', 'Meu Painel', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.welcomeBack', 'pt', 'Bem-vindo de volta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.signOut', 'pt', 'Sair', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.myFavourites', 'pt', 'Meus Favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.savedSearches', 'pt', 'Pesquisas Guardadas', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.recentlyViewed', 'pt', 'Vistos Recentemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.inbox', 'pt', 'Caixa de Entrada', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sellYourProperty', 'pt', 'Venda a sua propriedade', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.settings', 'pt', 'Configurações', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLove', 'pt', 'Propriedades que adora', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.beds', 'pt', 'quartos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.baths', 'pt', 'casas de banho', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sqft', 'pt', 'm²', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavourites', 'pt', 'Ainda sem favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescription', 'pt', 'Comece a adicionar propriedades aos seus favoritos para vê-las aqui', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.startBrowsing', 'pt', 'Começar a Navegar', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearches', 'pt', 'Nenhuma pesquisa guardada', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescription', 'pt', 'Guarde os seus critérios de pesquisa para encontrar propriedades rapidamente mais tarde', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createSearch', 'pt', 'Criar Pesquisa', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViews', 'pt', 'Nenhuma propriedade vista recentemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescription', 'pt', 'As propriedades que visualizar aparecerão aqui', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.exploreProperties', 'pt', 'Explorar Propriedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingFavorites', 'pt', 'A carregar os seus favoritos...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingRecentlyViewed', 'pt', 'A carregar vistos recentemente...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescriptionFull', 'pt', 'Comece a navegar propriedades e clique no ícone de coração para guardar os seus favoritos aqui para fácil acesso.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.browseProperties', 'pt', 'Navegar Propriedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.yourCustomSearchFilters', 'pt', 'Os seus filtros de pesquisa personalizados', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescriptionFull', 'pt', 'Guarde os seus critérios de pesquisa para encontrar rapidamente propriedades que correspondam às suas preferências.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createASearch', 'pt', 'Criar uma Pesquisa', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLookedAt', 'pt', 'Propriedades que visualizou', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescriptionFull', 'pt', 'As propriedades que visualizar aparecerão aqui para acesso rápido.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.compareMessageLayouts', 'pt', 'Comparar Layouts de Mensagens', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.chooseLayoutPreference', 'pt', 'Escolha qual layout prefere:', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message1Sections', 'pt', 'Mensagem1 (Seções)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message2SubTabs', 'pt', 'Mensagem2 (Sub-abas)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message3Feed', 'pt', 'Mensagem3 (Feed)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.listPropertyWithUs', 'pt', 'Liste a sua propriedade connosco', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.readyToSellOrRent', 'pt', 'Pronto para vender ou arrendar?', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.getPropertyInFront', 'pt', 'Coloque a sua propriedade à frente de milhares de compradores', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactTeamAdvertising', 'pt', 'Contacte a nossa equipa para saber mais sobre opções de publicidade.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactUs', 'pt', 'Contacte-nos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.accountSettings', 'pt', 'Configurações de Conta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageYourAccount', 'pt', 'Gerir a sua conta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.personalInformation', 'pt', 'Informações Pessoais', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updateProfileDetails', 'pt', 'Atualize os detalhes do seu perfil', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.fullName', 'pt', 'Nome Completo', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.email', 'pt', 'Email', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.phone', 'pt', 'Telefone', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.addPhoneNumber', 'pt', 'Adicione o seu número de telefone', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.saveChanges', 'pt', 'Guardar Alterações', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifications', 'pt', 'Notificações', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageNotificationPreferences', 'pt', 'Gerir as suas preferências de notificações', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.emailNotifications', 'pt', 'Notificações por Email', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.receiveUpdatesNewProperties', 'pt', 'Receba atualizações sobre novas propriedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.priceAlerts', 'pt', 'Alertas de Preço', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifiedPriceChanges', 'pt', 'Seja notificado de mudanças de preço', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.newListings', 'pt', 'Novos Anúncios', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.alertNewProperties', 'pt', 'Alerte-me sobre novas propriedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updatePreferences', 'pt', 'Atualizar Preferências', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.satellite', 'pt', 'Satélite', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.location', 'pt', 'Localização', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.loading', 'pt', 'A carregar...', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.error', 'pt', 'Erro', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.success', 'pt', 'Sucesso', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.save', 'pt', 'Guardar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.cancel', 'pt', 'Cancelar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.delete', 'pt', 'Eliminar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.edit', 'pt', 'Editar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.close', 'pt', 'Fechar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.confirm', 'pt', 'Confirmar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.yes', 'pt', 'Sim', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.no', 'pt', 'Não', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();




-- ============================================

-- ES TRANSLATIONS

-- ============================================


INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.title', 'es', 'Encuentra la Casa de tus Sueños', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.subtitle', 'es', 'Descubre hermosas propiedades en el sur de Europa', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchPlaceholder', 'es', 'Buscar por ciudad o ubicación...', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchHint', 'es', 'Prueba buscar "Lagos", "Faro" o "Albufeira"', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.buy', 'es', 'Comprar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.rent', 'es', 'Alquilar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.sell', 'es', 'Vender', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.title', 'es', 'Propiedades Premium', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.description', 'es', 'Villas, apartamentos y casas tradicionales seleccionadas en todo Portugal', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.title', 'es', 'Mapas Interactivos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.description', 'es', 'Explora propiedades con nuestras herramientas avanzadas de búsqueda y filtrado en mapas', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.title', 'es', 'Agentes Expertos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.description', 'es', 'Trabaja con agentes locales experimentados que conocen el mercado a fondo', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.brand', 'es', 'NextEstate', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.explore', 'es', 'Explorar', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.favorites', 'es', 'Favoritos', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.myAccount', 'es', 'Mi Cuenta', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signIn', 'es', 'Iniciar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signOut', 'es', 'Cerrar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.dashboard', 'es', 'Mi Panel', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestBanner', 'es', 'Navegando como invitado - Inicia sesión para guardar favoritos y acceder a todas las funciones', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestSignIn', 'es', 'Iniciar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.location', 'es', 'Ubicación', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.priceRange', 'es', 'Rango de Precio', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.propertyType', 'es', 'Tipo de Propiedad', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bedrooms', 'es', 'Dormitorios', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bathrooms', 'es', 'Baños', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.search', 'es', 'Buscar', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.filters', 'es', 'Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.applyFilters', 'es', 'Aplicar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.clearFilters', 'es', 'Limpiar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.searchCityOrAddress', 'es', 'Buscar ciudad o dirección', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minPrice', 'es', 'Precio mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.maxPrice', 'es', 'Precio máximo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.beds', 'es', 'Dormitorios', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.baths', 'es', 'Baños', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.propertyType', 'es', 'Tipo de propiedad', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minArea', 'es', 'Área mínima', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.noMin', 'es', 'Sin mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.any', 'es', 'Cualquiera', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.apartment', 'es', 'Apartamento', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.villa', 'es', 'Villa', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.townhouse', 'es', 'Casa adosada', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.land', 'es', 'Terreno', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.commercial', 'es', 'Comercial', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.beds', 'es', 'dormitorios', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.baths', 'es', 'baños', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.sqft', 'es', 'm²', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photo', 'es', 'foto', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photos', 'es', 'fotos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.viewDetails', 'es', 'Ver Detalles', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.addToFavorites', 'es', 'Añadir a Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.removeFromFavorites', 'es', 'Eliminar de Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forSale', 'es', 'En Venta', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forRent', 'es', 'En Alquiler', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.notFound', 'es', 'Propiedad no encontrada', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bd', 'es', 'dorm', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.ba', 'es', 'baños', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.sqft', 'es', 'm²', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.favorite', 'es', 'Favorito', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.share', 'es', 'Compartir', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.description', 'es', 'Descripción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.defaultDescription', 'es', 'Hermosa casa en el corazón de la ciudad con acabados modernos y mucha luz natural.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.features', 'es', 'Características', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.location', 'es', 'Ubicación', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.contactAgent', 'es', 'Contactar Agente', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.scheduleViewing', 'es', 'Programar Visita', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.requestInfo', 'es', 'Solicitar Información', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyId', 'es', 'ID de Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listedBy', 'es', 'Listado por', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listingDate', 'es', 'Fecha de Listado', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyType', 'es', 'Tipo de Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.yearBuilt', 'es', 'Año de Construcción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.lotSize', 'es', 'Tamaño del Lote', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.parking', 'es', 'Estacionamiento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.heating', 'es', 'Calefacción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.cooling', 'es', 'Refrigeración', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.appliances', 'es', 'Electrodomésticos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.flooring', 'es', 'Suelo', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.view', 'es', 'Vista', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.neighborhood', 'es', 'Vecindario', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.schools', 'es', 'Escuelas', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.shopping', 'es', 'Compras', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.dining', 'es', 'Restaurantes', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.transportation', 'es', 'Transporte', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.country', 'es', 'País', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bedrooms', 'es', 'Dormitorios', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bathrooms', 'es', 'Baños', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.area', 'es', 'Área', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.aboutThisProperty', 'es', 'Sobre Esta Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyFeatures', 'es', 'Características de la Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.marinaViews', 'es', 'Vistas al Puerto', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.undergroundParking', 'es', 'Estacionamiento Subterráneo', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.airConditioning', 'es', 'Aire Acondicionado', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.liftAccess', 'es', 'Acceso con Ascensor', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.concierge24h', 'es', 'Conserje 24h', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.wineFridge', 'es', 'Nevera para Vinos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.securitySystem', 'es', 'Sistema de Seguridad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.largeTerrace', 'es', 'Terraza Grande', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.storageRoom', 'es', 'Trastero', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.doubleGlazing', 'es', 'Doble Acristalamiento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.frontLineLocation', 'es', 'Ubicación en Primera Línea', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.communalPool', 'es', 'Piscina Comunitaria', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.underfloorHeating', 'es', 'Calefacción por Suelo Radiante', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.fiberInternet', 'es', 'Internet de Fibra', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.locationDescription', 'es', 'Esta propiedad está ubicada en el corazón de {{city}}, ofreciendo fácil acceso a servicios locales, playas y atracciones.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.inTheHeartOf', 'es', 'en el corazón de', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.offeringEasyAccess', 'es', 'ofreciendo fácil acceso a', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.localAmenities', 'es', 'servicios locales', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.beachesAndAttractions', 'es', 'playas y atracciones', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.property', 'es', 'Propiedad', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.properties', 'es', 'Propiedades', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.inCity', 'es', 'en', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.loadingProperties', 'es', 'Cargando propiedades...', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.noPropertiesFound', 'es', 'No se encontraron propiedades', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.tryAdjustingFilters', 'es', 'Intenta ajustar tus filtros o área de búsqueda', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.showing', 'es', 'Mostrando', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.results', 'es', 'resultados', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.sortBy', 'es', 'Ordenar por', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceHighToLow', 'es', 'Precio: Mayor a Menor', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceLowToHigh', 'es', 'Precio: Menor a Mayor', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.newest', 'es', 'Más Recientes', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.oldest', 'es', 'Más Antiguos', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.featured', 'es', 'Destacados', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.title', 'es', 'Compartir Propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.inCity', 'es', 'en', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLink', 'es', 'Copiar Enlace', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLinkDescription', 'es', 'Copiar URL de la propiedad al portapapeles', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmail', 'es', 'Compartir por Email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmailDescription', 'es', 'Enviar enlace de la propiedad por email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareOnSocialMedia', 'es', 'Compartir en Redes Sociales', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.facebook', 'es', 'Facebook', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.twitter', 'es', 'Twitter', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkedin', 'es', 'LinkedIn', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.whatsapp', 'es', 'WhatsApp', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.close', 'es', 'Cerrar', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopied', 'es', '¡Enlace copiado al portapapeles!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopiedDescription', 'es', 'El enlace de la propiedad ha sido copiado al portapapeles', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.sharedSuccessfully', 'es', '¡Compartido exitosamente!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.failedToCopyLink', 'es', 'Error al copiar enlace', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingEmailClient', 'es', 'Abriendo cliente de email...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingFacebook', 'es', 'Abriendo Facebook...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingTwitter', 'es', 'Abriendo Twitter...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingLinkedIn', 'es', 'Abriendo LinkedIn...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingWhatsApp', 'es', 'Abriendo WhatsApp...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.checkOutProperty', 'es', 'Echa un vistazo a esta propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.viewProperty', 'es', 'Ver propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.discoverMore', 'es', '¡Descubre más propiedades en Toplix!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.title', 'es', 'Panel de Control', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.overview', 'es', 'Resumen de tu portal inmobiliario', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalVisitors', 'es', 'Visitantes Totales', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.pageViews', 'es', 'Vistas de Página', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalProperties', 'es', 'Propiedades Totales', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.activeAgents', 'es', 'Agentes Activos', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.export', 'es', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.lastUpdated', 'es', 'Última actualización', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.analytics', 'es', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.properties', 'es', 'Propiedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agents', 'es', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.visitorsOverTime', 'es', 'Visitantes en el Tiempo', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.trafficSources', 'es', 'Fuentes de Tráfico', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByCity', 'es', 'Propiedades por Ciudad', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByPrice', 'es', 'Propiedades por Rango de Precio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgPrice', 'es', 'Precio Promedio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgViews', 'es', 'Vistas Promedio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.topProperties', 'es', 'Propiedades Más Vistas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agentPerformance', 'es', 'Rendimiento de Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.dashboard', 'es', 'Panel', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.properties', 'es', 'Propiedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.agents', 'es', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.analytics', 'es', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.settings', 'es', 'Configuración', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.translations', 'es', 'Traducciones', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.title', 'es', 'Gestión de Traducciones', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.description', 'es', 'Gestionar traducciones para todos los idiomas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.key', 'es', 'Clave', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.namespace', 'es', 'Espacio de nombres', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.search', 'es', 'Buscar traducciones...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.filterByNamespace', 'es', 'Filtrar por espacio de nombres', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.allNamespaces', 'es', 'Todos los Espacios', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslated', 'es', 'Auto-traducido', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.manuallyEdited', 'es', 'Editado manualmente', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.edit', 'es', 'Editar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.save', 'es', 'Guardar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.cancel', 'es', 'Cancelar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslateAll', 'es', 'Auto-traducir todas las faltantes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.export', 'es', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.import', 'es', 'Importar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translating', 'es', 'Traduciendo...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translationProgress', 'es', 'Progreso de Traducción', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.missingTranslations', 'es', 'traducciones faltantes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.title', 'es', 'Contactar Agente', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.namePlaceholder', 'es', 'Nombre', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.emailPlaceholder', 'es', 'Email', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.phonePlaceholder', 'es', 'Teléfono', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.messagePlaceholder', 'es', 'Mensaje', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.defaultMessage', 'es', 'Estoy interesado en {{address}}. Por favor envíeme más información.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sendButton', 'es', 'Enviar Mensaje', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sending', 'es', 'Enviando...', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successTitle', 'es', '¡Mensaje enviado exitosamente!', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successDescription', 'es', 'Un agente se pondrá en contacto contigo pronto.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.noFavoritesYet', 'es', 'Aún no hay favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.clickToSave', 'es', 'Haz clic en el ícono de corazón en las propiedades para guardarlas aquí', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.moreFavorites', 'es', 'más favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.viewAll', 'es', 'Ver Todos los Favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.bd', 'es', 'dorm', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.ba', 'es', 'baños', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.title', 'es', 'Iniciar Sesión o Crear Cuenta', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithGoogle', 'es', 'Continuar con Google', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithApple', 'es', 'Continuar con Apple', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.orEnterEmail', 'es', 'o ingresa tu correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.emailPlaceholder', 'es', 'Correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.passwordPlaceholder', 'es', 'Contraseña', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithEmail', 'es', 'Continuar con correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueAsGuest', 'es', 'Continuar como invitado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signIn', 'es', 'Iniciar Sesión', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signingIn', 'es', 'Iniciando sesión...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.back', 'es', 'Atrás', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.pleaseWait', 'es', 'Por favor espera...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.close', 'es', 'Cerrar', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterValidEmail', 'es', 'Por favor ingresa un correo electrónico válido', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterPassword', 'es', 'Por favor ingresa tu contraseña', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signedInSuccess', 'es', '¡Sesión iniciada exitosamente!', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.welcomeLoggedIn', 'es', '¡Bienvenido! Has iniciado sesión.', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.browsingAsGuest', 'es', 'Navegando como invitado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.title', 'es', 'Mi Panel', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.welcomeBack', 'es', 'Bienvenido de nuevo', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.signOut', 'es', 'Cerrar Sesión', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.myFavourites', 'es', 'Mis Favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.savedSearches', 'es', 'Búsquedas Guardadas', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.recentlyViewed', 'es', 'Vistos Recientemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.inbox', 'es', 'Bandeja de Entrada', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sellYourProperty', 'es', 'Vende tu propiedad', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.settings', 'es', 'Configuración', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLove', 'es', 'Propiedades que te gustan', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.beds', 'es', 'dormitorios', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.baths', 'es', 'baños', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sqft', 'es', 'm²', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavourites', 'es', 'Aún no hay favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescription', 'es', 'Comienza a añadir propiedades a tus favoritos para verlas aquí', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.startBrowsing', 'es', 'Comenzar a Navegar', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearches', 'es', 'No hay búsquedas guardadas', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescription', 'es', 'Guarda tus criterios de búsqueda para encontrar propiedades rápidamente más tarde', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createSearch', 'es', 'Crear Búsqueda', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViews', 'es', 'No hay propiedades vistas recientemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescription', 'es', 'Las propiedades que veas aparecerán aquí', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.exploreProperties', 'es', 'Explorar Propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingFavorites', 'es', 'Cargando tus favoritos...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingRecentlyViewed', 'es', 'Cargando vistos recientemente...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescriptionFull', 'es', 'Comienza a navegar propiedades y haz clic en el ícono de corazón para guardar tus favoritos aquí para fácil acceso.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.browseProperties', 'es', 'Navegar Propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.yourCustomSearchFilters', 'es', 'Tus filtros de búsqueda personalizados', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescriptionFull', 'es', 'Guarda tus criterios de búsqueda para encontrar rápidamente propiedades que coincidan con tus preferencias.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createASearch', 'es', 'Crear una Búsqueda', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLookedAt', 'es', 'Propiedades que has visto', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescriptionFull', 'es', 'Las propiedades que veas aparecerán aquí para acceso rápido.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.compareMessageLayouts', 'es', 'Comparar Diseños de Mensajes', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.chooseLayoutPreference', 'es', 'Elige qué diseño prefieres:', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message1Sections', 'es', 'Mensaje1 (Secciones)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message2SubTabs', 'es', 'Mensaje2 (Sub-pestañas)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message3Feed', 'es', 'Mensaje3 (Feed)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.listPropertyWithUs', 'es', 'Lista tu propiedad con nosotros', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.readyToSellOrRent', 'es', '¿Listo para vender o alquilar?', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.getPropertyInFront', 'es', 'Pon tu propiedad frente a miles de compradores', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactTeamAdvertising', 'es', 'Contacta a nuestro equipo para conocer más sobre opciones de publicidad.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactUs', 'es', 'Contáctanos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.accountSettings', 'es', 'Configuración de Cuenta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageYourAccount', 'es', 'Gestiona tu cuenta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.personalInformation', 'es', 'Información Personal', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updateProfileDetails', 'es', 'Actualiza los detalles de tu perfil', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.fullName', 'es', 'Nombre Completo', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.email', 'es', 'Correo Electrónico', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.phone', 'es', 'Teléfono', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.addPhoneNumber', 'es', 'Añade tu número de teléfono', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.saveChanges', 'es', 'Guardar Cambios', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifications', 'es', 'Notificaciones', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageNotificationPreferences', 'es', 'Gestiona tus preferencias de notificaciones', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.emailNotifications', 'es', 'Notificaciones por Email', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.receiveUpdatesNewProperties', 'es', 'Recibe actualizaciones sobre nuevas propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.priceAlerts', 'es', 'Alertas de Precio', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifiedPriceChanges', 'es', 'Recibe notificaciones de cambios de precio', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.newListings', 'es', 'Nuevos Listados', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.alertNewProperties', 'es', 'Alertame sobre nuevas propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updatePreferences', 'es', 'Actualizar Preferencias', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.satellite', 'es', 'Satélite', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.location', 'es', 'Ubicación', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.loading', 'es', 'Cargando...', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.error', 'es', 'Error', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.success', 'es', 'Éxito', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.save', 'es', 'Guardar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.cancel', 'es', 'Cancelar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.delete', 'es', 'Eliminar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.edit', 'es', 'Editar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.close', 'es', 'Cerrar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.confirm', 'es', 'Confirmar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.yes', 'es', 'Sí', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.no', 'es', 'No', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = EXCLUDED.is_auto_translated, updated_at = NOW();



