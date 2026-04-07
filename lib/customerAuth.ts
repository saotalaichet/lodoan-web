const BASE44_APP_ID = process.env.NEXT_PUBLIC_BASE44_APP_ID || '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = process.env.NEXT_PUBLIC_BASE44_API_KEY || '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE44_URL = `https://api.base44.app/api/apps/${BASE44_APP_ID}`;
const HEADERS = { 'Content-Type': 'application/json', 'api-key': BASE44_API_KEY };
const SESSION_KEY = 'lo_do_an_session';

async function invoke(functionName: string, body: object) {
  const res = await fetch(`${BASE44_URL}/functions/${functionName}`, {
    method: 'POST', headers: HEADERS, body: JSON.stringify(body),
  });
  const json = await res.json();
  return json?.data ?? json;
}

export const customerAuth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  },

  saveToken: (token: string, remember: boolean) => {
    if (remember) localStorage.setItem(SESSION_KEY, token);
    else sessionStorage.setItem(SESSION_KEY, token);
  },

  clearToken: () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  },

  getCustomer: async (): Promise<any | null> => {
    if (typeof window === 'undefined') return null;
    const token = customerAuth.getToken();
    if (!token) return null;
    try {
      const data = await invoke('customerAuth', { session_token: token, action: 'validate' });
      if (data?.valid) return data.customer;
      customerAuth.clearToken();
      return null;
    } catch {
      return null;
    }
  },

  // Matches Base44: calls customerLogin function (not customerAuth with action:'login')
  login: async (email: string, password: string, remember: boolean): Promise<any> => {
    const data = await invoke('customerLogin', { email, password, remember_me: remember });
    if (data?.success) {
      customerAuth.saveToken(data.session_token, remember);
      return data.customer;
    }
    throw new Error(data?.error || 'login_failed');
  },

  logout: async (): Promise<void> => {
    const token = customerAuth.getToken();
    if (token) {
      try { await invoke('customerAuth', { session_token: token, action: 'logout' }); } catch {}
    }
    customerAuth.clearToken();
  },

  // Matches Base44: calls customerSignup function
  signup: async (data: {
    full_name: string; email: string; password: string;
    phone_number?: string; preferred_language?: string;
  }): Promise<any> => {
    const result = await invoke('customerSignup', data);
    if (result?.success) return result;
    throw new Error(result?.error || 'signup_failed');
  },

  updateProfile: async (updates: { full_name?: string; phone_number?: string; preferred_language?: string }): Promise<void> => {
    const token = customerAuth.getToken();
    if (!token) throw new Error('not_logged_in');
    const data = await invoke('customerAuth', { session_token: token, action: 'update_profile', updates });
    if (!data?.success) throw new Error('update_failed');
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    const token = customerAuth.getToken();
    if (!token) throw new Error('not_logged_in');
    const data = await invoke('customerAuth', {
      session_token: token, action: 'change_password',
      updates: { current_password: currentPassword, new_password: newPassword },
    });
    if (data?.error === 'wrong_current_password') throw new Error('wrong_current_password');
    if (!data?.success) throw new Error('change_failed');
  },

  forgotPassword: async (email: string, lang: string): Promise<void> => {
    try { await invoke('customerForgotPassword', { email, lang }); } catch {}
  },
};