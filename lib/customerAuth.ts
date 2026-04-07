const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const API_KEY = process.env.NEXT_PUBLIC_BASE44_API_KEY!;
const HEADERS = { 'Content-Type': 'application/json', 'api-key': API_KEY };
const SESSION_KEY = 'lo_do_an_session';

async function invoke(body: object) {
  const res = await fetch(`${BASE44_URL}/functions/customerAuth`, {
    method: 'POST', headers: HEADERS, body: JSON.stringify(body),
  });
  const json = await res.json();
  return json?.data ?? json;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
}

function saveToken(token: string, remember: boolean) {
  if (remember) localStorage.setItem(SESSION_KEY, token);
  else sessionStorage.setItem(SESSION_KEY, token);
}

function clearToken() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('customer_data');
  sessionStorage.removeItem('customer_data');
}

function getStoredCustomer(): any | null {
  if (typeof window === 'undefined') return null;
  const d = localStorage.getItem('customer_data') || sessionStorage.getItem('customer_data');
  if (!d) return null;
  try { return JSON.parse(d); } catch { return null; }
}

function saveCustomer(customer: any) {
  const val = JSON.stringify(customer);
  if (localStorage.getItem(SESSION_KEY)) localStorage.setItem('customer_data', val);
  else sessionStorage.setItem('customer_data', val);
}

async function getCustomer(): Promise<any | null> {
  const stored = getStoredCustomer();
  if (stored) return stored;
  const token = getToken();
  if (!token) return null;
  try {
    const data = await invoke({ action: 'me', session_token: token });
    if (data?.id) { saveCustomer(data); return data; }
    return null;
  } catch { return null; }
}

async function login(email: string, password: string, remember = false): Promise<any> {
  const data = await invoke({ action: 'login', email, password });
  if (data?.error === 'account_suspended') throw new Error('account_suspended');
  if (!data?.success || !data?.session_token) throw new Error('wrong_credentials');
  saveToken(data.session_token, remember);
  saveCustomer(data.customer);
  return data.customer;
}

async function signup(params: {
  full_name: string; email: string; password: string;
  phone_number?: string; preferred_language?: string;
}): Promise<void> {
  const data = await invoke({ action: 'signup', ...params });
  if (data?.error === 'email_exists') throw new Error('email_exists');
  if (data?.error === 'phone_exists') throw new Error('phone_exists');
  if (!data?.success) throw new Error(data?.error || 'signup_failed');
}

async function logout(): Promise<void> {
  const token = getToken();
  if (token) { try { await invoke({ action: 'logout', session_token: token }); } catch {} }
  clearToken();
}

async function updateProfile(updates: {
  full_name?: string; phone_number?: string; preferred_language?: string;
}): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('not_logged_in');
  const data = await invoke({ action: 'update_profile', session_token: token, updates });
  if (!data?.success) throw new Error('update_failed');
  const current = getStoredCustomer();
  if (current) saveCustomer({ ...current, ...updates });
}

async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('not_logged_in');
  const data = await invoke({
    action: 'change_password', session_token: token,
    updates: { current_password: currentPassword, new_password: newPassword },
  });
  if (data?.error === 'wrong_current_password') throw new Error('wrong_current_password');
  if (!data?.success) throw new Error('change_failed');
}

async function forgotPassword(email: string, lang: string): Promise<void> {
  try {
    await fetch(`${BASE44_URL}/functions/customerForgotPassword`, {
      method: 'POST', headers: HEADERS, body: JSON.stringify({ email, lang }),
    });
  } catch {}
}

async function handleOAuthCallback(): Promise<any | null> {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('access_token');
  if (!accessToken) return null;
  clearToken();
  try {
    const base44Res = await fetch(`${BASE44_URL}/auth/me`, { headers: { ...HEADERS, Authorization: `Bearer ${accessToken}` } });
    const base44User = await base44Res.json();
    if (!base44User?.email) return null;
    const data = await invoke({
      action: 'oauth_login',
      email: base44User.email,
      full_name: base44User.full_name || base44User.email.split('@')[0],
      provider: 'google',
    });
    if (data?.success && data?.session_token) {
      saveToken(data.session_token, true);
      saveCustomer(data.customer);
      window.history.replaceState({}, '', window.location.pathname);
      return data.customer;
    }
  } catch {}
  return null;
}

export const customerAuth = {
  getToken, saveToken, clearToken, getCustomer, getStoredCustomer,
  login, signup, logout, updateProfile, changePassword,
  forgotPassword, handleOAuthCallback,
};