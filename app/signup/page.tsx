'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const PRIMARY = '#8B1A1A';

const T = {
  vi: {
    title: 'Tạo Tài Khoản', fullName: 'Họ và Tên', email: 'Email',
    password: 'Mật Khẩu', confirmPassword: 'Xác Nhận Mật Khẩu',
    phone: 'Số Điện Thoại', preferredLang: 'Ngôn ngữ ưa thích',
    signup: 'Đăng Ký', signingUp: 'Đang đăng ký...',
    hasAccount: 'Đã có tài khoản? Đăng nhập ngay',
    passwordMin: 'Mật khẩu phải có ít nhất 8 ký tự',
    passwordMismatch: 'Mật khẩu xác nhận không khớp',
    emailExists: 'Email này đã được đăng ký. Vui lòng đăng nhập.',
    phoneExists: 'Số điện thoại này đã được đăng ký.',
    acceptTerms: 'Vui lòng đồng ý với Điều Khoản Sử Dụng',
    langVi: 'Tiếng Việt', langEn: 'English',
    orContinueWith: 'Hoặc đăng ký với', googleLogin: 'Đăng ký với Google',
  },
  en: {
    title: 'Create Account', fullName: 'Full Name', email: 'Email',
    password: 'Password', confirmPassword: 'Confirm Password',
    phone: 'Phone Number', preferredLang: 'Preferred Language',
    signup: 'Sign Up', signingUp: 'Signing up...',
    hasAccount: 'Already have an account? Login',
    passwordMin: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    emailExists: 'This email is already registered. Please login.',
    phoneExists: 'This phone number is already registered.',
    acceptTerms: 'Please accept the Terms of Service',
    langVi: 'Tiếng Việt', langEn: 'English',
    orContinueWith: 'Or sign up with', googleLogin: 'Sign up with Google',
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', confirmPassword: '',
    phone_number: '', preferred_language: 'vi', terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];
  const update = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || localStorage.getItem('marketplace_lang');
    if (stored) setLang(stored);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) { setError(t.passwordMin); return; }
    if (form.password !== form.confirmPassword) { setError(t.passwordMismatch); return; }
    if (!form.terms) { setError(t.acceptTerms); return; }
    setLoading(true);
    try {
      await customerAuth.signup({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        preferred_language: form.preferred_language,
      });
      await customerAuth.login(form.email, form.password, false);
      router.push('/profile');
    } catch (err: any) {
      if (err.message === 'email_exists') setError(t.emailExists);
      else if (err.message === 'phone_exists') setError(t.phoneExists);
      else setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const googleAuthUrl = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}/auth/google?redirect_url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12"
      style={{ background: 'hsl(30,20%,97%)' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="font-heading font-black text-xl" style={{ color: PRIMARY }}>
            LÒ ĐỒ ĂN
          </Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>

        <h1 className="font-heading text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.fullName} *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required value={form.full_name} onChange={e => update('full_name', e.target.value)}
                placeholder={t.fullName}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.email} *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.password} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={form.password} onChange={e => update('password', e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.confirmPassword} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.phone}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={form.phone_number} onChange={e => update('phone_number', e.target.value)}
                placeholder="0912 345 678"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.preferredLang}</label>
            <select value={form.preferred_language} onChange={e => update('preferred_language', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all">
              <option value="vi">{t.langVi}</option>
              <option value="en">{t.langEn}</option>
            </select>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)}
              className="mt-1 w-4 h-4 rounded" style={{ accentColor: PRIMARY }} />
            <span className="text-sm text-gray-600">
              {lang === 'vi' ? (
                <>Tôi đồng ý với{' '}
                  <a href="/terms" target="_blank" className="underline hover:opacity-80" style={{ color: PRIMARY }}>Điều Khoản Dịch Vụ</a>
                  {' '}và{' '}
                  <a href="/privacy" target="_blank" className="underline hover:opacity-80" style={{ color: PRIMARY }}>Chính Sách Bảo Mật</a>
                </>
              ) : (
                <>I agree to the{' '}
                  <a href="/terms" target="_blank" className="underline hover:opacity-80" style={{ color: PRIMARY }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" className="underline hover:opacity-80" style={{ color: PRIMARY }}>Privacy Policy</a>
                </>
              )}
            </span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50 hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}>
            {loading ? t.signingUp : t.signup}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400 font-medium">{t.orContinueWith}</span>
          </div>
        </div>

        <a href={googleAuthUrl}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {t.googleLogin}
        </a>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link href="/login" className="font-semibold hover:underline" style={{ color: PRIMARY }}>
            {t.hasAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}