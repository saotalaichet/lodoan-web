import RestaurantClient from './RestaurantClient';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const fmtPrice = (v: any) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })
    .format(parseFloat(v) || 0);

async function fetchInitialData(slug: string) {
  try {
    const restRes = await fetch(`${RAILWAY}/api/restaurants/slug/${slug}`, { cache: 'no-store' });
    if (!restRes.ok) return null;
    const restaurant = await restRes.json();
    if (!restaurant?.id) return null;

    const menuRes = await fetch(`${RAILWAY}/api/admin/menu/${restaurant.id}`, { cache: 'no-store' });
    if (!menuRes.ok) return null;
    const data = await menuRes.json();

    const categories = (data.categories || [])
      .filter((c: any) => c.is_active !== false)
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
    const items = (data.items || []).filter((i: any) => i.is_available !== false);

    return { restaurant, categories, items };
  } catch {
    return null;
  }
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ssrEnabled = process.env.NEXT_PUBLIC_SSR_ENABLED !== 'false';

  if (!ssrEnabled) {
    return <RestaurantClient />;
  }

  const data = await fetchInitialData(slug);

  if (!data) {
    return <RestaurantClient />;
  }

  const { restaurant, categories, items } = data;
  const categorizedIds = new Set(categories.map((c: any) => c.id));
  const uncategorized = items.filter((i: any) => !categorizedIds.has(i.category_id));

  return (
    <>
      <div className="sr-only">
        <h1>{restaurant.name}</h1>
        {restaurant.address && <p>{restaurant.address}</p>}
        {restaurant.phone && restaurant.phone !== 'N/A' && <p>{restaurant.phone}</p>}
        {categories.map((cat: any) => {
          const catItems = items.filter((i: any) => i.category_id === cat.id);
          if (catItems.length === 0) return null;
          return (
            <section key={cat.id}>
              <h2>{cat.name}</h2>
              {catItems.map((item: any) => (
                <article key={item.id}>
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  <p>{fmtPrice(item.price)}</p>
                </article>
              ))}
            </section>
          );
        })}
        {uncategorized.length > 0 && (
          <section>
            <h2>Khác / Other</h2>
            {uncategorized.map((item: any) => (
              <article key={item.id}>
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                <p>{fmtPrice(item.price)}</p>
              </article>
            ))}
          </section>
        )}
      </div>
      <RestaurantClient
        initialRestaurant={restaurant}
        initialCategories={categories}
        initialItems={items}
      />
    </>
  );
}
