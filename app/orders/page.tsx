'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { customerAuth } from '@/lib/customerAuth';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

const PRIMARY = '#8B1A1A';
const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const STATUS_CONFIG: Record<string, { labelVi: string; labelEn: string; color: string; bg: string; icon: string }> = {
  pending:    { labelVi: 'Chờ xác nhận', labelEn: 'Pending',    color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
  confirmed:  { labelVi: 'Đã xác nhận',  labelEn: 'Confirmed',  color: '#2563EB', bg: '#DBEAFE', icon: '✅' },
  accepted:   { labelVi: 'Đã chấp nhận', labelEn: 'Accepted',   color: '#2563EB', bg: '#DBEAFE', icon: '👍' },
  preparing:  { labelVi: 'Đang chuẩn bị',labelEn: 'Preparing',  color: PRIMARY,   bg: '#FFF0ED', icon: '👨‍🍳' },
  ready:      { labelVi: 'Sẵn sàng',     labelEn: 'Ready',      color: '#059669', bg: '#D1FAE5', icon: '🛍️' },
  delivering: { labelVi: 'Đang giao',    labelEn: 'On the way', color: PRIMARY,   bg: '#FFF0ED', icon: '🛵' },
  completed:  { labelVi: 'Hoàn thành',   labelEn: 'Completed',  color: '#059669', bg: '#D1FAE5', icon: '✅' },
  delivered:  { labelVi: 'Đã giao',      labelEn: 'Delivered',  color: '#059669', bg: '#D1FAE5', icon: '✅' },
  declined:   { labelVi: 'Bị từ chối',   labelEn: 'Declined',   color: '#DC2626', bg: '#FEE2E2', icon: '❌' },
  cancelled:  { labelVi: 'Đã hủy',       labelEn: 'Cancelled',  color: '#6B7280', bg: '#F3F4F6', icon: '🚫' },
};

export default function OrdersPage() {
  const { lang, setLang } = useMarketplaceLang();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    customerAuth.getCustomer().then(async c => {
      if (!c) { setLoading(false); return; }
      setCustomer(c);
      await fetchOrders(c.email);
    });
  }, []);

  const fetchOrders = async (email: string) => {
    try {
      const token = customerAuth.getToken();
      const res = await fetch(`${RAILWAY}/api/auth/customer/orders`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setError(lang === 'vi' ? 'Không thể tải đơn hàng.' : 'Could not load orders.');
    } finally {
      setLoading(false);
    }
  };

  // Poll every 10s for real-time updates
  useEffect(() => {
    if (!customer?.email) return;
    const interval = setInterval(() => fetchOrders(customer.email), 10000);
    return () => clearInterval(interval);
  }, [customer?.email]);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  };

  const paymentLabel = (method: string) => {
    const map: Record<string, string> = {
      cash_or_transfer: lang === 'vi' ? 'Tiền mặt / CK' : 'Cash / Transfer',
      cod: 'COD', momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
    };
    return map[method] || method;
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(30,20%,97%)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
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
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
          {lang === 'vi' ? 'Đơn hàng của tôi' : 'My Orders'}
        </h1>
        <p className="text-gray-500 mb-8">
          {lang === 'vi' ? 'Theo dõi trạng thái đơn hàng theo thời gian thực' : 'Track your order status in real-time'}
        </p>

        {!customer ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔐</p>
            <p className="font-heading font-bold text-gray-700 text-lg mb-4">
              {lang === 'vi' ? 'Vui lòng đăng nhập để xem đơn hàng' : 'Please log in to view your orders'}
            </p>
            <Link href="/login" className="inline-block text-white font-heading font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: PRIMARY }}>
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
            <p className="font-heading font-bold text-gray-500 text-xl">
              {lang === 'vi' ? 'Chưa có đơn hàng nào' : 'No orders yet'}
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-6">
              {lang === 'vi' ? 'Lịch sử đặt hàng sẽ hiển thị ở đây' : 'Your order history will appear here'}
            </p>
            <Link href="/" className="inline-block text-white font-heading font-bold px-6 py-3 rounded-xl hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}>
              {lang === 'vi' ? 'Đặt món ngay' : 'Order now'}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              return (
                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-bold text-gray-900">{order.restaurant_name}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">{formatDate(order.created_date)}</p>
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: config.bg, color: config.color }}>
                      {config.icon} {lang === 'vi' ? config.labelVi : config.labelEn}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-500">{item.quantity}× {item.name}</span>
                        <span className="text-gray-700">{fmt(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {order.order_type === 'delivery'
                        ? (lang === 'vi' ? '🛵 Giao hàng' : '🛵 Delivery')
                        : (lang === 'vi' ? '🛍️ Mang về' : '🛍️ Pickup')}
                      {' · '}{paymentLabel(order.payment_method)}
                    </span>
                    <span className="font-heading font-bold text-base" style={{ color: PRIMARY }}>{fmt(order.total)}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-2 font-mono">#{order.id?.slice(-8).toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}