import { headers } from 'next/headers';
import type { Metadata } from 'next';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';
import CompanyPage from './company/page';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
   if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return {
      title: 'Ovenly | Hệ Thống Nhận Đơn Online Trực Tiếp cho Ngành F&B Việt Nam',
      description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng. Quản lý menu, theo dõi đơn hàng theo thời gian thực, tiếp cận khách mới. Đăng ký hôm nay để nhận ưu đãi.',
      icons: { icon: '/ovenly-apple.jpg', apple: '/ovenly-apple.jpg' },
      alternates: {
        canonical: 'https://www.ovenly.io',
      },
      openGraph: {
        title: 'Ovenly | Hệ Thống Nhận Đơn Online Trực Tiếp cho Ngành F&B Việt Nam',
        description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng. Quản lý menu, theo dõi đơn hàng theo thời gian thực, tiếp cận khách mới.',
        url: 'https://www.ovenly.io',
        siteName: 'Ovenly',
        locale: 'vi_VN',
        type: 'website',
        images: [{ url: 'https://www.ovenly.io/ovenly-og.png', width: 1200, height: 630, alt: 'Ovenly | Hệ Thống Nhận Đơn Online cho Ngành F&B Việt Nam' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Ovenly | Hệ Thống Nhận Đơn Online Trực Tiếp cho Ngành F&B Việt Nam',
        description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng.',
        images: ['https://www.ovenly.io/ovenly-og.png'],
      },
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
        'x-default': 'https://www.lodoan.vn',
      },
    },
    openGraph: {
      title: 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
      description: 'Đặt đồ ăn online từ các địa điểm ăn uống tại Việt Nam. Giao hàng tận nơi & mang về.',
      url: 'https://www.lodoan.vn',
      siteName: 'LÒ ĐỒ ĂN',
      locale: 'vi_VN',
      type: 'website',
      images: [{ url: 'https://www.lodoan.vn/lodoan-og.jpg', width: 1200, height: 630, alt: 'LÒ ĐỒ ĂN — Đặt Đồ Ăn Trực Tuyến' }],
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