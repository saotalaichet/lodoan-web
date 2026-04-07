'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PRIMARY = '#8B1A1A';

export default function TermsPage() {
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
          {lang === 'vi' ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
        </h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-sm text-gray-400">{lang === 'vi' ? 'Cập nhật lần cuối: Tháng 1 năm 2025' : 'Last updated: January 2025'}</p>
          {lang === 'vi' ? (
            <>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Chấp Nhận Điều Khoản</h2><p>Bằng cách sử dụng nền tảng LÒ ĐỒ ĂN ("Nền tảng"), bạn đồng ý bị ràng buộc bởi các Điều Khoản Dịch Vụ này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng Nền tảng.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Mô Tả Dịch Vụ</h2><p>LÒ ĐỒ ĂN là nền tảng đặt hàng thực phẩm trực tuyến kết nối khách hàng với các nhà hàng đối tác. Chúng tôi tạo điều kiện thuận lợi cho việc đặt hàng nhưng không phải là bên bán hàng trực tiếp. Các nhà hàng chịu trách nhiệm về chất lượng thực phẩm và giao hàng.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Tài Khoản Người Dùng</h2><p>Bạn có thể tạo tài khoản để trải nghiệm đầy đủ tính năng. Bạn chịu trách nhiệm duy trì tính bảo mật của tài khoản và thông báo cho chúng tôi ngay lập tức nếu có bất kỳ sử dụng trái phép nào. Bạn phải cung cấp thông tin chính xác và cập nhật khi đăng ký.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Đặt Hàng và Thanh Toán</h2><p>Tất cả đơn hàng phải được xác nhận bởi nhà hàng. Giá cả được hiển thị bằng đồng Việt Nam (VNĐ) và có thể thay đổi. Thanh toán được xử lý an toàn thông qua các đối tác thanh toán được ủy quyền. Hoàn tiền tuân theo chính sách của từng nhà hàng.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Hành Vi Bị Cấm</h2><p>Bạn đồng ý không sử dụng Nền tảng cho bất kỳ mục đích bất hợp pháp, cung cấp thông tin sai lệch, cố gắng truy cập trái phép vào hệ thống của chúng tôi, hoặc tham gia vào bất kỳ hành vi nào có thể gây hại cho người dùng khác hoặc nhà hàng đối tác.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Giới Hạn Trách Nhiệm</h2><p>LÒ ĐỒ ĂN không chịu trách nhiệm về chất lượng thực phẩm, thời gian giao hàng, hoặc bất kỳ thiệt hại nào phát sinh từ việc sử dụng dịch vụ của các nhà hàng đối tác. Trách nhiệm của chúng tôi được giới hạn ở mức tối đa theo luật pháp Việt Nam.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">7. Liên Hệ</h2><p>Nếu bạn có câu hỏi về Điều Khoản Dịch Vụ này, vui lòng liên hệ: <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a></p></section>
            </>
          ) : (
            <>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Acceptance of Terms</h2><p>By using the LÒ ĐỒ ĂN platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to any terms, please do not use the Platform.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Service Description</h2><p>LÒ ĐỒ ĂN is an online food ordering platform connecting customers with partner restaurants. We facilitate ordering but are not the direct seller. Restaurants are responsible for food quality and delivery.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. User Accounts</h2><p>You may create an account for full features. You are responsible for maintaining account security and notifying us immediately of any unauthorized use. You must provide accurate information when registering.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Orders and Payments</h2><p>All orders must be confirmed by the restaurant. Prices are in Vietnamese Dong (VND) and may change. Payments are securely processed through authorized payment partners. Refunds follow each restaurant's policy.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Prohibited Conduct</h2><p>You agree not to use the Platform for any illegal purpose, provide false information, attempt unauthorized access to our systems, or engage in any conduct that may harm other users or partner restaurants.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Limitation of Liability</h2><p>LÒ ĐỒ ĂN is not responsible for food quality, delivery times, or any damages arising from the use of partner restaurant services. Our liability is limited to the maximum extent permitted by Vietnamese law.</p></section>
              <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">7. Contact</h2><p>If you have questions about these Terms, please contact: <a href="mailto:hello@ovenly.io" className="underline" style={{ color: PRIMARY }}>hello@ovenly.io</a></p></section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}