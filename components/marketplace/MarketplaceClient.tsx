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