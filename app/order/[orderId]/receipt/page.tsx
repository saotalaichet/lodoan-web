'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const PAYMENT_LABELS: Record<string, string> = {
  cash_or_transfer: 'Tiền mặt / Chuyển khoản',
  cod: 'Tiền mặt khi nhận hàng',
  momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
};

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function ReceiptInner() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');
  const C = 'var(--color-primary, #8B1A1A)';

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    fetch(`${RAILWAY}/api/orders/${orderId}`)
      .then(r => r.json())
      .then(async data => {
        setOrder(data);
        setLoading(false);
        if (data?.restaurant_id) {
          try {
            const rRes = await fetch(`${RAILWAY}/api/restaurants/${data.restaurant_id}`);
            const rData = await rRes.json();
            setRestaurant(rData);
            if (rData?.primary_color) document.documentElement.style.setProperty('--color-primary', rData.primary_color);
          } catch {}
        }
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #eee', borderTop: `3px solid var(--color-primary,#8B1A1A)`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <p style={{ fontSize: 16, fontWeight: 600 }}>{lang === 'vi' ? 'Không tìm thấy đơn hàng' : 'Order not found'}</p>
      <Link href="/" style={{ color: C, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>← {lang === 'vi' ? 'Trang chủ' : 'Home'}</Link>
    </div>
  );

  const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);
  const isVI = lang === 'vi';
  const orderDate = order.created_date
    ? new Date(order.created_date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '';
  const isCompleted = ['completed', 'delivered'].includes(order.status);

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#F9F7F5', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .receipt-card { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="no-print" style={{ background: '#fff', borderBottom: '1px solid #F0EDE8', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href={`/order/${orderId}`} style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333' }}>
          <BackIcon />
        </Link>
        <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{isVI ? 'Hóa đơn' : 'Receipt'}</p>
        <button onClick={() => window.print()} style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5F2EE', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#333' }}>
          <PrintIcon />
        </button>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 48px' }}>

        {/* Receipt card */}
        <div className="receipt-card" style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>

          {/* Header — restaurant branding */}
          <div style={{ padding: '28px 24px 20px', textAlign: 'center', borderBottom: '1px dashed #E8E4DF' }}>
            {restaurant?.logo
              ? <img src={restaurant.logo} alt={restaurant.name || order.restaurant_name} style={{ height: 72, width: 'auto', maxWidth: 180, objectFit: 'contain', margin: '0 auto 14px', display: 'block' }} onError={e => (e.currentTarget.style.display = 'none')} />
              : <div style={{ width: 64, height: 64, borderRadius: 16, background: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 28 }}>🍜</div>
            }
            <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: '#111' }}>{order.restaurant_name}</p>
            {order.restaurant_address && <p style={{ fontSize: 13, color: '#999', margin: '4px 0 0' }}>{order.restaurant_address}</p>}
          </div>

          {/* Status badge + order number */}
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #F5F2EE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#111', margin: 0, letterSpacing: '-0.5px' }}>
                #{orderId.slice(-8).toUpperCase()}
              </p>
              <p style={{ fontSize: 12, color: '#bbb', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '2px 0 0' }}>
                {isVI ? 'Mã đơn hàng' : 'Order ID'}
              </p>
              {orderDate && <p style={{ fontSize: 12, color: '#bbb', margin: '4px 0 0' }}>{orderDate}</p>}
            </div>
            {isCompleted && (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <CheckIcon />
              </div>
            )}
          </div>

          {/* Items */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #F5F2EE', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800, color: C }}>
                  {item.quantity}×
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#111' }}>{item.name}</p>
                  {item.addons?.length > 0 && <p style={{ fontSize: 12, color: '#bbb', margin: '2px 0 0' }}>{item.addons.map((a: any) => a.name).join(', ')}</p>}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111', flexShrink: 0 }}>{fmt(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ padding: '14px 24px', borderBottom: '1px solid #F5F2EE', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Number(order.subtotal) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#999' }}>
                <span>{isVI ? 'Tạm tính' : 'Subtotal'}</span><span>{fmt(Number(order.subtotal))}</span>
              </div>
            )}
            {Number(order.delivery_fee) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#999' }}>
                <span>{isVI ? 'Phí giao hàng' : 'Delivery'}</span><span>{fmt(Number(order.delivery_fee))}</span>
              </div>
            )}
            {Number(order.service_fee) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#999' }}>
                <span>{isVI ? 'Phí dịch vụ' : 'Service fee'}</span><span>{fmt(Number(order.service_fee))}</span>
              </div>
            )}
            {Number(order.promo_discount) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#059669' }}>
                <span>{order.promo_code || (isVI ? 'Khuyến mãi' : 'Discount')}</span>
                <span>−{fmt(Number(order.promo_discount))}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 900, color: '#111', paddingTop: 10, borderTop: '1px solid #F0EDE8', marginTop: 4 }}>
              <span>{isVI ? 'Tổng cộng' : 'Total'}</span>
              <span style={{ color: C }}>{fmt(order.total || 0)}</span>
            </div>
          </div>

          {/* Savings */}
          {Number(order.promo_discount) > 0 && (
            <div style={{ margin: '0 24px', padding: '10px 14px', background: '#ECFDF5', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎉</span>
              <span style={{ fontSize: 13, color: '#065F46', fontWeight: 700 }}>
                {isVI ? `Tiết kiệm ${fmt(Number(order.promo_discount))}` : `Saved ${fmt(Number(order.promo_discount))}`}
              </span>
            </div>
          )}

          {/* Customer + payment */}
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: isVI ? 'Khách hàng' : 'Customer', value: order.customer_name },
              order.customer_phone ? { label: isVI ? 'Điện thoại' : 'Phone', value: order.customer_phone } : null,
              { label: isVI ? 'Thanh toán' : 'Payment', value: PAYMENT_LABELS[order.payment_method] || order.payment_method },
              { label: isVI ? 'Hình thức' : 'Type', value: order.order_type === 'delivery' ? (isVI ? 'Giao hàng' : 'Delivery') : (isVI ? 'Mang về' : 'Pickup') },
              order.delivery_address && order.order_type === 'delivery' ? { label: isVI ? 'Giao đến' : 'Deliver to', value: order.delivery_address } : null,
            ].filter(Boolean).map((row: any, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, gap: 12 }}>
                <span style={{ color: '#999' }}>{row.label}</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 24px 24px', borderTop: '1px dashed #E8E4DF', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#bbb', margin: 0 }}>{order.restaurant_name}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #eee', borderTop: '3px solid var(--color-primary,#8B1A1A)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <ReceiptInner />
    </Suspense>
  );
}