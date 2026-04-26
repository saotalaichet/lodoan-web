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
          <p className="text-sm text-gray-400">{lang === 'vi' ? 'Cập nhật lần cuối: Tháng 4 năm 2026' : 'Last updated: April 2026'}</p>
          {lang === 'vi' ? (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Thông Tin Chúng Tôi Thu Thập</h2><p>Chúng tôi thu thập thông tin bạn cung cấp trực tiếp (tên, email, số điện thoại, địa chỉ giao hàng), thông tin đơn hàng và lịch sử giao dịch, dữ liệu sử dụng và thông tin thiết bị, và vị trí địa lý khi bạn cho phép.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Cách Chúng Tôi Sử Dụng Thông Tin</h2><p>Thông tin của bạn được sử dụng để xử lý và giao hàng đơn hàng, liên lạc về đơn hàng và dịch vụ, cải thiện trải nghiệm người dùng, tuân thủ các yêu cầu pháp lý, và ngăn chặn gian lận.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2A. Thời Gian Lưu Trữ Dữ Liệu</h2><ul className="list-disc list-inside space-y-2"><li><strong>Dữ liệu đơn hàng:</strong> Lưu trữ trong 30 ngày cho mục đích xử lý đơn hàng và hỗ trợ khách hàng</li><li><strong>Dữ liệu thanh toán:</strong> Lưu trữ theo yêu cầu pháp luật kế toán Việt Nam</li><li><strong>Dữ liệu phân tích:</strong> Dữ liệu đã ẩn danh có thể được lưu trữ lâu hơn để cải thiện dịch vụ</li></ul></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Chia Sẻ Thông Tin</h2><div className="space-y-3"><p className="font-semibold text-gray-900">Với Nhà Hàng Đối Tác</p><p>Nhà hàng nhận thông tin cần thiết để hoàn thành đơn hàng (tên, số điện thoại, địa chỉ) trong vòng <strong>30 ngày</strong>.</p><p className="font-semibold text-gray-900 mt-4">Với Chủ Nhà Hàng (Gói Premium)</p><p>Nhà hàng sử dụng gói premium có thể truy cập lịch sử đơn hàng và phân tích khách hàng để cải thiện dịch vụ. Dữ liệu được ẩn danh hóa và chỉ dùng cho mục đích phân tích kinh doanh.</p><p className="font-semibold text-gray-900 mt-4">Với Đối Tác Thanh Toán</p><p>Thông tin thanh toán được chia sẻ với MoMo, ZaloPay, VNPay để xử lý giao dịch an toàn.</p><p className="font-semibold text-gray-900 mt-4">Truyền Dữ Liệu Quốc Tế</p><p>Dữ liệu của bạn được lưu trữ trên máy chủ tại Hoa Kỳ (Railway) và Singapore. Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn quốc tế để bảo vệ dữ liệu của bạn.</p><p className="font-bold text-gray-900 mt-4">Chúng tôi KHÔNG BÁN thông tin cá nhân của bạn cho bên thứ ba.</p></div></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Bảo Mật Dữ Liệu</h2><p>Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin của bạn, bao gồm mã hóa SSL/TLS cho truyền tải dữ liệu, kiểm soát truy cập nghiêm ngặt, và giám sát bảo mật thường xuyên.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Quyền Của Bạn (Theo Luật Bảo Vệ Dữ Liệu Cá Nhân Việt Nam)</h2><p className="mb-3">Theo Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15, bạn có các quyền sau:</p><ul className="list-disc list-inside space-y-2"><li><strong>Truy cập:</strong> Xem dữ liệu cá nhân chúng tôi lưu trữ về bạn</li><li><strong>Chỉnh sửa:</strong> Cập nhật thông tin không chính xác</li><li><strong>Xóa:</strong> Yêu cầu xóa dữ liệu sau khi hoàn thành đơn hàng</li><li><strong>Rút lại đồng ý:</strong> Rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào</li><li><strong>Từ chối:</strong> Phản đối việc sử dụng dữ liệu cho mục đích cụ thể</li><li><strong>Khiếu nại:</strong> Liên hệ cơ quan chức năng nếu quyền của bạn bị vi phạm</li></ul><p className="mt-4">Để thực hiện các quyền này, vui lòng liên hệ: <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a></p><p className="text-sm text-gray-600 mt-2">Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng <strong>15 ngày</strong> kể từ khi nhận được.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Tuân Thủ Pháp Luật</h2><p>Chính sách bảo mật này tuân thủ:</p><ul className="list-disc list-inside space-y-1 mt-2"><li>Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15 (có hiệu lực từ 01/01/2026)</li><li>Nghị định 356/2025/NĐ-CP hướng dẫn thi hành Luật Bảo Vệ Dữ Liệu Cá Nhân</li><li>Luật Giao Dịch Điện Tử số 20/2023/QH15</li><li>Luật Bảo Vệ Quyền Lợi Người Tiêu Dùng số 19/2023/QH15</li></ul></section>
          </>) : (<>
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Information We Collect</h2><p>We collect information you provide directly (name, email, phone, delivery address), order information and transaction history, usage data and device information, and geographic location when you permit.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. How We Use Information</h2><p>Your information is used to process and fulfill orders, communicate about orders and services, improve user experience, comply with legal requirements, and prevent fraud.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2A. Data Retention</h2><ul className="list-disc list-inside space-y-2"><li><strong>Order data:</strong> Stored for 30 days for order processing and customer support</li><li><strong>Payment data:</strong> Retained as required by Vietnamese accounting law</li><li><strong>Analytics data:</strong> Anonymized data may be retained longer to improve services</li></ul></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Information Sharing</h2><div className="space-y-3"><p className="font-semibold text-gray-900">With Partner Restaurants</p><p>Restaurants receive necessary information to complete orders (name, phone, address) for <strong>30 days</strong>.</p><p className="font-semibold text-gray-900 mt-4">With Restaurant Owners (Premium Package)</p><p>Restaurants using premium packages may access order history and customer analytics to improve service. Data is anonymized and used only for business analysis purposes.</p><p className="font-semibold text-gray-900 mt-4">With Payment Partners</p><p>Payment information is shared with MoMo, ZaloPay, VNPay to securely process transactions.</p><p className="font-semibold text-gray-900 mt-4">International Data Transfers</p><p>Your data is stored on servers in the United States (Railway) and Singapore. We apply international security standards to protect your data.</p><p className="font-bold text-gray-900 mt-4">We DO NOT SELL your personal information to third parties.</p></div></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Data Security</h2><p>We use industry-standard security measures to protect your information, including SSL/TLS encryption for data transmission, strict access controls, and regular security monitoring.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Your Rights (Under Vietnam Personal Data Protection Law)</h2><p className="mb-3">Under Personal Data Protection Law No. 91/2025/QH15, you have the following rights:</p><ul className="list-disc list-inside space-y-2"><li><strong>Access:</strong> View personal data we store about you</li><li><strong>Rectification:</strong> Update inaccurate information</li><li><strong>Erasure:</strong> Request deletion of data after order completion</li><li><strong>Withdraw consent:</strong> Withdraw your consent to data processing at any time</li><li><strong>Object:</strong> Object to the use of data for specific purposes</li><li><strong>Complaint:</strong> Contact authorities if your rights are violated</li></ul><p className="mt-4">To exercise these rights, please contact: <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a></p><p className="text-sm text-gray-600 mt-2">We will respond to your request within <strong>15 days</strong> of receipt.</p></section>
            
            <section><h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Legal Compliance</h2><p>This privacy policy complies with:</p><ul className="list-disc list-inside space-y-1 mt-2"><li>Personal Data Protection Law No. 91/2025/QH15 (effective January 1, 2026)</li><li>Decree 356/2025/ND-CP implementing the Personal Data Protection Law</li><li>Law on Electronic Transactions No. 20/2023/QH15</li><li>Law on Consumer Rights Protection No. 19/2023/QH15</li></ul></section>
          </>)}
        </div>
      </div>
    </div>
  );
}