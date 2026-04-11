'use client';

import Link from 'next/link';
import { useState } from 'react';

const T = {
  vi: {
    nav: {
      marketplace: 'LÒ ĐỒ ĂN',
      forRestaurants: 'Cho Nhà Hàng',
      contact: 'Liên Hệ',
      cta: 'Bắt Đầu Miễn Phí',
    },
    hero: {
      tag: 'Công Nghệ Nhà Hàng · Việt Nam',
      h1: 'Nhà hàng của bạn, online và tăng trưởng.',
      sub: 'Ovenly giúp nhà hàng Việt Nam nhận đơn trực tuyến và tiếp cận khách hàng mới qua sàn LÒ ĐỒ ĂN.',
      cta1: 'Đăng Ký Nhà Hàng',
      cta2: 'Xem Sàn Thương Mại',
      footnote: 'Miễn phí cài đặt. Được hỗ trợ onboarding trực tiếp.',
    },
    stats: [
      { num: '7+', label: 'Nhà hàng đang sử dụng' },
      { num: '0₫', label: 'Phí cài đặt' },
      { num: '24/7', label: 'Quản lý đơn hàng' },
    ],
    products: {
      tag: 'Sản Phẩm Của Chúng Tôi',
      h2: 'Hai cách để nhà hàng bạn tăng doanh thu trực tuyến.',
      items: [
        {
          label: 'Sàn Thương Mại',
          title: 'LÒ ĐỒ ĂN',
          sub: 'Khách hàng tìm thấy bạn',
          text: 'Nhà hàng của bạn xuất hiện trên sàn LÒ ĐỒ ĂN trước hàng nghìn khách hàng đang tìm kiếm bữa ăn. Chúng tôi lo việc marketing, bạn lo việc nấu ăn.',
          items: ['Hiện diện trên sàn marketplace', 'Khách hàng mới mỗi ngày', 'Không cần tự chạy quảng cáo'],
          cta: 'Xem LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80',
          photoAlt: 'Nhà hàng Việt Nam',
        },
        {
          label: 'Đặt Hàng Trực Tiếp',
          title: 'Trang Đặt Hàng Riêng',
          sub: 'Đơn hàng không qua trung gian',
          text: 'Nhà hàng có trang đặt hàng riêng tại order.ovenly.io. Khách hàng đặt trực tiếp, đơn hàng vào thẳng máy tính bảng của bạn, không có phí hoa hồng cắt cổ.',
          items: ['Trang đặt hàng với thương hiệu riêng', 'Quản lý đơn qua ứng dụng máy tính bảng', 'Thanh toán MoMo, ZaloPay, VNPay, tiền mặt'],
          cta: 'Đăng Ký Ngay',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
          photoAlt: 'Đặt hàng nhà hàng',
        },
      ],
    },
    howItWorks: {
      tag: 'Quy Trình',
      h2: 'Online trong vòng một tuần.',
      steps: [
        { num: '01', title: 'Đăng ký', text: 'Điền form đơn giản. Đội ngũ chúng tôi liên hệ trong 24 giờ.' },
        { num: '02', title: 'Chúng tôi cài đặt', text: 'Chúng tôi tạo trang, nhập thực đơn và ảnh cho bạn. Không cần kỹ thuật.' },
        { num: '03', title: 'Ra mắt', text: 'Nhà hàng lên sàn LÒ ĐỒ ĂN và có trang đặt hàng riêng.' },
        { num: '04', title: 'Tăng trưởng', text: 'Đơn hàng đến qua máy tính bảng. Bạn nấu, chúng tôi lo phần còn lại.' },
      ],
    },
    cta: {
      h2: 'Sẵn sàng đưa nhà hàng lên trực tuyến?',
      sub: 'Miễn phí cài đặt. Chúng tôi hỗ trợ bạn trực tiếp và đưa bạn lên sóng trong một tuần.',
      btn1: 'Đăng Ký Nhà Hàng',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      copy: '© 2026 Ovenly',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['Cho Nhà Hàng', '/register'],
        ['Bảo Mật', '/privacy'],
        ['Điều Khoản', '/terms'],
        ['Liên Hệ', '/contact'],
      ],
    },
  },
  en: {
    nav: {
      marketplace: 'LÒ ĐỒ ĂN',
      forRestaurants: 'For Restaurants',
      contact: 'Contact',
      cta: 'Get Started Free',
    },
    hero: {
      tag: 'Restaurant Technology · Vietnam',
      h1: 'Your restaurant, online and growing.',
      sub: 'Ovenly helps Vietnamese restaurants take online orders and reach new customers through the LÒ ĐỒ ĂN marketplace.',
      cta1: 'Register Your Restaurant',
      cta2: 'Visit the Marketplace',
      footnote: 'Free to start. Onboarded personally.',
    },
    stats: [
      { num: '7+', label: 'Restaurants onboarded' },
      { num: '0₫', label: 'Setup fee' },
      { num: '24/7', label: 'Order management' },
    ],
    products: {
      tag: 'Our Products',
      h2: 'Two ways to grow your restaurant revenue online.',
      items: [
        {
          label: 'Marketplace',
          title: 'LÒ ĐỒ ĂN',
          sub: 'Customers find you',
          text: 'Your restaurant appears on the LÒ ĐỒ ĂN marketplace in front of thousands of customers looking for their next meal. We handle the marketing. You handle the cooking.',
          items: ['Marketplace listing and discovery', 'New customers every day', 'No advertising required'],
          cta: 'Visit LÒ ĐỒ ĂN',
          href: 'https://lodoan.vn',
          photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80',
          photoAlt: 'Vietnamese restaurant',
        },
        {
          label: 'Direct Ordering',
          title: 'Your Own Ordering Page',
          sub: 'Orders with no middleman',
          text: 'Your restaurant gets its own ordering page at order.ovenly.io. Customers order directly, orders go straight to your tablet, with no heavy commission fees cutting into your margin.',
          items: ['Branded ordering page', 'Tablet order management app', 'MoMo, ZaloPay, VNPay, cash on delivery'],
          cta: 'Register Now',
          href: '/register',
          photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
          photoAlt: 'Restaurant ordering',
        },
      ],
    },
    howItWorks: {
      tag: 'How It Works',
      h2: 'Online within a week.',
      steps: [
        { num: '01', title: 'Register', text: 'Fill out a simple form. Our team contacts you within 24 hours.' },
        { num: '02', title: 'We set you up', text: 'We build your page, add your menu and photos. No technical work from you.' },
        { num: '03', title: 'Go live', text: 'Your restaurant goes live on LÒ ĐỒ ĂN with its own ordering page.' },
        { num: '04', title: 'Grow', text: 'Orders come through on your tablet. You cook. We handle the rest.' },
      ],
    },
    cta: {
      h2: 'Ready to put your restaurant online?',
      sub: 'Free to start. We will set everything up for you and have you live within a week.',
      btn1: 'Register Your Restaurant',
      btn2: 'hello@ovenly.io',
    },
    footer: {
      copy: '© 2026 Ovenly',
      links: [
        ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
        ['For Restaurants', '/register'],
        ['Privacy', '/privacy'],
        ['Terms', '/terms'],
        ['Contact', '/contact'],
      ],
    },
  },
};

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

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

      {/* Hero — full width photo background */}
      <section style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1600&q=80"
          alt="Vietnamese restaurant"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,8,8,0.62)' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, letterSpacing: '0.5px', marginBottom: 24, textTransform: 'uppercase' as const }}>
            {t.hero.tag}
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 20, color: '#fff', maxWidth: 680 }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 480, lineHeight: 1.75, marginBottom: 36 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              {t.hero.cta1} →
            </Link>
            <Link href="https://lodoan.vn" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              {t.hero.cta2}
            </Link>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>{t.hero.footnote}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ padding: '28px 40px', borderRight: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: PRIMARY, letterSpacing: '-1px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>{t.products.tag}</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1, maxWidth: 560 }}>{t.products.h2}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 32 }}>
          {t.products.items.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 0, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
              {/* Text side */}
              <div style={{ padding: '48px 48px', order: i % 2 === 0 ? 0 : 1, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', background: '#FDF0EE', color: PRIMARY, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 6, letterSpacing: '0.5px', textTransform: 'uppercase' as const, marginBottom: 20 }}>{p.label}</div>
                <h3 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 6, color: '#111' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: PRIMARY, fontWeight: 600, marginBottom: 16 }}>{p.sub}</p>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, marginBottom: 24 }}>{p.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 32 }}>
                  {p.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#333' }}>
                      <div style={{ width: 18, height: 18, background: '#FDF0EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, background: PRIMARY, borderRadius: '50%' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={p.href} style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-start' as const }}>
                  {p.cta} →
                </Link>
              </div>
              {/* Photo side */}
              <div style={{ order: i % 2 === 0 ? 1 : 0, minHeight: 380, overflow: 'hidden' }}>
                <img src={p.photo} alt={p.photoAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>{t.howItWorks.tag}</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1 }}>{t.howItWorks.h2}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
            {t.howItWorks.steps.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 800, color: PRIMARY, marginBottom: 12, letterSpacing: '0.5px' }}>{s.num}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div style={{ background: PRIMARY }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>{t.cta.h2}</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 32 }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
                {t.cta.btn1} →
              </Link>
              <Link href="mailto:hello@ovenly.io" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 320 }}>
            <img src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=700&q=80" alt="Restaurant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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