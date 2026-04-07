'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { validateRatingToken, submitRating } from '@/lib/api';

const PRIMARY = '#8B1A1A';

const T = {
  vi: {
    title: 'Đánh giá đơn hàng của bạn',
    invalidLink: 'Liên kết đánh giá này không hợp lệ.',
    alreadyRated: 'Bạn đã gửi đánh giá cho đơn hàng này rồi. Cảm ơn bạn rất nhiều! 🙏',
    tokenExpired: 'Liên kết đánh giá này đã hết hạn (chỉ có hiệu lực trong 7 ngày sau khi giao hàng).',
    howSatisfied: 'Bạn hài lòng như thế nào?',
    comment: 'Nhận xét (không bắt buộc)',
    commentPlaceholder: 'Chia sẻ trải nghiệm của bạn...',
    submit: 'Gửi đánh giá',
    submitting: 'Đang gửi...',
    thankYou: 'Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng tôi phục vụ tốt hơn 🙏',
    backHome: 'Quay lại trang chủ',
    leaveGoogle: 'Để lại đánh giá trên Google',
    stars: ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'],
  },
  en: {
    title: 'Rate your order',
    invalidLink: 'This rating link is invalid.',
    alreadyRated: 'You have already submitted a review for this order. Thank you! 🙏',
    tokenExpired: 'This rating link has expired (valid for 7 days after delivery).',
    howSatisfied: 'How satisfied were you?',
    comment: 'Comment (optional)',
    commentPlaceholder: 'Tell us about your experience...',
    submit: 'Submit review',
    submitting: 'Submitting...',
    thankYou: 'Thank you for your feedback! Your review helps us serve you better 🙏',
    backHome: 'Back to Home',
    leaveGoogle: 'Leave a Google review',
    stars: ['Very bad', 'Bad', 'Okay', 'Good', 'Excellent'],
  },
};

export default function RateOrderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const token = searchParams?.get('token') || '';

  const [lang, setLang] = useState('vi');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<{ type: string } | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [googleReviewLink, setGoogleReviewLink] = useState<string | null>(null);
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);

    const validate = async () => {
      const result = await validateRatingToken(orderId, token);
      if (!result.valid) {
        const reason = (result as any).reason;
        if (reason === 'token_already_used') setError({ type: 'already_rated' });
        else if (reason === 'token_expired') setError({ type: 'expired' });
        else setError({ type: 'invalid' });
      } else {
        setOrder(result.order);
        if (result.order?.language) setLang(result.order.language);
      }
      setLoading(false);
    };
    validate();
  }, [orderId, token]);

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    try {
      const result = await submitRating(orderId, token, rating, comment);
      setSubmitted(true);
      if ((result as any).google_review_link) setGoogleReviewLink((result as any).google_review_link);
    } catch {
      setError({ type: 'invalid' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(30,20%,97%)' }}>
      <div className="w-10 h-10 border-4 border-t-red-800 border-red-200 rounded-full animate-spin" style={{ borderTopColor: PRIMARY }} />
    </div>
  );

  if (error) {
    const messages: Record<string, string> = {
      already_rated: t.alreadyRated,
      expired: t.tokenExpired,
      invalid: t.invalidLink,
    };
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'hsl(30,20%,97%)' }}>
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-4xl mb-4">{error.type === 'already_rated' ? '🙏' : '⚠️'}</p>
          <p className="text-gray-700 font-semibold mb-6">{messages[error.type] || t.invalidLink}</p>
          <Link href="/" className="inline-block text-white font-bold px-6 py-3 rounded-xl hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}>
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'hsl(30,20%,97%)' }}>
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <p className="text-5xl mb-4">🌟</p>
        <h2 className="font-heading font-bold text-xl text-gray-900 mb-3">{t.thankYou}</h2>
        {googleReviewLink && (
          <a href={googleReviewLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 mb-4 w-full justify-center"
            style={{ backgroundColor: '#4285F4' }}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            {t.leaveGoogle}
          </a>
        )}
        <Link href="/" className="inline-block text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 w-full text-center"
          style={{ backgroundColor: PRIMARY }}>
          {t.backHome}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'hsl(30,20%,97%)' }}>
      <div className="max-w-md w-full bg-white rounded-2xl p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="font-heading font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>

        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>

        {order && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-bold text-sm text-gray-900">{order.restaurant_name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {order.items?.slice(0, 3).map((i: any) => `${i.quantity}× ${i.name}`).join(', ')}
              {order.items?.length > 3 ? `... +${order.items.length - 3}` : ''}
            </p>
          </div>
        )}

        {/* Star rating */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">{t.howSatisfied}</p>
          <div className="flex items-center gap-2 justify-center mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform hover:scale-110">
                <Star
                  className="w-10 h-10 transition-all"
                  fill={star <= (hovered || rating) ? '#F59E0B' : 'none'}
                  stroke={star <= (hovered || rating) ? '#F59E0B' : '#D1D5DB'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          {(hovered || rating) > 0 && (
            <p className="text-center text-sm font-semibold text-amber-600">
              {t.stars[(hovered || rating) - 1]}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.comment}</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)}
            placeholder={t.commentPlaceholder} rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 resize-none transition-all" />
        </div>

        <button onClick={handleSubmit} disabled={!rating || submitting}
          className="w-full text-white font-bold py-4 rounded-xl text-sm transition-colors disabled:opacity-50 hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}>
          {submitting ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}