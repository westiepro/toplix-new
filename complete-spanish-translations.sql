-- Spanish Translations - Complete Set
-- Total translations: 297
-- Run this in your Supabase SQL Editor to get Spanish to 100%

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.hero.title', 'es', 'Encuentra la Casa de tus Sueños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.hero.subtitle', 'es', 'Descubre hermosas propiedades en el sur de Europa', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.hero.searchPlaceholder', 'es', 'Buscar por ciudad o ubicación...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.hero.searchHint', 'es', 'Prueba buscar "Lagos", "Faro" o "Albufeira"', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.nav.buy', 'es', 'Comprar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.nav.rent', 'es', 'Alquilar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.nav.sell', 'es', 'Vender', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.premium.title', 'es', 'Propiedades Premium', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.premium.description', 'es', 'Villas, apartamentos y casas tradicionales seleccionadas en todo Portugal', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.maps.title', 'es', 'Mapas Interactivos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.maps.description', 'es', 'Explora propiedades con nuestras herramientas avanzadas de búsqueda y filtrado en mapas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.agents.title', 'es', 'Agentes Expertos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('home.features.agents.description', 'es', 'Trabaja con agentes locales experimentados que conocen el mercado a fondo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.brand', 'es', 'NextEstate', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.explore', 'es', 'Explorar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.favorites', 'es', 'Favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.myAccount', 'es', 'Mi Cuenta', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.signIn', 'es', 'Iniciar Sesión', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.signOut', 'es', 'Cerrar Sesión', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.dashboard', 'es', 'Mi Panel', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.guestBanner', 'es', 'Navegando como invitado - Inicia sesión para guardar favoritos y acceder a todas las funciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('navbar.guestSignIn', 'es', 'Iniciar Sesión', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.location', 'es', 'Ubicación', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.priceRange', 'es', 'Rango de Precio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.propertyType', 'es', 'Tipo de Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.bedrooms', 'es', 'Dormitorios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.bathrooms', 'es', 'Baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.search', 'es', 'Buscar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.filters', 'es', 'Filtros', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.applyFilters', 'es', 'Aplicar Filtros', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('search.clearFilters', 'es', 'Limpiar Filtros', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.searchCityOrAddress', 'es', 'Buscar ciudad o dirección', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.minPrice', 'es', 'Precio mínimo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.maxPrice', 'es', 'Precio máximo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.beds', 'es', 'Dormitorios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.baths', 'es', 'Baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.propertyType', 'es', 'Tipo de propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.minArea', 'es', 'Área mínima', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.noMin', 'es', 'Sin mínimo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.any', 'es', 'Cualquiera', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.apartment', 'es', 'Apartamento', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.villa', 'es', 'Villa', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.townhouse', 'es', 'Casa adosada', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.land', 'es', 'Terreno', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('filters.commercial', 'es', 'Comercial', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.beds', 'es', 'dormitorios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.baths', 'es', 'baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.sqft', 'es', 'm²', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.photo', 'es', 'foto', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.photos', 'es', 'fotos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.viewDetails', 'es', 'Ver Detalles', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.addToFavorites', 'es', 'Añadir a Favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.removeFromFavorites', 'es', 'Eliminar de Favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.forSale', 'es', 'En Venta', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('property.forRent', 'es', 'En Alquiler', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.notFound', 'es', 'Propiedad no encontrada', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.bd', 'es', 'dorm', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.ba', 'es', 'baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.sqft', 'es', 'm²', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.favorite', 'es', 'Favorito', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.share', 'es', 'Compartir', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.description', 'es', 'Descripción', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.defaultDescription', 'es', 'Hermosa casa en el corazón de la ciudad con acabados modernos y mucha luz natural.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.features', 'es', 'Características', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.location', 'es', 'Ubicación', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.contactAgent', 'es', 'Contactar Agente', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.scheduleViewing', 'es', 'Programar Visita', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.requestInfo', 'es', 'Solicitar Información', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.propertyId', 'es', 'ID de Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.listedBy', 'es', 'Listado por', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.listingDate', 'es', 'Fecha de Listado', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.propertyType', 'es', 'Tipo de Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.yearBuilt', 'es', 'Año de Construcción', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.lotSize', 'es', 'Tamaño del Lote', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.parking', 'es', 'Estacionamiento', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.heating', 'es', 'Calefacción', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.cooling', 'es', 'Refrigeración', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.appliances', 'es', 'Electrodomésticos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.flooring', 'es', 'Suelo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.view', 'es', 'Vista', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.neighborhood', 'es', 'Vecindario', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.schools', 'es', 'Escuelas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.shopping', 'es', 'Compras', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.dining', 'es', 'Restaurantes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.transportation', 'es', 'Transporte', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.country', 'es', 'País', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.bedrooms', 'es', 'Dormitorios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.bathrooms', 'es', 'Baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.area', 'es', 'Área', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.aboutThisProperty', 'es', 'Sobre Esta Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.propertyFeatures', 'es', 'Características de la Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.marinaViews', 'es', 'Vistas al Puerto', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.undergroundParking', 'es', 'Estacionamiento Subterráneo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.airConditioning', 'es', 'Aire Acondicionado', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.liftAccess', 'es', 'Acceso con Ascensor', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.concierge24h', 'es', 'Conserje 24h', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.wineFridge', 'es', 'Nevera para Vinos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.securitySystem', 'es', 'Sistema de Seguridad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.largeTerrace', 'es', 'Terraza Grande', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.storageRoom', 'es', 'Trastero', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.doubleGlazing', 'es', 'Doble Acristalamiento', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.frontLineLocation', 'es', 'Ubicación en Primera Línea', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.communalPool', 'es', 'Piscina Comunitaria', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.underfloorHeating', 'es', 'Calefacción por Suelo Radiante', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.fiberInternet', 'es', 'Internet de Fibra', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.locationDescription', 'es', 'Esta propiedad está ubicada en el corazón de {{city}}, ofreciendo fácil acceso a servicios locales, playas y atracciones.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.inTheHeartOf', 'es', 'en el corazón de', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.offeringEasyAccess', 'es', 'ofreciendo fácil acceso a', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.localAmenities', 'es', 'servicios locales', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('propertyDetail.beachesAndAttractions', 'es', 'playas y atracciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.property', 'es', 'Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.properties', 'es', 'Propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.inCity', 'es', 'en', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.loadingProperties', 'es', 'Cargando propiedades...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.noPropertiesFound', 'es', 'No se encontraron propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.tryAdjustingFilters', 'es', 'Intenta ajustar tus filtros o área de búsqueda', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.showing', 'es', 'Mostrando', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.results', 'es', 'resultados', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.sortBy', 'es', 'Ordenar por', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.priceHighToLow', 'es', 'Precio: Mayor a Menor', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.priceLowToHigh', 'es', 'Precio: Menor a Mayor', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.newest', 'es', 'Más Recientes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.oldest', 'es', 'Más Antiguos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('listings.featured', 'es', 'Destacados', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.title', 'es', 'Compartir Propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.inCity', 'es', 'en', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.copyLink', 'es', 'Copiar Enlace', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.copyLinkDescription', 'es', 'Copiar URL de la propiedad al portapapeles', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.shareViaEmail', 'es', 'Compartir por Email', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.shareViaEmailDescription', 'es', 'Enviar enlace de la propiedad por email', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.shareOnSocialMedia', 'es', 'Compartir en Redes Sociales', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.facebook', 'es', 'Facebook', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.twitter', 'es', 'Twitter', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.linkedin', 'es', 'LinkedIn', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.whatsapp', 'es', 'WhatsApp', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.close', 'es', 'Cerrar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.linkCopied', 'es', '¡Enlace copiado al portapapeles!', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.linkCopiedDescription', 'es', 'El enlace de la propiedad ha sido copiado al portapapeles', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.sharedSuccessfully', 'es', '¡Compartido exitosamente!', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.failedToCopyLink', 'es', 'Error al copiar enlace', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.openingEmailClient', 'es', 'Abriendo cliente de email...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.openingFacebook', 'es', 'Abriendo Facebook...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.openingTwitter', 'es', 'Abriendo Twitter...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.openingLinkedIn', 'es', 'Abriendo LinkedIn...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.openingWhatsApp', 'es', 'Abriendo WhatsApp...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.checkOutProperty', 'es', 'Echa un vistazo a esta propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.viewProperty', 'es', 'Ver propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('share.discoverMore', 'es', '¡Descubre más propiedades en Toplix!', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.title', 'es', 'Panel de Control', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.overview', 'es', 'Resumen de tu portal inmobiliario', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.totalVisitors', 'es', 'Visitantes Totales', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.pageViews', 'es', 'Vistas de Página', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.totalProperties', 'es', 'Propiedades Totales', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.activeAgents', 'es', 'Agentes Activos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.export', 'es', 'Exportar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.lastUpdated', 'es', 'Última actualización', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.analytics', 'es', 'Analíticas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.properties', 'es', 'Propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.agents', 'es', 'Agentes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.visitorsOverTime', 'es', 'Visitantes en el Tiempo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.trafficSources', 'es', 'Fuentes de Tráfico', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.propertiesByCity', 'es', 'Propiedades por Ciudad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.propertiesByPrice', 'es', 'Propiedades por Rango de Precio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.avgPrice', 'es', 'Precio Promedio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.avgViews', 'es', 'Vistas Promedio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.topProperties', 'es', 'Propiedades Más Vistas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.dashboard.agentPerformance', 'es', 'Rendimiento de Agentes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.dashboard', 'es', 'Panel', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.properties', 'es', 'Propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.agents', 'es', 'Agentes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.analytics', 'es', 'Analíticas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.settings', 'es', 'Configuración', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.nav.translations', 'es', 'Traducciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.title', 'es', 'Gestión de Traducciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.description', 'es', 'Gestionar traducciones para todos los idiomas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.key', 'es', 'Clave', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.namespace', 'es', 'Espacio de nombres', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.search', 'es', 'Buscar traducciones...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.filterByNamespace', 'es', 'Filtrar por espacio de nombres', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.allNamespaces', 'es', 'Todos los Espacios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.autoTranslated', 'es', 'Auto-traducido', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.manuallyEdited', 'es', 'Editado manualmente', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.edit', 'es', 'Editar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.save', 'es', 'Guardar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.cancel', 'es', 'Cancelar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.autoTranslateAll', 'es', 'Auto-traducir todas las faltantes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.export', 'es', 'Exportar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.import', 'es', 'Importar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.translating', 'es', 'Traduciendo...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.translationProgress', 'es', 'Progreso de Traducción', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('admin.translations.missingTranslations', 'es', 'traducciones faltantes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.title', 'es', 'Contactar Agente', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.namePlaceholder', 'es', 'Nombre', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.emailPlaceholder', 'es', 'Email', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.phonePlaceholder', 'es', 'Teléfono', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.messagePlaceholder', 'es', 'Mensaje', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.defaultMessage', 'es', 'Estoy interesado en {{address}}. Por favor envíeme más información.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.sendButton', 'es', 'Enviar Mensaje', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.sending', 'es', 'Enviando...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.successTitle', 'es', '¡Mensaje enviado exitosamente!', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('contact.successDescription', 'es', 'Un agente se pondrá en contacto contigo pronto.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.noFavoritesYet', 'es', 'Aún no hay favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.clickToSave', 'es', 'Haz clic en el ícono de corazón en las propiedades para guardarlas aquí', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.moreFavorites', 'es', 'más favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.viewAll', 'es', 'Ver Todos los Favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.bd', 'es', 'dorm', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('favorites.ba', 'es', 'baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.title', 'es', 'Iniciar Sesión o Crear Cuenta', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.continueWithGoogle', 'es', 'Continuar con Google', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.continueWithApple', 'es', 'Continuar con Apple', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.orEnterEmail', 'es', 'o ingresa tu correo electrónico', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.emailPlaceholder', 'es', 'Correo electrónico', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.passwordPlaceholder', 'es', 'Contraseña', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.continueWithEmail', 'es', 'Continuar con correo electrónico', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.continueAsGuest', 'es', 'Continuar como invitado', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.signIn', 'es', 'Iniciar Sesión', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.signingIn', 'es', 'Iniciando sesión...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.back', 'es', 'Atrás', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.pleaseWait', 'es', 'Por favor espera...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.close', 'es', 'Cerrar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.enterValidEmail', 'es', 'Por favor ingresa un correo electrónico válido', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.enterPassword', 'es', 'Por favor ingresa tu contraseña', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.signedInSuccess', 'es', '¡Sesión iniciada exitosamente!', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.welcomeLoggedIn', 'es', '¡Bienvenido! Has iniciado sesión.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('login.browsingAsGuest', 'es', 'Navegando como invitado', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.title', 'es', 'Mi Panel', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.welcomeBack', 'es', 'Bienvenido de nuevo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.signOut', 'es', 'Cerrar Sesión', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.myFavourites', 'es', 'Mis Favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.savedSearches', 'es', 'Búsquedas Guardadas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.recentlyViewed', 'es', 'Vistos Recientemente', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.inbox', 'es', 'Bandeja de Entrada', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.sellYourProperty', 'es', 'Vende tu propiedad', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.settings', 'es', 'Configuración', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.propertiesYouLove', 'es', 'Propiedades que te gustan', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.beds', 'es', 'dormitorios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.baths', 'es', 'baños', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.sqft', 'es', 'm²', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noFavourites', 'es', 'Aún no hay favoritos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noFavouritesDescription', 'es', 'Comienza a añadir propiedades a tus favoritos para verlas aquí', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.startBrowsing', 'es', 'Comenzar a Navegar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noSavedSearches', 'es', 'No hay búsquedas guardadas', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescription', 'es', 'Guarda tus criterios de búsqueda para encontrar propiedades rápidamente más tarde', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.createSearch', 'es', 'Crear Búsqueda', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noRecentViews', 'es', 'No hay propiedades vistas recientemente', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescription', 'es', 'Las propiedades que veas aparecerán aquí', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.exploreProperties', 'es', 'Explorar Propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.loadingFavorites', 'es', 'Cargando tus favoritos...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.loadingRecentlyViewed', 'es', 'Cargando vistos recientemente...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noFavouritesDescriptionFull', 'es', 'Comienza a navegar propiedades y haz clic en el ícono de corazón para guardar tus favoritos aquí para fácil acceso.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.browseProperties', 'es', 'Navegar Propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.yourCustomSearchFilters', 'es', 'Tus filtros de búsqueda personalizados', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescriptionFull', 'es', 'Guarda tus criterios de búsqueda para encontrar rápidamente propiedades que coincidan con tus preferencias.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.createASearch', 'es', 'Crear una Búsqueda', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.propertiesYouLookedAt', 'es', 'Propiedades que has visto', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescriptionFull', 'es', 'Las propiedades que veas aparecerán aquí para acceso rápido.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.compareMessageLayouts', 'es', 'Comparar Diseños de Mensajes', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.chooseLayoutPreference', 'es', 'Elige qué diseño prefieres:', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.message1Sections', 'es', 'Mensaje1 (Secciones)', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.message2SubTabs', 'es', 'Mensaje2 (Sub-pestañas)', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.message3Feed', 'es', 'Mensaje3 (Feed)', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.listPropertyWithUs', 'es', 'Lista tu propiedad con nosotros', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.readyToSellOrRent', 'es', '¿Listo para vender o alquilar?', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.getPropertyInFront', 'es', 'Pon tu propiedad frente a miles de compradores', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.contactTeamAdvertising', 'es', 'Contacta a nuestro equipo para conocer más sobre opciones de publicidad.', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.contactUs', 'es', 'Contáctanos', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.accountSettings', 'es', 'Configuración de Cuenta', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.manageYourAccount', 'es', 'Gestiona tu cuenta', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.personalInformation', 'es', 'Información Personal', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.updateProfileDetails', 'es', 'Actualiza los detalles de tu perfil', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.fullName', 'es', 'Nombre Completo', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.email', 'es', 'Correo Electrónico', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.phone', 'es', 'Teléfono', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.addPhoneNumber', 'es', 'Añade tu número de teléfono', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.saveChanges', 'es', 'Guardar Cambios', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.notifications', 'es', 'Notificaciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.manageNotificationPreferences', 'es', 'Gestiona tus preferencias de notificaciones', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.emailNotifications', 'es', 'Notificaciones por Email', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.receiveUpdatesNewProperties', 'es', 'Recibe actualizaciones sobre nuevas propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.priceAlerts', 'es', 'Alertas de Precio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.notifiedPriceChanges', 'es', 'Recibe notificaciones de cambios de precio', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.newListings', 'es', 'Nuevos Listados', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.alertNewProperties', 'es', 'Alertame sobre nuevas propiedades', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('dashboard.updatePreferences', 'es', 'Actualizar Preferencias', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('map.satellite', 'es', 'Satélite', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('map.location', 'es', 'Ubicación', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.loading', 'es', 'Cargando...', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.error', 'es', 'Error', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.success', 'es', 'Éxito', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.save', 'es', 'Guardar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.cancel', 'es', 'Cancelar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.delete', 'es', 'Eliminar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.edit', 'es', 'Editar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.close', 'es', 'Cerrar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.confirm', 'es', 'Confirmar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.yes', 'es', 'Sí', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, is_auto_translated)
VALUES ('common.no', 'es', 'No', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, is_auto_translated = true, updated_at = NOW();
