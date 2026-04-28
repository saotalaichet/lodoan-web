'use client';

import { useState } from 'react';
import OvenlyNav from '@/components/OvenlyNav';
import OvenlyFooter from '@/components/OvenlyFooter';
import SavingsCalculator from '@/components/SavingsCalculator';
import FAQs from '@/components/FAQs';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';
const SURFACE = '#FFFFFF';

const T = {
  vi: {
    hero: {
      h1: 'Bảng giá',
      sub: 'Giá đơn giản, minh bạch cho các quán ăn uống độc lập',
    },
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'Cho quán ăn uống muốn bán hàng online ngay hôm nay',
        price: '15%',
        priceLabel: 'hoa hồng mỗi đơn hàng',
        priceNote: 'Không phí hàng tháng',
        cta: 'Liên hệ đội ngũ Ovenly',
        popular: 'Phổ biến nhất',
        features: [
          'Trang đặt hàng trực tiếp',
          'Website tối ưu SEO',
          'Hiển thị trên LÒ ĐỒ ĂN',
          'Bảo vệ bom hàng cơ bản',
          'Báo cáo doanh thu',
          'Hỗ trợ 24/7',
        ],
        disclaimer: 'Phí đã bao gồm thanh toán điện tử. Chưa bao gồm 10% VAT trên hoa hồng và 4.5% thuế khấu trừ tại nguồn theo quy định pháp luật.',
      },
      enterprise: {
        name: 'Enterprise',
        tagline: 'Cho chuỗi nhà hàng và đối tác lớn',
        price: 'Custom',
        priceLabel: '',
        cta: 'Liên hệ đội ngũ Ovenly',
        badge: 'Liên hệ',
        featuresPrefix: 'Tất cả tính năng Starter, cộng thêm:',
        features: [
          'Báo giá theo nhu cầu',
          'Quản lý tài khoản chuyên trách',
          'Tích hợp POS / API tùy chỉnh',
          'SLA & ưu tiên hỗ trợ',
          'Onboarding nhiều chi nhánh',
          'Báo cáo tùy chỉnh',
        ],
      },
    },
    additionalFees: {
      title: 'Phí bổ sung',
      onboarding: {
        label: 'Phí kích hoạt và onboarding',
        description: 'Bao gồm: Thiết lập tại quán, nhập menu, chụp ảnh, đào tạo nhân viên, ra mắt trang đặt hàng riêng, đăng ký sàn thương mại',
        oldPrice: '1,500,000₫',
        newPrice: 'MIỄN PHÍ',
        badge: 'Có thời hạn',
      },
      printer: {
        label: 'Máy in hóa đơn (Tùy chọn)',
        price: '750,000₫ - 1,700,000₫',
      },
    },
    cta: {
      title: 'Sẵn sàng bắt đầu?',
      sub: 'Tham gia hàng trăm nhà hàng đang phát triển với Ovenly',
      btn: 'Đặt lịch Demo ngay',
    },
  },
  en: {
    hero: {
      h1: 'Pricing',
      sub: 'Simple, transparent pricing for independent restaurants',
    },
    plans: {
      starter: {
        name: 'Starter',
        tagline: 'For F&B businesses ready to sell online today',
        price: '15%',
        priceLabel: 'commission per order',
        priceNote: 'No monthly fee',
        cta: 'Contact Ovenly Team',
        popular: 'Most popular',
        features: [
          'Direct online ordering page',
          'SEO-optimized website',
          'Listed on LÒ ĐỒ ĂN marketplace',
          'Basic order abandonment protection',
          'Sales reporting',
          '24/7 support',
        ],
        disclaimer: 'Fee includes payment processing. Excludes 10% VAT on commission and 4.5% government withholding tax (Decree 117).',
      },
      enterprise: {
        name: 'Enterprise',
        tagline: 'For restaurant chains and large partners',
        price: 'Custom',
        priceLabel: '',
        cta: 'Contact Ovenly Team',
        badge: 'Contact us',
        featuresPrefix: 'Everything in Starter, plus:',
        features: [
          'Tailored pricing',
          'Dedicated account manager',
          'Custom POS / API integration',
          'SLA & priority support',
          'Multi-location onboarding',
          'Custom reporting',
        ],
      },
    },
    additionalFees: {
      title: 'Additional Fees',
      onboarding: {
        label: 'Activation and onboarding fee',
        description: 'Includes: On-site setup, menu upload, photography, staff training, dedicated ordering page launch, marketplace listing',
        oldPrice: '1,500,000₫',
        newPrice: 'FREE',
        badge: 'Limited time',
      },
      printer: {
        label: 'Receipt printer (Optional)',
        price: '750,000₫ - 1,700,000₫',
      },
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
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 40px' }}>
        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          {/* Starter */}
          <div className="pricing-card" style={{ background: SURFACE, border: `2px solid ${PRIMARY}`, borderRadius: 20, padding: 40, position: 'relative', boxShadow: `0 8px 32px rgba(155, 28, 28, 0.12)`, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="popular-badge" style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: PRIMARY, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {t.plans.starter.popular}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t.plans.starter.name}</h3>
            <p style={{ fontSize: 15, color: '#666', marginBottom: 32, lineHeight: 1.5, minHeight: 45 }}>{t.plans.starter.tagline}</p>
            <div style={{ marginBottom: 32, minHeight: 110 }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: PRIMARY, letterSpacing: '-2px', lineHeight: 1 }}>{t.plans.starter.price}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8, minHeight: 22 }}>{t.plans.starter.priceLabel}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 8, minHeight: 18 }}>{t.plans.starter.priceNote}</div>
            </div>
            <Link href="https://www.ovenly.io/register" style={{ display: 'block', background: '#fff', color: PRIMARY, border: `2px solid ${PRIMARY}`, padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: 32, transition: 'all 0.2s' }}>
              {t.plans.starter.cta}
            </Link>
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24, flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>
                {lang === 'vi' ? 'BAO GỒM:' : 'INCLUDES:'}
              </p>
              {t.plans.starter.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="9" fill={PRIMARY}/>
                    <path d="M5 9L8 12L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 15, color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#999', marginTop: 24, lineHeight: 1.5, fontStyle: 'italic' }}>{t.plans.starter.disclaimer}</p>
          </div>

          {/* Enterprise */}
          <div className="pricing-card" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 40, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#F0E8E0', color: PRIMARY, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 6, letterSpacing: '0.5px' }}>
              {t.plans.enterprise.badge}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t.plans.enterprise.name}</h3>
            <p style={{ fontSize: 15, color: '#666', marginBottom: 32, lineHeight: 1.5, minHeight: 45 }}>{t.plans.enterprise.tagline}</p>
            <div style={{ marginBottom: 32, minHeight: 110 }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: '#333', letterSpacing: '-2px', lineHeight: 1 }}>{t.plans.enterprise.price}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 8, minHeight: 22 }}>{t.plans.enterprise.priceLabel}</div>
              <div style={{ minHeight: 18 }}></div>
            </div>
            <Link href="https://www.ovenly.io/register" style={{ display: 'block', background: 'transparent', color: PRIMARY, border: `1px solid ${PRIMARY}`, padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700, textAlign: 'center', textDecoration: 'none', marginBottom: 32, transition: 'all 0.2s' }}>
              {t.plans.enterprise.cta}
            </Link>
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24, flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#666', marginBottom: 16 }}>{t.plans.enterprise.featuresPrefix}</p>
              {t.plans.enterprise.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="9" fill={PRIMARY}/>
                    <path d="M5 9L8 12L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 15, color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '32px 40px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 24 }}>{t.additionalFees.title}</h3>
          
          {/* Onboarding Fee */}
          <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 4 }}>{t.additionalFees.onboarding.label}</p>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{t.additionalFees.onboarding.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16, color: '#999', textDecoration: 'line-through' }}>{t.additionalFees.onboarding.oldPrice}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: PRIMARY }}>→</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: PRIMARY }}>{t.additionalFees.onboarding.newPrice}</span>
                <span style={{ fontSize: 11, fontWeight: 700, background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {t.additionalFees.onboarding.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Printer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>{t.additionalFees.printer.label}</p>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#555' }}>{t.additionalFees.printer.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator lang={lang} />

      {/* FAQs */}
      <FAQs lang={lang} />

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