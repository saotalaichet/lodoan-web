import { getRestaurants } from '@/lib/api';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const restaurants = await getRestaurants();
  return <MarketplaceClient restaurants={restaurants} />;
}