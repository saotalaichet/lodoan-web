'use client';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

interface OvenlyNavProps {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
}

export default function OvenlyNav({ lang, setLang }: OvenlyNavProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 72, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
        <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 56, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block' }} />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/about" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{lang === 'vi' ? 'Giới thiệu' : 'About'}</Link>
        <Link href="https://admin.ovenly.io" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{lang === 'vi' ? 'Đăng nhập' : 'Log in'}</Link>
        <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
          {(['vi', 'en'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
          {lang === 'vi' ? 'Đặt lịch Demo' : 'Book A Demo'}
        </Link>
      </div>
    </nav>
  );
}
