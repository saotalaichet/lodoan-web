'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="font-heading text-3xl font-black text-primary mb-8">{lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}</h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-sm text-gray-400">{lang === 'vi' ? 'Cập nhật lần cuối: Tháng 1 năm 2025' : 'Last updated: January 2025'}</p>
          {lang === 'vi' ? (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Thông Tin Chúng Tôi Thu Thập</h2><p>Chúng tôi thu thập thông tin bạn cung cấp trực tiếp (tên, email, số điện thoại, địa chỉ giao hàng), thông tin đơn hàng và lịch sử giao dịch, dữ liệu sử dụng và thông tin thiết bị, và vị trí địa lý khi bạn cho phép.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Cách Chúng Tôi Sử Dụng Thông Tin</h2><p>Thông tin của bạn được sử dụng để xử lý và giao hàng đơn hàng, liên lạc về đơn hàng và dịch vụ, cải thiện trải nghiệm người dùng, tuân thủ các yêu cầu pháp lý, và ngăn chặn gian lận.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Chia Sẻ Thông Tin</h2><p>Chúng tôi chia sẻ thông tin cần thiết với nhà hàng đối tác để hoàn thành đơn hàng và với đối tác thanh toán để xử lý giao dịch. Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Bảo Mật Dữ Liệu</h2><p>Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn, bao gồm mã hóa SSL và kiểm soát truy cập nghiêm ngặt.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Quyền Của Bạn</h2><p>Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a>.</p></section>
          </>) : (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Information We Collect</h2><p>We collect information you provide directly (name, email, phone, delivery address), order information and transaction history, usage data and device information, and geographic location when you permit.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. How We Use Information</h2><p>Your information is used to process and fulfill orders, communicate about orders and services, improve user experience, comply with legal requirements, and prevent fraud.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Information Sharing</h2><p>We share necessary information with partner restaurants to complete orders and with payment partners to process transactions. We do not sell your personal information to third parties.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Data Security</h2><p>We use industry-standard security measures to protect your information, including SSL encryption and strict access controls.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Your Rights</h2><p>You have the right to access, correct, or delete your personal information at any time by contacting us at <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a>.</p></section>
          </>)}
        </div>
      </div>
    </div>
  );
}