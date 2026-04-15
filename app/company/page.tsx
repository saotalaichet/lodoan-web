'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useState } from 'react';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

const T = {
  vi: {
    nav: { cta: 'Đăng ký' },
    hero: {
      h1: 'Tăng doanh thu mỗi ngày với đơn hàng trực tuyến',
      sub: 'Ovenly giúp các quán ăn uống và nhà hàng nhận đơn online, tiếp cận khách hàng mới qua sàn LÒ ĐỒ ĂN và trên Google.',
      cta1: 'Đăng ký',
      cta2: 'Xem sàn thương mại',
    },
    apps: {
      tag: 'Ứng dụng',
      h2: 'Tăng doanh thu trực tuyến',
      items: [
        {
          label: 'Sàn thương mại',
          title: 'LÒ ĐỒ ĂN',
          sub: '',
          text: 'Quán ăn của bạn xuất hiện trên sàn LÒ ĐỒ ĂN, kênh bán hàng mới để tiếp cận khách chưa biết đến quán. Tiếp cận đúng người, đúng lúc, xây dựng lượng khách hàng dần theo thời gian.',
          items: ['Nền tảng đặt hàng trực tuyến mới nhất tại Việt Nam', 'Tiếp cận khách hàng đang tìm món ăn của bạn', 'Tăng doanh thu mà không cần tự chạy quảng cáo'],
          cta: 'Xem LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
          photoAlt: 'Nhà hàng Việt Nam',
          flip: false,
        },
        {
          label: 'Đặt hàng trực tiếp',
          title: 'Trang đặt hàng riêng',
          sub: 'Đơn hàng trực tiếp, tối ưu hóa SEO',
          text: 'Quán của bạn có trang đặt hàng riêng, được cải thiện để hiện trên kết quả tìm kiếm Google. Khách đặt trực tiếp và đơn hàng vào thẳng máy tính bảng.',
          items: ['Trang đặt hàng với thương hiệu riêng', 'Tối ưu SEO trên Google', 'Hỗ trợ MoMo, ZaloPay, VNPay, tiền mặt'],
          cta: 'Đăng ký ngay',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
          photoAlt: 'Trà sữa bubble tea',
          flip: true,
        },
      ],
    },
    how: {
      tag: 'Bắt đầu',
      h2: 'Lên sóng trong vòng một tuần',
      steps: [
        { num: '01', title: 'Đăng ký', text: 'Điền form đơn giản. Đội ngũ chúng tôi liên hệ trong 24 giờ.' },
        { num: '02', title: 'Chúng tôi cài đặt', text: 'Chúng tôi tạo trang, nhập thực đơn và ảnh cho bạn.' },
        { num: '03', title: 'Ra mắt', text: 'Quán của bạn lên sàn LÒ ĐỒ ĂN và có trang đặt hàng riêng.' },
        { num: '04', title: 'Nhận đơn', text: 'Đơn hàng hiện ra trên máy tính bảng. Xác nhận một chạm, bếp làm việc.' },
      ],
    },
    cta: {
      h2: 'Sẵn sàng đưa quán lên trực tuyến',
      sub: 'Miễn phí cài đặt, hỗ trợ trực tiếp và hoạt động trong vòng một tuần',
      btn1: 'Đăng ký',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      allRights: 'Bảo lưu mọi quyền',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['Liên hệ', '/contact'],
      ],
    },
  },
  en: {
    nav: { cta: 'Get started free' },
    hero: {
      h1: 'Take orders directly from your customers',
      sub: 'Online ordering built for F&B industry, easy to set up, easy to manage and customers order straight from you',
      cta1: 'Register your restaurant',
      cta2: 'Visit the marketplace',
    },
    apps: {
      tag: 'Products',
      h2: 'Two products to grow your revenue online',
      items: [
        {
          label: 'Marketplace',
          title: 'LÒ ĐỒ ĂN',
          sub: '',
          text: 'Your restaurant appears on LÒ ĐỒ ĂN, a new sales channel to reach customers who have never heard of you. Reach the right people at the right time and build your customer base over time.',
          items: ['The latest online ordering platform in Vietnam', 'Reach customers already searching for your food', 'Grow revenue without running your own ads'],
          cta: 'Visit LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
          photoAlt: 'Vietnamese restaurant',
          flip: false,
        },
        {
          label: 'Direct ordering',
          title: 'Your own ordering page',
          sub: 'Direct orders, SEO optimized',
          text: 'Your restaurant gets its own ordering page, improved to show up in Google search results. Customers order directly and orders go straight to your tablet.',
          items: ['Branded ordering page', 'Google SEO optimization', 'MoMo, ZaloPay, VNPay, cash on delivery'],
          cta: 'Register now',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
          photoAlt: 'Bubble tea shop',
          flip: true,
        },
      ],
    },
    how: {
      tag: 'Get started',
      h2: 'Live within one week',
      steps: [
        { num: '01', title: 'Register', text: 'Fill out a simple form. Our team contacts you within 24 hours.' },
        { num: '02', title: 'We set you up', text: 'We build your page, add your menu and photos. No technical work from you.' },
        { num: '03', title: 'Go live', text: 'Your restaurant goes live on LÒ ĐỒ ĂN with its own ordering page.' },
        { num: '04', title: 'Receive orders', text: 'Orders appear on your tablet. Confirm in one tap and the kitchen gets to work.' },
      ],
    },
    cta: {
      h2: 'Ready to put your restaurant online',
      sub: 'Free to set up, direct support and live within a week',
      btn1: 'Register your restaurant',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      allRights: 'All rights reserved',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['Contact', '/contact'],
      ],
    },
  },
};

export default function CompanyPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = T[lang];
  const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ovenly',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, IOS',
  description: 'Phần mềm nhận đơn online và quản lý nhà hàng tại Việt Nam',
  url: 'https://www.ovenly.io',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
    description: 'Miễn phí đăng ký',
  },
  provider: {
    '@type': 'Organization',
    name: 'Ovenly',
    url: 'https://www.ovenly.io',
    email: 'hello@ovenly.io',
    areaServed: 'VN',
  },
};

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', lineHeight: 1.6 }}>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

      <style>{`
        @media (max-width: 768px) {
          .ov-nav { padding: 0 20px !important; height: 60px !important; }
          .ov-nav-logo { height: 44px !important; }
          .ov-hero { padding: 60px 20px !important; min-height: 500px !important; }
          .ov-hero h1 { font-size: 32px !important; letter-spacing: -1px !important; }
          .ov-hero p { font-size: 16px !important; }
          .ov-hero-btns { flex-direction: column !important; }
          .ov-hero-btns a { text-align: center; }
          .ov-section { padding: 56px 20px !important; }
          .ov-card-grid { grid-template-columns: 1fr !important; }
          .ov-card-text { order: 0 !important; padding: 32px 24px !important; }
          .ov-card-photo { order: 1 !important; min-height: 260px !important; }
          .ov-how-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .ov-cta-grid { grid-template-columns: 1fr !important; }
          .ov-cta-photo { display: none !important; }
          .ov-cta-section { padding: 56px 20px !important; }
          .ov-footer { padding: 36px 20px !important; }
          .ov-lodoan-logo { height: 160px !important; }
          .ov-h2 { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .ov-hero h1 { font-size: 26px !important; }
          .ov-how-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .ov-hero { padding: 60px 32px !important; }
          .ov-section { padding: 64px 32px !important; }
          .ov-card-text { padding: 36px 32px !important; }
          .ov-cta-section { padding: 64px 32px !important; }
          .ov-footer { padding: 40px 32px !important; }
          .ov-hero h1 { font-size: 44px !important; }
        }
        @keyframes slideshow {
          0%, 16% { opacity: 1; }
          20%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .ov-slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; animation: slideshow 25s infinite; }
        .ov-slide:nth-child(1) { animation-delay: 0s; }
        .ov-slide:nth-child(2) { animation-delay: 5s; }
        .ov-slide:nth-child(3) { animation-delay: 10s; }
        .ov-slide:nth-child(4) { animation-delay: 15s; }
        .ov-slide:nth-child(5) { animation-delay: 20s; }
        .ov-slide-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .ov-footer-desktop { display: grid !important; }
        .ov-footer-mobile { display: none !important; }
        @media (max-width: 768px) {
          .ov-footer-desktop { display: none !important; }
          .ov-footer-mobile { display: flex !important; }
          .ov-footer { padding: 36px 20px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="ov-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 72, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
          <img
            className="ov-nav-logo"
            src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
            alt="Ovenly"
            style={{ height: 64, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, cursor: 'pointer', display: 'block' }}
          />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
            {t.nav.cta}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="ov-hero" style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=80"
          alt="Vietnamese restaurant"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,4,4,0.82) 45%, rgba(12,4,4,0.30) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 68px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20, color: '#fff', maxWidth: 660 }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(255,255,255,0.78)', maxWidth: 480, lineHeight: 1.75, marginBottom: 36 }}>
            {t.hero.sub}
          </p>
          <div className="ov-hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              {t.hero.cta1} →
            </Link>
            <Link href="https://lodoan.vn" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section className="ov-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 14 }}>{t.apps.tag}</p>
        <h2 className="ov-h2" style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, maxWidth: 560, marginBottom: 48 }}>{t.apps.h2}</h2>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {t.apps.items.map((p, i) => (
            <div key={i} className="ov-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
              <div className="ov-card-text" style={{ padding: '52px 48px', order: p.flip ? 1 : 0, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', background: '#FDF0EE', color: PRIMARY, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 6, letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: i === 0 ? 8 : 20, alignSelf: 'flex-start' as const }}>{p.label}</div>
                {i === 0 ? (
                  <img
                    className="ov-lodoan-logo"
                    src="https://i.postimg.cc/cJS2qLQz/L.png"
                    alt="LÒ ĐỒ ĂN"
                    style={{ height: 240, width: 'auto', objectFit: 'contain', marginBottom: 0, marginTop: -16, display: 'block', mixBlendMode: 'multiply' as any, alignSelf: 'flex-start' as any }}
                  />
                ) : (
                  <>
                    <h3 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8, color: '#111' }}>{p.title}</h3>
                    {p.sub && <p style={{ fontSize: 15, color: PRIMARY, fontWeight: 600, marginBottom: 18 }}>{p.sub}</p>}
                  </>
                )}
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, marginBottom: 24 }}>{p.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 32 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#333' }}>
                      <div style={{ width: 18, height: 18, background: '#FDF0EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: 5, height: 5, background: PRIMARY, borderRadius: '50%' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: PRIMARY, color: '#fff', padding: '12px 22px', borderRadius: 9, fontSize: 15, fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' as const }}>
                  {p.cta} →
                </Link>
              </div>
              <div className="ov-card-photo" style={{ order: p.flip ? 0 : 1, minHeight: 420, overflow: 'hidden', position: 'relative' }}>
                {i === 0 ? (
                  <div className="ov-slide-wrap" style={{ height: '100%', minHeight: 420 }}>
                    <img className="ov-slide" src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80" alt="Vietnamese food 1" />
                    <img className="ov-slide" src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80" alt="Vietnamese food 2" />
                    <img className="ov-slide" src="https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80" alt="Vietnamese food 3" />
                    <img className="ov-slide" src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80" alt="Vietnamese food 4" />
                    <img className="ov-slide" src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80" alt="Vietnamese food 5" />
                  </div>
                ) : (
                  <div className="ov-slide-wrap" style={{ height: '100%', minHeight: 420 }}>
                    <img className="ov-slide" src="/drinks/bt1.jpg" alt="Bubble tea 1" />
                    <img className="ov-slide" src="/drinks/bt2.jpg" alt="Bubble tea 2" />
                    <img className="ov-slide" src="/drinks/bt3.jpg" alt="Bubble tea 3" />
                    <img className="ov-slide" src="/drinks/bt4.jpg" alt="Bubble tea 4" />
                    <img className="ov-slide" src="/drinks/bt5.jpg" alt="Bubble tea 5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section className="ov-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 14 }}>{t.how.tag}</p>
          <h2 className="ov-h2" style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 48 }}>{t.how.h2}</h2>
          <div className="ov-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
            {t.how.steps.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 26, fontWeight: 800, color: PRIMARY, marginBottom: 14, letterSpacing: '-0.5px' }}>{s.num}</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div style={{ background: PRIMARY }}>
        <section className="ov-cta-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
          <div className="ov-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', marginBottom: 18, lineHeight: 1.08 }}>{t.cta.h2}</h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 32 }}>{t.cta.sub}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                  {t.cta.btn1} →
                </Link>
                <Link href="mailto:hello@ovenly.io" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
                  {t.cta.btn2}
                </Link>
              </div>
            </div>
            <div className="ov-cta-photo" style={{ borderRadius: 16, overflow: 'hidden', height: 340, position: 'relative' }}>
              <div className="ov-slide-wrap" style={{ height: '100%' }}>
                <img className="ov-slide" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Food 1" />
                <img className="ov-slide" src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80" alt="Food 2" />
                <img className="ov-slide" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Restaurant 3" />
                <img className="ov-slide" src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80" alt="Food 4" />
                <img className="ov-slide" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80" alt="Food 5" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="ov-footer" style={{ borderTop: `1px solid ${BORDER}`, padding: '48px 40px', background: BG }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Desktop footer */}
          <div style={{ display: 'none' }} className="ov-footer-desktop">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20, marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#555', margin: 0 }}>© 2026 Ovenly™</p>
              <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
                <img
                  src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
                  alt="Ovenly"
                  style={{ height: 64, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block', cursor: 'pointer' }}
                />
              </Link>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#555', margin: 0, textAlign: 'right' as const }}>{t.footer.allRights}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
              {t.footer.links.map(([label, href]) => (
                <Link key={label} href={href} style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Mobile/tablet footer */}
          <div className="ov-footer-mobile" style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16, textAlign: 'center' as const }}>
            <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
              <img
                src="https://i.postimg.cc/Mvp7DzmH/logo-3.png"
                alt="Ovenly"
                style={{ height: 56, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any, display: 'block', cursor: 'pointer' }}
              />
            </Link>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              {t.footer.links.map(([label, href]) => (
                <Link key={label} href={href} style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™</p>
            <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>{t.footer.allRights}</p>
          </div>

        </div>
      </footer>

    </div>
  );
}