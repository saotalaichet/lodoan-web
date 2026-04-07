'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const PRIMARY = '#8B1A1A';

const T = {
  vi: {
    title: 'Đăng Nhập', email: 'Email', password: 'Mật Khẩu',
    rememberMe: 'Ghi nhớ đăng nhập', login: 'Đăng Nhập', loggingIn: 'Đang đăng nhập...',
    forgot: 'Quên Mật Khẩu?', noAccount: 'Chưa có tài khoản? Đăng ký ngay',
    wrongCreds: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.',
    suspended: 'Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ hello@ovenly.io.',
    forgotSent: 'Email đặt lại mật khẩu đã được gửi nếu tài khoản tồn tại.',
    enterEmail: 'Vui lòng nhập email để đặt lại mật khẩu',
    orContinueWith: 'Hoặc đăng nhập với', googleLogin: 'Đăng nhập với Google',
  },
  en: {
    title: 'Login', email: 'Email', password: 'Password',
    rememberMe: 'Remember me', login: 'Login', loggingIn: 'Logging in...',
    forgot: 'Forgot Password?', noAccount: "Don't have an account? Sign up",
    wrongCreds: 'Incorrect email or password. Please try again.',
    suspended: 'Your account has been suspended. Please contact hello@ovenly.io.',
    forgotSent: 'Password reset email sent if account exists.',
    enterEmail: 'Please enter your email to reset password',
    orContinueWith: 'Or continue with', googleLogin: 'Sign in with Google',
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState('vi');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || localStorage.getItem('marketplace_lang');
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('ovenly_language', lang);
  }, [lang]);

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

  const googleAuthUrl = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}/auth/google?redirect_url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
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
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.email} *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.password} *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded" style={{ accentColor: PRIMARY }} />
              <span className="text-sm text-gray-600">{t.rememberMe}</span>
            </label>
            <button type="button" onClick={handleForgot}
              className="text-sm font-semibold hover:underline" style={{ color: PRIMARY }}>
              {t.forgot}
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50 hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}>
            {loading ? t.loggingIn : t.login}
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

        {/* Google login */}
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
          <Link href="/signup" className="font-semibold hover:underline" style={{ color: PRIMARY }}>
            {t.noAccount}
          </Link>
        </p>
      </div>
    </div>
  );
}