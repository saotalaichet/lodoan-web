import type { TableShape as Shape } from '@/lib/api/hostTables';

interface TableShapeProps {
  shape: Shape;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function TableShape({
  shape, width, height,
  fill = '#FFFFFF', stroke = '#475569', strokeWidth = 2,
}: TableShapeProps) {
  if (shape === 'round') {
    const r = Math.min(width, height) / 2 - strokeWidth;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <circle cx={width / 2} cy={height / 2} r={r}
                fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
  if (shape === 'square' || shape === 'rectangle') {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect x={strokeWidth} y={strokeWidth}
              width={width - strokeWidth * 2} height={height - strokeWidth * 2}
              rx={6} ry={6}
              fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={strokeWidth} y={strokeWidth}
            width={width - strokeWidth * 2} height={height - strokeWidth * 2}
            rx={height / 2.5} ry={height / 2.5}
            fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}
