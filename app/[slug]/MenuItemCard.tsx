'use client';

import { useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cloudinaryThumb, fmt } from '@/lib/cloudinary';
import { useCart, useItemQty } from './CartContext';
import { useItemSelection } from './ItemSelectionContext';

interface MenuItemCardProps {
  item: any;
  isClosed: boolean;
  isOutOfStock: boolean;
  lang: string;
}

export default function MenuItemCard({
  item,
  isClosed,
  isOutOfStock,
  lang,
}: MenuItemCardProps) {
  const price = parseFloat(item.price) || 0;
  const { set: setQty } = useCart();
  const qty = useItemQty(item.id);
  const { openItem } = useItemSelection();

  // Silently preload the modal-size image during card view so that when
  // the user clicks the item, the modal opens instantly with the image
  // already cached in the browser.
  useEffect(() => {
    if (!item.image_url) return;
    const img = new window.Image();
    img.src = cloudinaryThumb(item.image_url, 800, 400);
  }, [item.image_url]);

  const handleClick = () => {
    if (isClosed) return;
    let groups: any[] = [];
    try { if (item.customization_options) groups = JSON.parse(item.customization_options); } catch {}
    openItem(item, groups);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-2xl flex flex-row items-stretch gap-0 relative overflow-hidden ${isClosed ? 'cursor-default opacity-60' : 'cursor-pointer hover:border-primary/40 hover:shadow-md'} transition-all`}
      style={{ minHeight: '160px' }}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-between p-4">
        <div>
          {(item.is_chef_choice || item.is_spicy || item.is_vegetarian) && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {item.is_chef_choice && <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">⭐ Chef's choice</span>}
              {item.is_spicy && <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">🌶 Spicy</span>}
              {item.is_vegetarian && <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">🌿 Vegetarian</span>}
            </div>
          )}
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-1">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-gray-900 text-base">{fmt(price)}</span>
          {!isClosed && !isOutOfStock && qty > 0 && (
            <div className="flex items-center gap-2 bg-primary rounded-full px-2 py-1" onClick={e => e.stopPropagation()}>
              <button onClick={() => setQty(item.id, qty - 1)} className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors">
                <Minus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
              <span className="text-sm font-bold text-white min-w-[16px] text-center">{qty}</span>
              <button onClick={() => setQty(item.id, qty + 1)} className="w-5 h-5 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors">
                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex-shrink-0 w-36 bg-gray-100 rounded-xl overflow-hidden">
        {item.image_url ? (
          <img src={cloudinaryThumb(item.image_url, 288, 288)} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🍜</div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-xs font-bold text-red-600">{lang === 'vi' ? 'Hết hàng' : 'Out of stock'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
