'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const PRIMARY = 'var(--color-primary, #8B1A1A)';
const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const TERMINAL = ['completed', 'cancelled', 'timed_out'];

const STEPS_PICKUP = ['confirmed', 'preparing', 'ready', 'completed'];
const STEPS_DELIVERY = ['confirmed', 'preparing', 'ready', 'delivering', 'completed'];

const STEP_LABELS: Record<string, { vi: string; en: string }> = {
  confirmed:  { vi: 'Đã đặt',        en: 'Placed' },
  preparing:  { vi: 'Đang làm',      en: 'Preparing' },
  ready:      { vi: 'Sẵn sàng',      en: 'Ready' },
  delivering: { vi: 'Đang giao',     en: 'On the way' },
  completed:  { vi: 'Hoàn thành',    en: 'Completed' },
  cancelled:  { vi: 'Đã hủy',        en: 'Cancelled' },
};

const STATUS_HEADLINE: Record<string, { vi: string; en: string }> = {
  confirmed:  { vi: 'Đơn hàng đã được xác nhận',     en: 'Order confirmed' },
  preparing:  { vi: 'Quán đang chuẩn bị đơn của bạn', en: 'Preparing your order' },
  ready:      { vi: 'Đơn hàng đã sẵn sàng',           en: 'Your order is ready' },
  delivering: { vi: 'Đơn hàng đang trên đường',       en: 'Your order is on the way' },
  completed:  { vi: 'Đơn hàng đã hoàn thành',         en: 'Order completed' },
  cancelled:  { vi: 'Đơn hàng đã bị hủy',             en: 'Order cancelled' },
  timed_out:  { vi: 'Đơn hàng đã hết giờ',            en: 'Order timed out' },
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
    el.style.cssText = `width:36px;height:36px;background:${PRIMARY};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
    new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).setPopup(new maplibregl.Popup({ offset: 25 }).setText(name)).addTo(map);
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => { map.remove(); mapInstance.current = null; };
  }, [lat, lng, name]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }} />;
}

function StatusBar({ status, orderType, lang }: { status: string; orderType: string; lang: string }) {
  const steps = orderType === 'delivery' ? STEPS_DELIVERY : STEPS_PICKUP;
  const currentIdx = status === 'cancelled' || status === 'timed_out'
    ? -1
    : steps.indexOf(status) === -1 ? 0 : steps.indexOf(status);

  if (status === 'cancelled' || status === 'timed_out') {
    return (
      <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
        <p style={{ color: '#DC2626', fontWeight: 700, fontSize: 14, margin: 0 }}>
          {lang === 'vi' ? '❌ Đơn hàng đã bị hủy' : '❌ Order cancelled'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
      {steps.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        const future = idx > currentIdx;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: active ? 28 : 22,
                height: active ? 28 : 22,
                borderRadius: '50%',
                background: done || active ? PRIMARY : '#E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: active ? `0 0 0 4px ${PRIMARY}33` : 'none',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}>
                {done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
                {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? PRIMARY : future ? '#9CA3AF' : '#6B7280', whiteSpace: 'nowrap', textAlign: 'center' }}>
                {lang === 'vi' ? STEP_LABELS[step]?.vi : STEP_LABELS[step]?.en}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? PRIMARY : '#E5E7EB', margin: '0 4px', marginBottom: 18, transition: 'background 0.3s' }} />
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
  const wsRef = useRef<WebSocket | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

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
    } catch {
      return null;
    }
  };

  const fetchRestaurant = async (restaurantId: string) => {
    try {
      const res = await fetch(`${RAILWAY}/api/restaurants/${restaurantId}`);
      if (!res.ok) return;
      const data = await res.json();
      setRestaurant(data);
      if (data?.primary_color) {
        document.documentElement.style.setProperty('--color-primary', data.primary_color);
      }
    } catch {}
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder().then(data => {
      setLoading(false);
      if (data?.restaurant_id) fetchRestaurant(data.restaurant_id);
    });
  }, [orderId]);

  // WebSocket with polling fallback
  useEffect(() => {
    if (!orderId || !order) return;
    if (TERMINAL.includes(order?.status)) return;

    const wsUrl = RAILWAY.replace('https://', 'wss://').replace('http://', 'ws://');
    const connect = () => {
      try {
        const ws = new WebSocket(`${wsUrl}/ws/order/${orderId}`);
        wsRef.current = ws;
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            if (msg.type === 'status_update' && msg.order) {
              setOrder(msg.order);
            }
          } catch {}
        };
        ws.onerror = () => startPolling();
        ws.onclose = () => {
          if (!TERMINAL.includes(order?.status)) startPolling();
        };
      } catch { startPolling(); }
    };

    const startPolling = () => {
      if (pollRef.current) return;
      pollRef.current = setInterval(async () => {
        const data = await fetchOrder();
        if (data && TERMINAL.includes(data.status)) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
        }
      }, 15000);
    };

    connect();
    return () => {
      wsRef.current?.close();
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    };
  }, [orderId, order?.status]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF8F0' }}>
      <div style={{ width: 44, height: 44, border: `4px solid ${PRIMARY}33`, borderTop: `4px solid ${PRIMARY}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!order) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAF8F0', padding: 24 }}>
      <p style={{ fontSize: 48, marginBottom: 16 }}>📦</p>
      <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{lang === 'vi' ? 'Không tìm thấy đơn hàng' : 'Order not found'}</h2>
      <Link href="/" style={{ color: PRIMARY, fontWeight: 600, textDecoration: 'none' }}>{lang === 'vi' ? 'Quay lại trang chủ' : 'Back to home'}</Link>
    </div>
  );

  const estTime = order.notes?.match(/Est: ([^|]+)/)?.[1]?.trim() || '';
  const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);
  const isVI = lang === 'vi';
  const headline = STATUS_HEADLINE[order.status] || STATUS_HEADLINE.confirmed;
  const hasMap = restaurant?.latitude && restaurant?.longitude;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.restaurant_address || restaurant?.name || '')}`;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#FAF8F0', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @media (min-width: 768px) {
          .track-layout { display: grid !important; grid-template-columns: 1fr 420px !important; height: calc(100vh - 60px) !important; }
          .track-map { display: block !important; }
          .track-sheet { overflow-y: auto; height: 100%; }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #F0E8E0', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ width: 80 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#888' }}>#{orderId.slice(-8).toUpperCase()}</span>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 2 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '3px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="track-layout" style={{ display: 'block' }}>

        {/* Map — hidden on mobile, shown on desktop */}
        <div className="track-map" style={{ display: 'none', background: '#e8e0d8', position: 'relative' }}>
          {hasMap ? (
            <MapView lat={Number(restaurant.latitude)} lng={Number(restaurant.longitude)} name={restaurant.name || order.restaurant_name} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F0EA' }}>
              <div style={{ textAlign: 'center', color: '#999' }}>
                <p style={{ fontSize: 40, marginBottom: 8 }}>🗺️</p>
                <p style={{ fontSize: 14 }}>{order.restaurant_address || order.restaurant_name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order details sheet */}
        <div className="track-sheet" style={{ padding: '20px 20px 40px', background: '#FAF8F0' }}>

          {/* Status headline */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 6, color: '#111' }}>
              {isVI ? headline.vi : headline.en}
            </h1>
            {estTime && !TERMINAL.includes(order.status) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '8px 14px', width: 'fit-content' }}>
                <span style={{ fontSize: 16 }}>⏱</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#C2410C' }}>{estTime}</span>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '16px 12px', marginBottom: 16, border: '1px solid #F0E8E0' }}>
            <StatusBar status={order.status} orderType={order.order_type || 'pickup'} lang={lang} />
          </div>



          {/* Restaurant info */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid #F0E8E0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: hasMap ? 12 : 0 }}>
              {restaurant?.logo && (
                <img src={restaurant.logo} alt={restaurant.name} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} onError={e => (e.currentTarget.style.display = 'none')} />
              )}
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: '#111' }}>{order.restaurant_name}</p>
                {order.restaurant_address && (
                  <p style={{ fontSize: 13, color: '#666', margin: '2px 0 0' }}>{order.restaurant_address}</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {restaurant?.phone && (
                <a href={`tel:${restaurant.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#FAF8F0', border: '1px solid #E8E0D8', borderRadius: 10, padding: '10px', textDecoration: 'none', color: PRIMARY, fontWeight: 600, fontSize: 13 }}>
                  📞 {isVI ? 'Gọi' : 'Call'}
                </a>
              )}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#FAF8F0', border: '1px solid #E8E0D8', borderRadius: 10, padding: '10px', textDecoration: 'none', color: PRIMARY, fontWeight: 600, fontSize: 13 }}>
                🗺️ {isVI ? 'Chỉ đường' : 'Directions'} <span style={{ fontSize: 18, fontWeight: 900, lineHeight: 1 }}>↗</span>
              </a>
            </div>
          </div>

          {/* Order items */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid #F0E8E0' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              {isVI ? 'Món đã đặt' : 'Items ordered'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 10, flex: 1 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FDF0EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: PRIMARY }}>
                      {item.quantity}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#111' }}>{item.name}</p>
                      {item.addons?.length > 0 && (
                        <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0' }}>{item.addons.map((a: any) => a.name).join(', ')}</p>
                      )}
                      {item.notes && <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', margin: '2px 0 0' }}>{item.notes}</p>}
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111', flexShrink: 0 }}>{fmt(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: '1px solid #F0E8E0', marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
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
                  <span>{isVI ? 'Khuyến mãi' : 'Discount'} {order.promo_code ? `(${order.promo_code})` : ''}</span>
                  <span>-{fmt(Number(order.promo_discount))}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#111', borderTop: '1px solid #F0E8E0', paddingTop: 8, marginTop: 2 }}>
                <span>{isVI ? 'Tổng cộng' : 'Total'}</span>
                <span style={{ color: PRIMARY }}>{fmt(order.total || 0)}</span>
              </div>
              {Number(order.promo_discount) > 0 && (
                <div style={{ background: '#D1FAE5', border: '1px solid #6EE7B7', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 14 }}>🏷️</span>
                  <span style={{ fontSize: 13, color: '#065F46', fontWeight: 600 }}>
                    {isVI ? `Bạn tiết kiệm ${fmt(Number(order.promo_discount))} cho đơn này` : `You saved ${fmt(Number(order.promo_discount))} on this order`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment details */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, border: '1px solid #F0E8E0' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              {isVI ? 'Chi tiết thanh toán' : 'Payment details'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666' }}>{isVI ? 'Họ tên' : 'Name'}</span>
                <span style={{ fontWeight: 600, color: '#111' }}>{order.customer_name}</span>
              </div>
              {order.customer_phone && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#666' }}>{isVI ? 'Số điện thoại' : 'Phone'}</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{order.customer_phone}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666' }}>{isVI ? 'Thanh toán' : 'Payment'}</span>
                <span style={{ fontWeight: 600, color: '#111' }}>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666' }}>{isVI ? 'Loại đơn' : 'Order type'}</span>
                <span style={{ fontWeight: 600, color: '#111' }}>
                  {order.order_type === 'delivery' ? (isVI ? '🛵 Giao hàng' : '🛵 Delivery') : (isVI ? 'Mang về' : 'Pickup')}
                </span>
              </div>
              {order.delivery_address && order.order_type === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, gap: 8 }}>
                  <span style={{ color: '#666', flexShrink: 0 }}>{isVI ? 'Địa chỉ giao' : 'Deliver to'}</span>
                  <span style={{ fontWeight: 600, color: '#111', textAlign: 'right' }}>{order.delivery_address}</span>
                </div>
              )}
            </div>
          </div>

          {/* View receipt link */}
          <Link href={`/order/${orderId}/receipt`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#888', fontSize: 14, textDecoration: 'none', padding: '12px 0' }}>
            {isVI ? 'Xem hóa đơn' : 'View receipt'} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF8F0' }}>
        <div style={{ width: 44, height: 44, border: '4px solid var(--color-primary, #8B1A1A)', borderTop: '4px solid var(--color-primary, #8B1A1A)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <OrderTrackingPage />
    </Suspense>
  );
}