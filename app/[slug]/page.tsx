import type { Metadata } from 'next';
import RestaurantClient from './RestaurantClient';
import MenuList from './MenuList';
import { getRestaurant, getMenu } from '@/lib/restaurantData';
import { buildRestaurantTitle, buildRestaurantDescription } from '@/lib/restaurantTitle';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurant(slug);

  if (!restaurant?.id) {
    return {
      title: 'Không tìm thấy địa điểm',
      robots: { index: false, follow: false },
    };
  }

  // ChowNow-style white-label title: action + brand + venue + cuisine + city
  // No marketplace branding in title — it's the restaurant's own ordering page.
  const title = buildRestaurantTitle(restaurant);
  const description = buildRestaurantDescription(restaurant);

  const ogImage = restaurant.banner || restaurant.logo || 'https://www.lodoan.vn/lodoan-og.jpg';
  const canonical = `https://www.lodoan.vn/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LÒ ĐỒ ĂN',
      locale: 'vi_VN',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: restaurant.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
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

  const cuisineArray = Array.isArray(restaurant.cuisine_type)
    ? restaurant.cuisine_type
    : restaurant.cuisine_type ? [restaurant.cuisine_type] : [];

  const restaurantSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `https://www.lodoan.vn/${slug}#restaurant`,
    name: restaurant.name,
    url: `https://www.lodoan.vn/${slug}`,
    image: restaurant.banner || restaurant.logo,
    description: restaurant.description || `${restaurant.name} - Đặt món online qua LÒ ĐỒ ĂN`,
    priceRange: '₫₫',
  };

  if (restaurant.address) {
    restaurantSchema.address = {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address,
      addressCountry: 'VN',
    };
  }
  if (restaurant.latitude && restaurant.longitude) {
    restaurantSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
    };
  }
  if (restaurant.phone && restaurant.phone !== 'N/A') {
    restaurantSchema.telephone = restaurant.phone;
  }
  if (cuisineArray.length > 0) {
    restaurantSchema.servesCuisine = cuisineArray;
  }
  if (restaurant.total_ratings && restaurant.total_ratings >= 3 && restaurant.average_rating) {
    restaurantSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: restaurant.average_rating,
      reviewCount: restaurant.total_ratings,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (items && items.length > 0) {
    restaurantSchema.hasMenu = `https://www.lodoan.vn/${slug}#menu`;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
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
