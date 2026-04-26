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
            {/* VIETNAMESE VERSION */}
            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Giới Thiệu</h2>
              <p className="mb-3">Chính Sách Bảo Mật này giải thích cách <strong>Ovenly</strong> ("chúng tôi", "của chúng tôi") thu thập, sử dụng, tiết lộ và bảo vệ Dữ Liệu Cá Nhân của bạn khi bạn sử dụng nền tảng đặt hàng thực phẩm <strong>LÒ ĐỒ ĂN</strong> (bao gồm website, ứng dụng di động và các dịch vụ liên quan).</p>
              <p className="mb-3"><strong>Ovenly là công ty công nghệ</strong> cung cấp và vận hành nền tảng LÒ ĐỒ ĂN. Chúng tôi kết nối khách hàng với các nhà hàng đối tác tại Việt Nam.</p>
              <p>Chính Sách này tuân thủ <strong>Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15</strong> có hiệu lực từ ngày 1 tháng 1 năm 2026 và Nghị định 356/2025/NĐ-CP.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Thu Thập Dữ Liệu Cá Nhân</h2>
              <p className="mb-3">Chúng tôi thu thập Dữ Liệu Cá Nhân theo các cách sau:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Thông Tin Bạn Cung Cấp Trực Tiếp</h3>
              <p className="mb-2">Khi bạn sử dụng LÒ ĐỒ ĂN, bạn cung cấp cho chúng tôi:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Thông tin tài khoản:</strong> Tên, số điện thoại, địa chỉ email (nếu đăng ký tài khoản)</li>
                <li><strong>Thông tin giao hàng:</strong> Địa chỉ giao hàng, ghi chú đặc biệt</li>
                <li><strong>Thông tin thanh toán:</strong> Phương thức thanh toán (tiền mặt, chuyển khoản, ví điện tử)</li>
                <li><strong>Đánh giá và phản hồi:</strong> Nhận xét về nhà hàng, đánh giá món ăn</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Thông Tin Thu Thập Tự Động</h3>
              <p className="mb-2">Khi bạn sử dụng nền tảng, chúng tôi tự động thu thập:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Lịch sử đơn hàng:</strong> Món ăn đã đặt, nhà hàng đã chọn, tần suất đặt hàng</li>
                <li><strong>Thông tin thiết bị:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành</li>
                <li><strong>Dữ liệu vị trí:</strong> Vị trí giao hàng (chỉ khi bạn cho phép)</li>
                <li><strong>Cookies:</strong> Dữ liệu về cách bạn tương tác với website</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Từ Bên Thứ Ba</h3>
              <p className="mb-2">Chúng tôi nhận thông tin từ:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Đối tác thanh toán:</strong> MoMo, ZaloPay, VNPay (xác nhận giao dịch)</li>
                <li><strong>Nhà hàng đối tác:</strong> Trạng thái đơn hàng, thời gian chuẩn bị</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Sử Dụng Dữ Liệu Cá Nhân</h2>
              <p className="mb-3">Chúng tôi sử dụng Dữ Liệu Cá Nhân của bạn cho các mục đích sau:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Cung Cấp Dịch Vụ</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Xử lý và quản lý đơn hàng của bạn</li>
                <li>Kết nối bạn với nhà hàng đối tác</li>
                <li>Xử lý thanh toán và xuất hóa đơn</li>
                <li>Gửi thông báo về trạng thái đơn hàng</li>
                <li>Lưu lịch sử đơn hàng để bạn dễ đặt lại</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. An Toàn và Bảo Mật</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Phát hiện và ngăn chặn gian lận</li>
                <li>Xác minh danh tính người dùng</li>
                <li>Bảo vệ tài khoản khỏi truy cập trái phép</li>
                <li>Giải quyết tranh chấp giữa khách hàng và nhà hàng</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Hỗ Trợ Khách Hàng</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Phản hồi câu hỏi và yêu cầu hỗ trợ</li>
                <li>Giải quyết khiếu nại về chất lượng món ăn</li>
                <li>Xử lý yêu cầu hoàn tiền</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. Cải Thiện Dịch Vụ</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Phân tích xu hướng đặt hàng</li>
                <li>Cải thiện trải nghiệm người dùng</li>
                <li>Phát triển tính năng mới</li>
                <li>Nghiên cứu thị trường (dữ liệu được ẩn danh)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. Tiếp Thị (Chỉ Với Sự Đồng Ý)</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Gửi ưu đãi đặc biệt và mã giảm giá</li>
                <li>Thông báo về nhà hàng mới</li>
                <li>Khảo sát ý kiến khách hàng</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">Bạn có thể hủy đăng ký nhận email tiếp thị bất cứ lúc nào bằng cách nhấp vào liên kết "Hủy đăng ký" trong email hoặc liên hệ <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Tuân Thủ Pháp Luật</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Tuân thủ nghĩa vụ pháp lý (thuế, kế toán)</li>
                <li>Phản hồi yêu cầu từ cơ quan chức năng</li>
                <li>Bảo vệ quyền lợi hợp pháp của Ovenly</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Chia Sẻ Dữ Liệu Cá Nhân</h2>
              <p className="mb-3">Chúng tôi chỉ chia sẻ Dữ Liệu Cá Nhân của bạn khi cần thiết và với các bên sau:</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Với Nhà Hàng Đối Tác</h3>
              <p className="mb-2">Khi bạn đặt hàng, chúng tôi chia sẻ với nhà hàng:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Tên và số điện thoại của bạn</li>
                <li>Địa chỉ giao hàng (nếu chọn giao hàng)</li>
                <li>Chi tiết đơn hàng và ghi chú đặc biệt</li>
              </ul>
              <p className="text-sm text-gray-600"><strong>Thời gian truy cập:</strong> Nhà hàng có quyền truy cập thông tin này trong 30 ngày để hỗ trợ và giải quyết vấn đề (nếu có).</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Với Chủ Nhà Hàng (Gói Premium - Tương Lai)</h3>
              <p className="mb-2">Chủ nhà hàng sử dụng gói Premium (tính năng chưa triển khai) có thể nhận:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Dữ liệu đã ẩn danh:</strong> Thống kê đơn hàng, món ăn phổ biến, giờ cao điểm</li>
                <li><strong>Thông tin liên hệ:</strong> CHỈ đối với khách hàng đã đồng ý nhận thông tin tiếp thị</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Với Đối Tác Thanh Toán</h3>
              <p className="mb-2">Khi bạn thanh toán trực tuyến, chúng tôi chia sẻ với MoMo/ZaloPay/VNPay:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Số tiền giao dịch</li>
                <li>Mã đơn hàng</li>
                <li>Thông tin thanh toán (được mã hóa)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. Với Nhà Cung Cấp Dịch Vụ</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Railway (Hoa Kỳ):</strong> Lưu trữ dữ liệu đám mây</li>
                <li><strong>Dịch vụ email:</strong> Gửi xác nhận đơn hàng</li>
                <li><strong>Dịch vụ phân tích:</strong> Google Analytics (dữ liệu ẩn danh)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. Với Cơ Quan Chức Năng</h3>
              <p className="mb-2">Chúng tôi có thể tiết lộ thông tin khi:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Được yêu cầu bởi pháp luật (lệnh tòa án, trát đòi hầu tòa)</li>
                <li>Cần thiết để bảo vệ quyền lợi hợp pháp của Ovenly</li>
                <li>Ngăn chặn gian lận hoặc hoạt động bất hợp pháp</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Chuyển Giao Doanh Nghiệp</h3>
              <p>Nếu Ovenly được mua lại, sáp nhập hoặc bán tài sản, Dữ Liệu Cá Nhân của bạn có thể được chuyển giao cho chủ sở hữu mới. Bạn sẽ được thông báo trước và chủ sở hữu mới phải tuân thủ Chính Sách Bảo Mật này.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Thời Gian Lưu Trữ Dữ Liệu</h2>
              <p className="mb-3">Chúng tôi lưu giữ Dữ Liệu Cá Nhân của bạn trong thời gian cần thiết cho các mục đích được nêu trong Chính Sách này:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Dữ liệu đơn hàng:</strong> 30 ngày (cho hỗ trợ khách hàng và xử lý khiếu nại)</li>
                <li><strong>Hồ sơ thanh toán:</strong> 10 năm (theo quy định pháp luật thuế Việt Nam)</li>
                <li><strong>Dữ liệu tài khoản:</strong> Cho đến khi bạn yêu cầu xóa tài khoản</li>
                <li><strong>Dữ liệu phân tích:</strong> Dữ liệu đã ẩn danh có thể được lưu trữ lâu hơn</li>
                <li><strong>Đồng ý tiếp thị:</strong> Cho đến khi bạn hủy đăng ký</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">Sau khi hết thời gian lưu trữ, chúng tôi sẽ xóa hoặc ẩn danh hóa Dữ Liệu Cá Nhân của bạn một cách an toàn.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. Chuyển Dữ Liệu Quốc Tế</h2>
              <p className="mb-3">Dữ Liệu Cá Nhân của bạn được lưu trữ trên máy chủ tại:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Hoa Kỳ:</strong> Railway (dịch vụ lưu trữ đám mây chính)</li>
                <li><strong>Singapore:</strong> Máy chủ dự phòng (nếu có)</li>
              </ul>
              <p className="mb-3">Chúng tôi đảm bảo bảo vệ đầy đủ cho dữ liệu của bạn thông qua:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Mã hóa dữ liệu khi truyền tải và lưu trữ</li>
                <li>Hợp đồng xử lý dữ liệu với các nhà cung cấp dịch vụ</li>
                <li>Kiểm toán bảo mật định kỳ</li>
                <li>Tuân thủ Nghị định 356/2025/NĐ-CP về chuyển dữ liệu xuyên biên giới</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Cookies và Công Nghệ Theo Dõi</h2>
              <p className="mb-3">Chúng tôi sử dụng cookies và công nghệ tương tự để:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Ghi nhớ sở thích ngôn ngữ của bạn (Tiếng Việt/English)</li>
                <li>Lưu giỏ hàng của bạn</li>
                <li>Phân tích lưu lượng truy cập website (Google Analytics)</li>
                <li>Cải thiện trải nghiệm người dùng</li>
              </ul>
              <p className="mb-3"><strong>Chúng tôi KHÔNG sử dụng:</strong></p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Cookies quảng cáo theo mục tiêu (targeted advertising)</li>
                <li>Theo dõi hành vi trên các website khác</li>
              </ul>
              <p className="mb-2"><strong>Cách vô hiệu hóa cookies:</strong></p>
              <p className="text-sm text-gray-600 mb-1">Bạn có thể tắt cookies trong cài đặt trình duyệt của mình. Lưu ý rằng việc tắt cookies có thể ảnh hưởng đến một số tính năng của LÒ ĐỒ ĂN.</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li><strong>Chrome:</strong> Cài đặt → Quyền riêng tư và bảo mật → Cookie</li>
                <li><strong>Firefox:</strong> Tùy chọn → Quyền riêng tư và bảo mật</li>
                <li><strong>Safari:</strong> Tùy chọn → Quyền riêng tư</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">7. Bảo Mật Dữ Liệu</h2>
              <p className="mb-3">Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ Dữ Liệu Cá Nhân của bạn:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Mã hóa:</strong> Dữ liệu được mã hóa khi truyền tải (HTTPS/TLS)</li>
                <li><strong>Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền mới có quyền truy cập</li>
                <li><strong>Tường lửa:</strong> Bảo vệ máy chủ khỏi truy cập trái phép</li>
                <li><strong>Giám sát:</strong> Theo dõi hoạt động bất thường 24/7</li>
                <li><strong>Sao lưu:</strong> Sao lưu dữ liệu định kỳ để phòng ngừa mất mát</li>
              </ul>
              <p className="text-sm text-gray-600">Tuy nhiên, không có phương thức truyền tải qua Internet nào là 100% an toàn. Chúng tôi khuyến nghị bạn sử dụng mật khẩu mạnh và không chia sẻ thông tin đăng nhập của mình.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">8. Quyền Của Bạn</h2>
              <p className="mb-3">Theo Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15, bạn có các quyền sau:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Quyền Truy Cập</h3>
              <p className="mb-3">Bạn có quyền yêu cầu một bản sao Dữ Liệu Cá Nhân mà chúng tôi đang lưu giữ về bạn.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Quyền Chỉnh Sửa</h3>
              <p className="mb-3">Bạn có quyền yêu cầu chỉnh sửa Dữ Liệu Cá Nhân không chính xác hoặc không đầy đủ.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Quyền Xóa</h3>
              <p className="mb-3">Bạn có quyền yêu cầu xóa Dữ Liệu Cá Nhân của mình trong một số trường hợp nhất định (trừ khi chúng tôi có nghĩa vụ pháp lý phải giữ lại).</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. Quyền Rút Lại Đồng Ý</h3>
              <p className="mb-3">Nếu việc xử lý dựa trên sự đồng ý của bạn (ví dụ: tiếp thị), bạn có quyền rút lại đồng ý bất cứ lúc nào.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. Quyền Phản Đối</h3>
              <p className="mb-3">Bạn có quyền phản đối việc xử lý Dữ Liệu Cá Nhân của mình trong một số trường hợp.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Quyền Khiếu Nại</h3>
              <p className="mb-3">Bạn có quyền khiếu nại lên cơ quan có thẩm quyền nếu cho rằng quyền của bạn bị vi phạm.</p>

              <p className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <strong>Cách thực hiện quyền của bạn:</strong><br/>
                Vui lòng gửi yêu cầu đến <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> với tiêu đề "Yêu Cầu Bảo Mật - [Tên Của Bạn]". Chúng tôi sẽ phản hồi trong vòng <strong>15 ngày</strong> theo quy định.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">9. Dữ Liệu Nhạy Cảm</h2>
              <p className="mb-3"><strong>Ovenly KHÔNG thu thập</strong> các loại Dữ Liệu Cá Nhân Nhạy Cảm sau:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Thông tin sức khỏe hoặc y tế</li>
                <li>Tín ngưỡng tôn giáo hoặc chính trị</li>
                <li>Dữ liệu sinh trắc học (vân tay, khuôn mặt)</li>
                <li>Hồ sơ hình sự</li>
                <li>Thông tin về định hướng tính dục</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">10. Yêu Cầu Độ Tuổi</h2>
              <p className="mb-3">Bạn phải đủ <strong>18 tuổi trở lên</strong> để sử dụng LÒ ĐỒ ĂN.</p>
              <p>Chúng tôi không cố ý thu thập Dữ Liệu Cá Nhân từ trẻ em dưới 18 tuổi. Nếu bạn là cha mẹ hoặc người giám hộ và phát hiện con bạn đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a> để chúng tôi xóa thông tin đó.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">11. Thay Đổi Chính Sách Bảo Mật</h2>
              <p className="mb-3">Chúng tôi có thể cập nhật Chính Sách Bảo Mật này theo thời gian. Mọi thay đổi sẽ được thông báo qua:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Đăng tải phiên bản cập nhật trên website</li>
                <li>Email thông báo (đối với những thay đổi quan trọng)</li>
              </ul>
              <p>Việc bạn tiếp tục sử dụng LÒ ĐỒ ĂN sau khi thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận Chính Sách mới.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">12. Thông Tin Liên Hệ</h2>
              <p className="mb-3">Nếu bạn có câu hỏi về Chính Sách Bảo Mật này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Ovenly</p>
                <p className="text-sm text-gray-700 mt-1">Phụ Trách: Bộ Phận Bảo Mật Dữ Liệu</p>
                <p className="text-sm text-gray-700">Email: <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p>
                <p className="text-sm text-gray-700">Website: <a href="https://www.lodoan.vn" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.lodoan.vn</a></p>
                <p className="text-sm text-gray-700 mt-2">Địa chỉ: [Địa chỉ đăng ký kinh doanh của Ovenly tại Việt Nam]</p>
              </div>
              <p className="mt-3 text-sm text-gray-600">Chúng tôi cam kết phản hồi yêu cầu của bạn trong vòng 15 ngày theo quy định của Luật Bảo Vệ Dữ Liệu Cá Nhân.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">13. Tuân Thủ Pháp Luật</h2>
              <p className="mb-2">Chính Sách Bảo Mật này tuân thủ:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15 (hiệu lực từ 1/1/2026)</li>
                <li>Nghị định 356/2025/NĐ-CP hướng dẫn thi hành Luật BVDLCN</li>
                <li>Luật Giao Dịch Điện Tử số 20/2023/QH15</li>
                <li>Luật Bảo Vệ Quyền Lợi Người Tiêu Dùng số 19/2023/QH15</li>
              </ul>
            </section>
          </>) : (<>
            {/* ENGLISH VERSION - COMPLETE */}
            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">Introduction</h2>
              <p className="mb-3">This Privacy Policy explains how <strong>Ovenly</strong> ("we", "us", "our") collects, uses, discloses, and protects your Personal Data when you use the <strong>LÒ ĐỒ ĂN</strong> food ordering platform (including website, mobile app, and related services).</p>
              <p className="mb-3"><strong>Ovenly is a technology company</strong> that provides and operates the LÒ ĐỒ ĂN platform. We connect customers with partner restaurants in Vietnam.</p>
              <p>This Policy complies with the <strong>Personal Data Protection Law No. 91/2025/QH15</strong> effective January 1, 2026, and Decree 356/2025/ND-CP.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. Collection of Personal Data</h2>
              <p className="mb-3">We collect Personal Data in the following ways:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Information You Provide Directly</h3>
              <p className="mb-2">When you use LÒ ĐỒ ĂN, you provide us with:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Account information:</strong> Name, phone number, email address (if creating account)</li>
                <li><strong>Delivery information:</strong> Delivery address, special instructions</li>
                <li><strong>Payment information:</strong> Payment method (cash, bank transfer, e-wallet)</li>
                <li><strong>Reviews and feedback:</strong> Restaurant reviews, food ratings</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Information Collected Automatically</h3>
              <p className="mb-2">When you use the platform, we automatically collect:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Order history:</strong> Dishes ordered, restaurants selected, order frequency</li>
                <li><strong>Device information:</strong> IP address, browser type, operating system</li>
                <li><strong>Location data:</strong> Delivery location (only with your permission)</li>
                <li><strong>Cookies:</strong> Data about how you interact with the website</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. From Third Parties</h3>
              <p className="mb-2">We receive information from:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Payment partners:</strong> MoMo, ZaloPay, VNPay (transaction confirmation)</li>
                <li><strong>Restaurant partners:</strong> Order status, preparation time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. Use of Personal Data</h2>
              <p className="mb-3">We use your Personal Data for the following purposes:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Service Provision</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Process and manage your orders</li>
                <li>Connect you with partner restaurants</li>
                <li>Process payments and issue invoices</li>
                <li>Send order status notifications</li>
                <li>Save order history for easy reordering</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Safety and Security</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Detect and prevent fraud</li>
                <li>Verify user identity</li>
                <li>Protect accounts from unauthorized access</li>
                <li>Resolve disputes between customers and restaurants</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Customer Support</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Respond to questions and support requests</li>
                <li>Resolve food quality complaints</li>
                <li>Process refund requests</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. Service Improvement</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Analyze ordering trends</li>
                <li>Improve user experience</li>
                <li>Develop new features</li>
                <li>Market research (anonymized data)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. Marketing (With Consent Only)</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Send special offers and discount codes</li>
                <li>Notify about new restaurants</li>
                <li>Customer satisfaction surveys</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">You can unsubscribe from marketing emails anytime by clicking "Unsubscribe" in the email or contacting <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Legal Compliance</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Comply with legal obligations (tax, accounting)</li>
                <li>Respond to government agency requests</li>
                <li>Protect Ovenly's legal rights</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. Sharing of Personal Data</h2>
              <p className="mb-3">We only share your Personal Data when necessary and with the following parties:</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. With Restaurant Partners</h3>
              <p className="mb-2">When you place an order, we share with the restaurant:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Your name and phone number</li>
                <li>Delivery address (if delivery selected)</li>
                <li>Order details and special instructions</li>
              </ul>
              <p className="text-sm text-gray-600"><strong>Access period:</strong> Restaurants have access to this information for 30 days for support and issue resolution.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. With Restaurant Owners (Premium Package - Future)</h3>
              <p className="mb-2">Restaurant owners using Premium package (feature not yet deployed) may receive:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Anonymized data:</strong> Order statistics, popular dishes, peak hours</li>
                <li><strong>Contact information:</strong> ONLY for customers who consented to marketing communications</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. With Payment Partners</h3>
              <p className="mb-2">When you pay online, we share with MoMo/ZaloPay/VNPay:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Transaction amount</li>
                <li>Order code</li>
                <li>Payment information (encrypted)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. With Service Providers</h3>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Railway (USA):</strong> Cloud data storage</li>
                <li><strong>Email service:</strong> Send order confirmations</li>
                <li><strong>Analytics service:</strong> Google Analytics (anonymized data)</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. With Government Authorities</h3>
              <p className="mb-2">We may disclose information when:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Required by law (court order, subpoena)</li>
                <li>Necessary to protect Ovenly's legal rights</li>
                <li>Preventing fraud or illegal activities</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Business Transfers</h3>
              <p>If Ovenly is acquired, merged, or sells assets, your Personal Data may be transferred to the new owner. You will be notified in advance and the new owner must comply with this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. Data Retention Period</h2>
              <p className="mb-3">We retain your Personal Data for as long as necessary for the purposes stated in this Policy:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Order data:</strong> 30 days (for customer support and complaint handling)</li>
                <li><strong>Payment records:</strong> 10 years (per Vietnamese tax law)</li>
                <li><strong>Account data:</strong> Until you request account deletion</li>
                <li><strong>Analytics data:</strong> Anonymized data may be retained longer</li>
                <li><strong>Marketing consent:</strong> Until you unsubscribe</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">After the retention period, we will securely delete or anonymize your Personal Data.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. International Data Transfers</h2>
              <p className="mb-3">Your Personal Data is stored on servers located in:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>United States:</strong> Railway (primary cloud storage service)</li>
                <li><strong>Singapore:</strong> Backup servers (if any)</li>
              </ul>
              <p className="mb-3">We ensure adequate protection for your data through:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Data processing agreements with service providers</li>
                <li>Regular security audits</li>
                <li>Compliance with Decree 356/2025/ND-CP on cross-border data transfers</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. Cookies and Tracking Technologies</h2>
              <p className="mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Remember your language preference (Vietnamese/English)</li>
                <li>Save your shopping cart</li>
                <li>Analyze website traffic (Google Analytics)</li>
                <li>Improve user experience</li>
              </ul>
              <p className="mb-3"><strong>We DO NOT use:</strong></p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Targeted advertising cookies</li>
                <li>Cross-site tracking</li>
              </ul>
              <p className="mb-2"><strong>How to disable cookies:</strong></p>
              <p className="text-sm text-gray-600 mb-1">You can disable cookies in your browser settings. Note that disabling cookies may affect some features of LÒ ĐỒ ĂN.</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                <li><strong>Firefox:</strong> Options → Privacy and security</li>
                <li><strong>Safari:</strong> Preferences → Privacy</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">7. Data Security</h2>
              <p className="mb-3">We implement technical and organizational security measures to protect your Personal Data:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li><strong>Encryption:</strong> Data encrypted in transit (HTTPS/TLS)</li>
                <li><strong>Access control:</strong> Only authorized personnel have access</li>
                <li><strong>Firewall:</strong> Protecting servers from unauthorized access</li>
                <li><strong>Monitoring:</strong> 24/7 anomaly detection</li>
                <li><strong>Backup:</strong> Regular data backups to prevent loss</li>
              </ul>
              <p className="text-sm text-gray-600">However, no method of transmission over the Internet is 100% secure. We recommend using strong passwords and not sharing your login credentials.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">8. Your Rights</h2>
              <p className="mb-3">Under Personal Data Protection Law No. 91/2025/QH15, you have the following rights:</p>
              
              <h3 className="font-semibold text-gray-900 mt-4 mb-2">A. Right to Access</h3>
              <p className="mb-3">You have the right to request a copy of the Personal Data we hold about you.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">B. Right to Rectification</h3>
              <p className="mb-3">You have the right to request correction of inaccurate or incomplete Personal Data.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">C. Right to Erasure</h3>
              <p className="mb-3">You have the right to request deletion of your Personal Data in certain circumstances (except when we have legal obligations to retain it).</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">D. Right to Withdraw Consent</h3>
              <p className="mb-3">If processing is based on your consent (e.g., marketing), you have the right to withdraw consent at any time.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">E. Right to Object</h3>
              <p className="mb-3">You have the right to object to processing of your Personal Data in certain circumstances.</p>

              <h3 className="font-semibold text-gray-900 mt-4 mb-2">F. Right to Complain</h3>
              <p className="mb-3">You have the right to lodge a complaint with the competent authority if you believe your rights have been violated.</p>

              <p className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <strong>How to exercise your rights:</strong><br/>
                Please send requests to <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> with subject line "Privacy Request - [Your Name]". We will respond within <strong>15 days</strong> as required.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">9. Sensitive Data</h2>
              <p className="mb-3"><strong>Ovenly does NOT collect</strong> the following types of Sensitive Personal Data:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Health or medical information</li>
                <li>Religious or political beliefs</li>
                <li>Biometric data (fingerprints, facial recognition)</li>
                <li>Criminal records</li>
                <li>Sexual orientation information</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">10. Age Requirement</h2>
              <p className="mb-3">You must be <strong>18 years or older</strong> to use LÒ ĐỒ ĂN.</p>
              <p>We do not knowingly collect Personal Data from children under 18. If you are a parent or guardian and discover that your child has provided personal information to us, please contact <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a> so we can delete that information.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">11. Changes to Privacy Policy</h2>
              <p className="mb-3">We may update this Privacy Policy from time to time. Changes will be communicated via:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Posting updated version on website</li>
                <li>Email notification (for significant changes)</li>
              </ul>
              <p>Your continued use of LÒ ĐỒ ĂN after changes take effect constitutes acceptance of the new Policy.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">12. Contact Information</h2>
              <p className="mb-3">If you have questions about this Privacy Policy or wish to exercise your rights, please contact:</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">Ovenly</p>
                <p className="text-sm text-gray-700 mt-1">Attn: Data Protection Department</p>
                <p className="text-sm text-gray-700">Email: <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p>
                <p className="text-sm text-gray-700">Website: <a href="https://www.lodoan.vn" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.lodoan.vn</a></p>
                <p className="text-sm text-gray-700 mt-2">Address: [Ovenly's registered business address in Vietnam]</p>
              </div>
              <p className="mt-3 text-sm text-gray-600">We commit to responding to your request within 15 days as required by the Personal Data Protection Law.</p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">13. Legal Compliance</h2>
              <p className="mb-2">This Privacy Policy complies with:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Personal Data Protection Law No. 91/2025/QH15 (effective Jan 1, 2026)</li>
                <li>Decree 356/2025/ND-CP implementing PDPL</li>
                <li>Law on Electronic Transactions No. 20/2023/QH15</li>
                <li>Law on Consumer Rights Protection No. 19/2023/QH15</li>
              </ul>
            </section>
          </>)}
        </div>
      </div>
    </div>
  );
}