'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/api';
import OvenlyNav from '@/components/OvenlyNav';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

export default function OvenlyContactPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [form, setForm] = useState({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isVI = lang === 'vi';
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm({ ...form, language: lang });
      setSuccess(true);
      setForm({ full_name: '', restaurant_name: '', phone_number: '', email: '', city: '', message: '' });
    } catch {
      alert(isVI ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', lineHeight: 1.6, minHeight: '100vh' }}>

      <OvenlyNav lang={lang} setLang={setLang} />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '72px 40px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 16 }}>
          {isVI ? 'Liên hệ' : 'Contact'}
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16 }}>
          {isVI ? 'Hợp tác cùng Ovenly' : 'Work with Ovenly'}
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 40 }}>
          {isVI
            ? 'Bạn là chủ quán muốn đưa quán lên trực tuyến, hay đối tác muốn hợp tác với Ovenly? Điền form và chúng tôi sẽ liên hệ trong vòng 24 giờ.'
            : 'Whether you are a restaurant owner looking to go online or a business looking to partner with Ovenly, fill out the form and we will get back to you within 24 hours.'}
        </p>

        <div style={{ background: '#fff', borderRadius: 20, padding: 40, border: `1px solid ${BORDER}` }}>
          {success ? (
            <div style={{ textAlign: 'center' as const, padding: '40px 0' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                {isVI ? 'Cảm ơn bạn!' : 'Thank you!'}
              </h3>
              <p style={{ color: '#555', marginBottom: 24 }}>
                {isVI ? 'Chúng tôi sẽ liên hệ trong vòng 24 giờ.' : 'We will be in touch within 24 hours.'}
              </p>
              <button onClick={() => setSuccess(false)} style={{ background: PRIMARY, color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {isVI ? 'Gửi thêm' : 'Send another'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              {[
                { key: 'full_name', label: isVI ? 'Họ và tên' : 'Full name', required: true },
                { key: 'restaurant_name', label: isVI ? 'Tên công ty / quán' : 'Company / restaurant name', required: true },
                { key: 'phone_number', label: isVI ? 'Số điện thoại' : 'Phone number', required: false },
                { key: 'email', label: 'Email', required: true, type: 'email' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                    {field.label}{field.required ? ' *' : ''}
                  </label>
                  <input
                    type={field.type || 'text'}
                    required={field.required}
                    value={(form as any)[field.key]}
                    onChange={e => update(field.key, e.target.value)}
                    style={{ width: '100%', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit', background: '#fff' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                  {isVI ? 'Nội dung liên hệ' : 'How can we help'} *
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  rows={4}
                  placeholder={isVI ? 'Mô tả ngắn gọn nhu cầu của bạn...' : 'Briefly describe what you are looking for...'}
                  style={{ width: '100%', border: `1px solid ${BORDER}`, borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', resize: 'none' as const, boxSizing: 'border-box' as const, fontFamily: 'inherit' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ background: PRIMARY, color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: 8 }}>
                {loading ? (isVI ? 'Đang gửi...' : 'Sending...') : (isVI ? 'Gửi yêu cầu' : 'Send inquiry')}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '40px', background: BG, textAlign: 'center' as const }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16 }}>
          <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
            <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 52, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any }} />
          </Link>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/about" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{isVI ? 'Giới thiệu' : 'About'}</Link>
            <Link href="https://lodoan.vn" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>LÒ ĐỒ ĂN</Link>
          </div>
          <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™</p>
        </div>
      </footer>
    </div>
  );
}