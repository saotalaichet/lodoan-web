import { headers } from 'next/headers';
import type { Metadata } from 'next';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';
import CompanyPage from './company/page';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return {
      title: 'Ovenly | Công nghệ dành cho nhà hàng, quán ăn uống tại Việt Nam',
      description: 'Ovenly giúp các địa điểm ăn uống nhận đơn trực tuyến và tiếp cận khách hàng mới.',
      icons: { icon: '/ovenly-apple.jpg', apple: '/ovenly-apple.jpg' },
    };
  }
  return {
    title: 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
    description: 'Đặt đồ ăn online từ các địa điểm ăn uống tại Việt Nam. Mang về hoặc giao hàng tận nơi. Nhanh chóng, tiện lợi!',
    icons: { icon: '/lodoan-favicon.ico', apple: '/lodoan-apple.jpg' },
    alternates: {
      canonical: 'https://www.lodoan.vn',
      languages: {
        'vi': 'https://www.lodoan.vn',
        'en': 'https://www.lodoan.vn',
      },
    },
    openGraph: {
      title: 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
      description: 'Đặt đồ ăn online từ các địa điểm ăn uống tại Việt Nam. Giao hàng tận nơi & mang về.',
      url: 'https://www.lodoan.vn',
      siteName: 'LÒ ĐỒ ĂN',
      locale: 'vi_VN',
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return <CompanyPage />;
  }

  return <MarketplaceClient />;
}