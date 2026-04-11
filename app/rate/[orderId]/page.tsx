'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Star, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

function RateOrderInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.orderId as string;
  const token = searchParams.get('token') || '';

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const lang = order?.language || 'vi';

  useEffect(() => {
    if (!orderId || !token) { setLoading(false); setError('invalid'); return; }
    fetch(`${RAILWAY}/api/orders/${orderId}/status`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError('notfound'); }
        else setOrder(data);
      })
      .catch(() => setError('notfound'))
      .finally(() => setLoading(false));
  }, [orderId, token]);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${RAILWAY}/api/ratings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          restaurant_id: order.restaurant_id,
          customer_name: order.customer_name,
          customer_email: order.customer_email,
          star_rating: rating,
          comment: comment.trim() || null,
          language: lang,
          token,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error === 'Invalid or expired rating token' ? 'expired' : 'error');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('error');
    } finally {
      setSubmitting(false);
    }
  };

  const t = {
    title: lang === 'vi' ? 'Đánh giá đơn hàng' : 'Rate Your Order',
    question: lang === 'vi' ? 'Bạn đánh giá như thế nào?' : 'How would you rate us?',
    comment: lang === 'vi' ? 'Nhận xét (tuỳ chọn)' : 'Comment (optional)',
    placeholder: lang === 'vi' ? 'Chia sẻ trải nghiệm của bạn...' : 'Share your experience...',
    submit: lang === 'vi' ? 'Gửi đánh giá' : 'Submit Rating',
    submitting: lang === 'vi' ? 'Đang lưu...' : 'Submitting...',
    thanks: lang === 'vi' ? 'Cảm ơn bạn!' : 'Thank you!',
    thanksMsg: lang === 'vi' ? 'Đánh giá của bạn đã được lưu.' : 'Your rating has been saved.',
    home: lang === 'vi' ? 'Quay lại trang chủ' : 'Back to Home',
    notFound: lang === 'vi' ? 'Không tìm thấy đơn hàng' : 'Order not found',
    expired: lang === 'vi' ? 'Liên kết đánh giá đã hết hạn hoặc đã được sử dụng.' : 'Rating link has expired or already been used.',
    invalidLink: lang === 'vi' ? 'Liên kết không hợp lệ.' : 'Invalid link.',
    stars: ['Tệ', 'Kém', 'Bình thường', 'Tốt', 'Tuyệt vời'],
    starsEn: ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'],
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (error === 'expired') return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
        <h1 className="font-bold text-xl mb-2 text-gray-900">{lang === 'vi' ? 'Liên kết đã hết hạn' : 'Link Expired'}</h1>
        <p className="text-gray-500 text-sm mb-6">{t.expired}</p>
        <Link href="/" className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90">{t.home}</Link>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h1 className="font-bold text-xl mb-2 text-gray-900">{t.notFound}</h1>
        <p className="text-gray-500 text-sm mb-6">{t.invalidLink}</p>
        <Link href="/" className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90">{t.home}</Link>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2 text-gray-900">{t.thanks}</h1>
        <p className="text-gray-500 text-sm mb-2">{t.thanksMsg}</p>
        <div className="flex justify-center gap-1 my-4">
          {[1,2,3,4,5].map(s => (
            <Star key={s} className={`w-7 h-7 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
          ))}
        </div>
        <Link href="/" className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 mt-2">{t.home}</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-heading font-black text-primary text-xl block mb-4">LÒ ĐỒ ĂN</Link>
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-1">{t.title}</h1>
          <p className="text-gray-500 text-sm">{order?.restaurant_name}</p>
          {order && (
            <p className="text-xs text-gray-400 mt-1 font-mono">#{orderId?.slice(-8).toUpperCase()}</p>
          )}
        </div>

        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4 text-center">{t.question}</p>
          <div className="flex justify-center gap-3">
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110 focus:outline-none">
                <Star className={`w-11 h-11 transition-colors ${
                  star <= (hover || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                }`} />
              </button>
            ))}
          </div>
          {(hover || rating) > 0 && (
            <p className="text-center text-sm font-semibold text-primary mt-2">
              {lang === 'vi' ? t.stars[(hover || rating) - 1] : t.starsEn[(hover || rating) - 1]}
            </p>
          )}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t.comment}</label>
          <textarea value={comment} onChange={e => setComment(e.target.value)}
            placeholder={t.placeholder} rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
        </div>

        <button onClick={handleSubmit} disabled={submitting || rating === 0}
          className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
          <Send className="w-4 h-4" />
          {submitting ? t.submitting : t.submit}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          {lang === 'vi' ? 'Liên kết chỉ dùng được một lần' : 'This link can only be used once'}
        </p>
      </div>
    </div>
  );
}

export default function RateOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <RateOrderInner />
    </Suspense>
  );
}