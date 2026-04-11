import { headers } from 'next/headers';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';
import CompanyPage from './company/page';

export default function HomePage() {
  const headersList = headers();
  const host = headersList.get('host') || '';

  if (host === 'ovenly.io' || host === 'www.ovenly.io') {
    return <CompanyPage />;
  }

  return <MarketplaceClient />;
}
