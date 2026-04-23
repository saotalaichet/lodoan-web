'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';
const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);
const TERMINAL = ['completed', 'cancelled', 'timed_out'];
const STEPS_PICKUP = ['confirmed', 'preparing', 'ready', 'completed'];
const STEPS_DELIVERY = ['confirmed', 'preparing', 'ready', 'delivering', 'completed'];

const STEP_LABELS: Record<string, { vi: string; en: string }> = {
  confirmed:  { vi: 'Đặt hàng', en: 'Placed' },
  preparing:  { vi: 'Chuẩn bị', en: 'Preparing' },
  ready:      { vi: 'Sẵn sàng', en: 'Ready' },
  delivering: { vi: 'Đang giao', en: 'On the way' },
  completed:  { vi: 'Hoàn thành', en: 'Done' },
};

const STATUS_HEADLINE: Record<string, { vi: string; en: string }> = {
  confirmed:  { vi: 'Đơn hàng đã xác nhận', en: 'Order confirmed' },
  preparing:  { vi: 'Đang chuẩn bị món', en: 'Kitchen is preparing' },
  ready:      { vi: 'Sẵn sàng lấy hàng', en: 'Ready for pickup' },
  delivering: { vi: 'Đang trên đường giao', en: 'On the way' },
  completed:  { vi: 'Đã giao thành công', en: 'Delivered' },
  cancelled:  { vi: 'Đơn hàng đã hủy', en: 'Order cancelled' },
  timed_out:  { vi: 'Đơn hàng hết hạn', en: 'Order expired' },
};

const PAYMENT_LABELS: Record<string, string> = {
  cash_or_transfer: 'Tiền mặt / Chuyển khoản',
  cod: 'Tiền mặt khi nhận hàng',
  momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
};

function MapView({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://maps.track-asia.com/styles/v1/streets.json?key=${TRACKASIA_KEY}`,
      center: [lng, lat],
      zoom: 15,
    });
    mapInstance.current = map;
    const el = document.createElement('div');
    el.style.cssText = `width:40px;height:40px;background:var(--color-primary,#8B1A1A);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.35);`;
    new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    return () => { map.remove(); mapInstance.current = null; };
  }, [lat, lng, name]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

function StepDots({ status, orderType, lang }: { status: string; orderType: string; lang: string }) {
  const steps = orderType === 'delivery' ? STEPS_DELIVERY : STEPS_PICKUP;
  const currentIdx = steps.indexOf(status) === -1 ? 0 : steps.indexOf(status);
  const color = 'var(--color-primary, #8B1A1A)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((step, idx) => {
        const done = idx <= currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: active ? 14 : 10, height: active ? 14 : 10,
                borderRadius: '50%',
                background: done ? color : '#D1D5DB',
                boxShadow: active ? `0 0 0 4px color-mix(in srgb, var(--color-primary,#8B1A1A) 20%, transparent)` : 'none',
                transition: 'all 0.4s',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 10, color: done ? color : '#9CA3AF', fontWeight: active ? 700 : 500, whiteSpace: 'nowrap' }}>
                {lang === 'vi' ? STEP_LABELS[step]?.vi : STEP_LABELS[step]?.en}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: idx < currentIdx ? color : '#E5E7EB', margin: '0 4px', marginBottom: 22, transition: 'background 0.4s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const color = 'var(--color-primary, #8B1A1A)';

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${RAILWAY}/api/orders/${orderId}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      setOrder(data);
      return data;
    } catch { return null; }
  };

  const fetchRestaurant = async (restaurantId: string) => {
    try {
      const res = await fetch(`${RAILWAY}/api/restaurants/${restaurantId}`);
      if (!res.ok) return;
      const data = await res.json();
      setRestaurant(data);
      if (data?.primary_color) document.documentElement.style.setProperty('--color-primary', data.primary_color);
    } catch {}
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder().then(data => {
      setLoading(false);
      if (data?.restaurant_id) fetchRestaurant(data.restaurant_id);
    });
  }, [orderId]);

  useEffect(() => {
    if (!orderId || !order || TERMINAL.includes(order?.status)) return;
    const wsUrl = RAILWAY.replace('https://', 'wss://').replace('http://', 'ws://');
    const startPolling = () => {
      if (pollRef.current) return;
      pollRef.current = setInterval(async () => {
        const data = await fetchOrder();
        if (data && TERMINAL.includes(data.status)) { clearInterval(pollRef.current!); pollRef.current = null; }
      }, 15000);
    };
    try {
      const ws = new WebSocket(`${wsUrl}/ws/order/${orderId}`);
      wsRef.current = ws;
      ws.onmessage = (e) => {
        try { const msg = JSON.parse(e.data); if (msg.type === 'status_update' && msg.order) setOrder(msg.order); } catch {}
      };
      ws.onerror = () => startPolling();
      ws.onclose = () => { if (!TERMINAL.includes(order?.status)) startPolling(); };
    } catch { startPolling(); }
    return () => {
      wsRef.current?.close();
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    };
  }, [orderId, order?.status]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #eee', borderTop: `3px solid var(--color-primary,#8B1A1A)`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: 24, gap: 12 }}>
      <p style={{ fontSize: 48 }}>📦</p>
      <h2 style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>{lang === 'vi' ? 'Không tìm thấy đơn hàng' : 'Order not found'}</h2>
      <Link href="/" style={{ color, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>{lang === 'vi' ? '← Trang chủ' : '← Home'}</Link>
    </div>
  );

  const estTime = order.notes?.match(/Est: ([^|]+)/)?.[1]?.trim() || '';
  const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);
  const isVI = lang === 'vi';
  const headline = STATUS_HEADLINE[order.status] || STATUS_HEADLINE.confirmed;
  const hasMap = restaurant?.latitude && restaurant?.longitude;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.restaurant_address || restaurant?.name || '')}`;
  const isCancelled = order.status === 'cancelled' || order.status === 'timed_out';
  const isCompleted = order.status === 'completed';

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#fff', height: '100dvh', overflow: 'hidden', position: 'relative', color: '#1a1a1a' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sheet-scroll::-webkit-scrollbar { display: none; }
        .sheet-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-layout { display: grid !important; grid-template-columns: 1fr 400px; height: 100dvh; }
          .desktop-map { display: block !important; }
          .desktop-sheet { height: 100dvh; overflow-y: auto; border-radius: 0 !important; box-shadow: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
        }
      `}</style>

      <div className="desktop-layout" style={{ display: 'block', height: '100dvh' }}>

        {/* ── MAP ── */}
        <div className="desktop-map" style={{ display: 'none', position: 'relative', background: '#e8e4dc' }}>
          {hasMap && <MapView lat={Number(restaurant.latitude)} lng={Number(restaurant.longitude)} name={restaurant.name || order.restaurant_name} />}
          {/* Desktop lang toggle */}
          <div className="desktop-only" style={{ position: 'absolute', top: 16, left: 16, display: 'flex', background: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 12px', borderRadius: 7, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 700 : 400, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', boxShadow: lang === l ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ── MOBILE MAP (top 50%) ── */}
        <div className="mobile-only" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '50dvh', background: '#e8e4dc', zIndex: 0 }}>
          {hasMap
            ? <MapView lat={Number(restaurant.latitude)} lng={Number(restaurant.longitude)} name={restaurant.name || order.restaurant_name} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: '#999' }}>
                <span style={{ fontSize: 36 }}>🗺️</span>
                <span style={{ fontSize: 13 }}>{order.restaurant_address}</span>
              </div>
          }
          {/* Mobile lang toggle */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', background: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 7, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 700 : 400, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Back button */}
          <Link href="/" style={{ position: 'absolute', top: 16, left: 16, width: 36, height: 36, background: 'rgba(255,255,255,0.95)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333', fontSize: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            ←
          </Link>
        </div>

        {/* ── BOTTOM SHEET ── */}
        <div
          className="desktop-sheet sheet-scroll"
          style={{
            position: 'fixed' as const,
            bottom: 0, left: 0, right: 0,
            height: sheetExpanded ? '92dvh' : '58dvh',
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.12)',
            zIndex: 10,
            overflowY: 'auto',
            transition: 'height 0.35s cubic-bezier(0.32,0.72,0,1)',
            animation: 'slideUp 0.4s ease',
          }}
        >
          {/* Drag handle */}
          <div
            className="mobile-only"
            onClick={() => setSheetExpanded(e => !e)}
            style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, cursor: 'pointer' }}
          >
            <div style={{ width: 40, height: 4, background: '#E5E7EB', borderRadius: 2 }} />
          </div>

          <div style={{ padding: '16px 20px 48px' }}>

            {/* Status + time */}
            <div style={{ marginBottom: 20 }}>
              {isCancelled ? (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 14, padding: '14px 18px', marginBottom: 4 }}>
                  <p style={{ fontWeight: 800, fontSize: 18, color: '#DC2626', margin: 0 }}>❌ {isVI ? headline.vi : headline.en}</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 900, letterSpacing: '-0.5px', margin: 0, lineHeight: 1.1, color: '#111' }}>
                        {isVI ? headline.vi : headline.en}
                      </p>
                      {estTime && !isCompleted && (
                        <p style={{ fontSize: 14, color: '#666', margin: '6px 0 0', fontWeight: 500 }}>
                          ⏱ {estTime}
                        </p>
                      )}
                    </div>
                    {isCompleted && (
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 24 }}>✅</span>
                      </div>
                    )}
                  </div>
                  {/* Step dots */}
                  <div style={{ background: '#FAFAFA', borderRadius: 14, padding: '14px 12px 10px' }}>
                    <StepDots status={order.status} orderType={order.order_type || 'pickup'} lang={lang} />
                  </div>
                </>
              )}
            </div>

            {/* Restaurant card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FAFAFA', borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}>
              {restaurant?.logo
                ? <img src={restaurant.logo} alt={restaurant.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '1px solid #eee' }} onError={e => (e.currentTarget.style.display = 'none')} />
                : <div style={{ width: 48, height: 48, borderRadius: 10, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>🍜</div>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.restaurant_name}</p>
                {order.restaurant_address && <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.restaurant_address}</p>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {restaurant?.phone && (
                  <a href={`tel:${restaurant.phone}`} style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    📞
                  </a>
                )}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  🗺️
                </a>
              </div>
            </div>

            {/* Order number + items */}
            <div style={{ background: '#fff', border: '1px solid #F0EDE8', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
              {/* Order number header */}
              <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #F5F2EE' }}>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#111', margin: 0, letterSpacing: '-0.3px' }}>
                  #{orderId.slice(-8).toUpperCase()}
                </p>
                <p style={{ fontSize: 11, color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '2px 0 0' }}>
                  {isVI ? 'Đơn hàng' : 'Order ID'}
                </p>
              </div>
              {/* Items */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 800, color }}>
                      {item.quantity}×
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#111' }}>{item.name}</p>
                      {item.addons?.length > 0 && <p style={{ fontSize: 12, color: '#aaa', margin: '2px 0 0' }}>{item.addons.map((a: any) => a.name).join(', ')}</p>}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111', flexShrink: 0 }}>{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              {/* Totals */}
              <div style={{ padding: '10px 16px 14px', borderTop: '1px solid #F5F2EE', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {Number(order.subtotal) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888' }}>
                    <span>{isVI ? 'Tạm tính' : 'Subtotal'}</span><span>{fmt(Number(order.subtotal))}</span>
                  </div>
                )}
                {Number(order.delivery_fee) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888' }}>
                    <span>{isVI ? 'Phí giao hàng' : 'Delivery'}</span><span>{fmt(Number(order.delivery_fee))}</span>
                  </div>
                )}
                {Number(order.service_fee) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888' }}>
                    <span>{isVI ? 'Phí dịch vụ' : 'Service fee'}</span><span>{fmt(Number(order.service_fee))}</span>
                  </div>
                )}
                {Number(order.promo_discount) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#059669' }}>
                    <span>🏷️ {order.promo_code || (isVI ? 'Khuyến mãi' : 'Discount')}</span>
                    <span>-{fmt(Number(order.promo_discount))}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 900, color: '#111', paddingTop: 8, borderTop: '1px solid #F0EDE8', marginTop: 2 }}>
                  <span>{isVI ? 'Tổng cộng' : 'Total'}</span>
                  <span style={{ color }}>{fmt(order.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Savings badge */}
            {Number(order.promo_discount) > 0 && (
              <div style={{ background: '#D1FAE5', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>🎉</span>
                <span style={{ fontSize: 13, color: '#065F46', fontWeight: 700 }}>
                  {isVI ? `Bạn đã tiết kiệm ${fmt(Number(order.promo_discount))} cho đơn này` : `You saved ${fmt(Number(order.promo_discount))} on this order`}
                </span>
              </div>
            )}

            {/* Payment + delivery info */}
            <div style={{ background: '#FAFAFA', borderRadius: 14, padding: '14px 16px', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>{isVI ? 'Khách hàng' : 'Customer'}</span>
                <span style={{ fontWeight: 600 }}>{order.customer_name}</span>
              </div>
              {order.customer_phone && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#888' }}>{isVI ? 'Điện thoại' : 'Phone'}</span>
                  <span style={{ fontWeight: 600 }}>{order.customer_phone}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>{isVI ? 'Thanh toán' : 'Payment'}</span>
                <span style={{ fontWeight: 600 }}>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#888' }}>{isVI ? 'Hình thức' : 'Type'}</span>
                <span style={{ fontWeight: 600 }}>
                  {order.order_type === 'delivery' ? `🛵 ${isVI ? 'Giao hàng' : 'Delivery'}` : `${isVI ? 'Mang về' : 'Pickup'}`}
                </span>
              </div>
              {order.delivery_address && order.order_type === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, gap: 12 }}>
                  <span style={{ color: '#888', flexShrink: 0 }}>{isVI ? 'Giao đến' : 'Deliver to'}</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>{order.delivery_address}</span>
                </div>
              )}
            </div>

            {/* View receipt */}
            <Link href={`/order/${orderId}/receipt`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#F5F0EB', borderRadius: 12, padding: '13px', textDecoration: 'none', color: '#555', fontWeight: 600, fontSize: 14 }}>
              🧾 {isVI ? 'Xem hóa đơn' : 'View receipt'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #eee', borderTop: '3px solid var(--color-primary,#8B1A1A)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <OrderTrackingPage />
    </Suspense>
  );
}