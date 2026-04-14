import type { Metadata } from 'next';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/${params.slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Not found');
    const r = await res.json();

    const title = `${r.name} — Menu & Đặt Hàng Online`;
    const description = r.address
      ? `Xem menu và đặt hàng online từ ${r.name} tại ${r.address}. Giao hàng tận nơi & mang về. Đặt ngay!`
      : `Xem menu và đặt hàng online từ ${r.name}. Giao hàng tận nơi & mang về. Đặt ngay!`;
    const url = `https://lodoan.vn/${params.slug}`;

    return {
      title,
      description,
      icons: {
        icon: '/lodoan-favicon.ico',
        apple: '/lodoan-apple.jpg',
      },
      openGraph: {
        title,
        description,
        url,
        siteName: 'LÒ ĐỒ ĂN',
        images: r.banner
          ? [{ url: r.banner, width: 1200, height: 400, alt: r.name }]
          : r.logo
          ? [{ url: r.logo, width: 400, height: 400, alt: r.name }]
          : [],
        locale: 'vi_VN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: r.banner ? [r.banner] : r.logo ? [r.logo] : [],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: 'Đặt Món Online | LÒ ĐỒ ĂN',
      description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
      icons: {
        icon: '/lodoan-favicon.ico',
        apple: '/lodoan-apple.jpg',
      },
    };
  }
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}