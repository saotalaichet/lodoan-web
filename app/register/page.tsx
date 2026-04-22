'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

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
    backHome: 'Quay lại',
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
    backHome: 'Go back',
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
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({ name: '', business_name: '', email: '', phone: '', city: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    setLang(localStorage.getItem('ovenly_language') || 'vi');
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
    <div className="min-h-screen bg-[#FAF8F0] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-3 text-gray-900">{t.successTitle}</h2>
        <p className="text-gray-500 text-lg mb-8">{t.successMsg}</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> {t.backHome}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <OvenlyNav lang={lang as 'vi' | 'en'} setLang={(l) => setLang(l)} />
      <div className="min-h-screen bg-[#FAF8F0]">
      <div className="max-w-5xl mx-auto px-4 py-12">


        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — benefits */}
          <div>
            <Link href="/" className="font-heading font-black text-primary text-2xl block mb-6">Ovenly</Link>
            <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4 leading-tight">{t.title}</h1>
            <p className="text-gray-500 text-lg mb-8">{t.subtitle}</p>
            <div className="space-y-3">
              {t.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-700 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: t.nameLabel, placeholder: t.namePlaceholder, type: 'text' },
                { key: 'business_name', label: t.businessNameLabel, placeholder: t.businessPlaceholder, type: 'text' },
                { key: 'email', label: t.emailLabel, placeholder: t.emailPlaceholder, type: 'email' },
                { key: 'phone', label: t.phoneLabel, placeholder: t.phonePlaceholder, type: 'tel' },
                { key: 'city', label: t.cityLabel, placeholder: t.cityPlaceholder, type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label} *</label>
                  <input type={field.type} required
                    placeholder={field.placeholder}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.msgLabel}</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  rows={3} placeholder={lang === 'vi' ? 'Ví dụ: Tôi muốn biết thêm về phí hoa hồng...' : 'e.g. I want to know more about commission fees...'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 resize-none" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? t.submitting : t.submit}
              </button>
              <p className="text-xs text-gray-400 text-center">
                {lang === 'vi' ? 'Bằng cách đăng ký bạn đồng ý với ' : 'By registering you agree to our '}
                <Link href="/terms" className="text-primary hover:underline">{lang === 'vi' ? 'Điều Khoản' : 'Terms'}</Link>
                {lang === 'vi' ? ' và ' : ' and '}
                <Link href="/privacy" className="text-primary hover:underline">{lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <SavingsCalculator lang={lang as 'vi' | 'en'} />
    </>
  );
}