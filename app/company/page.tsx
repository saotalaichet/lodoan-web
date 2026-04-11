'use client';

import Link from 'next/link';
import { useState } from 'react';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

const T = {
  vi: {
    nav: {
      marketplace: 'LÒ ĐỒ ĂN',
      forRestaurants: 'Cho nhà hàng',
      contact: 'Liên hệ',
      cta: 'Bắt đầu miễn phí',
    },
    hero: {
      h1: 'Nhà hàng của bạn xứng đáng có nhiều khách hơn',
      sub: 'Ovenly giúp nhà hàng nhận đơn trực tuyến và tiếp cận khách hàng mới qua sàn LÒ ĐỒ ĂN.',
      cta1: 'Đăng ký nhà hàng',
      cta2: 'Xem sàn thương mại',
    },
    apps: {
      tag: 'Ứng dụng',
      h2: 'Hai cách để tăng doanh thu trực tuyến',
      items: [
        {
          label: 'Sàn thương mại',
          title: 'LÒ ĐỒ ĂN',
          sub: 'Khách hàng tìm thấy bạn',
          text: 'Nhà hàng của bạn xuất hiện trên sàn LÒ ĐỒ ĂN trước hàng nghìn khách hàng đang tìm kiếm bữa ăn. Chúng tôi lo việc marketing, bạn tập trung vào việc nấu ăn.',
          items: ['Hiện diện trên sàn marketplace', 'Tiếp cận khách hàng mới mỗi ngày', 'Không cần tự chạy quảng cáo'],
          cta: 'Xem LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
          photoAlt: 'Nhà hàng Việt Nam',
        },
        {
          label: 'Đặt hàng trực tiếp',
          title: 'Trang đặt hàng riêng',
          sub: 'Đơn hàng không qua trung gian',
          text: 'Nhà hàng của bạn có trang đặt hàng riêng tại order.ovenly.io. Khách đặt trực tiếp và đơn hàng vào thẳng máy tính bảng của bạn mà không mất phần trăm hoa hồng.',
          items: ['Trang đặt hàng với thương hiệu riêng', 'Quản lý đơn trên máy tính bảng', 'Hỗ trợ MoMo, ZaloPay, VNPay, tiền mặt'],
          cta: 'Đăng ký ngay',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          photoAlt: 'Đặt hàng trực tuyến',
        },
      ],
    },
    how: {
      tag: 'Bắt đầu',
      h2: 'Lên sóng trong vòng một tuần',
      steps: [
        { num: '01', title: 'Đăng ký', text: 'Điền form đơn giản. Đội ngũ chúng tôi liên hệ trong 24 giờ.' },
        { num: '02', title: 'Chúng tôi cài đặt', text: 'Chúng tôi tạo trang, nhập thực đơn và ảnh cho bạn. Không cần kỹ thuật.' },
        { num: '03', title: 'Ra mắt', text: 'Nhà hàng của bạn lên sàn LÒ ĐỒ ĂN và có trang đặt hàng riêng.' },
        { num: '04', title: 'Nhận đơn', text: 'Đơn hàng hiện ra trên máy tính bảng. Xác nhận một chạm, bếp làm việc.' },
      ],
    },
    cta: {
      h2: 'Sẵn sàng đưa nhà hàng lên trực tuyến',
      sub: 'Miễn phí cài đặt. Chúng tôi hỗ trợ bạn trực tiếp và đưa lên sóng trong một tuần.',
      btn1: 'Đăng ký nhà hàng',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      copy: '© 2026 Ovenly',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['Cho nhà hàng', '/register'],
        ['Bảo mật', '/privacy'],
        ['Điều khoản', '/terms'],
        ['Liên hệ', '/contact'],
      ],
    },
  },
  en: {
    nav: {
      marketplace: 'LÒ ĐỒ ĂN',
      forRestaurants: 'For restaurants',
      contact: 'Contact',
      cta: 'Get started free',
    },
    hero: {
      h1: 'Your restaurant deserves more customers',
      sub: 'Ovenly helps restaurants take online orders and reach new customers through the LÒ ĐỒ ĂN marketplace.',
      cta1: 'Register your restaurant',
      cta2: 'Visit the marketplace',
    },
    apps: {
      tag: 'Products',
      h2: 'Two ways to grow your revenue online',
      items: [
        {
          label: 'Marketplace',
          title: 'LÒ ĐỒ ĂN',
          sub: 'Customers find you',
          text: 'Your restaurant appears on the LÒ ĐỒ ĂN marketplace in front of thousands of customers looking for their next meal. We handle the marketing. You focus on the food.',
          items: ['Marketplace listing and discovery', 'New customers every day', 'No advertising required'],
          cta: 'Visit LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
          photoAlt: 'Vietnamese restaurant',
        },
        {
          label: 'Direct ordering',
          title: 'Your own ordering page',
          sub: 'Orders with no middleman',
          text: 'Your restaurant gets its own ordering page at order.ovenly.io. Customers order directly and orders go straight to your tablet with no commission fees taken from every sale.',
          items: ['Branded ordering page', 'Tablet order management app', 'MoMo, ZaloPay, VNPay, cash on delivery'],
          cta: 'Register now',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          photoAlt: 'Online ordering',
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

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>OVENLY<span style={{ color: PRIMARY }}>.</span></span>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link href="https://lodoan.vn" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.marketplace}</Link>
          <Link href="/register" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.forRestaurants}</Link>
          <Link href="/contact" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.contact}</Link>
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
      <section style={{ position: 'relative', minHeight: 580, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=80"
          alt="Nhà hàng Việt Nam"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,5,5,0.80) 50%, rgba(15,5,5,0.35) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24, color: '#fff', maxWidth: 640 }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.78)', maxWidth: 460, lineHeight: 1.75, marginBottom: 40 }}>
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

      {/* Apps / Products */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '88px 40px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 14 }}>{t.apps.tag}</p>
        <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, maxWidth: 560, marginBottom: 56 }}>{t.apps.h2}</h2>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {t.apps.items.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: '52px 48px', order: i % 2 === 0 ? 0 : 1, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
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
                <Link href={p.href} style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '13px 26px', borderRadius: 9, fontSize: 15, fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' as const }}>
                  {p.cta} →
                </Link>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0, minHeight: 420, overflow: 'hidden' }}>
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
            <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80" alt="Restaurant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 16 }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>OVENLY<span style={{ color: PRIMARY }}>.</span></span>
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