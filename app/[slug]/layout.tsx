import type { Metadata } from 'next';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

async function getRestaurant(slug: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

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

  const title = `${r.name} — Menu & Đặt Hàng Online`;
  const description = r.address
    ? `Xem menu và đặt hàng online từ ${r.name} tại ${r.address}. Giao hàng tận nơi & mang về. Đặt ngay!`
    : `Xem menu và đặt hàng online từ ${r.name}. Giao hàng tận nơi & mang về. Đặt ngay!`;
  const url = `https://www.lodoan.vn/${slug}`;

  return {
    title,
    description,
    icons: { icon: '/lodoan-favicon.ico', apple: '/lodoan-apple.jpg' },
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
    alternates: { canonical: url },
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

  const jsonLd = r ? {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: r.name,
    url: `https://www.lodoan.vn/${slug}`,
    image: r.banner || r.logo || undefined,
    address: r.address ? {
      '@type': 'PostalAddress',
      streetAddress: r.address,
      addressCountry: 'VN',
    } : undefined,
    telephone: r.phone || undefined,
    servesCuisine: Array.isArray(r.cuisine_type)
      ? r.cuisine_type
      : r.cuisine_type ? [r.cuisine_type] : ['Vietnamese'],
    priceRange: '₫₫',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, MoMo, ZaloPay, VNPay',
    hasMenu: `https://www.lodoan.vn/${slug}`,
    aggregateRating: r.average_rating && r.total_ratings > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: parseFloat(r.average_rating).toFixed(1),
      reviewCount: r.total_ratings,
      bestRating: '5',
      worstRating: '1',
    } : undefined,
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.lodoan.vn/${slug}`,
        inLanguage: 'vi',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}