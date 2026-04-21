import type { Metadata } from 'next';
import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const DAYS_VI = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_KEY = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

async function getRestaurant(slug: string) {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRestaurant(slug);
  if (!r) return { title: 'Location | LÒ ĐỒ ĂN' };
  const title = `${r.name} | Địa Chỉ & Giờ Mở Cửa`;
  const description = r.address
    ? `Tìm ${r.name} tại ${r.address}. Xem giờ mở cửa và đặt món online trên LÒ ĐỒ ĂN.`
    : `Xem địa chỉ và giờ mở cửa của ${r.name} trên LÒ ĐỒ ĂN.`;
  return {
    title, description,
    alternates: { canonical: `https://www.lodoan.vn/${slug}/location` },
    openGraph: { title, description, url: `https://www.lodoan.vn/${slug}/location`, siteName: 'LÒ ĐỒ ĂN', locale: 'vi_VN' },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getRestaurant(slug);
  if (!r) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-bold text-gray-700 mb-4">Không tìm thấy nhà hàng</p>
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">← Quay lại</Link>
      </div>
    </div>
  );

  const todayIdx = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })).getDay();
  const schema = {
    '@context': 'https://schema.org', '@type': 'Restaurant', name: r.name,
    url: `https://www.lodoan.vn/${slug}`,
    address: r.address ? { '@type': 'PostalAddress', streetAddress: r.address, addressLocality: r.district || r.city || 'Việt Nam', addressCountry: 'VN' } : undefined,
    telephone: r.phone && r.phone !== 'N/A' ? r.phone : undefined,
    geo: r.latitude && r.longitude ? { '@type': 'GeoCoordinates', latitude: parseFloat(r.latitude), longitude: parseFloat(r.longitude) } : undefined,
  };

  const primaryColor = r.primary_color || '#8B1A1A';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root { --color-primary: ${primaryColor}; }` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
            <Link href={`/${slug}`} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
            </Link>
            {r.logo
              ? <img src={r.logo} alt={r.name} style={{ height: '40px', width: 'auto', maxWidth: '160px' }} className="object-contain" />
              : <span className="font-bold text-gray-900 text-sm">{r.name}</span>}
          </div>
        </header>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 flex gap-1 py-2">
            <Link href={`/${slug}`} className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">Menu</Link>
            <Link href={`/${slug}/location`} className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-white">Vị Trí</Link>
            <Link href={`/${slug}/reviews`} className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">Đánh Giá</Link>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900">Vị Trí & Giờ Mở Cửa</h2>
            {r.address && (
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                {r.latitude && r.longitude ? (
                  <MapWrapper latitude={parseFloat(r.latitude)} longitude={parseFloat(r.longitude)} name={r.name} />
                ) : (
                  <div className="h-44 bg-gray-100 flex flex-col items-center justify-center gap-3">
                    <p className="text-sm text-gray-500">Chưa có tọa độ bản đồ</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}`}
                      target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                      Xem trên Google Maps →
                    </a>
                  </div>
                )}
              </div>
            )}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
              {r.address && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Địa chỉ</p>
                    <p className="text-sm font-medium text-gray-900">{r.address}</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}`}
                      target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-semibold hover:underline mt-1 inline-block">
                      Mở trong Google Maps →
                    </a>
                  </div>
                </div>
              )}
              {r.phone && r.phone !== 'N/A' && r.phone !== 'n/a' && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Điện thoại</p>
                    <a href={`tel:${r.phone}`} className="text-sm font-medium text-primary hover:underline">{r.phone}</a>
                  </div>
                </div>
              )}
            </div>
            {r.hours && (
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/>
                  </svg>
                  <h3 className="font-bold text-gray-900">Giờ Mở Cửa</h3>
                </div>
                {DAYS_KEY.map((key, i) => {
                  const h = r.hours[key];
                  const isToday = i === todayIdx;
                  return (
                    <div key={key} className={`flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 px-2 rounded-lg ${isToday ? 'bg-primary/5' : ''}`}>
                      <span className={`text-sm ${isToday ? 'font-bold text-primary' : 'text-gray-700'}`}>
                        {DAYS_VI[i]}
                        {isToday && <span className="ml-2 text-xs bg-primary text-white px-1.5 py-0.5 rounded-full">Hôm nay</span>}
                      </span>
                      <span className={`text-sm font-semibold ${h ? (isToday ? 'text-primary' : 'text-gray-900') : 'text-gray-400'}`}>
                        {h || 'Đóng cửa'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="text-center">
              <Link href={`/${slug}`} className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90">
                Xem menu & đặt món
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}