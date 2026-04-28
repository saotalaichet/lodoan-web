'use client';

import { useState } from 'react';
import OvenlyNav from '@/components/OvenlyNav';
import OvenlyFooter from '@/components/OvenlyFooter';
import SavingsCalculator from '@/components/SavingsCalculator';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';
const SURFACE = '#FFFFFF';

const T = {
  vi: {
    hero: {
      h1: 'Gói & Giá',
      sub: 'Gói đơn giản, minh bạch cho các quán ăn uóng độc lập',
    },
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Cho nhà hàng muốn bán hàng online ngay hôm nay',
        price: '15%',
        priceLabel: 'hoa hồng mỗi đơn hàng',
        priceNote: 'Không phí thiết lập • Không phí hàng tháng',
        cta: 'Bắt đầu miễn phí',
        popular: 'Phổ biến nhất',
        features: [
          'Trang đặt hàng trực tiếp',
          'Website tối ưu SEO',
          'Hiển thị trên LÒ ĐỒ ĂN',
          'Discovery network (Google, Facebook)',
          'Bảo vệ gian lận cơ bản',
          'Báo cáo doanh thu',
          'Hỗ trợ 24/7 (điện thoại & chat)',
          'Khấu trừ thuế tự động (Nghị định 117)',
        ],
        disclaimer: 'Phí đã bao gồm thanh toán điện tử. Chưa bao gồm 10% VAT trên hoa hồng và 4.5% thuế khấu trừ tại nguồn theo quy định pháp luật.',
      },
      enterprise: {
        name: 'Enterprise',
        tagline: 'Cho chuỗi nhà hàng và đối tác lớn',
        price: 'Custom',
        priceLabel: 'Báo giá theo nhu cầu',
        cta: 'Liên hệ đội ngũ Ovenly',
        badge: 'Liên hệ',
        featuresPrefix: 'Tất cả tính năng Starter, cộng thêm:',
        features: [
          'Hoa hồng đặc biệt theo khối lượng',
          'Quản lý tài khoản chuyên trách',
          'Tích hợp POS / API tùy chỉnh',
          'SLA & ưu tiên hỗ trợ',
          'Onboarding nhiều chi nhánh',
          'Báo cáo tùy chỉnh',
        ],
      },
    },
    breakdown: {
      title: 'Tất cả gói đều bao gồm',
      ordering: {
        title: 'SUITE ĐẶT HÀNG',
        features: [
          'Trang đặt hàng riêng cho nhà hàng',
          'Website tối ưu Google SEO',
          'Hiển thị trên LÒ ĐỒ ĂN',
          'Mạng lưới khám phá: Google, Facebook',
          'Quản lý menu và giá',
          'Đơn mang về và giao hàng',
        ],
      },
      operations: {
        title: 'SUITE VẬN HÀNH',
        features: [
          'Bảo vệ gian lận cơ bản',
          'Báo cáo doanh thu',
          'Hỗ trợ 24/7 qua điện thoại & chat',
          'Khấu trừ thuế tự động (Nghị định 117)',
          'Bảng điều khiển nhà hàng',
          'Ứng dụng Ovenly Partner cho Android',
        ],
      },
    },
    comparison: {
      title: 'So sánh với các nền tảng khác',
      note: 'Tất cả các nền tảng đều phải khấu trừ 4.5% thuế theo Nghị định 117/2025. Đây không phải phí của Ovenly.',
      headers: ['', 'Ovenly', 'GrabFood', 'ShopeeFood', 'BeFood'],
      rows: [
        ['Hoa hồng', '15%', '25%', '25%', '25%'],
        ['Phí xử lý thanh toán', 'Đã bao gồm', 'Đã bao gồm', 'Đã bao gồm', 'Đã bao gồm'],
        ['Phí thiết lập', '0₫', '1.200.000₫', 'Có', '0₫'],
        ['Phí hàng tháng', '0₫', '0₫', '0₫', '0₫'],
        ['Trang đặt hàng riêng', '✓', '✗', '✗', '✗'],
        ['Tối ưu SEO Google', '✓', '✗', '✗', '✗'],
        ['Tổng phí hiệu quả', '~16.5%', '~27.5%', '~27.5%', '~27.5%'],
      ],
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      items: [
        {
          q: '15% đã bao gồm những gì?',
          a: 'Phí 15% bao gồm: nền tảng Ovenly, xử lý thanh toán (MoMo, ZaloPay, VNPay), hiển thị trên LÒ ĐỒ ĂN, hỗ trợ marketing và mạng lưới khám phá. Không bao gồm 10% VAT trên hoa hồng và 4.5% thuế khấu trừ theo quy định pháp luật.',
        },
        {
          q: 'Tại sao Ovenly rẻ hơn GrabFood?',
          a: 'Chúng tôi tập trung vào hiệu quả vận hành thay vì chi tiêu lớn cho quảng cáo. Ovenly được xây dựng để giúp nhà hàng tăng trưởng bền vững với chi phí thấp hơn, không phải cạnh tranh bằng chiến dịch marketing tốn kém.',
        },
        {
          q: 'Có phí ẩn nào không?',
          a: 'Không có phí thiết lập, không có phí hàng tháng, không có phí ẩn. Chỉ có 15% hoa hồng trên mỗi đơn hàng, cộng với các loại thuế bắt buộc theo quy định pháp luật (áp dụng cho mọi nền tảng).',
        },
        {
          q: 'Khi nào tôi nhận được tiền?',
          a: 'Thanh toán hàng tuần. Tiền được chuyển vào mỗi thứ Hai cho các đơn hàng của tuần trước.',
        },
        {
          q: 'Tôi có thể hủy bất cứ lúc nào không?',
          a: 'Có, không có hợp đồng ràng buộc. Bạn có thể hủy bất cứ lúc nào với thông báo trước 7 ngày.',
        },
        {
          q: 'Tôi cần thiết bị gì?',
          a: 'Một máy tính bảng hoặc smartphone (Android) để chạy ứng dụng Ovenly Partner. Tùy chọn: máy in hóa đơn nhiệt Bluetooth 58mm.',
        },
      ],
    },
    cta: {
      title: 'Sẵn sàng bắt đầu?',
      sub: 'Tham gia hàng trăm nhà hàng đang phát triển với Ovenly',
      btn: 'Đặt lịch Demo ngay',
    },
  },
  en: {
    hero: {
      h1: 'Plan & Pricing',
      sub: 'Simple, transparent plans for independent restaurants',
    },
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'For restaurants ready to sell online today',
        price: '15%',
        priceLabel: 'commission per order',
        priceNote: 'No setup fee • No monthly fee',
        cta: 'Get started free',
        popular: 'Most popular',
        features: [
          'Direct online ordering page',
          'SEO-optimized website',
          'Listed on LÒ ĐỒ ĂN marketplace',
          'Discovery network (Google, Facebook)',
          'Basic fraud & chargeback protection',
          'Sales reporting',
          '24/7 support (phone & chat)',
          'Automatic tax withholding (Decree 117)',
        ],
        disclaimer: 'Fee includes payment processing. Excludes 10% VAT on commission and 4.5% government withholding tax (Decree 117).',
      },
      enterprise: {
        name: 'Enterprise',
        tagline: 'For restaurant chains and large partners',
        price: 'Custom',
        priceLabel: 'Tailored to your needs',
        cta: 'Talk to our team',
        badge: 'Contact us',
        featuresPrefix: 'Everything in Starter, plus:',
        features: [
          'Custom commission rate by volume',
          'Dedicated account manager',
          'Custom POS / API integration',
          'SLA & priority support',
          'Multi-location onboarding',
          'Custom reporting',
        ],
      },
    },
    breakdown: {
      title: 'All plans include',
      ordering: {
        title: 'ORDERING SUITE',
        features: [
          'Direct ordering page for your restaurant',
          'Google SEO-optimized website',
          'LÒ ĐỒ ĂN marketplace listing',
          'Discovery network: Google, Facebook',
          'Menu and price management',
          'Pickup and delivery orders',
        ],
      },
      operations: {
        title: 'OPERATIONS SUITE',
        features: [
          'Basic fraud & chargeback protection',
          'Sales and revenue reporting',
          '24/7 phone & chat support',
          'Automatic tax withholding (Decree 117)',
          'Restaurant dashboard',
          'Ovenly Partner Android app',
        ],
      },
    },
    comparison: {
      title: 'Compare to other platforms',
      note: 'All platforms must withhold 4.5% tax under Decree 117/2025. This is not an Ovenly fee.',
      headers: ['', 'Ovenly', 'GrabFood', 'ShopeeFood', 'BeFood'],
      rows: [
        ['Commission', '15%', '25%', '25%', '25%'],
        ['Payment processing', 'Included', 'Included', 'Included', 'Included'],
        ['Setup fee', '0₫', '1,200,000₫', 'Yes', '0₫'],
        ['Monthly fee', '0₫', '0₫', '0₫', '0₫'],
        ['Own ordering page', '✓', '✗', '✗', '✗'],
        ['Google SEO', '✓', '✗', '✗', '✗'],
        ['Effective rate', '~16.5%', '~27.5%', '~27.5%', '~27.5%'],
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'What does the 15% include?',
          a: 'The 15% covers: Ovenly platform, payment processing (MoMo, ZaloPay, VNPay), LÒ ĐỒ ĂN listing, marketing support, and discovery network. Excludes 10% VAT on commission and 4.5% government withholding tax (legally required).',
        },
        {
          q: 'Why is Ovenly cheaper than GrabFood?',
          a: 'We focus on operational efficiency instead of large advertising spend. Ovenly is built to help restaurants grow sustainably with lower costs, not compete through expensive marketing campaigns.',
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No setup fee, no monthly fee, no hidden charges. Only the 15% commission per order, plus government-required taxes that apply on every platform.',
        },
        {
          q: 'When do I get paid?',
          a: 'Settlement weekly. Payouts on every Monday for the previous week\'s orders.',
        },
        {
          q: 'Can I cancel anytime?',
          a: 'Yes, no contract lock-in. Cancel anytime with 7 days notice.',
        },
        {
          q: 'What equipment do I need?',
          a: 'A tablet or smartphone (Android) for the Ovenly Partner app. Optionally, a 58mm Bluetooth thermal printer for receipts.',
        },
      ],
    },
    cta: {
      title: 'Ready to start?',
      sub: 'Join hundreds of restaurants growing with Ovenly',
      btn: 'Book A Demo Now',
    },
  },
};

export default function PricingPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = T[lang];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(155, 28, 28, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(155, 28, 28, 0); } }
        .pricing-card { animation: fadeUp 0.6s ease; }
        .pricing-card:nth-child(2) { animation-delay: 0.1s; }
        .popular-badge { animation: pulse 2s infinite; }
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .breakdown-grid { grid-template-columns: 1fr !important; }
          .comparison-table { font-size: 12px !important; }
          .comparison-table th, .comparison-table td { padding: 8px 4px !important; }
        }
      `}</style>

      <OvenlyNav lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px 60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 16, color: '#111' }}>
          {t.hero.h1}
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#666', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
          {t.hero.sub}
        </p>
      </section>

      {/* Pricing Cards */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 80px' }}>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Starter */}
          <div className="pricing-card" style={{ background: SURFACE, border: `2px solid ${PRIMARY}`, borderRadius: 20, padding: 40, position: 'relative', boxShadow: `0 8px 32px rgba(155, 28, 28, 0.12)` }}>
            <div className="popular-badge" style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: PRIMARY, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {t.plans.starter.popular}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t.plans.starter.name}</h3>
            <p style={{ fontSize: 15, color: '#666', marginBottom: 32, lineHeight: 1.5 }}>{t.plans.starter.tagline}</p>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: PRIMARY, letterSpacing: '-2px', lineHeight: 1 }}>{t.plans.starter.price}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>{t.plans.starter.priceLabel}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>{t.plans.starter.priceNote}</div>
            </div>
            <Link href="/register" style={{ display: 'block', background: '#fff', color: PRIMARY, border: `2px solid ${PRIMARY}`, padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: 32, transition: 'all 0.2s' }}>
              {t.plans.starter.cta}
            </Link>
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>INCLUDES:</p>
              {t.plans.starter.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 15, color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#999', marginTop: 24, lineHeight: 1.5, fontStyle: 'italic' }}>{t.plans.starter.disclaimer}</p>
          </div>

          {/* Enterprise */}
          <div className="pricing-card" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 40, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#F0E8E0', color: PRIMARY, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 6, letterSpacing: '0.5px' }}>
              {t.plans.enterprise.badge}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t.plans.enterprise.name}</h3>
            <p style={{ fontSize: 15, color: '#666', marginBottom: 32, lineHeight: 1.5 }}>{t.plans.enterprise.tagline}</p>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: '#333', letterSpacing: '-2px', lineHeight: 1 }}>{t.plans.enterprise.price}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>{t.plans.enterprise.priceLabel}</div>
            </div>
            <Link href="mailto:sales@ovenly.io" style={{ display: 'block', background: 'transparent', color: PRIMARY, border: `1px solid ${PRIMARY}`, padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: 32, transition: 'all 0.2s' }}>
              {t.plans.enterprise.cta}
            </Link>
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 16 }}>{t.plans.enterprise.featuresPrefix}</p>
              {t.plans.enterprise.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 18, height: 18, background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 15, color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 56 }}>{t.breakdown.title}</h2>
          <div className="breakdown-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {/* Ordering Suite */}
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>{t.breakdown.ordering.title}</h3>
              {t.breakdown.ordering.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, background: PRIMARY, borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: '#555', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Operations Suite */}
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>{t.breakdown.operations.title}</h3>
              {t.breakdown.operations.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, background: PRIMARY, borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: '#555', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 40 }}>{t.comparison.title}</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F9F7F5' }}>
                {t.comparison.headers.map((h, i) => (
                  <th key={i} style={{ padding: '16px 12px', textAlign: i === 0 ? 'left' : 'center', fontWeight: 700, color: '#111', borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.comparison.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.comparison.rows.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '14px 12px', textAlign: j === 0 ? 'left' : 'center', color: j === 1 ? PRIMARY : '#555', fontWeight: j === 1 ? 700 : j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: '#999', marginTop: 16, textAlign: 'center', lineHeight: 1.5, maxWidth: 800, margin: '16px auto 0' }}>{t.comparison.note}</p>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator lang={lang} />

      {/* FAQ */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, padding: '80px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 48 }}>{t.faq.title}</h2>
          {t.faq.items.map((item, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 20, marginBottom: 20 }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111', margin: 0 }}>{item.q}</h3>
                <span style={{ fontSize: 24, color: PRIMARY, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              {openFaq === i && (
                <p style={{ fontSize: 15, color: '#666', marginTop: 16, lineHeight: 1.7, animation: 'fadeUp 0.3s ease' }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: PRIMARY, color: '#fff', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 16 }}>{t.cta.title}</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 32, lineHeight: 1.6 }}>{t.cta.sub}</p>
          <Link href="/register" style={{ display: 'inline-block', background: '#fff', color: PRIMARY, padding: '16px 32px', borderRadius: 12, fontSize: 17, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            {t.cta.btn} →
          </Link>
        </div>
      </section>

      <OvenlyFooter lang={lang} />
    </div>
  );
}