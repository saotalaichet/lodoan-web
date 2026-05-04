'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Plus, Save, ChevronLeft } from 'lucide-react';
import {
  fetchTables, bulkUpsertTables,
  type RestaurantTable,
} from '@/lib/api/hostTables';
import { DraggableTable } from '@/components/admin/DraggableTable';
import { TableEditDialog } from '@/components/admin/TableEditDialog';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

interface WorkingTable extends RestaurantTable {
  _isNew?: boolean;
  _dirty?: boolean;
}

let nextTempId = 1;
const tempId = () => `temp-${nextTempId++}`;

export default function FloorPlanEditorPage() {
  const params = useParams();
  const restaurantId = params?.restaurantId as string;

  const [tables, setTables] = useState<WorkingTable[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    if (!restaurantId) return;
    setLoading(true);
    fetchTables(restaurantId)
      .then(t => setTables(t))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  const selected = tables.find(t => t.id === selectedId) || null;

  const addTable = () => {
    const id = tempId();
    const newTable: WorkingTable = {
      id,
      restaurant_id: restaurantId,
      name: `B${tables.length + 1}`,
      min_capacity: 2,
      max_capacity: 4,
      shape: 'round',
      combinable: true,
      section: null,
      position_x: 0.15 + (tables.length % 5) * 0.15,
      position_y: 0.2 + Math.floor(tables.length / 5) * 0.2,
      width: 100,
      height: 100,
      rotation: 0,
      is_active: true,
      _isNew: true,
      _dirty: true,
    };
    setTables(t => [...t, newTable]);
    setSelectedId(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setTables(prev => prev.map(t => {
      if (t.id !== active.id) return t;
      const newX = t.position_x + delta.x / CANVAS_WIDTH;
      const newY = t.position_y + delta.y / CANVAS_HEIGHT;
      return {
        ...t,
        position_x: Math.max(0.05, Math.min(0.95, newX)),
        position_y: Math.max(0.05, Math.min(0.95, newY)),
        _dirty: true,
      };
    }));
  };

  const updateSelected = (updates: Partial<RestaurantTable>) => {
    if (!selectedId) return;
    setTables(prev => prev.map(t =>
      t.id === selectedId ? { ...t, ...updates, _dirty: true } : t
    ));
    setSelectedId(null);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    const target = tables.find(t => t.id === selectedId);
    if (!target) return;
    if (!target._isNew) {
      setDeletedIds(d => [...d, selectedId]);
    }
    setTables(prev => prev.filter(t => t.id !== selectedId));
    setSelectedId(null);
  };

  const handleSave = useCallback(async () => {
    if (!restaurantId) return;
    setSaving(true);
    setError(null);
    try {
      // Bulk upsert handles inserts (no id), updates (with id), and
      // soft-deletes (omitted active tables not in array).
      // We just send everything we want to keep — backend handles the rest.
      const payload = tables.map(t => {
        const { _isNew, _dirty, id, created_date, updated_date, ...rest } = t;
        // Strip temp ids for new tables; keep real ids for updates
        return _isNew
          ? rest
          : { id, ...rest };
      });
      const updated = await bulkUpsertTables(restaurantId, payload);
      setTables(updated.map(t => ({ ...t })));
      setDeletedIds([]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }, [restaurantId, tables]);

  const dirtyCount = tables.filter(t => t._dirty).length + deletedIds.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Đang tải sơ đồ...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 rounded-lg hover:bg-slate-100">
              <ChevronLeft size={20} className="text-slate-600" />
            </a>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Sơ đồ bàn</h1>
              <p className="text-xs text-slate-500 font-mono">{restaurantId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addTable}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium"
            >
              <Plus size={16} />
              Thêm bàn
            </button>
            <button
              onClick={handleSave}
              disabled={saving || dirtyCount === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 disabled:bg-slate-300 text-white rounded-lg text-sm font-semibold"
            >
              <Save size={16} />
              {saving ? 'Đang lưu...' : `Lưu${dirtyCount > 0 ? ` (${dirtyCount})` : ''}`}
            </button>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 pt-3">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="max-w-6xl mx-auto p-4">
        <div
          className="relative bg-white border-2 border-slate-200 rounded-xl mx-auto overflow-hidden"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, maxWidth: '100%' }}
        >
          {tables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none">
              Nhấn "Thêm bàn" để bắt đầu xây dựng sơ đồ
            </div>
          )}
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {tables.map(t => (
              <DraggableTable
                key={t.id}
                table={t}
                canvasWidth={CANVAS_WIDTH}
                canvasHeight={CANVAS_HEIGHT}
                selected={selectedId === t.id}
                onClick={() => setSelectedId(t.id)}
              />
            ))}
          </DndContext>
        </div>

        <div className="mt-4 text-xs text-slate-500 text-center">
          Kéo bàn để di chuyển. Nhấn vào bàn để chỉnh sửa. Lưu thay đổi bằng nút Lưu.
        </div>
      </div>

      <TableEditDialog
        table={selected}
        onClose={() => setSelectedId(null)}
        onSave={updateSelected}
        onDelete={deleteSelected}
      />
    </div>
  );
}
