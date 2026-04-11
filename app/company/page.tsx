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
      h1: 'Tăng doanh thu nhiều hơn mỗi ngày với đơn hàng trực tuyến',
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
          sub: 'Khách hàng tìm thấy bạn trên Google',
          text: 'Quán ăn của bạn xuất hiện trên sàn LÒ ĐỒ ĂN và được tối ưu để hiện trên kết quả tìm kiếm Google. Khách hàng mới tìm thấy bạn mỗi ngày mà không cần bạn tự chạy quảng cáo.',
          items: ['Hiện diện trên sàn marketplace', 'Tối ưu SEO trên Google', 'Tiếp cận khách hàng mới mỗi ngày'],
          cta: 'Xem LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
          photoAlt: 'Nhà hàng Việt Nam',
          flip: false,
        },
        {
          label: 'Đặt hàng trực tiếp',
          title: 'Trang đặt hàng riêng',
          sub: 'Đơn hàng trực tiếp, không qua trung gian',
          text: 'Quán của bạn có trang đặt hàng riêng. Khách đặt trực tiếp và đơn hàng vào thẳng máy tính bảng.',
          items: ['Trang đặt hàng với thương hiệu riêng', 'Quản lý đơn trên máy tính bảng', 'Hỗ trợ MoMo, ZaloPay, VNPay, tiền mặt'],
          cta: 'Đăng ký ngay',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
          photoAlt: 'Quản lý đơn hàng',
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
      sub: 'Miễn phí cài đặt. Chúng tôi hỗ trợ bạn trực tiếp và đưa lên sóng trong một tuần.',
      btn1: 'Đăng ký',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      copy: '© 2026 Ovenly',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['Bảo mật', '/privacy'],
        ['Điều khoản', '/terms'],
        ['Liên hệ', '/contact'],
      ],
    },
  },
  en: {
    nav: { cta: 'Get started free' },
    hero: {
      h1: 'Sell more every day with online ordering',
      sub: 'Ovenly helps restaurants take online orders, reach new customers through the LÒ ĐỒ ĂN marketplace, and get found more easily on Google.',
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
          sub: 'Customers find you on Google',
          text: 'Your restaurant appears on the LÒ ĐỒ ĂN marketplace and is optimized to show up in Google search results. New customers find you every day without you running any ads.',
          items: ['Marketplace listing and discovery', 'Google SEO optimization', 'New customers every day'],
          cta: 'Visit LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
          photoAlt: 'Vietnamese restaurant',
          flip: false,
        },
        {
          label: 'Direct ordering',
          title: 'Your own ordering page',
          sub: 'Orders with no middleman',
          text: 'Your restaurant gets its own ordering page. Customers order directly and orders go straight to your tablet with no commission percentage taken by a third party.',
          items: ['Branded ordering page', 'Tablet order management app', 'MoMo, ZaloPay, VNPay, cash on delivery'],
          cta: 'Register now',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
          photoAlt: 'Order management',
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
      sub: 'Free to start. We set everything up for you and have you live within a week.',
      btn1: 'Register your restaurant',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      copy: '© 2026 Ovenly',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['For restaurants', '/register'],
        ['Privacy', '/privacy'],
        ['Terms', '/terms'],
        ['Contact', '/contact'],
      ],
    },
  },
};

export default function CompanyPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = T[lang];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', lineHeight: 1.6 }}>

      {/* Nav — logo + lang toggle + CTA only */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3 }}>
            {(['vi', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: lang === l ? '#fff' : 'transparent', color: lang === l ? '#111' : '#888', fontWeight: lang === l ? 600 : 400, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            {t.nav.cta}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: 600, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=80"
          alt="Vietnamese restaurant"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,4,4,0.82) 45%, rgba(12,4,4,0.30) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, color: '#fff', maxWidth: 660 }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.78)', maxWidth: 480, lineHeight: 1.75, marginBottom: 40 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '15px 30px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              {t.hero.cta1} →
            </Link>
            <Link href="https://lodoan.vn" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '15px 30px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Apps */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 14 }}>{t.apps.tag}</p>
        <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, maxWidth: 560, marginBottom: 56 }}>{t.apps.h2}</h2>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {t.apps.items.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: '52px 48px', order: p.flip ? 1 : 0, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', background: '#FDF0EE', color: PRIMARY, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 6, letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: 20, alignSelf: 'flex-start' as const }}>{p.label}</div>
                <h3 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8, color: '#111' }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: PRIMARY, fontWeight: 600, marginBottom: 18 }}>{p.sub}</p>
                <p style={{ fontSize: 16, color: '#555', lineHeight: 1.75, marginBottom: 28 }}>{p.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginBottom: 36 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#333' }}>
                      <div style={{ width: 20, height: 20, background: '#FDF0EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, background: PRIMARY, borderRadius: '50%' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: PRIMARY, color: '#fff', padding: '12px 22px', borderRadius: 9, fontSize: 15, fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' as const }}>
  {i === 0 && <img src="https://i.postimg.cc/c6m7wvwn/lodoan-logo.png" alt="LÒ ĐỒ ĂN" style={{ height: 22, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />}
  {i !== 0 && <>{p.cta} →</>}
</Link>
              </div>
              <div style={{ order: p.flip ? 0 : 1, minHeight: 420, overflow: 'hidden' }}>
                <img src={p.photo} alt={p.photoAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 14 }}>{t.how.tag}</p>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 56 }}>{t.how.h2}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
            {t.how.steps.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 800, color: PRIMARY, marginBottom: 16, letterSpacing: '-0.5px' }}>{s.num}</div>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</h4>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div style={{ background: PRIMARY }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#fff', marginBottom: 18, lineHeight: 1.08 }}>{t.cta.h2}</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 36 }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                {t.cta.btn1} →
              </Link>
              <Link href="mailto:hello@ovenly.io" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 340 }}>
            <img src="https://images.unsplash.com/..." alt="Restaurant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 16 }}>
        <div>
          <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontSize: 13, color: '#aaa', marginLeft: 16 }}>{t.footer.copy}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
          {t.footer.links.map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>

    </div>
  );
}