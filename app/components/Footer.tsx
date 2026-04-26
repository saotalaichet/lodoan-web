'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-3" style={{ gap: '10px' }}>
              <img 
                src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png" 
                alt="Ovenly" 
                style={{ height: '44px', width: 'auto' }} 
              />
              <div className="leading-none">
                <div className="font-heading font-black text-primary text-2xl leading-none">LÒ ĐỒ ĂN</div>
                <div className="text-xs text-gray-400 font-normal">by Ovenly</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {lang === 'vi'
                ? 'Khám phá và đặt món online từ các địa điểm ăn uống quanh bạn.'
                : 'Connecting diners with amazing restaurants across Vietnam.'}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: '#EEEEEE', color: '#1877F2' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: '#EEEEEE', color: '#E1306C' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.2"/>
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: '#EEEEEE', color: '#000000' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.122 5.122 0 01-2.756-3.106V2h-3.686v13.67a2.4 2.4 0 11-2.4-2.4c.293 0 .575.022.856.065V9.237c-.307-.05-.596-.065-.88-.065a6.3 6.3 0 105.894 6.3v-3.27a8.23 8.23 0 004.822 1.533V5.562z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">
              {lang === 'vi' ? 'Điều Hướng' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  {lang === 'vi' ? 'Giới Thiệu' : 'About'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  {lang === 'vi' ? 'Liên Hệ' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-3 uppercase tracking-wide">
              {lang === 'vi' ? 'Dành cho đối tác' : 'For Partners'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.ovenly.io/register" 
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {lang === 'vi' ? 'Mở quán trên LÒ ĐỒ ĂN' : 'Become a partner'}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ovenly.io/about" 
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@ovenly.io" 
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  hello@ovenly.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {CURRENT_YEAR} LÒ ĐỒ ĂN™ {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a 
              href="/terms" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
            >
              {lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
            </a>
            <span className="text-gray-300 text-xs">•</span>
            <a 
              href="/privacy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
            >
              {lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
            </a>
            <span className="text-gray-300 text-xs">•</span>
            <p className="text-xs text-gray-400">
              {lang === 'vi' ? 'Được cung cấp bởi Ovenly™' : 'Powered by Ovenly™'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}