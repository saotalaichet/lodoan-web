import { headers } from 'next/headers';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';
import CompanyPage from './company/page';

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return <CompanyPage />;
  }

  return <MarketplaceClient />;
}
