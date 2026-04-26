'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OvenlyNav from '@/components/OvenlyNav';
import OvenlyFooter from '@/components/OvenlyFooter';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';

export default function OvenlyTermsPage() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored as 'vi' | 'en');
  }, []);

  const t = {
    title: { vi: 'Điều Khoản Dịch Vụ Đối Tác', en: 'Merchant Terms of Service' },
    version: { vi: 'Phiên bản hiện hành: Tháng 4 năm 2026', en: 'Last updated: April 2026' },
    
    s1_title: { vi: '1. GIỚI THIỆU', en: '1. INTRODUCTION' },
    s1_1: { 
      vi: 'Điều khoản dịch vụ này ("Điều Khoản") là hợp đồng giữa bạn và CÔNG TY TNHH MTV OVENLY SOFTWARE ("Ovenly", "chúng tôi") và quy định việc bạn sử dụng các Dịch Vụ (định nghĩa bên dưới). Vui lòng đọc kỹ Điều Khoản để hiểu rõ quyền và nghĩa vụ pháp lý của bạn đối với chúng tôi. BẰNG VIỆC SỬ DỤNG DỊCH VỤ HOẶC MỞ TÀI KHOẢN, BẠN XÁC NHẬN CHẤP NHẬN KHÔNG THỂ HỦY NÀY CÁC ĐIỀU KHOẢN NÀY.',
      en: 'These Terms of Service ("Terms") constitute a contract between you and OVENLY SOFTWARE CO LIMITED ("Ovenly", "we", "us") and govern your use of the Services (defined below). Please read these Terms carefully to understand your legal rights and obligations. BY USING THE SERVICES OR OPENING AN ACCOUNT, YOU SIGNIFY YOUR IRREVOCABLE ACCEPTANCE OF THESE TERMS.'
    },
    s1_2: {
      vi: 'Chúng tôi có quyền sửa đổi Điều Khoản này bất kỳ lúc nào bằng cách đăng thông báo trên website hoặc gửi email. Việc bạn tiếp tục sử dụng Dịch Vụ sau khi thay đổi được hiểu là chấp nhận các điều khoản mới.',
      en: 'We reserve the right to revise these Terms at any time by posting a notice on the website or sending email. Your continued use of the Services after changes constitutes acceptance of the revised Terms.'
    },

    s2_title: { vi: '2. ĐỊNH NGHĨA', en: '2. DEFINITIONS' },
    s2_1: { vi: 'Trong Điều Khoản này, các thuật ngữ sau có nghĩa được gán như sau:', en: 'In these Terms, the following words have the meanings assigned below:' },
    
    s3_title: { vi: '3. DỊCH VỤ', en: '3. SERVICES' },
    s3_1: {
      vi: 'Đối Tác thừa nhận và đồng ý rằng Ovenly hoạt động đơn thuần như trung gian thanh toán và kết nối kỹ thuật số. Ovenly không phải là người bán, không chế biến món ăn và không đảm bảo chất lượng, an toàn hoặc tính hợp pháp của Sản Phẩm/Dịch Vụ Đối Tác.',
      en: 'Partner acknowledges and agrees that Ovenly operates solely as a payment intermediary and digital connection platform. Ovenly is not a seller, does not prepare food, and makes no representations regarding quality, safety or legality of Partner Products/Services.'
    },

    s4_title: { vi: '4. NGHĨA VỤ ĐỐI TÁC', en: '4. PARTNER OBLIGATIONS' },
    
    s5_title: { vi: '5. THUẾ VÀ KHẤU TRỪ THUẾ', en: '5. TAXES AND TAX WITHHOLDING' },
    
    s6_title: { vi: '6. SỞ HỮU TRÍ TUỆ', en: '6. INTELLECTUAL PROPERTY' },
    
    s7_title: { vi: '7. KHÔNG BẢO HÀNH', en: '7. NO WARRANTY' },
    
    s8_title: { vi: '8. CAM ĐOAN VÀ BẢO ĐẢM', en: '8. REPRESENTATIONS & WARRANTIES' },
    
    s9_title: { vi: '9. BẢO MẬT', en: '9. PRIVACY' },
    
    s10_title: { vi: '10. CHẤM DỨT', en: '10. TERMINATION' },
    
    s11_title: { vi: '11. TRÁCH NHIỆM PHÁP LÝ', en: '11. LIABILITY' },
    
    s12_title: { vi: '12. BỒI HOÀN', en: '12. INDEMNITY' },
    
    s13_title: { vi: '13. BẤT KHẢ KHÁNG', en: '13. FORCE MAJEURE' },
    
    s14_title: { vi: '14. MỐI QUAN HỆ', en: '14. RELATIONSHIP' },
    
    s15_title: { vi: '15. CHUYỂN NHƯỢNG', en: '15. ASSIGNMENT' },
    
    s16_title: { vi: '16. TOÀN BỘ THỎA THUẬN', en: '16. ENTIRE AGREEMENT' },
    
    s17_title: { vi: '17. LUẬT ĐIỀU CHỈNH', en: '17. GOVERNING LAW' },
    
    s18_title: { vi: '18. KHẢ NĂNG TÁCH RỜI', en: '18. SEVERABILITY' },
    
    s19_title: { vi: '19. ĐIỀU KHOẢN TỒN TẠI', en: '19. SURVIVAL' },
    
    s20_title: { vi: '20. MIỄN TRỪ', en: '20. WAIVER' },

    contact: { vi: '21. LIÊN HỆ', en: '21. CONTACT' }
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
              
              {/* 1. INTRODUCTION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s1_title[lang]}</h2>
                <p style={{ marginBottom: 12 }}><strong>1.1</strong> {t.s1_1[lang]}</p>
                <p style={{ marginBottom: 12 }}><strong>1.2</strong> {t.s1_2[lang]}</p>
                <div style={{ marginTop: 16, padding: 16, background: '#FEF2F2', border: `2px solid ${PRIMARY}`, borderRadius: 8 }}>
                  <p style={{ fontWeight: 700, color: PRIMARY, fontSize: 13 }}>
                    {lang === 'vi' 
                      ? 'QUAN TRỌNG: NẾU BẠN KHÔNG ĐỒNG Ý VỚI CÁC ĐIỀU KHOẢN NÀY, VUI LÒNG KHÔNG SỬ DỤNG DỊCH VỤ.'
                      : 'IMPORTANT: IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THE SERVICES.'}
                  </p>
                </div>
              </section>

              {/* 2. DEFINITIONS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s2_title[lang]}</h2>
                <p style={{ marginBottom: 16 }}><strong>2.1</strong> {t.s2_1[lang]}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 20 }}>
                  <p><strong>{lang === 'vi' ? '"Ứng Dụng"' : '"Application"'}</strong> {lang === 'vi' ? 'có nghĩa là ứng dụng di động và web do Ovenly vận hành để cung cấp Dịch Vụ;' : 'means the mobile and web application operated by Ovenly for provision of Services;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"Tài Khoản Đối Tác"' : '"Partner Account"'}</strong> {lang === 'vi' ? 'có nghĩa là tài khoản điện tử đã đăng ký của Đối Tác với Ovenly và tài khoản ngân hàng được chỉ định;' : 'means Partner\'s registered electronic account with Ovenly and designated bank account;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"Sản Phẩm/Dịch Vụ Đối Tác"' : '"Partner Product/Service"'}</strong> {lang === 'vi' ? 'có nghĩa là bất kỳ sản phẩm hoặc dịch vụ thực phẩm nào do Đối Tác cung cấp cho khách hàng;' : 'means any food product or service offered by Partner to customers;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"Dịch Vụ"' : '"Services"'}</strong> {lang === 'vi' ? 'có nghĩa là giải pháp thanh toán điện tử, nền tảng quản lý đơn hàng, trang đặt hàng trực tuyến và các sản phẩm/dịch vụ khác do Ovenly cung cấp;' : 'means electronic payment solutions, order management platform, online ordering page and other products/services offered by Ovenly;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"Giao Dịch"' : '"Transaction"'}</strong> {lang === 'vi' ? 'có nghĩa là bất kỳ giao dịch nào giữa Đối Tác và khách hàng sử dụng Dịch Vụ để mua Sản Phẩm/Dịch Vụ Đối Tác;' : 'means any transaction between Partner and customer using the Services to purchase Partner Products/Services;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"LÒ ĐỒ ĂN"' : '"LÒ ĐỒ ĂN"'}</strong> {lang === 'vi' ? 'có nghĩa là sàn thương mại điện tử thực phẩm do Ovenly vận hành tại lodoan.vn;' : 'means the food e-commerce marketplace operated by Ovenly at lodoan.vn;'}</p>
                  
                  <p><strong>{lang === 'vi' ? '"Số Tiền Hoàn Trả"' : '"Reversal Amount"'}</strong> {lang === 'vi' ? 'có nghĩa là toàn bộ số tiền thanh toán và phí liên quan nếu thanh toán bị đảo ngược vì bất kỳ lý do gì;' : 'means the full payment amount and associated fees if payment is reversed for any reason;'}</p>
                </div>
                <p style={{ marginTop: 16 }}><strong>2.2</strong> {lang === 'vi' ? 'Tiêu đề chỉ để thuận tiện và không ảnh hưởng đến cách hiểu hoặc giải thích Điều Khoản này.' : 'Headings are for convenience only and shall not affect construction or interpretation of these Terms.'}</p>
              </section>

              {/* 3. SERVICES */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s3_title[lang]}</h2>
                <p style={{ marginBottom: 12 }}><strong>3.1</strong> {t.s3_1[lang]}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.2</strong> {lang === 'vi' 
                  ? 'Bất kỳ tranh chấp nào phát sinh từ Sản Phẩm/Dịch Vụ Đối Tác là giữa Đối Tác và khách hàng. Ovenly không phải là bên trong tranh chấp, bao gồm nhưng không giới hạn tranh chấp về chất lượng, giao hàng hoặc sử dụng Sản Phẩm/Dịch Vụ Đối Tác.'
                  : 'Any dispute arising from Partner Products/Services is between Partner and customer. Ovenly is not a party to disputes, including but not limited to disputes over quality, delivery or use of Partner Products/Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.3</strong> {lang === 'vi'
                  ? 'Tiền thanh toán từ khách hàng sẽ được thanh toán và chuyển vào Tài Khoản Đối Tác theo khung thời gian cố định sau khi trừ các khoản khấu trừ thuế theo quy định pháp luật và bất kỳ khoản phí nào phải trả cho Ovenly.'
                  : 'Payment funds from customers will be settled and transferred to Partner Account within fixed timeframe after deducting tax withholdings as required by law and any fees due to Ovenly.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.4</strong> {lang === 'vi'
                  ? 'Đối Tác nhận biết rằng việc nhận được tiền thanh toán vào Tài Khoản Đối Tác không đồng nghĩa với việc nhận được tiền đã thanh toán bù trừ. Đối Tác vẫn chịu trách nhiệm với Ovenly về toàn bộ số tiền thanh toán nếu thanh toán sau đó bị đảo ngược vì bất kỳ lý do gì.'
                  : 'Partner acknowledges that receipt of payment into Partner Account does not constitute receipt of cleared funds. Partner remains liable to Ovenly for full payment amount if payment is later reversed for any reason.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.5</strong> {lang === 'vi'
                  ? 'Trong trường hợp đảo ngược thanh toán, Ovenly có quyền ghi nợ Tài Khoản Đối Tác với Số Tiền Hoàn Trả và bất kỳ phí hoàn tiền nào của bên thứ ba. Nếu không thu hồi được đầy đủ, Đối Tác phải hoàn trả ngay lập tức. Việc không hoàn trả là vi phạm Điều Khoản này.'
                  : 'In event of payment reversal, Ovenly may debit Partner Account with Reversal Amount and any third-party chargeback fees. If unable to fully recover, Partner must repay immediately. Failure to repay is a breach of these Terms.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.6</strong> {lang === 'vi' ? 'Ovenly có quyền tạm ngưng, bất kỳ lúc nào và theo quyết định riêng, Tài Khoản Đối Tác và/hoặc Dịch Vụ trong các trường hợp sau:' : 'Ovenly reserves the right to suspend, at any time and at its sole discretion, Partner Account and/or Services in following circumstances:'}</p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi' ? 'Khi cần thiết để bảo vệ an ninh của Tài Khoản Đối Tác và/hoặc Dịch Vụ;' : 'When necessary to protect security of Partner Account and/or Services;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi' ? 'Nếu Giao Dịch được cho là vi phạm Điều Khoản, đáng ngờ, trái phép hoặc gian lận;' : 'If Transactions are deemed to breach Terms, suspicious, unauthorized or fraudulent;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi' ? 'Khi Đối Tác mất khả năng thanh toán, thanh lý, phá sản hoặc giải thể;' : 'Upon insolvency, liquidation, bankruptcy or dissolution of Partner;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi' ? 'Nếu Giao Dịch nằm ngoài hoạt động kinh doanh đã thỏa thuận hoặc Đối Tác không giao hàng;' : 'If Transactions fall outside agreed business activities or Partner fails to deliver;'}</p>
                  <p style={{ marginBottom: 8 }}>(e) {lang === 'vi' ? 'Để tuân thủ luật pháp và quy định hiện hành.' : 'In connection with compliance with applicable laws and regulations.'}</p>
                </div>
              </section>

              {/* 4. OBLIGATIONS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s4_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>4.1</strong> {lang === 'vi' 
                  ? 'Đối Tác phải mở và duy trì Tài Khoản Đối Tác bằng cách đăng ký với Ovenly. Đối Tác chịu trách nhiệm duy trì an ninh và kiểm soát mọi thông tin đăng nhập, mật khẩu, PIN hoặc mã bảo mật.'
                  : 'Partner shall open and maintain Partner Account by registering with Ovenly. Partner is responsible for maintaining security and control of all login credentials, passwords, PINs or security codes.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.2</strong> {lang === 'vi'
                  ? 'Đối Tác không được nhận thanh toán cho các sản phẩm thuốc lá, ma túy, nội dung khiêu dâm, hoạt động cờ bạc bất hợp pháp, hàng hóa vi phạm sở hữu trí tuệ hoặc bất kỳ hàng hóa/dịch vụ nào vi phạm đạo đức công cộng hoặc bất hợp pháp.'
                  : 'Partner shall not receive payments for tobacco products, drugs, pornographic content, illegal gambling, goods infringing intellectual property or any goods/services violating public morals or illegal.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.3</strong> {lang === 'vi'
                  ? 'Đối Tác phải hợp tác với Ovenly với chi phí của Đối Tác để điều tra bất kỳ hoạt động đáng ngờ, bất hợp pháp, gian lận hoặc không đúng đắn liên quan đến Giao Dịch.'
                  : 'Partner shall cooperate with Ovenly at Partner\'s cost to investigate any suspicious, illegal, fraudulent or improper activity related to Transactions.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.4</strong> {lang === 'vi'
                  ? 'Đối Tác phải thông báo cho Ovenly bằng văn bản về bất kỳ thay đổi quan trọng nào về hoạt động kinh doanh, mô hình kinh doanh, hàng hóa/dịch vụ, tên cơ sở, website hoặc phương thức thanh toán ít nhất 30 ngày trước khi thay đổi. Thay đổi chỉ có hiệu lực khi được Ovenly đồng ý.'
                  : 'Partner must notify Ovenly in writing of any material changes to business operations, business model, goods/services, shop name, website or payment methods at least 30 days prior. Changes effective only when agreed by Ovenly.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.5</strong> {lang === 'vi'
                  ? 'Đối Tác không được tính phí xử lý, phí cộng thêm hoặc phụ phí cho khách hàng khi thanh toán qua Dịch Vụ.'
                  : 'Partner shall not charge customers a processing fee, markup or surcharge for payments through Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.6</strong> {lang === 'vi'
                  ? 'Đối Tác phải giao Sản Phẩm/Dịch Vụ Đối Tác cho khách hàng không chậm trễ không hợp lý. Đối Tác phải lưu giữ chứng từ giao hàng ít nhất 2 năm.'
                  : 'Partner shall deliver Partner Products/Services to customers without undue delay. Partner shall retain delivery documents for at least 2 years.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.7</strong> {lang === 'vi'
                  ? 'Sản Phẩm/Dịch Vụ Đối Tác phải tuân thủ luật pháp hiện hành tại mọi khu vực pháp lý mà Đối Tác cung cấp.'
                  : 'Partner Products/Services must comply with applicable laws in any jurisdiction where Partner makes them available.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.8</strong> {lang === 'vi'
                  ? 'Đối Tác luôn phải có đầy đủ giấy phép và chứng nhận liên quan để kinh doanh và/hoặc bán Sản Phẩm/Dịch Vụ Đối Tác.'
                  : 'Partner shall at all times have all relevant licenses and permits to conduct business and/or sell Partner Products/Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.9</strong> {lang === 'vi'
                  ? 'Đối Tác cam đoan và bảo đảm rằng không nhận tiền liên quan đến bất kỳ hành vi bất hợp pháp, gian lận, lừa dối hoặc thao túng nào và không gửi hoặc nhận tiền từ nguồn bất hợp pháp.'
                  : 'Partner represents and warrants not receiving funds in connection with any illegal, fraudulent, deceptive or manipulative act and not sending/receiving funds from illegal sources.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.10</strong> {lang === 'vi'
                  ? 'Đối Tác cam đoan tuân thủ các luật chống tham nhũng, chống rửa tiền và các quy định về trừng phạt quốc tế hiện hành.'
                  : 'Partner represents compliance with anti-corruption laws, anti-money laundering regulations and applicable international sanctions.'}</p>
              </section>

              {/* 5. TAXES AND TAX WITHHOLDING */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s5_title[lang]}</h2>
                
                <div style={{ padding: 16, background: '#FEF9C3', border: '2px solid #EAB308', borderRadius: 8, marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: '#854D0E' }}>
                    {lang === 'vi' ? 'QUAN TRỌNG: NGHĨA VỤ KHẤU TRỪ THUẾ' : 'IMPORTANT: TAX WITHHOLDING OBLIGATION'}
                  </p>
                  <p style={{ fontSize: 14, color: '#713F12' }}>
                    {lang === 'vi'
                      ? 'Theo Nghị định 117/2025/NĐ-CP có hiệu lực từ 01/07/2025, Ovenly có nghĩa vụ khấu trừ, khai báo và nộp thuế thay cho Đối Tác là hộ kinh doanh/cá nhân kinh doanh tại thời điểm hoàn thành giao dịch.'
                      : 'Under Decree 117/2025/NĐ-CP effective from 01/07/2025, Ovenly is obligated to withhold, declare and remit taxes on behalf of household/individual business Partners at the moment of transaction completion.'}
                  </p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.1 {lang === 'vi' ? 'Cơ sở pháp lý' : 'Legal Basis'}:</strong></p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>{lang === 'vi' 
                    ? '• Nghị định 117/2025/NĐ-CP ban hành ngày 09/06/2025, có hiệu lực từ 01/07/2025'
                    : '• Decree 117/2025/NĐ-CP issued 09 June 2025, effective from 01 July 2025'}</p>
                  <p style={{ marginBottom: 8 }}>{lang === 'vi'
                    ? '• Thực thi Luật Quản Lý Thuế (Luật số 56/2024/QH15)'
                    : '• Implements Law on Tax Administration (Law No. 56/2024/QH15)'}</p>
                  <p style={{ marginBottom: 8 }}>{lang === 'vi'
                    ? '• Thông tư 40/2021/TT-BTC về thuế thu nhập doanh nghiệp'
                    : '• Circular 40/2021/TT-BTC on corporate income tax'}</p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.2 {lang === 'vi' ? 'Tỷ lệ khấu trừ thuế cho dịch vụ ăn uống' : 'Withholding Rates for Food & Beverage Services'}:</strong></p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8, fontWeight: 600 }}>{lang === 'vi'
                    ? 'Tổng cộng: 4.5% trên doanh thu chịu thuế (giá trị đơn hàng trừ chiết khấu của Đối Tác)'
                    : 'Total: 4.5% on taxable revenue (order value minus merchant discounts)'}</p>
                  <p style={{ marginBottom: 8 }}>{lang === 'vi'
                    ? '• Thuế GTGT (VAT): 3%'
                    : '• VAT (GTGT): 3%'}</p>
                  <p style={{ marginBottom: 8 }}>{lang === 'vi'
                    ? '• Thuế TNCN (PIT): 1.5%'
                    : '• PIT (TNCN): 1.5%'}</p>
                  <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>{lang === 'vi'
                    ? 'Lưu ý: Tỷ lệ này áp dụng cho "dịch vụ ăn uống" - dịch vụ gắn với sản xuất hàng hóa. Nếu Đối Tác đăng ký sai danh mục (ví dụ: "Hàng hóa" thay vì "Dịch vụ ăn uống"), tỷ lệ khấu trừ sẽ sai (1.5% thay vì 4.5%).'
                    : 'Note: This rate applies to "food & beverage services" - services attached to goods production. If Partner registers under wrong category (e.g., "Goods" instead of "F&B Services"), incorrect rate will be applied (1.5% instead of 4.5%).'}</p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.3 {lang === 'vi' ? 'Nghĩa vụ của Ovenly' : 'Ovenly\'s Obligations'}:</strong></p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi'
                    ? 'Khấu trừ 4.5% thuế (3% VAT + 1.5% PIT) trên mỗi giao dịch thành công;'
                    : 'Withhold 4.5% tax (3% VAT + 1.5% PIT) on each successful transaction;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi'
                    ? 'Khai báo và nộp thuế thay cho Đối Tác hàng tháng sử dụng Mẫu số 01/CNKD-TMĐT và 01-1/BK-CNKD-TMĐT;'
                    : 'Declare and remit taxes on behalf of Partner monthly using Form No. 01/CNKD-TMĐT and 01-1/BK-CNKD-TMĐT;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi'
                    ? 'Cấp chứng từ khấu trừ thuế điện tử cho Đối Tác;'
                    : 'Issue electronic tax withholding certificates to Partner;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi'
                    ? 'Chuyển số tiền còn lại (sau khi trừ thuế và phí thanh toán) vào Tài Khoản Đối Tác.'
                    : 'Transfer remaining amount (after deducting taxes and payment fees) to Partner Account.'}</p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.4 {lang === 'vi' ? 'Trường hợp đặc biệt' : 'Special Cases'}:</strong></p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi'
                    ? 'Việc khấu trừ diễn ra bất kể Đối Tác có vượt ngưỡng doanh thu hàng năm hay không;'
                    : 'Withholding occurs regardless of whether Partner exceeds annual revenue threshold;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi'
                    ? 'Đối Tác có doanh thu dưới 500 triệu VNĐ/năm (ngưỡng miễn thuế theo Luật 149/2025/QH15 có hiệu lực từ 01/2026) vẫn bị khấu trừ 4.5% và phải nộp đơn xin hoàn thuế cuối năm;'
                    : 'Partners with revenue under VND 500M/year (exemption threshold per Law 149/2025/QH15 effective from Jan 2026) are still withheld at 4.5% and must apply for year-end refund;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi'
                    ? 'Nghĩa vụ khấu trừ của Ovenly bắt đầu ngay khi Ovenly có "chức năng thanh toán" - tức là xử lý thanh toán qua nền tảng (tích hợp MoMo, ZaloPay, 2C2P).'
                    : 'Ovenly\'s withholding obligation begins once Ovenly has "payment function" - i.e., processes payments through platform (MoMo, ZaloPay, 2C2P integrations).'}</p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.5 {lang === 'vi' ? 'Phí thanh toán' : 'Payment Processing Fees'}:</strong></p>
                <p style={{ paddingLeft: 20, marginBottom: 16 }}>{lang === 'vi'
                  ? 'Phí xử lý thanh toán từ 2C2P, Google Pay, Apple Pay do Đối Tác chịu và được trừ trực tiếp từ số tiền thanh toán sau khi đã khấu trừ thuế.'
                  : 'Payment processing fees from 2C2P, Google Pay, Apple Pay are borne by Partner and deducted directly from payment amount after tax withholding.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>5.6 {lang === 'vi' ? 'Trách nhiệm của Đối Tác' : 'Partner Responsibilities'}:</strong></p>
                <div style={{ paddingLeft: 20, marginBottom: 16 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi'
                    ? 'Đăng ký đúng danh mục kinh doanh "Dịch vụ ăn uống" trên nền tảng để áp dụng đúng tỷ lệ thuế;'
                    : 'Register under correct business category "Food & Beverage Services" on platform to apply correct tax rate;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi'
                    ? 'Lưu giữ chứng từ khấu trừ thuế điện tử do Ovenly cấp;'
                    : 'Retain electronic tax withholding certificates issued by Ovenly;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi'
                    ? 'Nếu doanh thu năm dưới ngưỡng miễn thuế, tự nộp đơn xin hoàn thuế với cơ quan thuế;'
                    : 'If annual revenue falls below exemption threshold, file tax refund application with tax authority;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi'
                    ? 'Chịu mọi trách nhiệm về việc khai báo thuế chính xác và đầy đủ theo quy định pháp luật.'
                    : 'Bear all responsibilities for accurate and complete tax declaration as required by law.'}</p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>5.7 {lang === 'vi' ? 'Thuế và phí khác' : 'Other Taxes and Fees'}:</strong></p>
                <p style={{ paddingLeft: 20 }}>{lang === 'vi'
                  ? 'Mọi thuế, phí và/hoặc lệ phí khác hiện hành (ngoài những khoản đã nêu ở Điều 5.2) sẽ do Đối Tác chịu, và Đối Tác cho phép Ovenly khấu trừ các khoản này theo quy định pháp luật.'
                  : 'Any other applicable taxes, duties and/or fees (beyond those stated in Section 5.2) shall be borne by Partner, and Partner authorizes Ovenly to deduct such amounts as required by law.'}</p>
              </section>

              {/* 6. INTELLECTUAL PROPERTY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s6_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>6.1</strong> {lang === 'vi'
                  ? 'Ovenly và/hoặc người cấp phép bảo lưu và giữ toàn bộ quyền, quyền sở hữu và lợi ích trong mọi bản quyền, nhãn hiệu và quyền sở hữu trí tuệ khác liên quan đến Dịch Vụ, trừ khi được cấp rõ ràng cho Đối Tác trong Điều Khoản này.'
                  : 'Ovenly and/or its licensors reserve and retain entire right, title and interest in all copyrights, trademarks and other intellectual property rights relating to Services, except as expressly granted to Partner in these Terms.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.2</strong> {lang === 'vi'
                  ? '"Ovenly", "LÒ ĐỒ ĂN" và tất cả các URL, logo, nhãn hiệu, sở hữu trí tuệ liên quan đến Dịch Vụ là nhãn hiệu hoặc nhãn hiệu đã đăng ký của Ovenly. Đối Tác không được sao chép, bắt chước hoặc sử dụng chúng mà không có sự đồng ý bằng văn bản của Ovenly.'
                  : '"Ovenly", "LÒ ĐỒ ĂN" and all URLs, logos, trademarks, intellectual property related to Services are trademarks or registered trademarks of Ovenly. Partner shall not copy, imitate or use them without Ovenly\'s prior written consent.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.3</strong> {lang === 'vi'
                  ? 'Đối Tác cấp cho Ovenly giấy phép toàn cầu, không độc quyền, miễn phí bản quyền để sao chép, sử dụng và hiển thị logo, nhãn hiệu của Đối Tác nhằm mục đích xác định Đối Tác là cơ sở chấp nhận Dịch Vụ.'
                  : 'Partner grants Ovenly worldwide, non-exclusive, royalty-free license to copy, use and display Partner\'s logo, trademarks for purpose of identifying Partner as establishment accepting Services.'}</p>
              </section>

              {/* 7. NO WARRANTY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s7_title[lang]}</h2>
                
                <div style={{ padding: 16, background: '#FFF7ED', border: '1px solid #FB923C', borderRadius: 8, marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: '#EA580C' }}>
                    {lang === 'vi' ? 'DỊCH VỤ ĐƯỢC CUNG CẤP "NGUYÊN TRẠNG"' : 'SERVICES ARE PROVIDED "AS-IS"'}
                  </p>
                  <p style={{ fontSize: 14 }}>
                    {lang === 'vi'
                      ? 'Ovenly và các công ty con, giám đốc, nhân viên từ chối cụ thể mọi bảo hành ngụ ý về quyền sở hữu, khả năng bán được, phù hợp cho mục đích cụ thể và không vi phạm.'
                      : 'Ovenly and its subsidiaries, directors, employees specifically disclaim any implied warranties of title, merchantability, fitness for particular purpose and non-infringement.'}
                  </p>
                </div>
                
                <p style={{ marginBottom: 12 }}><strong>7.1</strong> {lang === 'vi'
                  ? 'Ovenly không kiểm soát hàng hóa/dịch vụ được thanh toán qua Dịch Vụ. Ovenly không đảm bảo truy cập liên tục, không gián đoạn hoặc an toàn vào Dịch Vụ.'
                  : 'Ovenly has no control over goods/services paid for with Services. Ovenly does not guarantee continuous, uninterrupted or secure access to Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.2</strong> {lang === 'vi' ? 'Ovenly không chịu trách nhiệm về:' : 'Ovenly is not liable for:'}</p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi' ? 'Phần cứng, phần mềm, thiết bị di động và/hoặc kết nối internet không hoạt động bình thường;' : 'Hardware, software, mobile device and/or internet connection not functioning properly;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi' ? 'Bất kỳ việc tạm ngưng hoặc từ chối thanh toán mà Ovenly tin là gian lận hoặc không được ủy quyền đúng;' : 'Any suspension or refusal of payments reasonably believed to be fraudulent or without proper authorization;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi' ? 'Hướng dẫn thanh toán nhận được có thông tin không chính xác hoặc định dạng không đúng;' : 'Payment instructions received contain incorrect or improperly formatted information;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi' ? 'Hoàn cảnh không lường trước được ngăn cản hoạt động đúng đắn như thiên tai, mất điện, hỏa hoạn, lũ lụt, tấn công mạng, cố vật kỹ thuật.' : 'Unforeseen circumstances preventing proper performance such as acts of God, power outages, fire, flood, hacking attacks, technical failures.'}</p>
                </div>
              </section>

              {/* 8. REPRESENTATIONS & WARRANTIES */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s8_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>8.1</strong> {lang === 'vi' ? 'Đối Tác cam đoan và bảo đảm rằng:' : 'Partner represents and warrants that:'}</p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi' ? 'Việc tham gia Điều Khoản này và thực hiện của Đối Tác đã được ủy quyền đúng đắn và cấu thành thỏa thuận hợp lệ, ràng buộc;' : 'Entry into these Terms and performance by Partner has been duly authorized and constitutes valid, binding agreement;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi' ? 'Tất cả thông tin cung cấp cho Ovenly là đúng sự thật, chính xác và không gây hiểu lầm;' : 'All information furnished to Ovenly is true, accurate and not misleading;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi' ? 'Tất cả sự đồng ý chính thức, miễn trừ, phê duyệt, ủy quyền, đăng ký, giấy phép cần thiết đã được đầy đủ;' : 'All formal consents, waivers, approvals, authorizations, registrations, licenses required have been duly obtained;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi' ? 'Việc tham gia và thực hiện Điều Khoản này sẽ không vi phạm bất kỳ luật, quy định, mệnh lệnh, phán quyết nào áp dụng cho Đối Tác.' : 'Entry and performance of these Terms will not violate any law, regulation, order, judgment applicable to Partner.'}</p>
                </div>
              </section>

              {/* 9. PRIVACY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s9_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>9.1</strong> {lang === 'vi'
                  ? 'Đối Tác thừa nhận rằng khi tải xuống, cài đặt hoặc sử dụng Dịch Vụ, Ovenly có thể sử dụng phương tiện tự động (bao gồm cookies và web beacons) để thu thập thông tin về thiết bị và việc sử dụng Dịch Vụ của Đối Tác.'
                  : 'Partner acknowledges that when downloading, installing or using Services, Ovenly may use automatic means (including cookies and web beacons) to collect information about Partner\'s device and use of Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>9.2</strong> {lang === 'vi'
                  ? 'Tất cả thông tin được thu thập bởi Ovenly thông qua hoặc liên quan đến Dịch Vụ tuân theo Chính Sách Bảo Mật của Ovenly. Bằng việc sử dụng Dịch Vụ, Đối Tác đồng ý với mọi hành động của Ovenly đối với thông tin của Đối Tác tuân thủ Chính Sách Bảo Mật.'
                  : 'All information collected by Ovenly through or in connection with Services is subject to Ovenly\'s Privacy Policy. By using Services, Partner consents to all actions taken by Ovenly with respect to Partner\'s information in compliance with Privacy Policy.'}</p>
                
                <p>
                  {lang === 'vi' ? 'Xem ' : 'See '}
                  <Link href="/company/privacy" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>
                    {lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
                  </Link>
                  {lang === 'vi' ? ' để biết chi tiết.' : ' for details.'}
                </p>
              </section>

              {/* 10. TERMINATION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s10_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>10.1</strong> {lang === 'vi' ? 'Ovenly có thể chấm dứt cung cấp Dịch Vụ ngay lập tức nếu:' : 'Ovenly may terminate provision of Services immediately if:'}</p>
                <div style={{ paddingLeft: 20 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi' ? 'Đối Tác nộp đơn phá sản, mất khả năng thanh toán, bố trí với chủ nợ, hoặc bị thanh lý;' : 'Partner files bankruptcy petition, becomes insolvent, makes arrangement with creditors, or goes into liquidation;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi' ? 'Xảy ra vi phạm quan trọng Điều Khoản này bởi Đối Tác hoặc không khắc phục trong thời gian Ovenly chỉ định;' : 'Material breach of these Terms by Partner occurs or is not remedied within time specified by Ovenly;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi' ? 'Đối Tác vi phạm hoặc không tuân thủ luật, quy định hoặc mệnh lệnh của tòa án hoặc cơ quan nhà nước có thẩm quyền.' : 'Partner violates or fails to comply with any applicable law, regulation or order by competent court or government authority.'}</p>
                </div>
                
                <p style={{ marginBottom: 12, marginTop: 16 }}><strong>10.2</strong> {lang === 'vi'
                  ? 'Bất kỳ Bên nào cũng có thể chấm dứt Dịch Vụ bằng cách thông báo trước cho Bên kia 30 ngày bằng văn bản.'
                  : 'Either Party may terminate Services by giving the other Party thirty (30) days\' prior written notice.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>10.3</strong> {lang === 'vi'
                  ? 'Sau khi chấm dứt, Đối Tác vẫn phải hoàn thành các đơn hàng đang xử lý và giải quyết các khiếu nại còn tồn đọng.'
                  : 'After termination, Partner must still complete pending orders and resolve outstanding complaints.'}</p>
              </section>

              {/* 11. LIABILITY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s11_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>11.1</strong> {lang === 'vi'
                  ? 'Trong mọi trường hợp, không Bên nào chịu trách nhiệm về thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, trừng phạt hoặc hậu quả, bao gồm mất mát sử dụng, mất lợi nhuận hoặc gián đoạn kinh doanh.'
                  : 'In no event shall either Party be liable for indirect, incidental, special, punitive or consequential damages, including loss of use, loss of profits or interruption of business.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>11.2</strong> {lang === 'vi'
                  ? 'Trách nhiệm pháp lý của Ovenly đối với Đối Tác cho mọi và tất cả tổn thất phát sinh từ hoặc liên quan đến Điều Khoản này trong mọi trường hợp không vượt quá phí Ovenly nhận được từ Đối Tác trong 3 tháng trước sự kiện gây ra trách nhiệm đó.'
                  : 'Ovenly\'s liability to Partner for any and all losses arising out of or in connection with these Terms shall in no event exceed fees received by Ovenly from Partner in three (3) months prior to event giving rise to such liability.'}</p>
              </section>

              {/* 12. INDEMNITY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s12_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>12.1</strong> {lang === 'vi'
                  ? 'Đối Tác phải bồi hoàn đầy đủ và giữ cho Ovenly, công ty mẹ, công ty con, công ty liên kết và đại lý cùng các giám đốc, nhân viên của họ không bị tổn hại khỏi mọi tổn thất, trách nhiệm, chi phí (bao gồm hoàn trả đầy đủ chi phí pháp lý và chuyên môn) mà Bên Được Bồi Hoàn phải chịu hoặc phát sinh do hoặc liên quan đến bất kỳ khiếu nại nào của bên thứ ba liên quan đến Sản Phẩm/Dịch Vụ Đối Tác và/hoặc bất kỳ vi phạm nào của Điều Khoản này và/hoặc việc sử dụng Dịch Vụ bởi Đối Tác.'
                  : 'Partner shall fully indemnify and hold Ovenly, its parents, subsidiaries, affiliates and agents and their respective officers, directors and employees harmless from any loss, liability, costs and expenses (including full reimbursement of legal and professional costs) which the Indemnified Party suffers or incurs as result of, or in connection with, any claim made or threatened by third party relating to any Partner Products/Services and/or any breach of these Terms and/or use of Services by Partner.'}</p>
              </section>

              {/* 13. FORCE MAJEURE */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s13_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>13.1</strong> {lang === 'vi'
                  ? 'Không Bên nào chịu trách nhiệm với Bên kia về tổn thất hoặc thiệt hại do trì hoãn hoặc không thực hiện Điều Khoản này khi nguyên nhân nằm ngoài tầm kiểm soát hợp lý, bao gồm nhưng không giới hạn chiến tranh, bạo loạn, đình công, hỏa hoạn, lũ lụt, nổ, động đất, dịch bệnh, cách ly hoặc bất kỳ hành động nào của Chúa, quy định của chính phủ.'
                  : 'Neither Party shall be liable to other for loss or damage resulting from delay or failure to perform these Terms when due to causes beyond its reasonable control, including but not limited to civil war, insurrections, strikes, riots, fires, floods, explosions, earthquakes, epidemics, quarantine, government regulations or any acts of God.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>13.2</strong> {lang === 'vi'
                  ? 'Bên bị ảnh hưởng phải thông báo cho Bên kia bằng văn bản về sự bắt đầu và (nếu có) kết thúc của các hoàn cảnh đó càng sớm càng tốt.'
                  : 'Affected Party shall as soon as possible notify other Party in writing of commencement and (if applicable) end of said circumstances.'}</p>
              </section>

              {/* 14. RELATIONSHIP */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s14_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>14.1</strong> {lang === 'vi'
                  ? 'Các Bên là các bên độc lập, và không có gì trong Điều Khoản này làm cho bất kỳ Bên nào trở thành nhân viên, đối tác, đại lý, đại diện pháp lý hoặc liên doanh của Bên kia cho bất kỳ mục đích nào, cũng như không cấp cho Bên nào quyền tạo ra nghĩa vụ thay mặt hoặc dưới danh nghĩa của Bên kia.'
                  : 'Parties are independent contracting parties, and nothing in these Terms makes any Party the employee, partner, agent, legal representative or joint venturer of other for any purpose, nor grants either Party any authority to assume or create any obligation on behalf of or in name of other.'}</p>
              </section>

              {/* 15. ASSIGNMENT */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s15_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>15.1</strong> {lang === 'vi'
                  ? 'Ovenly có thể chuyển nhượng bất kỳ quyền hoặc nghĩa vụ nào theo Điều Khoản này mà không cần sự đồng ý trước bằng văn bản của Đối Tác.'
                  : 'Ovenly may assign any of its rights or obligations under these Terms without prior written consent of Partner.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>15.2</strong> {lang === 'vi'
                  ? 'Đối Tác không được chuyển nhượng bất kỳ quyền nào theo Điều Khoản này cho bất kỳ người nào mà không có sự đồng ý trước bằng văn bản của Ovenly.'
                  : 'Partner may not assign any of its rights under these Terms to any person without prior written consent of Ovenly.'}</p>
              </section>

              {/* 16. ENTIRE AGREEMENT */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s16_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>16.1</strong> {lang === 'vi'
                  ? 'Điều Khoản này cấu thành toàn bộ thỏa thuận giữa các Bên liên quan đến chủ đề của Điều Khoản này và thay thế tất cả các thương lượng, thỏa thuận và hiểu biết trước đó, dù bằng miệng hay bằng văn bản, giữa các Bên.'
                  : 'These Terms constitute entire agreement between Parties concerning subject matter and supersede all prior negotiations, arrangements, agreements and understandings, either oral or written, between Parties.'}</p>
              </section>

              {/* 17. GOVERNING LAW */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s17_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>17.1</strong> {lang === 'vi'
                  ? 'Điều Khoản này được điều chỉnh bởi luật pháp Việt Nam và các Bên đồng ý chịu thẩm quyền độc quyền của tòa án Việt Nam.'
                  : 'These Terms shall be governed by laws of Vietnam and Parties agree to submit to exclusive jurisdiction of Vietnamese courts.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>17.2</strong> {lang === 'vi'
                  ? 'Trong trường hợp có bất kỳ tranh chấp, tranh cãi, khiếu nại hoặc bất đồng nào phát sinh giữa các Bên liên quan đến Điều Khoản này, các Bên sẽ cố gắng giải quyết tranh chấp đó trong thời gian 30 ngày sau khi một Bên nhận được thông báo từ Bên kia về sự tồn tại của tranh chấp, bằng cách thảo luận chung giữa ban quản lý cấp cao của mỗi Bên.'
                  : 'In event of any dispute, controversy, claim or difference arising between Parties in connection with these Terms, Parties shall attempt, for period of thirty (30) days after receipt by one Party of notice from other Party of existence of dispute, to settle such dispute by mutual discussions between senior management of each Party.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>17.3</strong> {lang === 'vi'
                  ? 'Nếu tranh chấp không được giải quyết trong thời gian trên, tranh chấp sẽ được chuyển đến Trung tâm Trọng tài Quốc tế Việt Nam (VIAC) để giải quyết cuối cùng.'
                  : 'If dispute is not resolved within such period, dispute shall be referred to Vietnam International Arbitration Centre (VIAC) for final resolution.'}</p>
              </section>

              {/* 18. SEVERABILITY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s18_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>18.1</strong> {lang === 'vi'
                  ? 'Trong trường hợp bất kỳ phần hoặc điều khoản nào của Điều Khoản này không hợp lệ, sự không hợp lệ đó không được ảnh hưởng đến khả năng thi hành của bất kỳ phần hoặc điều khoản nào khác của Điều Khoản này.'
                  : 'In event of invalidity of any part or provision of these Terms, such invalidity must not affect enforceability of any other part or provision of these Terms.'}</p>
              </section>

              {/* 19. SURVIVAL */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s19_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>19.1</strong> {lang === 'vi'
                  ? 'Các Điều khoản 5 (Thuế và Khấu Trừ Thuế), 8 (Cam Đoan và Bảo Đảm), 11 (Trách Nhiệm Pháp Lý), 12 (Bồi Hoàn), 17 (Luật Điều Chỉnh) và 19 (Điều Khoản Tồn Tại) sẽ tồn tại sau khi hết hạn và chấm dứt Điều Khoản này.'
                  : 'Clauses 5 (Taxes and Tax Withholding), 8 (Representations and Warranties), 11 (Liability), 12 (Indemnity), 17 (Governing Law) and 19 (Survival) shall survive expiration and termination of these Terms.'}</p>
              </section>

              {/* 20. WAIVER */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.s20_title[lang]}</h2>
                
                <p style={{ marginBottom: 12 }}><strong>20.1</strong> {lang === 'vi'
                  ? 'Việc một Bên không thực hiện hoặc trì hoãn thực hiện quyền hoặc quyền lực không hoạt động như sự miễn trừ quyền hoặc quyền lực đó và không loại trừ việc thực hiện quyền hoặc quyền lực đó trong tương lai.'
                  : 'A Party\'s failure to exercise or delay in exercising a right or power does not operate as waiver of that right or power and does not preclude future exercise of that right or power.'}</p>
              </section>

              {/* 21. CONTACT */}
              <section style={{ borderTop: '2px solid #F0E8E0', paddingTop: 24 }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>{t.contact[lang]}</h2>
                
                <div style={{ padding: 20, background: '#FAFAF9', borderRadius: 8, border: '1px solid #E7E5E4' }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: '#000', marginBottom: 4 }}>
                    CÔNG TY TNHH MTV OVENLY SOFTWARE
                  </p>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#57534E', marginBottom: 16 }}>
                    Ovenly Software Co Limited
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    Email: <a href="mailto:hello@ovenly.io" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>hello@ovenly.io</a>
                  </p>
                  <p>
                    Website: <a href="https://www.ovenly.io" target="_blank" rel="noopener noreferrer" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>www.ovenly.io</a>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <OvenlyFooter lang={lang} />
    </div>
  );
}