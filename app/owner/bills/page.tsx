'use client';

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

export default function OwnerBillsPage() {
  const [lang, setLang] = useState('vi');
  useEffect(() => { setLang(localStorage.getItem('owner_lang') || 'vi'); const onLang = (e: any) => setLang(e.detail); window.addEventListener('owner-lang-change', onLang); return () => window.removeEventListener('owner-lang-change', onLang); }, []);

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-bold text-xl text-gray-900">{lang === 'vi' ? 'Hóa Đơn' : 'Bills'}</h2>
      <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="font-bold text-gray-900 mb-2">
          {lang === 'vi' ? 'Sao Kê Hoa Hồng' : 'Commission Statements'}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          {lang === 'vi'
            ? 'Sao kê hoa hồng hàng tháng sẽ được gửi tự động qua email vào đầu mỗi tháng. Để xem lại sao kê cũ hoặc có thắc mắc về hóa đơn, vui lòng liên hệ hello@ovenly.io.'
            : 'Monthly commission statements are sent automatically by email at the start of each month. To review past statements or for billing inquiries, please contact hello@ovenly.io.'}
        </p>
        <a href="mailto:hello@ovenly.io"
          className="inline-block mt-4 bg-primary text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
          hello@ovenly.io
        </a>
      </div>
    </div>
  );
}