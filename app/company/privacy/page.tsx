'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OvenlyNav from '@/components/OvenlyNav';
import OvenlyFooter from '@/components/OvenlyFooter';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';

export default function OvenlyPrivacyPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored as 'vi' | 'en');
  }, []);

  const t = {
    title: { vi: 'Chính Sách Bảo Mật', en: 'Privacy Policy' },
    version: { vi: 'Có hiệu lực: Tháng 4 năm 2026', en: 'Effective: April 2026' },
    
    intro: {
      vi: 'CÔNG TY TNHH MTV OVENLY SOFTWARE ("Ovenly", "chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính Sách Bảo Mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng nền tảng Ovenly (ovenly.io) và sàn thương mại điện tử LÒ ĐỒ ĂN (lodoan.vn).',
      en: 'OVENLY SOFTWARE CO LIMITED ("Ovenly", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and protect your personal information when you use the Ovenly platform (ovenly.io) and LÒ ĐỒ ĂN e-commerce marketplace (lodoan.vn).'
    },

    s1_title: { vi: '1. THÔNG TIN CHÚNG TÔI THU THẬP', en: '1. INFORMATION WE COLLECT' },
    s2_title: { vi: '2. CÁCH CHÚNG TÔI SỬ DỤNG THÔNG TIN', en: '2. HOW WE USE INFORMATION' },
    s3_title: { vi: '3. CHIA SẺ VÀ TIẾT LỘ THÔNG TIN', en: '3. SHARING AND DISCLOSURE' },
    s4_title: { vi: '4. COOKIES VÀ CÔNG NGHỆ THEO DÕI', en: '4. COOKIES AND TRACKING TECHNOLOGIES' },
    s5_title: { vi: '5. BẢO MẬT DỮ LIỆU', en: '5. DATA SECURITY' },
    s6_title: { vi: '6. LƯU TRỮ DỮ LIỆU', en: '6. DATA RETENTION' },
    s7_title: { vi: '7. QUYỀN CỦA BẠN', en: '7. YOUR RIGHTS' },
    s8_title: { vi: '8. CHUYỂN GIAO DỮ LIỆU QUỐC TẾ', en: '8. INTERNATIONAL DATA TRANSFERS' },
    s9_title: { vi: '9. QUYỀN RIÊNG TƯ TRẺ EM', en: '9. CHILDREN\'S PRIVACY' },
    s10_title: { vi: '10. THAY ĐỔI CHÍNH SÁCH', en: '10. CHANGES TO POLICY' },
    s11_title: { vi: '11. LIÊN HỆ', en: '11. CONTACT US' },
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, minHeight: '100vh' }}>
      <OvenlyNav lang={lang} setLang={setLang} />
      
      <main style={{ padding: '80px 20px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: PRIMARY, marginBottom: 8 }}>
            {t.title[lang]}
          </h1>
          <p style={{ fontSize: 14, color: '#999', marginBottom: 32 }}>
            {t.version[lang]}
          </p>
          
          <div style={{ background: '#fff', borderRadius: 16, padding: 48, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 15, color: '#444', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* INTRODUCTION */}
              <section>
                <p style={{ marginBottom: 16 }}>{t.intro[lang]}</p>
                <div style={{ marginTop: 16, padding: 16, background: '#FEF2F2', border: `2px solid ${PRIMARY}`, borderRadius: 8 }}>
                  <p style={{ fontWeight: 700, color: PRIMARY, fontSize: 13 }}>
                    {lang === 'vi' 
                      ? 'BẰNG VIỆC SỬ DỤNG DỊCH VỤ, BẠN ĐỒNG Ý VỚI CÁC THỰC HÀNH MÔ TẢ TRONG CHÍNH SÁCH NÀY.'
                      : 'BY USING THE SERVICES, YOU AGREE TO THE PRACTICES DESCRIBED IN THIS POLICY.'}
                  </p>
                </div>
              </section>

              {/* 1. INFORMATION WE COLLECT */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s1_title[lang]}</h2>
                
                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  {lang === 'vi' ? '1.1 Thông tin bạn cung cấp:' : '1.1 Information you provide:'}
                </p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Thông tin tài khoản' : 'Account information'}:</strong> {lang === 'vi' 
                      ? 'Tên, email, số điện thoại, mật khẩu khi đăng ký tài khoản đối tác hoặc khách hàng.'
                      : 'Name, email, phone number, password when registering partner or customer account.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Thông tin kinh doanh (Đối tác)' : 'Business information (Partners)'}:</strong> {lang === 'vi'
                      ? 'Tên cơ sở, địa chỉ, giấy phép kinh doanh, thông tin ngân hàng, danh mục sản phẩm.'
                      : 'Business name, address, business license, bank information, product catalog.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Thông tin giao dịch' : 'Transaction information'}:</strong> {lang === 'vi'
                      ? 'Lịch sử đơn hàng, phương thức thanh toán, địa chỉ giao hàng.'
                      : 'Order history, payment methods, delivery addresses.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Thông tin liên lạc' : 'Communication information'}:</strong> {lang === 'vi'
                      ? 'Nội dung tin nhắn, email, phản hồi khách hàng.'
                      : 'Messages, emails, customer feedback.'}
                  </p>
                </div>

                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  {lang === 'vi' ? '1.2 Thông tin tự động thu thập:' : '1.2 Automatically collected information:'}
                </p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Dữ liệu thiết bị' : 'Device data'}:</strong> {lang === 'vi'
                      ? 'Địa chỉ IP, loại trình duyệt, hệ điều hành, ID thiết bị.'
                      : 'IP address, browser type, operating system, device ID.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Dữ liệu sử dụng' : 'Usage data'}:</strong> {lang === 'vi'
                      ? 'Trang truy cập, thời gian truy cập, hành vi điều hướng, tương tác với nền tảng.'
                      : 'Pages visited, access times, navigation behavior, platform interactions.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Dữ liệu vị trí' : 'Location data'}:</strong> {lang === 'vi'
                      ? 'Vị trí địa lý ước tính từ địa chỉ IP hoặc vị trí GPS (nếu được cho phép).'
                      : 'Approximate geographic location from IP address or GPS location (if permitted).'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Cookies và công nghệ tương tự' : 'Cookies and similar technologies'}:</strong> {lang === 'vi'
                      ? 'Xem Mục 4 để biết chi tiết.'
                      : 'See Section 4 for details.'}
                  </p>
                </div>

                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  {lang === 'vi' ? '1.3 Thông tin từ bên thứ ba:' : '1.3 Information from third parties:'}
                </p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Nhà cung cấp thanh toán (MoMo, ZaloPay, 2C2P, Google Pay, Apple Pay) để xác minh giao dịch.'
                      : 'Payment providers (MoMo, ZaloPay, 2C2P, Google Pay, Apple Pay) to verify transactions.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Dịch vụ phân tích bên thứ ba (Google Analytics) để hiểu cách sử dụng nền tảng.'
                      : 'Third-party analytics services (Google Analytics) to understand platform usage.'}
                  </p>
                </div>
              </section>

              {/* 2. HOW WE USE INFORMATION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s2_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi' ? 'Chúng tôi sử dụng thông tin của bạn để:' : 'We use your information to:'}</p>
                
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.1</strong> {lang === 'vi'
                      ? 'Cung cấp và duy trì Dịch Vụ - xử lý đơn hàng, thanh toán, giao hàng.'
                      : 'Provide and maintain Services - process orders, payments, deliveries.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.2</strong> {lang === 'vi'
                      ? 'Quản lý tài khoản - xác thực, hỗ trợ, bảo mật tài khoản.'
                      : 'Manage accounts - authentication, support, account security.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.3</strong> {lang === 'vi'
                      ? 'Xử lý thanh toán và khấu trừ thuế theo Nghị định 117/2025/NĐ-CP.'
                      : 'Process payments and tax withholding per Decree 117/2025/NĐ-CP.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.4</strong> {lang === 'vi'
                      ? 'Cải thiện Dịch Vụ - phân tích hành vi người dùng, tối ưu hóa trải nghiệm.'
                      : 'Improve Services - analyze user behavior, optimize experience.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.5</strong> {lang === 'vi'
                      ? 'Giao tiếp - gửi thông báo đơn hàng, cập nhật dịch vụ, hỗ trợ khách hàng.'
                      : 'Communicate - send order notifications, service updates, customer support.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.6</strong> {lang === 'vi'
                      ? 'Marketing - gửi khuyến mãi, tin tức sản phẩm (bạn có thể từ chối bất kỳ lúc nào).'
                      : 'Marketing - send promotions, product news (you can opt-out anytime).'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.7</strong> {lang === 'vi'
                      ? 'Tuân thủ pháp luật - đáp ứng yêu cầu pháp lý, ngăn chặn gian lận, bảo vệ quyền lợi.'
                      : 'Legal compliance - respond to legal requirements, prevent fraud, protect rights.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>2.8</strong> {lang === 'vi'
                      ? 'Phát hiện và ngăn chặn gian lận, lạm dụng, vi phạm an ninh.'
                      : 'Detect and prevent fraud, abuse, security violations.'}
                  </p>
                </div>
              </section>

              {/* 3. SHARING AND DISCLOSURE */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s3_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi' 
                  ? 'Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin với:'
                  : 'We do not sell your personal information. We may share information with:'}</p>
                
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    <strong>3.1 Đối tác kinh doanh:</strong> {lang === 'vi'
                      ? 'Thông tin đơn hàng được chia sẻ với nhà hàng để xử lý đơn hàng.'
                      : 'Order information shared with restaurants to process orders.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>3.2 {lang === 'vi' ? 'Nhà cung cấp dịch vụ' : 'Service providers'}:</strong>
                  </p>
                  <div style={{ paddingLeft: 20, marginBottom: 8 }}>
                    <p style={{ marginBottom: 4 }}>
                      • {lang === 'vi' ? 'Nhà cung cấp thanh toán (MoMo, ZaloPay, 2C2P, Google Pay, Apple Pay)' : 'Payment processors (MoMo, ZaloPay, 2C2P, Google Pay, Apple Pay)'}
                    </p>
                    <p style={{ marginBottom: 4 }}>
                      • {lang === 'vi' ? 'Dịch vụ lưu trữ dữ liệu (AWS, Railway)' : 'Data hosting services (AWS, Railway)'}
                    </p>
                    <p style={{ marginBottom: 4 }}>
                      • {lang === 'vi' ? 'Dịch vụ phân tích (Google Analytics)' : 'Analytics services (Google Analytics)'}
                    </p>
                    <p style={{ marginBottom: 4 }}>
                      • {lang === 'vi' ? 'Nhà cung cấp email và SMS' : 'Email and SMS providers'}
                    </p>
                  </div>
                  <p style={{ marginBottom: 8 }}>
                    <strong>3.3 {lang === 'vi' ? 'Yêu cầu pháp lý' : 'Legal requirements'}:</strong> {lang === 'vi'
                      ? 'Khi được yêu cầu bởi luật pháp, tòa án, cơ quan chính phủ có thẩm quyền.'
                      : 'When required by law, court order, competent government authority.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>3.4 {lang === 'vi' ? 'Bảo vệ quyền lợi' : 'Protect rights'}:</strong> {lang === 'vi'
                      ? 'Để thực thi Điều Khoản, điều tra gian lận, bảo vệ an ninh.'
                      : 'To enforce Terms, investigate fraud, protect security.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>3.5 {lang === 'vi' ? 'Giao dịch kinh doanh' : 'Business transactions'}:</strong> {lang === 'vi'
                      ? 'Trong trường hợp sáp nhập, mua bán, tái cơ cấu công ty.'
                      : 'In event of merger, acquisition, corporate restructuring.'}
                  </p>
                </div>
              </section>

              {/* 4. COOKIES */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s4_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Chúng tôi sử dụng cookies và công nghệ tương tự để:'
                  : 'We use cookies and similar technologies to:'}</p>
                
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Duy trì phiên đăng nhập và ghi nhớ tùy chọn của bạn' : 'Maintain login sessions and remember your preferences'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Hiểu cách bạn sử dụng nền tảng' : 'Understand how you use the platform'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Cải thiện hiệu suất và bảo mật' : 'Improve performance and security'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Cung cấp nội dung và quảng cáo được cá nhân hóa' : 'Deliver personalized content and advertising'}
                  </p>
                </div>

                <p style={{ marginBottom: 12, fontWeight: 600 }}>
                  {lang === 'vi' ? 'Loại cookies chúng tôi sử dụng:' : 'Types of cookies we use:'}
                </p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Cookies cần thiết' : 'Essential cookies'}:</strong> {lang === 'vi'
                      ? 'Bắt buộc cho hoạt động cơ bản của nền tảng (đăng nhập, bảo mật).'
                      : 'Required for basic platform operation (login, security).'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Cookies chức năng' : 'Functional cookies'}:</strong> {lang === 'vi'
                      ? 'Ghi nhớ tùy chọn của bạn (ngôn ngữ, vị trí).'
                      : 'Remember your preferences (language, location).'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Cookies phân tích' : 'Analytics cookies'}:</strong> {lang === 'vi'
                      ? 'Giúp chúng tôi hiểu cách nền tảng được sử dụng (Google Analytics).'
                      : 'Help us understand how platform is used (Google Analytics).'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Cookies quảng cáo' : 'Advertising cookies'}:</strong> {lang === 'vi'
                      ? 'Cung cấp quảng cáo phù hợp với sở thích của bạn.'
                      : 'Deliver ads relevant to your interests.'}
                  </p>
                </div>

                <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt. Lưu ý rằng vô hiệu hóa cookies có thể ảnh hưởng đến chức năng của nền tảng.'
                    : 'You can control cookies through browser settings. Note that disabling cookies may affect platform functionality.'}
                </p>
              </section>

              {/* 5. DATA SECURITY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s5_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ thông tin cá nhân của bạn:'
                  : 'We implement technical and organizational security measures to protect your personal information:'}</p>
                
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Mã hóa' : 'Encryption'}:</strong> {lang === 'vi'
                      ? 'Dữ liệu nhạy cảm được mã hóa khi truyền tải (SSL/TLS) và lưu trữ.'
                      : 'Sensitive data encrypted in transit (SSL/TLS) and at rest.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Kiểm soát truy cập' : 'Access controls'}:</strong> {lang === 'vi'
                      ? 'Chỉ nhân viên được ủy quyền mới có quyền truy cập dữ liệu.'
                      : 'Only authorized personnel have access to data.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Giám sát bảo mật' : 'Security monitoring'}:</strong> {lang === 'vi'
                      ? 'Hệ thống giám sát liên tục để phát hiện và ngăn chặn vi phạm.'
                      : 'Continuous monitoring to detect and prevent breaches.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • <strong>{lang === 'vi' ? 'Đánh giá bảo mật định kỳ' : 'Regular security assessments'}:</strong> {lang === 'vi'
                      ? 'Kiểm tra và cập nhật biện pháp bảo mật thường xuyên.'
                      : 'Regular testing and updating of security measures.'}
                  </p>
                </div>

                <div style={{ padding: 16, background: '#FEF9C3', border: '2px solid #EAB308', borderRadius: 8 }}>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: '#854D0E' }}>
                    {lang === 'vi' ? 'LƯU Ý QUAN TRỌNG' : 'IMPORTANT NOTE'}
                  </p>
                  <p style={{ fontSize: 14, color: '#713F12' }}>
                    {lang === 'vi'
                      ? 'Mặc dù chúng tôi nỗ lực bảo vệ dữ liệu của bạn, không có phương pháp truyền tải hoặc lưu trữ nào trên internet là hoàn toàn an toàn 100%. Chúng tôi không thể đảm bảo an ninh tuyệt đối.'
                      : 'While we strive to protect your data, no method of internet transmission or storage is 100% secure. We cannot guarantee absolute security.'}
                  </p>
                </div>
              </section>

              {/* 6. DATA RETENTION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s6_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Chúng tôi lưu giữ thông tin cá nhân của bạn:'
                  : 'We retain your personal information:'}</p>
                
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Trong thời gian tài khoản của bạn còn hoạt động'
                      : 'For as long as your account is active'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Trong thời gian cần thiết để cung cấp Dịch Vụ'
                      : 'For as long as necessary to provide Services'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Để tuân thủ nghĩa vụ pháp lý (ví dụ: lưu trữ hóa đơn 10 năm theo luật kế toán Việt Nam)'
                      : 'To comply with legal obligations (e.g., retain invoices for 10 years per Vietnamese accounting law)'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Để giải quyết tranh chấp và thực thi thỏa thuận'
                      : 'To resolve disputes and enforce agreements'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi'
                      ? 'Theo yêu cầu của Nghị định 117/2025/NĐ-CP về lưu trữ chứng từ thuế (ít nhất 5 năm)'
                      : 'As required by Decree 117/2025/NĐ-CP for tax document retention (minimum 5 years)'}
                  </p>
                </div>

                <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Sau khi xóa tài khoản, dữ liệu của bạn sẽ bị xóa vĩnh viễn trong vòng 30 ngày, trừ khi pháp luật yêu cầu lưu giữ lâu hơn.'
                    : 'After account deletion, your data will be permanently deleted within 30 days, unless longer retention is required by law.'}
                </p>
              </section>

              {/* 7. YOUR RIGHTS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s7_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi' ? 'Bạn có các quyền sau:' : 'You have the following rights:'}</p>
                
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.1 {lang === 'vi' ? 'Quyền truy cập' : 'Right to access'}:</strong> {lang === 'vi'
                      ? 'Yêu cầu sao chép dữ liệu cá nhân mà chúng tôi lưu giữ về bạn.'
                      : 'Request a copy of personal data we hold about you.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.2 {lang === 'vi' ? 'Quyền sửa đổi' : 'Right to rectification'}:</strong> {lang === 'vi'
                      ? 'Sửa chữa thông tin không chính xác hoặc không đầy đủ.'
                      : 'Correct inaccurate or incomplete information.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.3 {lang === 'vi' ? 'Quyền xóa' : 'Right to erasure'}:</strong> {lang === 'vi'
                      ? 'Yêu cầu xóa dữ liệu cá nhân của bạn trong một số trường hợp nhất định.'
                      : 'Request deletion of your personal data in certain circumstances.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.4 {lang === 'vi' ? 'Quyền hạn chế xử lý' : 'Right to restrict processing'}:</strong> {lang === 'vi'
                      ? 'Yêu cầu hạn chế xử lý dữ liệu của bạn trong một số trường hợp.'
                      : 'Request restriction of processing your data in certain cases.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.5 {lang === 'vi' ? 'Quyền chuyển dữ liệu' : 'Right to data portability'}:</strong> {lang === 'vi'
                      ? 'Nhận dữ liệu của bạn ở định dạng có cấu trúc, máy đọc được.'
                      : 'Receive your data in structured, machine-readable format.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.6 {lang === 'vi' ? 'Quyền phản đối' : 'Right to object'}:</strong> {lang === 'vi'
                      ? 'Phản đối việc xử lý dữ liệu của bạn cho mục đích marketing.'
                      : 'Object to processing your data for marketing purposes.'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>7.7 {lang === 'vi' ? 'Quyền rút lại sự đồng ý' : 'Right to withdraw consent'}:</strong> {lang === 'vi'
                      ? 'Rút lại sự đồng ý của bạn bất kỳ lúc nào mà không ảnh hưởng đến tính hợp pháp của việc xử lý trước đó.'
                      : 'Withdraw your consent at any time without affecting lawfulness of prior processing.'}
                  </p>
                </div>

                <p style={{ marginTop: 16 }}>
                  {lang === 'vi'
                    ? 'Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi tại '
                    : 'To exercise these rights, please contact us at '}
                  <a href="mailto:hello@ovenly.io" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>
                    hello@ovenly.io
                  </a>
                  {lang === 'vi' ? '. Chúng tôi sẽ phản hồi trong vòng 30 ngày.' : '. We will respond within 30 days.'}
                </p>
              </section>

              {/* 8. INTERNATIONAL DATA TRANSFERS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s8_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Dữ liệu của bạn có thể được chuyển và lưu trữ tại các máy chủ nằm ngoài Việt Nam, bao gồm:'
                  : 'Your data may be transferred to and stored on servers located outside Vietnam, including:'}</p>
                
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Dịch vụ lưu trữ đám mây (AWS, Railway)' : 'Cloud hosting services (AWS, Railway)'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Nhà cung cấp thanh toán quốc tế (2C2P, Google Pay, Apple Pay)' : 'International payment providers (2C2P, Google Pay, Apple Pay)'}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    • {lang === 'vi' ? 'Dịch vụ phân tích (Google Analytics)' : 'Analytics services (Google Analytics)'}
                  </p>
                </div>

                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Chúng tôi đảm bảo rằng các bên thứ ba này áp dụng các biện pháp bảo mật phù hợp và tuân thủ các tiêu chuẩn bảo vệ dữ liệu quốc tế.'
                    : 'We ensure these third parties apply appropriate security measures and comply with international data protection standards.'}
                </p>
              </section>

              {/* 9. CHILDREN'S PRIVACY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s9_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Dịch Vụ của chúng tôi không nhắm đến trẻ em dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 16 tuổi.'
                  : 'Our Services are not directed to children under 16. We do not knowingly collect personal information from children under 16.'}</p>
                
                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Nếu bạn phát hiện rằng trẻ em dưới 16 tuổi đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi để chúng tôi có thể xóa thông tin đó.'
                    : 'If you become aware that a child under 16 has provided us with personal information, please contact us so we can delete such information.'}
                </p>
              </section>

              {/* 10. CHANGES TO POLICY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s10_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Chúng tôi có thể cập nhật Chính Sách Bảo Mật này theo thời gian để phản ánh các thay đổi về thực hành của chúng tôi hoặc vì các lý do hoạt động, pháp lý hoặc quy định khác.'
                  : 'We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal or regulatory reasons.'}</p>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách đăng Chính Sách mới trên trang này và cập nhật ngày "Có hiệu lực" ở đầu trang.'
                  : 'We will notify you of any material changes by posting the new Policy on this page and updating the "Effective" date at the top.'}</p>
                
                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Bạn nên xem lại Chính Sách này định kỳ để cập nhật thông tin. Việc bạn tiếp tục sử dụng Dịch Vụ sau khi thay đổi có nghĩa là bạn chấp nhận Chính Sách đã sửa đổi.'
                    : 'You should review this Policy periodically for updates. Your continued use of Services after changes constitutes acceptance of revised Policy.'}
                </p>
              </section>

              {/* 11. CONTACT */}
              <section style={{ borderTop: '2px solid #F0E8E0', paddingTop: 24 }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s11_title[lang]}</h2>
                
                <p style={{ marginBottom: 16 }}>{lang === 'vi'
                  ? 'Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Bảo Mật này hoặc thực hành bảo vệ dữ liệu của chúng tôi, vui lòng liên hệ:'
                  : 'If you have any questions about this Privacy Policy or our data protection practices, please contact:'}</p>
                
                <div style={{ padding: 20, background: '#FAFAF9', borderRadius: 8, border: '1px solid #E7E5E4' }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: '#000', marginBottom: 4 }}>
                    CÔNG TY TNHH MTV OVENLY SOFTWARE
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#57534E', marginBottom: 16 }}>
                    Ovenly Software Co Limited
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    {lang === 'vi' ? 'Email bảo mật dữ liệu' : 'Data Protection Email'}: <a href="mailto:hello@ovenly.io" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>hello@ovenly.io</a>
                  </p>
                  <p>
                    Website: <a href="https://www.ovenly.io" target="_blank" rel="noopener noreferrer" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>www.ovenly.io</a>
                  </p>
                </div>

                <p style={{ marginTop: 16, fontSize: 13, color: '#999' }}>
                  {lang === 'vi'
                    ? 'Bạn cũng có quyền khiếu nại với cơ quan bảo vệ dữ liệu có thẩm quyền nếu bạn cho rằng việc xử lý dữ liệu cá nhân của bạn vi phạm luật hiện hành.'
                    : 'You also have the right to lodge a complaint with the competent data protection authority if you believe our processing of your personal data violates applicable law.'}
                </p>
              </section>

              {/* RELATED DOCUMENTS */}
              <section style={{ marginTop: 32, padding: 20, background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                <p style={{ fontWeight: 600, marginBottom: 12 }}>
                  {lang === 'vi' ? 'Tài liệu liên quan:' : 'Related documents:'}
                </p>
                <p>
                  <Link href="/company/terms" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>
                    {lang === 'vi' ? 'Điều Khoản Dịch Vụ Đối Tác →' : 'Merchant Terms of Service →'}
                  </Link>
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <OvenlyFooter lang={lang} />
    </div>
  );
}