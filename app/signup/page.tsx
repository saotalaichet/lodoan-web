'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

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
    acceptTerms: 'Vui lòng đồng ý với Điều Khoản Sử Dụng',
    langVi: 'Tiếng Việt', langEn: 'English',
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
    acceptTerms: 'Please accept the Terms of Service',
    langVi: 'Tiếng Việt', langEn: 'English',
  },
};

export default function SignupPage() {
  const router = useRouter();
  const { lang, setLang } = useMarketplaceLang();
  const [form, setForm] = useState({
    full_name: '', email: '', password: '', confirmPassword: '',
    phone_number: '', preferred_language: 'vi', terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];
  const update = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

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
      const redirect = localStorage.getItem('checkout_redirect');
      if (redirect) { localStorage.removeItem('checkout_redirect'); router.push(redirect); }
      else router.push('/profile');
    } catch (err: any) {
      if (err.message === 'email_exists') setError(t.emailExists);
      else setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="font-heading font-black text-primary text-xl">LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-1 text-xs font-bold">
            <button onClick={() => setLang('vi')} className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500'}`}>VI</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500'}`}>EN</button>
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
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.email} *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.password} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={form.password} onChange={e => update('password', e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.confirmPassword} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.phone}</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={form.phone_number} onChange={e => update('phone_number', e.target.value)}
                placeholder="0912 345 678"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.preferredLang}</label>
            <select value={form.preferred_language} onChange={e => update('preferred_language', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="vi">{t.langVi}</option>
              <option value="en">{t.langEn}</option>
            </select>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary" />
            <span className="text-sm text-gray-600">
              {lang === 'vi' ? (
                <>Tôi đồng ý với{' '}
                  <a href="/terms" target="_blank" className="text-primary underline hover:opacity-80">Điều Khoản Dịch Vụ</a>
                  {' '}và{' '}
                  <a href="/privacy" target="_blank" className="text-primary underline hover:opacity-80">Chính Sách Bảo Mật</a>
                </>
              ) : (
                <>I agree to the{' '}
                  <a href="/terms" target="_blank" className="text-primary underline hover:opacity-80">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" className="text-primary underline hover:opacity-80">Privacy Policy</a>
                </>
              )}
            </span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            {loading ? t.signingUp : t.signup}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/login" className="text-primary font-semibold hover:underline">
            {t.hasAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}