'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

const T = {
  vi: {
    title: 'Đăng Nhập', email: 'Email', password: 'Mật Khẩu',
    rememberMe: 'Ghi nhớ đăng nhập', login: 'Đăng Nhập', loggingIn: 'Đang đăng nhập...',
    forgot: 'Quên Mật Khẩu?', noAccount: 'Chưa có tài khoản? Đăng ký ngay',
    wrongCreds: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.',
    suspended: 'Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ hello@ovenly.io.',
    forgotSent: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.',
    enterEmail: 'Vui lòng nhập email để đặt lại mật khẩu',
  },
  en: {
    title: 'Login', email: 'Email', password: 'Password',
    rememberMe: 'Remember me', login: 'Login', loggingIn: 'Logging in...',
    forgot: 'Forgot Password?', noAccount: "Don't have an account? Sign up",
    wrongCreds: 'Incorrect email or password. Please try again.',
    suspended: 'Your account has been suspended. Please contact hello@ovenly.io.',
    forgotSent: 'If the account exists, password reset instructions will be sent.',
    enterEmail: 'Please enter your email to reset password',
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { lang, setLang } = useMarketplaceLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    if (window.location.hostname.includes('ovenly.io')) {
      window.location.href = 'https://admin.ovenly.io';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await customerAuth.login(email, password, rememberMe);
      const redirect = localStorage.getItem('checkout_redirect');
      if (redirect) { localStorage.removeItem('checkout_redirect'); router.push(redirect); }
      else router.push('/');
    } catch (err: any) {
      if (err.message === 'account_suspended') setError(t.suspended);
      else setError(t.wrongCreds);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email.trim()) { setError(t.enterEmail); return; }
    await customerAuth.forgotPassword(email, lang);
    setError(t.forgotSent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center p-4">
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
          <div className={`border rounded-xl px-4 py-3 mb-4 text-sm ${error === t.forgotSent ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.email} *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.password} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-primary" />
              <span className="text-sm text-gray-600">{t.rememberMe}</span>
            </label>
            <button type="button" onClick={handleForgot}
              className="text-sm text-primary font-semibold hover:underline">
              {t.forgot}
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            {loading ? t.loggingIn : t.login}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            {t.noAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}