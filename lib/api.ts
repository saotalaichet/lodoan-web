// ── Backend ───────────────────────────────────────────────────────────────────

export const PAYMENT_BACKEND_URL = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://ovenly-backend-production-ce50.up.railway.app';

// ── Payments ──────────────────────────────────────────────────────────────────

export async function createPayment(
  method: 'momo' | 'zalopay' | 'vnpay',
  orderId: string,
  amount: number,
  redirectUrl: string
): Promise<{ payUrl?: string; error?: string }> {
  const endpoints: Record<string, string> = {
    momo: '/api/payments/momo/create',
    zalopay: '/api/payments/zalopay/create',
    vnpay: '/api/payments/vnpay/create',
  };
  try {
    const res = await fetch(`${PAYMENT_BACKEND_URL}${endpoints[method]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        amount,
        orderInfo: `Ovenly Order ${orderId}`,
        redirectUrl,
      }),
    });
    return res.json();
  } catch {
    return { error: 'Payment connection failed' };
  }
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function submitContactForm(form: {
  source: 'ovenly_b2b' | 'lodoan_b2c';
  full_name: string;
  email: string;
  message: string;
  phone_number?: string;
  restaurant_name?: string;
  city?: string;
  order_number?: string;
  issue_type?: string;
  language?: string;
}): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${PAYMENT_BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      cache: 'no-store',
    });
    if (!res.ok) return { success: false };
    const data = await res.json();
    return { success: !!data?.success };
  } catch {
    return { success: false };
  }
}
