import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'www.lodoan.vn';
  const isOvenly = host === 'ovenly.io' || host === 'www.ovenly.io';
  const base = isOvenly ? 'https://www.ovenly.io' : 'https://www.lodoan.vn';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/owner/', '/profile/', '/orders/', '/api/', '/login', '/signup', '/reset-password'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
