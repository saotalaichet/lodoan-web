'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

const T = {
  vi: {
    pageTitle: 'Giới thiệu',
    hero: 'Đưa quán ăn yêu thích đến gần bạn hơn.',
    heroSub: 'Một sàn đặt món mới tại Việt Nam, được hỗ trợ bởi Ovenly Software.',
    bodyTitle: 'Một cách đơn giản để đặt món.',
    body1: 'LÒ ĐỒ ĂN là nơi bạn khám phá và đặt món từ các quán ăn, café và quán trà sữa địa phương trên khắp Việt Nam. Một danh sách quán được chọn lọc, đánh giá có thật từ khách đã đặt hàng, và quy trình đặt món gọn gàng.',
    body2: 'Chúng tôi tập trung vào trải nghiệm thay vì khuyến mãi ồn ào. Mỗi nhà hàng giữ thực đơn, giá và cách phục vụ riêng. Bạn nhận được những gì bạn thấy.',
    pullLine: 'Khám phá. Đặt món. Thưởng thức.',
    contactTitle: 'Liên hệ',
    contactCopy: 'Có câu hỏi hoặc phản hồi? Chúng tôi luôn lắng nghe.',
    contactCta: 'Liên hệ với chúng tôi',
    legalTerms: 'Điều khoản',
    legalPrivacy: 'Bảo mật',
  },
  en: {
    pageTitle: 'About',
    hero: 'Bringing your favorite local restaurants closer.',
    heroSub: 'A new food marketplace in Vietnam, backed by Ovenly Software.',
    bodyTitle: 'A simpler way to order.',
    body1: 'LÒ ĐỒ ĂN is where you discover and order from local restaurants, cafés, and bubble tea shops across Vietnam. A curated lineup, verified reviews from customers who actually ordered, and a clean ordering flow.',
    body2: 'We focus on the experience instead of loud promotions. Each restaurant keeps its own menu, pricing, and service. You get what you see.',
    pullLine: 'Discover. Order. Enjoy.',
    contactTitle: 'Contact',
    contactCopy: 'Questions or feedback? We are always listening.',
    contactCta: 'Get in touch',
    legalTerms: 'Terms',
    legalPrivacy: 'Privacy',
  },
};

export default function LodoanAboutPage() {
  const { lang } = useMarketplaceLang();
  const t = T[lang === 'en' ? 'en' : 'vi'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
            {t.pageTitle}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
            {t.hero}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {t.heroSub}
          </p>
        </section>

        <section className="bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {t.bodyTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-[1.7] mb-6">
              {t.body1}
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-[1.7]">
              {t.body2}
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
          <p className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-primary leading-[1.1] tracking-tight">
            {t.pullLine}
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {t.contactTitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-[1.7] mb-6">
            {t.contactCopy}
          </p>
          <Link
            href="/contact"
            className="inline-block text-base font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            {t.contactCta} →
          </Link>
          <div className="mt-12 pt-8 border-t border-gray-100 flex gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              {t.legalTerms}
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              {t.legalPrivacy}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
