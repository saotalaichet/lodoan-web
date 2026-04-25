'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { ownerAuth } from '@/lib/ownerAuth';

const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

function getCommissionRate(order: any, session: any) {
  return ((order.order_type === 'pickup' ? parseFloat(session?.pickupCommissionRate) : parseFloat(session?.deliveryCommissionRate)) || 15) / 100;
}

function calcNet(order: any, session: any, refundAmount = 0) {
  const subtotal = parseFloat(order.subtotal) || 0;
  const tips = parseFloat(order.tip_amount) || 0;
  const serviceFee = parseFloat(order.service_fee) || 0;
  const deliveryFee = order.order_type === 'pickup' ? 0 : (parseFloat(order.delivery_fee) || 0);
  const commission = subtotal * getCommissionRate(order, session);
  return subtotal + tips - commission - serviceFee - deliveryFee - parseFloat(refundAmount) || 0;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  picked_up: 'bg-green-100 text-green-700',
  delivered: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-600',
  cancelled: 'bg-red-100 text-red-600',
  pending: 'bg-yellow-100 text-yellow-700',
  pending_cod: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  preparing: 'bg-purple-100 text-purple-700',
  confirmed: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  delivering: 'bg-blue-100 text-blue-700',
  delivery_failed: 'bg-red-100 text-red-600',
  timed_out: 'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<string, { vi: string; en: string }> = {
  completed: { vi: 'Hoàn Thành', en: 'Completed' },
  picked_up: { vi: 'Đã Lấy', en: 'Picked Up' },
  delivered: { vi: 'Đã Giao', en: 'Delivered' },
  declined: { vi: 'Từ Chối', en: 'Declined' },
  cancelled: { vi: 'Đã Hủy', en: 'Cancelled' },
  pending: { vi: 'Chờ Xử Lý', en: 'Pending' },
  pending_cod: { vi: 'Chờ COD', en: 'Pending COD' },
  accepted: { vi: 'Đã Nhận', en: 'Accepted' },
  preparing: { vi: 'Đang Chuẩn Bị', en: 'Preparing' },
  confirmed: { vi: 'Đã Xác Nhận', en: 'Confirmed' },
  ready: { vi: 'Sẵn Sàng', en: 'Ready' },
  delivering: { vi: 'Đang Giao', en: 'Delivering' },
  delivery_failed: { vi: 'Giao Thất Bại', en: 'Delivery Failed' },
  timed_out: { vi: 'Hết Hạn', en: 'Timed Out' },
};

export default function OwnerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    setLang(localStorage.getItem('owner_lang') || 'vi');
    const onLang = (e: any) => setLang(e.detail);
    window.addEventListener('owner-lang-change', onLang);
    const s = ownerAuth.getSession();
    setSession(s);
    Promise.all([ownerAuth.getOrders(), ownerAuth.getRefunds()])
      .then(([o, r]) => { setOrders(o); setRefunds(r); })
      .finally(() => setLoading(false));
    return () => window.removeEventListener('owner-lang-change', onLang);
  }, []);

  const t = {
    title: lang === 'vi' ? 'Tất Cả Đơn Hàng' : 'All Orders',
    export: lang === 'vi' ? 'Xuất CSV' : 'Export CSV',
    order: lang === 'vi' ? 'Mã Đơn' : 'Order',
    date: lang === 'vi' ? 'Ngày Giờ' : 'Date & Time',
    type: lang === 'vi' ? 'Loại' : 'Type',
    total: lang === 'vi' ? 'Tổng' : 'Total',
    net: lang === 'vi' ? 'Doanh Thu Thực' : 'Net Revenue',
    payment: lang === 'vi' ? 'Thanh Toán' : 'Payment',
    status: lang === 'vi' ? 'Trạng Thái' : 'Status',
    pickup: lang === 'vi' ? 'Mang Về' : 'Pickup',
    delivery: lang === 'vi' ? 'Giao Hàng' : 'Delivery',
    loading: lang === 'vi' ? 'Đang tải...' : 'Loading...',
    noOrders: lang === 'vi' ? 'Chưa có đơn hàng' : 'No orders',
  };

  const handleExport = () => {
    const csv = [
      ['Order', 'Date', 'Type', 'Total', 'Net Revenue', 'Payment', 'Status'].join(','),
      ...orders.map(o => {
        const refund = refunds.find(r => r.order_id === o.id);
        const isCompleted = ['completed', 'picked_up', 'delivered'].includes(o.status);
const net = isCompleted ? calcNet(o, session, refund?.refund_amount || 0) : '';
        return [o.id?.slice(-6), new Date(o.created_date).toLocaleString('vi-VN'), o.order_type, o.total, net, o.payment_method, o.status].join(',');
      }),
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `orders_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-900">{t.title}</h2>
        <button onClick={handleExport} disabled={orders.length === 0}
          className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-50 transition-opacity">
          <Download className="w-4 h-4" /> {t.export}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[t.order, t.date, t.type, t.total, t.net, t.payment, t.status].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">{t.loading}</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">{t.noOrders}</td></tr>
            ) : orders.map(order => {
              const isPickup = order.order_type === 'pickup';
              const refund = refunds.find(r => r.order_id === order.id);
              const isCompleted = ['completed', 'picked_up', 'delivered'].includes(order.status);
const net = isCompleted ? calcNet(order, session, refund?.refund_amount || 0) : null;
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-900">#{order.id?.slice(-6)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(order.created_date).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPickup ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                      {isPickup ? t.pickup : t.delivery}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900">{fmt(order.total)}</td>
                  <td className="px-4 py-3 font-bold text-green-700">
                    {net !== null ? (
                      <div>
                        {fmt(net)}
                        {refund && <p className="text-xs text-red-600">-{fmt(refund.refund_amount)}</p>}
                      </div>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{order.payment_method}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {STATUS_LABELS[order.status]?.[lang] || order.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}