'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import FilterBar from './FilterBar';
import { Restaurant } from '@/lib/api';

const PRIMARY = '#8B1A1A';
const CURRENT_YEAR = new Date().getFullYear();

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const CUISINE_DISPLAY: Record<string, { en: string; vi: string }> = {
  Vietnamese: { en: 'Vietnamese', vi: 'Việt Nam' },
  Japanese: { en: 'Japanese', vi: 'Nhật Bản' },
  Korean: { en: 'Korean', vi: 'Hàn Quốc' },
  Chinese: { en: 'Chinese', vi: 'Trung Hoa' },
  Thai: { en: 'Thai', vi: 'Thái Lan' },
  Italian: { en: 'Italian', vi: 'Ý' },
  American: { en: 'American', vi: 'Mỹ' },
  Fusion: { en: 'Fusion', vi: 'Đa Phong Cách' },
  Cafe: { en: 'Cafe', vi: 'Cafe' },
  Dessert: { en: 'Dessert', vi: 'Tráng Miệng' },
  DessertCafeBubbleTea: { en: 'Dessert Cafe', vi: 'Tráng Miệng & Trà Sữa' },
  Other: { en: 'Other', vi: 'Khác' },
};

function normalize(str: string) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase().trim();
}

function RestaurantCard({ restaurant, lang, search }: { restaurant: Restaurant; lang: string; search: string }) {
  const isOpen = restaurant.is_open && restaurant.is_accepting_orders;
  const firstLetter = restaurant.name?.charAt(0)?.toUpperCase() || '?';
  const rawCuisine = restaurant.cuisine_type || '';
  const cuisineLabel = rawCuisine
    ? (CUISINE_DISPLAY[rawCuisine]?.[lang === 'vi' ? 'vi' : 'en'] ?? rawCuisine)
    : '';

  return (
    <Link href={`/${restaurant.slug}`} className="block">
      <div
        className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full cursor-pointer"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
      >
        {/* Banner */}
        <div className="relative flex-shrink-0" style={{ height: '180px' }}>
          {restaurant.banner ? (
            <Image src={restaurant.banner} alt={restaurant.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#F5F0EE' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D4C5C0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" opacity="0.4"/>
                <path d="M7 12h10M8 9c0 0 1 1.5 4 1.5S16 9 16 9"/>
                <path d="M9 15c0 0 1 2 3 2s3-2 3-2"/>
              </svg>
            </div>
          )}
          <div className="absolute top-2 right-2 z-20">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
              style={isOpen
                ? { background: '#F0FDF4', color: '#166534', border: '1px solid #86EFAC' }
                : { background: '#F9FAFB', color: '#6B7280', border: '1px solid #E5E7EB' }}>
              {isOpen ? '● Đang Mở' : '● Đã Đóng Cửa'}
            </span>
          </div>
          <div className="absolute flex items-center justify-center overflow-hidden"
            style={{ bottom: '-16px', left: '12px', width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.12)', zIndex: 10 }}>
            {restaurant.logo ? (
              <Image src={restaurant.logo} alt="" width={40} height={40} className="object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '700' }}>{firstLetter}</span>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1" style={{ padding: '24px 14px 14px 14px' }}>
          <h3 className="font-bold leading-tight mb-1.5" style={{ fontSize: '15px', color: '#1A1A1A' }}>
            {restaurant.name}
          </h3>
          {cuisineLabel && (
            <span className="inline-block self-start text-[11px] font-semibold px-2 py-0.5 rounded-full mb-2"
              style={{ background: '#FFF0ED', color: PRIMARY }}>
              {cuisineLabel}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 flex-1" style={{ fontSize: '12px', color: '#888888' }}>
            {restaurant.delivery_fee !== undefined && (
              <span>{restaurant.delivery_fee === 0 ? (lang === 'vi' ? 'Miễn phí ship' : 'Free delivery') : `${lang === 'vi' ? 'Phí ship' : 'Delivery'}: ${fmt(restaurant.delivery_fee)}`}</span>
            )}
            {restaurant.min_order_amount && restaurant.min_order_amount > 0 && (
              <span>{lang === 'vi' ? 'Tối thiểu' : 'Min'}: {fmt(restaurant.min_order_amount)}</span>
            )}
          </div>
          <button
            className="w-full h-9 font-bold rounded-lg text-sm transition-opacity mt-auto"
            style={isOpen
              ? { background: PRIMARY, color: 'white' }
              : { background: '#D3D3D3', color: '#666', cursor: 'not-allowed' }}>
            {isOpen ? (lang === 'vi' ? 'Đặt Ngay' : 'Order Now') : (lang === 'vi' ? 'Đang Đóng Cửa' : 'Currently Closed')}
          </button>
        </div>
      </div>
    </Link>
  );
}

const POPULAR_VI = ['Phở', 'Bánh Mì', 'Cơm', 'Bún Bò', 'Hải Sản', 'Lẩu'];
const POPULAR_EN = ['Pho', 'Banh Mi', 'Rice', 'Beef Noodles', 'Seafood', 'Hotpot'];

export default function MarketplaceClient({ restaurants }: { restaurants: Restaurant[] }) {
  const [lang, setLang] = useState('vi');
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [nearMe, setNearMe] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = restaurants.filter(r => r.slug);
    if (search.trim()) {
      const q = normalize(search);
      list = list.filter(r =>
        normalize(r.name).includes(q) ||
        normalize(r.cuisine_type || '').includes(q) ||
        normalize(r.address || '').includes(q)
      );
    }
    if (selectedCuisines.length > 0) {
      list = list.filter(r => selectedCuisines.includes(r.cuisine_type || ''));
    }
    if (selectedCity) {
      list = list.filter(r => (r as any).city === selectedCity);
    }
    return list;
  }, [restaurants, search, selectedCuisines, selectedCity]);

  const toggleCuisine = (key: string) => setSelectedCuisines(prev => prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]);
  const toggleDietary = (key: string) => setSelectedDietary(prev => prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]);
  const clearAll = () => { setSelectedCuisines([]); setSelectedDietary([]); setSelectedCity(null); setNearMe(false); };

  const popular = lang === 'vi' ? POPULAR_VI : POPULAR_EN;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center flex-shrink-0" style={{ gap: '10px' }}>
            <Image src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" width={44} height={44} className="object-contain" style={{ height: '44px', width: 'auto' }} />
            <div className="leading-none">
              <div className="font-black text-xl tracking-tight leading-none" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</div>
              <div className="text-[10px] font-normal text-gray-400 leading-tight">by Ovenly</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 flex-1">
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Giới Thiệu</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Liên Hệ</Link>
          </nav>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all" style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
              <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all" style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
            </div>
            <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              {lang === 'vi' ? 'Đăng Nhập' : 'Login'}
            </Link>
            <Link href="/signup" className="text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: PRIMARY }}>
              {lang === 'vi' ? 'Đăng Ký' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="text-white py-14 px-4" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, hsl(0,75%,28%) 50%, hsl(0,60%,18%) 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-black mb-3 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            {lang === 'vi' ? 'Khám Phá Nhà Hàng Tuyệt Vời' : 'Discover Amazing Restaurants'}
          </h1>
          <p className="text-white/80 mb-8 text-base md:text-lg">
            {lang === 'vi' ? 'Đặt món dễ dàng — Giao hàng nhanh chóng' : 'Easy ordering — Fast delivery'}
          </p>
          <div className="max-w-2xl mx-auto">
            {/* Search */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex gap-2 items-center">
                <svg className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder={lang === 'vi' ? 'Tìm nhà hàng hoặc món ăn...' : 'Search restaurants or dishes...'}
                  className="flex-1 text-sm text-gray-700 outline-none py-2 bg-transparent"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button className="text-white px-5 py-3 rounded-xl font-bold text-sm flex-shrink-0" style={{ backgroundColor: PRIMARY }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
              {/* Popular searches */}
              {searchFocused && !search.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl p-4 z-50" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '1px solid #F0F0F0' }}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                    {lang === 'vi' ? 'Tìm kiếm phổ biến' : 'Popular searches'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map(term => (
                      <button key={term} onClick={() => { setSearch(term); setSearchFocused(false); }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:border-red-800 hover:text-red-800 hover:bg-red-50 transition-all">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
              <button onClick={() => setNearMe(!nearMe)} className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {nearMe ? (lang === 'vi' ? '✓ Đang dùng vị trí hiện tại' : '✓ Using current location') : (lang === 'vi' ? 'Dùng vị trí hiện tại' : 'Use my current location')}
              </button>
              <span className="text-white/40 hidden sm:block">•</span>
              <Link href="/login" className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                {lang === 'vi' ? 'Đăng nhập để lưu địa chỉ' : 'Sign in to save address'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter + Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 w-full">
        <FilterBar
          lang={lang}
          nearMe={nearMe}
          onToggleNearMe={() => setNearMe(!nearMe)}
          selectedCuisines={selectedCuisines}
          onToggleCuisine={toggleCuisine}
          selectedDietary={selectedDietary}
          onToggleDietary={toggleDietary}
          onClearAll={clearAll}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-xl">{lang === 'vi' ? 'Tất Cả Nhà Hàng' : 'All Restaurants'}</h2>
          <span className="text-sm text-gray-500">{filtered.length} {lang === 'vi' ? 'nhà hàng' : 'restaurants'}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="text-gray-700 text-lg font-semibold">{lang === 'vi' ? 'Chưa có nhà hàng nào.' : 'No restaurants found.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} lang={lang} search={search} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-3" style={{ gap: '10px' }}>
                <Image src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" width={44} height={44} className="object-contain" style={{ height: '44px', width: 'auto' }} />
                <div className="leading-none">
                  <div className="font-black text-2xl leading-none" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</div>
                  <div className="text-xs text-gray-400 font-normal">by Ovenly</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {lang === 'vi' ? 'Nền tảng khám phá ẩm thực kết nối thực khách với các nhà hàng tuyệt vời tại Việt Nam.' : 'The food discovery platform connecting diners with amazing restaurants across Vietnam.'}
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#EEEEEE', color: '#1877F2' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#EEEEEE', color: '#E1306C' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.2"/><rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#EEEEEE', color: '#000000' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.321 5.562a5.122 5.122 0 01-2.756-3.106V2h-3.686v13.67a2.4 2.4 0 11-2.4-2.4c.293 0 .575.022.856.065V9.237c-.307-.05-.596-.065-.88-.065a6.3 6.3 0 105.894 6.3v-3.27a8.23 8.23 0 004.822 1.533V5.562z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">{lang === 'vi' ? 'ĐIỀU HƯỚNG' : 'NAVIGATION'}</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{lang === 'vi' ? 'Giới Thiệu' : 'About'}</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{lang === 'vi' ? 'Liên Hệ' : 'Contact'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">{lang === 'vi' ? 'DÀNH CHO NHÀ HÀNG' : 'FOR MERCHANTS'}</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{lang === 'vi' ? 'Mở quán trên LÒ ĐỒ ĂN' : 'Become a Merchant'}</Link></li>
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">{lang === 'vi' ? 'LIÊN HỆ' : 'CONTACT'}</h4>
              <ul className="space-y-2">
                <li><a href="mailto:hello@ovenly.io" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">hello@ovenly.io</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© {CURRENT_YEAR} LÒ ĐỒ ĂN™ {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="/terms" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Điều Khoản Dịch Vụ</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/privacy" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Chính Sách Bảo Mật</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/security" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">An Toàn Thông Tin</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/claims" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Giải Quyết Khiếu Nại</a>
              <p className="text-xs text-gray-400">{lang === 'vi' ? 'Được cung cấp bởi Ovenly™' : 'Powered by Ovenly™'}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}