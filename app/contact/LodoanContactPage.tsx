'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/api';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function LodoanContactPage() {
  const [lang, setLang] = useState('vi');
  const [form, setForm] = useState({ full_name: '', order_number: '', phone_number: '', email: '', issue_type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  const isVI = lang === 'vi';
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const issueTypes = isVI
    ? ['Vấn đề về thanh toán', 'Đơn hàng chưa được xác nhận', 'Giao hàng trễ hoặc sai', 'Yêu cầu hoàn tiền', 'Khác']
    : ['Payment issue', 'Order not confirmed', 'Late or wrong delivery', 'Refund request', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm({ ...form, language: lang });
      setSuccess(true);
      setForm({ full_name: '', order_number: '', phone_number: '', email: '', issue_type: '', message: '' });
    } catch {
      alert(isVI ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'An error occurred. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="font-heading text-3xl font-black text-primary mb-2">
            {isVI ? 'Liên hệ hỗ trợ' : 'Customer support'}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {isVI
              ? 'Bạn có vấn đề với đơn hàng, thanh toán hoặc bất kỳ thắc mắc nào? Điền form bên dưới và chúng tôi sẽ phản hồi sớm nhất có thể.'
              : 'Having an issue with your order, payment or anything else? Fill out the form below and we will get back to you as soon as possible.'}
          </p>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <p className="text-green-700 font-semibold text-lg mt-4">
                {isVI ? 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.' : 'Thank you! We will be in touch soon.'}
              </p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-semibold text-primary hover:underline">
                {isVI ? 'Gửi thêm' : 'Send another'}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {isVI ? 'Họ và tên' : 'Full name'} *
                  </label>
                  <input required type="text" value={form.full_name} onChange={e => update('full_name', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {isVI ? 'Số điện thoại' : 'Phone number'}
                  </label>
                  <input type="text" value={form.phone_number} onChange={e => update('phone_number', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {isVI ? 'Mã đơn hàng' : 'Order number'}
                  </label>
                  <input type="text" value={form.order_number} onChange={e => update('order_number', e.target.value)}
                    placeholder={isVI ? 'Ví dụ: AB12CD34' : 'e.g. AB12CD34'}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {isVI ? 'Loại vấn đề' : 'Issue type'} *
                  </label>
                  <select required value={form.issue_type} onChange={e => update('issue_type', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="">{isVI ? 'Chọn loại vấn đề' : 'Select issue type'}</option>
                    {issueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {isVI ? 'Mô tả chi tiết' : 'Details'} *
                  </label>
                  <textarea required value={form.message} onChange={e => update('message', e.target.value)} rows={4}
                    placeholder={isVI ? 'Mô tả vấn đề của bạn...' : 'Describe your issue...'}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
                  {loading ? (isVI ? 'Đang gửi...' : 'Sending...') : (isVI ? 'Gửi yêu cầu' : 'Submit')}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}