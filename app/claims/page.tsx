import Link from 'next/link';

const PRIMARY = '#8B1A1A';

const sections = [
  { title: 'Điều 1 — NGUYÊN TẮC CHUNG', content: 'LÒ ĐỒ ĂN và nhà hàng có trách nhiệm tiếp nhận khiếu nại và hỗ trợ khách hàng liên quan đến giao dịch trên nền tảng. Khi phát sinh tranh chấp Ovenly đề cao giải pháp thương lượng và hòa giải giữa các bên. Quyết định cuối cùng của Ovenly sẽ được các bên tôn trọng.' },
  { title: 'Điều 2 — QUYỀN KHIẾU NẠI', content: 'Khách hàng có quyền khiếu nại về chất lượng món ăn không đúng mô tả, giao hàng sai hoặc thiếu món, lỗi thanh toán hoặc trừ tiền nhầm, nhà hàng hủy đơn sau khi đã thanh toán. Khiếu nại phải được gửi trong vòng 24 giờ sau khi nhận hàng.' },
  { title: 'Điều 3 — QUY TRÌNH KHIẾU NẠI', content: 'Bước 1: Khách hàng gửi khiếu nại qua email support@ovenly.io hoặc trang Liên Hệ tại lodoan.vn/contact. Vui lòng cung cấp mã đơn hàng mô tả vấn đề và hình ảnh minh chứng nếu có. Bước 2: Bộ phận Chăm Sóc Khách Hàng của LÒ ĐỒ ĂN tiếp nhận và xử lý khiếu nại. Bước 3: Trường hợp nằm ngoài thẩm quyền của LÒ ĐỒ ĂN chúng tôi sẽ hướng dẫn các bên đưa vụ việc ra cơ quan nhà nước có thẩm quyền.' },
  { title: 'Điều 4 — THỜI GIAN XỬ LÝ', content: 'Xác nhận tiếp nhận khiếu nại trong vòng 2 giờ làm việc. Khiếu nại thông thường được giải quyết trong 1-3 ngày làm việc. Trường hợp phức tạp có thể mất đến 7 ngày làm việc.' },
  { title: 'Điều 5 — CÁC TRƯỜNG HỢP ĐƯỢC HOÀN TIỀN', content: 'Nhà hàng hủy đơn sau khi khách hàng đã thanh toán. Giao hàng sai món hoặc thiếu món có bằng chứng hình ảnh rõ ràng. Chất lượng món ăn không đảm bảo với bằng chứng hình ảnh rõ ràng. Lỗi kỹ thuật của nền tảng gây trừ tiền nhầm.' },
  { title: 'Điều 6 — CÁC TRƯỜNG HỢP KHÔNG ĐƯỢC HOÀN TIỀN', content: 'Khách hàng tự hủy đơn sau khi nhà hàng đã xác nhận và chuẩn bị. Thay đổi ý kiến sau khi đặt hàng thành công. Khiếu nại gửi sau 24 giờ nhận hàng mà không có lý do chính đáng.' },
  { title: 'Điều 7 — QUY TRÌNH HOÀN TIỀN', content: 'Hoàn tiền vào tài khoản thanh toán gốc trong vòng 5-7 ngày làm việc.' },
  { title: 'Điều 8 — TRÁCH NHIỆM CÁC BÊN', content: 'Nhà hàng có trách nhiệm cung cấp thông tin và bằng chứng liên quan khi có tranh chấp. Khách hàng có trách nhiệm cung cấp thông tin đơn hàng và bằng chứng rõ ràng. Ovenly có trách nhiệm cung cấp thông tin liên quan khi được yêu cầu và hỗ trợ cơ quan nhà nước khi cần thiết.' },
  { title: 'Điều 9 — CHẾ TÀI', content: 'Nếu lỗi thuộc về nhà hàng Ovenly sẽ áp dụng biện pháp cảnh cáo tạm khóa hoặc chấm dứt hợp tác tùy mức độ vi phạm. Mọi hành vi gian lận sẽ bị chuyển đến cơ quan pháp luật có thẩm quyền.' },
  { title: 'Điều 10 — LIÊN HỆ HỖ TRỢ', content: 'Email: support@ovenly.io — Website: lodoan.vn/contact' },
];

export default function ClaimsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">← Quay lại</Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-gray-900 mb-1">QUY TRÌNH GIẢI QUYẾT TRANH CHẤP VÀ KHIẾU NẠI</h1>
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