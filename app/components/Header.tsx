'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, ChevronDown, Menu, X } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const NAV_LINKS = [
  { href: '/about', vi: 'Giới Thiệu', en: 'About' },
  { href: '/contact', vi: 'Liên Hệ', en: 'Contact' },
];

export default function Header() {
  const [lang, setLang] = useState('vi');
  const [customer, setCustomer] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
    customerAuth.getCustomer().then(c => { if (c) setCustomer(c); });

    const handler = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail && ce.detail !== lang) setLang(ce.detail);
    };
    window.addEventListener('ovenly-lang-changed', handler);
    return () => window.removeEventListener('ovenly-lang-changed', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('marketplace_lang', lang);
    localStorage.setItem('ovenly_language', lang);
    window.dispatchEvent(new CustomEvent('ovenly-lang-changed', { detail: lang }));
  }, [lang]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await customerAuth.logout();
    setCustomer(null);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center flex-shrink-0" style={{ gap: '10px' }}>
          <img 
            src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" 
            alt="Ovenly"
            className="object-contain" 
            style={{ height: '36px', width: 'auto' }} 
          />
          <div className="leading-none">
            <div className="font-heading font-black text-primary text-xl tracking-tight leading-none">LÒ ĐỒ ĂN</div>
            <div className="text-[10px] font-normal text-gray-400 leading-tight tracking-normal">by Ovenly</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-6 flex-1">
          {NAV_LINKS.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {lang === 'vi' ? l.vi : l.en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          {/* Language Switcher */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button 
              onClick={() => setLang('vi')} 
              className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              VI
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              EN
            </button>
          </div>

          {/* Login/Profile Section */}
          {customer ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{customer.full_name?.split(' ')[0] || customer.email}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-bold text-gray-900 truncate">{customer.full_name}</p>
                    <p className="text-xs text-gray-400 truncate">{customer.email}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setShowDropdown(false)} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
                  </Link>
                  <Link 
                    href="/profile?tab=orders" 
                    onClick={() => setShowDropdown(false)} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'Order History'}
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                href="/login" 
                className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {lang === 'vi' ? 'Đăng Nhập' : 'Login'}
              </Link>
              <Link 
                href="/signup" 
                className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                {lang === 'vi' ? 'Đăng Ký' : 'Sign Up'}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {NAV_LINKS.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              {lang === 'vi' ? l.vi : l.en}
            </Link>
          ))}
          {!customer ? (
            <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {lang === 'vi' ? 'Đăng Nhập' : 'Login'}
              </Link>
              <Link 
                href="/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90"
              >
                {lang === 'vi' ? 'Đăng Ký' : 'Sign Up'}
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
              <Link 
                href="/profile" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
              </Link>
              <Link 
                href="/profile?tab=orders" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'Order History'}
              </Link>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}