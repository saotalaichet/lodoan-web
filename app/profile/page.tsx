'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PRIMARY = '#8B1A1A';

interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  preferred_language?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language');
    if (stored) setLang(stored);

    const data = localStorage.getItem('customer_data');
    if (data) {
      try { setCustomer(JSON.parse(data)); } catch {}
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer_session_token');
    localStorage.removeItem('customer_data');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-t-red-800 border-red-200 rounded-full animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔐</p>
          <p className="text-lg font-bold text-gray-700 mb-4">
            {lang === 'vi' ? 'Vui lòng đăng nhập' : 'Please log in'}
          </p>
          <Link href="/login" className="inline-block text-white font-bold px-6 py-3 rounded-xl" style={{ backgroundColor: PRIMARY }}>
            {lang === 'vi' ? 'Đăng nhập' : 'Login'}
          </Link>
        </div>
      </div>
    );
  }

  const initials = customer.full_name
    ? customer.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : customer.email[0].toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
        </h1>

        {/* Avatar + info */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{ backgroundColor: PRIMARY }}>
              {initials}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">{customer.full_name || lang === 'vi' ? 'Khách hàng' : 'Customer'}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {customer.email}
              </p>
              {customer.phone_number && (
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {customer.phone_number}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order history link */}
        <Link
          href="/orders"
          className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 mb-4 hover:border-gray-200 transition-colors"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF0ED' }}>
              <span className="text-lg">📦</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'Order History'}
              </p>
              <p className="text-xs text-gray-400">
                {lang === 'vi' ? 'Xem tất cả đơn hàng của bạn' : 'View all your orders'}
              </p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>

        {/* Back to marketplace */}
        <Link
          href="/"
          className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 mb-4 hover:border-gray-200 transition-colors"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FFF0ED' }}>
              <span className="text-lg">🍜</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {lang === 'vi' ? 'Khám Phá Nhà Hàng' : 'Browse Restaurants'}
              </p>
              <p className="text-xs text-gray-400">
                {lang === 'vi' ? 'Quay lại trang chủ' : 'Back to marketplace'}
              </p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 rounded-2xl py-4 text-sm font-semibold text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors mt-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          {lang === 'vi' ? 'Đăng Xuất' : 'Sign Out'}
        </button>
      </div>
    </div>
  );
}