'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import OvenlyNav from '@/components/OvenlyNav';
import SavingsCalculator from '@/components/SavingsCalculator';

const PRIMARY = '#9B1C1C';
const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const T = {
  vi: {
    title: 'Mở rộng kênh bán hàng Online cho quán cùng Ovenly ngay hôm nay',
    subtitle: 'Điền thông tin bên dưới, đội ngũ Ovenly sẽ liên hệ và hỗ trợ bạn trực tiếp.',
    nameLabel: 'Họ và Tên', businessNameLabel: 'Tên quán',
    emailLabel: 'Email', phoneLabel: 'Số Điện Thoại',
    cityLabel: 'Thành phố', msgLabel: 'Ghi chú thêm (tuỳ chọn)',
    namePlaceholder: 'Nguyễn Văn A', businessPlaceholder: 'Phở ABC',
    emailPlaceholder: 'owner@quan.com', phonePlaceholder: '0912 345 678',
    cityPlaceholder: 'Hồ Chí Minh',
    submit: 'Gửi đăng ký', submitting: 'Đang gửi...',
    backHome: 'Quay lại trang chủ',
    successTitle: 'Đã nhận đăng ký!',
    successMsg: 'Cảm ơn bạn đã đăng ký. Đội ngũ Ovenly sẽ liên hệ với bạn trong vòng 24 giờ.',
    benefits: [
      'Không mất phí cài đặt',
      'Hỗ trợ onboarding trực tiếp',
      'Nhận đơn và quản lý menu dễ dàng',
      'Tiếp cận khách hàng mới qua sàn LÒ ĐỒ ĂN',
    ],
  },
  en: {
    title: 'Grow your online sales today with Ovenly',
    subtitle: 'Fill in your details and our team will reach out to get you set up.',
    nameLabel: 'Full name', businessNameLabel: 'Restaurant name',
    emailLabel: 'Email', phoneLabel: 'Phone number',
    cityLabel: 'City', msgLabel: 'Additional notes (optional)',
    namePlaceholder: 'John Doe', businessPlaceholder: 'Pho ABC',
    emailPlaceholder: 'owner@restaurant.com', phonePlaceholder: '0912 345 678',
    cityPlaceholder: 'Ho Chi Minh City',
    submit: 'Submit registration', submitting: 'Submitting...',
    backHome: 'Back to home',
    successTitle: 'Registration received!',
    successMsg: 'Thank you for registering. The Ovenly team will contact you within 24 hours.',
    benefits: [
      'No setup fee',
      'Direct onboarding support',
      'Easy order and menu management',
      'Reach new customers through LÒ ĐỒ ĂN',
    ],
  },
};

export default function RegisterPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [form, setForm] = useState({ name: '', business_name: '', email: '', phone: '', city: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang];

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language');
    if (stored === 'vi' || stored === 'en') setLang(stored);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${RAILWAY}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone_number: form.phone,
          restaurant_name: form.business_name,
          city: form.city,
          message: `[RESTAURANT REGISTRATION]\nRestaurant: ${form.business_name}\nCity: ${form.city}\n${form.message ? `\nNote: ${form.message}` : ''}`,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <>
      <OvenlyNav lang={lang} setLang={setLang} />
      <div style={{ minHeight: '80vh', background: '#FAF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{ width: 72, height: 72, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle style={{ width: 36, height: 36, color: '#16a34a' }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 12 }}>{t.successTitle}</h2>
          <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, marginBottom: 32 }}>{t.successMsg}</p>
          <Link href="https://www.ovenly.io" style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            {t.backHome}
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .reg-pad { padding: 56px 40px; }
        @media (max-width: 768px) {
          .reg-grid { grid-template-columns: 1fr; gap: 32px; }
          .reg-pad { padding: 32px 20px; }
          .reg-benefits { display: none; }
        }
      `}</style>

      <OvenlyNav lang={lang} setLang={setLang} />

      <div style={{ background: '#FAF8F0', minHeight: '100vh' }}>
        <div className="reg-pad" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reg-grid">

            {/* Left — benefits */}
            <div className="reg-benefits">
              <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>
                {lang === 'vi' ? 'Đăng ký' : 'Register'}
              </p>
              <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#111', marginBottom: 16, letterSpacing: '-1px', lineHeight: 1.15 }}>
                {t.title}
              </h1>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 36 }}>{t.subtitle}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {t.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 24, height: 24, background: '#FDF0EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle style={{ width: 14, height: 14, color: PRIMARY }} />
                    </div>
                    <span style={{ fontSize: 15, color: '#444', fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)', border: '1px solid #E8E0D8' }}>

              {/* Mobile-only title */}
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                  {t.title}
                </h1>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 }}>{t.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'name', label: t.nameLabel, placeholder: t.namePlaceholder, type: 'text' },
                  { key: 'business_name', label: t.businessNameLabel, placeholder: t.businessPlaceholder, type: 'text' },
                  { key: 'email', label: t.emailLabel, placeholder: t.emailPlaceholder, type: 'email' },
                  { key: 'phone', label: t.phoneLabel, placeholder: t.phonePlaceholder, type: 'tel' },
                  { key: 'city', label: t.cityLabel, placeholder: t.cityPlaceholder, type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {field.label} *
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      style={{ width: '100%', border: '1px solid #E8E0D8', borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#FAFAFA' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {t.msgLabel}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={3}
                    placeholder={lang === 'vi' ? 'Ví dụ: Tôi muốn biết thêm về phí hoa hồng...' : 'e.g. I want to know more about commission fees...'}
                    style={{ width: '100%', border: '1px solid #E8E0D8', borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#FAFAFA' }}
                  />
                </div>
                {error && <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: PRIMARY, color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
                  {loading ? t.submitting : t.submit}
                </button>
                <p style={{ fontSize: 12, color: '#aaa', textAlign: 'center', margin: 0 }}>
                  {lang === 'vi' ? 'Bằng cách đăng ký bạn đồng ý với ' : 'By registering you agree to our '}
                  <Link href="/terms" style={{ color: PRIMARY, textDecoration: 'none' }}>{lang === 'vi' ? 'Điều Khoản' : 'Terms'}</Link>
                  {lang === 'vi' ? ' và ' : ' and '}
                  <Link href="/privacy" style={{ color: PRIMARY, textDecoration: 'none' }}>{lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SavingsCalculator lang={lang} />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #F0E8E0', padding: '32px 20px', background: '#FFFAF5', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
            <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 48, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any }} />
          </Link>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/about" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{lang === 'vi' ? 'Giới thiệu' : 'About'}</Link>
            <Link href="/contact" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{lang === 'vi' ? 'Liên hệ' : 'Contact'}</Link>
            <Link href="https://lodoan.vn" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>LÒ ĐỒ ĂN</Link>
          </div>
          <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™</p>
        </div>
      </footer>
    </>
  );
}
