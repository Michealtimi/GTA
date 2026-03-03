import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://gta.logik.website';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot', // Friendly invite for ChatGPT
        allow: '/',
      },
      {
        userAgent: 'Googlebot', // Red carpet for Google
        allow: '/',
      },
    ],
    // This is the most important line!
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}