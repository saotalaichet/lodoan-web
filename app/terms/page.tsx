import Link from 'next/link';

const PRIMARY = '#8B1A1A';

const sections = [
  { title: 'Điều 1 — GIỚI THIỆU', content: 'LÒ ĐỒ ĂN là sàn giao dịch thương mại điện tử được vận hành bởi Công ty TNHH MTV Công Nghệ Ovenly. Nền tảng kết nối khách hàng với các nhà hàng và cơ sở ẩm thực. Bằng việc sử dụng dịch vụ hoặc tạo tài khoản bạn đồng ý với các điều khoản dưới đây. Nếu bạn không đồng ý vui lòng không sử dụng dịch vụ.' },
  { title: 'Điều 2 — ĐỊNH NGHĨA', content: 'Sàn LÒ ĐỒ ĂN là website và ứng dụng tại lodoan.vn. Nhà hàng là các đối tác cung cấp thực phẩm trên nền tảng. Khách hàng là cá nhân đặt hàng qua nền tảng. Đơn hàng là yêu cầu mua thực phẩm được xác nhận giữa khách hàng và nhà hàng.' },
  { title: 'Điều 3 — TÀI KHOẢN VÀ BẢO MẬT', content: 'Người dùng chịu trách nhiệm bảo mật thông tin tài khoản. Không chia sẻ mật khẩu cho bên thứ ba. Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép. Ovenly có quyền khóa tài khoản nếu phát hiện vi phạm.' },
  { title: 'Điều 4 — QUY TRÌNH ĐẶT HÀNG', content: 'Khách hàng chọn nhà hàng và món ăn trên lodoan.vn. Điền thông tin giao hàng và chọn phương thức thanh toán. Đặt đơn và chờ nhà hàng xác nhận. Đơn hàng được xác nhận khi nhà hàng chấp thuận. Hợp đồng mua bán là trực tiếp giữa khách hàng và nhà hàng.' },
  { title: 'Điều 5 — THANH TOÁN', content: 'Các phương thức thanh toán bao gồm: Tiền mặt khi nhận hàng (COD), Chuyển khoản ngân hàng, Ví điện tử MoMo và ZaloPay. Ovenly không chịu trách nhiệm về sai sót do nhập sai thông tin thanh toán.' },
  { title: 'Điều 6 — GIAO HÀNG', content: 'Phí giao hàng do khách hàng thanh toán theo quy định của từng nhà hàng. Thời gian giao hàng là ước tính và có thể thay đổi do điều kiện thời tiết hoặc giao thông. Ovenly không trực tiếp thực hiện dịch vụ giao hàng.' },
  { title: 'Điều 7 — HỦY ĐƠN VÀ HOÀN TIỀN', content: 'Khách hàng có thể hủy đơn trước khi nhà hàng xác nhận. Sau khi nhà hàng xác nhận việc hủy đơn phụ thuộc vào chính sách nhà hàng. Hoàn tiền được xử lý trong vòng 5-7 ngày làm việc. Tài khoản có thể bị hạn chế nếu hủy đơn nhiều lần không có lý do chính đáng.' },
  { title: 'Điều 8 — TRÁCH NHIỆM NỀN TẢNG', content: 'Ovenly đóng vai trò là nền tảng kết nối và không phải là nhà cung cấp thực phẩm. Chất lượng món ăn là trách nhiệm của nhà hàng. Ovenly không chịu trách nhiệm về sự chậm trễ do yếu tố khách quan. Ovenly bảo lưu quyền chỉnh sửa điều khoản này.' },
  { title: 'Điều 9 — HÀNH VI BỊ CẤM', content: 'Nghiêm cấm sử dụng nền tảng cho mục đích gian lận lừa đảo hoặc bất hợp pháp. Không đăng thông tin sai lệch hoặc gây hiểu nhầm. Không can thiệp vào hệ thống kỹ thuật của nền tảng. Vi phạm sẽ bị xử lý theo quy định pháp luật.' },
  { title: 'Điều 10 — QUYỀN SỞ HỮU TRÍ TUỆ', content: 'Toàn bộ nội dung trên LÒ ĐỒ ĂN bao gồm logo thương hiệu LÒ ĐỒ ĂN™ và OVENLY™ hình ảnh và văn bản thuộc quyền sở hữu của Ovenly. Nghiêm cấm sao chép hoặc sử dụng mà không có sự cho phép bằng văn bản.' },
  { title: 'Điều 11 — LUẬT ÁP DỤNG', content: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp được giải quyết tại cơ quan có thẩm quyền tại Thành phố Hồ Chí Minh.' },
  { title: 'Điều 12 — LIÊN HỆ', content: 'Email: support@ovenly.io — Website: lodoan.vn/contact' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← Quay lại</Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-gray-900 mb-1">ĐIỀU KHOẢN DỊCH VỤ</h1>
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