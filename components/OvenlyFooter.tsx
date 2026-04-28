'use client';

import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

const TRANSLATIONS = {
  vi: {
    allRights: 'Bảo lưu mọi quyền',
    links: [
      ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
      ['Giới thiệu', '/about'],
      ['Bảng giá', '/company/pricing'],
      ['Liên hệ', '/contact'],
      ['Điều Khoản Dịch Vụ', 'https://www.ovenly.io/company/terms'],
      ['Chính Sách Bảo Mật', 'https://www.ovenly.io/company/privacy'],
    ],
  },
  en: {
    allRights: 'All rights reserved',
    links: [
      ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
      ['About', '/about'],
      ['Pricing', '/company/pricing'],
      ['Contact', '/contact'],
      ['Terms of Service', 'https://www.ovenly.io/company/terms'],
      ['Privacy Policy', 'https://www.ovenly.io/company/privacy'],
    ],
  },
};

interface OvenlyFooterProps {
  lang: 'vi' | 'en';
}

export default function OvenlyFooter({ lang }: OvenlyFooterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <footer 
      className="ov-footer" 
      style={{ 
        borderTop: `1px solid ${BORDER}`, 
        padding: '48px 40px', 
        background: BG 
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .ov-footer {
            padding: 32px 20px !important;
          }
          .ov-footer-logo {
            height: 50px !important;
          }
          .ov-footer-links {
            gap: 16px !important;
          }
          .ov-footer-link {
            font-size: 13px !important;
          }
        }
      `}</style>
      
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
          <img
            src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
            alt="Ovenly"
            className="ov-footer-logo"
            style={{ height: 60, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block', cursor: 'pointer' }}
          />
        </Link>
        <div 
          className="ov-footer-links"
          style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {t.links.map(([label, href]) => {
            const isExternal = href.startsWith('http');
            return (
              <Link 
                key={label} 
                href={href} 
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="ov-footer-link"
                style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™ · {t.allRights}</p>
      </div>
    </footer>
  );
}