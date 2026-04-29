'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  basePrice?: number;
  qty: number;
  notes?: string;
  addons?: { name: string; price: number }[];
}

interface CartContextValue {
  cart: CartItem[];
  add: (item: CartItem) => void;
  set: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const newKey = `ovenly_cart:${slug}`;
      const legacy = sessionStorage.getItem('ovenly_cart');
      const existing = sessionStorage.getItem(newKey);
      if (legacy && !existing) {
        sessionStorage.setItem(newKey, legacy);
        sessionStorage.removeItem('ovenly_cart');
      }
      const saved = sessionStorage.getItem(newKey);
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, [slug]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(`ovenly_cart:${slug}`, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated, slug]);

  const add = useCallback((item: CartItem) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === item.id);
      return ex
        ? prev.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const set = useCallback((id: string, qty: number) => {
    setCart(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const totalQty = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const value = useMemo(
    () => ({ cart, add, set, clear, totalQty, subtotal }),
    [cart, add, set, clear, totalQty, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function useItemQty(itemId: string): number {
  const { cart } = useCart();
  return useMemo(
    () => cart.filter(c => c.id === itemId || c.id.startsWith(itemId)).reduce((s, i) => s + i.qty, 0),
    [cart, itemId]
  );
}
