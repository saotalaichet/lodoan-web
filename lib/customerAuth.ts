const SESSION_KEY = 'lo_do_an_session';
const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

async function callRailway(path: string, body: object, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${RAILWAY}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const customerAuth = {
  getToken: (): string | null =>
    localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY),

  saveToken: (token: string, remember: boolean) => {
    if (remember) localStorage.setItem(SESSION_KEY, token);
    else sessionStorage.setItem(SESSION_KEY, token);
  },

  clearToken: () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  },

  getCustomer: async () => {
    const token = customerAuth.getToken();
    if (!token) return null;
    try {
      const data = await callRailway('/api/auth/customer/validate', {}, token);
      if (data?.valid) return data.customer;
      customerAuth.clearToken();
      return null;
    } catch {
      return null;
    }
  },

  login: async (email: string, password: string, remember: boolean) => {
    const data = await callRailway('/api/auth/customer/login', { email, password, remember_me: remember });
    if (data?.success) {
      customerAuth.saveToken(data.session_token, remember);
      return data.customer;
    }
    throw new Error(data?.error || 'login_failed');
  },

  logout: async () => {
    const token = customerAuth.getToken();
    if (token) {
      try { await callRailway('/api/auth/customer/logout', {}, token); } catch {}
    }
    customerAuth.clearToken();
  },

  signup: async (data: object) => {
    const res = await callRailway('/api/auth/customer/signup', data);
    if (res?.success) return res;
    throw new Error(res?.error || 'signup_failed');
  },

  updateProfile: async (updates: object) => {
    const token = customerAuth.getToken();
    if (!token) throw new Error('Not logged in');
    const res = await fetch(`${RAILWAY}/api/auth/customer/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!data?.success) throw new Error(data?.error || 'update_failed');
    return data;
  },

  changePassword: async (current_password: string, new_password: string) => {
    const token = customerAuth.getToken();
    if (!token) throw new Error('Not logged in');
    const res = await fetch(`${RAILWAY}/api/auth/customer/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ current_password, new_password }),
    });
    const data = await res.json();
    if (data?.error) throw new Error(data.error);
    return data;
  },

  getOrders: async () => {
    const token = customerAuth.getToken();
    if (!token) return [];
    try {
      const res = await fetch(`${RAILWAY}/api/auth/customer/orders`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) return res.json();
      return [];
    } catch {
      return [];
    }
  },
  forgotPassword: async (email: string, lang: string) => {
    try {
      await fetch(`${RAILWAY}/api/auth/customer/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });
    } catch {}
  },
};