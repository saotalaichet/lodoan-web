import Link from 'next/link';

const PRIMARY = '#8B1A1A';

const sections = [
  { title: 'Điều 1 — CAM KẾT BẢO MẬT', content: 'Ovenly cam kết bảo vệ thông tin cá nhân và tài chính của người dùng theo tiêu chuẩn cao nhất. Chúng tôi liên tục cải thiện hệ thống bảo mật để đảm bảo an toàn cho mọi giao dịch trên nền tảng.' },
  { title: 'Điều 2 — BẢO MẬT TÀI KHOẢN', content: 'Mật khẩu được mã hóa và không được lưu dưới dạng văn bản thô. Khuyến nghị sử dụng mật khẩu mạnh gồm chữ hoa chữ thường số và ký tự đặc biệt. Đăng xuất khỏi tài khoản sau khi sử dụng trên thiết bị công cộng. Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép vào tài khoản của bạn.' },
  { title: 'Điều 3 — BẢO MẬT GIAO DỊCH', content: 'Tất cả giao dịch thanh toán được xử lý qua cổng thanh toán bảo mật. Chúng tôi không lưu trữ thông tin thẻ ngân hàng đầy đủ của khách hàng. Mọi giao dịch được bảo vệ bằng kết nối mã hóa SSL.' },
  { title: 'Điều 4 — PHÒNG CHỐNG GIAN LẬN', content: 'Hệ thống tự động phát hiện và chặn các địa chỉ IP có hành vi đáng ngờ. Chúng tôi duy trì danh sách đen IP để bảo vệ nhà hàng và khách hàng khỏi hành vi gian lận. Mọi hành vi gian lận sẽ bị xử lý theo quy định pháp luật. Báo cáo hành vi gian lận qua email: support@ovenly.io' },
  { title: 'Điều 5 — TRÁCH NHIỆM NGƯỜI DÙNG', content: 'Không chia sẻ thông tin đăng nhập với bất kỳ ai. Không sử dụng tài khoản của người khác. Không sử dụng công cụ hoặc phần mềm tự động để can thiệp vào hệ thống. Báo ngay cho chúng tôi nếu phát hiện lỗ hổng bảo mật.' },
  { title: 'Điều 6 — XỬ LÝ SỰ CỐ', content: 'Nếu phát hiện sự cố bảo mật vui lòng báo cáo ngay qua support@ovenly.io. Chúng tôi cam kết xử lý sự cố trong vòng 24 giờ kể từ khi nhận được báo cáo.' },
  { title: 'Điều 7 — LƯU TRỮ DỮ LIỆU', content: 'Dữ liệu được lưu trữ trên máy chủ bảo mật tại Việt Nam. Chúng tôi lưu trữ dữ liệu theo đúng thời hạn quy định của pháp luật Việt Nam.' },
  { title: 'Điều 8 — LIÊN HỆ', content: 'Email: support@ovenly.io' },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← Quay lại</Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-gray-900 mb-1">CHÍNH SÁCH AN TOÀN THÔNG TIN</h1>
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