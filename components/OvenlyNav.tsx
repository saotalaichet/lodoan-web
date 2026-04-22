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
        .ov-nav-desktop { display: flex; align-items: center; gap: 20px; }
        .ov-nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; flex-direction: column; gap: 5px; align-items: center; justify-content: center; }
        @media (max-width: 768px) {
          .ov-nav-desktop { display: none !important; }
          .ov-nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 68, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 200 }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
            alt="Ovenly"
            style={{ height: 64, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block' }}
          />
        </Link>

        {/* Desktop */}
        <div className="ov-nav-desktop">
          <Link href="/about" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Giới thiệu' : 'About'}</Link>
          <Link href="/contact" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Liên hệ' : 'Contact'}</Link>
          <Link href="https://admin.ovenly.io" style={{ fontSize: 14, color: '#555', textDecoration: 'none' }}>{isVI ? 'Đăng nhập' : 'Log in'}</Link>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>

        {/* Hamburger */}
        <button className="ov-nav-hamburger" onClick={() => setOpen(o => !o)}>
          {open ? (
            <>
              <span style={{ display: 'block', width: 22, height: 2, background: '#333', transform: 'rotate(45deg) translate(5px, 5px)' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'transparent' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#333', transform: 'rotate(-45deg) translate(5px, -5px)' }} />
            </>
          ) : (
            <>
              <span style={{ display: 'block', width: 22, height: 2, background: '#333' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#333' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#333' }} />
            </>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, background: BG, zIndex: 199, display: 'flex', flexDirection: 'column', padding: '24px', borderTop: `1px solid ${BORDER}`, overflowY: 'auto' }}>
          {[
            { href: '/about', label: isVI ? 'Giới thiệu' : 'About' },
            { href: '/contact', label: isVI ? 'Liên hệ' : 'Contact' },
            { href: 'https://admin.ovenly.io', label: isVI ? 'Đăng nhập' : 'Log in' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 20, fontWeight: 600, color: '#222', textDecoration: 'none', padding: '16px 0', borderBottom: `1px solid ${BORDER}`, display: 'block' }}
            >
              {item.label}
            </Link>
          ))}

          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 10, padding: 4, width: 'fit-content', marginTop: 28 }}>
            {(['vi', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={e => { e.stopPropagation(); setLang(l); }}
                style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 700 : 400, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Link
            href="/register"
            onClick={() => setOpen(false)}
            style={{ display: 'block', background: PRIMARY, color: '#fff', padding: '16px 24px', borderRadius: 12, fontSize: 17, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginTop: 24 }}
          >
            {isVI ? 'Đặt lịch Demo' : 'Book A Demo'}
          </Link>
        </div>
      )}
    </>
  );
}