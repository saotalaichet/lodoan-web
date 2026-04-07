'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, User, ChevronDown, Menu, X } from 'lucide-react';
import FilterBar from './FilterBar';
import { Restaurant } from '@/lib/api';
import { customerAuth } from '@/lib/customerAuth';

const CURRENT_YEAR = new Date().getFullYear();

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

function normalize(str: string) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase().trim();
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getRestaurantStatus(restaurant: Restaurant): 'OPEN' | 'CLOSED' | 'PAUSED' {
  if (!restaurant) return 'CLOSED';
  if (restaurant.is_accepting_orders === false) return 'PAUSED';
  const hours = restaurant.hours;
  if (!hours) return 'OPEN';
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const vn = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const dayHours = (hours as any)[DAYS[vn.getDay()]];
  if (!dayHours?.trim()) return 'CLOSED';
  const [openStr, closeStr] = dayHours.split('-').map((s: string) => s.trim());
  if (!openStr || !closeStr) return 'CLOSED';
  const [oH, oM] = openStr.split(':').map(Number);
  const [cH, cM] = closeStr.split(':').map(Number);
  let closeMins = cH * 60 + cM;
  if ((cH === 0 && cM === 0) || (cH === 24 && cM === 0)) closeMins = 1440;
  const cur = vn.getHours() * 60 + vn.getMinutes();
  return cur >= oH * 60 + oM && cur < closeMins ? 'OPEN' : 'CLOSED';
}

function getStatusText(status: string, lang: string) {
  const m: Record<string, { vi: string; en: string }> = {
    OPEN: { vi: '● Đang Mở', en: '● Open' },
    CLOSED: { vi: '● Đã Đóng Cửa', en: '● Closed' },
    PAUSED: { vi: '● Tạm Dừng', en: '● Paused' },
  };
  return m[status]?.[lang === 'vi' ? 'vi' : 'en'] || '';
}

function getStatusBadgeClass(status: string) {
  if (status === 'OPEN') return 'bg-green-50 text-green-600 border-green-200';
  if (status === 'PAUSED') return 'bg-orange-50 text-orange-600 border-orange-200';
  return 'bg-gray-100 text-gray-500 border-gray-200';
}

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

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query || !text) return <>{text}</>;
  const nText = normalize(text);
  const nQuery = normalize(query);
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary font-bold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function RestaurantCard({ restaurant, lang, search }: { restaurant: Restaurant; lang: string; search: string }) {
  const status = getRestaurantStatus(restaurant);
  const isOrderingDisabled = status !== 'OPEN';
  const badgeClass = getStatusBadgeClass(status);
  const statusText = getStatusText(status, lang);
  const isPremium = (restaurant as any).subscription_tier === 'Premium';
  const isFeatured = (restaurant as any).featured;
  const firstLetter = restaurant.name?.charAt(0)?.toUpperCase() || '?';
  const rawCuisine = restaurant.cuisine_type || '';
  const cuisineLabel = rawCuisine
    ? (CUISINE_DISPLAY[rawCuisine]?.[lang === 'vi' ? 'vi' : 'en'] ?? ((restaurant as any).cuisine_type_vietnamese || rawCuisine))
    : '';
  const avgRating = (restaurant as any).average_rating;
  const totalRatings = (restaurant as any).total_ratings;

  return (
    <Link href={`/${restaurant.slug}`} className="block">
      <div
        className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }}
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

          {isPremium && (
            <span className="absolute top-2 left-2 z-20 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> {lang === 'vi' ? 'Ưu Tiên' : 'Priority'}
            </span>
          )}
          {isFeatured && !isPremium && (
            <span className="absolute top-2 left-2 z-20 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> {lang === 'vi' ? 'Nổi Bật' : 'Featured'}
            </span>
          )}

          <div className="absolute top-2 right-2 z-20">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeClass}`}>
              {statusText}
            </span>
          </div>

          <div
            className="absolute flex items-center justify-center overflow-hidden"
            style={{ bottom: '-16px', left: '12px', width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.12)', zIndex: 10 }}
          >
            {restaurant.logo ? (
              <Image src={restaurant.logo} alt="" width={40} height={40} className="object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center font-heading font-bold" style={{ fontSize: '14px', color: 'white' }}>
                {firstLetter}
              </div>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1" style={{ padding: '24px 14px 14px 14px' }}>
          <h3 className="font-bold leading-tight mb-1.5" style={{ fontSize: '15px', color: '#1A1A1A' }}>
            <HighlightText text={restaurant.name} query={search} />
          </h3>

          {cuisineLabel && (
            <span className="inline-block self-start text-[11px] font-semibold px-2 py-0.5 rounded-full mb-2 bg-primary/10 text-primary">
              {cuisineLabel}
            </span>
          )}

          {totalRatings >= 3 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} width="11" height="11" viewBox="0 0 24 24"
                    fill={star <= Math.round(avgRating) ? '#F59E0B' : '#E5E7EB'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#1A1A1A' }}>{avgRating?.toFixed(1)}</span>
              <span style={{ fontSize: '11px', color: '#888888' }}>({totalRatings} {lang === 'vi' ? 'đánh giá' : 'reviews'})</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 flex-1" style={{ fontSize: '12px', color: '#888888' }}>
            {restaurant.delivery_fee !== undefined && (
              <span>{restaurant.delivery_fee === 0
                ? (lang === 'vi' ? 'Miễn phí ship' : 'Free delivery')
                : `${lang === 'vi' ? 'Phí ship' : 'Delivery'}: ${fmt(restaurant.delivery_fee)}`}
              </span>
            )}
            {restaurant.min_order_amount && restaurant.min_order_amount > 0 && (
              <span>{lang === 'vi' ? 'Tối thiểu' : 'Min'}: {fmt(restaurant.min_order_amount)}</span>
            )}
          </div>

          <button
            className={`w-full h-9 font-heading font-bold rounded-lg text-sm transition-opacity mt-auto ${isOrderingDisabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}`}
          >
            {isOrderingDisabled
              ? (lang === 'vi' ? 'Đang Đóng Cửa' : 'Currently Closed')
              : (lang === 'vi' ? 'Đặt Ngay' : 'Order Now')}
          </button>
        </div>
      </div>
    </Link>
  );
}

const POPULAR_VI = ['Phở', 'Bánh Mì', 'Cơm', 'Bún Bò', 'Hải Sản', 'Lẩu'];
const POPULAR_EN = ['Pho', 'Banh Mi', 'Rice', 'Beef Noodles', 'Seafood', 'Hotpot'];
const NAV_LINKS = [
  { href: '/about', vi: 'Giới Thiệu', en: 'About' },
  { href: '/contact', vi: 'Liên Hệ', en: 'Contact' },
];

export default function MarketplaceClient({ restaurants }: { restaurants: Restaurant[] }) {
  const [lang, setLang] = useState('vi');
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [nearMe, setNearMe] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });
  }, []);

  useEffect(() => {
    localStorage.setItem('marketplace_lang', lang);
    localStorage.setItem('ovenly_language', lang);
  }, [lang]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNearMe = () => {
    if (!nearMe) {
      navigator.geolocation?.getCurrentPosition(
        pos => { setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setNearMe(true); },
        () => alert(lang === 'vi' ? 'Không thể lấy vị trí của bạn' : 'Could not get your location')
      );
    } else { setNearMe(false); setUserCoords(null); }
  };

  const handleLogout = async () => {
    await customerAuth.logout();
    setCustomer(null);
    setShowDropdown(false);
  };

  const filtered = useMemo(() => {
    let list = restaurants.filter(r => r.slug && r.is_active === true && (r as any).show_on_marketplace === true);
    if (search.trim()) {
      const q = normalize(search);
      list = list.filter(r =>
        normalize(r.name).includes(q) ||
        normalize(r.cuisine_type || '').includes(q) ||
        normalize((r as any).cuisine_type_vietnamese || '').includes(q) ||
        normalize(r.address || '').includes(q) ||
        normalize((r as any).district || '').includes(q) ||
        normalize((r as any).city || '').includes(q)
      );
    }
    if (selectedCuisines.length > 0) list = list.filter(r => selectedCuisines.includes(r.cuisine_type || ''));
    if (selectedCity) list = list.filter(r => (r as any).city === selectedCity);
    if (selectedDietary.length > 0) list = list.filter(r => Array.isArray((r as any).dietary_options) && selectedDietary.every(opt => (r as any).dietary_options.includes(opt)));
    if (nearMe && userCoords) {
      list = list.map(r => {
        if (!(r as any).latitude || !(r as any).longitude) return { ...r, _distance: 9999 };
        const d = haversineDistance(userCoords.lat, userCoords.lon, (r as any).latitude, (r as any).longitude);
        return { ...r, _distance: d };
      }).filter(r => (r as any)._distance <= 5);
    }
    const tierOrder: Record<string, number> = { Premium: 0, Standard: 1, Basic: 2 };
    list.sort((a, b) => {
      if (nearMe && userCoords) {
        const distDiff = ((a as any)._distance || 0) - ((b as any)._distance || 0);
        if (Math.abs(distDiff) > 0.3) return distDiff;
      }
      const tierDiff = (tierOrder[(a as any).subscription_tier] ?? 2) - (tierOrder[(b as any).subscription_tier] ?? 2);
      if (tierDiff !== 0) return tierDiff;
      return ((b as any).average_rating || 0) - ((a as any).average_rating || 0);
    });
    return list;
  }, [restaurants, search, selectedCuisines, selectedCity, selectedDietary, nearMe, userCoords]);

  const featured = useMemo(() =>
    restaurants.filter(r => (r as any).featured && r.is_active === true && (r as any).show_on_marketplace === true)
      .sort((a, b) => ((a as any).featured_display_order || 0) - ((b as any).featured_display_order || 0)),
    [restaurants]
  );

  const toggleCuisine = (key: string) => setSelectedCuisines(prev => prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]);
  const toggleDietary = (key: string) => setSelectedDietary(prev => prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]);
  const clearAll = () => { setSelectedCuisines([]); setSelectedDietary([]); setSelectedCity(null); setNearMe(false); setUserCoords(null); };
  const popular = lang === 'vi' ? POPULAR_VI : POPULAR_EN;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center flex-shrink-0" style={{ gap: '10px' }}>
            <Image src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" width={44} height={44}
              className="w-auto h-9 md:h-11 object-contain" />
            <div className="leading-none">
              <div className="font-heading font-black text-primary text-xl tracking-tight leading-none">LÒ ĐỒ ĂN</div>
              <div className="text-[10px] font-normal text-gray-400 leading-tight tracking-normal">by Ovenly</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6 flex-1">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                {lang === 'vi' ? l.vi : l.en}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button onClick={() => setLang('vi')}
                className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>VI</button>
              <button onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>EN</button>
            </div>

            {customer ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{customer.full_name?.split(' ')[0] || customer.email}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-bold text-gray-900 truncate">{customer.full_name}</p>
                      <p className="text-xs text-gray-400 truncate">{customer.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
                    </Link>
                    <Link href="/profile?tab=orders" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'Order History'}
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  {lang === 'vi' ? 'Đăng Nhập' : 'Login'}
                </Link>
                <Link href="/signup" className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  {lang === 'vi' ? 'Đăng Ký' : 'Sign Up'}
                </Link>
              </div>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                {lang === 'vi' ? l.vi : l.en}
              </Link>
            ))}
            {!customer ? (
              <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                  {lang === 'vi' ? 'Đăng Nhập' : 'Login'}
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90">
                  {lang === 'vi' ? 'Đăng Ký' : 'Sign Up'}
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
                </Link>
                <Link href="/profile?tab=orders" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'Order History'}
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                  {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* HERO — exact match to Base44: bg-gradient-to-br from-primary via-primary/90 to-primary/75 */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/75 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-black mb-3 leading-tight">
            {lang === 'vi' ? 'Khám Phá Nhà Hàng Tuyệt Vời' : 'Discover Amazing Restaurants'}
          </h1>
          <p className="text-white/80 mb-8 text-base md:text-lg">
            {lang === 'vi' ? 'Đặt món dễ dàng — Giao hàng nhanh chóng' : 'Easy ordering — Fast delivery'}
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex gap-2 items-center">
                <svg className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder={lang === 'vi' ? 'Tìm nhà hàng hoặc món ăn...' : 'Search restaurants or dishes...'}
                  className="flex-1 text-sm text-gray-900 outline-none py-2 bg-transparent" />
                {search && (
                  <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button className="bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm flex-shrink-0 hover:opacity-90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>

              {searchFocused && !search.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl p-4 z-50"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '1px solid #F0F0F0' }}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                    {lang === 'vi' ? 'Tìm kiếm phổ biến' : 'Popular searches'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map(term => (
                      <button key={term} onClick={() => { setSearch(term); setSearchFocused(false); }}
                        className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
              <button onClick={handleNearMe}
                className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {nearMe ? (lang === 'vi' ? '✓ Đang dùng vị trí hiện tại' : '✓ Using current location') : (lang === 'vi' ? 'Dùng vị trí hiện tại' : 'Use my current location')}
              </button>
              {!customer && (
                <>
                  <span className="text-white/40 hidden sm:block">•</span>
                  <Link href="/login" className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {lang === 'vi' ? 'Đăng nhập để lưu địa chỉ' : 'Sign in to save address'}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS + GRID */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 w-full">
        <FilterBar
          lang={lang} nearMe={nearMe} onToggleNearMe={handleNearMe}
          selectedCuisines={selectedCuisines} onToggleCuisine={toggleCuisine}
          selectedDietary={selectedDietary} onToggleDietary={toggleDietary}
          onClearAll={clearAll} selectedCity={selectedCity} onCityChange={setSelectedCity}
        />

        {featured.length > 0 && !search && selectedCuisines.length === 0 && !selectedCity && (
          <div className="mb-10">
            <h2 className="font-heading font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              {lang === 'vi' ? 'Nhà Hàng Nổi Bật' : 'Featured Restaurants'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map(r => <RestaurantCard key={r.id} restaurant={r} lang={lang} search={search} />)}
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading font-bold text-gray-900 text-xl">
            {lang === 'vi' ? 'Tất Cả Nhà Hàng' : 'All Restaurants'}
          </h2>
          <span className="text-sm text-gray-500">
            {filtered.length} {lang === 'vi' ? 'nhà hàng' : 'restaurants'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="font-heading font-bold text-gray-700 text-lg mb-2">
              {search ? (lang === 'vi' ? `Không tìm thấy kết quả cho "${search}"` : `No results for "${search}"`) : (lang === 'vi' ? 'Chưa có nhà hàng nào.' : 'No restaurants found.')}
            </p>
            {search && (
              <button onClick={() => setSearch('')}
                className="mt-3 px-5 py-2 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-red-50 transition-colors">
                {lang === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} lang={lang} search={search} />)}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-3" style={{ gap: '10px' }}>
                <Image src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" width={44} height={44}
                  className="w-auto h-11 object-contain" />
                <div className="leading-none">
                  <div className="font-heading font-black text-primary text-2xl leading-none">LÒ ĐỒ ĂN</div>
                  <div className="text-xs text-gray-400 font-normal">by Ovenly</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {lang === 'vi'
                  ? 'Nền tảng khám phá ẩm thực kết nối thực khách với các nhà hàng tuyệt vời tại Việt Nam.'
                  : 'The food discovery platform connecting diners with amazing restaurants across Vietnam.'}
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: '#EEEEEE', color: '#1877F2' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: '#EEEEEE', color: '#E1306C' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.2"/>
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: '#EEEEEE', color: '#000000' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.321 5.562a5.122 5.122 0 01-2.756-3.106V2h-3.686v13.67a2.4 2.4 0 11-2.4-2.4c.293 0 .575.022.856.065V9.237c-.307-.05-.596-.065-.88-.065a6.3 6.3 0 105.894 6.3v-3.27a8.23 8.23 0 004.822 1.533V5.562z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">
                {lang === 'vi' ? 'Điều Hướng' : 'Navigation'}
              </h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">{lang === 'vi' ? 'Giới Thiệu' : 'About'}</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">{lang === 'vi' ? 'Liên Hệ' : 'Contact'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">
                {lang === 'vi' ? 'Dành Cho Nhà Hàng' : 'For Merchants'}
              </h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">{lang === 'vi' ? 'Mở quán trên LÒ ĐỒ ĂN' : 'Become a Merchant'}</Link></li>
                <li><a href="mailto:hello@ovenly.io" className="text-sm text-gray-500 hover:text-primary transition-colors">hello@ovenly.io</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© {CURRENT_YEAR} LÒ ĐỒ ĂN™ {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a href="/terms" className="text-gray-400 hover:text-gray-600 text-xs">Điều Khoản Dịch Vụ</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/privacy" className="text-gray-400 hover:text-gray-600 text-xs">Chính Sách Bảo Mật</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/security" className="text-gray-400 hover:text-gray-600 text-xs">An Toàn Thông Tin</a>
              <span className="text-gray-300 text-xs">•</span>
              <a href="/claims" className="text-gray-400 hover:text-gray-600 text-xs">Giải Quyết Khiếu Nại</a>
              <p className="text-xs text-gray-400">{lang === 'vi' ? 'Được cung cấp bởi Ovenly™' : 'Powered by Ovenly™'}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}