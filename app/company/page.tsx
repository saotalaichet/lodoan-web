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
      h1a: 'Nhà hàng của bạn,',
      h1b: 'xứng đáng được',
      h1c: 'nhiều hơn thế.',
      sub: 'Ovenly xây dựng công cụ giúp nhà hàng Việt Nam nhận đơn trực tuyến, quản lý vận hành và giữ chân khách hàng quay lại.',
      cta1: 'Đăng Ký Nhà Hàng',
      cta2: 'Xem Sàn Thương Mại',
      footnote: 'Miễn phí cài đặt. Được hỗ trợ onboarding trực tiếp.',
    },
    stats: [
      { num: '7+', label: 'Nhà hàng đang sử dụng' },
      { num: '0₫', label: 'Phí cài đặt' },
      { num: '24/7', label: 'Quản lý đơn hàng' },
      { num: '< 2 phút', label: 'Thời gian xác nhận đơn' },
    ],
    features: {
      tag: 'Chúng Tôi Làm Gì',
      h2: 'Ba thứ tạo ra sự khác biệt.',
      sub: 'Không có phí hoa hồng 40%. Không cần kỹ thuật viên. Chỉ những công cụ thực sự hiệu quả.',
      items: [
        {
          num: '01',
          title: 'Tăng Doanh Thu',
          text: 'Có mặt trên sàn LÒ ĐỒ ĂN, nhận đơn trực tuyến và chạy khuyến mãi để tiếp cận khách hàng mà bạn chưa từng gặp.',
          items: ['Trang đặt hàng riêng', 'Hiện diện trên sàn', 'Mã giảm giá và khuyến mãi'],
        },
        {
          num: '02',
          title: 'Đơn Giản Hóa Vận Hành',
          text: 'Ứng dụng máy tính bảng rung chuông khi có đơn mới. Xác nhận trong một chạm, chọn thời gian và quản lý thực đơn ngay trên màn hình.',
          items: ['Quản lý đơn hàng trên máy tính bảng', 'Thông báo theo thời gian thực', 'Kiểm soát thực đơn và tình trạng món'],
        },
        {
          num: '03',
          title: 'Giữ Chân Khách Hàng',
          text: 'Email phản hồi tự động, hệ thống đánh giá xác thực và dashboard giúp bạn biết chính xác điều gì đang hiệu quả.',
          items: ['Email phản hồi sau đơn hàng', 'Điều hướng đánh giá Google', 'Phân tích doanh thu và đơn hàng'],
        },
      ],
    },
    howItWorks: {
      tag: 'Quy Trình',
      h2: 'Hoạt động trong vài ngày, không phải vài tháng.',
      steps: [
        { step: '01', title: 'Đăng ký', text: 'Điền form nhanh. Đội ngũ của chúng tôi liên hệ trong 24 giờ.' },
        { step: '02', title: 'Chúng tôi cài đặt', text: 'Chúng tôi nhập thực đơn, ảnh và cấu hình. Bạn không cần làm gì về kỹ thuật.' },
        { step: '03', title: 'Ra mắt', text: 'Nhà hàng của bạn xuất hiện trên LÒ ĐỒ ĂN và có trang đặt hàng riêng.' },
        { step: '04', title: 'Tăng trưởng', text: 'Đơn hàng đổ vào. Bạn quản lý trên máy tính bảng. Chúng tôi lo phần còn lại.' },
      ],
    },
    values: {
      tag: 'Giá Trị Của Chúng Tôi',
      h2: 'Chúng tôi xây dựng sản phẩm này cho chủ nhà hàng, không phải cho nhà đầu tư.',
      sub: 'Ovenly ra đời vì nhà hàng Việt Nam xứng đáng có công cụ tốt hơn. Chúng tôi tính phí hợp lý, hỗ trợ trực tiếp và luôn có mặt khi bạn cần.',
      items: [
        { title: 'Lấy Khách Hàng Làm Trung Tâm', text: 'Chúng tôi chỉ xây dựng những gì chủ nhà hàng thực sự cần. Vấn đề của họ là vấn đề của chúng tôi.' },
        { title: 'Đổi Mới', text: 'Công cụ mà nhà hàng Việt Nam chưa từng có trước đây, không phải bản sao của những gì đã tồn tại.' },
        { title: 'Hợp Tác', text: 'Chúng tôi làm việc cùng nhà hàng, không chỉ vì họ. Phản hồi của họ định hình từng bản cập nhật.' },
        { title: 'Dựa Trên Dữ Liệu', text: 'Mọi quyết định đều có căn cứ từ số liệu đơn hàng thực tế, không phải phỏng đoán.' },
      ],
    },
    cta: {
      h2: 'Sẵn sàng đưa nhà hàng lên trực tuyến?',
      sub: 'Miễn phí cài đặt. Chúng tôi sẽ hỗ trợ bạn trực tiếp và đưa bạn lên sóng trong vòng một tuần.',
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
    dashboard: {
      name: 'NYMS Tea & Coffee',
      powered: 'Powered by Ovenly',
      open: 'Đang mở',
      orders: 'Đơn hôm nay',
      revenue: 'Doanh thu hôm nay',
      rating: 'Điểm đánh giá',
      newOrder: 'Đơn mới · Mang về',
      orderDetail: 'Phở đặc biệt × 2   ·   180,000₫',
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
      h1a: 'Your restaurant,',
      h1b: 'built for',
      h1c: 'what comes next.',
      sub: 'Ovenly builds the tools that help Vietnamese restaurants take online orders, manage daily operations, and keep customers coming back.',
      cta1: 'Register Your Restaurant',
      cta2: 'Visit the Marketplace',
      footnote: 'Free to start. Onboarded personally.',
    },
    stats: [
      { num: '7+', label: 'Restaurants onboarded' },
      { num: '0₫', label: 'Setup fee' },
      { num: '24/7', label: 'Order management' },
      { num: '< 2 min', label: 'Average order response' },
    ],
    features: {
      tag: 'What We Do',
      h2: 'Three things that actually matter.',
      sub: 'No 40% commission fees. No technical setup required. Just tools that move the needle.',
      items: [
        {
          num: '01',
          title: 'Increase Sales',
          text: 'Get listed on the LÒ ĐỒ ĂN marketplace, take direct online orders, and run promotions that reach customers who would never have found you.',
          items: ['Dedicated ordering page', 'Marketplace listing', 'Promo codes and discounts'],
        },
        {
          num: '02',
          title: 'Streamline Operations',
          text: 'A tablet app rings when a new order comes in. Confirm in one tap, set a pickup time, and manage your entire menu from one screen.',
          items: ['Tablet order management', 'Real time notifications', 'Menu and availability control'],
        },
        {
          num: '03',
          title: 'Retain Customers',
          text: 'Automated feedback emails, a verified review system, and a dashboard that shows you exactly what is working and what is not.',
          items: ['Post order feedback emails', 'Google review routing', 'Revenue and order analytics'],
        },
      ],
    },
    howItWorks: {
      tag: 'How It Works',
      h2: 'Up and running in days, not months.',
      steps: [
        { step: '01', title: 'Register', text: 'Fill out a quick form. Our team contacts you within 24 hours.' },
        { step: '02', title: 'We set you up', text: 'We onboard your menu, photos, and settings. You do not touch a line of code.' },
        { step: '03', title: 'Go live', text: 'Your restaurant goes live on LÒ ĐỒ ĂN and gets its own ordering page.' },
        { step: '04', title: 'Grow', text: 'Orders come in. You manage them on the tablet. We handle the rest.' },
      ],
    },
    values: {
      tag: 'Our Values',
      h2: 'We built this for restaurant owners, not investors.',
      sub: 'Ovenly exists because Vietnamese restaurants deserve better tools. We charge a fair commission, we onboard you personally, and we are always available when you need us.',
      items: [
        { title: 'Client Obsession', text: 'We only build what restaurant owners actually need. Their problem is our problem.' },
        { title: 'Innovation', text: 'Tools Vietnamese restaurants have never had before, not copies of what already exists.' },
        { title: 'Collaboration', text: 'We work alongside our restaurants, not just for them. Their feedback shapes every update.' },
        { title: 'Data Driven', text: 'Every decision is backed by real order data, not guesswork or assumptions.' },
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
    dashboard: {
      name: 'NYMS Tea & Coffee',
      powered: 'Powered by Ovenly',
      open: 'Open',
      orders: 'Orders today',
      revenue: 'Revenue today',
      rating: 'Avg. rating',
      newOrder: 'New order · Pickup',
      orderDetail: 'Pho dac biet × 2   ·   180,000₫',
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
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' as const }}>
          <Link href="https://lodoan.vn" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.marketplace}</Link>
          <Link href="/register" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.forRestaurants}</Link>
          <Link href="/contact" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>{t.nav.contact}</Link>
          <div style={{ display: 'flex', background: '#F0E8E0', borderRadius: 8, padding: 3, gap: 2 }}>
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
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-block', background: '#FDF0EE', color: PRIMARY, border: `1px solid #F5CDC8`, fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, letterSpacing: '0.5px', marginBottom: 24, textTransform: 'uppercase' as const }}>
            {t.hero.tag}
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 20, color: '#111' }}>
            {t.hero.h1a}<br />
            {t.hero.h1b}<br />
            <span style={{ color: PRIMARY }}>{t.hero.h1c}</span>
          </h1>
          <p style={{ fontSize: 18, color: '#666', maxWidth: 420, lineHeight: 1.75, marginBottom: 36 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              {t.hero.cta1} →
            </Link>
            <Link href="https://lodoan.vn" style={{ background: 'transparent', color: '#333', border: `1px solid ${BORDER}`, padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
              {t.hero.cta2}
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#999', marginTop: 16 }}>{t.hero.footnote}</p>
        </div>

        {/* Dashboard mockup */}
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 28, boxShadow: '0 4px 32px rgba(155,28,28,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ width: 40, height: 40, background: '#FDF0EE', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏪</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{t.dashboard.name}</div>
              <div style={{ fontSize: 12, color: '#999' }}>{t.dashboard.powered}</div>
            </div>
            <div style={{ marginLeft: 'auto', background: '#EDFCF2', color: '#16A34A', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>● {t.dashboard.open}</div>
          </div>
          {[
            { label: t.dashboard.orders, value: '24' },
            { label: t.dashboard.revenue, value: '1,840,000₫' },
            { label: t.dashboard.rating, value: '4.8 ⭐' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
              <span style={{ fontSize: 14, color: '#666' }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{item.value}</span>
                <span style={{ fontSize: 11, background: '#EDFCF2', color: '#16A34A', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>↑</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 18, background: '#FDF0EE', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, background: PRIMARY, borderRadius: '50%', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{t.dashboard.newOrder}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{t.dashboard.orderDetail}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ padding: '28px 40px', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: PRIMARY, letterSpacing: '-1px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>{t.features.tag}</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 14, lineHeight: 1.1 }}>{t.features.h2}</h2>
          <p style={{ fontSize: 16, color: '#666', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>{t.features.sub}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {t.features.items.map((f, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, marginBottom: 14, letterSpacing: '0.3px' }}>{f.num}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.75, marginBottom: 20 }}>{f.text}</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                {f.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
                    <div style={{ width: 5, height: 5, background: PRIMARY, borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
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
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, background: PRIMARY, color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, margin: '0 auto 16px' }}>{s.step}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Values */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>{t.values.tag}</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.15 }}>{t.values.h2}</h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.75 }}>{t.values.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {t.values.items.map((v, i) => (
              <div key={i} style={{ padding: '20px 0', borderTop: `2px solid ${PRIMARY}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: '#111' }}>{v.title}</div>
                <div style={{ fontSize: 13, color: '#777', lineHeight: 1.65 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: PRIMARY }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>{t.cta.h2}</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>{t.cta.sub}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              {t.cta.btn1} →
            </Link>
            <Link href="mailto:hello@ovenly.io" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
              {t.cta.btn2}
            </Link>
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