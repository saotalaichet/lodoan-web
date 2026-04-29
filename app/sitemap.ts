import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'www.lodoan.vn';
  const isOvenly = host === 'ovenly.io' || host === 'www.ovenly.io';
  const base = isOvenly ? 'https://www.ovenly.io' : 'https://www.lodoan.vn';

  if (isOvenly) {
    return [
      { url: `${base}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
      { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
      { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    ];
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${base}/claims`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];

  try {
    const res = await fetch(`${RAILWAY}/api/marketplace/restaurants`, { next: { revalidate: 3600 } });
    if (!res.ok) return staticPages;
    const restaurants = await res.json();
    const restaurantPages: MetadataRoute.Sitemap = restaurants
      .filter((r: any) => r.slug && r.launch_status === 'launched')
      .flatMap((r: any) => {
        const lastMod = new Date(r.updated_date || r.created_date || new Date());
        return [
          { url: `${base}/${r.slug}`, lastModified: lastMod, changeFrequency: 'weekly' as const, priority: r.featured ? 0.9 : 0.8 },
          { url: `${base}/${r.slug}/location`, lastModified: lastMod, changeFrequency: 'monthly' as const, priority: 0.6 },
          { url: `${base}/${r.slug}/reviews`, lastModified: lastMod, changeFrequency: 'weekly' as const, priority: 0.6 },
        ];
      });
    return [...staticPages, ...restaurantPages];
  } catch {
    return staticPages;
  }
}