'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getRestaurantBySlug, Restaurant } from '@/lib/api';

const PRIMARY = '#8B1A1A';
const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const BASE44_HEADERS = {
  'api-key': process.env.NEXT_PUBLIC_BASE44_API_KEY!,
  'Content-Type': 'application/json',
};

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const isValidPhone = (v: string) => /^[0-9\s\+\-\(\)]{9,15}$/.test(v.trim());
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const PAYMENT_METHODS = [
  { key: 'cash_or_transfer', labelVi: 'Tiền mặt / Chuyển khoản', labelEn: 'Cash / Bank Transfer', icon: '💵', validFor: ['pickup'] },
  { key: 'cod', labelVi: 'Tiền mặt khi giao (COD)', labelEn: 'Cash on Delivery (COD)', icon: '🏠', validFor: ['delivery'] },
  { key: 'momo', labelVi: 'Ví MoMo', labelEn: 'MoMo Wallet', icon: '💜', validFor: ['pickup', 'delivery'] },
  { key: 'zalopay', labelVi: 'ZaloPay', labelEn: 'ZaloPay', icon: '🔵', validFor: ['pickup', 'delivery'] },
  { key: 'vnpay', labelVi: 'VNPay', labelEn: 'VNPay', icon: '🏦', validFor: ['pickup', 'delivery'] },
  { key: 'creditcard', labelVi: '9Pay — Thẻ Tín Dụng / Ghi Nợ', labelEn: '9Pay — Credit / Debit Card', icon: '💳', validFor: ['pickup', 'delivery'] },
];

const ONLINE_METHODS = ['momo', 'zalopay', 'vnpay'];
const PAYMENT_ENDPOINTS: Record<string, string> = {
  momo: '/api/payments/momo/create',
  zalopay: '/api/payments/zalopay/create',
  vnpay: '/api/payments/vnpay/create',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

function useCountdown(active: boolean) {
  const [s, setS] = useState(600);
  useEffect(() => {
    if (!active) { setS(600); return; }
    const t = setInterval(() => setS(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [active]);
  return {
    display: `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`,
    expired: s === 0,
  };
}

type Screen = 'landing' | 'form' | 'waiting' | 'confirmed' | 'declined' | 'timeout';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lang, setLang] = useState('vi');
  const [screen, setScreen] = useState<Screen>('landing');

  // Form fields
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash_or_transfer');
  const [tipPercentage, setTipPercentage] = useState(0);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  // Credit card
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');

  // Order result
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const placingRef = useRef(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const pollStartRef = useRef<number | null>(null);

  const countdown = useCountdown(placing && ONLINE_METHODS.includes(paymentMethod));

  // Load restaurant + cart
  useEffect(() => {
    getRestaurantBySlug(slug).then(r => setRestaurant(r));
    try {
      const saved = sessionStorage.getItem(`cart_${slug}`);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    const storedLang = localStorage.getItem('ovenly_language');
    if (storedLang) setLang(storedLang);
  }, [slug]);

  // Check payment return from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const returnOrderId = params.get('orderId');
    if (payment === 'success' && returnOrderId) {
      setOrderId(returnOrderId);
      setScreen('waiting');
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      url.searchParams.delete('orderId');
      window.history.replaceState({}, '', url.toString());
    } else if (payment === 'failed') {
      setError(lang === 'vi' ? 'Thanh toán không thành công. Vui lòng thử lại.' : 'Payment failed. Please try again.');
    }
  }, []);

  // Poll order status
  useEffect(() => {
    if (screen !== 'waiting' || !orderId) return;
    if (!pollStartRef.current) pollStartRef.current = Date.now();

    pollRef.current = setInterval(async () => {
      if (Date.now() - (pollStartRef.current || 0) > 10 * 60 * 1000) {
        clearInterval(pollRef.current!);
        setScreen('timeout');
        return;
      }
      try {
        const res = await fetch(`${RAILWAY}/api/orders/${orderId}/status`);
        if (!res.ok) return;
        const data = await res.json();
        const s = data.status;
        setOrderStatus(s);
        setOrderNotes(data.notes || '');
        if (data.total) setOrderTotal(data.total);
        if (['accepted', 'preparing', 'ready', 'completed', 'delivering'].includes(s)) {
          clearInterval(pollRef.current!);
          setScreen('confirmed');
        } else if (s === 'declined') {
          clearInterval(pollRef.current!);
          setScreen('declined');
        }
      } catch {}
    }, 3000);

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [screen, orderId]);

  // Auto-fix payment method when order type changes
  useEffect(() => {
    const valid = PAYMENT_METHODS.filter(m => m.validFor.includes(orderType)).map(m => m.key);
    if (!valid.includes(paymentMethod)) setPaymentMethod(valid[0]);
  }, [orderType]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const serviceFeePct = orderType === 'delivery'
    ? (subtotal >= 1000001 ? 0.02 : subtotal >= 500001 ? 0.016 : 0.01)
    : 0.01;
  const serviceFee = Math.round(subtotal * serviceFeePct);
  const deliveryFee = orderType === 'delivery' ? (restaurant?.delivery_fee || 0) : 0;
  const tipAmount = Math.round(subtotal * tipPercentage / 100);
  const total = subtotal + serviceFee + deliveryFee + tipAmount;

  const touch = (f: string) => setTouched(p => ({ ...p, [f]: true }));

  const validate = () => {
    if (!name.trim()) return lang === 'vi' ? 'Vui lòng nhập họ tên' : 'Please enter your name';
    if (!phone.trim() || !isValidPhone(phone)) return lang === 'vi' ? 'Số điện thoại không hợp lệ' : 'Invalid phone number';
    if (!email.trim() || !isValidEmail(email)) return lang === 'vi' ? 'Email không hợp lệ' : 'Invalid email';
    if (orderType === 'delivery' && !address.trim()) return lang === 'vi' ? 'Vui lòng nhập địa chỉ giao hàng' : 'Please enter delivery address';
    if (orderType === 'delivery' && subtotal < (restaurant?.min_order_amount || 50000))
      return lang === 'vi' ? `Đơn tối thiểu ${fmt(restaurant?.min_order_amount || 50000)}` : `Min order ${fmt(restaurant?.min_order_amount || 50000)}`;
    return null;
  };

  const handlePlace = async () => {
    if (placingRef.current) return;
    setTouched({ name: true, phone: true, email: true, address: true });
    const err = validate();
    if (err) { setError(err); return; }
    if (totalQty >= 16) { setError(lang === 'vi' ? 'Đơn hàng quá lớn, vui lòng liên hệ nhà hàng trực tiếp.' : 'Order too large. Contact restaurant directly.'); return; }

    placingRef.current = true;
    setPlacing(true);
    setError('');

    try {
      const items = cart.map(i => ({ menu_item_id: i.id, name: i.name, price: i.price, quantity: i.qty }));
      const isOnline = ONLINE_METHODS.includes(paymentMethod);

      const orderRes = await fetch(`${BASE44_URL}/entities/Order`, {
        method: 'POST',
        headers: BASE44_HEADERS,
        body: JSON.stringify({
          restaurant_id: restaurant!.id,
          restaurant_name: restaurant!.name,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          items,
          subtotal,
          service_fee: serviceFee,
          delivery_fee: deliveryFee,
          tip_amount: tipAmount,
          tip_percentage: tipPercentage,
          total,
          order_type: orderType,
          delivery_address: orderType === 'delivery' ? address : '',
          payment_method: paymentMethod,
          payment_status: isOnline ? 'pending_payment' : 'waiting',
          cash_collected: false,
          notes,
          language: lang,
          status: 'confirmed',
          confirmed_at: new Date().toISOString(),
        }),
      });

      if (!orderRes.ok) throw new Error('Failed to create order');
      const order = await orderRes.json();

      // Notify Railway
      try {
        await fetch(`${RAILWAY}/api/orders/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id, restaurantId: restaurant!.id }),
        });
      } catch {}

      if (isOnline) {
        const payRes = await fetch(`${RAILWAY}${PAYMENT_ENDPOINTS[paymentMethod]}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            amount: total,
            orderInfo: `Ovenly Order ${order.id}`,
            redirectUrl: `${window.location.origin}/${slug}/checkout?payment=success&orderId=${order.id}`,
          }),
        });
        const payData = await payRes.json();
        if (payData.payUrl) {
          window.location.href = payData.payUrl;
          return;
        }
        setError(lang === 'vi' ? 'Lỗi kết nối thanh toán.' : 'Payment connection error.');
        setPlacing(false);
        placingRef.current = false;
        return;
      }

      // Cash/COD — go to waiting screen
      sessionStorage.removeItem(`cart_${slug}`);
      setOrderId(order.id);
      setOrderTotal(total);
      setPlacing(false);
      placingRef.current = false;
      setScreen('waiting');
    } catch (e) {
      setError(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong. Please try again.');
      setPlacing(false);
      placingRef.current = false;
    }
  };

  // ── SCREENS ──────────────────────────────────────────────────────────────

  if (screen === 'waiting') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-sm w-full">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-t-red-800 border-red-200 animate-spin" />
            <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ background: '#FFF0ED' }}>
              <span className="text-3xl">🍜</span>
            </div>
          </div>
          <h2 className="font-bold text-xl text-gray-900 mb-2">
            {lang === 'vi' ? 'Đang chờ quán xác nhận...' : 'Waiting for confirmation...'}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {lang === 'vi' ? 'Vui lòng không đóng trang này' : 'Please do not close this page'}
          </p>
          {orderId && <p className="text-xs text-gray-400 font-mono">#{orderId.slice(-8).toUpperCase()}</p>}
        </div>
      </div>
    );
  }

  if (screen === 'confirmed') {
    const estTime = orderNotes?.match(/Est: ([^|]+)/)?.[1]?.trim() || '';
    const declineReason = orderNotes?.match(/Reason: (.+)/)?.[1] || '';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-sm w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-5xl">✅</span>
          </div>
          <h2 className="font-bold text-2xl text-gray-900 mb-1">
            {lang === 'vi' ? 'Đơn hàng đã được xác nhận!' : 'Order confirmed!'}
          </h2>
          <p className="text-xs text-gray-400 font-mono mb-4">#{orderId.slice(-8).toUpperCase()}</p>
          {estTime && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 justify-center">
              <span className="text-orange-600 font-semibold text-sm">⏱ {estTime}</span>
            </div>
          )}
          {orderTotal > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex justify-between text-sm font-bold">
              <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
              <span style={{ color: PRIMARY }}>{fmt(orderTotal)}</span>
            </div>
          )}
          <Link
            href={`/${slug}`}
            className="block w-full text-center text-white font-bold py-4 rounded-xl"
            style={{ backgroundColor: PRIMARY }}
          >
            {lang === 'vi' ? 'Quay lại thực đơn' : 'Back to Menu'}
          </Link>
        </div>
      </div>
    );
  }

  if (screen === 'declined') {
    const declineReason = orderNotes?.match(/Reason: (.+)/)?.[1] || '';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-sm w-full">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">❌</span>
          </div>
          <h2 className="font-bold text-2xl text-gray-900 mb-2">
            {lang === 'vi' ? 'Đơn hàng bị từ chối' : 'Order Declined'}
          </h2>
          {declineReason && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-4">
              <p className="text-red-700 text-sm">{lang === 'vi' ? 'Lý do: ' : 'Reason: '}{declineReason}</p>
            </div>
          )}
          <Link href={`/${slug}`} className="block w-full text-center text-white font-bold py-4 rounded-xl" style={{ backgroundColor: PRIMARY }}>
            {lang === 'vi' ? 'Quay lại thực đơn' : 'Back to Menu'}
          </Link>
        </div>
      </div>
    );
  }

  if (screen === 'timeout') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-sm w-full">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">⏰</span>
          </div>
          <h2 className="font-bold text-xl text-gray-900 mb-3">
            {lang === 'vi' ? 'Đơn hàng chưa được xác nhận.' : 'Order not confirmed.'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            {lang === 'vi' ? 'Vui lòng liên hệ nhà hàng.' : 'Please contact the restaurant.'}
          </p>
          <Link href={`/${slug}`} className="block w-full text-center text-white font-bold py-4 rounded-xl" style={{ backgroundColor: PRIMARY }}>
            {lang === 'vi' ? 'Quay lại thực đơn' : 'Back to Menu'}
          </Link>
        </div>
      </div>
    );
  }

  // ── LANDING SCREEN ────────────────────────────────────────────────────────

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <Link href={`/${slug}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <span className="font-bold text-gray-900 text-sm">{restaurant?.name || ''}</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#FFF0ED' }}>
                <svg className="w-8 h-8" fill="none" stroke={PRIMARY} viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
                </svg>
              </div>
              <h2 className="font-black text-2xl text-gray-900 mb-2">
                {lang === 'vi' ? 'Xác nhận đặt hàng' : 'Confirm your order'}
              </h2>
              <p className="text-sm text-gray-500">
                {lang === 'vi' ? 'Chọn hình thức tiếp tục' : 'Choose how to continue'}
              </p>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  {lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary'}
                </p>
                <div className="space-y-1.5">
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.qty}× {item.name}</span>
                      <span className="font-medium text-gray-900">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <p className="text-xs text-gray-400">+{cart.length - 3} {lang === 'vi' ? 'món khác' : 'more items'}</p>
                  )}
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-gray-100 mt-2">
                  <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                  <span style={{ color: PRIMARY }}>{fmt(subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setScreen('form')}
                className="w-full text-white rounded-2xl p-4 text-left transition-all"
                style={{ backgroundColor: PRIMARY, boxShadow: '0 8px 24px rgba(139,26,26,0.25)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">
                        {lang === 'vi' ? 'Tiếp tục không cần đăng nhập' : 'Continue without signing in'}
                      </p>
                      <p className="text-xs text-white/80">
                        {lang === 'vi' ? 'Không cần tạo tài khoản' : 'No account required'}
                      </p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>

              <Link
                href={`/login?redirect=/${slug}/checkout`}
                className="block w-full bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF0ED' }}>
                      <svg className="w-5 h-5" fill="none" stroke={PRIMARY} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        {lang === 'vi' ? 'Đăng nhập / Đăng ký' : 'Log in / Sign up'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lang === 'vi' ? 'Xem lại đơn hàng và nhận ưu đãi' : 'Track orders and get offers'}
                      </p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              {lang === 'vi' ? 'Bằng cách đặt hàng, bạn đồng ý với ' : 'By ordering you agree to our '}
              <Link href="/terms" style={{ color: PRIMARY }} className="underline">
                {lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => setScreen('landing')} className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full p-1 text-xs font-semibold" style={{ background: '#FFF0ED' }}>
              <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all" style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
              <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all" style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
            </div>
            <span className="text-sm font-semibold text-gray-500">{lang === 'vi' ? 'Thanh toán' : 'Checkout'}</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

        {/* LEFT: Form */}
        <div className="flex-1 space-y-6">

          {/* Order type toggle */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4">
              {lang === 'vi' ? 'Hình thức đặt hàng' : 'Order Type'}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(['pickup', 'delivery'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all"
                  style={orderType === t
                    ? { borderColor: PRIMARY, backgroundColor: '#FFF0ED', color: PRIMARY }
                    : { borderColor: '#E5E7EB', color: '#6B7280' }
                  }
                >
                  <span>{t === 'pickup' ? '🛍️' : '🛵'}</span>
                  {t === 'pickup'
                    ? (lang === 'vi' ? 'Mang về' : 'Pickup')
                    : (lang === 'vi' ? 'Giao hàng' : 'Delivery')}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <span className="text-orange-400">📞</span>
              {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  {lang === 'vi' ? 'Họ và tên' : 'Full Name'} *
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={() => touch('name')}
                  placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{ borderColor: touched.name && !name.trim() ? '#F87171' : '#E5E7EB' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    {lang === 'vi' ? 'Số điện thoại' : 'Phone'} *
                  </label>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onBlur={() => touch('phone')}
                    placeholder="0912 345 678"
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: touched.phone && (!phone || !isValidPhone(phone)) ? '#F87171' : '#E5E7EB' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => touch('email')}
                    placeholder="email@example.com"
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: touched.email && (!email || !isValidEmail(email)) ? '#F87171' : '#E5E7EB' }}
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    {lang === 'vi' ? 'Địa chỉ giao hàng' : 'Delivery Address'} *
                  </label>
                  <input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    onBlur={() => touch('address')}
                    placeholder={lang === 'vi' ? 'Số nhà, tên đường, phường, quận...' : 'Street address, ward, district...'}
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{ borderColor: touched.address && !address.trim() ? '#F87171' : '#E5E7EB' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <span className="text-orange-400">💳</span>
              {lang === 'vi' ? 'Phương thức thanh toán' : 'Payment Method'}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.filter(m => m.validFor.includes(orderType)).map(m => (
                <button
                  key={m.key}
                  onClick={() => setPaymentMethod(m.key)}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left"
                  style={paymentMethod === m.key
                    ? { borderColor: '#F97316', background: '#FFF7ED', color: '#C2410C' }
                    : { borderColor: '#E5E7EB', color: '#6B7280' }
                  }
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-xs leading-tight">{lang === 'vi' ? m.labelVi : m.labelEn}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'creditcard' && (
              <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{lang === 'vi' ? 'Số thẻ' : 'Card Number'} *</label>
                  <input
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{lang === 'vi' ? 'Ngày hết hạn' : 'Expiry'} *</label>
                    <input
                      value={cardExpiry}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
                        setCardExpiry(v);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">CVV *</label>
                    <input
                      value={cardCVV}
                      onChange={e => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{lang === 'vi' ? 'Tên chủ thẻ' : 'Cardholder Name'} *</label>
                  <input
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                    placeholder="NGUYEN VAN A"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                  />
                </div>
                <p className="text-xs text-gray-400">🔒 {lang === 'vi' ? 'Thông tin thẻ được mã hóa bảo mật bởi 9Pay.' : 'Card data encrypted by 9Pay.'}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <span className="text-orange-400">📝</span>
              {lang === 'vi' ? 'Ghi chú đặc biệt' : 'Special Instructions'}
            </h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={lang === 'vi' ? 'Ít đường, không hành, dị ứng thực phẩm...' : 'Less sugar, no onions, food allergies...'}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none"
            />
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-20">

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: '#FFF0ED' }}>
              <div>
                <h2 className="font-bold text-gray-900 text-base">{lang === 'vi' ? 'Đơn hàng của bạn' : 'Your Order'}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{restaurant?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg" style={{ color: PRIMARY }}>{fmt(subtotal)}</p>
                <p className="text-xs text-gray-500">{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</p>
              </div>
            </div>

            {/* Items */}
            <div className="px-5 py-4 space-y-3 max-h-60 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900 w-5 text-center flex-shrink-0">{item.qty}×</span>
                  <p className="flex-1 text-xs text-gray-700 leading-snug">{item.name}</p>
                  <p className="text-xs font-bold text-gray-900 flex-shrink-0">{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="px-5 py-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{lang === 'vi' ? 'Phí dịch vụ' : 'Service Fee'} ({(serviceFeePct * 100).toFixed(0)}%)</span>
                <span>{fmt(serviceFee)}</span>
              </div>
              {orderType === 'delivery' && deliveryFee > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>{lang === 'vi' ? 'Phí giao hàng' : 'Delivery Fee'}</span>
                  <span>{fmt(deliveryFee)}</span>
                </div>
              )}

              {/* Tip */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  {lang === 'vi' ? 'Tip cho nhân viên' : 'Tip for Staff'}
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 10, 15, 20].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setTipPercentage(pct)}
                      className="px-2 py-2 rounded-lg border text-xs font-semibold transition-all"
                      style={tipPercentage === pct
                        ? { borderColor: '#F97316', background: '#FFF7ED', color: '#C2410C' }
                        : { borderColor: '#E5E7EB', color: '#6B7280' }
                      }
                    >
                      {pct === 0 ? (lang === 'vi' ? 'Không' : 'None') : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {tipAmount > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Tip</span>
                  <span className="font-semibold text-orange-500">{fmt(tipAmount)}</span>
                </div>
              )}

              {orderType === 'delivery' && subtotal < (restaurant?.min_order_amount || 50000) && (
                <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                  ⚠️ {lang === 'vi'
                    ? `Đơn tối thiểu cho giao hàng là ${fmt(restaurant?.min_order_amount || 50000)}`
                    : `Min order for delivery is ${fmt(restaurant?.min_order_amount || 50000)}`}
                </p>
              )}

              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                <span style={{ color: PRIMARY }}>{fmt(total)}</span>
              </div>
            </div>

            {/* COD notice */}
            {paymentMethod === 'cod' && orderType === 'delivery' && (
              <div className="mx-5 mb-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-green-700">
                  🏠 {lang === 'vi' ? 'Thanh toán tiền mặt khi nhận hàng' : 'Pay cash upon delivery'}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mx-5 mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-xs text-red-600">⚠️ {error}</p>
              </div>
            )}

            {/* CTA */}
            <div className="px-5 pb-5">
              <button
                onClick={handlePlace}
                disabled={placing || cart.length === 0}
                className="w-full text-white font-bold py-4 rounded-xl text-sm transition-colors disabled:opacity-50"
                style={{ backgroundColor: PRIMARY, boxShadow: '0 4px 12px rgba(139,26,26,0.3)' }}
              >
                {placing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {lang === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                  </span>
                ) : (
                  `${lang === 'vi' ? 'Xác nhận đặt hàng' : 'Place Order'} · ${fmt(total)}`
                )}
              </button>

              {placing && ONLINE_METHODS.includes(paymentMethod) && (
                <p className="text-center text-xs text-gray-400 mt-2">
                  {lang === 'vi' ? 'Hoàn tất thanh toán trong:' : 'Complete payment within:'}{' '}
                  <span className={countdown.expired ? 'text-red-500 font-bold' : 'font-semibold text-gray-600'}>
                    {countdown.display}
                  </span>
                </p>
              )}

              <p className="text-center text-xs text-gray-400 mt-2">
                {lang === 'vi' ? 'Bằng cách đặt hàng, bạn đồng ý với điều khoản dịch vụ' : 'By ordering, you agree to our terms of service'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-100 py-4 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs text-gray-400">Powered by <a href="https://ovenly.io" className="hover:text-gray-600">Ovenly™</a></span>
        </div>
      </footer>
    </div>
  );
}