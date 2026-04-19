'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Crown, User, ChevronDown, Menu, X, Search } from 'lucide-react';
import FilterBar from './FilterBar';
import AddressInput from './AddressInput';
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

function getRestaurantStatus(restaurant: any): 'OPEN' | 'CLOSED' | 'PAUSED' {
  if (!restaurant) return 'CLOSED';
  if (restaurant.is_accepting_orders === false) return 'PAUSED';
  const hours = restaurant.hours;
  if (!hours) return 'OPEN';
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const vn = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const dayHours = hours[DAYS[vn.getDay()]];
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
  const m: Record<string, any> = {
    OPEN: { vi: '● Đang Mở', en: '● Open' },
    CLOSED: { vi: '● Đã Đóng Cửa', en: '● Closed' },
    PAUSED: { vi: '● Tạm Dừng', en: '● Paused' },
  };
  return m[status]?.[lang === 'vi' ? 'vi' : 'en'] || '';
}

function getStatusBadgeClass(status: string) {
  if (status === 'OPEN') return 'bg-green-50 text-green-600 border-green-200';
  if (status === 'PAUSED') return 'bg-orange-50 text-orange-600 border-orange-200';
  return 'bg-red-50 text-red-600 border-red-200';
}

const CUISINE_DISPLAY: Record<string, any> = {
  Vietnamese: { en: 'Vietnamese', vi: 'Việt Nam' },
  Chinese: { en: 'Chinese', vi: 'Trung Hoa' },
  Indian: { en: 'Indian', vi: 'Ấn Độ' },
  FriedChicken: { en: 'Fried Chicken', vi: 'Gà Rán' },
  Snacks: { en: 'Snacks', vi: 'Ăn Vặt' },
  FastFood: { en: 'Fast Food', vi: 'Đồ Ăn Nhanh' },
  Pizza: { en: 'Pizza', vi: 'Pizza' },
  BubbleTea: { en: 'Bubble Tea', vi: 'Trà Sữa' },
  Noodles: { en: 'Noodles', vi: 'Mì & Bún' },
  Seafood: { en: 'Seafood', vi: 'Hải Sản' },
  Hotpot: { en: 'Hot Pot', vi: 'Lẩu' },
  HotPot: { en: 'Hot Pot', vi: 'Lẩu' },
  Banhmi: { en: 'Bánh Mì', vi: 'Bánh Mì' },
  BanhMi: { en: 'Bánh Mì', vi: 'Bánh Mì' },
  Banh_Mi: { en: 'Bánh Mì', vi: 'Bánh Mì' },
  Rice: { en: 'Rice Dishes', vi: 'Cơm' },
  Vegetarian: { en: 'Vegetarian', vi: 'Chay' },
  Vegan: { en: 'Vegan', vi: 'Thuần Chay' },
  BBQ: { en: 'BBQ', vi: 'Nướng' },
  Japanese: { en: 'Japanese', vi: 'Nhật Bản' },
  Sushi: { en: 'Sushi', vi: 'Sushi' },
  Ramen: { en: 'Ramen', vi: 'Ramen' },
  Korean: { en: 'Korean', vi: 'Hàn Quốc' },
  Thai: { en: 'Thai', vi: 'Thái Lan' },
  Italian: { en: 'Italian', vi: 'Ý' },
  American: { en: 'American', vi: 'Mỹ' },
  Burger: { en: 'Burgers', vi: 'Burger' },
  Sandwich: { en: 'Sandwich', vi: 'Bánh Sandwich' },
  Cafe: { en: 'Café', vi: 'Cà Phê' },
  Coffee: { en: 'Coffee', vi: 'Cà Phê' },
  MilkTea: { en: 'Milk Tea', vi: 'Trà Sữa' },
  Tea: { en: 'Tea', vi: 'Trà' },
  Juice: { en: 'Juice', vi: 'Nước Ép' },
  Smoothie: { en: 'Smoothie', vi: 'Sinh Tố' },
  Dessert: { en: 'Dessert', vi: 'Tráng Miệng' },
  IceCream: { en: 'Ice Cream', vi: 'Kem' },
  Cake: { en: 'Cake & Bakery', vi: 'Bánh Ngọt' },
  Bakery: { en: 'Bakery', vi: 'Tiệm Bánh' },
  Fusion: { en: 'Fusion', vi: 'Đa Phong Cách' },
  FineDining: { en: 'Fine Dining', vi: 'Nhà Hàng Cao Cấp' },
  Buffet: { en: 'Buffet', vi: 'Buffet' },
  StreetFood: { en: 'Street Food', vi: 'Đồ Ăn Vặt' },
  Pho: { en: 'Phở', vi: 'Phở' },
  HueFood: { en: 'Huế Food', vi: 'Ẩm Thực Huế' },
  Other: { en: 'Other', vi: 'Khác' },
};

// Auto-generate lowercase versions for all keys
Object.keys(CUISINE_DISPLAY).forEach(k => {
  const lower = k.toLowerCase();
  if (!CUISINE_DISPLAY[lower]) CUISINE_DISPLAY[lower] = CUISINE_DISPLAY[k];
});

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query || !text) return <>{text}</>;
  const nText = normalize(text);
  const nQuery = normalize(query);
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: '#8B1A1A', fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function RestaurantCard({ restaurant, lang, search }: { restaurant: any; lang: string; search: string }) {
  const status = getRestaurantStatus(restaurant);
  const isOrderingDisabled = status !== 'OPEN';
  const badgeClass = getStatusBadgeClass(status);
  const statusText = getStatusText(status, lang);
  const isPremium = restaurant.subscription_tier === 'Premium';
  const firstLetter = restaurant.name?.charAt(0)?.toUpperCase() || '?';

  // FIX 3 (cuisine array): always treat as array
  const cuisineTypes = Array.isArray(restaurant.cuisine_type)
    ? restaurant.cuisine_type
    : restaurant.cuisine_type ? [restaurant.cuisine_type] : [];
  const cuisineLabels = cuisineTypes.map((c: string) =>
    CUISINE_DISPLAY[c]?.[lang === 'vi' ? 'vi' : 'en'] ?? c
  );

  const avgRating = restaurant.average_rating ? parseFloat(restaurant.average_rating) : null;
  const totalRatings = restaurant.total_ratings;

  const safeSlug = restaurant.slug && restaurant.slug !== 'undefined' && restaurant.slug !== 'null'
    ? restaurant.slug : null;
  const hasSlug = !!safeSlug;

  const handleClick = () => {
    if (safeSlug) window.location.href = `/${safeSlug}`;
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (safeSlug && !isOrderingDisabled) window.location.href = `/${safeSlug}`;
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      <div className="relative flex-shrink-0" style={{ height: '180px' }}>
        {restaurant.banner ? (
          <img src={restaurant.banner} alt={restaurant.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: '#F5F0EE' }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D4C5C0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" opacity="0.4"/>
              <path d="M7 12h10M8 9c0 0 1 1.5 4 1.5S16 9 16 9"/>
              <path d="M9 15c0 0 1 2 3 2s3-2 3-2"/>
            </svg>
          </div>
        )}

        {/* FIX 3 (badge overlap): left side for Premium + Featured, right side for status only */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
          {isPremium && (
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> {lang === 'vi' ? 'Ưu Tiên' : 'Priority'}
            </span>
          )}
          {restaurant.featured && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" /> {lang === 'vi' ? 'Nổi Bật' : 'Featured'}
            </span>
          )}
        </div>

        {/* Status badge — right side, never overlaps */}
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
            <img src={restaurant.logo} alt="" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#8B1A1A' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', lineHeight: 1 }}>{firstLetter}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1" style={{ padding: '24px 14px 14px 14px' }}>
        <h3 className="font-bold leading-tight mb-1.5" style={{ fontSize: '15px', color: '#1A1A1A' }}>
          <HighlightText text={restaurant.name} query={search} />
        </h3>
        {cuisineLabels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {cuisineLabels.map((label: string, i: number) => (
              <span key={i} className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#FFF0ED', color: '#8B1A1A' }}>
                {label}
              </span>
            ))}
          </div>
        )}
        {totalRatings >= 3 && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} width="11" height="11" viewBox="0 0 24 24"
                  fill={star <= Math.round(avgRating ?? 0) ? '#F59E0B' : '#E5E7EB'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#1A1A1A' }}>{avgRating?.toFixed(1)}</span>
            <span style={{ fontSize: '11px', color: '#888888' }}>({totalRatings})</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 flex-1" style={{ fontSize: '12px', color: '#888888' }}>
          {restaurant.delivery_fee != null && (
            <span>{restaurant.delivery_fee === 0
              ? (lang === 'vi' ? 'Miễn phí ship' : 'Free delivery')
              : `${lang === 'vi' ? 'Phí ship' : 'Delivery'}: ${fmt(restaurant.delivery_fee)}`}
            </span>
          )}
          {restaurant.min_order_amount > 0 && (
            <span>{lang === 'vi' ? 'Tối thiểu' : 'Min'}: {fmt(restaurant.min_order_amount)}</span>
          )}
        </div>
        <button
          onClick={handleOrderNow}
          disabled={!hasSlug || isOrderingDisabled}
          className="w-full h-9 font-bold rounded-lg text-sm transition-opacity mt-auto"
          style={
            isOrderingDisabled
              ? { background: '#D3D3D3', color: '#666', cursor: 'not-allowed' }
              : hasSlug
              ? { background: '#8B1A1A', color: 'white' }
              : { background: '#E5E5E5', color: '#999', cursor: 'not-allowed' }
          }
        >
          {isOrderingDisabled
            ? (lang === 'vi' ? 'Đang Đóng Cửa' : 'Currently Closed')
            : hasSlug
            ? (lang === 'vi' ? 'Đặt Ngay' : 'Order Now')
            : (lang === 'vi' ? 'Sắp Ra Mắt' : 'Coming Soon')}
        </button>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: '/about', vi: 'Giới Thiệu', en: 'About' },
  { href: '/contact', vi: 'Liên Hệ', en: 'Contact' },
];

export default function MarketplaceClient() {
  const [lang, setLang] = useState('vi');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [nearMe, setNearMe] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });
    const savedAddr = localStorage.getItem('marketplace_delivery_address');
    const savedCoords = localStorage.getItem('marketplace_delivery_coords');
    if (savedAddr) setDeliveryAddress(savedAddr);
    if (savedCoords) { try { setDeliveryCoords(JSON.parse(savedCoords)); } catch {} }
  }, []);

  useEffect(() => {
    localStorage.setItem('marketplace_lang', lang);
    localStorage.setItem('ovenly_language', lang);
  }, [lang]);

  // FIX 1 & 5: Fetch restaurants via our own server proxy only — no Base44 direct call
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch('/api/restaurants');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setRestaurants(data);
        }
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
      }
      setLoading(false);
    };
    fetchRestaurants();
    // Poll only restaurant status every 30s
    const interval = setInterval(fetchRestaurants, 30000);
    return () => clearInterval(interval);
  }, []);

  // FIX 1: Removed allMenuItems fetch entirely — was exposing Base44 API key client-side
  // and fetching 2000 items on every page load. Menu item search removed from filter.

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

  const filteredRestaurants = useMemo(() => {
    let list = restaurants.filter(r => r.is_active && r.show_on_marketplace);

    if (search.trim()) {
      const q = normalize(search);
      list = list.filter(r => {
        // FIX 4: handle cuisine_type as array in search
        const cuisineStr = Array.isArray(r.cuisine_type)
          ? r.cuisine_type.map((c: string) => normalize(c)).join(' ')
          : normalize(r.cuisine_type || '');
        return (
          normalize(r.name).includes(q) ||
          cuisineStr.includes(q) ||
          normalize(r.cuisine_type_vietnamese || '').includes(q) ||
          normalize(r.address || '').includes(q) ||
          normalize(r.district || '').includes(q) ||
          normalize(r.city || '').includes(q)
        );
      });
    }

    if (selectedCuisines.length > 0) {
      list = list.filter(r => {
        const types = Array.isArray(r.cuisine_type) ? r.cuisine_type : (r.cuisine_type ? [r.cuisine_type] : []);
        return types.some((t: string) => selectedCuisines.includes(t));
      });
    }

    if (selectedCity) list = list.filter(r => r.city === selectedCity);

    if (selectedDietary.length > 0) {
      list = list.filter(r =>
        Array.isArray(r.dietary_options) && selectedDietary.every(opt => r.dietary_options.includes(opt))
      );
    }

    const activeCoords = deliveryCoords || (nearMe && userCoords ? userCoords : null);
    if (activeCoords) {
      list = list.map(r => {
        if (!r.latitude || !r.longitude) return { ...r, _distance: 9999 };
        const d = haversineDistance(activeCoords.lat, activeCoords.lon, r.latitude, r.longitude);
        return { ...r, _distance: d };
      }).filter(r => r._distance <= 5);
    }

    const tierOrder: Record<string, number> = { Premium: 0, Standard: 1, Basic: 2 };
    list.sort((a, b) => {
      if (activeCoords) {
        const dd = (a._distance || 0) - (b._distance || 0);
        if (Math.abs(dd) > 0.3) return dd;
      }
      const tierDiff = (tierOrder[a.subscription_tier] ?? 2) - (tierOrder[b.subscription_tier] ?? 2);
      if (tierDiff !== 0) return tierDiff;
      return (parseFloat(b.average_rating) || 0) - (parseFloat(a.average_rating) || 0);
    });

    return list;
  }, [restaurants, search, selectedCuisines, selectedDietary, selectedCity, nearMe, userCoords, deliveryCoords]);

  const featuredRestaurants = useMemo(() =>
    restaurants.filter(r => r.featured && r.is_active && r.show_on_marketplace)
      .sort((a, b) => (a.featured_display_order || 0) - (b.featured_display_order || 0)),
    [restaurants]
  );

  const toggleCuisine = (key: string) => setSelectedCuisines(prev => prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]);
  const toggleDietary = (key: string) => setSelectedDietary(prev => prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]);
  const clearAllFilters = () => { setSelectedCuisines([]); setSelectedDietary([]); setSelectedCity(null); setNearMe(false); setUserCoords(null); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center flex-shrink-0" style={{ gap: '10px' }}>
            <img src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly"
              className="object-contain" style={{ height: '36px', width: 'auto' }} />
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
              <button onClick={() => setLang('vi')} className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>VI</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>EN</button>
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

      {/* HERO */}
      <div className="relative text-white py-10 px-4 overflow-hidden" style={{background:"#A32020"}}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-2xl md:text-3xl font-black mb-2 leading-tight">
            {lang === 'vi' ? 'Khám phá địa điểm ăn uống gần bạn' : 'Order food online near you'}
          </h1>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            {lang === 'vi' ? 'Đặt món online, giao tận nơi hoặc mang về' : 'Delivery or pickup from restaurants, cafés, and bubble tea shops'}
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            {/* Delivery address */}
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <AddressInput
                onAddressValidated={(isValid, address, coords) => {
                  if (isValid && address) {
                    setDeliveryAddress(address);
                    localStorage.setItem('marketplace_delivery_address', address);
                    if (coords?.lat && coords?.lon) {
                      setDeliveryCoords(coords);
                      localStorage.setItem('marketplace_delivery_coords', JSON.stringify(coords));
                    }
                    window.scrollTo({ top: 620, behavior: 'smooth' });
                  }
                }}
                lang={lang}
                heroMode={true}
              />
            </div>
            {/* FIX 2: Search input — was wired to state but had no UI */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <Search className="w-4 h-4 text-white/70 flex-shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={lang === 'vi' ? 'Tìm nhà hàng, món ăn...' : 'Search restaurants, cuisines...'}
                className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/60 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={handleNearMe}
                className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {nearMe
                  ? (lang === 'vi' ? '✓ Đang dùng vị trí hiện tại' : '✓ Using current location')
                  : (lang === 'vi' ? 'Dùng vị trí hiện tại' : 'Use my current location')}
              </button>
              {!customer && (
                <>
                  <span className="text-white/40 hidden sm:block">•</span>
                  <a href="/login" className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    {lang === 'vi' ? 'Đăng nhập để lưu địa chỉ' : 'Sign in to save address'}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-40 overflow-hidden hidden md:block" style={{transform:'rotate(-3deg) translateX(-20px) translateY(10px)'}}>
          <img src="https://res.cloudinary.com/dvnssii5h/image/upload/w_400,h_320,c_fill/L_4_etjzdo.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Delivery address bar */}
      {deliveryAddress && (
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-sm font-medium text-gray-800 truncate">{deliveryAddress}</span>
              {deliveryCoords && (
                <span className="text-xs text-green-600 font-medium flex-shrink-0">
                  ✓ {lang === 'vi' ? 'Đang lọc nhà hàng gần bạn' : 'Filtering nearby restaurants'}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setDeliveryAddress('');
                setDeliveryCoords(null);
                localStorage.removeItem('marketplace_delivery_address');
                localStorage.removeItem('marketplace_delivery_coords');
              }}
              className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">
              {lang === 'vi' ? 'Xóa' : 'Clear'}
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 w-full">
        <FilterBar
          lang={lang} nearMe={nearMe} onToggleNearMe={handleNearMe}
          selectedCuisines={selectedCuisines} onToggleCuisine={toggleCuisine}
          selectedDietary={selectedDietary} onToggleDietary={toggleDietary}
          onClearAll={clearAllFilters} selectedCity={selectedCity} onCityChange={setSelectedCity}
        />

        {featuredRestaurants.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              {lang === 'vi' ? 'Nhà Hàng Nổi Bật' : 'Featured Restaurants'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} lang={lang} search={search} />)}
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-xl">
            {lang === 'vi' ? 'Tất Cả Nhà Hàng' : 'All Restaurants'}
          </h2>
          <span className="text-sm text-gray-500">
            {loading ? '...' : `${filteredRestaurants.length} ${lang === 'vi' ? 'nhà hàng' : 'restaurants'}`}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-9 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍜</p>
            <p className="text-gray-700 text-lg font-semibold mb-2">
              {deliveryCoords && !search.trim()
                ? (lang === 'vi' ? 'Chưa có nhà hàng giao đến địa chỉ này. Vui lòng thử địa chỉ khác.' : 'No restaurants deliver to this address yet.')
                : search.trim()
                ? (lang === 'vi' ? `Không tìm thấy kết quả cho "${search}"` : `No results for "${search}"`)
                : (lang === 'vi' ? 'Chưa có nhà hàng nào.' : 'No restaurants yet.')}
            </p>
            {(search || deliveryCoords) && (
              <button
                onClick={() => { setSearch(''); setDeliveryCoords(null); setDeliveryAddress(''); localStorage.removeItem('marketplace_delivery_coords'); localStorage.removeItem('marketplace_delivery_address'); }}
                className="mt-3 px-5 py-2 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-red-50 transition-colors">
                {lang === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} lang={lang} search={search} />)}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-3" style={{ gap: '10px' }}>
                <img src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" style={{ height: '44px', width: 'auto' }} />
                <div className="leading-none">
                  <div className="font-heading font-black text-primary text-2xl leading-none">LÒ ĐỒ ĂN</div>
                  <div className="text-xs text-gray-400 font-normal">by Ovenly</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {lang === 'vi'
                  ? 'Khám phá và đặt món online từ các địa điểm ăn uống quanh bạn.'
                  : 'Connecting diners with amazing restaurants across Vietnam.'}
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#EEEEEE', color: '#1877F2' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#EEEEEE', color: '#E1306C' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.2"/>
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
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
                <li><Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">{lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}</Link></li>
                <li><a href="mailto:hello@ovenly.io" className="text-sm text-gray-500 hover:text-primary transition-colors">hello@ovenly.io</a></li>
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