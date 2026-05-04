const RAILWAY = process.env.NEXT_PUBLIC_RAILWAY_URL ||
  'https://ovenly-backend-production-ce50.up.railway.app';

export type TableShape = 'round' | 'rectangle' | 'square' | 'booth';

export interface RestaurantTable {
  id: string;
  restaurant_id: string;
  name: string;
  min_capacity: number;
  max_capacity: number;
  shape: TableShape;
  position_x: number;  // 0.0 - 1.0 (percent of canvas)
  position_y: number;
  width: number;       // pixels
  height: number;
  rotation: number;    // degrees, 0-360
  combinable: boolean;
  section: string | null;
  is_active: boolean;
  created_date?: string;
  updated_date?: string;
}

// For bulk upsert: omit `id` to create; include `id` to update.
export type TableUpsert = Partial<RestaurantTable>;

export async function fetchTables(restaurantId: string): Promise<RestaurantTable[]> {
  const res = await fetch(`${RAILWAY}/api/host/tables/${restaurantId}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`fetchTables failed: ${res.status}`);
  // Backend returns BARE ARRAY, not wrapped
  return res.json();
}

export async function bulkUpsertTables(
  restaurantId: string,
  tables: TableUpsert[]
): Promise<RestaurantTable[]> {
  // Backend expects: { restaurant_id, tables: [...] }
  // Tables in array can have id (update) or omit it (create)
  // Tables NOT in array but currently active will be soft-deleted by backend
  const res = await fetch(`${RAILWAY}/api/host/tables/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ restaurant_id: restaurantId, tables }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`bulkUpsertTables failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  // Backend bulk handler likely returns { tables: [...] } OR bare array
  // Try both shapes safely:
  if (Array.isArray(data)) return data;
  return data.tables || [];
}

export async function deleteTable(tableId: string): Promise<void> {
  // Backend route: DELETE /api/host/tables/:id (no restaurantId in URL)
  const res = await fetch(`${RAILWAY}/api/host/tables/${tableId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`deleteTable failed: ${res.status}`);
}
