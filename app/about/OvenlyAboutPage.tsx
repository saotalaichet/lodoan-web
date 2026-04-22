'use client';
import { useState } from 'react';
import Link from 'next/link';
import OvenlyNav from '@/components/OvenlyNav';
import SavingsCalculator from '@/components/SavingsCalculator';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

export default function OvenlyAboutPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  const isVI = lang === 'vi';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', lineHeight: 1.6 }}>
      <OvenlyNav lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 72px', textAlign: 'center' as const }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.06, marginBottom: 28, maxWidth: 820, margin: '0 auto 28px' }}>
          {isVI ? 'Chúng tôi giúp quán ăn Việt Nam phát triển' : 'We help Vietnamese restaurants thrive'}
        </h1>
        <p style={{ fontSize: 18, color: '#555', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>
          {isVI
            ? 'Ovenly được xây dựng để giúp chủ quán F&B tự chủ kinh doanh trực tuyến. Nhận đơn trực tiếp từ khách hàng, giảm chi phí và tăng doanh thu mà không cần phụ thuộc vào các nền tảng lớn.'
            : 'Ovenly was built to help F&B business owners take control of their online business. Accept orders directly from customers, reduce costs and grow revenue without relying on large third-party platforms.'}
        </p>
      </section>

      {/* Problem section */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 20 }}>
              {isVI ? 'Vấn đề' : 'The problem'}
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 24 }}>
              {isVI ? 'Phí hoa hồng đang ăn mòn lợi nhuận của bạn' : 'Commission fees are eating your profits'}
            </h2>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.85, marginBottom: 20 }}>
              {isVI
                ? 'Khi đặt hàng trực tuyến ngày càng phổ biến, các nền tảng giao đồ ăn lớn bắt đầu thu phí hoa hồng cao từ mỗi đơn hàng. Điều này khiến chủ quán phải đối mặt với một lựa chọn khó: chấp nhận lỗ hoặc tăng giá cho khách hàng.'
                : 'As online ordering grew, large food delivery platforms began charging high commissions on every order. This put restaurant owners in a difficult position: absorb the losses or raise prices for customers.'}
            </p>
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.85 }}>
              {isVI
                ? 'Chúng tôi xây dựng Ovenly để thay đổi điều đó. Một nền tảng thực sự đứng về phía chủ quán.'
                : 'We built Ovenly to change that. A platform that truly stands on the side of restaurant owners.'}
            </p>
          </div>
          <div style={{ background: BG, borderRadius: 20, padding: '48px 40px', border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 48, fontWeight: 800, color: PRIMARY, margin: '0 0 8px', letterSpacing: '-2px' }}>25-30%</p>
            <p style={{ fontSize: 15, color: '#888', marginBottom: 40 }}>
              {isVI ? 'phí hoa hồng trung bình của các nền tảng lớn' : 'average commission from large platforms'}
            </p>
            <p style={{ fontSize: 48, fontWeight: 800, color: '#111', margin: '0 0 8px', letterSpacing: '-2px' }}>100%</p>
            <p style={{ fontSize: 15, color: '#888' }}>
              {isVI ? 'quyền kiểm soát thực đơn và khách hàng của bạn với Ovenly' : 'control over your menu and customers with Ovenly'}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 20 }}>
          {isVI ? 'Những gì chúng tôi tin' : 'What we stand for'}
        </p>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 48, maxWidth: 500 }}>
          {isVI ? 'Chủ quán xứng đáng được đối xử tốt hơn' : 'Restaurant owners deserve better'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            {
              title: isVI ? 'Chủ quán làm chủ' : 'Owners own their channel',
              text: isVI ? 'Kênh bán hàng của bạn là của bạn. Không ai có quyền lấy đi khách hàng mà bạn đã xây dựng.' : 'Your sales channel belongs to you. No one should be able to take away the customers you have built.',
            },
            {
              title: isVI ? 'Công nghệ dễ dùng' : 'Technology made simple',
              text: isVI ? 'Công nghệ tốt nhất là công nghệ bạn không cần phải lo lắng. Chúng tôi lo phần kỹ thuật để bạn tập trung vào nấu ăn.' : 'The best technology is the kind you never worry about. We handle the tech so you can focus on cooking.',
            },
            {
              title: isVI ? 'Minh bạch' : 'Transparent',
              text: isVI ? 'Không có phí ẩn. Không có điều khoản phức tạp. Bạn biết chính xác bạn đang trả gì và nhận lại được gì.' : 'No hidden fees. No complicated terms. You know exactly what you are paying and what you get in return.',
            },
            {
              title: isVI ? 'Cùng phát triển' : 'We grow together',
              text: isVI ? 'Thành công của chúng tôi phụ thuộc vào thành công của bạn. Chúng tôi chỉ thực sự phát triển khi quán của bạn phát triển.' : 'Our success depends on your success. We only truly grow when your restaurant grows.',
            },
          ].map((v, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#111' }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8, margin: 0 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder quote */}
      <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px', textAlign: 'center' as const }}>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#111', lineHeight: 1.5, marginBottom: 32, maxWidth: 700, margin: '0 auto 32px' }}>
            {isVI
              ? '"Trước khi có Ovenly, các chủ quán không có lựa chọn nào khác ngoài việc phụ thuộc vào các nền tảng lớn để bán hàng trực tuyến. Chúng tôi xây dựng Ovenly để thay đổi điều đó."'
              : '"Before Ovenly, restaurant owners had no real choice but to depend on large platforms to sell online. We built Ovenly to change that."'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#FDF0EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: PRIMARY }}>T</span>
            </div>
            <div style={{ textAlign: 'left' as const }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: 0 }}>Trần Trọng Nghĩa</p>
              <p style={{ fontSize: 13, color: '#888', margin: 0 }}>{isVI ? 'Nhà sáng lập & CEO, Ovenly' : 'Founder & CEO, Ovenly'}</p>
            </div>
          </div>
        </div>
      </section>

      <SavingsCalculator lang={lang} />

      {/* CTA */}
      <section style={{ background: PRIMARY }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px', textAlign: 'center' as const }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-1px' }}>
            {isVI ? 'Sẵn sàng đưa quán lên trực tuyến?' : 'Ready to take your restaurant online?'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>
            {isVI ? 'Liên hệ với chúng tôi và quán của bạn sẽ hoạt động trong vòng một tuần.' : 'Get in touch and your restaurant will be live within a week.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {isVI ? 'Đăng ký ngay' : 'Get started'} →
            </Link>
            <Link href="/contact" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 28px', borderRadius: 10, fontSize: 15, textDecoration: 'none' }}>
              {isVI ? 'Liên hệ' : 'Contact us'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '40px', background: BG, textAlign: 'center' as const }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16 }}>
          <Link href="https://www.ovenly.io" style={{ textDecoration: 'none' }}>
            <img src="https://i.postimg.cc/Mvp7DzmH/logo-3.png" alt="Ovenly" style={{ height: 52, width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' as any }} />
          </Link>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/contact" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>{isVI ? 'Liên hệ' : 'Contact'}</Link>
            <Link href="https://lodoan.vn" style={{ fontSize: 14, color: '#888', textDecoration: 'none' }}>LÒ ĐỒ ĂN</Link>
          </div>
          <p style={{ fontSize: 14, color: '#aaa', margin: 0 }}>© 2026 Ovenly™</p>
        </div>
      </footer>
    </div>
  );
}