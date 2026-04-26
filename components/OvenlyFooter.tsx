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
      ['Liên hệ', '/contact'],
    ],
  },
  en: {
    allRights: 'All rights reserved',
    links: [
      ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
      ['About', '/about'],
      ['Contact', '/contact'],
    ],
  },
};

interface OvenlyFooterProps {
  lang: 'vi' | 'en';
}

export default function OvenlyFooter({ lang }: OvenlyFooterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="ov-footer" style={{ borderTop: `1px solid ${BORDER}`, padding: '48px 40px', background: BG }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
          <img
            src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
            alt="Ovenly"
            style={{ height: 60, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', display: 'block', cursor: 'pointer' }}
          />
        </Link>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {t.links.map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™ · {t.allRights}</p>
      </div>
    </footer>
  );
}
