'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

export default function LodoanAboutPage() {
  const { lang } = useMarketplaceLang();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="font-heading text-3xl font-black text-primary mb-6">
            {lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}
          </h1>
          
          <div className="bg-white rounded-2xl p-8 mb-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {lang === 'vi'
                ? 'LÒ ĐỒ ĂN là nền tảng khám phá ẩm thực do Ovenly vận hành — kết nối thực khách với những nhà hàng tuyệt vời nhất tại Việt Nam.'
                : 'LÒ ĐỒ ĂN is a food discovery marketplace powered by Ovenly — connecting diners with the best local restaurants in Vietnam.'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {lang === 'vi'
                ? 'Các nhà hàng đối tác sử dụng hệ thống đặt hàng trực tuyến của Ovenly để tiếp nhận và quản lý đơn hàng từ khách hàng một cách hiệu quả và chuyên nghiệp.'
                : "Restaurant partners use Ovenly's online ordering system to receive and manage customer orders efficiently and professionally."}
            </p>
          </div>
          
          <div className="bg-primary text-white rounded-2xl p-8 mb-6">
            <h2 className="font-bold text-xl mb-3">
              {lang === 'vi' ? 'Đối tác nhà hàng' : 'Restaurant Partners'}
            </h2>
            <p className="text-white/90 leading-relaxed">
              {lang === 'vi'
                ? 'Bạn là chủ nhà hàng và muốn tham gia LÒ ĐỒ ĂN? Chúng tôi cung cấp hệ thống đặt hàng trực tuyến, quản lý thực đơn, và theo dõi đơn hàng theo thời gian thực.'
                : 'Are you a restaurant owner and want to join LÒ ĐỒ ĂN? We provide an online ordering system, menu management, and real-time order tracking.'}
            </p>
            <Link 
              href="/contact" 
              className="inline-block mt-4 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {lang === 'vi' ? 'Liên hệ ngay' : 'Contact Us'}
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🍜', vi: 'Nhà hàng đối tác', en: 'Partner restaurants' },
              { icon: '⭐', vi: 'Đánh giá 5 sao', en: '5-star reviews' },
              { icon: '🚀', vi: 'Giao hàng nhanh', en: 'Fast delivery' },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-4 text-center" 
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  {lang === 'vi' ? item.vi : item.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}