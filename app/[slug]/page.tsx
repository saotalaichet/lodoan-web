'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getRestaurantBySlug,
  getMenuCategories,
  getMenuItems,
  Restaurant,
  MenuCategory,
  MenuItem,
} from '@/lib/api';

const PRIMARY = '#8B1A1A';

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

interface CartItem extends MenuItem {
  qty: number;
}

export default function RestaurantPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    async function load() {
      const r = await getRestaurantBySlug(slug);
      if (!r) { setLoading(false); return; }
      setRestaurant(r);
      const [cats, menuItems] = await Promise.all([
        getMenuCategories(r.id),
        getMenuItems(r.id),
      ]);
      setCategories(cats);
      setItems(menuItems);
      setLoading(false);
    }
    load();
  }, [slug]);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem(`cart_${slug}`, JSON.stringify(cart));
    }
  }, [cart, slug]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((itemId: string, qty: number) => {
    setCart(prev => qty <= 0
      ? prev.filter(i => i.id !== itemId)
      : prev.map(i => i.id === itemId ? { ...i, qty } : i)
    );
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const isOpen = restaurant?.is_open && restaurant?.is_accepting_orders;

  const groupedItems = () => {
    if (activeCategory !== 'all') {
      return [{ category: categories.find(c => c.id === activeCategory), items: items.filter(i => i.category_id === activeCategory) }];
    }
    const sortedCats = [...categories].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    return sortedCats
      .map(cat => ({ category: cat, items: items.filter(i => i.category_id === cat.id) }))
      .filter(g => g.items.length > 0);
  };

  const getCategoryLabel = (name: string) => {
    if (!name) return '';
    const slash = name.indexOf('/');
    if (slash === -1) return name.trim();
    return lang === 'en' ? name.substring(slash + 1).trim() : name.substring(0, slash).trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-red-800 border-red-200 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-700 font-bold text-lg">Không tìm thấy nhà hàng</p>
          <Link href="/" className="text-sm mt-4 inline-block" style={{ color: PRIMARY }}>← Quay lại</Link>
        </div>
      </div>
    );
  }

  const CartSidebar = () => (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium">
          {lang === 'vi' ? 'Chọn loại đặt hàng' : 'Select order type'}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: '#FFF0ED' }}>
              <svg className="w-6 h-6" fill="none" stroke={PRIMARY} viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-400 font-medium">
              {lang === 'vi' ? 'Thêm món vào giỏ hàng' : 'Add items to cart'}
            </p>
            <p className="text-xs text-gray-300 mt-1">
              {lang === 'vi' ? 'Chọn món từ thực đơn bên trái' : 'Select items from the menu'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors">
                    {item.qty === 1 ? (
                      <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/></svg>
                    )}
                  </button>
                  <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  </button>
                </div>
                <p className="flex-1 text-xs font-semibold text-gray-800 leading-snug">{item.name}</p>
                <p className="text-xs font-bold text-gray-900 flex-shrink-0">{fmt(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && isOpen && (
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
            <span>{fmt(cartTotal)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-100 pt-2">
            <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
            <span style={{ color: PRIMARY }}>{fmt(cartTotal)}</span>
          </div>
          <Link
            href={`/${slug}/checkout`}
            className="block w-full text-center font-bold py-3 rounded-xl text-sm text-white mt-1 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: PRIMARY, boxShadow: '0 4px 12px rgba(139,26,26,0.3)' }}
          >
            {lang === 'vi' ? 'Đặt hàng ngay' : 'Place Order Now'}
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {restaurant.logo ? (
              <Image src={restaurant.logo} alt={restaurant.name} width={60} height={60} className="object-contain" style={{ height: '60px', width: 'auto' }} />
            ) : (
              <span className="font-bold text-gray-900 text-base">{restaurant.name}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full p-1 text-xs font-semibold" style={{ background: '#FFF0ED' }}>
              <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
              <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
            </div>
            <Link href="/login" className="flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-colors" style={{ backgroundColor: PRIMARY }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              {lang === 'vi' ? 'Đăng nhập' : 'Login'}
            </Link>
            <span className="flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full border text-xs"
              style={isOpen
                ? { background: '#F0FDF4', color: '#166534', border: '1px solid #86EFAC' }
                : { background: '#F9FAFB', color: '#6B7280', border: '1px solid #E5E7EB' }
              }>
              {isOpen
                ? (lang === 'vi' ? '● Đang Mở' : '● Open')
                : (lang === 'vi' ? '● Đóng Cửa' : '● Closed')}
            </span>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full overflow-hidden" style={{ height: 'clamp(200px, 25vw, 300px)' }}>
        {restaurant.banner ? (
          <Image src={restaurant.banner} alt={restaurant.name} width={1200} height={300} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #6B1414 100%)` }} />
        )}
      </div>

      {/* Closed banner */}
      {!isOpen && (
        <div style={{ background: '#FFF5F5', borderLeft: `4px solid ${PRIMARY}`, padding: '16px', width: '100%' }}>
          <div className="max-w-6xl mx-auto flex items-start gap-3">
            <span className="text-lg flex-shrink-0">🔴</span>
            <p style={{ color: PRIMARY, fontWeight: 600, fontSize: '14px', lineHeight: '1.5' }}>
              {lang === 'vi'
                ? 'Nhà hàng hiện không nhận đơn trực tuyến. Vui lòng quay lại trong giờ mở cửa.'
                : 'Online ordering is currently unavailable. Please come back during opening hours.'}
            </p>
          </div>
        </div>
      )}

      {/* Restaurant info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="font-bold text-xl text-gray-900 mb-1">{restaurant.name}</h1>
          {restaurant.address && (
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-1">
              <span style={{ color: PRIMARY }}>📍</span> {restaurant.address}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={isOpen ? { background: '#F0FDF4', color: '#166534' } : { background: '#F9FAFB', color: '#6B7280' }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: isOpen ? '#22C55E' : '#9CA3AF' }} />
              {isOpen ? (lang === 'vi' ? 'Đang mở cửa' : 'Open') : (lang === 'vi' ? 'Đóng cửa' : 'Closed')}
            </span>
            {restaurant.hours && typeof restaurant.hours === 'string' && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {restaurant.hours}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
            style={activeCategory === 'all' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#4B5563' }}
          >
            {lang === 'vi' ? 'Tất cả' : 'All'}
          </button>
          {categories
            .filter(cat => {
              if (!cat.name) return false;
              if (cat.name.toLowerCase().includes('tất cả') || cat.name.toLowerCase().includes('all')) return false;
              return items.filter(i => i.category_id === cat.id).length > 0;
            })
            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
            .map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                style={activeCategory === cat.id ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#4B5563' }}
              >
                {getCategoryLabel(cat.name)}
              </button>
            ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex gap-6">

        {/* Menu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-black text-gray-900 tracking-tight">Menu</span>
            <div className="h-0.5 flex-1 rounded-full" style={{ background: PRIMARY }} />
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🍽️</p>
              <p className="text-gray-500">{lang === 'vi' ? 'Chưa có món ăn' : 'No items yet'}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedItems().map((group, idx) => (
                group.items.length > 0 && (
                  <div key={idx}>
                    {group.category && (
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">
                          {getCategoryLabel(group.category.name)}
                        </h2>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {group.items.map(item => {
                        const qty = cart.find(c => c.id === item.id)?.qty || 0;
                        return (
                          <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all group"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                            onClick={() => isOpen && addToCart(item)}
                          >
                            <div className="relative w-full bg-gray-50 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                              {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl">🍜</div>
                              )}
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                              <p className="font-semibold text-gray-900 text-sm leading-snug flex-1">{item.name}</p>
                              {item.description && (
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                              )}
                              <div className="flex items-center justify-between mt-3">
                                <span className="font-bold text-sm" style={{ color: PRIMARY }}>{fmt(item.price)}</span>
                                {isOpen && (
                                  qty > 0 ? (
                                    <div className="flex items-center gap-2 rounded-full px-2 py-1" style={{ backgroundColor: PRIMARY }} onClick={e => e.stopPropagation()}>
                                      <button onClick={() => setQty(item.id, qty - 1)} className="w-5 h-5 flex items-center justify-center text-white">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4"/></svg>
                                      </button>
                                      <span className="text-xs font-bold text-white min-w-[14px] text-center">{qty}</span>
                                      <button onClick={() => setQty(item.id, qty + 1)} className="w-5 h-5 flex items-center justify-center text-white">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={e => { e.stopPropagation(); addToCart(item); }}
                                      className="w-7 h-7 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-colors"
                                      style={{ backgroundColor: PRIMARY }}
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Cart sidebar desktop */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-28">
            <CartSidebar />
          </div>
        </div>
      </div>

      {/* Mobile floating cart */}
      {cartCount > 0 && isOpen && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
          <button
            onClick={() => setShowMobileCart(true)}
            className="w-full text-white rounded-2xl py-4 px-5 font-bold flex items-center justify-between"
            style={{ backgroundColor: PRIMARY, boxShadow: '0 8px 24px rgba(139,26,26,0.35)' }}
          >
            <span className="rounded-full text-xs font-bold px-2.5 py-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}>{cartCount}</span>
            <span className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/></svg>
            </span>
            <span className="text-sm font-semibold">{fmt(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* Mobile cart drawer */}
      {showMobileCart && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileCart(false)} />
          <div className="relative bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">{lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your Cart'}</h2>
              <button onClick={() => setShowMobileCart(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-lg leading-none">×</span>
              </button>
            </div>
            <CartSidebar />
          </div>
        </div>
      )}

      {/* Cuisine info */}
      {restaurant.cuisine_type && (
        <div className="max-w-6xl mx-auto w-full px-4 mt-4 mb-2">
          <div className="border-t border-gray-200 pt-4">
            <span className="text-sm font-semibold text-gray-500">
              {lang === 'vi' ? 'Ẩm thực: ' : 'Cuisine: '}
              <span style={{ color: PRIMARY }}>{restaurant.cuisine_type}</span>
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 mt-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-xs text-gray-400">
            LÒ ĐỒ ĂN™ | Powered by{' '}
            <a href="https://ovenly.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
              Ovenly™
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}