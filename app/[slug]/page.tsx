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
  new Intl.NumberFormat('vi-VN').format(v) + 'đ';

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

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
      const allCat = cats.find(c => c.name?.includes('Tất cả') || c.name?.includes('All'));
setActiveCategory(allCat?.id || cats[0]?.id || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === itemId);
      if (!exists) return prev;
      if (exists.qty === 1) return prev.filter(i => i.id !== itemId);
      return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i);
    });
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const selectedCat = categories.find(c => c.id === activeCategory);
const filteredItems = !activeCategory || selectedCat?.name?.includes('All') || selectedCat?.name?.includes('Tất cả')
  ? items
  : items.filter(i => i.category_id === activeCategory);;

  const getQty = (itemId: string) =>
    cart.find(i => i.id === itemId)?.qty || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF8F0' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🍜</div>
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF8F0' }}>
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-700 font-bold text-lg">Không tìm thấy nhà hàng</p>
          <Link href="/" className="text-sm mt-4 inline-block" style={{ color: PRIMARY }}>
            ← Quay lại
          </Link>
        </div>
      </div>
    );
  }

  const isOpen = restaurant.is_open && restaurant.is_accepting_orders;

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F0' }}>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
            ← LÒ ĐỒ ĂN
          </Link>
          <span className="font-bold text-gray-900 truncate">{restaurant.name}</span>
          {cartCount > 0 && (
            <button
              onClick={() => setShowCart(true)}
              className="flex-shrink-0 flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-full"
              style={{ backgroundColor: PRIMARY }}
            >
              🛒 {cartCount} · {fmt(cartTotal)}
            </button>
          )}
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-52 bg-gray-200">
        {restaurant.banner ? (
          <Image src={restaurant.banner} alt={restaurant.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: PRIMARY }}>
            <span className="text-white text-5xl">🍜</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4 flex items-end gap-3">
          {restaurant.logo && (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-white">
              <Image src={restaurant.logo} alt={restaurant.name} fill className="object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-white font-black text-2xl">{restaurant.name}</h1>
            {restaurant.cuisine_type && (
              <p className="text-white/80 text-sm">{restaurant.cuisine_type}</p>
            )}
          </div>
        </div>
      </div>

      {/* Restaurant info */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {isOpen ? '● Đang mở cửa' : '● Đóng cửa'}
          </span>
          {restaurant.address && (
            <span className="text-sm text-gray-500">📍 {restaurant.address}</span>
          )}
          {restaurant.delivery_fee !== undefined && (
            <span className="text-sm text-gray-500">
              🛵 {restaurant.delivery_fee === 0 ? 'Miễn phí giao hàng' : `Phí giao: ${fmt(restaurant.delivery_fee)}`}
            </span>
          )}
          {restaurant.min_order_amount && (
            <span className="text-sm text-gray-500">
              Min: {fmt(restaurant.min_order_amount)}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-8">

        {/* Category sidebar */}
        {categories.length > 0 && (
          <aside className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Danh mục</p>
              <nav className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                    style={activeCategory === cat.id
                      ? { backgroundColor: PRIMARY, color: 'white' }
                      : { color: '#374151' }
                    }
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Menu items */}
        <main className="flex-1 min-w-0">

          {/* Mobile category scroll */}
          {categories.length > 0 && (
            <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={activeCategory === cat.id
                    ? { backgroundColor: PRIMARY, color: 'white' }
                    : { backgroundColor: '#F3F4F6', color: '#374151' }
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🍽️</p>
              <p className="text-gray-500">Chưa có món ăn trong danh mục này</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map(item => {
                const qty = getQty(item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm">
                    {item.image && (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-lg" style={{ color: PRIMARY }}>
                          {fmt(item.price)}
                        </span>
                        {isOpen ? (
                          <div className="flex items-center gap-2">
                            {qty > 0 && (
                              <>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-colors"
                                  style={{ borderColor: PRIMARY, color: PRIMARY }}
                                >
                                  −
                                </button>
                                <span className="font-bold w-4 text-center">{qty}</span>
                              </>
                            )}
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg text-white transition-opacity hover:opacity-90"
                              style={{ backgroundColor: PRIMARY }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            Đóng cửa
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="relative bg-white rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-gray-900">Giỏ hàng</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 text-2xl">✕</button>
            </div>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center"
                      style={{ borderColor: PRIMARY, color: PRIMARY }}
                    >
                      −
                    </button>
                    <span className="font-bold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      +
                    </button>
                  </div>
                  <span className="flex-1 text-sm font-medium">{item.name}</span>
                  <span className="text-sm font-bold" style={{ color: PRIMARY }}>
                    {fmt(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span style={{ color: PRIMARY }}>{fmt(cartTotal)}</span>
              </div>
            </div>
            <Link
              href={`/${slug}/checkout`}
              className="block w-full text-center text-white font-bold py-4 rounded-xl text-base"
              style={{ backgroundColor: PRIMARY }}
              onClick={() => setShowCart(false)}
            >
              Đặt hàng · {fmt(cartTotal)}
            </Link>
          </div>
        </div>
      )}

      {/* Sticky cart button */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-4">
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full shadow-lg text-base"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-sm">
              {cartCount}
            </span>
            Xem giỏ hàng · {fmt(cartTotal)}
          </button>
        </div>
      )}

    </div>
  );
}