import { MetadataRoute } from 'next';
import { HARDWARE_POOL } from '@/lib/hardware';

export default function sitemap(): MetadataRoute.Sitemap {
	// base url for generated links – update when deploying
	const baseUrl = 'https://gta.logik.website';

	// 1. Generate URLs for all your "Spoke" pages (the hardware check pages)
	const hardwareEntries = HARDWARE_POOL.map((item) => ({
		url: `${baseUrl}/check/${item.slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	// 2. Static high‑level routes that are part of your sitemap XML
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 1.0,
		},
		{
			url: `${baseUrl}/pc-audit`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/map`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/garage`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'yearly' as const,
			priority: 0.5,
		},
	];

	// 3. return combined list of static and dynamic entries
	return [...staticPages, ...hardwareEntries];
}
