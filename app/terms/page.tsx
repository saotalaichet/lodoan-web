'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TermsPage() {
  const [lang, setLang] = useState('vi');
  useEffect(() => { const s = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi'; setLang(s); }, []);
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black text-primary mb-8">{lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}</h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-sm text-gray-400">{lang === 'vi' ? 'Cập nhật lần cuối: Tháng 1 năm 2025' : 'Last updated: January 2025'}</p>
          {lang === 'vi' ? (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Chấp Nhận Điều Khoản</h2><p>Bằng cách sử dụng nền tảng LÒ ĐỒ ĂN ("Nền tảng"), bạn đồng ý bị ràng buộc bởi các Điều Khoản Dịch Vụ này.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Mô Tả Dịch Vụ</h2><p>LÒ ĐỒ ĂN là nền tảng đặt hàng thực phẩm trực tuyến kết nối khách hàng với các nhà hàng đối tác. Chúng tôi tạo điều kiện thuận lợi cho việc đặt hàng nhưng không phải là bên bán hàng trực tiếp.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Tài Khoản Người Dùng</h2><p>Bạn có thể tạo tài khoản để trải nghiệm đầy đủ tính năng. Bạn chịu trách nhiệm duy trì tính bảo mật của tài khoản và thông báo cho chúng tôi ngay lập tức nếu có bất kỳ sử dụng trái phép nào.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Đặt Hàng và Thanh Toán</h2><p>Tất cả đơn hàng phải được xác nhận bởi nhà hàng. Giá cả được hiển thị bằng đồng Việt Nam (VNĐ). Hoàn tiền tuân theo chính sách của từng nhà hàng.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Hành Vi Bị Cấm</h2><p>Bạn đồng ý không sử dụng Nền tảng cho bất kỳ mục đích bất hợp pháp hoặc gây hại cho người dùng khác hay nhà hàng đối tác.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Liên Hệ</h2><p>Nếu bạn có câu hỏi, vui lòng liên hệ: <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p></section>
          </>) : (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Acceptance of Terms</h2><p>By using the LÒ ĐỒ ĂN platform, you agree to be bound by these Terms of Service.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Service Description</h2><p>LÒ ĐỒ ĂN is an online food ordering platform connecting customers with partner restaurants. We facilitate ordering but are not the direct seller.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. User Accounts</h2><p>You may create an account for full features. You are responsible for maintaining account security and notifying us immediately of any unauthorized use.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Orders and Payments</h2><p>All orders must be confirmed by the restaurant. Prices are in Vietnamese Dong (VND). Refunds follow each restaurant's policy.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Prohibited Conduct</h2><p>You agree not to use the Platform for any illegal purpose or conduct that may harm other users or partner restaurants.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Contact</h2><p>If you have questions, please contact: <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p></section>
          </>)}
        </div>
      </div>
    </div>
  );
}