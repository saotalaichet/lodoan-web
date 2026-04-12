import { headers } from 'next/headers';
import type { Metadata } from 'next';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';
import CompanyPage from './company/page';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return {
      title: 'Ovenly — Công nghệ nhà hàng Việt Nam',
      description: 'Ovenly giúp nhà hàng nhận đơn trực tuyến và tiếp cận khách hàng mới.',
      icons: { icon: '/favicon.png' },
    };
  }

  return {
    title: 'LÒ ĐỒ ĂN — Đặt Đồ Ăn Trực Tuyến',
    description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
    icons: { icon: '/favicon.png' },
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