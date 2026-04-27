'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';


const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const TRACKASIA_KEY = process.env.NEXT_PUBLIC_TRACKASIA_API_KEY || '';
const fmt = (v: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);
const TERMINAL = ['completed', 'cancelled', 'timed_out', 'delivered', 'delivery_failed', 'picked_up'];
const STEPS_PICKUP   = ['preparing', 'ready', 'picked_up'];
const STEPS_DELIVERY = ['preparing', 'delivering', 'delivered'];

const STEP_LABELS: Record<string, { vi: string; en: string }> = {
  preparing:  { vi: 'Đang chuẩn bị', en: 'Preparing' },
  ready:      { vi: 'Sẵn sàng lấy', en: 'Ready' },
  picked_up:  { vi: 'Hoàn thành',    en: 'Completed' },
  completed:  { vi: 'Hoàn thành',    en: 'Completed' },
  delivering: { vi: 'Đang giao',     en: 'On the way' },
  delivered:  { vi: 'Đã giao',       en: 'Delivered' },
};

const STATUS_HEADLINE: Record<string, { vi: string; en: string }> = {
  confirmed:       { vi: 'Đơn hàng đã xác nhận',      en: 'Order confirmed' },
  preparing:       { vi: 'Quán đang chuẩn bị món',     en: 'Preparing your order' },
  ready:           { vi: 'Sẵn sàng lấy hàng!',         en: 'Ready for pickup!' },
  picked_up:       { vi: 'Đã hoàn thành. Cảm ơn bạn!', en: 'Completed. Thank you!' },
  delivering:      { vi: 'Đơn hàng đang trên đường',   en: 'Your order is on the way' },
  delivered:       { vi: 'Đơn hàng đã được giao',      en: 'Order delivered' },
  completed:       { vi: 'Đã hoàn thành. Cảm ơn bạn!', en: 'Completed. Thank you!' },
  cancelled:       { vi: 'Đơn hàng đã bị hủy',         en: 'Order cancelled' },
  timed_out:       { vi: 'Đơn hàng hết hạn',           en: 'Order expired' },
  delivery_failed: { vi: 'Giao hàng thất bại',          en: 'Delivery failed' },
};

const PAYMENT_LABELS: Record<string, string> = {
  cash_or_transfer: 'Tiền mặt / Chuyển khoản',
  cod: 'Tiền mặt khi nhận hàng',
  momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
};

// ── Parse est time lower bound (e.g. "10-20 phút" → 10) ──────────────────────
function parseEstMinutes(notes: string | null): number | null {
  if (!notes) return null;
  const match = notes.match(/Est:\s*(\d+)/);
  return match ? parseInt(match[1]) : null;
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ReceiptIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

// ── Map ────────────────────────────────────────────────────────────────────────
function MapView({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    let map: any;
    import('maplibre-gl').then((mod) => {
      const maplibregl = mod.default;
      import('maplibre-gl/dist/maplibre-gl.css' as any).catch(() => {});
      map = new maplibregl.Map({
        container: mapRef.current!,
        style: `https://maps.track-asia.com/styles/v1/streets.json?key=${TRACKASIA_KEY}`,
        center: [lng, lat],
        zoom: 15,
      });
      mapInstance.current = map;
      const el = document.createElement('div');
      el.style.cssText = `width:40px;height:40px;background:var(--color-primary,#8B1A1A);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.35);`;
      new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map);
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    });
    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, [lat, lng, name]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

// ── Step dots ──────────────────────────────────────────────────────────────────
function StepDots({ status, orderType, lang }: { status: string; orderType: string; lang: string }) {
  const steps = orderType === 'delivery' ? STEPS_DELIVERY : STEPS_PICKUP;
  // Map confirmed to preparing for display
  const displayStatus = status === 'confirmed' ? 'preparing' : status;
  const currentIdx = steps.indexOf(displayStatus) === -1 ? 0 : steps.indexOf(displayStatus);
  const C = 'var(--color-primary, #8B1A1A)';
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {steps.map((step, idx) => {
        const done = idx <= currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: active ? 14 : 10, height: active ? 14 : 10, borderRadius: '50%',
                background: done ? C : '#D1D5DB',
                boxShadow: active ? `0 0 0 4px color-mix(in srgb, var(--color-primary,#8B1A1A) 18%, transparent)` : 'none',
                transition: 'all 0.4s', flexShrink: 0,
              }} />
              <span style={{ fontSize: 10, color: done ? C : '#9CA3AF', fontWeight: active ? 700 : 500, whiteSpace: 'nowrap' }}>
                {lang === 'vi' ? STEP_LABELS[step]?.vi : STEP_LABELS[step]?.en}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: idx < currentIdx ? C : '#E5E7EB', margin: '0 3px', marginBottom: 22, transition: 'background 0.4s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [autoReady, setAutoReady] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const C = 'var(--color-primary, #8B1A1A)';

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${RAILWAY}/api/orders/${orderId}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      setOrder(data); return data;
    } catch { return null; }
  };

  const fetchRestaurant = async (id: string) => {
    try {
      const res = await fetch(`${RAILWAY}/api/restaurants/${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setRestaurant(data);
      if (data?.primary_color) document.documentElement.style.setProperty('--color-primary', data.primary_color);
    } catch {}
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder().then(data => { setLoading(false); if (data?.restaurant_id) fetchRestaurant(data.restaurant_id); });
  }, [orderId]);

  // Auto-transition pickup to 'ready' at est time lower bound
  useEffect(() => {
    if (!order || order.order_type !== 'pickup') return;
    if (order.status !== 'preparing') return;
    const mins = parseEstMinutes(order.notes);
    if (!mins) return;
    const confirmedAt = order.confirmed_at ? new Date(order.confirmed_at).getTime() : Date.now();
    const readyAt = confirmedAt + mins * 60 * 1000;
    const delay = readyAt - Date.now();
    if (delay <= 0) { setAutoReady(true); return; }
    const t = setTimeout(() => setAutoReady(true), delay);
    return () => clearTimeout(t);
  }, [order?.id, order?.status, order?.notes]);

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
      <Link href="/" style={{ color: C, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>{lang === 'vi' ? '← Trang chủ' : '← Home'}</Link>
    </div>
  );

  const terminalDate = order.updated_date || order.created_date;
  const isExpired = TERMINAL.includes(order.status) && terminalDate ? (Date.now() - new Date(terminalDate).getTime()) > 24 * 60 * 60 * 1000 : false;

  if (isExpired) return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#F9F7F5', minHeight: '100vh' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #F0EDE8', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <Link href="/" style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333' }}><BackIcon /></Link>
        <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{lang === "vi" ? "Chi tiết đơn hàng" : "Order details"}</p>
        <div style={{ width: 36 }} />
      </header>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 48px" }}>
        <div style={{ background: order.status === "completed" ? "#ECFDF5" : "#FEF2F2", borderRadius: 16, padding: "20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: order.status === "completed" ? "#D1FAE5" : "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{order.status === "completed" ? "✅" : "❌"}</div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 18, margin: 0, color: order.status === "completed" ? "#065F46" : "#DC2626" }}>{order.status === "completed" ? (lang === "vi" ? "Đơn hàng hoàn thành" : "Order completed") : (lang === "vi" ? "Đơn hàng đã hủy" : "Order cancelled")}</p>
            <p style={{ fontSize: 13, color: "#888", margin: "3px 0 0" }}>{order.updated_date ? new Date(order.updated_date).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}</p>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", marginBottom: 12, border: "1px solid #F0EDE8" }}>
          <p style={{ fontSize: 20, fontWeight: 900, color: "#111", margin: "0 0 2px", letterSpacing: "-0.5px" }}>#{orderId.slice(-8).toUpperCase()}</p>
          <p style={{ fontSize: 11, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", margin: 0 }}>{lang === "vi" ? "Mã đơn hàng" : "Order ID"}</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", marginBottom: 12, border: "1px solid #F0EDE8", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#999" }}>{lang === "vi" ? "Nhà hàng" : "Restaurant"}</span><span style={{ fontWeight: 600 }}>{order.restaurant_name}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#999" }}>{lang === "vi" ? "Tổng cộng" : "Total"}</span><span style={{ fontWeight: 800, color: C }}>{fmt(order.total || 0)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "#999" }}>{lang === "vi" ? "Thanh toán" : "Payment"}</span><span style={{ fontWeight: 600 }}>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span></div>
        </div>
        <Link href={'/order/' + orderId + '/receipt'} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 14, padding: "14px 16px", textDecoration: "none", color: "#333", border: "1px solid #F0EDE8", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><ReceiptIcon /></div><span style={{ fontWeight: 600, fontSize: 14 }}>{lang === "vi" ? "Xem hóa đơn" : "View receipt"}</span></div>
          <ChevronRightIcon />
        </Link>
        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: C, borderRadius: 14, padding: "14px", textDecoration: "none", color: "#fff", fontWeight: 700, fontSize: 15 }}>{lang === "vi" ? "Đặt món lại" : "Order again"}</Link>
      </div>
    </div>
  );
  // For pickup: auto-advance to 'ready' at est time
  const effectiveStatus = (autoReady && order.order_type === 'pickup' && order.status === 'preparing')
    ? 'ready'
    : order.status;
  const estTime = order.notes?.match(/Est: ([^|]+)/)?.[1]?.trim() || '';
  const items = Array.isArray(order.items) ? order.items : (typeof order.items === 'string' ? JSON.parse(order.items) : []);
  const isVI = lang === 'vi';
  const headline = STATUS_HEADLINE[effectiveStatus] || STATUS_HEADLINE.preparing;
  const hasMap = restaurant?.latitude && restaurant?.longitude;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.restaurant_address || restaurant?.name || '')}`;
  const isCancelled = ['cancelled', 'timed_out', 'delivery_failed'].includes(effectiveStatus);
  const isCompleted = ['completed', 'delivered', 'picked_up'].includes(effectiveStatus);

  return (
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#fff', height: '100dvh', overflow: 'hidden', position: 'relative', color: '#1a1a1a' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .sheet-scroll::-webkit-scrollbar { display: none; }
        .sheet-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-layout { display: grid !important; grid-template-columns: 1fr 400px; height: 100dvh; }
          .desktop-map-col { display: flex !important; }
          .bottom-sheet { position: relative !important; height: 100dvh !important; border-radius: 0 !important; box-shadow: none !important; border-left: 1px solid #F0EDE8 !important; }
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
        }
      `}</style>

      <div className="desktop-layout" style={{ display: 'block', height: '100dvh' }}>

        {/* Desktop map column */}
        <div className="desktop-map-col" style={{ display: 'none', flexDirection: 'column', position: 'relative', background: '#e8e4dc' }}>
          {hasMap && <MapView lat={Number(restaurant.latitude)} lng={Number(restaurant.longitude)} name={restaurant.name || order.restaurant_name} />}
          {/* Desktop lang toggle — top LEFT, away from zoom controls */}
          <div className="desktop-only" style={{ position: 'absolute', top: 16, left: 16, display: 'flex', background: 'rgba(255,255,255,0.96)', borderRadius: 10, padding: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '5px 14px', borderRadius: 7, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#999', fontWeight: lang === l ? 700 : 500, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', boxShadow: lang === l ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile map — top 50% */}
        <div className="mobile-only" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '50dvh', background: '#e8e4dc', zIndex: 0 }}>
          {hasMap
            ? <MapView lat={Number(restaurant.latitude)} lng={Number(restaurant.longitude)} name={restaurant.name || order.restaurant_name} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: '#999' }}>
                <MapPinIcon /><span style={{ fontSize: 13 }}>{order.restaurant_address}</span>
              </div>
          }
          {/* Back button — top left */}
          <Link href="/" style={{ position: 'absolute', top: 14, left: 14, width: 38, height: 38, background: 'rgba(255,255,255,0.96)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#333', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            <BackIcon />
          </Link>
          {/* Lang toggle — top left, next to back button, away from zoom (bottom-right) */}
          <div style={{ position: 'absolute', top: 14, left: 62, display: 'flex', background: 'rgba(255,255,255,0.96)', borderRadius: 10, padding: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 11px', borderRadius: 7, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#999', fontWeight: lang === l ? 700 : 500, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', boxShadow: lang === l ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom sheet / right panel */}
        <div
          className="bottom-sheet sheet-scroll"
          style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            height: sheetExpanded ? '92dvh' : '56dvh',
            background: '#fff',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.1)',
            zIndex: 10,
            overflowY: 'auto',
            transition: 'height 0.35s cubic-bezier(0.32,0.72,0,1)',
            animation: 'slideUp 0.4s ease',
          }}
        >
          {/* Drag handle */}
          <div className="mobile-only" onClick={() => setSheetExpanded(e => !e)} style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px', cursor: 'pointer' }}>
            <div style={{ width: 36, height: 4, background: '#E5E7EB', borderRadius: 2 }} />
          </div>

          <div style={{ padding: '12px 20px 56px' }}>

            {/* Status */}
            <div style={{ marginBottom: 18 }}>
              {isCancelled ? (
                <div style={{ background: '#FEF2F2', borderRadius: 14, padding: '14px 16px' }}>
                  <p style={{ fontWeight: 800, fontSize: 18, color: '#DC2626', margin: 0 }}>{isVI ? headline.vi : headline.en}</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: 'clamp(20px, 5.5vw, 28px)', fontWeight: 900, letterSpacing: '-0.5px', margin: 0, lineHeight: 1.15, color: '#111' }}>
                        {isVI ? headline.vi : headline.en}
                      </p>
                      {estTime && !isCompleted && (
                        <p style={{ fontSize: 13, color: '#888', margin: '5px 0 0', fontWeight: 500 }}>
                          ⏱ {order.order_type === 'delivery'
                            ? (lang === 'vi' ? `Dự kiến giao: ${estTime}` : `Est. delivery: ${estTime}`)
                            : (lang === 'vi' ? `Dự kiến lấy hàng: ${estTime}` : `Est. pickup: ${estTime}`)}
                        </p>
                      )}
                    </div>
                    {isCompleted && (
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>✅</div>
                    )}
                  </div>
                  <div style={{ background: '#F9F7F5', borderRadius: 12, padding: '12px 10px 8px' }}>
                    <StepDots status={effectiveStatus} orderType={order.order_type || 'pickup'} lang={lang} />
                  </div>
                </>
              )}
            </div>

            {/* Restaurant card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F9F7F5', borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}>
              {restaurant?.logo
                ? <img src={restaurant.logo} alt={restaurant.name} style={{ width: 46, height: 46, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '1px solid #eee' }} onError={e => (e.currentTarget.style.display = 'none')} />
                : <div style={{ width: 46, height: 46, borderRadius: 10, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>🍜</div>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.restaurant_name}</p>
                {order.restaurant_address && <p style={{ fontSize: 12, color: '#999', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.restaurant_address}</p>}
              </div>
              {/* Action buttons — clean SVG icons */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {restaurant?.phone && (
                  <a href={`tel:${restaurant.phone}`} style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#444', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <PhoneIcon />
                  </a>
                )}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#444', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <MapPinIcon />
                </a>
              </div>
            </div>

            {/* Order ID + items card */}
            <div style={{ background: '#fff', border: '1px solid #F0EDE8', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #F5F2EE' }}>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#111', margin: 0, letterSpacing: '-0.5px' }}>
                  #{orderId.slice(-8).toUpperCase()}
                </p>
                <p style={{ fontSize: 11, color: '#bbb', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', margin: '2px 0 0' }}>
                  {isVI ? 'Mã đơn hàng' : 'Order ID'}
                </p>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800, color: C }}>
                      {item.quantity}×
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#111' }}>{item.name}</p>
                      {item.addons?.length > 0 && <p style={{ fontSize: 11, color: '#bbb', margin: '2px 0 0' }}>{item.addons.map((a: any) => a.name).join(', ')}</p>}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111', flexShrink: 0 }}>{fmt(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px 14px', borderTop: '1px solid #F5F2EE', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {Number(order.subtotal) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#999' }}>
                    <span>{isVI ? 'Tạm tính' : 'Subtotal'}</span><span>{fmt(Number(order.subtotal))}</span>
                  </div>
                )}
                {Number(order.delivery_fee) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#999' }}>
                    <span>{isVI ? 'Phí giao hàng' : 'Delivery'}</span><span>{fmt(Number(order.delivery_fee))}</span>
                  </div>
                )}
                {Number(order.service_fee) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#999' }}>
                    <span>{isVI ? 'Phí dịch vụ' : 'Service fee'}</span><span>{fmt(Number(order.service_fee))}</span>
                  </div>
                )}
                {Number(order.promo_discount) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#059669' }}>
                    <span>{order.promo_code || (isVI ? 'Khuyến mãi' : 'Discount')}</span>
                    <span>−{fmt(Number(order.promo_discount))}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 900, color: '#111', paddingTop: 8, borderTop: '1px solid #F0EDE8', marginTop: 2 }}>
                  <span>{isVI ? 'Tổng cộng' : 'Total'}</span>
                  <span style={{ color: C }}>{fmt(order.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Savings */}
            {Number(order.promo_discount) > 0 && (
              <div style={{ background: '#ECFDF5', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>🎉</span>
                <span style={{ fontSize: 13, color: '#065F46', fontWeight: 700 }}>
                  {isVI ? `Tiết kiệm ${fmt(Number(order.promo_discount))} cho đơn này` : `You saved ${fmt(Number(order.promo_discount))} on this order`}
                </span>
              </div>
            )}

            {/* Payment info */}
            <div style={{ background: '#F9F7F5', borderRadius: 14, padding: '14px 16px', marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: isVI ? 'Khách hàng' : 'Customer', value: order.customer_name },
                order.customer_phone ? { label: isVI ? 'Điện thoại' : 'Phone', value: order.customer_phone } : null,
                { label: isVI ? 'Thanh toán' : 'Payment', value: PAYMENT_LABELS[order.payment_method] || order.payment_method },
                { label: isVI ? 'Hình thức' : 'Type', value: order.order_type === 'delivery' ? `🛵 ${isVI ? 'Giao hàng' : 'Delivery'}` : (isVI ? 'Mang về' : 'Pickup') },
                order.delivery_address && order.order_type === 'delivery' ? { label: isVI ? 'Giao đến' : 'Deliver to', value: order.delivery_address } : null,
              ].filter(Boolean).map((row: any, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, gap: 12 }}>
                  <span style={{ color: '#999' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, textAlign: 'right' }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* View receipt row */}
            <Link href={`/order/${orderId}/receipt`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9F7F5', borderRadius: 14, padding: '14px 16px', textDecoration: 'none', color: '#333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ReceiptIcon />
                </div>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{isVI ? 'Xem hóa đơn' : 'View receipt'}</span>
              </div>
              <ChevronRightIcon />
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