// Generate complete Portuguese translations SQL
const fs = require('fs');
const path = require('path');

// Portuguese translations for ALL keys
const portugueseTranslations = {
	// Home
	"home.hero.title": "Encontre a Casa dos Seus Sonhos",
	"home.hero.subtitle": "Descubra propriedades incríveis em Portugal",
	"home.hero.searchPlaceholder": "Pesquisar por cidade ou endereço...",
	"home.hero.searchButton": "Pesquisar",
	
	// Filters
	"filters.searchCityOrAddress": "Pesquisar cidade ou endereço",
	"filters.propertyType": "Tipo de Imóvel",
	"filters.allTypes": "Todos os Tipos",
	"filters.buy": "Comprar",
	"filters.rent": "Arrendar",
	"filters.minPrice": "Preço Mínimo",
	"filters.maxPrice": "Preço Máximo",
	"filters.bedrooms": "Quartos",
	"filters.bathrooms": "Casas de Banho",
	"filters.minArea": "Área Mínima",
	"filters.maxArea": "Área Máxima",
	"filters.moreFilters": "Mais Filtros",
	"filters.applyFilters": "Aplicar Filtros",
	"filters.clearFilters": "Limpar Filtros",
	"filters.apartment": "Apartamento",
	"filters.villa": "Moradia",
	"filters.townhouse": "Casa em Banda",
	"filters.land": "Terreno",
	"filters.commercial": "Comercial",
	
	// Property
	"property.beds": "quartos",
	"property.baths": "casas de banho",
	"property.sqft": "m²",
	"property.photo": "foto",
	"property.photos": "fotos",
	"property.viewDetails": "Ver Detalhes",
	"property.addToFavorites": "Adicionar aos Favoritos",
	"property.removeFromFavorites": "Remover dos Favoritos",
	"property.forSale": "Venda",
	"property.forRent": "Arrendamento",
	
	// Property Detail
	"propertyDetail.notFound": "Imóvel não encontrado",
	"propertyDetail.bd": "qts",
	"propertyDetail.ba": "cb",
	"propertyDetail.sqft": "m²",
	"propertyDetail.overview": "Descrição Geral",
	"propertyDetail.description": "Descrição",
	"propertyDetail.features": "Características",
	"propertyDetail.location": "Localização",
	"propertyDetail.similarProperties": "Imóveis Semelhantes",
	"propertyDetail.contactAgent": "Contactar Agente",
	"propertyDetail.requestViewing": "Solicitar Visita",
	"propertyDetail.priceOnRequest": "Preço sob Consulta",
	"propertyDetail.pool": "Piscina",
	"propertyDetail.garage": "Garagem",
	"propertyDetail.garden": "Jardim",
	"propertyDetail.airConditioning": "Ar Condicionado",
	"propertyDetail.furnished": "Mobilado",
	"propertyDetail.terrace": "Terraço",
	"propertyDetail.balcony": "Varanda",
	"propertyDetail.elevator": "Elevador",
	"propertyDetail.parking": "Estacionamento",
	"propertyDetail.storage": "Arrecadação",
	"propertyDetail.seaView": "Vista Mar",
	"propertyDetail.newConstruction": "Construção Nova",
	"propertyDetail.renovated": "Renovado",
	"propertyDetail.fireplace": "Lareira",
	"propertyDetail.alarm": "Alarme",
	"propertyDetail.gym": "Ginásio",
	"propertyDetail.sauna": "Sauna",
	"propertyDetail.jacuzzi": "Jacuzzi",
	"propertyDetail.solarPanels": "Painéis Solares",
	"propertyDetail.doubleeGlazing": "Vidros Duplos",
	"propertyDetail.builtInWardrobes": "Roupeiros Embutidos",
	"propertyDetail.laundryRoom": "Lavandaria",
	"propertyDetail.office": "Escritório",
	"propertyDetail.guestApartment": "Apartamento de Hóspedes",
	"propertyDetail.gatedCommunity": "Condomínio Fechado",
	"propertyDetail.concierge": "Portaria",
	"propertyDetail.security": "Segurança",
	"propertyDetail.wheelchairAccess": "Acesso para Cadeira de Rodas",
	"propertyDetail.petsAllowed": "Animais Permitidos",
	"propertyDetail.bbq": "Churrasqueira",
	"propertyDetail.outdoorKitchen": "Cozinha Exterior",
	"propertyDetail.wineeCellar": "Adega",
	"propertyDetail.cinema": "Cinema",
	"propertyDetail.playroom": "Sala de Jogos",
	"propertyDetail.walkInCloset": "Closet",
	"propertyDetail.ensuite": "Casa de Banho Privativa",
	"propertyDetail.golfView": "Vista Golf",
	"propertyDetail.mountainView": "Vista Montanha",
	"propertyDetail.poolView": "Vista Piscina",
	"propertyDetail.frontLineLocation": "Localização em Primeira Linha",
	"propertyDetail.communalPool": "Piscina Comum",
	"propertyDetail.underfloorHeating": "Piso Radiante",
	"propertyDetail.fiberInternet": "Fibra Ótica",
	
	// Listings
	"listings.properties": "imóveis",
	"listings.property": "imóvel",
	"listings.showing": "A mostrar",
	"listings.of": "de",
	"listings.noResults": "Nenhum imóvel encontrado",
	"listings.noResultsDescription": "Tente ajustar os seus filtros de pesquisa",
	"listings.loading": "A carregar imóveis...",
	"listings.loadMore": "Carregar Mais",
	
	// Contact
	"contact.title": "Contactar Agente",
	"contact.name": "Nome",
	"contact.email": "Email",
	"contact.phone": "Telefone",
	"contact.message": "Mensagem",
	"contact.send": "Enviar",
	"contact.sending": "A enviar...",
	"contact.successTitle": "Mensagem Enviada!",
	"contact.successDescription": "Um agente irá contactá-lo em breve.",
	
	// Favorites
	"favorites.noFavoritesYet": "Ainda sem favoritos",
	"favorites.clickToSave": "Clique no ícone de coração nos imóveis para os guardar aqui",
	"favorites.moreFavorites": "mais favoritos",
	"favorites.viewAll": "Ver Todos os Favoritos",
	
	// Login Modal
	"login.title": "Iniciar Sessão ou Criar Conta",
	"login.continueWithGoogle": "Continuar com Google",
	"login.continueWithApple": "Continuar com Apple",
	"login.orContinueWith": "Ou continuar com",
	"login.email": "Email",
	"login.password": "Palavra-passe",
	"login.signIn": "Iniciar Sessão",
	"login.signUp": "Criar Conta",
	"login.forgotPassword": "Esqueceu a palavra-passe?",
	"login.noAccount": "Não tem conta?",
	"login.hasAccount": "Já tem conta?",
	"login.createAccount": "Criar nova conta",
	"login.signInHere": "Inicie sessão aqui",
	"login.enterEmail": "Por favor introduza o seu email",
	"login.enterPassword": "Por favor introduza a sua palavra-passe",
	"login.signedInSuccess": "Sessão iniciada com sucesso!",
	"login.welcomeLoggedIn": "Bem-vindo! A sua sessão foi iniciada.",
	"login.browsingAsGuest": "A navegar como visitante",
	
	// Dashboard
	"dashboard.title": "O Meu Painel",
	"dashboard.welcomeBack": "Bem-vindo de volta",
	"dashboard.signOut": "Terminar Sessão",
	"dashboard.myFavourites": "Os Meus Favoritos",
	"dashboard.savedSearches": "Pesquisas Guardadas",
	"dashboard.recentlyViewed": "Vistos Recentemente",
	"dashboard.inbox": "Caixa de Entrada",
	"dashboard.sellYourProperty": "Venda o seu imóvel",
	"dashboard.settings": "Definições",
	"dashboard.propertiesYouLove": "Imóveis que adora",
	"dashboard.noFavourites": "Ainda sem favoritos",
	"dashboard.noFavouritesDescription": "Comece a adicionar imóveis aos seus favoritos para os ver aqui",
	"dashboard.startBrowsing": "Começar a Explorar",
	"dashboard.noSavedSearches": "Sem pesquisas guardadas",
	"dashboard.noSavedSearchesDescription": "Guarde os seus critérios de pesquisa para encontrar imóveis rapidamente mais tarde",
	"dashboard.createSearch": "Criar Pesquisa",
	"dashboard.noRecentViews": "Sem imóveis vistos recentemente",
	"dashboard.noRecentViewsDescription": "Os imóveis que visualizar aparecerão aqui",
	"dashboard.exploreProperties": "Explorar Imóveis",
	
	// Share
	"share.title": "Partilhar Imóvel",
	"share.description": "Partilhe este imóvel incrível com amigos e família",
	"share.copyLink": "Copiar Ligação",
	"share.linkCopied": "Ligação copiada para a área de transferência!",
	"share.shareVia": "Partilhar via",
	"share.shareText": "Veja este incrível imóvel em {{city}}",
	"share.whatsapp": "WhatsApp",
	"share.facebook": "Facebook",
	"share.twitter": "Twitter",
	"share.email": "Email",
	"share.copyLinkFailed": "Erro ao copiar ligação",
	
	// Admin Translations
	"admin.translations.title": "Gestão de Traduções",
	"admin.translations.description": "Gerir traduções para todos os idiomas",
	"admin.translations.syncEnglish": "Sincronizar Chaves em Inglês",
	"admin.translations.autoTranslate": "Traduzir Automaticamente",
	"admin.translations.export": "Exportar",
	"admin.translations.import": "Importar",
	"admin.translations.search": "Pesquisar traduções...",
	"admin.translations.filterNamespace": "Filtrar por namespace",
	"admin.translations.allNamespaces": "Todos os Namespaces",
	"admin.translations.key": "Chave",
	"admin.translations.english": "Inglês",
	"admin.translations.portuguese": "Português",
	"admin.translations.spanish": "Espanhol",
	"admin.translations.french": "Francês",
	"admin.translations.german": "Alemão",
	"admin.translations.swedish": "Sueco",
	"admin.translations.auto": "Auto",
	"admin.translations.manual": "Manual",
	"admin.translations.edit": "Editar",
	"admin.translations.save": "Guardar",
	"admin.translations.cancel": "Cancelar",
	"admin.translations.updated": "Tradução atualizada",
	"admin.translations.failed": "Falha ao atualizar tradução",
	"admin.translations.translating": "A traduzir...",
	"admin.translations.translateSuccess": "Traduzido {{count}} itens para {{language}}",
	"admin.translations.translateFailed": "Falha na tradução",
	"admin.translations.noMissing": "Sem traduções em falta",
	"admin.translations.exported": "Exportadas traduções para {{language}}",
	"admin.translations.synced": "Sincronizadas {{count}} chaves de tradução em inglês!",
	"admin.translations.notInitialized": "Sistema de Traduções Não Inicializado",
	"admin.translations.setupInstructions": "Siga estes passos para configurar o sistema de traduções",
	"admin.translations.stepSQL": "Executar Schema SQL no Supabase",
	"admin.translations.stepAPIKey": "Adicionar Chave API do OpenAI",
	"admin.translations.stepInit": "Executar Script de Inicialização",
	"admin.translations.stepRefresh": "Atualizar Esta Página",
	"admin.translations.refreshNow": "Completei a configuração - Atualizar Agora",
	"admin.translations.percentage": "{{percentage}}%",
	"admin.translations.translatedCount": "{{translated}} / {{total}}",
	
	// Admin Properties
	"admin.properties.title": "Gestão de Imóveis",
	"admin.properties.description": "Ver e gerir todos os imóveis",
	"admin.properties.addNew": "Adicionar Novo Imóvel",
	"admin.properties.search": "Pesquisar imóveis...",
	"admin.properties.filters": "Filtros",
	"admin.properties.export": "Exportar",
	"admin.properties.import": "Importar",
	"admin.properties.id": "ID",
	"admin.properties.image": "Imagem",
	"admin.properties.address": "Endereço",
	"admin.properties.city": "Cidade",
	"admin.properties.price": "Preço",
	"admin.properties.type": "Tipo",
	"admin.properties.beds": "Quartos",
	"admin.properties.baths": "Casas de Banho",
	"admin.properties.area": "Área",
	"admin.properties.status": "Estado",
	"admin.properties.actions": "Ações",
	"admin.properties.edit": "Editar",
	"admin.properties.delete": "Eliminar",
	"admin.properties.view": "Ver",
	"admin.properties.active": "Ativo",
	"admin.properties.inactive": "Inativo",
	"admin.properties.sold": "Vendido",
	"admin.properties.rented": "Arrendado",
	"admin.properties.deleteConfirm": "Tem a certeza que deseja eliminar este imóvel?",
	"admin.properties.deleted": "Imóvel eliminado",
	"admin.properties.updated": "Imóvel atualizado",
	"admin.properties.created": "Imóvel criado",
	"admin.properties.failed": "Operação falhada",
	
	// Admin Users
	"admin.users.title": "Gestão de Utilizadores",
	"admin.users.description": "Ver e gerir utilizadores",
	"admin.users.search": "Pesquisar utilizadores...",
	"admin.users.id": "ID",
	"admin.users.name": "Nome",
	"admin.users.email": "Email",
	"admin.users.role": "Função",
	"admin.users.status": "Estado",
	"admin.users.created": "Criado",
	"admin.users.actions": "Ações",
	"admin.users.admin": "Administrador",
	"admin.users.user": "Utilizador",
	"admin.users.agent": "Agente",
	"admin.users.active": "Ativo",
	"admin.users.inactive": "Inativo",
	"admin.users.edit": "Editar",
	"admin.users.delete": "Eliminar",
	"admin.users.view": "Ver",
	
	// Admin Dashboard
	"admin.dashboard.title": "Painel de Administração",
	"admin.dashboard.welcome": "Bem-vindo de volta",
	"admin.dashboard.totalProperties": "Total de Imóveis",
	"admin.dashboard.totalUsers": "Total de Utilizadores",
	"admin.dashboard.totalInquiries": "Total de Consultas",
	"admin.dashboard.recentActivity": "Atividade Recente",
	"admin.dashboard.quickActions": "Ações Rápidas",
	"admin.dashboard.viewAll": "Ver Todos",
	
	// Map
	"map.satellite": "Satélite",
	"map.location": "Localização",
	
	// Common
	"common.loading": "A carregar...",
	"common.error": "Erro",
	"common.success": "Sucesso",
	"common.save": "Guardar",
	"common.cancel": "Cancelar",
	"common.delete": "Eliminar",
	"common.edit": "Editar",
	"common.close": "Fechar",
	"common.confirm": "Confirmar",
	"common.yes": "Sim",
	"common.no": "Não",
};

// Generate SQL INSERT statements
function generateSQL() {
	const values = Object.entries(portugueseTranslations).map(([key, value]) => {
		const namespace = key.split('.')[0];
		const escapedValue = value.replace(/'/g, "''");
		return `('${key}', 'pt', '${escapedValue}', false, '${namespace}')`;
	}).join(',\n');

	return `-- Complete Portuguese translations for all ${Object.keys(portugueseTranslations).length} keys
-- Generated automatically
-- Run this in your Supabase SQL Editor

INSERT INTO translations (key, language_code, value, is_auto_translated, namespace)
VALUES
${values}
ON CONFLICT (key, language_code) 
DO UPDATE SET 
  value = EXCLUDED.value,
  is_auto_translated = EXCLUDED.is_auto_translated,
  namespace = EXCLUDED.namespace,
  updated_at = NOW();
`;
}

// Write to file
const sql = generateSQL();
const outputPath = path.join(__dirname, '..', 'complete-portuguese-translations.sql');
fs.writeFileSync(outputPath, sql);
console.log(`✅ Generated SQL file with ${Object.keys(portugueseTranslations).length} Portuguese translations`);
console.log(`📁 File saved to: ${outputPath}`);
console.log(`\n🚀 Next steps:`);
console.log(`1. Open your Supabase SQL Editor`);
console.log(`2. Copy and paste the content from: complete-portuguese-translations.sql`);
console.log(`3. Run the SQL`);
console.log(`4. Refresh your translations admin page`);

