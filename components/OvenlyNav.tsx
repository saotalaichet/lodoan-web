'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

interface OvenlyNavProps {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
}

export default function OvenlyNav({ lang, setLang }: OvenlyNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isVI = lang === 'vi';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .ovn-desktop { display: flex; }
        .ovn-mobile { display: none; }
        .ovn-logo { height: 56px; }
        @media (min-width: 769px) {
          .ovn-logo { height: 68px; }
        }
        @media (max-width: 768px) {
          .ovn-desktop { display: none !important; }
          .ovn-mobile { display: flex !important; }
        }
        @keyframes ovn-drop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 68, borderBottom: menuOpen ? 'none' : `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 300 }}>
        {/* Logo */}
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" className="ovn-logo" style={{ width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <div className="ovn-desktop" style={{ alignItems: 'center', gap: 32, flex: 1, marginLeft: 40 }}>
          {/* Left side nav links */}
          <Link href="https://lodoan.vn" style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500 }}>LÒ ĐỒ ĂN</Link>
          <Link href="/about" style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500 }}>{isVI ? 'Giới thiệu' : 'About'}</Link>
          <Link href="https://www.ovenly.io/company/pricing" style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500 }}>{isVI ? 'Bảng giá' : 'Pricing'}</Link>
          <Link href="https://www.ovenly.io/contact" style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500 }}>{isVI ? 'Liên hệ' : 'Contact'}</Link>
        </div>

        {/* Right side controls */}
        <div className="ovn-desktop" style={{ alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="https://admin.ovenly.io" style={{ fontSize: 14, color: '#555', textDecoration: 'none', fontWeight: 500 }}>{isVI ? 'Đăng nhập' : 'Log in'}</Link>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>

        {/* Mobile: Book A Demo + hamburger */}
        <div className="ovn-mobile" style={{ alignItems: 'center', gap: 8 }}>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ width: 40, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#1a1a1a', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#1a1a1a', borderRadius: 2, transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#1a1a1a', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Dropdown — full width, drops from nav */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 68,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          zIndex: 299,
          overflowY: 'auto',
          animation: 'ovn-drop 0.2s ease',
          borderTop: `1px solid ${BORDER}`,
        }}>
          {/* Nav links */}
          {[
            { href: 'https://lodoan.vn', label: 'LÒ ĐỒ ĂN' },
            { href: '/about', label: isVI ? 'Giới thiệu' : 'About' },
            { href: 'https://www.ovenly.io/company/pricing', label: isVI ? 'Bảng giá' : 'Pricing' },
            { href: 'https://www.ovenly.io/contact', label: isVI ? 'Liên hệ' : 'Contact' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '18px 24px', fontSize: 18, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none', borderBottom: `1px solid ${BORDER}` }}
            >
              {item.label}
            </Link>
          ))}

          {/* Login button — mid-drawer, red */}
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BORDER}` }}>
            <Link
              href="https://admin.ovenly.io"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '11px 24px', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
            >
              {isVI ? 'Đăng nhập' : 'Log in'}
            </Link>
          </div>

          {/* VI/EN toggle */}
          <div style={{ padding: '20px 24px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              {isVI ? 'Ngôn ngữ' : 'Language'}
            </p>
            <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3, width: 'fit-content' }}>
              {(['vi', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => { setLang(l); }}
                  style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 700 : 400, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}