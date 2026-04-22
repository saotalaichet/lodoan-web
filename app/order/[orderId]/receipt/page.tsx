'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const PRIMARY = '#8B1A1A';

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const PAYMENT_LABELS: Record<string, string> = {
  cash_or_transfer: 'Tiền mặt / Chuyển khoản',
  cod: 'Tiền mặt khi nhận hàng',
  momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
};

function ReceiptInner() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    fetch(`${RAILWAY}/api/orders/${orderId}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: `4px solid ${PRIMARY}33`, borderTop: `4px solid ${PRIMARY}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 16 }}>{lang === 'vi' ? 'Không tìm thấy đơn hàng' : 'Order not found'}</p>
      <Link href="/" style={{ color: PRIMARY }}>← {lang === 'vi' ? 'Trang chủ' : 'Home'}</Link>
    </div>
  );

  const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);
  const isVI = lang === 'vi';
  const orderDate = order.created_date ? new Date(order.created_date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#fff', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
        }
      `}</style>

      {/* Print controls */}
      <div className="no-print" style={{ background: '#FAF8F0', borderBottom: '1px solid #F0E8E0', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href={`/order/${orderId}`} style={{ color: PRIMARY, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
          ← {isVI ? 'Theo dõi đơn hàng' : 'Track order'}
        </Link>
        <button onClick={() => window.print()} style={{ background: PRIMARY, color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          🖨️ {isVI ? 'In hóa đơn' : 'Print receipt'}
        </button>
      </div>

      {/* Receipt */}
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28, paddingBottom: 20, borderBottom: '2px dashed #E5E7EB' }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: PRIMARY, margin: '0 0 4px' }}>LÒ ĐỒ ĂN</h1>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 4px' }}>{order.restaurant_name}</p>
          {order.restaurant_address && <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{order.restaurant_address}</p>}
        </div>

        {/* Order info */}
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#666' }}>{isVI ? 'Số đơn' : 'Order'}</span>
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace' }}>#{orderId.slice(-8).toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#666' }}>{isVI ? 'Thời gian' : 'Date'}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{orderDate}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: '#666' }}>{isVI ? 'Loại đơn' : 'Type'}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              {order.order_type === 'delivery' ? (isVI ? 'Giao hàng' : 'Delivery') : (isVI ? 'Mang về' : 'Pickup')}
            </span>
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: 16 }}>
          {items.map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{item.quantity}× {item.name}</p>
                {item.addons?.length > 0 && <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0' }}>{item.addons.map((a: any) => a.name).join(', ')}</p>}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, flexShrink: 0 }}>{fmt(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
            <span>{isVI ? 'Tạm tính' : 'Subtotal'}</span>
            <span>{fmt(order.subtotal || 0)}</span>
          </div>
          {Number(order.delivery_fee) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
              <span>{isVI ? 'Phí giao hàng' : 'Delivery fee'}</span>
              <span>{fmt(Number(order.delivery_fee))}</span>
            </div>
          )}
          {Number(order.service_fee) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
              <span>{isVI ? 'Phí dịch vụ' : 'Service fee'}</span>
              <span>{fmt(Number(order.service_fee))}</span>
            </div>
          )}
          {Number(order.promo_discount) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#059669' }}>
              <span>{isVI ? 'Khuyến mãi' : 'Discount'}</span>
              <span>-{fmt(Number(order.promo_discount))}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, borderTop: '2px solid #E5E7EB', paddingTop: 10, marginTop: 4 }}>
            <span>{isVI ? 'Tổng cộng' : 'Total'}</span>
            <span style={{ color: PRIMARY }}>{fmt(order.total || 0)}</span>
          </div>
        </div>

        {/* Customer & payment */}
        <div style={{ background: '#FAF8F0', borderRadius: 12, padding: 14, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#666' }}>{isVI ? 'Khách hàng' : 'Customer'}</span>
            <span style={{ fontWeight: 600 }}>{order.customer_name}</span>
          </div>
          {order.customer_phone && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#666' }}>{isVI ? 'Điện thoại' : 'Phone'}</span>
              <span style={{ fontWeight: 600 }}>{order.customer_phone}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: '#666' }}>{isVI ? 'Thanh toán' : 'Payment'}</span>
            <span style={{ fontWeight: 600 }}>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span>
          </div>
          {order.delivery_address && order.order_type === 'delivery' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 8 }}>
              <span style={{ color: '#666', flexShrink: 0 }}>{isVI ? 'Địa chỉ' : 'Address'}</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{order.delivery_address}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#999', fontSize: 12, borderTop: '2px dashed #E5E7EB', paddingTop: 16 }}>
          <p style={{ margin: '0 0 4px', fontWeight: 600, color: PRIMARY }}>LÒ ĐỒ ĂN by Ovenly</p>
          <p style={{ margin: 0 }}>lodoan.vn · hello@ovenly.io</p>
        </div>
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '4px solid #8B1A1A33', borderTop: '4px solid #8B1A1A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>}>
      <ReceiptInner />
    </Suspense>
  );
}