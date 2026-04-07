'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SecurityPage() {
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
        <h1 className="font-heading text-3xl font-black text-primary mb-8">{lang === 'vi' ? 'An Toàn Thông Tin' : 'Information Security'}</h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {lang === 'vi' ? (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Cam Kết Bảo Mật</h2><p>LÒ ĐỒ ĂN cam kết bảo vệ thông tin và dữ liệu cá nhân của người dùng theo các tiêu chuẩn bảo mật cao nhất.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Mã Hóa Dữ Liệu</h2><p>Tất cả dữ liệu truyền tải được mã hóa bằng SSL/TLS. Thông tin thanh toán được xử lý bởi các đối tác thanh toán được chứng nhận PCI DSS.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Kiểm Soát Truy Cập</h2><p>Chúng tôi áp dụng nguyên tắc đặc quyền tối thiểu — chỉ những nhân viên được ủy quyền mới có thể truy cập dữ liệu người dùng.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Báo Cáo Lỗ Hổng Bảo Mật</h2><p>Nếu bạn phát hiện lỗ hổng bảo mật, vui lòng báo cáo cho chúng tôi qua <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a>. Chúng tôi cam kết phản hồi trong vòng 24 giờ.</p></section>
          </>) : (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Security Commitment</h2><p>LÒ ĐỒ ĂN is committed to protecting user information and personal data according to the highest security standards.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Data Encryption</h2><p>All transmitted data is encrypted with SSL/TLS. Payment information is processed by PCI DSS certified payment partners.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Access Control</h2><p>We apply the principle of least privilege — only authorized employees can access user data.</p></section>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Vulnerability Reporting</h2><p>If you discover a security vulnerability, please report it to <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a>. We commit to responding within 24 hours.</p></section>
          </>)}
        </div>
      </div>
    </div>
  );
}