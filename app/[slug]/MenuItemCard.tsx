'use client';

import { useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cloudinaryThumb, fmt } from '@/lib/cloudinary';
import { useCart, useItemQty } from './CartContext';

interface MenuItemCardProps {
  item: any;
  onOpen: (item: any, groups: any[]) => void;
  isClosed: boolean;
  isOutOfStock: boolean;
  lang: string;
}

export default function MenuItemCard({
  item,
  onOpen,
  isClosed,
  isOutOfStock,
  lang,
}: MenuItemCardProps) {
  const price = parseFloat(item.price) || 0;
  const { set: setQty } = useCart();
  const qty = useItemQty(item.id);

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
    onOpen(item, groups);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-xl flex flex-row items-stretch gap-0 relative overflow-hidden ${isClosed ? 'cursor-default opacity-60' : 'cursor-pointer hover:border-primary/40 hover:shadow-sm'} transition-all`}
      style={{ minHeight: '136px' }}
    >
      <div className="flex-1 min-w-0 flex flex-col justify-between p-3">
        <div>
          <div className="flex flex-wrap gap-1 mb-0.5">
            {item.is_chef_choice && <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-1 py-0.5 rounded-full">⭐</span>}
            {item.is_spicy && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded-full">🌶</span>}
            {item.is_vegetarian && <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1 py-0.5 rounded-full">🌿</span>}
          </div>
          <p className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2">{item.name}</p>
          {item.description && (
            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{item.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-bold text-primary text-sm">{fmt(price)}</span>
          {!isClosed && !isOutOfStock && qty > 0 && (
            <div className="flex items-center gap-1 bg-primary rounded-full px-1.5 py-0.5" onClick={e => e.stopPropagation()}>
              <button onClick={() => setQty(item.id, qty - 1)} className="w-3.5 h-3.5 flex items-center justify-center text-white">
                <Minus className="w-2.5 h-2.5" strokeWidth={3} />
              </button>
              <span className="text-[10px] font-bold text-white min-w-[10px] text-center">{qty}</span>
              <button onClick={() => setQty(item.id, qty + 1)} className="w-3.5 h-3.5 flex items-center justify-center text-white">
                <Plus className="w-2.5 h-2.5" strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex-shrink-0 w-32 bg-gray-100">
        {item.image_url ? (
          <img src={cloudinaryThumb(item.image_url, 256, 272)} alt={item.name} loading="lazy" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🍜</div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[9px] font-bold text-red-500">{lang === 'vi' ? 'Hết' : 'Out'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
