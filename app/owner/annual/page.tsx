'use client';

import { useState, useEffect } from 'react';
import { ownerAuth } from '@/lib/ownerAuth';

const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

export default function OwnerAnnualPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    setLang(localStorage.getItem('owner_lang') || 'vi');
    const onLang = (e: any) => setLang(e.detail);
    window.addEventListener('owner-lang-change', onLang);
    return () => window.removeEventListener('owner-lang-change', onLang);
  }, []);

  useEffect(() => {
    const s = ownerAuth.getSession();
    setSession(s);
    setLoading(true);
    ownerAuth.getOrders().then(orders => {
      const completed = orders.filter((o: any) => o.status === 'completed');
      const monthly = [];
      for (let m = 0; m < 12; m++) {
        const start = new Date(year, m, 1);
        const end = new Date(year, m + 1, 0, 23, 59, 59);
        const mo = completed.filter((o: any) => {
          const d = new Date(o.created_date);
          return d >= start && d <= end;
        });
        const agg = mo.reduce((acc: any, o: any) => {
          const subtotal = parseFloat(o.subtotal) || 0;
          const tips = parseFloat(o.tip_amount) || 0;
          const serviceFee = parseFloat(o.service_fee) || 0;
          const deliveryFee = o.order_type === 'pickup' ? 0 : (parseFloat(o.delivery_fee) || 0);
          const rate = ((o.order_type === 'pickup' ? parseFloat(s?.pickupCommissionRate) : parseFloat(s?.deliveryCommissionRate)) ?? 15) / 100;
          const commission = subtotal * rate;
          return {
            subtotal: acc.subtotal + subtotal,
            tips: acc.tips + tips,
            serviceFee: acc.serviceFee + serviceFee,
            deliveryFee: acc.deliveryFee + deliveryFee,
            commission: acc.commission + commission,
            netRevenue: acc.netRevenue + (subtotal + tips - commission - serviceFee - deliveryFee),
          };
        }, { subtotal: 0, tips: 0, serviceFee: 0, deliveryFee: 0, commission: 0, netRevenue: 0 });
        monthly.push({ month: m + 1, orders: mo.length, ...agg });
      }
      setData(monthly);
      setLoading(false);
    });
  }, [year]);

  const totals = data.reduce((acc, m) => ({
    orders: acc.orders + m.orders,
    subtotal: acc.subtotal + m.subtotal,
    tips: acc.tips + m.tips,
    serviceFee: acc.serviceFee + m.serviceFee,
    deliveryFee: acc.deliveryFee + m.deliveryFee,
    commission: acc.commission + m.commission,
    netRevenue: acc.netRevenue + m.netRevenue,
  }), { orders: 0, subtotal: 0, tips: 0, serviceFee: 0, deliveryFee: 0, commission: 0, netRevenue: 0 });

  const months = lang === 'vi'
    ? Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`)
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const t = {
    title: lang === 'vi' ? 'Báo Cáo Năm' : 'Annual Report',
    year: lang === 'vi' ? 'Năm' : 'Year',
    month: lang === 'vi' ? 'Tháng' : 'Month',
    orders: lang === 'vi' ? 'Đơn' : 'Orders',
    subtotal: lang === 'vi' ? 'Cộng Tiền' : 'Subtotal',
    tips: 'Tips',
    serviceFee: lang === 'vi' ? 'Phí DV' : 'Svc Fee',
    deliveryFee: lang === 'vi' ? 'Phí Ship' : 'Delivery',
    platformFee: lang === 'vi' ? 'Phí Nền Tảng' : 'Platform Fee',
    net: lang === 'vi' ? 'Doanh Thu Thực' : 'Net Revenue',
    total: lang === 'vi' ? 'Tổng' : 'Total',
    loading: lang === 'vi' ? 'Đang tải...' : 'Loading...',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-xl text-gray-900">{t.title}</h2>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">{t.year}</label>
          <input type="number" min={2024} max={new Date().getFullYear() + 1} value={year}
            onChange={e => setYear(parseInt(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[t.month, t.orders, t.subtotal, t.tips, t.serviceFee, t.deliveryFee, t.platformFee, t.net].map(h => (
                <th key={h} className="px-3 py-3 text-right first:text-left text-xs font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={8} className="px-6 py-8 text-center text-gray-500">{t.loading}</td></tr>
            ) : data.map((m, i) => (
              <tr key={i} className={`hover:bg-gray-50 ${m.orders === 0 ? 'opacity-40' : ''}`}>
                <td className="px-3 py-3 font-medium text-gray-900">{months[i]}</td>
                <td className="px-3 py-3 text-right text-gray-900">{m.orders}</td>
                <td className="px-3 py-3 text-right text-gray-900">{fmt(m.subtotal)}</td>
                <td className="px-3 py-3 text-right text-gray-900">{fmt(m.tips)}</td>
                <td className="px-3 py-3 text-right text-gray-900">{fmt(m.serviceFee)}</td>
                <td className="px-3 py-3 text-right text-gray-900">{fmt(m.deliveryFee)}</td>
                <td className="px-3 py-3 text-right text-red-600">{fmt(m.commission)}</td>
                <td className="px-3 py-3 text-right font-bold text-green-700">{fmt(m.netRevenue)}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
              <td className="px-3 py-3 text-gray-900">{t.total}</td>
              <td className="px-3 py-3 text-right text-gray-900">{totals.orders}</td>
              <td className="px-3 py-3 text-right text-gray-900">{fmt(totals.subtotal)}</td>
              <td className="px-3 py-3 text-right text-gray-900">{fmt(totals.tips)}</td>
              <td className="px-3 py-3 text-right text-gray-900">{fmt(totals.serviceFee)}</td>
              <td className="px-3 py-3 text-right text-gray-900">{fmt(totals.deliveryFee)}</td>
              <td className="px-3 py-3 text-right text-red-600">{fmt(totals.commission)}</td>
              <td className="px-3 py-3 text-right text-green-700">{fmt(totals.netRevenue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}