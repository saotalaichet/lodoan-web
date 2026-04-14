import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/owner/', '/profile/', '/orders/', '/api/'],
      },
    ],
    sitemap: 'https://lodoan.vn/sitemap.xml',
  };
}