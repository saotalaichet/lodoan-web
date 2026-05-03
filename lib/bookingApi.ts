const RAILWAY = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://ovenly-backend-production-ce50.up.railway.app';

export interface BookingConfig {
  enable_reservations: boolean;
  enable_waitlist: boolean;
  max_party_size: number;
  advance_booking_window_days: number;
  min_advance_booking_minutes: number;
  slot_duration_minutes: number;
  default_seating_duration_minutes: number;
  waitlist_estimated_minutes_per_party: number;
}

export interface WaitlistEntry {
  id: string;
  restaurant_id: string;
  customer_id: string;
  party_size: number;
  status: 'waiting' | 'ready' | 'seated' | 'abandoned' | 'removed';
  joined_at: string;
  estimated_wait_minutes: number;
  lineup_code: string;
  position?: number;
}

export interface Reservation {
  id: string;
  restaurant_id: string;
  customer_id: string;
  party_size: number;
  requested_at: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'no_show' | 'cancelled';
  notes?: string;
}

export interface AvailabilitySlot {
  time: string;
  iso: string;
  available: boolean;
  remaining: number;
}

export interface AvailabilityResponse {
  date: string;
  party_size: number;
  slots: AvailabilitySlot[];
}

interface JoinWaitlistInput {
  restaurant_id: string;
  party_size: number;
  notes?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  language?: 'vi' | 'en';
  idempotency_key: string;
}

interface CreateReservationInput {
  restaurant_id: string;
  party_size: number;
  requested_at: string;
  notes?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  language?: 'vi' | 'en';
  idempotency_key: string;
}

async function request<T>(path: string, init: RequestInit & { token?: string | null } = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init.headers as Record<string, string>) || {}),
  };
  if (init.token) headers['Authorization'] = `Bearer ${init.token}`;

  const res = await fetch(`${RAILWAY}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `request_failed_${res.status}`);
  }
  return res.json();
}

export const bookingApi = {
  joinWaitlist: (input: JoinWaitlistInput, token?: string | null) =>
    request<WaitlistEntry>('/api/bookings/waitlist', {
      method: 'POST',
      body: JSON.stringify(input),
      token,
    }),

  getWaitlistStatus: (id: string) =>
    request<WaitlistEntry>(`/api/bookings/waitlist/${id}`, { method: 'GET' }),

  leaveWaitlist: (id: string, token?: string | null) =>
    request<WaitlistEntry>(`/api/bookings/waitlist/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'leave' }),
      token,
    }),

  getAvailability: (restaurantId: string, date: string, partySize: number) =>
    request<AvailabilityResponse>(
      `/api/bookings/availability/${restaurantId}?date=${date}&party_size=${partySize}`,
      { method: 'GET' }
    ),

  createReservation: (input: CreateReservationInput, token?: string | null) =>
    request<Reservation>('/api/bookings/reservations', {
      method: 'POST',
      body: JSON.stringify(input),
      token,
    }),

  getReservation: (id: string) =>
    request<Reservation>(`/api/bookings/reservations/${id}`, { method: 'GET' }),

  cancelReservation: (id: string, reason: string | undefined, token?: string | null) =>
    request<Reservation>(`/api/bookings/reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'cancel', reason }),
      token,
    }),
};
