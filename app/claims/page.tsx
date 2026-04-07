'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PRIMARY = '#8B1A1A';

export default function ClaimsPage() {
  const [lang, setLang] = useState('vi');
  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(30,20%,97%)' }}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
            <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
            <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
              style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
          </div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black mb-8" style={{ color: PRIMARY }}>
          {lang === 'vi' ? 'Giải Quyết Khiếu Nại' : 'Dispute Resolution'}
        </h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {lang === 'vi' ? (
            <>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Quy Trình Khiếu Nại</h2><p>Chúng tôi cam kết giải quyết mọi khiếu nại một cách công bằng và nhanh chóng. Để gửi khiếu nại, vui lòng liên hệ qua email <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a> với tiêu đề "Khiếu Nại - [Mã Đơn Hàng]".</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Thời Gian Xử Lý</h2><p>Chúng tôi cam kết phản hồi trong vòng 24 giờ làm việc và giải quyết hoàn toàn trong vòng 7 ngày làm việc kể từ khi nhận được khiếu nại đầy đủ thông tin.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Các Trường Hợp Được Hỗ Trợ</h2><p>Chúng tôi hỗ trợ giải quyết các vấn đề: đơn hàng bị giao sai, thực phẩm không đảm bảo chất lượng, vấn đề thanh toán, và các tình huống bất thường khác.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Chính Sách Hoàn Tiền</h2><p>Hoàn tiền sẽ được xem xét tùy từng trường hợp. Nếu được chấp thuận, hoàn tiền sẽ được xử lý trong vòng 3-5 ngày làm việc qua phương thức thanh toán ban đầu.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Liên Hệ Trực Tiếp</h2><p>Email: <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a><br/>Giờ làm việc: 8:00 - 22:00, Thứ Hai - Chủ Nhật</p></section>
            </>
          ) : (
            <>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Claims Process</h2><p>We are committed to resolving all complaints fairly and promptly. To submit a claim, please contact us at <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a> with the subject "Claim - [Order ID]".</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Processing Time</h2><p>We commit to responding within 24 business hours and fully resolving within 7 business days from receipt of complete claim information.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Supported Cases</h2><p>We support resolving: incorrect orders, food quality issues, payment problems, and other unusual situations.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Refund Policy</h2><p>Refunds are considered case by case. If approved, refunds will be processed within 3-5 business days via the original payment method.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Direct Contact</h2><p>Email: <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a><br/>Hours: 8:00 AM - 10:00 PM, Monday - Sunday</p></section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}