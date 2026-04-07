'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRIMARY = '#8B1A1A';
const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const BASE44_HEADERS = { 'api-key': process.env.NEXT_PUBLIC_BASE44_API_KEY!, 'Content-Type': 'application/json' };

const T = {
  vi: { title: 'Liên Hệ', fullName: 'Họ và Tên', restaurantName: 'Tên nhà hàng (nếu có)', phone: 'Số Điện Thoại', email: 'Email', city: 'Thành Phố', message: 'Tin Nhắn', send: 'Gửi', sending: 'Đang gửi...', success: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.', sendAnother: 'Gửi thêm' },
  en: { title: 'Contact Us', fullName: 'Full Name', restaurantName: 'Restaurant name (optional)', phone: 'Phone Number', email: 'Email', city: 'City', message: 'Message', send: 'Send', sending: 'Sending...', success: 'Thank you! We will be in touch soon.', sendAnother: 'Send another' },
};

export default function ContactPage() {
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const t = T[lang as keyof typeof T];
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await fetch(`${BASE44_URL}/entities/ContactSubmission`, {
        method: 'POST', headers: BASE44_HEADERS,
        body: JSON.stringify({ ...form, language: lang }),
      });
      setSuccess(true);
      setForm({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
    } catch {
      setError(lang === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all" style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all" style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-6" style={{ color: PRIMARY }}>{t.title}</h1>
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <span className="text-4xl">✅</span>
            <p className="text-green-700 font-semibold text-lg mt-4">{t.success}</p>
            <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-semibold hover:underline" style={{ color: PRIMARY }}>{t.sendAnother}</button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8">
            {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4"><p className="text-sm text-red-600">⚠️ {error}</p></div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'full_name', label: t.fullName, required: true },
                { key: 'restaurant_name', label: t.restaurantName, required: false },
                { key: 'phone_number', label: t.phone, required: false },
                { key: 'email', label: t.email, required: true, type: 'email' },
                { key: 'city', label: t.city, required: false },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{field.label}{field.required ? ' *' : ''}</label>
                  <input type={field.type || 'text'} required={field.required} value={form[field.key as keyof typeof form]} onChange={e => update(field.key, e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t.message} *</label>
                <textarea required value={form.message} onChange={e => update('message', e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-opacity hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: PRIMARY }}>
                {loading ? t.sending : t.send}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}