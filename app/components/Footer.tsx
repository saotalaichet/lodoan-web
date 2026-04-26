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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 mb-8">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4" style={{ gap: '10px' }}>
              <img
                src="https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png"
                alt="Ovenly"
                className="h-10 sm:h-11 w-auto"
              />
              <div className="leading-none">
                <div className="font-heading font-black text-primary text-xl sm:text-2xl leading-none">LÒ ĐỒ ĂN</div>
                <div className="text-xs text-gray-400 font-normal">by Ovenly</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5">
              {lang === 'vi'
                ? 'Khám phá và đặt món online từ các địa điểm ăn uống quanh bạn.'
                : 'Connecting diners with amazing restaurants across Vietnam.'}
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: '#EEEEEE', color: '#1877F2' }}
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: '#EEEEEE', color: '#E1306C' }}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor" opacity="0.2" />
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: '#EEEEEE', color: '#000000' }}
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.122 5.122 0 01-2.756-3.106V2h-3.686v13.67a2.4 2.4 0 11-2.4-2.4c.293 0 .575.022.856.065V9.237c-.307-.05-.596-.065-.88-.065a6.3 6.3 0 105.894 6.3v-3.27a8.23 8.23 0 004.822 1.533V5.562z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-base sm:text-sm mb-4 sm:mb-3 uppercase tracking-wide">
              {lang === 'vi' ? 'Điều Hướng' : 'Navigation'}
            </h4>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link href="/about" className="text-base sm:text-sm text-gray-500 hover:text-primary transition-colors inline-block py-1">
                  {lang === 'vi' ? 'Giới Thiệu' : 'About'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base sm:text-sm text-gray-500 hover:text-primary transition-colors inline-block py-1">
                  {lang === 'vi' ? 'Liên Hệ' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-gray-900 text-base sm:text-sm mb-4 sm:mb-3 uppercase tracking-wide">
              {lang === 'vi' ? 'Dành cho đối tác' : 'For Partners'}
            </h4>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                
                  href="https://www.ovenly.io/register"
                  className="text-base sm:text-sm text-gray-500 hover:text-primary transition-colors inline-block py-1"
                >
                  {lang === 'vi' ? 'Mở quán trên LÒ ĐỒ ĂN' : 'Become a partner'}
                </a>
              </li>
              <li>
                
                  href="https://www.ovenly.io/about"
                  className="text-base sm:text-sm text-gray-500 hover:text-primary transition-colors inline-block py-1"
                >
                  {lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
                </a>
              </li>
              <li>
                
                  href="mailto:hello@ovenly.io"
                  className="text-base sm:text-sm text-gray-500 hover:text-primary transition-colors inline-block py-1"
                >
                  hello@ovenly.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-4">
          <p className="text-sm sm:text-xs text-gray-400 text-center">
            © {CURRENT_YEAR} LÒ ĐỒ ĂN™ {lang === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
            
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-xs text-gray-400 hover:text-gray-600 transition-colors py-2 sm:py-0"
            >
              {lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
            </a>
            <span className="hidden sm:inline text-gray-300 text-xs">•</span>
            
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-xs text-gray-400 hover:text-gray-600 transition-colors py-2 sm:py-0"
            >
              {lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
            </a>
            <span className="hidden sm:inline text-gray-300 text-xs">•</span>
            <p className="text-sm sm:text-xs text-gray-400 py-2 sm:py-0">
              {lang === 'vi' ? 'Được cung cấp bởi Ovenly™' : 'Powered by Ovenly™'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}