'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PRIMARY = '#8B1A1A';
const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const BASE44_HEADERS = {
  'api-key': process.env.NEXT_PUBLIC_BASE44_API_KEY!,
  'Content-Type': 'application/json',
};

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const STATUS_CONFIG: Record<string, { label: string; labelVi: string; color: string; bg: string; icon: string }> = {
  pending:    { label: 'Pending',    labelVi: 'Chờ xác nhận', color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
  confirmed:  { label: 'Confirmed',  labelVi: 'Đã xác nhận',  color: '#2563EB', bg: '#DBEAFE', icon: '✅' },
  accepted:   { label: 'Accepted',   labelVi: 'Đã chấp nhận', color: '#2563EB', bg: '#DBEAFE', icon: '👍' },
  preparing:  { label: 'Preparing',  labelVi: 'Đang chuẩn bị', color: PRIMARY,  bg: '#FFF0ED', icon: '👨‍🍳' },
  ready:      { label: 'Ready',      labelVi: 'Sẵn sàng',     color: '#059669', bg: '#D1FAE5', icon: '🛍️' },
  delivering: { label: 'On the way', labelVi: 'Đang giao',    color: PRIMARY,   bg: '#FFF0ED', icon: '🛵' },
  completed:  { label: 'Completed',  labelVi: 'Hoàn thành',   color: '#059669', bg: '#D1FAE5', icon: '✅' },
  declined:   { label: 'Declined',   labelVi: 'Bị từ chối',   color: '#DC2626', bg: '#FEE2E2', icon: '❌' },
  cancelled:  { label: 'Cancelled',  labelVi: 'Đã hủy',       color: '#6B7280', bg: '#F3F4F6', icon: '🚫' },
};

interface OrderItem { name: string; quantity: number; price: number; }
interface Order {
  id: string;
  restaurant_name: string;
  status: string;
  order_type: string;
  payment_method: string;
  items: OrderItem[];
  total: number;
  created_date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language');
    if (stored) setLang(stored);

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('customer_session_token');
        const customerData = localStorage.getItem('customer_data');
        if (!token || !customerData) { setLoading(false); return; }
        const customer = JSON.parse(customerData);

        const res = await fetch(
          `${BASE44_URL}/entities/Order?customer_email=${encodeURIComponent(customer.email)}&_sort=-created_date&_limit=50`,
          { headers: BASE44_HEADERS }
        );
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setError(lang === 'vi' ? 'Không thể tải đơn hàng.' : 'Could not load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const customerData = typeof window !== 'undefined' ? localStorage.getItem('customer_data') : null;
  const isLoggedIn = !!customerData;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  };

  const paymentLabel = (method: string) => {
    const map: Record<string, string> = {
      cash_or_transfer: lang === 'vi' ? 'Tiền mặt / CK' : 'Cash / Transfer',
      cod: lang === 'vi' ? 'COD' : 'Cash on Delivery',
      momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
      creditcard: lang === 'vi' ? 'Thẻ tín dụng' : 'Credit Card',
    };
    return map[method] || method;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
              <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
            </div>
            <Link href="/profile" className="text-sm font-medium text-gray-500 hover:text-gray-800">
              {lang === 'vi' ? 'Hồ sơ' : 'Profile'}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {lang === 'vi' ? 'Đơn hàng của tôi' : 'My Orders'}
        </h1>
        <p className="text-gray-500 mb-8">
          {lang === 'vi' ? 'Theo dõi trạng thái đơn hàng theo thời gian thực' : 'Track your order status in real-time'}
        </p>

        {!isLoggedIn ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔐</p>
            <p className="text-lg font-bold text-gray-700 mb-2">
              {lang === 'vi' ? 'Vui lòng đăng nhập để xem đơn hàng' : 'Please log in to view your orders'}
            </p>
            <Link href="/login" className="inline-block mt-4 text-white font-bold px-6 py-3 rounded-xl" style={{ backgroundColor: PRIMARY }}>
              {lang === 'vi' ? 'Đăng nhập' : 'Login'}
            </Link>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-32 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600">⚠️ {error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-xl font-bold text-gray-500">
              {lang === 'vi' ? 'Chưa có đơn hàng nào' : 'No orders yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {lang === 'vi' ? 'Lịch sử đặt hàng sẽ hiển thị ở đây' : 'Your order history will appear here'}
            </p>
            <Link href="/" className="inline-block mt-6 text-white font-bold px-6 py-3 rounded-xl" style={{ backgroundColor: PRIMARY }}>
              {lang === 'vi' ? 'Đặt món ngay' : 'Order now'}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              return (
                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{order.restaurant_name}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">{formatDate(order.created_date)}</p>
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: config.bg, color: config.color }}>
                      {config.icon} {lang === 'vi' ? config.labelVi : config.label}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-500">{item.quantity}× {item.name}</span>
                        <span className="text-gray-700">{fmt(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {order.order_type === 'delivery' ? (lang === 'vi' ? '🛵 Giao hàng' : '🛵 Delivery') : (lang === 'vi' ? '🛍️ Mang về' : '🛍️ Pickup')}
                      {' · '}{paymentLabel(order.payment_method)}
                    </span>
                    <span className="font-bold text-base" style={{ color: PRIMARY }}>{fmt(order.total)}</span>
                  </div>

                  <p className="text-xs text-gray-300 mt-2 font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}