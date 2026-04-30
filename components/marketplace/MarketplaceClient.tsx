'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, Search } from 'lucide-react';
import FilterBar from './FilterBar';
import AddressInput from './AddressInput';
import { customerAuth } from '@/lib/customerAuth';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

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

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col h-full"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      <div className="relative flex-shrink-0 h-[180px] sm:h-[140px]">
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
        <div className="absolute top-2 right-2 z-20">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeClass}`}>
            {statusText}
          </span>
        </div>
        <div
          className="absolute flex items-center justify-center overflow-hidden"
          style={{ bottom: '-26px', left: '12px', width: '60px', height: '60px', borderRadius: '50%', border: '3px solid white', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10 }}
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

      <div className="flex flex-col flex-1" style={{ padding: '34px 12px 10px 12px' }}>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold leading-tight flex-1 min-w-0" style={{ fontSize: '15px', color: '#1A1A1A' }}>
            <HighlightText text={restaurant.name} query={search} />
          </h3>
          {restaurant._distance != null && restaurant._distance < 9999 && (
            <span className="flex items-center gap-1 font-semibold flex-shrink-0" style={{ fontSize: '12px', color: '#888888' }}>
              {restaurant._distance < 1
                ? `${Math.round(restaurant._distance * 1000)}m`
                : `${restaurant._distance.toFixed(1)} km`}
            </span>
          )}
        </div>
        {cuisineLabels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {cuisineLabels.map((label: string, i: number) => (
              <span key={i} className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#FFF0ED', color: '#8B1A1A' }}>
                {label}
              </span>
            ))}
          </div>
        )}
        {totalRatings >= 3 && (
          <div className="flex items-center gap-1 mb-1">
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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 flex-1" style={{ fontSize: '12px', color: '#888888' }}>
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
        {!isOrderingDisabled && hasSlug ? (
          <a
            href={`/${safeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full h-8 inline-flex items-center justify-center font-bold rounded-lg text-sm transition-opacity mt-auto bg-gradient-to-br from-primary via-primary/90 to-primary/75 text-white hover:opacity-90"
          >
            {lang === 'vi' ? 'Đặt Ngay' : 'Order Now'}
          </a>
        ) : (
          <div
            className="w-full h-8 inline-flex items-center justify-center font-bold rounded-lg text-sm mt-auto"
            style={
              isOrderingDisabled
                ? { background: '#D3D3D3', color: '#666', cursor: 'not-allowed' }
                : { background: '#E5E5E5', color: '#999', cursor: 'not-allowed' }
            }
            onClick={(e) => e.stopPropagation()}
          >
            {isOrderingDisabled
              ? (lang === 'vi' ? 'Đang Đóng Cửa' : 'Currently Closed')
              : (lang === 'vi' ? 'Sắp Ra Mắt' : 'Coming Soon')}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MarketplaceClient() {
  const { lang, setLang } = useMarketplaceLang();
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

  useEffect(() => {
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });
    const savedAddr = sessionStorage.getItem('marketplace_delivery_address');
    const savedCoords = sessionStorage.getItem('marketplace_delivery_coords');
    if (savedAddr) setDeliveryAddress(savedAddr);
    if (savedCoords) { try { setDeliveryCoords(JSON.parse(savedCoords)); } catch {} }
  }, []);

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
    const interval = setInterval(fetchRestaurants, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNearMe = () => {
    if (!nearMe) {
      navigator.geolocation?.getCurrentPosition(
        pos => { setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }); setNearMe(true); },
        () => alert(lang === 'vi' ? 'Không thể lấy vị trí của bạn' : 'Could not get your location')
      );
    } else { setNearMe(false); setUserCoords(null); }
  };

  const filteredRestaurants = useMemo(() => {
    let list = restaurants.filter(r => r.is_active && r.show_on_marketplace);

    if (search.trim()) {
      const q = normalize(search);
      list = list.filter(r => {
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
      });
    }

    const tierOrder: Record<string, number> = { Premium: 0, Standard: 1, Basic: 2 };
    list.sort((a, b) => {
      if (activeCoords) {
        const da = a._distance ?? 9999;
        const db = b._distance ?? 9999;
        if (da !== db) return da - db;
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
      <Header />

      {/* HERO */}
      <div className="relative text-white py-12 md:py-16 px-4 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/75">
        <img src="https://res.cloudinary.com/dvnssii5h/image/upload/f_auto,q_auto,w_300/dumplings_uftyxf_p9dcdl.png" alt="" aria-hidden="true" className="absolute top-[30%] left-0 w-20 sm:w-24 lg:w-32 xl:w-40 -translate-x-10 sm:-translate-x-12 lg:-translate-x-8 select-none pointer-events-none" />
        <img src="https://res.cloudinary.com/dvnssii5h/image/upload/f_auto,q_auto,w_300/pizza_rk3cau_e3p7vn.png" alt="" aria-hidden="true" className="absolute top-0 right-0 w-20 sm:w-24 lg:w-32 xl:w-40 translate-x-8 sm:translate-x-10 lg:translate-x-0 -translate-y-1/2 select-none pointer-events-none" />
        <img src="https://res.cloudinary.com/dvnssii5h/image/upload/f_auto,q_auto,w_300/banhmi_yvelxm_gclrh9.png" alt="" aria-hidden="true" className="absolute bottom-0 left-0 w-24 sm:w-28 lg:w-32 xl:w-40 -translate-x-6 sm:-translate-x-8 lg:-translate-x-10 translate-y-2 select-none pointer-events-none" />
        <img src="https://res.cloudinary.com/dvnssii5h/image/upload/f_auto,q_auto,w_300/poke_s5txe1_ejikuz.png" alt="" aria-hidden="true" className="absolute top-[35%] right-0 w-20 sm:w-24 lg:w-32 xl:w-40 translate-x-10 sm:translate-x-12 lg:translate-x-1/2 select-none pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-2xl md:text-3xl font-black mb-2 leading-tight">
            {lang === 'vi' ? 'Khám phá địa điểm ăn uống gần bạn' : 'Order food online near you'}
          </h1>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            {lang === 'vi' ? 'Đặt món online, giao tận nơi hoặc mang về' : 'Delivery or pickup from restaurants, cafés, and bubble tea shops'}
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <AddressInput
                onAddressValidated={(isValid, address, coords) => {
                  if (isValid && address) {
                    setDeliveryAddress(address);
                    sessionStorage.setItem('marketplace_delivery_address', address);
                    if (coords?.lat && coords?.lon) {
                      setDeliveryCoords(coords);
                      sessionStorage.setItem('marketplace_delivery_coords', JSON.stringify(coords));
                    }
                  }
                }}
                lang={lang}
                heroMode={true}
              />
            </div>
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
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
            </div>
            <button
              onClick={() => {
                setDeliveryAddress('');
                setDeliveryCoords(null);
                sessionStorage.removeItem('marketplace_delivery_address');
                sessionStorage.removeItem('marketplace_delivery_coords');
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
              {lang === 'vi' ? 'Địa điểm nổi bật' : 'Featured Places'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} lang={lang} search={search} />)}
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-xl">
            {lang === 'vi' ? 'Tất cả địa điểm' : 'All Places'}
          </h2>
          <span className="text-sm text-gray-500">
            {loading ? '...' : `${lang === 'vi' ? 'Hiển thị' : 'Showing'} ${filteredRestaurants.length} ${lang === 'vi' ? 'địa điểm' : 'places'}`}
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
                ? (lang === 'vi' ? 'Chưa có địa điểm giao đến địa chỉ này. Vui lòng thử địa chỉ khác.' : 'No places deliver to this address yet.')
                : search.trim()
                ? (lang === 'vi' ? `Không tìm thấy kết quả cho "${search}"` : `No results for "${search}"`)
                : (lang === 'vi' ? 'Chưa có địa điểm nào.' : 'No places yet.')}
            </p>
            {(search || deliveryCoords) && (
              <button
                onClick={() => { setSearch(''); setDeliveryCoords(null); setDeliveryAddress(''); sessionStorage.removeItem('marketplace_delivery_coords'); sessionStorage.removeItem('marketplace_delivery_address'); }}
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

      <Footer />
    </div>
  );
}