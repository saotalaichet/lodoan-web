import type { Metadata } from 'next';
import { getRestaurant, getMenu } from '@/lib/restaurantData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRestaurant(slug);

  if (!r) {
    return {
      title: 'Đặt Món Online | LÒ ĐỒ ĂN',
      description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
      icons: { icon: '/lodoan-favicon.ico', apple: '/lodoan-apple.jpg' },
    };
  }

  const title = `${r.name} | Menu & Đặt Hàng Online`;
  const description = r.meta_description ||
    (r.address
      ? `Xem menu và đặt hàng online từ ${r.name} tại ${r.address}. Giao hàng tận nơi & mang về. Đặt ngay!`
      : `Xem menu và đặt hàng online từ ${r.name}. Giao hàng tận nơi & mang về. Đặt ngay!`);
  const url = `https://www.lodoan.vn/${slug}`;

  return {
    title,
    description,
    icons: { icon: '/lodoan-favicon.ico', apple: '/lodoan-apple.jpg' },
    alternates: {
      canonical: url,
      languages: {
        'vi': url,
        'en': url,
        'x-default': url,
      },
    },
    openGraph: {
      title, description, url,
      siteName: 'LÒ ĐỒ ĂN',
      images: r.banner
        ? [{ url: r.banner, width: 1200, height: 400, alt: r.name }]
        : r.logo ? [{ url: r.logo, width: 400, height: 400, alt: r.name }] : [],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: r.banner ? [r.banner] : r.logo ? [r.logo] : [],
    },
  };
}

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getRestaurant(slug);

  const restaurantSchema = r ? {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: r.name,
    url: `https://www.lodoan.vn/${slug}`,
    image: r.banner || r.logo || undefined,
    hasMenu: `https://www.lodoan.vn/${slug}`,
    servesCuisine: Array.isArray(r.cuisine_type)
      ? r.cuisine_type
      : r.cuisine_type ? [r.cuisine_type] : ['Vietnamese'],
    priceRange: '₫₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, MoMo, ZaloPay, VNPay',
    address: r.address ? {
      '@type': 'PostalAddress',
      streetAddress: r.address,
      addressLocality: r.district || r.city || 'Việt Nam',
      addressCountry: 'VN',
    } : undefined,
    telephone: r.phone && r.phone !== 'N/A' ? r.phone : undefined,
    aggregateRating: r.total_ratings >= 3 ? {
      '@type': 'AggregateRating',
      ratingValue: parseFloat(r.average_rating).toFixed(1),
      reviewCount: r.total_ratings,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    geo: r.latitude && r.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(r.latitude),
      longitude: parseFloat(r.longitude),
    } : undefined,
    openingHoursSpecification: r.hours ? (() => {
      const DAYS: Record<string, string> = {
        sunday: 'Sunday', monday: 'Monday', tuesday: 'Tuesday',
        wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday',
      };
      return Object.entries(r.hours)
        .filter(([, h]) => h && typeof h === 'string' && (h as string).includes('-'))
        .map(([day, h]) => {
          const [open, close] = (h as string).split('-').map((s: string) => s.trim());
          return {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: `https://schema.org/${DAYS[day]}`,
            opens: open,
            closes: close === '00:00' ? '23:59' : close,
          };
        });
    })() : undefined,
    acceptsReservations: false,
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.lodoan.vn/${slug}`,
        inLanguage: ['vi', 'en'],
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'LÒ ĐỒ ĂN',
        item: 'https://www.lodoan.vn',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: r ? r.name : slug,
        item: `https://www.lodoan.vn/${slug}`,
      },
    ],
  };

  const menu = r?.id ? await getMenu(r.id) : null;
  const menuSchema = menu?.items?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: r ? `Menu — ${r.name}` : 'Menu',
    url: `https://www.lodoan.vn/${slug}`,
    hasMenuSection: (() => {
      const categories = menu.categories || [];
      const items = menu.items || [];
      if (categories.length > 0) {
        return categories.map((cat: any) => ({
          '@type': 'MenuSection',
          name: cat.name,
          hasMenuItem: items
            .filter((item: any) => item.category_id === cat.id && item.is_available !== false)
            .slice(0, 10)
            .map((item: any) => ({
              '@type': 'MenuItem',
              name: item.name,
              description: item.description || undefined,
              offers: {
                '@type': 'Offer',
                price: parseFloat(item.price).toFixed(0),
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
              },
              image: item.image_url || undefined,
            })),
        })).filter((s: any) => s.hasMenuItem.length > 0);
      }
      return [{
        '@type': 'MenuSection',
        name: 'Menu',
        hasMenuItem: items.slice(0, 20).map((item: any) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description || undefined,
          offers: {
            '@type': 'Offer',
            price: parseFloat(item.price).toFixed(0),
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
          },
          image: item.image_url || undefined,
        })),
      }];
    })(),
  } : null;

  return (
    <>
      {restaurantSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {menuSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
        />
      )}
      {children}
    </>
  );
}
