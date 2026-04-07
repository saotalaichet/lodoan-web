import Link from 'next/link';

const PRIMARY = '#8B1A1A';

const sections = [
  { title: 'Điều 1 — GIỚI THIỆU', content: 'Ovenly cam kết bảo vệ thông tin cá nhân của người dùng theo đúng quy định pháp luật Việt Nam. Chính sách này giải thích cách chúng tôi thu thập sử dụng và bảo vệ thông tin của bạn. Bằng việc sử dụng dịch vụ bạn đồng ý với chính sách này.' },
  { title: 'Điều 2 — THÔNG TIN CHÚNG TÔI THU THẬP', content: 'Thông tin cá nhân bao gồm họ tên số điện thoại địa chỉ email và địa chỉ giao hàng. Thông tin giao dịch bao gồm lịch sử đặt hàng và phương thức thanh toán. Thông tin thiết bị bao gồm địa chỉ IP loại thiết bị và trình duyệt. Dữ liệu vị trí khi bạn cho phép ứng dụng truy cập vị trí của bạn.' },
  { title: 'Điều 3 — MỤC ĐÍCH SỬ DỤNG', content: 'Xử lý và quản lý đơn hàng của bạn. Gửi thông báo liên quan đến đơn hàng qua email. Cải thiện chất lượng dịch vụ và trải nghiệm người dùng. Phòng chống gian lận và bảo vệ an toàn nền tảng. Tuân thủ các quy định pháp luật khi có yêu cầu từ cơ quan có thẩm quyền.' },
  { title: 'Điều 4 — CHIA SẺ THÔNG TIN', content: 'Chúng tôi chia sẻ thông tin giao hàng cần thiết với nhà hàng để thực hiện đơn hàng. Chúng tôi không bán thông tin cá nhân cho bên thứ ba. Chúng tôi có thể chia sẻ thông tin khi có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.' },
  { title: 'Điều 5 — BẢO MẬT DỮ LIỆU', content: 'Dữ liệu được lưu trữ trên hệ thống bảo mật. Chỉ nhân viên được cấp quyền mới có thể truy cập thông tin khách hàng. Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật tiêu chuẩn ngành.' },
  { title: 'Điều 6 — QUYỀN CỦA NGƯỜI DÙNG', content: 'Bạn có quyền yêu cầu xem chỉnh sửa hoặc xóa thông tin cá nhân của mình. Bạn có quyền từ chối nhận email tiếp thị bất kỳ lúc nào. Liên hệ support@ovenly.io để thực hiện các quyền này.' },
  { title: 'Điều 7 — COOKIE', content: 'Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập. Bạn có thể tắt cookie trong cài đặt trình duyệt tuy nhiên một số tính năng có thể bị ảnh hưởng.' },
  { title: 'Điều 8 — THÔNG TIN TRẺ EM', content: 'Dịch vụ không dành cho người dưới 13 tuổi. Chúng tôi không cố tình thu thập thông tin cá nhân của trẻ em dưới 13 tuổi.' },
  { title: 'Điều 9 — THAY ĐỔI CHÍNH SÁCH', content: 'Chính sách này có thể được cập nhật định kỳ. Chúng tôi sẽ thông báo cho người dùng về các thay đổi quan trọng qua email hoặc thông báo trên nền tảng. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận chính sách mới.' },
  { title: 'Điều 10 — LIÊN HỆ', content: 'Email: support@ovenly.io' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← Quay lại</Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-gray-900 mb-1">CHÍNH SÁCH BẢO MẬT THÔNG TIN</h1>
        <p className="text-sm text-gray-500 mb-1">LÒ ĐỒ ĂN — Nền tảng đặt món trực tuyến</p>
        <p className="text-xs text-gray-400 mb-8">Cập nhật lần cuối: 01/04/2026</p>
        <div className="space-y-0">
          {sections.map((s, i) => (
            <div key={i}>
              <div className="py-5">
                <h2 className="font-bold text-base mb-2" style={{ color: PRIMARY }}>{s.title}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{s.content}</p>
              </div>
              {i < sections.length - 1 && <div className="border-t border-gray-100" />}
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t border-gray-100 py-6 mt-4">
        <p className="text-xs text-gray-400 text-center">LÒ ĐỒ ĂN™ | Powered by Ovenly™</p>
      </footer>
    </div>
  );
}