'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PRIMARY = '#8B1A1A';
const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const BASE44_HEADERS = {
  'api-key': process.env.NEXT_PUBLIC_BASE44_API_KEY!,
  'Content-Type': 'application/json',
};

const T = {
  vi: {
    title: 'Tạo Tài Khoản',
    fullName: 'Họ và Tên',
    email: 'Email',
    password: 'Mật Khẩu',
    confirmPassword: 'Xác Nhận Mật Khẩu',
    phone: 'Số Điện Thoại',
    signup: 'Đăng Ký',
    signingUp: 'Đang đăng ký...',
    hasAccount: 'Đã có tài khoản? Đăng nhập ngay',
    passwordMin: 'Mật khẩu phải có ít nhất 8 ký tự',
    passwordMismatch: 'Mật khẩu xác nhận không khớp',
    emailExists: 'Email này đã được đăng ký.',
    acceptTerms: 'Vui lòng đồng ý với Điều Khoản Sử Dụng',
    orContinueWith: 'Hoặc đăng ký với',
    googleSignup: 'Đăng ký với Google',
    preferredLang: 'Ngôn ngữ ưa thích',
    langVi: 'Tiếng Việt',
    langEn: 'English',
  },
  en: {
    title: 'Create Account',
    fullName: 'Full Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone Number',
    signup: 'Sign Up',
    signingUp: 'Signing up...',
    hasAccount: 'Already have an account? Login',
    passwordMin: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    emailExists: 'This email is already registered.',
    acceptTerms: 'Please accept the Terms of Service',
    orContinueWith: 'Or sign up with',
    googleSignup: 'Sign up with Google',
    preferredLang: 'Preferred Language',
    langVi: 'Tiếng Việt',
    langEn: 'English',
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    preferred_language: 'vi',
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = T[lang as keyof typeof T];
  const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) { setError(t.passwordMin); return; }
    if (form.password !== form.confirmPassword) { setError(t.passwordMismatch); return; }
    if (!form.terms) { setError(t.acceptTerms); return; }

    setLoading(true);
    try {
      const res = await fetch(`${BASE44_URL}/functions/customerSignup`, {
        method: 'POST',
        headers: BASE44_HEADERS,
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          phone_number: form.phone_number,
          preferred_language: form.preferred_language,
        }),
      });
      const data = await res.json();
      if (data?.session_token) {
        localStorage.setItem('customer_session_token', data.session_token);
        if (data.customer) localStorage.setItem('customer_data', JSON.stringify(data.customer));
        router.push('/');
      } else if (data?.error?.includes('email')) {
        setError(t.emailExists);
      } else {
        setError(data?.error || 'Something went wrong.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12" style={{ background: 'linear-gradient(135deg, #FFF0ED 0%, #FAF8F0 100%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="font-black text-xl" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm text-red-600">⚠️ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.fullName} *</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <input required value={form.full_name} onChange={e => update('full_name', e.target.value)}
                placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'John Doe'} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.email} *</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="email@example.com" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.password} *</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input required type="password" value={form.password} onChange={e => update('password', e.target.value)}
                placeholder="••••••••" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.confirmPassword} *</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input required type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                placeholder="••••••••" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.phone}</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <input type="tel" value={form.phone_number} onChange={e => update('phone_number', e.target.value)}
                placeholder="0912 345 678" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.preferredLang}</label>
            <select
              value={form.preferred_language}
              onChange={e => update('preferred_language', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option value="vi">{t.langVi}</option>
              <option value="en">{t.langEn}</option>
            </select>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={e => update('terms', e.target.checked)}
              className="mt-1 w-4 h-4"
              style={{ accentColor: PRIMARY }}
            />
            <span className="text-sm text-gray-600">
              {lang === 'vi' ? (
                <>Tôi đồng ý với <Link href="/terms" className="underline" style={{ color: PRIMARY }}>Điều Khoản Dịch Vụ</Link> và <Link href="/privacy" className="underline" style={{ color: PRIMARY }}>Chính Sách Bảo Mật</Link></>
              ) : (
                <>I agree to the <Link href="/terms" className="underline" style={{ color: PRIMARY }}>Terms of Service</Link> and <Link href="/privacy" className="underline" style={{ color: PRIMARY }}>Privacy Policy</Link></>
              )}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: PRIMARY }}
          >
            {loading ? t.signingUp : t.signup}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400 font-medium">{t.orContinueWith}</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {t.googleSignup}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/login" className="font-semibold hover:underline" style={{ color: PRIMARY }}>
            {t.hasAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}