'use client';

import { useState, useEffect } from 'react';
import { ownerAuth } from '@/lib/ownerAuth';

const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

function calcMetrics(order: any, session: any) {
  const subtotal = order.subtotal || 0;
  const tips = order.tip_amount || 0;
  const serviceFee = order.service_fee || 0;
  const deliveryFee = order.order_type === 'pickup' ? 0 : (order.delivery_fee || 0);
  const rate = ((order.order_type === 'pickup' ? session.pickupCommissionRate : session.deliveryCommissionRate) ?? 15) / 100;
  const commission = subtotal * rate;
  return { subtotal, tips, serviceFee, deliveryFee, commission, netRevenue: subtotal + tips - commission - serviceFee - deliveryFee };
}

export default function OwnerMonthlyPage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [orders, setOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    setLang(localStorage.getItem('owner_lang') || 'vi');
    setSession(ownerAuth.getSession());
    ownerAuth.getOrders().then(o => { setAllOrders(o); setLoading(false); });
    const onLang = (e: any) => setLang(e.detail);
    window.addEventListener('owner-lang-change', onLang);
    return () => window.removeEventListener('owner-lang-change', onLang);
  }, []);

  useEffect(() => {
    if (!allOrders.length) return;
    const [y, m] = month.split('-');
    const start = new Date(parseInt(y), parseInt(m) - 1, 1);
    const end = new Date(parseInt(y), parseInt(m), 0, 23, 59, 59);
    setOrders(allOrders.filter(o => {
      const d = new Date(o.created_date);
      return d >= start && d <= end && o.status === 'completed';
    }));
  }, [month, allOrders]);

  const totals = orders.reduce((acc, o) => {
    if (!session) return acc;
    const m = calcMetrics(o, session);
    return { subtotal: acc.subtotal + m.subtotal, tips: acc.tips + m.tips, serviceFee: acc.serviceFee + m.serviceFee, deliveryFee: acc.deliveryFee + m.deliveryFee, commission: acc.commission + m.commission, netRevenue: acc.netRevenue + m.netRevenue };
  }, { subtotal: 0, tips: 0, serviceFee: 0, deliveryFee: 0, commission: 0, netRevenue: 0 });

  const t = {
    title: lang === 'vi' ? 'Báo Cáo Tháng' : 'Monthly Report',
    selectMonth: lang === 'vi' ? 'Chọn Tháng' : 'Select Month',
    order: lang === 'vi' ? 'Mã Đơn' : 'Order',
    date: lang === 'vi' ? 'Ngày' : 'Date',
    type: lang === 'vi' ? 'Loại' : 'Type',
    subtotal: lang === 'vi' ? 'Cộng Tiền' : 'Subtotal',
    tips: lang === 'vi' ? 'Tips' : 'Tips',
    serviceFee: lang === 'vi' ? 'Phí DV' : 'Service Fee',
    deliveryFee: lang === 'vi' ? 'Phí Ship' : 'Delivery',
    platformFee: lang === 'vi' ? 'Phí Nền Tảng' : 'Platform Fee',
    net: lang === 'vi' ? 'Doanh Thu Thực' : 'Net Revenue',
    summary: lang === 'vi' ? 'Tóm Tắt' : 'Summary',
    pickup: lang === 'vi' ? 'Mang Về' : 'Pickup',
    delivery: lang === 'vi' ? 'Giao Hàng' : 'Delivery',
    noData: lang === 'vi' ? 'Không có dữ liệu' : 'No data',
    loading: lang === 'vi' ? 'Đang tải...' : 'Loading...',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-xl text-gray-900">{t.title}</h2>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">{t.selectMonth}</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[t.order, t.date, t.type, t.subtotal, t.tips, t.serviceFee, t.deliveryFee, t.platformFee, t.net].map(h => (
                <th key={h} className="px-3 py-3 text-right first:text-left text-xs font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={9} className="px-6 py-8 text-center text-gray-500">{t.loading}</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={9} className="px-6 py-8 text-center text-gray-500">{t.noData}</td></tr>
            ) : orders.map(order => {
              if (!session) return null;
              const m = calcMetrics(order, session);
              const isPickup = order.order_type === 'pickup';
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 font-mono text-gray-900">#{order.id?.slice(-6)}</td>
                  <td className="px-3 py-3 text-gray-500 text-xs text-right">{new Date(order.created_date).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPickup ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                      {isPickup ? t.pickup : t.delivery}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-gray-900">{fmt(m.subtotal)}</td>
                  <td className="px-3 py-3 text-right text-gray-900">{fmt(m.tips)}</td>
                  <td className="px-3 py-3 text-right text-gray-900">{fmt(m.serviceFee)}</td>
                  <td className="px-3 py-3 text-right text-gray-900">{fmt(m.deliveryFee)}</td>
                  <td className="px-3 py-3 text-right text-red-600">{fmt(m.commission)}</td>
                  <td className="px-3 py-3 text-right font-bold text-green-700">{fmt(m.netRevenue)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">{t.summary}</h3>
          <div className="space-y-2 text-sm max-w-sm">
            {[
              { label: t.subtotal, val: totals.subtotal, color: 'text-gray-900' },
              { label: t.tips, val: totals.tips, color: 'text-gray-900' },
              { label: t.serviceFee, val: totals.serviceFee, color: 'text-gray-900' },
              { label: t.deliveryFee, val: totals.deliveryFee, color: 'text-gray-900' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-600">{label}</span>
                <span className={`font-bold ${color}`}>{fmt(val)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">{t.platformFee}</span>
              <span className="font-bold text-red-600">{fmt(totals.commission)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900">{t.net}</span>
              <span className="text-lg font-bold text-green-700">{fmt(totals.netRevenue)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}