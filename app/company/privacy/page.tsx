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
                <p style={{ marginBottom: 16 }}>{lang === 'vi'
                  ? 'CÔNG TY TNHH MTV OVENLY SOFTWARE ("Ovenly", "chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính Sách Bảo Mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng nền tảng Ovenly (ovenly.io) và sàn thương mại điện tử LÒ ĐỒ ĂN (lodoan.vn).'
                  : 'OVENLY SOFTWARE CO LIMITED ("Ovenly", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and protect your personal information when you use the Ovenly platform (ovenly.io) and LÒ ĐỒ ĂN e-commerce marketplace (lodoan.vn).'}</p>
                
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
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '1. THÔNG TIN CHÚNG TÔI THU THẬP' : '1. INFORMATION WE COLLECT'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>1.1</strong> {lang === 'vi'
                  ? 'Khi bạn đăng ký tài khoản đối tác hoặc khách hàng, chúng tôi thu thập thông tin tài khoản bao gồm tên, địa chỉ email, số điện thoại và mật khẩu. Đối với tài khoản đối tác kinh doanh, chúng tôi cũng thu thập thông tin kinh doanh như tên cơ sở, địa chỉ kinh doanh, giấy phép kinh doanh, thông tin tài khoản ngân hàng và danh mục sản phẩm.'
                  : 'When you register for a partner or customer account, we collect account information including name, email address, phone number and password. For business partner accounts, we also collect business information such as establishment name, business address, business license, bank account information and product catalog.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>1.2</strong> {lang === 'vi'
                  ? 'Chúng tôi lưu trữ lịch sử giao dịch bao gồm thông tin đơn hàng, phương thức thanh toán và địa chỉ giao hàng. Chúng tôi thu thập thông tin liên lạc như nội dung tin nhắn, email và phản hồi từ khách hàng khi bạn tương tác với dịch vụ hỗ trợ của chúng tôi.'
                  : 'We store transaction history including order information, payment methods and delivery addresses. We collect communication information such as message content, emails and customer feedback when you interact with our support services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>1.3</strong> {lang === 'vi'
                  ? 'Khi bạn truy cập và sử dụng nền tảng của chúng tôi, hệ thống tự động thu thập dữ liệu thiết bị bao gồm địa chỉ IP, loại trình duyệt, hệ điều hành và mã định danh thiết bị duy nhất. Chúng tôi theo dõi dữ liệu sử dụng như các trang bạn truy cập, thời gian truy cập, hành vi điều hướng và cách bạn tương tác với các tính năng của nền tảng.'
                  : 'When you access and use our platform, the system automatically collects device data including IP address, browser type, operating system and unique device identifier. We track usage data such as pages you visit, access times, navigation behavior and how you interact with platform features.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>1.4</strong> {lang === 'vi'
                  ? 'Dữ liệu vị trí được thu thập dưới dạng vị trí địa lý ước tính từ địa chỉ IP hoặc vị trí GPS chính xác nếu bạn cấp quyền truy cập. Cookies và công nghệ theo dõi tương tự được sử dụng để cải thiện trải nghiệm của bạn, với chi tiết được mô tả trong Mục 4 bên dưới.'
                  : 'Location data is collected as approximate geographic location from IP address or precise GPS location if you grant access permission. Cookies and similar tracking technologies are used to enhance your experience, with details described in Section 4 below.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>1.5</strong> {lang === 'vi'
                  ? 'Chúng tôi nhận thông tin từ các nhà cung cấp dịch vụ thanh toán để xác minh giao dịch và đảm bảo tính bảo mật của các khoản thanh toán. Dịch vụ phân tích bên thứ ba cung cấp dữ liệu về cách người dùng tương tác với nền tảng, giúp chúng tôi cải thiện chất lượng dịch vụ. Tất cả thông tin từ bên thứ ba được xử lý theo các thỏa thuận bảo mật nghiêm ngặt và chỉ được sử dụng cho các mục đích đã nêu trong Chính Sách này.'
                  : 'We receive information from payment service providers to verify transactions and ensure payment security. Third-party analytics services provide data on how users interact with the platform, helping us improve service quality. All third-party information is processed under strict confidentiality agreements and used only for purposes stated in this Policy.'}</p>
              </section>

              {/* 2. HOW WE USE INFORMATION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '2. CÁCH CHÚNG TÔI SỬ DỤNG THÔNG TIN' : '2. HOW WE USE INFORMATION'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>2.1</strong> {lang === 'vi'
                  ? 'Chúng tôi sử dụng thông tin của bạn để xử lý đơn hàng từ khách hàng đến đối tác, xử lý các khoản thanh toán thông qua các phương thức thanh toán đã chọn và điều phối quá trình giao hàng. Thông tin tài khoản được sử dụng để xác thực danh tính, cung cấp hỗ trợ khách hàng và đảm bảo bảo mật tài khoản của bạn.'
                  : 'We use your information to process orders from customers to partners, process payments through selected payment methods and coordinate delivery. Account information is used to authenticate identity, provide customer support and ensure your account security.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>2.2</strong> {lang === 'vi'
                  ? 'Theo quy định của Nghị định 117/2025/NĐ-CP, chúng tôi xử lý thông tin giao dịch và thanh toán để thực hiện nghĩa vụ khấu trừ thuế, khai báo và nộp thuế thay cho đối tác là hộ kinh doanh và cá nhân kinh doanh. Chúng tôi lưu trữ chứng từ giao dịch và hồ sơ thuế theo yêu cầu của pháp luật Việt Nam về kế toán và quản lý thuế.'
                  : 'Under Decree 117/2025/NĐ-CP, we process transaction and payment information to fulfill tax withholding obligations, declare and remit taxes on behalf of household and individual business partners. We retain transaction documents and tax records as required by Vietnamese accounting and tax management laws.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>2.3</strong> {lang === 'vi'
                  ? 'Dữ liệu sử dụng và hành vi người dùng được phân tích để hiểu cách bạn tương tác với nền tảng, xác định các vấn đề kỹ thuật cần khắc phục và phát triển các tính năng mới đáp ứng nhu cầu của người dùng. Chúng tôi sử dụng dữ liệu tổng hợp đã được ẩn danh hóa để nghiên cứu xu hướng thị trường và tối ưu hóa hiệu suất hệ thống.'
                  : 'Usage data and user behavior are analyzed to understand how you interact with the platform, identify technical issues requiring fixes and develop new features meeting user needs. We use aggregated anonymized data for market trend research and system performance optimization.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>2.4</strong> {lang === 'vi'
                  ? 'Thông tin liên hệ của bạn được sử dụng để gửi thông báo về trạng thái đơn hàng, cập nhật dịch vụ quan trọng và phản hồi các yêu cầu hỗ trợ của bạn. Chúng tôi có thể gửi thông báo kỹ thuật về bảo trì hệ thống, cập nhật bảo mật hoặc thay đổi điều khoản dịch vụ.'
                  : 'Your contact information is used to send order status notifications, important service updates and respond to your support requests. We may send technical notices about system maintenance, security updates or service terms changes.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>2.5</strong> {lang === 'vi'
                  ? 'Nếu bạn đã đồng ý nhận thông tin tiếp thị, chúng tôi có thể gửi cho bạn các chương trình khuyến mãi, ưu đãi đặc biệt, tin tức về sản phẩm mới và nội dung có liên quan đến sở thích của bạn. Bạn có thể rút lại sự đồng ý này bất kỳ lúc nào bằng cách nhấp vào liên kết hủy đăng ký trong email hoặc liên hệ trực tiếp với chúng tôi.'
                  : 'If you have consented to receive marketing information, we may send you promotions, special offers, new product news and content relevant to your interests. You can withdraw this consent at any time by clicking the unsubscribe link in emails or contacting us directly.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>2.6</strong> {lang === 'vi'
                  ? 'Chúng tôi phân tích các mẫu giao dịch và hành vi người dùng để phát hiện và ngăn chặn hoạt động gian lận, truy cập trái phép và các hành vi lạm dụng khác. Thông tin này giúp bảo vệ cả bạn và các đối tác kinh doanh khỏi các rủi ro bảo mật và tài chính.'
                  : 'We analyze transaction patterns and user behavior to detect and prevent fraudulent activity, unauthorized access and other abuses. This information helps protect both you and business partners from security and financial risks.'}</p>
              </section>

              {/* 3. SHARING AND DISCLOSURE */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '3. CHIA SẺ VÀ TIẾT LỘ THÔNG TIN' : '3. SHARING AND DISCLOSURE'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>3.1</strong> {lang === 'vi'
                  ? 'Chúng tôi cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn với bên thứ ba cho mục đích thương mại của họ. Mọi việc chia sẻ thông tin đều tuân theo các mục đích cụ thể được nêu trong Chính Sách này và chỉ với các bên có hợp đồng bảo mật với chúng tôi.'
                  : 'We are committed not to sell, rent or exchange your personal information with third parties for their commercial purposes. All information sharing follows specific purposes stated in this Policy and only with parties under confidentiality agreements with us.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.2</strong> {lang === 'vi'
                  ? 'Khi bạn đặt hàng qua nền tảng LÒ ĐỒ ĂN, thông tin đơn hàng bao gồm tên, số điện thoại, địa chỉ giao hàng và chi tiết món ăn được chia sẻ với nhà hàng đối tác để họ có thể xử lý và hoàn thành đơn hàng của bạn. Nhà hàng chỉ được phép sử dụng thông tin này cho mục đích thực hiện đơn hàng và hỗ trợ khách hàng liên quan đến đơn hàng đó.'
                  : 'When you place an order through the LÒ ĐỒ ĂN platform, order information including name, phone number, delivery address and food details is shared with partner restaurants so they can process and complete your order. Restaurants are only permitted to use this information for order fulfillment and customer support related to that order.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.3</strong> {lang === 'vi'
                  ? 'Chúng tôi làm việc với các nhà cung cấp dịch vụ bên thứ ba đáng tin cậy để vận hành nền tảng. Các nhà cung cấp xử lý thanh toán nhận thông tin giao dịch cần thiết để xử lý các khoản thanh toán của bạn một cách an toàn. Dịch vụ lưu trữ đám mây lưu giữ dữ liệu của chúng tôi trên các máy chủ bảo mật. Các công cụ phân tích giúp chúng tôi hiểu cách người dùng tương tác với nền tảng thông qua dữ liệu đã được ẩn danh hóa. Nhà cung cấp dịch vụ email và SMS giúp chúng tôi gửi thông báo quan trọng cho bạn. Tất cả các nhà cung cấp này đều ký kết thỏa thuận bảo mật nghiêm ngặt và chỉ được phép sử dụng thông tin của bạn để cung cấp dịch vụ cho chúng tôi.'
                  : 'We work with trusted third-party service providers to operate the platform. Payment processors receive transaction information necessary to process your payments securely. Cloud hosting services store our data on secure servers. Analytics tools help us understand how users interact with the platform through anonymized data. Email and SMS service providers help us send important notifications to you. All these providers sign strict confidentiality agreements and are only permitted to use your information to provide services to us.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.4</strong> {lang === 'vi'
                  ? 'Chúng tôi có thể tiết lộ thông tin cá nhân của bạn khi được yêu cầu bởi luật pháp, lệnh của tòa án, trát đòi hầu tòa hoặc yêu cầu từ cơ quan chính phủ có thẩm quyền. Điều này bao gồm việc tuân thủ các yêu cầu từ cơ quan thuế, cơ quan điều tra hoặc các cơ quan quản lý khác theo quy định của pháp luật Việt Nam. Chúng tôi sẽ xem xét cẩn thận mọi yêu cầu để đảm bảo tính hợp pháp trước khi tiết lộ thông tin.'
                  : 'We may disclose your personal information when required by law, court order, subpoena or request from competent government authority. This includes complying with requests from tax authorities, investigative agencies or other regulatory bodies as required by Vietnamese law. We will carefully review all requests to ensure legality before disclosing information.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.5</strong> {lang === 'vi'
                  ? 'Chúng tôi có thể sử dụng và tiết lộ thông tin khi cần thiết để thực thi Điều Khoản Dịch Vụ, điều tra và ngăn chặn gian lận, bảo vệ an ninh của nền tảng, bảo vệ quyền lợi và tài sản của chúng tôi hoặc của người dùng khác, và ngăn chặn hoạt động bất hợp pháp hoặc gây hại.'
                  : 'We may use and disclose information when necessary to enforce Terms of Service, investigate and prevent fraud, protect platform security, protect our rights and property or those of other users, and prevent illegal or harmful activities.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>3.6</strong> {lang === 'vi'
                  ? 'Trong trường hợp Ovenly tham gia vào quá trình sáp nhập, mua lại, bán tài sản, tái cơ cấu hoặc các giao dịch doanh nghiệp tương tự, thông tin cá nhân có thể được chuyển giao cho bên kế thừa hoặc bên mua như một phần của giao dịch. Chúng tôi sẽ thông báo cho bạn trước ít nhất ba mươi ngày về bất kỳ sự thay đổi quyền sở hữu nào và bạn có quyền phản đối việc chuyển giao. Bên kế thừa sẽ phải cam kết tuân thủ Chính Sách Bảo Mật này hoặc yêu cầu sự đồng ý mới từ bạn.'
                  : 'In event Ovenly participates in merger, acquisition, asset sale, restructuring or similar business transactions, personal information may be transferred to successor or buyer as part of transaction. We will notify you at least thirty days in advance of any ownership changes and you have right to object to transfer. Successor must commit to comply with this Privacy Policy or request new consent from you.'}</p>
              </section>

              {/* 4. COOKIES */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '4. COOKIES VÀ CÔNG NGHỆ THEO DÕI' : '4. COOKIES AND TRACKING TECHNOLOGIES'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>4.1</strong> {lang === 'vi'
                  ? 'Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập nền tảng của chúng tôi. Chúng tôi sử dụng cookies và công nghệ theo dõi tương tự để duy trì phiên đăng nhập của bạn, ghi nhớ các tùy chọn và cài đặt, hiểu cách bạn sử dụng nền tảng, cải thiện hiệu suất và tốc độ tải trang, tăng cường bảo mật bằng cách phát hiện hoạt động đáng ngờ, và cung cấp nội dung được cá nhân hóa phù hợp với sở thích của bạn.'
                  : 'Cookies are small text files stored on your device when you visit our platform. We use cookies and similar tracking technologies to maintain your login session, remember your preferences and settings, understand how you use the platform, improve performance and page load speed, enhance security by detecting suspicious activity, and deliver personalized content matching your interests.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.2</strong> {lang === 'vi'
                  ? 'Cookies cần thiết là bắt buộc để nền tảng hoạt động đúng cách. Chúng cho phép bạn điều hướng trên trang web, sử dụng các tính năng cơ bản như đăng nhập vào tài khoản, thêm món ăn vào giỏ hàng và hoàn tất đơn hàng. Các cookies bảo mật giúp xác thực danh tính của bạn và bảo vệ tài khoản khỏi truy cập trái phép. Bạn không thể tắt các cookies này vì chúng cần thiết cho hoạt động cơ bản của dịch vụ.'
                  : 'Essential cookies are necessary for platform to function properly. They allow you to navigate the site, use basic features like logging into your account, adding food items to cart and completing orders. Security cookies help authenticate your identity and protect account from unauthorized access. You cannot disable these cookies as they are necessary for basic service operation.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.3</strong> {lang === 'vi'
                  ? 'Cookies chức năng ghi nhớ các lựa chọn của bạn để cải thiện trải nghiệm sử dụng. Chúng lưu trữ ngôn ngữ hiển thị mà bạn đã chọn, địa chỉ giao hàng thường dùng, tùy chọn hiển thị giao diện và các cài đặt cá nhân khác. Mặc dù bạn có thể tắt các cookies này, việc làm như vậy có thể khiến một số tính năng không hoạt động tối ưu và bạn sẽ phải nhập lại các tùy chọn mỗi lần truy cập.'
                  : 'Functional cookies remember your choices to improve user experience. They store your selected display language, frequently used delivery addresses, interface display preferences and other personal settings. While you can disable these cookies, doing so may cause some features not to work optimally and you will need to re-enter preferences each visit.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.4</strong> {lang === 'vi'
                  ? 'Chúng tôi sử dụng cookies phân tích để thu thập thông tin về cách người dùng tương tác với nền tảng. Dữ liệu này được ẩn danh hóa và tổng hợp để giúp chúng tôi hiểu các trang nào được truy cập nhiều nhất, tính năng nào được sử dụng thường xuyên, thời gian người dùng dành cho từng phần của trang web, và các vấn đề kỹ thuật cần được khắc phục. Thông tin này giúp chúng tôi cải thiện cấu trúc trang web, tối ưu hóa hiệu suất và phát triển các tính năng mới đáp ứng nhu cầu người dùng.'
                  : 'We use analytics cookies to collect information about how users interact with platform. This data is anonymized and aggregated to help us understand which pages are visited most, which features are used frequently, how much time users spend on each section of site, and what technical issues need fixing. This information helps us improve site structure, optimize performance and develop new features meeting user needs.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.5</strong> {lang === 'vi'
                  ? 'Cookies quảng cáo được sử dụng để cung cấp nội dung quảng cáo phù hợp với sở thích của bạn dựa trên các trang bạn đã xem và hoạt động trước đó trên nền tảng. Chúng giúp chúng tôi đo lường hiệu quả của các chiến dịch quảng cáo và giới hạn số lần bạn thấy cùng một quảng cáo. Các cookies này không truy cập thông tin cá nhân nhạy cảm và bạn có thể từ chối cookies quảng cáo mà không ảnh hưởng đến khả năng sử dụng các chức năng cơ bản của nền tảng.'
                  : 'Advertising cookies are used to deliver advertising content relevant to your interests based on pages you have viewed and previous activity on platform. They help us measure effectiveness of advertising campaigns and limit number of times you see same ad. These cookies do not access sensitive personal information and you can opt out of advertising cookies without affecting ability to use basic platform functions.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>4.6</strong> {lang === 'vi'
                  ? 'Hầu hết các trình duyệt web cho phép bạn kiểm soát cookies thông qua cài đặt trình duyệt. Bạn có thể chọn chặn tất cả cookies, chỉ chấp nhận cookies từ các trang web cụ thể, hoặc xóa cookies hiện có. Tuy nhiên, lưu ý rằng việc chặn hoặc xóa cookies có thể ảnh hưởng đến khả năng sử dụng một số tính năng của nền tảng. Để tìm hiểu cách quản lý cookies trong trình duyệt của bạn, vui lòng tham khảo phần trợ giúp hoặc hướng dẫn của trình duyệt đó.'
                  : 'Most web browsers allow you to control cookies through browser settings. You can choose to block all cookies, only accept cookies from specific sites, or delete existing cookies. However, note that blocking or deleting cookies may affect ability to use some platform features. To learn how to manage cookies in your browser, please refer to help section or instructions for that browser.'}</p>
              </section>

              {/* 5. DATA SECURITY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '5. BẢO MẬT DỮ LIỆU' : '5. DATA SECURITY'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>5.1</strong> {lang === 'vi'
                  ? 'Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức phù hợp với tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, tiết lộ, thay đổi hoặc phá hủy. Hệ thống bảo mật của chúng tôi được thiết kế theo mô hình nhiều lớp để đảm bảo dữ liệu của bạn được bảo vệ ở mọi giai đoạn xử lý.'
                  : 'We implement technical and organizational security measures appropriate to industry standards to protect your personal information from unauthorized access, disclosure, alteration or destruction. Our security system is designed in multi-layered model to ensure your data is protected at every processing stage.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>5.2</strong> {lang === 'vi'
                  ? 'Tất cả dữ liệu nhạy cảm được mã hóa khi truyền tải qua Internet sử dụng giao thức bảo mật SSL/TLS tiêu chuẩn ngành. Thông tin đặc biệt nhạy cảm như chi tiết thanh toán và mật khẩu cũng được mã hóa khi lưu trữ trên máy chủ của chúng tôi. Chúng tôi sử dụng các thuật toán mã hóa mạnh và thường xuyên cập nhật các phương thức mã hóa để đối phó với các mối đe dọa bảo mật mới.'
                  : 'All sensitive data is encrypted during transmission over Internet using industry-standard SSL/TLS security protocols. Particularly sensitive information such as payment details and passwords is also encrypted when stored on our servers. We use strong encryption algorithms and regularly update encryption methods to counter new security threats.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>5.3</strong> {lang === 'vi'
                  ? 'Quyền truy cập vào thông tin cá nhân được giới hạn nghiêm ngặt chỉ cho những nhân viên, nhà thầu và đại lý có nhu cầu hợp pháp để biết thông tin đó nhằm xử lý thông tin thay mặt chúng tôi. Tất cả những người có quyền truy cập đều phải tuân thủ các nghĩa vụ bảo mật hợp đồng nghiêm ngặt và có thể bị xử lý kỷ luật hoặc chấm dứt hợp đồng nếu không tuân thủ.'
                  : 'Access to personal information is strictly limited to employees, contractors and agents who have legitimate need to know such information to process it on our behalf. All those with access must comply with strict contractual confidentiality obligations and may face disciplinary action or contract termination for non-compliance.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>5.4</strong> {lang === 'vi'
                  ? 'Chúng tôi duy trì hệ thống giám sát bảo mật hoạt động liên tục để phát hiện và ngăn chặn các mối đe dọa bảo mật. Các công cụ tự động quét các hoạt động đáng ngờ, nỗ lực truy cập trái phép và các mẫu hành vi bất thường. Khi phát hiện sự cố bảo mật tiềm ẩn, hệ thống của chúng tôi sẽ tự động kích hoạt các biện pháp bảo vệ và thông báo cho đội ngũ bảo mật để điều tra và xử lý.'
                  : 'We maintain continuously operating security monitoring system to detect and prevent security threats. Automated tools scan for suspicious activity, unauthorized access attempts and abnormal behavior patterns. When potential security incident is detected, our system automatically triggers protective measures and notifies security team for investigation and handling.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>5.5</strong> {lang === 'vi'
                  ? 'Chúng tôi thường xuyên tiến hành đánh giá bảo mật và kiểm thử thâm nhập để xác định và khắc phục các lỗ hổng bảo mật. Hệ thống và phần mềm được cập nhật thường xuyên với các bản vá bảo mật mới nhất. Chúng tôi cũng xem xét và cập nhật các chính sách và quy trình bảo mật của mình để phản ánh các phương pháp hay nhất hiện tại trong ngành.'
                  : 'We regularly conduct security assessments and penetration testing to identify and fix security vulnerabilities. Systems and software are regularly updated with latest security patches. We also review and update our security policies and procedures to reflect current industry best practices.'}</p>
                
                <div style={{ padding: 16, background: '#FEF9C3', border: '2px solid #EAB308', borderRadius: 8, marginTop: 16 }}>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: '#854D0E' }}>
                    {lang === 'vi' ? 'LƯU Ý QUAN TRỌNG VỀ BẢO MẬT' : 'IMPORTANT SECURITY NOTE'}
                  </p>
                  <p style={{ fontSize: 14, color: '#713F12' }}>
                    {lang === 'vi'
                      ? 'Mặc dù chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt, không có phương pháp truyền tải hoặc lưu trữ dữ liệu điện tử nào trên Internet là an toàn tuyệt đối một trăm phần trăm. Chúng tôi không thể đảm bảo an ninh tuyệt đối cho dữ liệu của bạn. Bạn cũng có trách nhiệm bảo vệ tài khoản của mình bằng cách sử dụng mật khẩu mạnh, không chia sẻ thông tin đăng nhập và thông báo ngay cho chúng tôi nếu phát hiện bất kỳ hoạt động đáng ngờ nào.'
                      : 'While we apply strict security measures, no method of electronic data transmission or storage over Internet is absolutely one hundred percent secure. We cannot guarantee absolute security for your data. You also have responsibility to protect your account by using strong passwords, not sharing login information and immediately notifying us if you detect any suspicious activity.'}
                  </p>
                </div>
              </section>

              {/* 6. DATA RETENTION */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '6. LƯU TRỮ DỮ LIỆU' : '6. DATA RETENTION'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>6.1</strong> {lang === 'vi'
                  ? 'Chúng tôi chỉ lưu giữ thông tin cá nhân của bạn trong thời gian cần thiết để đạt được các mục đích mà thông tin đó được thu thập hoặc theo yêu cầu của pháp luật. Thời gian lưu giữ cụ thể phụ thuộc vào loại thông tin và mục đích sử dụng. Sau khi hết thời hạn lưu giữ cần thiết, chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin của bạn một cách an toàn.'
                  : 'We only retain your personal information for as long as necessary to achieve purposes for which it was collected or as required by law. Specific retention period depends on type of information and purpose of use. After necessary retention period expires, we will securely delete or anonymize your information.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.2</strong> {lang === 'vi'
                  ? 'Thông tin tài khoản và hồ sơ cá nhân được lưu giữ trong suốt thời gian tài khoản của bạn còn hoạt động và trong thời gian cần thiết để cung cấp các dịch vụ bạn đã yêu cầu. Nếu tài khoản không có hoạt động nào trong thời gian hai mươi bốn tháng, chúng tôi có thể liên hệ với bạn để xác nhận xem bạn có muốn tiếp tục duy trì tài khoản hay không.'
                  : 'Account information and personal profile are retained for as long as your account remains active and for time necessary to provide services you have requested. If account has no activity for twenty-four months, we may contact you to confirm whether you wish to continue maintaining account.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.3</strong> {lang === 'vi'
                  ? 'Theo quy định của pháp luật Việt Nam về kế toán và quản lý thuế, chúng tôi phải lưu giữ hồ sơ kế toán và chứng từ thuế trong thời gian tối thiểu mười năm kể từ cuối năm tài chính liên quan. Điều này bao gồm hóa đơn, biên lai, chứng từ giao dịch và các tài liệu liên quan đến nghĩa vụ thuế. Theo yêu cầu của Nghị định 117/2025/NĐ-CP, chúng tôi lưu trữ chứng từ khấu trừ thuế và hồ sơ khai thuế trong thời gian tối thiểu năm năm.'
                  : 'Under Vietnamese accounting and tax management law, we must retain accounting records and tax documents for minimum period of ten years from end of relevant fiscal year. This includes invoices, receipts, transaction documents and documents related to tax obligations. As required by Decree 117/2025/NĐ-CP, we store tax withholding certificates and tax declaration records for minimum period of five years.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.4</strong> {lang === 'vi'
                  ? 'Dữ liệu đã được ẩn danh hóa và tổng hợp cho mục đích phân tích có thể được lưu giữ trong thời gian dài hơn hoặc vô thời hạn vì dữ liệu này không thể được sử dụng để xác định cá nhân cụ thể nào. Dữ liệu ẩn danh này giúp chúng tôi hiểu xu hướng thị trường, cải thiện dịch vụ và phát triển các tính năng mới.'
                  : 'Data that has been anonymized and aggregated for analytics purposes may be retained for longer period or indefinitely because this data cannot be used to identify any specific individual. This anonymous data helps us understand market trends, improve services and develop new features.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>6.5</strong> {lang === 'vi'
                  ? 'Khi bạn yêu cầu xóa tài khoản hoặc sau khi chúng tôi xác nhận rằng bạn muốn đóng tài khoản không hoạt động, chúng tôi sẽ xóa vĩnh viễn thông tin cá nhân của bạn trong vòng ba mươi ngày, trừ khi pháp luật yêu cầu chúng tôi lưu giữ lâu hơn cho các mục đích như tuân thủ nghĩa vụ pháp lý, giải quyết tranh chấp hoặc thực thi thỏa thuận. Bạn sẽ nhận được xác nhận khi quá trình xóa hoàn tất.'
                  : 'When you request account deletion or after we confirm you wish to close inactive account, we will permanently delete your personal information within thirty days, unless law requires us to retain it longer for purposes such as complying with legal obligations, resolving disputes or enforcing agreements. You will receive confirmation when deletion process is complete.'}</p>
              </section>

              {/* 7. YOUR RIGHTS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '7. QUYỀN CỦA BẠN' : '7. YOUR RIGHTS'}
                </h2>
                
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Theo quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân, bạn có các quyền sau đây liên quan đến thông tin cá nhân của mình:'
                  : 'Under Vietnamese law on personal data protection, you have the following rights regarding your personal information:'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.1</strong> {lang === 'vi'
                  ? 'Bạn có quyền yêu cầu một bản sao thông tin cá nhân mà chúng tôi đang lưu giữ về bạn. Chúng tôi sẽ cung cấp cho bạn thông tin về loại dữ liệu chúng tôi đang xử lý, mục đích xử lý, các bên nhận dữ liệu và thời gian lưu giữ dự kiến. Bản sao đầu tiên sẽ được cung cấp miễn phí trong vòng ba mươi ngày kể từ khi nhận được yêu cầu hợp lệ.'
                  : 'You have right to request a copy of personal information we hold about you. We will provide you with information about type of data we are processing, processing purposes, data recipients and expected retention period. First copy will be provided free of charge within thirty days of receiving valid request.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.2</strong> {lang === 'vi'
                  ? 'Bạn có quyền yêu cầu chúng tôi sửa chữa bất kỳ thông tin cá nhân nào không chính xác hoặc bổ sung thông tin không đầy đủ. Chúng tôi sẽ xác minh danh tính của bạn và thực hiện cập nhật trong thời gian hợp lý sau khi nhận được yêu cầu. Trong một số trường hợp, chúng tôi có thể yêu cầu bạn cung cấp bằng chứng về thông tin chính xác.'
                  : 'You have right to request us to correct any inaccurate personal information or supplement incomplete information. We will verify your identity and make updates within reasonable time after receiving request. In some cases, we may ask you to provide proof of accurate information.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.3</strong> {lang === 'vi' ? 'Bạn có quyền yêu cầu xóa thông tin cá nhân của mình trong các trường hợp sau:' : 'You have right to request deletion of your personal information in following cases:'}</p>
                <div style={{ paddingLeft: 20, marginBottom: 12 }}>
                  <p style={{ marginBottom: 8 }}>(a) {lang === 'vi' ? 'Thông tin không còn cần thiết cho mục đích đã thu thập;' : 'Information is no longer necessary for purposes collected;'}</p>
                  <p style={{ marginBottom: 8 }}>(b) {lang === 'vi' ? 'Bạn rút lại sự đồng ý và không có cơ sở pháp lý nào khác cho việc xử lý;' : 'You withdraw consent and there is no other legal basis for processing;'}</p>
                  <p style={{ marginBottom: 8 }}>(c) {lang === 'vi' ? 'Thông tin được xử lý trái pháp luật;' : 'Information is processed illegally;'}</p>
                  <p style={{ marginBottom: 8 }}>(d) {lang === 'vi' ? 'Việc xóa là cần thiết để tuân thủ nghĩa vụ pháp lý.' : 'Deletion is necessary to comply with legal obligation.'}</p>
                </div>
                <p style={{ marginBottom: 12 }}>{lang === 'vi'
                  ? 'Tuy nhiên, chúng tôi có thể từ chối yêu cầu xóa nếu việc lưu giữ thông tin là cần thiết để tuân thủ nghĩa vụ pháp lý, thiết lập hoặc bảo vệ các yêu cầu pháp lý, hoặc vì lý do lợi ích công cộng.'
                  : 'However, we may refuse deletion request if retaining information is necessary to comply with legal obligation, establish or defend legal claims, or for public interest reasons.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.4</strong> {lang === 'vi'
                  ? 'Bạn có quyền yêu cầu chúng tôi hạn chế xử lý thông tin cá nhân của bạn trong một số trường hợp nhất định, chẳng hạn như khi bạn đang tranh chấp về tính chính xác của dữ liệu, khi việc xử lý là trái pháp luật nhưng bạn phản đối việc xóa, khi chúng tôi không còn cần dữ liệu nhưng bạn cần nó để thiết lập yêu cầu pháp lý, hoặc khi bạn đã phản đối việc xử lý và đang chờ xác minh. Khi xử lý bị hạn chế, chúng tôi chỉ có thể lưu trữ dữ liệu và không thể xử lý thêm trừ khi có sự đồng ý của bạn.'
                  : 'You have right to request us to restrict processing of your personal information in certain cases, such as when you are disputing accuracy of data, when processing is illegal but you object to deletion, when we no longer need data but you need it to establish legal claim, or when you have objected to processing and are awaiting verification. When processing is restricted, we may only store data and cannot further process it without your consent.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.5</strong> {lang === 'vi'
                  ? 'Bạn có quyền nhận thông tin cá nhân mà bạn đã cung cấp cho chúng tôi ở định dạng có cấu trúc, được sử dụng phổ biến và máy có thể đọc được. Bạn cũng có quyền yêu cầu chúng tôi chuyển thông tin này trực tiếp cho bên thứ ba khác nếu khả thi về mặt kỹ thuật. Quyền này áp dụng khi việc xử lý dựa trên sự đồng ý của bạn hoặc hợp đồng và được thực hiện bằng phương tiện tự động.'
                  : 'You have right to receive personal information you provided to us in structured, commonly used and machine-readable format. You also have right to request us to transfer this information directly to another third party if technically feasible. This right applies when processing is based on your consent or contract and is performed by automated means.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.6</strong> {lang === 'vi'
                  ? 'Bạn có quyền phản đối việc xử lý thông tin cá nhân của mình dựa trên lợi ích hợp pháp của chúng tôi. Chúng tôi sẽ ngừng xử lý trừ khi chúng tôi có thể chứng minh các cơ sở hợp pháp chính đáng cho việc xử lý vượt trội hơn quyền lợi, quyền tự do của bạn, hoặc cho việc thiết lập, thực hiện hoặc bảo vệ các yêu cầu pháp lý. Bạn có quyền tuyệt đối để phản đối việc xử lý cho mục đích tiếp thị trực tiếp bất kỳ lúc nào.'
                  : 'You have right to object to processing of your personal information based on our legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds for processing that override your interests, rights and freedoms, or for establishment, exercise or defense of legal claims. You have absolute right to object to processing for direct marketing purposes at any time.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>7.7</strong> {lang === 'vi'
                  ? 'Trong trường hợp việc xử lý dựa trên sự đồng ý của bạn, bạn có quyền rút lại sự đồng ý đó bất kỳ lúc nào. Việc rút lại sự đồng ý không ảnh hưởng đến tính hợp pháp của việc xử lý dựa trên sự đồng ý trước khi rút lại. Tuy nhiên, xin lưu ý rằng việc rút lại một số sự đồng ý nhất định có thể khiến chúng tôi không thể tiếp tục cung cấp một số dịch vụ cho bạn.'
                  : 'Where processing is based on your consent, you have right to withdraw that consent at any time. Withdrawal of consent does not affect lawfulness of processing based on consent before withdrawal. However, please note that withdrawing certain consents may mean we cannot continue to provide some services to you.'}</p>
                
                <p style={{ marginTop: 16 }}>
                  {lang === 'vi'
                    ? 'Để thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi tại '
                    : 'To exercise any of these rights, please contact us at '}
                  <a href="mailto:hello@ovenly.io" style={{ color: PRIMARY, textDecoration: 'underline', fontWeight: 600 }}>
                    hello@ovenly.io
                  </a>
                  {lang === 'vi' 
                    ? '. Chúng tôi sẽ xác minh danh tính của bạn và phản hồi yêu cầu của bạn trong vòng ba mươi ngày. Trong trường hợp yêu cầu phức tạp, chúng tôi có thể gia hạn thời gian phản hồi thêm ba mươi ngày và sẽ thông báo cho bạn về việc gia hạn cùng với lý do.'
                    : '. We will verify your identity and respond to your request within thirty days. For complex requests, we may extend response time by additional thirty days and will notify you of extension with reasons.'}
                </p>
              </section>

              {/* 8. INTERNATIONAL DATA TRANSFERS */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '8. CHUYỂN GIAO DỮ LIỆU QUỐC TẾ' : '8. INTERNATIONAL DATA TRANSFERS'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>8.1</strong> {lang === 'vi'
                  ? 'Dữ liệu của bạn có thể được chuyển và lưu trữ tại các máy chủ nằm ngoài Việt Nam nhằm cung cấp các dịch vụ liên quan đến lưu trữ đám mây, xử lý thanh toán quốc tế và phân tích hoạt động nền tảng. Việc chuyển giao này được thực hiện để đảm bảo hiệu suất, độ tin cậy và khả năng mở rộng của Dịch Vụ.'
                  : 'Your data may be transferred to and stored on servers located outside Vietnam to provide services related to cloud hosting, international payment processing and platform analytics. These transfers are made to ensure performance, reliability and scalability of Services.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>8.2</strong> {lang === 'vi'
                  ? 'Chúng tôi đảm bảo rằng các nhà cung cấp dịch vụ bên thứ ba xử lý dữ liệu của bạn áp dụng các biện pháp bảo mật phù hợp và tuân thủ các tiêu chuẩn bảo vệ dữ liệu quốc tế. Tất cả các thỏa thuận với nhà cung cấp bao gồm các điều khoản bắt buộc về bảo mật dữ liệu, giới hạn quyền truy cập và yêu cầu thông báo vi phạm.'
                  : 'We ensure that third-party service providers processing your data apply appropriate security measures and comply with international data protection standards. All agreements with providers include mandatory terms regarding data security, access restrictions and breach notification requirements.'}</p>
                
                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Bạn có quyền yêu cầu thông tin chi tiết về các quốc gia mà dữ liệu của bạn được chuyển đến và các biện pháp bảo vệ cụ thể được áp dụng bằng cách liên hệ với chúng tôi.'
                    : 'You have the right to request detailed information about countries where your data is transferred and specific safeguards applied by contacting us.'}
                </p>
              </section>

              {/* 9. CHILDREN'S PRIVACY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '9. QUYỀN RIÊNG TƯ TRẺ EM' : '9. CHILDREN\'S PRIVACY'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>9.1</strong> {lang === 'vi'
                  ? 'Dịch Vụ của chúng tôi không nhắm đến và không được thiết kế để thu hút trẻ em dưới mười sáu tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ bất kỳ ai mà chúng tôi biết là dưới mười sáu tuổi. Nếu bạn là cha mẹ hoặc người giám hộ và tin rằng con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ với chúng tôi ngay lập tức.'
                  : 'Our Services are not directed to and not designed to attract children under sixteen years of age. We do not knowingly collect personal information from anyone we know to be under sixteen years old. If you are parent or guardian and believe your child has provided personal information to us, please contact us immediately.'}</p>
                
                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Nếu chúng tôi phát hiện rằng chúng tôi đã vô tình thu thập thông tin cá nhân từ trẻ em dưới mười sáu tuổi mà không có sự đồng ý hợp lệ từ cha mẹ hoặc người giám hộ, chúng tôi sẽ thực hiện các bước để xóa thông tin đó khỏi hệ thống của chúng tôi trong thời gian sớm nhất có thể.'
                    : 'If we discover we have inadvertently collected personal information from children under sixteen without valid parental or guardian consent, we will take steps to delete such information from our systems as soon as possible.'}
                </p>
              </section>

              {/* 10. CHANGES TO POLICY */}
              <section>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '10. THAY ĐỔI CHÍNH SÁCH' : '10. CHANGES TO POLICY'}
                </h2>
                
                <p style={{ marginBottom: 12 }}><strong>10.1</strong> {lang === 'vi'
                  ? 'Chúng tôi có thể cập nhật Chính Sách Bảo Mật này theo thời gian để phản ánh các thay đổi về thực hành của chúng tôi, yêu cầu pháp lý mới, tiến bộ công nghệ hoặc vì các lý do hoạt động khác. Khi chúng tôi thực hiện thay đổi quan trọng đối với Chính Sách này, chúng tôi sẽ thông báo cho bạn bằng cách đăng Chính Sách mới trên trang này và cập nhật ngày có hiệu lực ở đầu trang.'
                  : 'We may update this Privacy Policy from time to time to reflect changes to our practices, new legal requirements, technological advances or for other operational reasons. When we make material changes to this Policy, we will notify you by posting new Policy on this page and updating effective date at top of page.'}</p>
                
                <p style={{ marginBottom: 12 }}><strong>10.2</strong> {lang === 'vi'
                  ? 'Đối với các thay đổi quan trọng ảnh hưởng đáng kể đến quyền của bạn, chúng tôi sẽ cung cấp thông báo nổi bật hơn, có thể bao gồm gửi email đến địa chỉ đã đăng ký hoặc hiển thị thông báo trên nền tảng trước khi thay đổi có hiệu lực. Chúng tôi khuyến khích bạn xem lại Chính Sách này định kỳ để được thông báo về cách chúng tôi bảo vệ thông tin của bạn.'
                  : 'For significant changes materially affecting your rights, we will provide more prominent notice, which may include sending email to registered address or displaying notice on platform before changes take effect. We encourage you to review this Policy periodically to stay informed about how we protect your information.'}</p>
                
                <p style={{ fontSize: 14, color: '#666' }}>
                  {lang === 'vi'
                    ? 'Việc bạn tiếp tục sử dụng Dịch Vụ sau khi các thay đổi có hiệu lực có nghĩa là bạn chấp nhận Chính Sách Bảo Mật đã được sửa đổi. Nếu bạn không đồng ý với bất kỳ thay đổi nào, bạn nên ngừng sử dụng Dịch Vụ và có thể yêu cầu xóa tài khoản của mình.'
                    : 'Your continued use of Services after changes take effect means you accept revised Privacy Policy. If you do not agree with any changes, you should stop using Services and may request deletion of your account.'}
                </p>
              </section>

              {/* 11. CONTACT */}
              <section style={{ borderTop: '2px solid #F0E8E0', paddingTop: 24 }}>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: '#000', marginBottom: 16 }}>
                  {lang === 'vi' ? '11. LIÊN HỆ' : '11. CONTACT US'}
                </h2>
                
                <p style={{ marginBottom: 16 }}>{lang === 'vi'
                  ? 'Nếu bạn có bất kỳ câu hỏi, mối quan ngại hoặc yêu cầu nào về Chính Sách Bảo Mật này hoặc thực hành bảo vệ dữ liệu của chúng tôi, vui lòng liên hệ:'
                  : 'If you have any questions, concerns or requests about this Privacy Policy or our data protection practices, please contact:'}</p>
                
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
                    ? 'Bạn cũng có quyền khiếu nại với cơ quan bảo vệ dữ liệu có thẩm quyền tại Việt Nam nếu bạn cho rằng việc xử lý dữ liệu cá nhân của bạn vi phạm luật hiện hành. Chúng tôi cam kết làm việc với bạn để giải quyết bất kỳ mối quan ngại nào một cách nhanh chóng và công bằng.'
                    : 'You also have right to lodge complaint with competent data protection authority in Vietnam if you believe our processing of your personal data violates applicable law. We are committed to working with you to resolve any concerns quickly and fairly.'}
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