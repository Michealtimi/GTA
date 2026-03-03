import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Hardcode the base URL for the GTA project to avoid the Vercel URL trap
  const baseUrl = 'https://gta.logik.website';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}