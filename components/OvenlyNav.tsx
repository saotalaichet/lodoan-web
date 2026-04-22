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

  const navLinks = [
    { href: '/about', label: isVI ? 'Giới thiệu' : 'About' },
    { href: 'https://lodoan.vn', label: 'LÒ ĐỒ ĂN' },
    { href: '/contact', label: isVI ? 'Liên hệ' : 'Contact' },
    { href: 'https://admin.ovenly.io', label: isVI ? 'Đăng nhập' : 'Log in' },
  ];

  return (
    <>
      <style>{`
        .ovn-desktop { display: flex; }
        .ovn-mobile-btn { display: none; }
        @media (max-width: 768px) {
          .ovn-desktop { display: none !important; }
          .ovn-mobile-btn { display: flex !important; }
          .ovn-nav { padding: 0 16px !important; height: 68px !important; }
        }
        @keyframes ovn-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <nav className="ovn-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 72, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
            alt="Ovenly"
            style={{ height: 64, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block' }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="ovn-desktop" style={{ alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/about" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Giới thiệu' : 'About'}</Link>
          <Link href="https://admin.ovenly.io" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Đăng nhập' : 'Log in'}</Link>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="ovn-mobile-btn" style={{ alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 7, padding: 2 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '3px 8px', borderRadius: 5, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, animation: 'ovn-fade 0.15s ease' }}
        />
      )}

      {/* Slide-out drawer — matches company page style */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(85vw, 320px)',
        background: '#fff',
        zIndex: 300,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: menuOpen ? '-4px 0 20px rgba(0,0,0,0.1)' : 'none',
      }}>
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
          <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 38, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any }} />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {navLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '14px 24px', fontSize: 16, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none', borderBottom: '1px solid #FAFAFA' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div style={{ padding: '20px', borderTop: `1px solid ${BORDER}` }}>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'block', textAlign: 'center', background: PRIMARY, color: '#fff', padding: '13px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'} →
          </Link>
        </div>
      </aside>
    </>
  );
}