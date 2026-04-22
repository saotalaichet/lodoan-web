'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

interface OvenlyNavProps {
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
}

export default function OvenlyNav({ lang, setLang }: OvenlyNavProps) {
  const [open, setOpen] = useState(false);
  const isVI = lang === 'vi';

  return (
    <>
      <style>{`
        .ov-nav-links { display: flex; align-items: center; gap: 20px; }
        .ov-hamburger { display: none; }
        .ov-drawer { display: none; }
        @media (max-width: 768px) {
          .ov-nav-links { display: none; }
          .ov-hamburger { display: flex; }
          .ov-drawer { display: flex; }
        }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 64, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
          <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 52, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <div className="ov-nav-links">
          <Link href="/about" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Giới thiệu' : 'About'}</Link>
          <Link href="https://admin.ovenly.io" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Đăng nhập' : 'Log in'}</Link>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="ov-hamburger"
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: open ? 'transparent' : '#333', transition: 'all 0.2s' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#333', transform: open ? 'rotate(45deg) translateY(-1px)' : 'none', transition: 'all 0.2s', marginTop: open ? -9 : 0 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#333', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none', transition: 'all 0.2s' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="ov-drawer"
          style={{ position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, background: BG, zIndex: 99, flexDirection: 'column', padding: '32px 24px', gap: 8, borderTop: `1px solid ${BORDER}` }}
          onClick={() => setOpen(false)}
        >
          {[
            { href: '/about', label: isVI ? 'Giới thiệu' : 'About' },
            { href: '/contact', label: isVI ? 'Liên hệ' : 'Contact' },
            { href: 'https://admin.ovenly.io', label: isVI ? 'Đăng nhập' : 'Log in' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ fontSize: 18, fontWeight: 600, color: '#333', textDecoration: 'none', padding: '14px 0', borderBottom: `1px solid ${BORDER}`, display: 'block' }}>
              {item.label}
            </Link>
          ))}

          {/* Lang toggle */}
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3, width: 'fit-content', marginTop: 16 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={(e) => { e.stopPropagation(); setLang(l); }} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Link href="/register" onClick={() => setOpen(false)} style={{ display: 'block', background: PRIMARY, color: '#fff', padding: '14px 24px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginTop: 24 }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>
      )}
    </>
  );
}