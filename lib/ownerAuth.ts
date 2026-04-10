const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';
const SESSION_KEY = 'owner_session';

export const ownerAuth = {
  getToken: (): string | null =>
    typeof window !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null,

  getSession: (): any | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('owner_data');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  saveSession: (token: string, data: any) => {
    localStorage.setItem(SESSION_KEY, token);
    localStorage.setItem('owner_data', JSON.stringify(data));
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('owner_data');
  },

  login: async (owner_portal_id: string, password: string) => {
    const res = await fetch(`${RAILWAY}/api/auth/owner/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner_portal_id, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'login_failed');
    ownerAuth.saveSession(data.token, data);
    return data;
  },

  logout: () => {
    ownerAuth.clearSession();
  },

  validate: async () => {
    const token = ownerAuth.getToken();
    if (!token) return null;
    try {
      const res = await fetch(`${RAILWAY}/api/auth/owner/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { ownerAuth.clearSession(); return null; }
      const data = await res.json();
      return data.valid ? data.owner : null;
    } catch { return null; }
  },

  getOrders: async () => {
    const token = ownerAuth.getToken();
    if (!token) return [];
    const res = await fetch(`${RAILWAY}/api/auth/owner/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok ? res.json() : [];
  },

  getRefunds: async () => {
    const token = ownerAuth.getToken();
    if (!token) return [];
    const res = await fetch(`${RAILWAY}/api/auth/owner/refunds`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok ? res.json() : [];
  },

  updateProfile: async (updates: { full_name: string; email: string }) => {
    const token = ownerAuth.getToken();
    if (!token) throw new Error('Not logged in');
    const res = await fetch(`${RAILWAY}/api/auth/owner/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'update_failed');
    return data;
  },

  changePassword: async (current_password: string, new_password: string) => {
    const token = ownerAuth.getToken();
    if (!token) throw new Error('Not logged in');
    const res = await fetch(`${RAILWAY}/api/auth/owner/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ current_password, new_password }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  },

  submitSupport: async (topic: string, subject: string, message: string) => {
    const token = ownerAuth.getToken();
    if (!token) throw new Error('Not logged in');
    const res = await fetch(`${RAILWAY}/api/auth/owner/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ topic, subject, message }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'submit_failed');
    return data;
  },
};