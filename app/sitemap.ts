import { MetadataRoute } from 'next';
import { HARDWARE_POOL } from '@/lib/hardware';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://vicecitynavigator.com'; // CHANGE THIS TO YOUR ACTUAL URL

	// 1. Generate URLs for all your "Spoke" pages
	const hardwareEntries = HARDWARE_POOL.map((item) => ({
		url: `${baseUrl}/check/${item.slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8,
	}));

	// 2. Add your "Hub" (Main Page)
	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily' as const,
			priority: 1.0,
		},
		...hardwareEntries,
	];
}
