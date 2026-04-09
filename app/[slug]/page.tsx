'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag, Plus, Minus, Trash2, Flame, Star, Leaf, X,
  ChevronLeft, MapPin, Phone, FileText, Bike, Clock, Menu,
} from 'lucide-react';
import { createPayment } from '@/lib/api';
import { customerAuth } from '@/lib/customerAuth';
import TrackAsiaAddressInput from '@/components/TrackAsiaAddressInput';
import dynamic from 'next/dynamic';
const TrackAsiaMap = dynamic(() => import('@/components/TrackAsiaMap'), { ssr: false });

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

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

function getTodayHours(restaurant: any): string | null {
  if (!restaurant?.hours) return null;
  const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const now = new Date();
  const vn = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const h = restaurant.hours[DAYS[vn.getDay()]];
  return h?.trim() || null;
}

function getStatusBadgeClass(status: string) {
  if (status === 'OPEN') return 'bg-green-50 text-green-600 border-green-200';
  if (status === 'PAUSED') return 'bg-orange-50 text-orange-600 border-orange-200';
  return 'bg-red-50 text-red-600 border-red-200';
}

const CUISINE_VI: Record<string, string> = {
  Vietnamese: 'Việt Nam', Japanese: 'Nhật Bản', Korean: 'Hàn Quốc', Chinese: 'Trung Hoa',
  Thai: 'Thái Lan', Italian: 'Ý', American: 'Mỹ', Fusion: 'Đa Phong Cách', Cafe: 'Cà Phê',
  Dessert: 'Tráng Miệng', Other: 'Khác', FastFood: 'Thức Ăn Nhanh', FriedChicken: 'Gà Rán',
  Snacks: 'Đồ Ăn Nhẹ', Pizza: 'Pizza', BubbleTea: 'Trà Sữa', Noodles: 'Mì',
  Seafood: 'Hải Sản', Hotpot: 'Lẩu', Banhmi: 'Bánh Mì', Rice: 'Cơm',
  Vegetarian: 'Chay', BBQ: 'BBQ',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  basePrice?: number;
  qty: number;
  notes?: string;
  addons?: { name: string; price: number }[];
}

function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const add = (item: CartItem) => setCart(prev => {
    const ex = prev.find(i => i.id === item.id);
    return ex ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...item, qty: 1 }];
  });
  const set = (id: string, qty: number) => setCart(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i));
  const clear = () => setCart([]);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return { cart, add, set, clear, totalQty, subtotal };
}

function ItemModal({ item, groups, lang, onClose, onAdd }: {
  item: any; groups: any[]; lang: string;
  onClose: () => void; onAdd: (item: CartItem) => void;
}) {
  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const basePrice = parseFloat(item.price) || 0;

  const toggle = (gId: string, oId: string, max: number) => {
    setError('');
    const cur = selections[gId] || [];
    if (max === 1) { setSelections(s => ({ ...s, [gId]: cur.includes(oId) ? [] : [oId] })); }
    else if (cur.includes(oId)) { setSelections(s => ({ ...s, [gId]: cur.filter(x => x !== oId) })); }
    else if (cur.length < max) { setSelections(s => ({ ...s, [gId]: [...cur, oId] })); }
    else { setError(lang === 'vi' ? 'Đã đạt số lượng tối đa' : 'Maximum reached'); }
  };

  const extra = groups.reduce((t, g) =>
    t + (selections[g.id] || []).reduce((s, oId) => {
      const o = g.options?.find((x: any) => x.id === oId);
      return s + (parseFloat(o?.price) || 0);
    }, 0), 0);
  const total = (basePrice + extra) * qty;

  const handleAdd = () => {
    for (const g of groups) {
      if (g.required && !(selections[g.id] || []).length) {
        setError(lang === 'vi' ? `Vui lòng chọn ${g.name}` : `Please select ${g.name}`);
        return;
      }
    }
    const addons = groups.flatMap(g =>
      (selections[g.id] || []).map(oId => {
        const o = g.options?.find((x: any) => x.id === oId);
        return o && parseFloat(o.price) > 0 ? { name: o.name, price: parseFloat(o.price) } : null;
      })
    ).filter(Boolean) as { name: string; price: number }[];
    onAdd({ id: item.id + Date.now(), name: item.name, price: basePrice + extra, basePrice, addons, qty, notes });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {item.image_url ? (
          <div className="relative h-44 overflow-hidden rounded-t-2xl">
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-5">
          <h2 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h2>
          {item.description && <p className="text-sm text-gray-400 mb-3">{item.description}</p>}
          <p className="text-lg font-bold text-primary mb-4">{fmt(basePrice)}</p>
          {groups.map((g: any) => (
            <div key={g.id} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm text-gray-900">{g.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${g.required ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                  {g.required ? (lang === 'vi' ? 'Bắt buộc' : 'Required') : (lang === 'vi' ? 'Tùy chọn' : 'Optional')}
                </span>
              </div>
              <div className="space-y-2">
                {g.options?.map((o: any) => {
                  const sel = (selections[g.id] || []).includes(o.id);
                  return (
                    <button key={o.id} type="button" onClick={() => toggle(g.id, o.id, g.max_select || 1)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${sel ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${sel ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                          {sel && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-sm font-medium">{o.name}</span>
                      </div>
                      {parseFloat(o.price) > 0 && <span className="text-sm font-bold text-primary">+{fmt(parseFloat(o.price))}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-900 mb-2">{lang === 'vi' ? 'Ghi chú' : 'Notes'}</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder={lang === 'vi' ? 'Ít đá, không hành...' : 'Less ice, no onion...'}
              rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">⚠️ {error}</p>}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-700">{lang === 'vi' ? 'Số lượng' : 'Quantity'}</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-lg w-6 text-center">{qty}</span>
              <button type="button" onClick={() => setQty(q => q + 1)}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <button onClick={handleAdd}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl text-sm hover:opacity-90 shadow-lg shadow-primary/20">
            {lang === 'vi' ? `Thêm vào giỏ — ${fmt(total)}` : `Add to cart — ${fmt(total)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItemCard({ item, qty, onAdd, onSet, onOpen, isClosed, isOutOfStock, lang }: {
  item: any; qty: number; onAdd: (item: any) => void;
  onSet: (id: string, qty: number) => void; onOpen: (item: any, groups: any[]) => void;
  isClosed: boolean; isOutOfStock: boolean; lang: string;
}) {
  const price = parseFloat(item.price) || 0;
  const handleClick = () => {
    if (isClosed) return;
    let groups: any[] = [];
    try { if (item.customization_options) groups = JSON.parse(item.customization_options); } catch {}
    if (groups.length > 0) onOpen(item, groups);
    else onAdd({ id: item.id, name: item.name, price, basePrice: price, qty: 1 });
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-xl overflow-visible flex flex-col relative ${isClosed ? 'cursor-default opacity-60' : 'cursor-pointer hover:border-primary/40 hover:shadow-sm'} transition-all`}
    >
      {/* Image — square, full width, fixed height */}
      <div className="relative w-full overflow-hidden rounded-t-xl bg-gray-100" style={{ height: '120px' }}>
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🍜</div>
        )}
        {/* Badges top-left */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
          {item.is_chef_choice && <span className="text-[9px] font-bold text-amber-600 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">⭐ Chef</span>}
          {item.is_spicy && <span className="text-[9px] font-bold text-red-500 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">🌶 {lang === 'en' ? 'Spicy' : 'Cay'}</span>}
          {item.is_vegetarian && <span className="text-[9px] font-bold text-green-600 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">🌿 {lang === 'en' ? 'Veg' : 'Chay'}</span>}
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold text-red-500 bg-white px-2 py-0.5 rounded-full">{lang === 'vi' ? 'Hết hàng' : 'Sold out'}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2 flex-1">{item.name}</p>
        {item.description && (
          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1 leading-relaxed">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary text-sm">{fmt(price)}</span>
          {!isClosed && !isOutOfStock && (
            qty > 0 ? (
              <div className="flex items-center gap-1 bg-primary rounded-full px-1.5 py-0.5" onClick={e => e.stopPropagation()}>
                <button onClick={() => onSet(item.id, qty - 1)} className="w-4 h-4 flex items-center justify-center text-white">
                  <Minus className="w-2.5 h-2.5" strokeWidth={3} />
                </button>
                <span className="text-[10px] font-bold text-white min-w-[10px] text-center">{qty}</span>
                <button onClick={() => onSet(item.id, qty + 1)} className="w-4 h-4 flex items-center justify-center text-white">
                  <Plus className="w-2.5 h-2.5" strokeWidth={3} />
                </button>
              </div>
            ) : (
              <button
                onClick={e => { e.stopPropagation(); handleClick(); }}
                className="w-6 h-6 bg-primary hover:opacity-90 text-white rounded-full flex items-center justify-center shadow transition-colors"
              >
                <Plus className="w-3 h-3" strokeWidth={3} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ cart, subtotal, totalQty, onSet, onCheckout, isClosed, lang }: {
  cart: CartItem[]; subtotal: number; totalQty: number;
  onSet: (id: string, qty: number) => void;
  onCheckout: () => void; isClosed: boolean; lang: string;
}) {
  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium">{lang === 'vi' ? 'Giỏ hàng' : 'Your cart'}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-primary/40" strokeWidth={1.5} />
            </div>
            <p className="text-sm text-gray-400 font-medium">{lang === 'vi' ? 'Thêm món vào giỏ hàng' : 'Add items to cart'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => onSet(item.id, item.qty - 1)}
                    className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                    {item.qty === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3 text-gray-500" />}
                  </button>
                  <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                  <button onClick={() => onSet(item.id, item.qty + 1)}
                    className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary/5 hover:border-primary/30 transition-colors">
                    <Plus className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 leading-snug truncate">{item.name}</p>
                  {item.addons?.map((a, i) => <p key={i} className="text-xs text-gray-400">+{a.name}: {fmt(a.price)}</p>)}
                  {item.notes && <p className="text-xs text-gray-400 italic">{item.notes}</p>}
                </div>
                <p className="text-xs font-bold text-gray-900 flex-shrink-0">{fmt(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.length > 0 && !isClosed && (
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span><span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-100 pt-2">
            <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
            <span className="text-primary">{fmt(subtotal)}</span>
          </div>
          {totalQty >= 16 ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-red-700">{lang === 'vi' ? '⚠️ Đơn quá lớn' : '⚠️ Order too large'}</p>
              <p className="text-xs text-red-600">{lang === 'vi' ? 'Vui lòng liên hệ nhà hàng trực tiếp.' : 'Please contact the restaurant directly.'}</p>
            </div>
          ) : (
            <button onClick={onCheckout}
              className="w-full bg-primary hover:opacity-90 text-white font-bold py-3 rounded-xl text-sm mt-1 shadow-lg shadow-primary/30">
              {lang === 'vi' ? 'Đặt hàng ngay' : 'Place Order Now'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DeliveryOptionsModal({ isOpen, onClose, onConfirm, restaurant, subtotal, lang }: {
  isOpen: boolean; onClose: () => void;
  onConfirm: (details: { orderType: string; address?: string; fee?: number }) => void;
  restaurant: any; subtotal: number; lang: string;
}) {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState(false);
  if (!isOpen) return null;
  const minOrder = parseFloat(restaurant?.min_order_amount) || 50000;
  const deliveryFee = parseFloat(restaurant?.delivery_fee) || 0;
  const belowMin = orderType === 'delivery' && subtotal < minOrder;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20">
      <div className="w-full bg-white rounded-3xl p-6 max-w-md shadow-xl max-h-[80vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900 text-lg">🛵 {lang === 'vi' ? 'Chi tiết đặt hàng' : 'Order Details'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">{lang === 'vi' ? 'Loại đặt hàng' : 'Order Type'}</label>
            <div className="grid grid-cols-2 gap-3">
              {(['pickup', 'delivery'] as const).map(type => (
                <button key={type} onClick={() => setOrderType(type)}
                  className={`py-3 rounded-xl border-2 text-sm font-bold flex items-center justify-center gap-2 transition-all ${orderType === type ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-500 hover:border-primary/30'}`}>
                  {type === 'delivery' ? <Bike className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {type === 'delivery' ? (lang === 'vi' ? 'Giao hàng' : 'Delivery') : (lang === 'vi' ? 'Mang về' : 'Pickup')}
                </button>
              ))}
            </div>
          </div>
          {orderType === 'delivery' && (
            <>
              {belowMin && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-xs text-red-700 font-semibold">
                    ⚠️ {lang === 'vi' ? `Đơn tối thiểu ${fmt(minOrder)}. Còn thiếu ${fmt(minOrder - subtotal)}.` : `Minimum order ${fmt(minOrder)}. Add ${fmt(minOrder - subtotal)} more.`}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">{lang === 'vi' ? 'Địa chỉ giao hàng' : 'Delivery Address'}</label>
                <p className="text-xs text-primary mb-3">{lang === 'vi' ? 'Chúng tôi chỉ giao hàng trong phạm vi 5km.' : 'We only deliver within 5km.'}</p>
                <TrackAsiaAddressInput
                  restaurantLat={restaurant?.latitude ? parseFloat(restaurant.latitude) : null}
                  restaurantLon={restaurant?.longitude ? parseFloat(restaurant.longitude) : null}
                  lang={lang}
                  onAddressValidated={(isValid, addr) => {
                    setAddressValid(isValid);
                    setAddress(isValid ? addr : '');
                  }}
                />
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (orderType === 'delivery' && !address.trim()) return;
              if (belowMin) return;
              onConfirm({ orderType, address: orderType === 'delivery' ? address : undefined, fee: deliveryFee });
            }}
            disabled={orderType === 'delivery' && (!addressValid || belowMin)}
            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-sm transition-colors">
            {lang === 'vi' ? 'Tiếp tục đặt hàng' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

const PAYMENT_METHODS = [
  { key: 'cash_or_transfer', vi: 'Tiền mặt / Chuyển khoản', en: 'Cash / Bank Transfer', icon: '💵', for: ['pickup'] },
  { key: 'cod', vi: 'Tiền mặt khi giao (COD)', en: 'Cash on Delivery (COD)', icon: '🏠', for: ['delivery'] },
  { key: 'momo', vi: 'Ví MoMo', en: 'MoMo Wallet', icon: '💜', for: ['pickup', 'delivery'] },
  { key: 'zalopay', vi: 'ZaloPay', en: 'ZaloPay', icon: '🔵', for: ['pickup', 'delivery'] },
  { key: 'vnpay', vi: 'VNPay', en: 'VNPay', icon: '🏦', for: ['pickup', 'delivery'] },
  { key: 'creditcard', vi: '9Pay — Thẻ Tín Dụng / Ghi Nợ', en: '9Pay — Credit / Debit Card', icon: '💳', for: ['pickup', 'delivery'] },
];
const ONLINE = ['momo', 'zalopay', 'vnpay'];

function Checkout({ cart, restaurant, orderType, deliveryAddress, deliveryFee, onBack, onSuccess, onSetQty, lang, onLangChange, customer }: {
  cart: CartItem[]; restaurant: any; orderType: string;
  deliveryAddress?: string; deliveryFee: number;
  onBack: () => void; onSuccess: (orderId: string, orderType: string, paymentMethod: string) => void;
  onSetQty: (id: string, qty: number) => void;
  lang: string; onLangChange: (l: string) => void; customer: any;
}) {
  const [name, setName] = useState(customer?.full_name || '');
  const [phone, setPhone] = useState(customer?.phone_number || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(orderType === 'pickup' ? 'cash_or_transfer' : 'cod');
  const [tipPct, setTipPct] = useState(0);
  const [placing, setPlacing] = useState(false);
  const placingRef = useRef(false);
  const [checkoutMode, setCheckoutMode] = useState<null | 'checkout'>(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const serviceFeePct = orderType === 'delivery' ? (subtotal >= 1000001 ? 0.02 : subtotal >= 500001 ? 0.016 : 0.01) : 0.01;
  const serviceFee = Math.round(subtotal * serviceFeePct);
  const effectiveDelivery = totalQty >= 10 && orderType === 'delivery' ? 100000 : deliveryFee;
  const tipAmount = Math.round(subtotal * tipPct / 100);
  const total = subtotal + serviceFee + (orderType === 'delivery' ? effectiveDelivery : 0) + tipAmount;
  const validMethods = PAYMENT_METHODS.filter(m => m.for.includes(orderType));

  const handlePlace = async () => {
    if (placingRef.current) return;
    placingRef.current = true;
    setPlacing(true);
    try {
      if (!name.trim() || !phone.trim() || !email.trim()) {
        alert(lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin' : 'Please fill in all required fields');
        return;
      }
      const items = cart.map(i => ({ menu_item_id: i.id, name: i.name, price: i.price, quantity: i.qty }));
      const orderRes = await fetch(`${RAILWAY}/api/orders`, {
        method: 'POST', headers: JSON_HEADERS,
        body: JSON.stringify({
          restaurant_id: restaurant.id, restaurant_name: restaurant.name,
          customer_email: email, customer_name: name, customer_phone: phone,
          items, subtotal, service_fee: serviceFee,
          delivery_fee: orderType === 'delivery' ? effectiveDelivery : 0,
          tip_amount: tipAmount, tip_percentage: tipPct, total,
          order_type: orderType, delivery_address: orderType === 'delivery' ? deliveryAddress : '',
          payment_method: paymentMethod,
          payment_status: ONLINE.includes(paymentMethod) ? 'pending_payment' : 'waiting',
          cash_collected: false, notes, language: lang, status: 'confirmed',
          confirmed_at: new Date().toISOString(),
        }),
      });
      const order = await orderRes.json();
      if (ONLINE.includes(paymentMethod)) {
        const redirectUrl = `${window.location.origin}${window.location.pathname}?payment=success&orderId=${order.id}`;
        const result = await createPayment(paymentMethod as any, order.id, total, redirectUrl);
        if (result.payUrl) { window.location.href = result.payUrl; return; }
        alert(lang === 'vi' ? 'Lỗi kết nối thanh toán.' : 'Payment connection error.');
        return;
      }
      onSuccess(order.id, orderType, paymentMethod);
    } finally { setPlacing(false); placingRef.current = false; }
  };

  if (!checkoutMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="font-bold text-gray-900 text-sm">{restaurant.name}</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h2 className="font-black text-2xl text-gray-900 mb-2">{lang === 'vi' ? 'Xác nhận đặt hàng' : 'Confirm your order'}</h2>
              <p className="text-sm text-gray-500">{lang === 'vi' ? 'Chọn hình thức tiếp tục' : 'Choose how to continue'}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary'}</p>
                <div className="space-y-1.5">
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.qty}× {item.name}</span>
                      <span className="font-medium text-gray-900">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                  {cart.length > 3 && <p className="text-xs text-gray-400">+{cart.length - 3} {lang === 'vi' ? 'món khác' : 'more'}</p>}
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-gray-100 mt-2">
                  <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                  <span className="text-primary">{fmt(subtotal)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button onClick={() => setCheckoutMode('checkout')}
                className="w-full bg-primary text-white rounded-2xl p-4 text-left hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{customer ? (lang === 'vi' ? 'Tiếp tục đặt hàng' : 'Continue to checkout') : (lang === 'vi' ? 'Tiếp tục không cần đăng nhập' : 'Continue without signing in')}</p>
                      <p className="text-xs text-white/80">{lang === 'vi' ? 'Không cần tạo tài khoản' : 'No account required'}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-white/70 rotate-180" />
                </div>
              </button>
              {!customer && (
                <button onClick={() => { localStorage.setItem('checkout_redirect', window.location.pathname); window.location.href = '/login'; }}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/30 rounded-2xl p-4 text-left transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{lang === 'vi' ? 'Đăng nhập / Đăng ký' : 'Log in / Sign up'}</p>
                        <p className="text-xs text-gray-500">{lang === 'vi' ? 'Xem lại đơn hàng và nhận ưu đãi' : 'Track orders and get offers'}</p>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-700 transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-primary/10 rounded-full p-1 text-xs font-semibold">
              <button onClick={() => onLangChange('vi')} className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>VI</button>
              <button onClick={() => onLangChange('en')} className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}>EN</button>
            </div>
            <span className="text-sm font-semibold text-gray-500">{lang === 'vi' ? 'Thanh toán' : 'Payment'}</span>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 text-sm font-semibold px-3 py-1.5 rounded-full">
              {orderType === 'delivery' ? <Bike className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
              {orderType === 'delivery' ? (lang === 'vi' ? 'Giao hàng' : 'Delivery') : (lang === 'vi' ? 'Mang về' : 'Pickup')}
            </span>
          </div>
          {orderType === 'delivery' && deliveryAddress && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Bike className="w-4 h-4 text-orange-400" /> {lang === 'vi' ? 'Thông tin giao hàng' : 'Delivery Info'}
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">✓ {lang === 'vi' ? 'Địa chỉ giao hàng' : 'Delivery Address'}</p>
                  <p className="text-sm text-gray-800">{deliveryAddress}</p>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mt-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <p className="text-sm text-gray-800">{lang === 'vi' ? '20-40 phút' : '20-40 minutes'}</p>
              </div>
            </div>
          )}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" /> {lang === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
            </h2>
            {customer ? (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-900">{customer.full_name}</p>
                <p className="text-sm text-gray-600">{customer.email}</p>
                {customer.phone_number && <p className="text-sm text-gray-600">{customer.phone_number}</p>}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">{lang === 'vi' ? 'Họ và tên' : 'Full Name'} *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">{lang === 'vi' ? 'Số điện thoại' : 'Phone'} *</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0912 345 678"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <span className="text-orange-400">💳</span> {lang === 'vi' ? 'Phương thức thanh toán' : 'Payment Method'}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {validMethods.map(m => (
                <button key={m.key} onClick={() => setPaymentMethod(m.key)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${paymentMethod === m.key ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-orange-200 hover:bg-orange-50/50'}`}>
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-xs leading-tight">{lang === 'vi' ? m.vi : m.en}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-400" /> {lang === 'vi' ? 'Ghi chú đặc biệt' : 'Special Instructions'}
            </h2>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder={lang === 'vi' ? 'Ít đường, không hành...' : 'Less sugar, no onions...'}
              rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
          </div>
        </div>
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-20">
            <div className="px-5 py-4 border-b border-gray-100 bg-primary/10 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 text-base">{lang === 'vi' ? 'Đơn hàng của bạn' : 'Your Order'}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{restaurant.name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary text-lg">{fmt(subtotal)}</p>
                <p className="text-xs text-gray-500">{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</p>
              </div>
            </div>
            <div className="px-5 py-4 space-y-3 max-h-72 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => onSetQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 transition-colors">
                      {item.qty === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3 text-gray-400" />}
                    </button>
                    <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                    <button onClick={() => onSetQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 transition-colors">
                      <Plus className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                  <p className="flex-1 text-xs text-gray-700 leading-snug">{item.name}</p>
                  <p className="text-xs font-bold text-gray-900 flex-shrink-0">{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-gray-500"><span>{lang === 'vi' ? 'Phí dịch vụ' : 'Service fee'}</span><span>{fmt(serviceFee)}</span></div>
              {orderType === 'delivery' && <div className="flex justify-between text-gray-500"><span>{lang === 'vi' ? 'Phí giao hàng' : 'Delivery fee'}</span><span>{fmt(effectiveDelivery)}</span></div>}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">{lang === 'vi' ? 'Tip cho nhân viên' : 'Tip for Staff'}</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 10, 15, 20].map(pct => (
                    <button key={pct} onClick={() => setTipPct(pct)}
                      className={`px-2 py-2 rounded-lg border text-xs font-semibold transition-all ${tipPct === pct ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'}`}>
                      {pct === 0 ? (lang === 'vi' ? 'Không' : 'None') : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
              {tipAmount > 0 && <div className="flex justify-between text-gray-500"><span>Tip</span><span className="font-semibold text-orange-500">{fmt(tipAmount)}</span></div>}
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                <span className="text-primary">{fmt(total)}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button onClick={handlePlace} disabled={placing || cart.length === 0}
                className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg shadow-primary/30">
                {placing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {lang === 'vi' ? 'Đang xử lý...' : 'Processing...'}
                  </span>
                ) : `${lang === 'vi' ? 'Xác nhận đặt hàng' : 'Place Order'} · ${fmt(total)}`}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                {lang === 'vi' ? 'Bằng cách đặt hàng, bạn đồng ý với ' : 'By ordering you agree to our '}
                <Link href="/terms" className="underline hover:text-gray-600">{lang === 'vi' ? 'điều khoản dịch vụ' : 'terms of service'}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ successOrder, restaurant, lang, onBack }: {
  successOrder: any; restaurant: any; lang: string; onBack: () => void;
}) {
  const { id, status, notes, orderType, paymentMethod } = successOrder;
  const isWaiting = !['accepted', 'preparing', 'ready', 'delivering', 'completed', 'declined', 'timed_out'].includes(status);
  const declineReason = notes?.match(/Reason: (.+)/)?.[1] || '';
  const estTime = notes?.match(/Est: ([^|]+)/)?.[1]?.trim() || '';
  const payLabel: Record<string, string> = {
    cash_or_transfer: lang === 'vi' ? 'Tiền mặt / Chuyển khoản' : 'Cash / Bank Transfer',
    cod: lang === 'vi' ? 'Tiền mặt khi giao' : 'Cash on Delivery',
    momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay',
    creditcard: lang === 'vi' ? 'Thẻ tín dụng (9Pay)' : 'Credit Card (9Pay)',
  };
  const Logo = () => restaurant?.logo
    ? <img src={restaurant.logo} alt={restaurant.name} className="h-14 object-contain mx-auto mb-8" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    : <p className="font-bold text-xl text-gray-900 mb-8">{restaurant?.name}</p>;
  const BackBtn = () => (
    <button onClick={onBack} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-colors w-full">
      {lang === 'vi' ? 'Quay lại thực đơn' : 'Back to Menu'}
    </button>
  );

  if (status === 'timed_out') return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-sm w-full"><Logo />
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-5xl">⏰</span></div>
        <h2 className="font-bold text-xl text-gray-900 mb-3">{lang === 'vi' ? 'Đơn hàng chưa được xác nhận.' : 'Order not confirmed.'}</h2>
        <p className="text-gray-500 text-sm mb-6">{lang === 'vi' ? 'Vui lòng liên hệ nhà hàng.' : 'Please contact the restaurant.'}</p>
        <BackBtn />
      </div>
    </div>
  );

  if (status === 'declined') return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-sm w-full"><Logo />
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-5xl">❌</span></div>
        <h2 className="font-bold text-2xl text-gray-900 mb-2">{lang === 'vi' ? 'Đơn hàng bị từ chối' : 'Order Declined'}</h2>
        {declineReason && <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-4"><p className="text-red-700 text-sm">{lang === 'vi' ? 'Lý do:' : 'Reason:'} {declineReason}</p></div>}
        <p className="text-xs text-gray-400 font-mono mb-6">#{id?.slice(-8).toUpperCase()}</p>
        <BackBtn />
      </div>
    </div>
  );

  if (!isWaiting) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center"><Logo />
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"><span className="text-5xl">✅</span></div>
        <h2 className="font-bold text-2xl text-gray-900 mb-1">{lang === 'vi' ? 'Đơn hàng đã được xác nhận!' : 'Order confirmed!'}</h2>
        <p className="text-xs text-gray-400 font-mono mb-4">#{id?.slice(-8).toUpperCase()}</p>
        {estTime && (
          <div className="bg-orange-50 border border-orange-300 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 justify-center">
            <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-orange-700 font-semibold text-sm">⏱ {estTime}</span>
          </div>
        )}
        {successOrder.items?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{lang === 'vi' ? 'Món đã đặt' : 'Items ordered'}</p>
            <div className="space-y-2">
              {successOrder.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-800">{item.quantity}× {item.name}</span>
                  <span className="font-semibold text-gray-900">{fmt(item.price * item.quantity)}</span>
                </div>
              ))}
              {successOrder.total && (
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-gray-100">
                  <span>{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
                  <span className="text-primary">{fmt(successOrder.total)}</span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-sm text-gray-700 flex items-center gap-2">
          <span className="text-lg">💳</span><span>{payLabel[paymentMethod] || paymentMethod}</span>
        </div>
        {orderType === 'delivery' && successOrder.delivery_address && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 text-sm text-gray-700 flex items-start gap-2 text-left">
            <span className="text-lg flex-shrink-0">📍</span><span>{successOrder.delivery_address}</span>
          </div>
        )}
        <BackBtn />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-sm w-full"><Logo />
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-4 rounded-full bg-primary/5 flex items-center justify-center"><span className="text-3xl">🍜</span></div>
        </div>
        <h2 className="font-bold text-xl text-gray-900 mb-2">{lang === 'vi' ? 'Đang chờ quán xác nhận...' : 'Waiting for merchant to confirm...'}</h2>
        <p className="text-xs text-gray-400 mb-6">{lang === 'vi' ? 'Vui lòng không đóng trang này' : 'Please do not close this page'}</p>
        <p className="text-xs text-gray-400 font-mono">#{id?.slice(-8).toUpperCase()}</p>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lang, setLang] = useState('vi');
  const [customer, setCustomer] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: any; groups: any[] } | null>(null);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [checkoutOrderType, setCheckoutOrderType] = useState<string | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<{ address?: string; fee: number } | null>(null);
  const [successOrder, setSuccessOrder] = useState<any>(null);
  const [paymentReturnOrderId, setPaymentReturnOrderId] = useState<string | null>(null);
  const [paymentReturnStatus, setPaymentReturnStatus] = useState<string | null>(null);
  const pollStartRef = useRef<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'location' | 'reviews'>('menu');
  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith('/location')) setActiveTab('location');
    else if (path.endsWith('/reviews')) setActiveTab('reviews');
    else setActiveTab('menu');
  }, []);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const { cart, add, set, clear, totalQty, subtotal } = useCart();

  const loadReviews = (id: string) => {
    if (reviews.length > 0) return;
    setLoadingReviews(true);
    fetch(`${RAILWAY}/api/restaurant-reviews?restaurantId=${id}`)
      .then(r => r.json()).then(d => setReviews(Array.isArray(d) ? d : [])).catch(() => {})
      .finally(() => setLoadingReviews(false));
  };

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    const returnOrderId = urlParams.get('orderId');
    if (payment || returnOrderId) {
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      url.searchParams.delete('orderId');
      window.history.replaceState({}, '', url.toString());
    }
    if (payment === 'success' && returnOrderId) {
      setPaymentReturnOrderId(returnOrderId);
      setPaymentReturnStatus('success');
    } else if (payment === 'timeout') {
      setPaymentReturnStatus('timeout');
    }
  }, []);

  useEffect(() => { localStorage.setItem('ovenly_language', lang); }, [lang]);

  useEffect(() => {
    if (!slug || slug === 'undefined') return;
    const load = async () => {
      try {
        const res = await fetch(`/api/restaurant?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!data) { setLoadingRestaurant(false); setLoadingItems(false); return; }
        setRestaurant(data);
        document.title = `${data.name} | Menu & Đặt Hàng Online`;
        const menuRes = await fetch(`/api/menu?slug=${encodeURIComponent(slug)}`);
        const menuData = await menuRes.json();
        setCategories(menuData.categories || []);
        setAllItems(menuData.items || []);
      } catch (err) { console.error('Failed to load restaurant:', err); }
      setLoadingRestaurant(false);
      setLoadingItems(false);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [slug]);

  useEffect(() => {
    if (!paymentReturnOrderId || paymentReturnStatus !== 'success') return;
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${RAILWAY}/api/orders/${paymentReturnOrderId}/status`);
        const order = await res.json();
        if (order?.id) {
          setSuccessOrder({
            id: paymentReturnOrderId, status: order.status || 'pending', notes: order.notes || '',
            orderType: order.order_type || 'delivery', paymentMethod: order.payment_method || '',
            items: order.items || [], total: order.total, delivery_address: order.delivery_address || '',
          });
          setPaymentReturnStatus(null);
          setPaymentReturnOrderId(null);
        }
      } catch {}
    };
    fetchOrder();
  }, [paymentReturnOrderId, paymentReturnStatus]);

  useEffect(() => {
    if (!successOrder?.id) return;
    if (['accepted', 'preparing', 'ready', 'delivering', 'completed', 'declined', 'timed_out'].includes(successOrder.status)) return;
    if (!pollStartRef.current) pollStartRef.current = Date.now();
    const interval = setInterval(async () => {
      try {
        if (Date.now() - pollStartRef.current! > 10 * 60 * 1000) {
          setSuccessOrder((prev: any) => ({ ...prev, status: 'timed_out' })); return;
        }
        const res = await fetch(`${RAILWAY}/api/orders/${successOrder.id}/status`);
        const order = await res.json();
        if (order?.status) setSuccessOrder((prev: any) => ({
          ...prev, status: order.status, notes: order.notes || prev.notes,
          items: order.items || prev.items, total: order.total ?? prev.total,
          delivery_address: order.delivery_address || prev.delivery_address,
        }));
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, [successOrder?.id, successOrder?.status]);

  const status = getRestaurantStatus(restaurant);
  const isClosed = status !== 'OPEN';
  const todayHours = getTodayHours(restaurant);

  const groupedItems = useMemo(() => {
    if (allItems.length === 0) return [];
    if (activeCategory !== 'all') {
      const cat = categories.find((c: any) => c.id === activeCategory);
      return cat ? [{ category: cat, items: allItems.filter((i: any) => i.category_id === activeCategory) }] : [];
    }
    if (categories.length > 0) {
      const sortedCats = [...categories].sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
      const grouped = sortedCats
        .map((cat: any) => ({ category: cat, items: allItems.filter((i: any) => i.category_id === cat.id) }))
        .filter(g => g.items.length > 0);
      const categorizedIds = new Set(categories.map((c: any) => c.id));
      const uncategorized = allItems.filter((i: any) => !categorizedIds.has(i.category_id));
      if (uncategorized.length > 0) grouped.push({ category: { id: '__uncategorized', name: 'Khác / Other', sort_order: 9999 }, items: uncategorized });
      return grouped;
    }
    return [{ category: { id: '__all', name: 'Thực Đơn / Menu', sort_order: 0 }, items: allItems }];
  }, [activeCategory, allItems, categories]);

  const getCatLabel = (name: string) => {
    if (!name) return '';
    const slash = name.indexOf('/');
    if (slash === -1) return name.trim();
    return lang === 'en' ? name.substring(slash + 1).trim() : name.substring(0, slash).trim();
  };

  const handleSuccess = (orderId: string, orderType: string, paymentMethod: string) => {
    setCheckoutOrderType(null); setDeliveryDetails(null); clear();
    setSuccessOrder({ id: orderId, status: 'pending', notes: '', orderType, paymentMethod, items: [], delivery_address: deliveryDetails?.address || '' });
  };

  if (!slug || slug === 'undefined') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center"><p className="text-5xl mb-4">😕</p>
        <p className="font-bold text-gray-700 text-lg mb-4">{lang === 'vi' ? 'Không tìm thấy nhà hàng' : 'Restaurant not found'}</p>
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">← {lang === 'vi' ? 'Quay lại' : 'Go back'}</Link>
      </div>
    </div>
  );

  if (paymentReturnStatus === 'timeout') return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-4xl">⏰</span></div>
      <h2 className="font-bold text-2xl text-gray-900 mb-2">{lang === 'vi' ? 'Đã hết thời gian thanh toán' : 'Payment Time Expired'}</h2>
      <button onClick={() => setPaymentReturnStatus(null)} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:opacity-90">
        {lang === 'vi' ? 'Thử lại' : 'Try Again'}
      </button>
    </div>
  );

  if (paymentReturnStatus === 'success' && paymentReturnOrderId) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="relative w-28 h-28 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-4 rounded-full bg-primary/5 flex items-center justify-center"><span className="text-3xl">🍜</span></div>
      </div>
      <h2 className="font-bold text-xl text-gray-900">{lang === 'vi' ? 'Đang xử lý...' : 'Processing...'}</h2>
    </div>
  );

  if (loadingRestaurant) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">{lang === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
      </div>
    </div>
  );

  if (!restaurant) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center"><p className="text-5xl mb-4">😕</p>
        <p className="font-bold text-gray-700 text-lg mb-4">{lang === 'vi' ? 'Không tìm thấy nhà hàng' : 'Restaurant not found'}</p>
        <Link href="/" className="text-sm font-semibold text-primary hover:underline">← {lang === 'vi' ? 'Quay lại' : 'Go back'}</Link>
      </div>
    </div>
  );

  if (!restaurant.is_active) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <img src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly" style={{ height: '100px', width: 'auto' }} className="mx-auto mb-12 object-contain" />
      <h1 className="font-bold text-3xl text-gray-800 mb-4 text-center">{lang === 'vi' ? 'Chúng tôi đang tạm thời nâng cấp hệ thống.' : 'We are currently working on improvements.'}</h1>
      <p className="text-gray-600 text-base leading-relaxed mb-12 text-center">{lang === 'vi' ? 'Cảm ơn bạn đã kiên nhẫn chờ đợi. Vui lòng quay lại sau!' : 'Thank you for your patience. Please check back soon!'}</p>
      <div className="pt-8 border-t border-gray-100 mt-12"><p className="text-xs text-gray-400">Powered by Ovenly</p></div>
    </div>
  );

  if (successOrder) return <SuccessScreen successOrder={successOrder} restaurant={restaurant} lang={lang} onBack={() => { setSuccessOrder(null); pollStartRef.current = null; }} />;

  if (checkoutOrderType) return (
    <Checkout cart={cart} restaurant={restaurant} orderType={checkoutOrderType}
      deliveryAddress={deliveryDetails?.address}
      deliveryFee={deliveryDetails?.fee ?? parseFloat(restaurant.delivery_fee) ?? 0}
      onBack={() => { setCheckoutOrderType(null); setDeliveryDetails(null); }}
      onSuccess={handleSuccess} onSetQty={set} lang={lang} onLangChange={setLang} customer={customer} />
  );

  const DAYS_VI = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const DAYS_KEY = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIdx = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })).getDay();
  const cuisineTypes = Array.isArray(restaurant.cuisine_type) ? restaurant.cuisine_type : restaurant.cuisine_type ? [restaurant.cuisine_type] : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            {restaurant.logo ? (
              <img src={restaurant.logo} alt={restaurant.name} className="object-contain" style={{ height: '52px', width: 'auto' }}
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const span = document.createElement('span');
                  span.textContent = restaurant.name;
                  span.className = 'font-bold text-gray-900 text-base';
                  img.parentNode?.insertBefore(span, img);
                }} />
            ) : (
              <span className="font-bold text-gray-900 text-base">{restaurant.name}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-semibold">
              <button onClick={() => setLang('vi')} className={`px-2.5 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>VI</button>
              <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>EN</button>
            </div>
            {activeTab === 'menu' && (
              <button onClick={() => setShowMobileCart(true)}
                className="relative flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
                <ShoppingBag className="w-4 h-4" />
                {totalQty > 0 && <span className="text-sm font-bold">{fmt(subtotal)}</span>}
                {totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-primary text-[10px] font-black rounded-full flex items-center justify-center shadow">
                    {totalQty}
                  </span>
                )}
              </button>
            )}
            <button onClick={() => setNavOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Navigation">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full overflow-hidden" style={{ height: 'clamp(180px, 22vw, 280px)' }}>
        {restaurant.banner ? (
          <img src={restaurant.banner} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/75" />
        )}
      </div>

      {/* Closed notice */}
      {isClosed && (
        <div className="bg-red-50 border-l-4 border-red-400 px-4 py-3 w-full">
          <div className="max-w-6xl mx-auto">
            <p className="text-red-600 font-semibold text-sm">
              {lang === 'vi' ? '🔴 Nhà hàng hiện không nhận đơn trực tuyến. Vui lòng quay lại trong giờ mở cửa.' : '🔴 Online ordering is currently unavailable. Please come back during opening hours.'}
            </p>
          </div>
        </div>
      )}

      {/* Restaurant info */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          {(restaurant.address || (restaurant.phone && restaurant.phone !== 'N/A' && restaurant.phone !== 'n/a')) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-2">
              {restaurant.address && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {restaurant.address}
                </span>
              )}
              {restaurant.phone && restaurant.phone !== 'N/A' && restaurant.phone !== 'n/a' && (
                <a href={`tel:${restaurant.phone}`} className="text-xs text-gray-500 flex items-center gap-1 hover:text-primary transition-colors">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"/></svg>
                  {restaurant.phone}
                </a>
              )}
            </div>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadgeClass(status)}`}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: status === 'OPEN' ? '#22C55E' : status === 'PAUSED' ? '#F97316' : '#9CA3AF' }} />
              {status === 'OPEN' ? (lang === 'vi' ? 'Đang mở' : 'Open now') : status === 'PAUSED' ? (lang === 'vi' ? 'Tạm dừng' : 'Paused') : (lang === 'vi' ? 'Đóng cửa' : 'Closed')}
            </span>
            {todayHours && <span className="text-xs text-gray-500 font-medium">{todayHours}</span>}
            {restaurant.total_ratings >= 3 && (
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-xs font-bold text-gray-700">{parseFloat(restaurant.average_rating).toFixed(1)}</span>
                <span className="text-xs text-gray-400">({restaurant.total_ratings})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category bar */}
      {activeTab === 'menu' && (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            <button onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {lang === 'vi' ? 'Tất cả' : 'All'}
            </button>
            {categories
              .filter((cat: any) => {
                if (!cat.name || typeof cat.name !== 'string') return false;
                if (cat.name.toLowerCase().includes('tất cả') || cat.name.toLowerCase() === 'all') return false;
                if (cat.is_active === false) return false;
                return allItems.filter((i: any) => i.category_id === cat.id).length > 0;
              })
              .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((cat: any) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {getCatLabel(cat.name)}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 flex gap-6">
        <div className="flex-1 min-w-0">

          {/* MENU TAB */}
          {activeTab === 'menu' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-gray-900 tracking-tight">Menu</span>
                <div className="h-0.5 flex-1 rounded-full bg-primary" />
              </div>
              {loadingItems ? (
                <div className="text-center text-gray-500 py-16">{lang === 'vi' ? 'Đang tải thực đơn...' : 'Loading menu...'}</div>
              ) : groupedItems.length === 0 ? (
                <div className="text-center text-gray-500 py-16">{lang === 'vi' ? 'Chưa có món ăn' : 'No items yet'}</div>
              ) : (
                <div className="space-y-8">
                  {groupedItems.map(({ category, items }) => (
                    items.length > 0 && (
                      <div key={category.id}>
                        <div className="mb-4 pb-3 border-b border-gray-200">
                          <h2 className="text-lg font-bold text-gray-900">{getCatLabel(category.name)}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {items.map((item: any) => (
                            <div key={item.id} className={item.is_available === false ? 'opacity-50' : ''}>
                              <MenuItemCard
                                item={item}
                                qty={cart.filter(c => c.id === item.id).reduce((s, i) => s + i.qty, 0)}
                                onAdd={add} onSet={set}
                                onOpen={(it, groups) => setSelectedItem({ item: it, groups })}
                                isClosed={isClosed || item.is_available === false}
                                isOutOfStock={item.is_available === false}
                                lang={lang}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </>
          )}

          {/* LOCATION TAB */}
          {activeTab === 'location' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-black text-gray-900">{lang === 'vi' ? 'Vị Trí & Giờ Mở Cửa' : 'Location & Hours'}</h2>
              {restaurant.address && (
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  {restaurant.latitude && restaurant.longitude ? (
                    <TrackAsiaMap
                      latitude={parseFloat(restaurant.latitude)}
                      longitude={parseFloat(restaurant.longitude)}
                      name={restaurant.name}
                    />
                  ) : (
                    <div className="h-44 bg-gray-100 flex flex-col items-center justify-center gap-3">
                      <p className="text-sm text-gray-500">{lang === 'vi' ? 'Chưa có tọa độ bản đồ' : 'Map coordinates not set'}</p>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                        {lang === 'vi' ? 'Xem trên Google Maps →' : 'View on Google Maps →'}
                      </a>
                    </div>
                  )}
                </div>
              )}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
                {restaurant.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</p>
                      <p className="text-sm font-medium text-gray-900">{restaurant.address}</p>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-semibold hover:underline mt-1 inline-block">
                        {lang === 'vi' ? 'Mở trong Google Maps →' : 'Open in Google Maps →'}
                      </a>
                    </div>
                  </div>
                )}
                {restaurant.phone && restaurant.phone !== 'N/A' && restaurant.phone !== 'n/a' && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{lang === 'vi' ? 'Điện thoại' : 'Phone'}</p>
                      <a href={`tel:${restaurant.phone}`} className="text-sm font-medium text-primary hover:underline">{restaurant.phone}</a>
                    </div>
                  </div>
                )}
              </div>
              {restaurant.hours && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-gray-900">{lang === 'vi' ? 'Giờ Mở Cửa' : 'Opening Hours'}</h3>
                  </div>
                  {DAYS_KEY.map((key, i) => {
                    const h = restaurant.hours[key];
                    const isToday = i === todayIdx;
                    return (
                      <div key={key} className={`flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 px-2 rounded-lg ${isToday ? 'bg-primary/5' : ''}`}>
                        <span className={`text-sm ${isToday ? 'font-bold text-primary' : 'text-gray-700'}`}>
                          {lang === 'vi' ? DAYS_VI[i] : DAYS_EN[i]}
                          {isToday && <span className="ml-2 text-xs bg-primary text-white px-1.5 py-0.5 rounded-full">{lang === 'vi' ? 'Hôm nay' : 'Today'}</span>}
                        </span>
                        <span className={`text-sm font-semibold ${h ? (isToday ? 'text-primary' : 'text-gray-900') : 'text-gray-400'}`}>
                          {h || (lang === 'vi' ? 'Đóng cửa' : 'Closed')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900">{lang === 'vi' ? 'Đánh Giá' : 'Reviews'}</h2>
                {restaurant.total_ratings >= 3 && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    <span className="text-xl font-black text-amber-600">{parseFloat(restaurant.average_rating).toFixed(1)}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(restaurant.average_rating) ? '#F59E0B' : '#E5E7EB'}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500 font-medium">
                  {lang === 'vi' ? 'Chỉ hiển thị đánh giá từ khách đã đặt hàng qua LÒ ĐỒ ĂN' : 'Only verified reviews from orders placed through LÒ ĐỒ ĂN'}
                </p>
              </div>
              {loadingReviews ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
                  <p className="text-gray-400 font-medium">{lang === 'vi' ? 'Chưa có đánh giá nào' : 'No reviews yet'}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((r: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-600">{r.customer_name?.[0]?.toUpperCase() || '?'}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{r.customer_name || 'Khách hàng'}</p>
                            <p className="text-xs text-gray-400">{new Date(r.created_date).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= r.star_rating ? '#F59E0B' : '#E5E7EB'}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      {r.comment && <p className="text-sm text-gray-700 leading-relaxed">{r.comment}</p>}
                      <p className="text-xs text-green-600 font-medium mt-2">{lang === 'vi' ? '✓ Đã đặt hàng' : '✓ Verified order'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop cart */}
        {activeTab === 'menu' && (
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-[112px]">
              <CartSidebar cart={cart} subtotal={subtotal} totalQty={totalQty} onSet={set}
                onCheckout={() => setShowDeliveryModal(true)} isClosed={isClosed} lang={lang} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile cart bar */}
      {totalQty > 0 && !isClosed && activeTab === 'menu' && (
        <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
          <button onClick={() => setShowMobileCart(true)}
            className="w-full bg-primary hover:opacity-90 text-white rounded-2xl py-4 px-5 font-bold flex items-center justify-between shadow-2xl shadow-primary/30 text-sm">
            <span className="bg-white/20 px-2.5 py-1 rounded-lg font-bold">{totalQty} {lang === 'vi' ? 'món' : 'items'}</span>
            <span>{lang === 'vi' ? 'Xem giỏ hàng' : 'View Cart'}</span>
            <span className="font-bold">{fmt(subtotal)}</span>
          </button>
        </div>
      )}

      {/* Mobile cart drawer */}
      {showMobileCart && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileCart(false)} />
          <div className="relative bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">{lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your Cart'}</h2>
              <button onClick={() => setShowMobileCart(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <CartSidebar cart={cart} subtotal={subtotal} totalQty={totalQty} onSet={set}
              onCheckout={() => { setShowMobileCart(false); setShowDeliveryModal(true); }}
              isClosed={isClosed} lang={lang} />
          </div>
        </div>
      )}

      {/* Nav drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setNavOpen(false)} />
          <div className="relative ml-auto w-64 bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              {restaurant.logo ? (
                <img src={restaurant.logo} alt={restaurant.name} className="h-9 w-auto object-contain"
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const span = document.createElement('span');
                    span.textContent = restaurant.name;
                    span.className = 'font-bold text-sm text-gray-900 truncate';
                    img.parentNode?.insertBefore(span, img);
                  }} />
              ) : (
                <span className="font-bold text-sm text-gray-900 truncate">{restaurant.name}</span>
              )}
              <button onClick={() => setNavOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 flex-shrink-0 ml-2">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {([
                { id: 'menu' as const, label: lang === 'vi' ? 'Menu' : 'Menu', sub: lang === 'vi' ? 'Xem thực đơn & đặt hàng' : 'Browse menu & order' },
                { id: 'location' as const, label: lang === 'vi' ? 'Vị Trí' : 'Location', sub: lang === 'vi' ? 'Địa chỉ & giờ mở cửa' : 'Address & hours' },
                { id: 'reviews' as const, label: lang === 'vi' ? 'Đánh Giá' : 'Reviews', sub: lang === 'vi' ? 'Từ khách đã đặt hàng' : 'From verified orders' },
              ]).map(item => (
                <button key={item.id}
                  onClick={() => {
  setActiveTab(item.id);
  setNavOpen(false);
  if (item.id === 'reviews' && restaurant?.id) loadReviews(restaurant.id);
  const pathMap: Record<string, string> = { menu: '', location: '/location', reviews: '/reviews' };
  const base = window.location.pathname.split('/')[1];
  window.history.pushState({}, '', `/${base}${pathMap[item.id]}`);
}}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all text-left ${activeTab === item.id ? 'bg-primary/10' : 'hover:bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-semibold ${activeTab === item.id ? 'text-primary' : 'text-gray-900'}`}>{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                  {activeTab === item.id && <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />}
                </button>
              ))}
            </nav>
            <div className="px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {lang === 'vi' ? 'Đang xem: ' : 'Viewing: '}
                <span className="text-primary font-semibold">
                  {activeTab === 'menu' ? 'Menu' : activeTab === 'location' ? (lang === 'vi' ? 'Vị Trí' : 'Location') : (lang === 'vi' ? 'Đánh Giá' : 'Reviews')}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Item modal */}
      {selectedItem && (
        <ItemModal item={selectedItem.item} groups={selectedItem.groups} lang={lang}
          onClose={() => setSelectedItem(null)}
          onAdd={item => { add(item); setSelectedItem(null); }} />
      )}

      {/* Delivery modal */}
      <DeliveryOptionsModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        onConfirm={details => {
          setDeliveryDetails({ address: details.address, fee: details.fee || parseFloat(restaurant.delivery_fee) || 0 });
          setShowDeliveryModal(false);
          setCheckoutOrderType(details.orderType);
        }}
        restaurant={restaurant} subtotal={subtotal} lang={lang}
      />

      {/* Cuisine & dietary */}
      {(cuisineTypes.length > 0 || (Array.isArray(restaurant.dietary_options) && restaurant.dietary_options.length > 0)) && (
        <div className="max-w-6xl mx-auto w-full px-4 mt-4 mb-2">
          <div className="border-t border-gray-200 pt-4 flex flex-wrap items-center gap-2">
            {cuisineTypes.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-gray-500">{lang === 'vi' ? 'Ẩm thực:' : 'Cuisine:'}</span>
                {cuisineTypes.map((c: string, i: number) => (
                  <span key={i} className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    {lang === 'vi' ? (CUISINE_VI[c] || c) : c}
                  </span>
                ))}
              </div>
            )}
            {Array.isArray(restaurant.dietary_options) && restaurant.dietary_options.map((opt: string) => {
              const labels: Record<string, { vi: string; emoji: string }> = {
                'Vegetarian Friendly': { vi: 'Thân Thiện Với Người Ăn Chay', emoji: '🥗' },
                'Vegan Friendly': { vi: 'Thuần Chay', emoji: '🌱' },
                'Gluten Free': { vi: 'Không Chứa Gluten', emoji: '🌾' },
                'Halal': { vi: 'Halal', emoji: '☪️' },
                'Nut Free': { vi: 'Không Có Hạt', emoji: '🥜' },
                'Dairy Free': { vi: 'Không Có Sữa', emoji: '🥛' },
                'Seafood Free': { vi: 'Không Có Hải Sản', emoji: '🦐' },
              };
              const info = labels[opt] || { vi: opt, emoji: '✓' };
              return (
                <span key={opt} className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                  {info.emoji} {lang === 'vi' ? info.vi : opt}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-5 mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors">
              {lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
            </Link>
            <span className="text-gray-300 text-xs">·</span>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors">
              {lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </Link>
            <span className="text-gray-300 text-xs">·</span>
            <Link href="/security" className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors">
              {lang === 'vi' ? 'An toàn thông tin' : 'Security Policy'}
            </Link>
            <span className="text-gray-300 text-xs">·</span>
            <Link href="/claims" className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition-colors">
              {lang === 'vi' ? 'Giải quyết khiếu nại' : 'Dispute Resolution'}
            </Link>
          </div>
          <p className="text-center text-xs text-gray-400">
            <a href="https://lodoan.vn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">LÒ ĐỒ ĂN™</a>
            {restaurant?.show_powered_by !== false && <> | Powered by <a href="https://ovenly.io" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Ovenly™</a></>}
          </p>
        </div>
      </footer>
    </div>
  );
}
