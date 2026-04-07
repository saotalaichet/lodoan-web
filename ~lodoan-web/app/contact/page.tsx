'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/api';

export default function ContactPage() {
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  const T = {
    vi: { title: 'Liên Hệ', fullName: 'Họ và Tên', restaurantName: 'Tên nhà hàng (nếu có)', phone: 'Số Điện Thoại', email: 'Email', city: 'Thành Phố', message: 'Tin Nhắn', send: 'Gửi', sending: 'Đang gửi...', success: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.', sendAnother: 'Gửi thêm' },
    en: { title: 'Contact Us', fullName: 'Full Name', restaurantName: 'Restaurant name (optional)', phone: 'Phone Number', email: 'Email', city: 'City', message: 'Message', send: 'Send', sending: 'Sending...', success: 'Thank you! We will be in touch soon.', sendAnother: 'Send another' },
  };
  const t = T[lang as keyof typeof T];
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm({ ...form, language: lang });
      setSuccess(true);
      setForm({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
    } catch {
      alert(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-primary text-lg">LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500'}`}>VI</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500'}`}>EN</button>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black text-primary mb-6">{t.title}</h1>
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <span className="text-4xl">✅</span>
            <p className="text-green-700 font-semibold text-lg mt-4">{t.success}</p>
            <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-semibold text-primary hover:underline">{t.sendAnother}</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'full_name', label: t.fullName, required: true },
                { key: 'restaurant_name', label: t.restaurantName, required: false },
                { key: 'phone_number', label: t.phone, required: false },
                { key: 'email', label: t.email, required: true, type: 'email' },
                { key: 'city', label: t.city, required: false },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}{field.required ? ' *' : ''}</label>
                  <input type={field.type || 'text'} required={field.required} value={(form as any)[field.key]} onChange={e => update(field.key, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.message} *</label>
                <textarea required value={form.message} onChange={e => update('message', e.target.value)} rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
                {loading ? t.sending : t.send}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}