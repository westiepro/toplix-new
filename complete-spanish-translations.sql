-- Spanish Translations - Complete Set
-- Total translations: 297
-- Run this in your Supabase SQL Editor to get Spanish to 100%

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.title', 'es', 'Encuentra la Casa de tus Sueños', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.subtitle', 'es', 'Descubre hermosas propiedades en el sur de Europa', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchPlaceholder', 'es', 'Buscar por ciudad o ubicación...', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.hero.searchHint', 'es', 'Prueba buscar "Lagos", "Faro" o "Albufeira"', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.buy', 'es', 'Comprar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.rent', 'es', 'Alquilar', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.nav.sell', 'es', 'Vender', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.title', 'es', 'Propiedades Premium', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.premium.description', 'es', 'Villas, apartamentos y casas tradicionales seleccionadas en todo Portugal', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.title', 'es', 'Mapas Interactivos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.maps.description', 'es', 'Explora propiedades con nuestras herramientas avanzadas de búsqueda y filtrado en mapas', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.title', 'es', 'Agentes Expertos', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('home.features.agents.description', 'es', 'Trabaja con agentes locales experimentados que conocen el mercado a fondo', 'home', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.brand', 'es', 'NextEstate', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.explore', 'es', 'Explorar', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.favorites', 'es', 'Favoritos', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.myAccount', 'es', 'Mi Cuenta', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signIn', 'es', 'Iniciar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.signOut', 'es', 'Cerrar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.dashboard', 'es', 'Mi Panel', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestBanner', 'es', 'Navegando como invitado - Inicia sesión para guardar favoritos y acceder a todas las funciones', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('navbar.guestSignIn', 'es', 'Iniciar Sesión', 'navbar', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.location', 'es', 'Ubicación', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.priceRange', 'es', 'Rango de Precio', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.propertyType', 'es', 'Tipo de Propiedad', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bedrooms', 'es', 'Dormitorios', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.bathrooms', 'es', 'Baños', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.search', 'es', 'Buscar', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.filters', 'es', 'Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.applyFilters', 'es', 'Aplicar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('search.clearFilters', 'es', 'Limpiar Filtros', 'search', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.searchCityOrAddress', 'es', 'Buscar ciudad o dirección', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minPrice', 'es', 'Precio mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.maxPrice', 'es', 'Precio máximo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.beds', 'es', 'Dormitorios', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.baths', 'es', 'Baños', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.propertyType', 'es', 'Tipo de propiedad', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.minArea', 'es', 'Área mínima', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.noMin', 'es', 'Sin mínimo', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.any', 'es', 'Cualquiera', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.apartment', 'es', 'Apartamento', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.villa', 'es', 'Villa', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.townhouse', 'es', 'Casa adosada', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.land', 'es', 'Terreno', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('filters.commercial', 'es', 'Comercial', 'filters', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.beds', 'es', 'dormitorios', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.baths', 'es', 'baños', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.sqft', 'es', 'm²', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photo', 'es', 'foto', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.photos', 'es', 'fotos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.viewDetails', 'es', 'Ver Detalles', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.addToFavorites', 'es', 'Añadir a Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.removeFromFavorites', 'es', 'Eliminar de Favoritos', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forSale', 'es', 'En Venta', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('property.forRent', 'es', 'En Alquiler', 'property', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.notFound', 'es', 'Propiedad no encontrada', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bd', 'es', 'dorm', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.ba', 'es', 'baños', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.sqft', 'es', 'm²', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.favorite', 'es', 'Favorito', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.share', 'es', 'Compartir', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.description', 'es', 'Descripción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.defaultDescription', 'es', 'Hermosa casa en el corazón de la ciudad con acabados modernos y mucha luz natural.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.features', 'es', 'Características', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.location', 'es', 'Ubicación', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.contactAgent', 'es', 'Contactar Agente', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.scheduleViewing', 'es', 'Programar Visita', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.requestInfo', 'es', 'Solicitar Información', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyId', 'es', 'ID de Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listedBy', 'es', 'Listado por', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.listingDate', 'es', 'Fecha de Listado', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyType', 'es', 'Tipo de Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.yearBuilt', 'es', 'Año de Construcción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.lotSize', 'es', 'Tamaño del Lote', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.parking', 'es', 'Estacionamiento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.heating', 'es', 'Calefacción', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.cooling', 'es', 'Refrigeración', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.appliances', 'es', 'Electrodomésticos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.flooring', 'es', 'Suelo', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.view', 'es', 'Vista', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.neighborhood', 'es', 'Vecindario', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.schools', 'es', 'Escuelas', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.shopping', 'es', 'Compras', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.dining', 'es', 'Restaurantes', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.transportation', 'es', 'Transporte', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.country', 'es', 'País', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bedrooms', 'es', 'Dormitorios', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.bathrooms', 'es', 'Baños', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.area', 'es', 'Área', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.aboutThisProperty', 'es', 'Sobre Esta Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.propertyFeatures', 'es', 'Características de la Propiedad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.marinaViews', 'es', 'Vistas al Puerto', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.undergroundParking', 'es', 'Estacionamiento Subterráneo', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.airConditioning', 'es', 'Aire Acondicionado', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.liftAccess', 'es', 'Acceso con Ascensor', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.concierge24h', 'es', 'Conserje 24h', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.wineFridge', 'es', 'Nevera para Vinos', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.securitySystem', 'es', 'Sistema de Seguridad', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.largeTerrace', 'es', 'Terraza Grande', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.storageRoom', 'es', 'Trastero', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.doubleGlazing', 'es', 'Doble Acristalamiento', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.frontLineLocation', 'es', 'Ubicación en Primera Línea', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.communalPool', 'es', 'Piscina Comunitaria', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.underfloorHeating', 'es', 'Calefacción por Suelo Radiante', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.fiberInternet', 'es', 'Internet de Fibra', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.locationDescription', 'es', 'Esta propiedad está ubicada en el corazón de {{city}}, ofreciendo fácil acceso a servicios locales, playas y atracciones.', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.inTheHeartOf', 'es', 'en el corazón de', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.offeringEasyAccess', 'es', 'ofreciendo fácil acceso a', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.localAmenities', 'es', 'servicios locales', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('propertyDetail.beachesAndAttractions', 'es', 'playas y atracciones', 'propertyDetail', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.property', 'es', 'Propiedad', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.properties', 'es', 'Propiedades', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.inCity', 'es', 'en', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.loadingProperties', 'es', 'Cargando propiedades...', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.noPropertiesFound', 'es', 'No se encontraron propiedades', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.tryAdjustingFilters', 'es', 'Intenta ajustar tus filtros o área de búsqueda', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.showing', 'es', 'Mostrando', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.results', 'es', 'resultados', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.sortBy', 'es', 'Ordenar por', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceHighToLow', 'es', 'Precio: Mayor a Menor', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.priceLowToHigh', 'es', 'Precio: Menor a Mayor', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.newest', 'es', 'Más Recientes', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.oldest', 'es', 'Más Antiguos', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('listings.featured', 'es', 'Destacados', 'listings', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.title', 'es', 'Compartir Propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.inCity', 'es', 'en', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLink', 'es', 'Copiar Enlace', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.copyLinkDescription', 'es', 'Copiar URL de la propiedad al portapapeles', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmail', 'es', 'Compartir por Email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareViaEmailDescription', 'es', 'Enviar enlace de la propiedad por email', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.shareOnSocialMedia', 'es', 'Compartir en Redes Sociales', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.facebook', 'es', 'Facebook', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.twitter', 'es', 'Twitter', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkedin', 'es', 'LinkedIn', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.whatsapp', 'es', 'WhatsApp', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.close', 'es', 'Cerrar', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopied', 'es', '¡Enlace copiado al portapapeles!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.linkCopiedDescription', 'es', 'El enlace de la propiedad ha sido copiado al portapapeles', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.sharedSuccessfully', 'es', '¡Compartido exitosamente!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.failedToCopyLink', 'es', 'Error al copiar enlace', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingEmailClient', 'es', 'Abriendo cliente de email...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingFacebook', 'es', 'Abriendo Facebook...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingTwitter', 'es', 'Abriendo Twitter...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingLinkedIn', 'es', 'Abriendo LinkedIn...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.openingWhatsApp', 'es', 'Abriendo WhatsApp...', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.checkOutProperty', 'es', 'Echa un vistazo a esta propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.viewProperty', 'es', 'Ver propiedad', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('share.discoverMore', 'es', '¡Descubre más propiedades en Toplix!', 'share', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.title', 'es', 'Panel de Control', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.overview', 'es', 'Resumen de tu portal inmobiliario', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalVisitors', 'es', 'Visitantes Totales', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.pageViews', 'es', 'Vistas de Página', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.totalProperties', 'es', 'Propiedades Totales', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.activeAgents', 'es', 'Agentes Activos', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.export', 'es', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.lastUpdated', 'es', 'Última actualización', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.analytics', 'es', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.properties', 'es', 'Propiedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agents', 'es', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.visitorsOverTime', 'es', 'Visitantes en el Tiempo', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.trafficSources', 'es', 'Fuentes de Tráfico', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByCity', 'es', 'Propiedades por Ciudad', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.propertiesByPrice', 'es', 'Propiedades por Rango de Precio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgPrice', 'es', 'Precio Promedio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.avgViews', 'es', 'Vistas Promedio', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.topProperties', 'es', 'Propiedades Más Vistas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.dashboard.agentPerformance', 'es', 'Rendimiento de Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.dashboard', 'es', 'Panel', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.properties', 'es', 'Propiedades', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.agents', 'es', 'Agentes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.analytics', 'es', 'Analíticas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.settings', 'es', 'Configuración', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.nav.translations', 'es', 'Traducciones', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.title', 'es', 'Gestión de Traducciones', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.description', 'es', 'Gestionar traducciones para todos los idiomas', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.key', 'es', 'Clave', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.namespace', 'es', 'Espacio de nombres', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.search', 'es', 'Buscar traducciones...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.filterByNamespace', 'es', 'Filtrar por espacio de nombres', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.allNamespaces', 'es', 'Todos los Espacios', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslated', 'es', 'Auto-traducido', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.manuallyEdited', 'es', 'Editado manualmente', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.edit', 'es', 'Editar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.save', 'es', 'Guardar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.cancel', 'es', 'Cancelar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.autoTranslateAll', 'es', 'Auto-traducir todas las faltantes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.export', 'es', 'Exportar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.import', 'es', 'Importar', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translating', 'es', 'Traduciendo...', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.translationProgress', 'es', 'Progreso de Traducción', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('admin.translations.missingTranslations', 'es', 'traducciones faltantes', 'admin', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.title', 'es', 'Contactar Agente', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.namePlaceholder', 'es', 'Nombre', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.emailPlaceholder', 'es', 'Email', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.phonePlaceholder', 'es', 'Teléfono', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.messagePlaceholder', 'es', 'Mensaje', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.defaultMessage', 'es', 'Estoy interesado en {{address}}. Por favor envíeme más información.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sendButton', 'es', 'Enviar Mensaje', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.sending', 'es', 'Enviando...', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successTitle', 'es', '¡Mensaje enviado exitosamente!', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('contact.successDescription', 'es', 'Un agente se pondrá en contacto contigo pronto.', 'contact', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.noFavoritesYet', 'es', 'Aún no hay favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.clickToSave', 'es', 'Haz clic en el ícono de corazón en las propiedades para guardarlas aquí', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.moreFavorites', 'es', 'más favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.viewAll', 'es', 'Ver Todos los Favoritos', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.bd', 'es', 'dorm', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('favorites.ba', 'es', 'baños', 'favorites', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.title', 'es', 'Iniciar Sesión o Crear Cuenta', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithGoogle', 'es', 'Continuar con Google', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithApple', 'es', 'Continuar con Apple', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.orEnterEmail', 'es', 'o ingresa tu correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.emailPlaceholder', 'es', 'Correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.passwordPlaceholder', 'es', 'Contraseña', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueWithEmail', 'es', 'Continuar con correo electrónico', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.continueAsGuest', 'es', 'Continuar como invitado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signIn', 'es', 'Iniciar Sesión', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signingIn', 'es', 'Iniciando sesión...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.back', 'es', 'Atrás', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.pleaseWait', 'es', 'Por favor espera...', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.close', 'es', 'Cerrar', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterValidEmail', 'es', 'Por favor ingresa un correo electrónico válido', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.enterPassword', 'es', 'Por favor ingresa tu contraseña', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.signedInSuccess', 'es', '¡Sesión iniciada exitosamente!', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.welcomeLoggedIn', 'es', '¡Bienvenido! Has iniciado sesión.', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('login.browsingAsGuest', 'es', 'Navegando como invitado', 'login', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.title', 'es', 'Mi Panel', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.welcomeBack', 'es', 'Bienvenido de nuevo', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.signOut', 'es', 'Cerrar Sesión', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.myFavourites', 'es', 'Mis Favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.savedSearches', 'es', 'Búsquedas Guardadas', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.recentlyViewed', 'es', 'Vistos Recientemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.inbox', 'es', 'Bandeja de Entrada', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sellYourProperty', 'es', 'Vende tu propiedad', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.settings', 'es', 'Configuración', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLove', 'es', 'Propiedades que te gustan', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.beds', 'es', 'dormitorios', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.baths', 'es', 'baños', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.sqft', 'es', 'm²', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavourites', 'es', 'Aún no hay favoritos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescription', 'es', 'Comienza a añadir propiedades a tus favoritos para verlas aquí', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.startBrowsing', 'es', 'Comenzar a Navegar', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearches', 'es', 'No hay búsquedas guardadas', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescription', 'es', 'Guarda tus criterios de búsqueda para encontrar propiedades rápidamente más tarde', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createSearch', 'es', 'Crear Búsqueda', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViews', 'es', 'No hay propiedades vistas recientemente', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescription', 'es', 'Las propiedades que veas aparecerán aquí', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.exploreProperties', 'es', 'Explorar Propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingFavorites', 'es', 'Cargando tus favoritos...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.loadingRecentlyViewed', 'es', 'Cargando vistos recientemente...', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noFavouritesDescriptionFull', 'es', 'Comienza a navegar propiedades y haz clic en el ícono de corazón para guardar tus favoritos aquí para fácil acceso.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.browseProperties', 'es', 'Navegar Propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.yourCustomSearchFilters', 'es', 'Tus filtros de búsqueda personalizados', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noSavedSearchesDescriptionFull', 'es', 'Guarda tus criterios de búsqueda para encontrar rápidamente propiedades que coincidan con tus preferencias.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.createASearch', 'es', 'Crear una Búsqueda', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.propertiesYouLookedAt', 'es', 'Propiedades que has visto', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.noRecentViewsDescriptionFull', 'es', 'Las propiedades que veas aparecerán aquí para acceso rápido.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.compareMessageLayouts', 'es', 'Comparar Diseños de Mensajes', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.chooseLayoutPreference', 'es', 'Elige qué diseño prefieres:', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message1Sections', 'es', 'Mensaje1 (Secciones)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message2SubTabs', 'es', 'Mensaje2 (Sub-pestañas)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.message3Feed', 'es', 'Mensaje3 (Feed)', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.listPropertyWithUs', 'es', 'Lista tu propiedad con nosotros', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.readyToSellOrRent', 'es', '¿Listo para vender o alquilar?', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.getPropertyInFront', 'es', 'Pon tu propiedad frente a miles de compradores', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactTeamAdvertising', 'es', 'Contacta a nuestro equipo para conocer más sobre opciones de publicidad.', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.contactUs', 'es', 'Contáctanos', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.accountSettings', 'es', 'Configuración de Cuenta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageYourAccount', 'es', 'Gestiona tu cuenta', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.personalInformation', 'es', 'Información Personal', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updateProfileDetails', 'es', 'Actualiza los detalles de tu perfil', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.fullName', 'es', 'Nombre Completo', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.email', 'es', 'Correo Electrónico', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.phone', 'es', 'Teléfono', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.addPhoneNumber', 'es', 'Añade tu número de teléfono', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.saveChanges', 'es', 'Guardar Cambios', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifications', 'es', 'Notificaciones', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.manageNotificationPreferences', 'es', 'Gestiona tus preferencias de notificaciones', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.emailNotifications', 'es', 'Notificaciones por Email', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.receiveUpdatesNewProperties', 'es', 'Recibe actualizaciones sobre nuevas propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.priceAlerts', 'es', 'Alertas de Precio', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.notifiedPriceChanges', 'es', 'Recibe notificaciones de cambios de precio', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.newListings', 'es', 'Nuevos Listados', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.alertNewProperties', 'es', 'Alertame sobre nuevas propiedades', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('dashboard.updatePreferences', 'es', 'Actualizar Preferencias', 'dashboard', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.satellite', 'es', 'Satélite', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('map.location', 'es', 'Ubicación', 'map', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.loading', 'es', 'Cargando...', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.error', 'es', 'Error', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.success', 'es', 'Éxito', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.save', 'es', 'Guardar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.cancel', 'es', 'Cancelar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.delete', 'es', 'Eliminar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.edit', 'es', 'Editar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.close', 'es', 'Cerrar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.confirm', 'es', 'Confirmar', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.yes', 'es', 'Sí', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();

INSERT INTO translations (key, language_code, value, namespace, is_auto_translated)
VALUES ('common.no', 'es', 'No', 'common', true)
ON CONFLICT (key, language_code) 
DO UPDATE SET value = EXCLUDED.value, namespace = EXCLUDED.namespace, is_auto_translated = true, updated_at = NOW();
