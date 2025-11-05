-- Portuguese translations for all keys
-- Run this in your Supabase SQL Editor to get Portuguese to 100%

INSERT INTO translations (key, language_code, value, is_auto_translated, namespace)
VALUES
-- Home
('home.hero.title', 'pt', 'Encontre a Casa dos Seus Sonhos', false, 'home'),
('home.hero.subtitle', 'pt', 'Descubra propriedades incríveis em Portugal', false, 'home'),
('home.hero.searchPlaceholder', 'pt', 'Pesquisar por cidade ou endereço...', false, 'home'),
('home.hero.searchButton', 'pt', 'Pesquisar', false, 'home'),

-- Property
('property.beds', 'pt', 'quartos', false, 'property'),
('property.baths', 'pt', 'casas de banho', false, 'property'),
('property.sqft', 'pt', 'm²', false, 'property'),
('property.photo', 'pt', 'foto', false, 'property'),
('property.photos', 'pt', 'fotos', false, 'property'),
('property.viewDetails', 'pt', 'Ver Detalhes', false, 'property'),
('property.addToFavorites', 'pt', 'Adicionar aos Favoritos', false, 'property'),
('property.removeFromFavorites', 'pt', 'Remover dos Favoritos', false, 'property'),
('property.forSale', 'pt', 'Venda', false, 'property'),
('property.forRent', 'pt', 'Arrendamento', false, 'property'),

-- Dashboard
('dashboard.title', 'pt', 'O Meu Painel', false, 'dashboard'),
('dashboard.welcomeBack', 'pt', 'Bem-vindo de volta', false, 'dashboard'),
('dashboard.signOut', 'pt', 'Terminar Sessão', false, 'dashboard'),
('dashboard.myFavourites', 'pt', 'Os Meus Favoritos', false, 'dashboard'),
('dashboard.savedSearches', 'pt', 'Pesquisas Guardadas', false, 'dashboard'),
('dashboard.recentlyViewed', 'pt', 'Vistos Recentemente', false, 'dashboard'),
('dashboard.inbox', 'pt', 'Caixa de Entrada', false, 'dashboard'),
('dashboard.sellYourProperty', 'pt', 'Venda o seu imóvel', false, 'dashboard'),
('dashboard.settings', 'pt', 'Definições', false, 'dashboard'),
('dashboard.propertiesYouLove', 'pt', 'Imóveis que adora', false, 'dashboard'),
('dashboard.noFavourites', 'pt', 'Ainda sem favoritos', false, 'dashboard'),
('dashboard.noFavouritesDescription', 'pt', 'Comece a adicionar imóveis aos seus favoritos para os ver aqui', false, 'dashboard'),
('dashboard.startBrowsing', 'pt', 'Começar a Explorar', false, 'dashboard'),
('dashboard.noSavedSearches', 'pt', 'Sem pesquisas guardadas', false, 'dashboard'),
('dashboard.noSavedSearchesDescription', 'pt', 'Guarde os seus critérios de pesquisa para encontrar imóveis rapidamente mais tarde', false, 'dashboard'),
('dashboard.createSearch', 'pt', 'Criar Pesquisa', false, 'dashboard'),
('dashboard.noRecentViews', 'pt', 'Sem imóveis vistos recentemente', false, 'dashboard'),
('dashboard.noRecentViewsDescription', 'pt', 'Os imóveis que visualizar aparecerão aqui', false, 'dashboard'),
('dashboard.exploreProperties', 'pt', 'Explorar Imóveis', false, 'dashboard'),

-- Share
('share.title', 'pt', 'Partilhar Imóvel', false, 'share'),
('share.description', 'pt', 'Partilhe este imóvel incrível com amigos e família', false, 'share'),
('share.copyLink', 'pt', 'Copiar Ligação', false, 'share'),
('share.linkCopied', 'pt', 'Ligação copiada para a área de transferência!', false, 'share'),
('share.shareVia', 'pt', 'Partilhar via', false, 'share'),
('share.shareText', 'pt', 'Veja este incrível imóvel em {{city}}', false, 'share'),

-- Favorites
('favorites.noFavoritesYet', 'pt', 'Ainda sem favoritos', false, 'favorites'),
('favorites.clickToSave', 'pt', 'Clique no ícone de coração nos imóveis para os guardar aqui', false, 'favorites'),
('favorites.moreFavorites', 'pt', 'mais favoritos', false, 'favorites'),
('favorites.viewAll', 'pt', 'Ver Todos os Favoritos', false, 'favorites'),

-- Common
('common.loading', 'pt', 'A carregar...', false, 'common'),
('common.error', 'pt', 'Erro', false, 'common'),
('common.success', 'pt', 'Sucesso', false, 'common'),
('common.save', 'pt', 'Guardar', false, 'common'),
('common.cancel', 'pt', 'Cancelar', false, 'common'),
('common.delete', 'pt', 'Eliminar', false, 'common'),
('common.edit', 'pt', 'Editar', false, 'common'),
('common.close', 'pt', 'Fechar', false, 'common'),
('common.confirm', 'pt', 'Confirmar', false, 'common'),
('common.yes', 'pt', 'Sim', false, 'common'),
('common.no', 'pt', 'Não', false, 'common')

ON CONFLICT (key, language_code) 
DO UPDATE SET 
  value = EXCLUDED.value,
  is_auto_translated = EXCLUDED.is_auto_translated,
  namespace = EXCLUDED.namespace,
  updated_at = NOW();
