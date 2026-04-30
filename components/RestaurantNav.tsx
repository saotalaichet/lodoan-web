'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const T = {
  vi: {
    orderNow: 'Đặt món',
    signIn: 'Log in',
    signOut: 'Log out',
    menu: 'Menu',
    menuSub: 'Xem thực đơn & đặt hàng',
    location: 'Vị Trí',
    locationSub: 'Địa chỉ & giờ mở cửa',
    reviews: 'Đánh Giá',
    reviewsSub: 'Từ khách đã đặt hàng',
    locations: 'Tất Cả Địa Điểm',
    locationsSub: 'Tìm chi nhánh khác',
  },
  en: {
    orderNow: 'Order Now',
    signIn: 'Log in',
    signOut: 'Log out',
    menu: 'Menu',
    menuSub: 'View menu & order',
    location: 'Location',
    locationSub: 'Address & hours',
    reviews: 'Reviews',
    reviewsSub: 'From verified orders',
    locations: 'All Locations',
    locationsSub: 'Find another branch',
  },
};

export default function RestaurantNav({ restaurant, slug, lang = 'vi' }: { restaurant: any; slug: string; lang?: 'vi' | 'en' }) {
  const t = T[lang];
  const [navOpen, setNavOpen] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center min-w-0 flex-shrink">
            {restaurant.logo
              ? <img src={restaurant.logo} alt={restaurant.name} className="object-contain flex-shrink-0" style={{ height: '56px', width: 'auto', maxWidth: '180px' }}
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const span = document.createElement('span');
                    span.textContent = restaurant.name;
                    span.className = 'font-bold text-gray-900 text-sm truncate';
                    img.parentNode?.insertBefore(span, img);
                  }} />
              : <span className="font-bold text-gray-900 text-sm truncate max-w-[140px]">{restaurant.name}</span>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href={`/${slug}`}
              className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
              {t.orderNow}
            </Link>
            {customer ? (
              <button onClick={() => window.location.href = '/profile'}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl px-2.5 py-1.5 transition-colors">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-black text-white">{customer.full_name?.[0]?.toUpperCase() || '?'}</span>
                </div>
                <span className="hidden md:inline text-xs font-semibold text-gray-700 max-w-[80px] truncate">{customer.full_name?.split(' ').pop()}</span>
              </button>
            ) : (
              <button onClick={() => { localStorage.setItem('checkout_redirect', `/${slug}`); window.location.href = '/login'; }}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition-colors">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span className="hidden md:inline">{t.signIn}</span>
              </button>
            )}
            <button onClick={() => setNavOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Navigation">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {navOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setNavOpen(false)} />
          <div className="relative ml-auto w-64 bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              {restaurant.logo
                ? <img src={restaurant.logo} alt={restaurant.name} className="w-auto object-contain" style={{ height: '48px', maxWidth: '160px' }}
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const span = document.createElement('span');
                      span.textContent = restaurant.name;
                      span.className = 'font-bold text-sm text-gray-900 truncate';
                      img.parentNode?.insertBefore(span, img);
                    }} />
                : <span className="font-bold text-sm text-gray-900 truncate">{restaurant.name}</span>}
              <button onClick={() => setNavOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 flex-shrink-0 ml-2">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {([
                { label: t.menu, sub: t.menuSub, path: `/${slug}` },
                ...(restaurant.brand_id ? [
                  { label: t.locations, sub: t.locationsSub, path: `/${slug}/locations` }
                ] : []),
                { label: t.location, sub: t.locationSub, path: `/${slug}/location` },
                { label: t.reviews, sub: t.reviewsSub, path: `/${slug}/reviews` },
              ]).map(item => (
                <Link key={item.path} href={item.path} onClick={() => setNavOpen(false)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all text-left hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </nav>
            {customer && (
              <div className="px-3 pb-3 border-t border-gray-100 pt-3 space-y-1">
                <button onClick={() => { window.location.href = '/profile'; setNavOpen(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-left">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-white">{customer.full_name?.[0]?.toUpperCase() || '?'}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 truncate">{customer.full_name}</span>
                </button>
                <button onClick={() => { customerAuth.logout().then(() => { setCustomer(null); setNavOpen(false); }); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl">
                  {t.signOut}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
