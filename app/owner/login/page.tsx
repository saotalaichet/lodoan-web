'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { ownerAuth } from '@/lib/ownerAuth';

export default function OwnerLoginPage() {
  const router = useRouter();
  const [lang, setLang] = useState('vi');
  const [portalId, setPortalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('owner_lang') || 'vi';
    setLang(stored);
    if (ownerAuth.getToken()) router.push('/owner/orders');
  }, [router]);

  const t = {
    title: lang === 'vi' ? 'Cổng Thông Tin Chủ Nhà Hàng' : 'Restaurant Owner Portal',
    tagline: lang === 'vi' ? 'Quản lý nhà hàng của bạn' : 'Manage your restaurant',
    portalId: lang === 'vi' ? 'Mã Chủ Nhà Hàng' : 'Owner ID',
    password: lang === 'vi' ? 'Mật Khẩu' : 'Password',
    login: lang === 'vi' ? 'Đăng Nhập' : 'Login',
    loggingIn: lang === 'vi' ? 'Đang đăng nhập...' : 'Logging in...',
    wrongCreds: lang === 'vi' ? 'ID hoặc mật khẩu không đúng.' : 'Incorrect ID or password.',
    forgot: lang === 'vi' ? 'Quên mật khẩu? Liên hệ hello@ovenly.io' : 'Forgot password? Contact hello@ovenly.io',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await ownerAuth.login(portalId.trim(), password.trim());
      localStorage.setItem('owner_lang', lang);
      router.push('/owner/orders');
    } catch {
      setError(t.wrongCreds);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F0] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" alt="Ovenly"
            className="mx-auto mb-4" style={{ height: '80px', width: 'auto' }} />
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-sm">{t.tagline}</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {['vi', 'en'].map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${lang === l ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.portalId}</label>
            <input type="text" value={portalId} onChange={e => setPortalId(e.target.value)}
              placeholder="OWN-XXXXX" required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t.password}</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:opacity-90 text-white font-bold py-2.5 rounded-lg transition-opacity disabled:opacity-50">
            {loading ? t.loggingIn : t.login}
          </button>
          <p className="text-xs text-gray-500 text-center">{t.forgot}</p>
        </form>
        <p className="text-xs text-gray-400 text-center mt-6">Powered by Ovenly</p>
      </div>
    </div>
  );
}