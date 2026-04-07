import { getRestaurants } from '@/lib/api';
import MarketplaceClient from '@/components/marketplace/MarketplaceClient';

export const revalidate = 60;

export default async function HomePage() {
  const restaurants = await getRestaurants();
  return <MarketplaceClient restaurants={restaurants} />;
}