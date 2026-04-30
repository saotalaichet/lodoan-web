import RestaurantClient from './RestaurantClient';
import MenuList from './MenuList';
import { getRestaurant, getMenu } from '@/lib/restaurantData';

async function fetchInitialData(slug: string) {
  const restaurant = await getRestaurant(slug);
  if (!restaurant?.id) return null;

  const data = await getMenu(restaurant.id, slug);
  if (!data) return null;

  const categories = (data.categories || [])
    .filter((c: any) => c.is_active !== false)
    .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
  const items = data.items || [];

  return { restaurant, categories, items };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ssrEnabled = process.env.NEXT_PUBLIC_SSR_ENABLED !== 'false';

  if (!ssrEnabled) {
    return <RestaurantClient slug={slug} />;
  }

  const data = await fetchInitialData(slug);

  if (!data) {
    return <RestaurantClient slug={slug} />;
  }

  const { restaurant, categories, items } = data;
  const primaryColor = restaurant.primary_color || '#8B1A1A';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root { --color-primary: ${primaryColor}; }` }} />
      <div className="sr-only">
        <h1>{restaurant.name}</h1>
        {restaurant.address && <p>{restaurant.address}</p>}
        {restaurant.phone && restaurant.phone !== 'N/A' && <p>{restaurant.phone}</p>}
      </div>
      <RestaurantClient
        slug={slug}
        initialRestaurant={restaurant}
        initialCategories={categories}
        initialItems={items}
      >
        <MenuList
          restaurant={restaurant}
          categories={categories}
          items={items}
        />
      </RestaurantClient>
    </>
  );
}
