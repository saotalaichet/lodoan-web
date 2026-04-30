'use client';

import { useState } from 'react';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

interface Review {
  id?: string;
  customer_name?: string;
  rating: number;
  comment?: string;
  created_date: string;
}

interface ReviewListProps {
  initialReviews: Review[];
  total: number;
  restaurantId: string;
  lang: 'vi' | 'en';
  anonymousLabel: string;
}

const T_LIST = {
  vi: { loadMore: 'Xem thêm đánh giá', loading: 'Đang tải...' },
  en: { loadMore: 'Load more reviews', loading: 'Loading...' },
};

export default function ReviewList({ initialReviews, total, restaurantId, lang, anonymousLabel }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const t = T_LIST[lang];
  const dateLocale = lang === 'en' ? 'en-US' : 'vi-VN';

  const hasMore = reviews.length < total;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${RAILWAY}/api/restaurant-reviews?restaurantId=${restaurantId}&limit=10&offset=${reviews.length}`
      );
      const data = await res.json();
      const next = Array.isArray(data) ? data : (data.reviews || []);
      if (next.length > 0) setReviews(prev => [...prev, ...next]);
    } catch {
      // silent fail; user can retry by clicking again
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {reviews.map((rev, i) => (
        <div key={rev.id || i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">{rev.customer_name?.[0]?.toUpperCase() || '?'}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{rev.customer_name || anonymousLabel}</p>
                <p className="text-xs text-gray-400">{new Date(rev.created_date).toLocaleDateString(dateLocale)}</p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= rev.rating ? '#F59E0B' : '#E5E7EB'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
          {rev.comment && <p className="text-sm text-gray-700 leading-relaxed">{rev.comment}</p>}
        </div>
      ))}
      {hasMore && (
        <div className="text-center pt-2">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.loading : `${t.loadMore} (${total - reviews.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
