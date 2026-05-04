'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { RestaurantTable } from '@/lib/api/hostTables';
import { TableShape } from './TableShape';

interface DraggableTableProps {
  table: RestaurantTable;
  canvasWidth: number;
  canvasHeight: number;
  selected: boolean;
  onClick: () => void;
}

export function DraggableTable({
  table, canvasWidth, canvasHeight, selected, onClick,
}: DraggableTableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: table.id,
  });

  const x = table.position_x * canvasWidth;
  const y = table.position_y * canvasHeight;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: x - table.width / 2,
    top: y - table.height / 2,
    transform: CSS.Translate.toString(transform),
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
    zIndex: isDragging || selected ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="select-none"
    >
      <div className="relative">
        <TableShape
          shape={table.shape}
          width={table.width}
          height={table.height}
          fill={selected ? '#FEF2F2' : '#FFFFFF'}
          stroke={selected ? '#8B1A1A' : '#475569'}
          strokeWidth={selected ? 2.5 : 2}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-slate-800">{table.name}</span>
          <span className="text-xs text-slate-500">
            {table.min_capacity === table.max_capacity
              ? `${table.max_capacity}p`
              : `${table.min_capacity}-${table.max_capacity}p`}
          </span>
        </div>
      </div>
    </div>
  );
}
