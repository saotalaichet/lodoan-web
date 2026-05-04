'use client';

import { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { RestaurantTable, TableShape as Shape } from '@/lib/api/hostTables';

interface TableEditDialogProps {
  table: RestaurantTable | null;
  onClose: () => void;
  onSave: (updates: Partial<RestaurantTable>) => void;
  onDelete: () => void;
}

const SHAPES: { value: Shape; label: string }[] = [
  { value: 'round', label: 'Tròn' },
  { value: 'square', label: 'Vuông' },
  { value: 'rectangle', label: 'Chữ nhật' },
  { value: 'booth', label: 'Booth' },
];

const SIZE_PRESETS: { label: string; width: number; height: number }[] = [
  { label: 'Nhỏ', width: 80, height: 80 },
  { label: 'Vừa', width: 100, height: 100 },
  { label: 'Lớn', width: 140, height: 100 },
  { label: 'Cực lớn', width: 180, height: 120 },
];

export function TableEditDialog({ table, onClose, onSave, onDelete }: TableEditDialogProps) {
  const [name, setName] = useState('');
  const [minCapacity, setMinCapacity] = useState(2);
  const [maxCapacity, setMaxCapacity] = useState(4);
  const [shape, setShape] = useState<Shape>('round');
  const [combinable, setCombinable] = useState(true);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    if (table) {
      setName(table.name);
      setMinCapacity(table.min_capacity);
      setMaxCapacity(table.max_capacity);
      setShape(table.shape);
      setCombinable(table.combinable);
      setWidth(table.width);
      setHeight(table.height);
    }
  }, [table]);

  if (!table) return null;

  const handleSave = () => {
    // Ensure min <= max
    const safeMin = Math.min(minCapacity, maxCapacity);
    const safeMax = Math.max(minCapacity, maxCapacity);
    onSave({
      name: name.trim() || table.name,
      min_capacity: safeMin,
      max_capacity: safeMax,
      shape, combinable, width, height,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Chỉnh sửa bàn</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tên bàn</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="VD: B1, Bàn 3"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-700/30 focus:border-red-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sức chứa <span className="text-xs text-slate-500 font-normal">(số khách tối thiểu - tối đa)</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xs text-slate-500 mb-1 text-center">Tối thiểu</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setMinCapacity(Math.max(1, minCapacity - 1))}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-base font-semibold text-slate-700"
                  >−</button>
                  <span className="text-xl font-bold text-slate-900 min-w-8 text-center">{minCapacity}</span>
                  <button
                    onClick={() => setMinCapacity(Math.min(20, minCapacity + 1))}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-base font-semibold text-slate-700"
                  >+</button>
                </div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="flex-1">
                <div className="text-xs text-slate-500 mb-1 text-center">Tối đa</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setMaxCapacity(Math.max(1, maxCapacity - 1))}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-base font-semibold text-slate-700"
                  >−</button>
                  <span className="text-xl font-bold text-slate-900 min-w-8 text-center">{maxCapacity}</span>
                  <button
                    onClick={() => setMaxCapacity(Math.min(20, maxCapacity + 1))}
                    className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-base font-semibold text-slate-700"
                  >+</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Hình dạng</label>
            <div className="grid grid-cols-4 gap-2">
              {SHAPES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setShape(s.value)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                    shape === s.value
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >{s.label}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Kích thước</label>
            <div className="grid grid-cols-4 gap-2">
              {SIZE_PRESETS.map(p => (
                <button
                  key={p.label}
                  onClick={() => { setWidth(p.width); setHeight(p.height); }}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    width === p.width && height === p.height
                      ? 'bg-red-700 text-white border-red-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >{p.label}</button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={combinable}
              onChange={e => setCombinable(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-red-700 focus:ring-red-700"
            />
            <div>
              <div className="text-sm font-medium text-slate-700">Có thể ghép bàn</div>
              <div className="text-xs text-slate-500">Có thể đẩy lại với bàn khác cho nhóm đông</div>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
          >
            <Trash2 size={16} />
            Xóa
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium"
            >Hủy</button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-semibold"
            >Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
