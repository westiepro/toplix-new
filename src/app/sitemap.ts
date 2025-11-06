import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { locales } from '@/lib/i18n-config';
import { generatePropertyUrl } from '@/lib/generate-property-url';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemapEntries: MetadataRoute.Sitemap = [];

	// Add static pages for all locales
	const staticPages = [
		'',
		'/buy',
		'/homes-enhanced',
		'/user-dashboard',
		'/auth',
	];

	locales.forEach((locale) => {
		staticPages.forEach((page) => {
			sitemapEntries.push({
				url: `${baseUrl}/${locale}${page}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: page === '' ? 1.0 : 0.8,
			});
		});
	});

	// Add property pages
	if (supabaseUrl && supabaseKey) {
		try {
			const supabase = createClient(supabaseUrl, supabaseKey);

			const { data: properties, error } = await supabase
				.from('properties')
				.select('id, url_slug_id, city, district, property_type, transaction_type, updated_at, status')
				.eq('status', 'active')
				.limit(1000); // Limit for performance

			if (!error && properties) {
				properties.forEach((property) => {
					locales.forEach((locale) => {
						try {
							const url = generatePropertyUrl(
								{
									id: property.id,
									url_slug_id: property.url_slug_id,
									city: property.city,
									transaction_type: property.transaction_type || 'buy',
								},
								locale
							);

							sitemapEntries.push({
								url: `${baseUrl}${url}`,
								lastModified: property.updated_at ? new Date(property.updated_at) : new Date(),
								changeFrequency: 'monthly',
								priority: 0.7,
							});
						} catch (err) {
							console.error('Error generating URL for property:', property.id, err);
						}
					});
				});
			}
		} catch (error) {
			console.error('Error fetching properties for sitemap:', error);
		}
	}

	return sitemapEntries;
}

