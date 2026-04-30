import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RestaurantNav from '@/components/RestaurantNav';
import LocationList from './LocationList';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const T = {
  vi: {
    pageTitle: 'Tất Cả Địa Điểm',
    subtitle: 'Tìm chi nhánh gần bạn nhất',
    notFound: 'Không tìm thấy nhà hàng',
    back: '← Quay lại',
    noBrand: 'Nhà hàng này không thuộc thương hiệu nào',
    viewMenuCta: 'Xem menu & đặt món',
  },
  en: {
    pageTitle: 'All Locations',
    subtitle: 'Find the branch closest to you',
    notFound: 'Restaurant not found',
    back: '← Back',
    noBrand: 'This restaurant does not belong to any brand',
    viewMenuCta: 'View menu & order',
  },
};

async function getRestaurant(slug: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/slug/${slug}`, {
      next: { revalidate: 60, tags: [`restaurant:${slug}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getSiblings(restaurantId: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/${restaurantId}/siblings`, {
      next: { revalidate: 60, tags: [`siblings:${restaurantId}`] },
    });
    if (!res.ok) return { brand: null, siblings: [] };
    return res.json();
  } catch { return { brand: null, siblings: [] }; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRestaurant(slug);
  if (!r) return { title: 'Locations | LÒ ĐỒ ĂN' };
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('ovenly_language')?.value;
  const isEn = langCookie === 'en';
  const title = isEn ? `${r.name} | All Locations` : `${r.name} | Tất Cả Địa Điểm`;
  const description = isEn
    ? `Find all locations of ${r.name} on LÒ ĐỒ ĂN. View addresses, hours, and order from the branch closest to you.`
    : `Tìm tất cả địa điểm của ${r.name} trên LÒ ĐỒ ĂN. Xem địa chỉ, giờ mở cửa và đặt món từ chi nhánh gần bạn nhất.`;
  return {
    title, description,
    alternates: { canonical: `https://www.lodoan.vn/${slug}/locations` },
  };
}

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('ovenly_language')?.value;
  const lang: 'vi' | 'en' = langCookie === 'en' ? 'en' : 'vi';
  const t = T[lang];

  const r = await getRestaurant(slug);
  if (!r) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-bold text-gray-700 mb-4">{t.notFound}</p>
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">{t.back}</Link>
      </div>
    </div>
  );

  const { brand, siblings } = await getSiblings(r.id);

  if (!brand || siblings.length < 2) {
    redirect(`/${slug}`);
  }

  // Use the current restaurant's primary_color, not the brand's
  // Different siblings have different colors; this page is contextual to the current restaurant
  const primaryColor = r.primary_color || '#8B1A1A';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'LÒ ĐỒ ĂN', item: 'https://www.lodoan.vn' },
      { '@type': 'ListItem', position: 2, name: r.name, item: `https://www.lodoan.vn/${slug}` },
      { '@type': 'ListItem', position: 3, name: t.pageTitle },
    ],
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root { --color-primary: ${primaryColor}; }` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gray-50">
        <RestaurantNav restaurant={r} slug={slug} lang={lang} />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="space-y-4 max-w-4xl">
            <div className="mb-2">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.pageTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {siblings.length} {lang === 'en' ? (siblings.length === 1 ? 'location' : 'locations') : 'địa điểm'} · {t.subtitle}
              </p>
            </div>

            <LocationList
              siblings={siblings}
              currentSlug={slug}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </>
  );
}
