import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import RestaurantNav from '@/components/RestaurantNav';
import ReviewList from './ReviewList';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const T = {
  vi: {
    pageTitle: 'Đánh Giá',
    notFound: 'Không tìm thấy nhà hàng',
    back: '← Quay lại',
    verifiedNote: 'Chỉ hiển thị đánh giá từ khách đã đặt hàng qua LÒ ĐỒ ĂN',
    noReviews: 'Chưa có đánh giá nào',
    anonymousCustomer: 'Khách hàng',
    viewMenuCta: 'Xem menu & đặt món',
  },
  en: {
    pageTitle: 'Reviews',
    notFound: 'Restaurant not found',
    back: '← Back',
    verifiedNote: 'Only showing reviews from verified LÒ ĐỒ ĂN orders',
    noReviews: 'No reviews yet',
    anonymousCustomer: 'Customer',
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

async function getReviews(restaurantId: string): Promise<{ reviews: any[]; total: number }> {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurant-reviews?restaurantId=${restaurantId}&limit=10&offset=0`, {
      next: { revalidate: 30, tags: [`reviews:${restaurantId}`] },
    });
    if (!res.ok) return { reviews: [], total: 0 };
    const data = await res.json();
    if (Array.isArray(data)) {
      return { reviews: data, total: data.length };
    }
    return { reviews: data.reviews || [], total: data.total || 0 };
  } catch { return { reviews: [], total: 0 }; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRestaurant(slug);
  if (!r) return { title: 'Reviews | LÒ ĐỒ ĂN' };
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('ovenly_language')?.value;
  const isEn = langCookie === 'en';
  const title = isEn ? `${r.name} | Customer Reviews` : `${r.name} | Đánh Giá Từ Khách Hàng`;
  const description = r.total_ratings >= 3
    ? (isEn
        ? `${r.name} is rated ${parseFloat(r.average_rating).toFixed(1)}/5 by ${r.total_ratings} customers on LÒ ĐỒ ĂN.`
        : `${r.name} được đánh giá ${parseFloat(r.average_rating).toFixed(1)}/5 từ ${r.total_ratings} khách hàng trên LÒ ĐỒ ĂN.`)
    : (isEn
        ? `Read reviews from customers who ordered at ${r.name} on LÒ ĐỒ ĂN.`
        : `Đọc đánh giá từ khách hàng đã đặt món tại ${r.name} trên LÒ ĐỒ ĂN.`);
  return {
    title, description,
    alternates: { canonical: `https://www.lodoan.vn/${slug}/reviews` },
    openGraph: { title, description, url: `https://www.lodoan.vn/${slug}/reviews`, siteName: 'LÒ ĐỒ ĂN', locale: 'vi_VN' },
  };
}

export default async function ReviewsPage({ params }: { params: Promise<{ slug: string }> }) {
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

  const { reviews, total: totalReviews } = await getReviews(r.id);
  const reviewSchema = r.total_ratings >= 3 ? {
    '@context': 'https://schema.org', '@type': 'Restaurant', name: r.name,
    url: `https://www.lodoan.vn/${slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: parseFloat(r.average_rating).toFixed(1),
      reviewCount: r.total_ratings,
      bestRating: '5', worstRating: '1',
    },
    review: reviews.slice(0, 5).map((rev: any) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: rev.customer_name || t.anonymousCustomer },
      reviewRating: { '@type': 'Rating', ratingValue: rev.rating, bestRating: '5', worstRating: '1' },
      reviewBody: rev.comment || '',
      datePublished: rev.created_date,
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'LÒ ĐỒ ĂN', item: 'https://www.lodoan.vn' },
      { '@type': 'ListItem', position: 2, name: r.name, item: `https://www.lodoan.vn/${slug}` },
      { '@type': 'ListItem', position: 3, name: t.pageTitle },
    ],
  };

  const primaryColor = r.primary_color || '#8B1A1A';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root { --color-primary: ${primaryColor}; }` }} />
      {reviewSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gray-50">
        <RestaurantNav restaurant={r} slug={slug} />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">{t.pageTitle}</h2>
              {r.total_ratings >= 3 && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  <span className="text-xl font-black text-amber-600">{parseFloat(r.average_rating).toFixed(1)}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(r.average_rating) ? '#F59E0B' : '#E5E7EB'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 font-medium">
                {t.verifiedNote}
              </p>
            </div>
            {reviews.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
                <p className="text-gray-400 font-medium">{t.noReviews}</p>
              </div>
            ) : (
              <ReviewList
                initialReviews={reviews}
                total={totalReviews}
                restaurantId={r.id}
                lang={lang}
                anonymousLabel={t.anonymousCustomer}
              />
            )}
            <div className="text-center pt-4">
              <Link href={`/${slug}`} className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90">
                {t.viewMenuCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}