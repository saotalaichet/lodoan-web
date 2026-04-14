import { MetadataRoute } from 'next';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://www.lodoan.vn', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://www.lodoan.vn/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://www.lodoan.vn/signup', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://www.lodoan.vn/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://www.lodoan.vn/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: 'https://www.lodoan.vn/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: 'https://www.lodoan.vn/claims', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];

  // Dynamic restaurant pages
  try {
    const res = await fetch(`${RAILWAY}/api/marketplace/restaurants`, { cache: 'no-store' });
    if (!res.ok) return staticPages;
    const restaurants = await res.json();
    const restaurantPages: MetadataRoute.Sitemap = restaurants
      .filter((r: any) => r.slug && r.launch_status === 'launched')
      .map((r: any) => ({
        url: `https://www.lodoan.vn/${r.slug}`,
        lastModified: new Date(r.updated_date || r.created_date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: r.featured ? 0.9 : 0.8,
      }));
    return [...staticPages, ...restaurantPages];
  } catch {
    return staticPages;
  }
}