'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black text-primary mb-8">Điều Khoản Dịch Vụ</h1>
        <div className="bg-white rounded-2xl p-8 space-y-4 text-gray-600 text-sm leading-snug" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-xs text-gray-400">Phiên bản hiện hành: Tháng 4 năm 2026</p>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">1. THỎA THUẬN SỬ DỤNG</h2>
            <p className="mb-2"><strong>1.1.</strong> Tài liệu này quy định các điều khoản áp dụng khi bạn truy cập và sử dụng nền tảng đặt món ăn LÒ ĐỒ ĂN, bao gồm website và ứng dụng di động ("Hệ Thống" hoặc "Nền Tảng LÒ ĐỒ ĂN"). Công ty Ovenly và các đơn vị liên kết (gọi chung là "Ovenly" hoặc "chúng tôi") cung cấp các dịch vụ sau thông qua Nền Tảng: (a) giao diện kỹ thuật số để đặt hàng, (b) công cụ kết nối giữa khách hàng và nhà hàng, (c) toàn bộ tính năng, thông tin, hình ảnh và nội dung được hiển thị ("Nội Dung Hệ Thống").</p>
            <p className="mb-2"><strong>1.2.</strong> LÒ ĐỒ ĂN hoạt động như công cụ trung gian kỹ thuật số giúp khách hàng ("Khách Hàng" hoặc "Người Tiêu Dùng") tìm kiếm và đặt món ăn từ các cơ sở ẩm thực đã đăng ký ("Cơ Sở Ẩm Thực" hoặc "Đối Tác Nhà Hàng"). Giao dịch thương mại thực tế diễn ra trực tiếp giữa Khách Hàng và Cơ Sở Ẩm Thực. Hai bên này chịu trách nhiệm hoàn toàn về thỏa thuận mua bán, chất lượng món ăn và các cam kết đi kèm. Ovenly vận hành nền tảng công nghệ và không tham gia trực tiếp vào quan hệ thương mại giữa các bên. Ovenly có thể nhưng không bắt buộc phải kiểm duyệt trước người dùng hoặc nội dung. Ovenly giữ quyền gỡ bỏ bất kỳ thông tin hoặc nội dung nào khỏi Hệ Thống khi cần thiết. Ovenly không cam kết rằng mọi giao dịch sẽ được hoàn tất thành công.</p>
            <p className="mb-2"><strong>1.3.</strong> Để sử dụng Hệ Thống hoặc đăng ký tài khoản người dùng, bạn phải xem xét và chấp nhận toàn bộ các quy định trong văn bản này cũng như Chính Sách Bảo Mật của chúng tôi.</p>
            <p className="mb-2"><strong>1.4.</strong> Chúng tôi có toàn quyền điều chỉnh, tạm dừng hoặc ngừng cung cấp toàn bộ hoặc một phần Hệ Thống và dịch vụ bất kỳ lúc nào trong khuôn khổ pháp luật cho phép.</p>
            <p className="mb-2"><strong>1.5.</strong> Chúng tôi có quyền từ chối cho phép tạo tài khoản hoặc truy cập vào Hệ Thống và dịch vụ theo quy định của pháp luật và các điều khoản được nêu trong văn bản này.</p>
            <div className="my-3 p-3 bg-red-50 border-l-4 border-red-500">
              <p className="font-bold text-red-700 text-xs">KHI SỬ DỤNG HỆ THỐNG HOẶC TẠO TÀI KHOẢN, BẠN XÁC NHẬN ĐÃ ĐỌC, HIỂU VÀ ĐỒNG Ý TUÂN THỦ CÁC ĐIỀU KHOẢN DỊCH VỤ VÀ CHÍNH SÁCH BẢO MẬT.</p>
            </div>
            <div className="my-3 p-3 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="font-bold text-xs">NẾU BẠN KHÔNG CHẤP NHẬN CÁC QUY ĐỊNH NÀY, VUI LÒNG NGỪNG SỬ DỤNG VÀ KHÔNG TRUY CẬP VÀO HỆ THỐNG.</p>
              <p className="mt-1 text-xs">ĐỐI VỚI NGƯỜI DƯỚI 18 TUỔI HOẶC KHÔNG ĐỦ NĂNG LỰC HÀNH VI DÂN SỰ: CẦN CÓ SỰ ĐỒNG Ý VÀ GIÁM SÁT CỦA CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP KHI ĐĂNG KÝ VÀ SỬ DỤNG DỊCH VỤ. NGƯỜI GIÁM HỘ CÓ TRÁCH NHIỆM GIẢI THÍCH HOẶC THAY MẶT ĐỒNG Ý VỚI CÁC ĐIỀU KHOẢN TRONG VĂN BẢN NÀY.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">2. GIẢI NGHĨA THUẬT NGỮ</h2>
            <p className="mb-1"><strong>2.1. Hệ Thống:</strong> Ứng dụng web và mobile của LÒ ĐỒ ĂN do Ovenly phát triển và vận hành.</p>
            <p className="mb-1"><strong>2.2. Khách Hàng:</strong> Cá nhân sử dụng Hệ Thống để tìm kiếm và đặt món ăn.</p>
            <p className="mb-1"><strong>2.3. Cơ Sở Ẩm Thực:</strong> Đơn vị kinh doanh thực phẩm đã đăng ký tham gia Hệ Thống.</p>
            <p className="mb-1"><strong>2.4. Đơn Đặt Hàng:</strong> Yêu cầu mua món ăn được gửi qua Hệ Thống.</p>
            <p className="mb-1"><strong>2.5. Phí Nền Tảng:</strong> Khoản phí Ovenly thu để duy trì và phát triển Hệ Thống (chiếm 1-2% giá trị đơn hàng).</p>
            <p className="mb-1"><strong>2.6. Thông Tin Cá Nhân:</strong> Dữ liệu có khả năng xác định danh tính cá nhân theo Luật Bảo Vệ Dữ Liệu Cá Nhân 91/2025/QH15.</p>
            <p className="mb-1"><strong>2.7. Nội Dung Hệ Thống:</strong> Toàn bộ văn bản, hình ảnh, nhận xét và tài liệu khác có mặt trên Hệ Thống.</p>
            <p className="mb-1"><strong>2.8. Tài Khoản Bảo Lưu:</strong> Cơ chế giữ tạm thời số tiền thanh toán từ Khách Hàng cho đến khi giao dịch hoàn tất.</p>
            <p className="mb-1"><strong>2.9. Khoảng Thời Gian Bảo Vệ:</strong> Thời gian Ovenly giữ số tiền trong Tài Khoản Bảo Lưu (thông thường là 4 ngày từ khi xác nhận giao hàng).</p>
            <p className="mb-1"><strong>2.10. Nhà Cung Cấp Vận Chuyển:</strong> Đối tác logistics bên thứ ba mà Ovenly hợp tác để thực hiện việc giao hàng.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">3. ĐIỀU KIỆN ĐỂ SỬ DỤNG</h2>
            <p className="mb-2"><strong>3.1.</strong> Chỉ người từ đủ 18 tuổi trở lên mới được phép sử dụng Hệ Thống. Bằng việc truy cập và sử dụng dịch vụ, bạn xác nhận rằng mình có đầy đủ quyền năng pháp lý để ký kết các giao dịch theo luật định tại Việt Nam.</p>
            <p className="mb-2"><strong>3.2.</strong> Quyền sử dụng Hệ Thống và đăng ký tài khoản chỉ được cấp khi bạn đáp ứng các yêu cầu và chấp nhận các quy định được nêu trong văn bản này.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">4. TRÁCH NHIỆM VÀ CAM KẾT CỦA NGƯỜI DÙNG</h2>
            <p className="mb-2"><strong>4.1.</strong> Khi sử dụng Hệ Thống, bạn cam kết:</p>
            <p className="mb-1"><strong>4.1.a.</strong> Mọi thông tin được cung cấp là chính xác, đầy đủ và trung thực.</p>
            <p className="mb-1"><strong>4.1.b.</strong> Giữ bí mật thông tin đăng nhập và thông báo ngay khi phát hiện truy cập trái phép.</p>
            <p className="mb-1"><strong>4.1.c.</strong> Chỉ sử dụng Hệ Thống cho mục đích cá nhân và hợp pháp.</p>
            <p className="mb-1"><strong>4.1.d.</strong> Không thực hiện các hành vi phá hoại, làm gián đoạn hoặc xâm nhập trái phép vào Hệ Thống.</p>
            <p className="mb-1"><strong>4.1.e.</strong> Không đăng tải nội dung vi phạm pháp luật, đạo đức hoặc gây tổn hại cho người khác.</p>
            <p className="mb-1"><strong>4.1.f.</strong> Chỉ duy trì một (1) tài khoản duy nhất trên Hệ Thống.</p>
            <p className="mb-1"><strong>4.1.g.</strong> Tuân thủ đầy đủ các quy định pháp luật Việt Nam khi sử dụng dịch vụ.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">5. PHẠM VI DỊCH VỤ</h2>
            <p className="mb-2"><strong>5.1.</strong> LÒ ĐỒ ĂN là nền tảng công nghệ kết nối Khách Hàng với Cơ Sở Ẩm Thực. Ovenly cung cấp các công cụ sau:</p>
            <p className="mb-1"><strong>5.1.a.</strong> Giao diện tra cứu thực đơn và mức giá từ các Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>5.1.b.</strong> Hệ thống tiếp nhận và chuyển đơn đặt hàng từ Khách Hàng đến Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>5.1.c.</strong> Giải pháp thanh toán điện tử.</p>
            <p className="mb-1"><strong>5.1.d.</strong> Thông tin cập nhật về tình trạng đơn hàng.</p>
            <p className="mb-1"><strong>5.1.e.</strong> Kết nối với các nhà cung cấp dịch vụ logistics.</p>
            <p className="mt-2"><strong>5.2. LƯU Ý QUAN TRỌNG: OVENLY HOẠT ĐỘNG NHỦ MỘT NỀN TẢNG CÔNG NGHỆ</strong> tạo cầu nối giữa người tiêu dùng và cơ sở kinh doanh thực phẩm. OVENLY KHÔNG TỰ VẬN HÀNH CƠ SỞ ẨM THỰC, KHÔNG TỰ CHẾ BIẾN MÓN ĂN VÀ KHÔNG TRỰC TIẾP BÁN HÀNG. Ovenly KHÔNG chịu trách nhiệm về độ tươi ngon, an toàn vệ sinh, thời gian chế biến hay bất kỳ vấn đề nào liên quan đến món ăn. Toàn bộ các vấn đề về thực phẩm thuộc trách nhiệm của Cơ Sở Ẩm Thực.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">6. QUẢN LÝ TÀI KHOẢN</h2>
            <p className="mb-2"><strong>6.1.</strong> Một số tính năng của Hệ Thống yêu cầu bạn phải tạo tài khoản bằng cách chọn tên đăng nhập, mật khẩu và cung cấp các thông tin cá nhân cần thiết một cách chính xác.</p>
            <p className="mb-2"><strong>6.2.</strong> Tài khoản cho phép bạn lưu địa chỉ giao hàng, theo dõi lịch sử mua hàng, áp dụng mã ưu đãi, nhận cập nhật về đơn hàng và lưu phương thức thanh toán.</p>
            <p className="mb-2"><strong>6.3.</strong> Bạn có trách nhiệm:</p>
            <p className="mb-1"><strong>6.3.a.</strong> Bảo vệ mật khẩu và chỉ sử dụng thông tin đăng nhập của chính mình.</p>
            <p className="mb-1"><strong>6.3.b.</strong> Đăng xuất sau mỗi lần sử dụng Hệ Thống.</p>
            <p className="mb-1"><strong>6.3.c.</strong> Báo ngay cho Ovenly khi phát hiện tài khoản bị sử dụng trái phép.</p>
            <p className="mb-2"><strong>6.4.</strong> Bạn chịu trách nhiệm hoàn toàn với mọi hoạt động diễn ra dưới tài khoản của mình, kể cả những tổn thất phát sinh từ việc lộ mật khẩu hoặc không tuân thủ các quy định này.</p>
            <p className="mb-2"><strong>6.5.</strong> Ovenly có quyền đình chỉ, xóa tài khoản hoặc gỡ bỏ nội dung liên quan đến tài khoản bất kỳ lúc nào nếu phát hiện các dấu hiệu sau:</p>
            <p className="mb-1"><strong>6.5.a.</strong> Tài khoản bị bỏ hoang trong thời gian kéo dài.</p>
            <p className="mb-1"><strong>6.5.b.</strong> Vi phạm các quy định trong văn bản này.</p>
            <p className="mb-1"><strong>6.5.c.</strong> Có hành vi gian lận, quấy rối, đe dọa hoặc lạm dụng.</p>
            <p className="mb-1"><strong>6.5.d.</strong> Tạo nhiều tài khoản để thực hiện gian lận.</p>
            <p className="mb-1"><strong>6.5.e.</strong> Lợi dụng mã khuyến mại hoặc chương trình ưu đãi.</p>
            <p className="mb-1"><strong>6.5.f.</strong> Có hành động gây thiệt hại cho người dùng khác hoặc Ovenly.</p>
            <p className="mb-1"><strong>6.5.g.</strong> Cung cấp thông tin giả mạo khi đăng ký.</p>
            <p className="mb-1"><strong>6.5.h.</strong> Mua bán, cho thuê, chuyển nhượng tài khoản.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">7. ĐÓNG TÀI KHOẢN</h2>
            <p className="mb-2"><strong>7.1.</strong> Người dùng có thể yêu cầu đóng tài khoản bằng cách gửi thông báo bằng văn bản đến <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a>.</p>
            <p className="mb-2"><strong>7.2.</strong> Người dùng vẫn phải hoàn thành mọi nghĩa vụ liên quan đến các giao dịch chưa kết thúc (dù giao dịch đó phát sinh trước hay sau khi yêu cầu đóng tài khoản) hoặc đơn hàng đang trong quá trình vận chuyển.</p>
            <p className="mb-2"><strong>7.3.</strong> Người dùng cần liên hệ với Ovenly sau khi đã xử lý xong tất cả các giao dịch còn tồn đọng. Người dùng tự chịu trách nhiệm về quyết định đóng tài khoản của mình.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">8. QUY TRÌNH ĐẶT HÀNG</h2>
            <p className="mb-2"><strong>8.1.</strong> Các bước đặt hàng:</p>
            <p className="mb-1"><strong>8.1.a.</strong> Khách Hàng lựa chọn món ăn và gửi đơn đặt hàng qua Hệ Thống.</p>
            <p className="mb-1"><strong>8.1.b.</strong> Cơ Sở Ẩm Thực nhận thông báo và xác nhận nhận đơn.</p>
            <p className="mb-1"><strong>8.1.c.</strong> Cơ Sở Ẩm Thực tiến hành chế biến món ăn.</p>
            <p className="mb-1"><strong>8.1.d.</strong> Khách Hàng nhận món (tại chỗ hoặc qua dịch vụ giao hàng).</p>
            <p className="mb-1"><strong>8.1.e.</strong> Khách Hàng xác nhận "Đã nhận hàng" hoặc gửi khiếu nại nếu có vấn đề.</p>
            <p className="mb-2"><strong>8.2.</strong> Đơn hàng chỉ có hiệu lực sau khi Cơ Sở Ẩm Thực xác nhận. Cơ Sở Ẩm Thực được phép từ chối đơn hàng trong các trường hợp: món hết, ngoài giờ phục vụ, hoặc các lý do chính đáng khác.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">9. GIÁ VÀ PHƯƠNG THỨC THANH TOÁN</h2>
            <p className="mb-2"><strong>9.1.</strong> Mọi mức giá hiển thị trên Hệ Thống được tính bằng Việt Nam Đồng (VNĐ) và đã gồm thuế giá trị gia tăng.</p>
            <p className="mb-2"><strong>9.2.</strong> Tổng giá trị đơn hàng bao gồm:</p>
            <p className="mb-1"><strong>9.2.a. Giá món:</strong> Do Cơ Sở Ẩm Thực ấn định.</p>
            <p className="mb-1"><strong>9.2.b. Phí nền tảng:</strong> Phí Ovenly thu để vận hành Hệ Thống (1-2% giá trị đơn).</p>
            <p className="mb-1"><strong>9.2.c. Phí vận chuyển:</strong> Áp dụng khi chọn giao hàng (do Nhà Cung Cấp Vận Chuyển quyết định).</p>
            <p className="mb-2"><strong>9.3.</strong> Tùy thời điểm, Hệ Thống hỗ trợ các phương thức thanh toán sau:</p>
            <p className="mb-1"><strong>9.3.a. Thu Tiền Tận Nơi (COD):</strong> Khách Hàng trả tiền mặt cho shipper khi nhận hàng.</p>
            <p className="mb-1"><strong>9.3.b. Chuyển Khoản Trực Tuyến:</strong> Thanh toán qua Internet Banking.</p>
            <p className="mb-1"><strong>9.3.c. Ví Điện Tử (MoMo, ZaloPay):</strong> Thanh toán bằng số dư trong tài khoản ví điện tử đã được nạp tiền.</p>
            <p className="mb-1"><strong>9.3.d. Apple Pay / Google Pay:</strong> Thanh toán qua ví điện tử của Apple hoặc Google khi đã liên kết.</p>
            <p className="mb-1"><strong>9.3.e. Thẻ Ngân Hàng:</strong> Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ qua cổng thanh toán trung gian (2C2P và các đơn vị thanh toán khác).</p>
            <p className="mb-2"><strong>9.4.</strong> Khi đồng ý lưu phương thức thanh toán vào tài khoản, bạn cho phép Ovenly chia sẻ thông tin này với các đơn vị xử lý thanh toán nhằm mục đích lưu trữ và xử lý giao dịch.</p>
            <p className="mb-2"><strong>9.5.</strong> Bạn cho phép chúng tôi kiểm tra tính khả dụng của phương thức thanh toán bằng cách thực hiện các giao dịch thử nghiệm có giá trị nhỏ.</p>
            <p className="mb-2"><strong>9.6.</strong> Phương thức thanh toán chỉ có thể thay đổi trước khi hoàn tất thanh toán.</p>
            <p className="mb-2"><strong>9.7.</strong> Ovenly không chịu trách nhiệm về các sai sót trong quá trình nhập thông tin giao hàng hoặc thanh toán do Khách Hàng hoặc Cơ Sở Ẩm Thực gây ra.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">10. HỦY ĐƠN VÀ HOÀN TIỀN</h2>
            <p className="mb-2"><strong>10.1. Khách Hàng hủy đơn:</strong></p>
            <p className="mb-1"><strong>10.1.a.</strong> Trước khi Cơ Sở Ẩm Thực xác nhận: Hoàn lại 100%.</p>
            <p className="mb-1"><strong>10.1.b.</strong> Sau khi Cơ Sở Ẩm Thực xác nhận: Không hoàn tiền (do đã bắt đầu chế biến).</p>
            <p className="mb-1"><strong>10.1.c.</strong> Thanh toán điện tử: Hoàn tiền trong 5-7 ngày làm việc.</p>
            <p className="mb-2"><strong>10.2. Cơ Sở Ẩm Thực hủy đơn:</strong> Nếu hủy sau khi đã xác nhận, Khách Hàng nhận lại 100% trong 24 giờ.</p>
            <p className="mb-2"><strong>10.3. Khiếu nại về chất lượng:</strong> Liên hệ <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> trong 24 giờ kèm bằng chứng hình ảnh. Chúng tôi sẽ phối hợp với Cơ Sở Ẩm Thực để giải quyết.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">11. NGHĨA VỤ CỦA CƠ SỞ ẨM THỰC</h2>
            <p className="mb-2"><strong>11.1.</strong> Cơ Sở Ẩm Thực tham gia Hệ Thống cam kết:</p>
            <p className="mb-1"><strong>11.1.a.</strong> Sở hữu đầy đủ giấy phép kinh doanh và chứng nhận ATTP theo luật định.</p>
            <p className="mb-1"><strong>11.1.b.</strong> Xuất hóa đơn VAT hoặc hóa đơn bán lẻ cho từng đơn hàng theo quy định thuế.</p>
            <p className="mb-1"><strong>11.1.c.</strong> Đảm bảo chất lượng và vệ sinh an toàn thực phẩm.</p>
            <p className="mb-1"><strong>11.1.d.</strong> Chế biến món ăn đúng thời gian đã cam kết.</p>
            <p className="mb-1"><strong>11.1.e.</strong> Chịu trách nhiệm toàn diện về chất lượng món ăn cung cấp.</p>
            <p className="mb-1"><strong>11.1.f.</strong> Cung cấp thông tin tài khoản ngân hàng chính xác để nhận thanh toán.</p>
            <p className="mt-2 text-xs text-gray-500"><strong>11.2.</strong> Ovenly có quyền tạm dừng hoặc chấm dứt hợp tác với Cơ Sở Ẩm Thực vi phạm các cam kết trên.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">12. ĐÁNH GIÁ VÀ PHẢN HỒI</h2>
            <p className="mb-2"><strong>12.1.</strong> Khách Hàng có thể đánh giá Cơ Sở Ẩm Thực sau khi hoàn thành đơn hàng. Yêu cầu:</p>
            <p className="mb-1"><strong>12.1.a.</strong> Đánh giá phải dựa trên trải nghiệm thực tế và trung thực.</p>
            <p className="mb-1"><strong>12.1.b.</strong> Không dùng ngôn từ thô tục, xúc phạm hoặc phân biệt.</p>
            <p className="mb-1"><strong>12.1.c.</strong> Không thao túng hoặc làm sai lệch hệ thống đánh giá.</p>
            <p className="mb-1"><strong>12.1.d.</strong> Ovenly có quyền gỡ đánh giá vi phạm không cần báo trước.</p>
            <p className="mb-2"><strong>12.2.</strong> Người tạo nội dung (kể cả đánh giá) chịu trách nhiệm hoàn toàn về nội dung đó. Ovenly không chịu trách nhiệm về các lỗi, thiếu sót hoặc nội dung không chính xác.</p>
            <p className="mb-2"><strong>12.3.</strong> Ovenly và các bên được ủy quyền có toàn quyền (nhưng không có nghĩa vụ) kiểm duyệt, từ chối hoặc gỡ bỏ bất kỳ nội dung nào trên Hệ Thống.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">13. TÀI SẢN TRÍ TUỆ</h2>
            <p className="mb-2"><strong>13.1.</strong> Ovenly cấp cho người dùng quyền truy cập và sử dụng dịch vụ trong khuôn khổ các điều khoản này. Toàn bộ Nội Dung Hệ Thống, nhãn hiệu, logo, tên thương mại và các tài sản trí tuệ khác ("Tài Sản Trí Tuệ") thuộc quyền sở hữu của Ovenly. Không ai được phép sử dụng hoặc sao chép Tài Sản Trí Tuệ này mà không có sự cho phép rõ ràng.</p>
            <p className="mb-2"><strong>13.2.</strong> Khi sử dụng Hệ Thống, bạn đồng ý tuân thủ luật bản quyền và các quy định về nhãn hiệu. Bạn không được:</p>
            <p className="mb-1"><strong>13.2.a.</strong> Sao chép, phân phối, tái xuất bản, chỉnh sửa, tạo phiên bản phái sinh, cho thuê hay bán bất kỳ phần nào của Hệ Thống và Nội Dung.</p>
            <p className="mb-1"><strong>13.2.b.</strong> Tái tạo hoặc chỉnh sửa nội dung Hệ Thống trên máy chủ khác hoặc website khác mà chưa có sự chấp thuận bằng văn bản.</p>
            <p className="mb-1"><strong>13.2.c.</strong> Dùng bot, crawler, spider hoặc công cụ tự động để thu thập, sao chép Nội Dung mà chưa được cho phép bằng văn bản.</p>
            <p className="mb-2"><strong>13.3.</strong> Ovenly cho phép liên kết từ website của người dùng đến Hệ Thống, với điều kiện website đó không gây hiểu lầm về mối quan hệ với Ovenly.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">14. KHIẾU NẠI VI PHẠM BẢN QUYỀN</h2>
            <p className="mb-2"><strong>14.1.</strong> Người dùng là các cá nhân và tổ chức độc lập, không có quan hệ đại diện với Ovenly. Ovenly không nắm giữ hay sở hữu hàng hóa được rao bán trên Hệ Thống.</p>
            <p className="mb-2"><strong>14.2.</strong> Nếu bạn là chủ sở hữu bản quyền hoặc đại diện hợp pháp và tin rằng quyền của mình bị xâm phạm, vui lòng liên hệ Ovenly tại <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> kèm các tài liệu chứng minh. Chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất.</p>
            <p className="mb-2"><strong>14.3.</strong> Cơ Sở Ẩm Thực đồng ý bồi thường và bảo vệ Ovenly khỏi mọi khiếu nại liên quan đến vi phạm bản quyền của nội dung hoặc sản phẩm họ đăng bán.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">15. BẢO MẬT THÔNG TIN</h2>
            <p className="mb-2"><strong>15.1.</strong> Ovenly cam kết bảo vệ thông tin của bạn. Xem <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">Chính Sách Bảo Mật</a> để hiểu cách chúng tôi thu thập và xử lý Thông Tin Cá Nhân. Văn bản này và Chính Sách Bảo Mật có mối liên hệ chặt chẽ với nhau.</p>
            <p className="mb-2"><strong>15.2.</strong> Khi sử dụng Hệ Thống hoặc cung cấp thông tin, bạn:</p>
            <p className="mb-1"><strong>15.2.a.</strong> Cho phép Ovenly thu thập, xử lý và sử dụng thông tin cá nhân theo Chính Sách Bảo Mật.</p>
            <p className="mb-1"><strong>15.2.b.</strong> Thừa nhận rằng thông tin trên Hệ Thống được sở hữu chung bởi bạn và Ovenly.</p>
            <p className="mb-1"><strong>15.2.c.</strong> Cam kết không tiết lộ thông tin của người dùng khác cho bên thứ ba.</p>
            <p className="mb-2"><strong>15.3.</strong> Bạn đồng ý rằng Ovenly có thể truy cập, lưu giữ và tiết lộ thông tin tài khoản khi có yêu cầu từ cơ quan pháp luật hoặc tòa án có thẩm quyền.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">16. QUY ĐỊNH VỀ HÀNH VI VÀ HOẠT ĐỘNG CẤM</h2>
            <p className="mb-2"><strong>16.1.</strong> Quyền sử dụng Hệ Thống có hiệu lực cho đến khi bị chấm dứt do vi phạm các điều khoản trong văn bản này.</p>
            <p className="mb-2"><strong>16.2.</strong> Các hành vi nghiêm cấm trên Hệ Thống:</p>
            <p className="mb-1"><strong>16.2.a.</strong> Đăng tải nội dung vi phạm pháp luật, gây hại, đe dọa, lạm dụng, quấy rối, gây nhầm lẫn, phỉ báng, khiêu dâm, xâm phạm quyền riêng tư, phân biệt chủng tộc hoặc nội dung không phù hợp khác.</p>
            <p className="mb-1"><strong>16.2.b.</strong> Thực hiện hành vi vi phạm quyền lợi của người khác hoặc luật pháp.</p>
            <p className="mb-1"><strong>16.2.c.</strong> Đăng nội dung liên quan đến trẻ em hoặc sử dụng Hệ Thống theo cách gây tổn hại cho trẻ vị thành niên.</p>
            <p className="mb-1"><strong>16.2.d.</strong> Giả mạo danh tính cá nhân hoặc tổ chức, tạo sự nhầm lẫn về thân phận thực sự.</p>
            <p className="mb-1"><strong>16.2.e.</strong> Làm giả tiêu đề hoặc nguồn gốc nội dung nhằm che giấu thông tin.</p>
            <p className="mb-1"><strong>16.2.f.</strong> Xóa bỏ các thông báo về quyền sở hữu trên Hệ Thống.</p>
            <p className="mb-1"><strong>16.2.g.</strong> Chỉnh sửa, tạo phiên bản phái sinh hoặc chuyển đổi Hệ Thống mà không được phép.</p>
            <p className="mb-1"><strong>16.2.h.</strong> Sử dụng Hệ Thống vì lợi ích của bên thứ ba hoặc các mục đích không được cho phép.</p>
            <p className="mb-1"><strong>16.2.i.</strong> Sử dụng Hệ Thống cho mục đích lừa đảo, gian lận hoặc gây nhầm lẫn.</p>
            <p className="mb-1"><strong>16.2.j.</strong> Tạo và quản lý nhiều tài khoản nhằm vi phạm các quy định này.</p>
            <p className="mb-1"><strong>16.2.k.</strong> Truy cập Hệ Thống bằng phần mềm giả lập, thiết bị giả lập, bot hoặc công cụ không được Ovenly cung cấp.</p>
            <p className="mb-1"><strong>16.2.l.</strong> Can thiệp vào giá cả hoặc danh mục sản phẩm của Cơ Sở Ẩm Thực khác.</p>
            <p className="mb-1"><strong>16.2.m.</strong> Thao túng hệ thống đánh giá hoặc phản hồi.</p>
            <p className="mb-1"><strong>16.2.n.</strong> Dịch ngược, phá mã, tháo rời hoặc hack Hệ Thống; phá vỡ các biện pháp bảo mật.</p>
            <p className="mb-1"><strong>16.2.o.</strong> Thu thập thông tin về tài khoản của người dùng khác mà không được phép.</p>
            <p className="mb-1"><strong>16.2.p.</strong> Đăng tải nội dung mà bạn không có quyền theo luật định hoặc hợp đồng.</p>
            <p className="mb-1"><strong>16.2.q.</strong> Đăng tải nội dung vi phạm bản quyền, thương hiệu, bí mật kinh doanh hoặc các quyền sở hữu trí tuệ khác.</p>
            <p className="mb-1"><strong>16.2.r.</strong> Gửi quảng cáo, email rác, thư móc nối hoặc nội dung spam không được cho phép.</p>
            <p className="mb-1"><strong>16.2.s.</strong> Phát tán virus, malware, trojan hoặc mã độc hại có thể làm gián đoạn hoặc phá hủy chức năng Hệ Thống.</p>
            <p className="mb-1"><strong>16.2.t.</strong> Làm gián đoạn hoạt động bình thường hoặc ảnh hưởng tiêu cực đến khả năng giao dịch của người dùng khác.</p>
            <p className="mb-1"><strong>16.2.u.</strong> Can thiệp, điều khiển hoặc làm gián đoạn máy chủ và hệ thống liên kết với Hệ Thống.</p>
            <p className="mb-1"><strong>16.2.v.</strong> Thực hiện hành động có thể phá hoại, làm quá tải hoặc làm suy yếu Hệ Thống.</p>
            <p className="mb-1"><strong>16.2.w.</strong> Sử dụng Hệ Thống để vi phạm luật chống rửa tiền hoặc chống khủng bố.</p>
            <p className="mb-1"><strong>16.2.x.</strong> Xâm phạm quyền riêng tư, theo dõi hoặc quấy rối người khác.</p>
            <p className="mb-1"><strong>16.2.y.</strong> Vi phạm quyền sở hữu trí tuệ của Ovenly hoặc gây nhầm lẫn về các quyền này.</p>
            <p className="mb-1"><strong>16.2.z.</strong> Thu thập hoặc lưu trữ dữ liệu cá nhân của người dùng khác liên quan đến các hành vi cấm nêu trên.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">17. XỬ LÝ VI PHẠM</h2>
            <p className="mb-2"><strong>17.1.</strong> Vi phạm các điều khoản này có thể dẫn đến một hoặc nhiều biện pháp sau:</p>
            <p className="mb-1"><strong>17.1.a.</strong> Gỡ bỏ sản phẩm khỏi danh mục.</p>
            <p className="mb-1"><strong>17.1.b.</strong> Hạn chế quyền truy cập tài khoản.</p>
            <p className="mb-1"><strong>17.1.c.</strong> Đình chỉ hoặc chấm dứt tài khoản vĩnh viễn.</p>
            <p className="mb-1"><strong>17.1.d.</strong> Thu hồi số tiền hoặc tài sản có được từ hành vi gian lận, bao gồm chi phí vận chuyển.</p>
            <p className="mb-1"><strong>17.1.e.</strong> Khởi tố hình sự.</p>
            <p className="mb-1"><strong>17.1.f.</strong> Khởi kiện dân sự để đòi bồi thường thiệt hại hoặc áp dụng biện pháp khẩn cấp.</p>
            <p className="mb-2"><strong>17.2.</strong> Nếu phát hiện hành vi vi phạm, vui lòng báo cáo cho Ovenly tại <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">18. CƠ CHẾ BẢO VỆ GIAO DỊCH</h2>
            <p className="mb-2"><strong>18.1.</strong> Ovenly vận hành cơ chế bảo vệ giao dịch nhằm đảm bảo an toàn cho các giao dịch trên Hệ Thống. Để giảm thiểu rủi ro pháp lý, số tiền thanh toán từ Khách Hàng sẽ được giữ tạm trong Tài Khoản Bảo Lưu do Ovenly quản lý. Cơ Sở Ẩm Thực không nhận lãi suất từ số tiền này.</p>
            <p className="mb-2"><strong>18.2.</strong> Sau khi Khách Hàng thanh toán, số tiền sẽ được giữ trong Tài Khoản Bảo Lưu cho đến khi:</p>
            <p className="mb-1"><strong>18.2.a.</strong> Khách Hàng xác nhận "Đã nhận hàng" - Ovenly sẽ chuyển tiền vào Số Dư Tài Khoản của Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>18.2.b.</strong> Hết Khoảng Thời Gian Bảo Vệ (thông thường 4 ngày từ khi xác nhận giao hàng) - Ovenly sẽ tự động chuyển tiền vào Số Dư Tài Khoản của Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>18.2.c.</strong> Ovenly chấp thuận yêu cầu hoàn tiền - Số tiền sẽ được hoàn lại cho Khách Hàng, phần còn lại (nếu có) chuyển cho Cơ Sở Ẩm Thực.</p>
            <p className="mb-2"><strong>18.3.</strong> Thời điểm chuyển tiền vào Số Dư Tài Khoản:</p>
            <p className="mb-1"><strong>18.3.a.</strong> Khi Khách Hàng xác nhận nhận hàng: Chuyển ngay sau khi xác nhận.</p>
            <p className="mb-1"><strong>18.3.b.</strong> Khi Khách Hàng không xác nhận: Tự động chuyển vào ngày thứ 4 sau khi đơn hàng được đánh dấu Giao Thành Công.</p>
            <p className="mb-1"><strong>18.3.c.</strong> Có yêu cầu hoàn tiền: Chuyển phần còn lại sau khi xử lý xong yêu cầu.</p>
            <p className="mb-2"><strong>18.4.</strong> Nếu Cơ Sở Ẩm Thực mất liên lạc và sau 12 tháng kể từ khi tiền đến hạn nhưng chưa được nhận, Ovenly sẽ xử lý theo quy định pháp luật.</p>
            <p className="mb-2"><strong>18.5.</strong> Cơ Sở Ẩm Thực/Khách Hàng phải là người thụ hưởng thực sự và tự thực hiện giao dịch. Ovenly có quyền yêu cầu cung cấp ảnh chân dung, thông tin tài khoản ngân hàng và các tài liệu khác để xác minh danh tính.</p>
            <p className="mb-2"><strong>18.6.</strong> Cơ chế này không nhằm mục đích hỗ trợ người dùng tuân thủ các nghĩa vụ pháp lý riêng của họ và không cấu thành bảo hành sản phẩm.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">19. QUẢN LÝ SỐ DƯ TÀI KHOẢN</h2>
            <p className="mb-2"><strong>19.1.</strong> Số Dư Tài Khoản ghi nhận tiền bán hàng và giá trị hoàn trả từ các giao dịch. Tổng số tiền sau khi trừ các khoản đã thanh toán sẽ hiển thị trong Số Dư Tài Khoản.</p>
            <p className="mb-2"><strong>19.2.</strong> Cơ Sở Ẩm Thực có thể yêu cầu rút toàn bộ Số Dư Tài Khoản về tài khoản ngân hàng đã đăng ký chính xác ("Tài Khoản Thụ Hưởng"). Ovenly xử lý yêu cầu rút tiền ("Lệnh Thanh Toán") trong ngày làm việc và có thể mất tối đa 4 ngày làm việc để tiền về Tài Khoản Thụ Hưởng.</p>
            <p className="mb-2"><strong>19.3.</strong> Ovenly có quyền tạm giữ hoặc hoãn ghi nhận tiền bán hàng khi có bằng chứng hoặc nghi ngờ gian lận hoặc vi phạm pháp luật.</p>
            <p className="mb-2"><strong>19.4.</strong> Lệnh Thanh Toán không thể thay đổi hoặc hủy sau khi đã gửi.</p>
            <p className="mb-2"><strong>19.5.</strong> Nếu phát sinh lỗi trong quá trình xử lý, Cơ Sở Ẩm Thực ủy quyền cho Ovenly điều chỉnh lỗi và thực hiện ghi có hoặc ghi nợ trong Tài Khoản Thụ Hưởng theo quy định pháp luật.</p>
            <p className="mb-2"><strong>19.6.</strong> Cơ Sở Ẩm Thực ủy quyền cho Ovenly thực hiện điều chỉnh Số Dư Tài Khoản trong các trường hợp:</p>
            <p className="mb-1"><strong>19.6.a.</strong> Sửa lỗi trong quá trình xử lý giao dịch.</p>
            <p className="mb-1"><strong>19.6.b.</strong> Phát hiện hành vi hoặc giao dịch gian lận hoặc đáng ngờ.</p>
            <p className="mb-1"><strong>19.6.c.</strong> Xử lý các khoản thiệt hại hoặc không chính xác.</p>
            <p className="mb-1"><strong>19.6.d.</strong> Thu hồi các khoản phí chưa thanh toán.</p>
            <p className="mb-1"><strong>19.6.e.</strong> Giải quyết tranh chấp giao dịch.</p>
            <p className="mb-1"><strong>19.6.f.</strong> Xử lý các khoản nợ còn tồn đọng của Cơ Sở Ẩm Thực với Ovenly.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">20. VẬN CHUYỂN</h2>
            <p className="mb-2"><strong>20.1.</strong> Ovenly hợp tác với các nhà cung cấp vận chuyển bên thứ ba ("Nhà Cung Cấp Vận Chuyển") để thực hiện giao hàng. Ovenly đóng vai trò trung gian kết nối Cơ Sở Ẩm Thực và Khách Hàng với Nhà Cung Cấp Vận Chuyển. Việc vận chuyển thực tế do Nhà Cung Cấp Vận Chuyển thực hiện, không phải Ovenly hay Cơ Sở Ẩm Thực.</p>
            <p className="mb-2"><strong>20.2.</strong> Cơ Sở Ẩm Thực cần đảm bảo món ăn được chuẩn bị kịp thời và sẵn sàng bàn giao cho Nhà Cung Cấp Vận Chuyển đúng hẹn.</p>
            <p className="mb-2"><strong>20.3.</strong> Nhà Cung Cấp Vận Chuyển chịu rủi ro trong quá trình vận chuyển. Nếu hàng hóa bị hư hỏng, mất mát hoặc không giao được, Ovenly không chịu trách nhiệm về bất kỳ thiệt hại, chi phí hoặc tổn thất nào phát sinh.</p>
            <p className="mb-2"><strong>20.4.</strong> Ovenly hỗ trợ tiếp nhận và xử lý khiếu nại từ Khách Hàng khi không nhận được hàng đúng thời hạn. Chúng tôi sẽ chuyển thông tin đến Cơ Sở Ẩm Thực và/hoặc Nhà Cung Cấp Vận Chuyển để tìm giải pháp.</p>
            <p className="mb-2"><strong>20.5.</strong> Rõ ràng hóa: Trách nhiệm của Ovenly chỉ giới hạn ở việc hỗ trợ chuyển tiếp khiếu nại. Khách Hàng và Cơ Sở Ẩm Thực hiểu rằng Ovenly không chịu trách nhiệm về thiệt hại phát sinh từ quá trình vận chuyển.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">21. PHẠM VI TRÁCH NHIỆM</h2>
            <p className="mb-2"><strong>21.1. Ovenly KHÔNG chịu trách nhiệm về:</strong></p>
            <p className="mb-1"><strong>21.1.a.</strong> Chất lượng, an toàn hoặc độ tươi ngon của món ăn do Cơ Sở Ẩm Thực cung cấp.</p>
            <p className="mb-1"><strong>21.1.b.</strong> Hành vi, dịch vụ hoặc sai sót của Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>21.1.c.</strong> Ngộ độc hoặc các vấn đề sức khỏe liên quan đến thực phẩm.</p>
            <p className="mb-1"><strong>21.1.d.</strong> Chậm trễ trong chế biến hoặc giao hàng do Cơ Sở Ẩm Thực hoặc Nhà Cung Cấp Vận Chuyển.</p>
            <p className="mb-1"><strong>21.1.e.</strong> Tranh chấp về chất lượng giữa Khách Hàng và Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>21.1.f.</strong> Gián đoạn dịch vụ do sự cố kỹ thuật, bảo trì hoặc bất khả kháng.</p>
            <p className="mb-1"><strong>21.1.g.</strong> Nội Dung trên Hệ Thống, kể cả lỗi hoặc thiếu sót trong Nội Dung.</p>
            <p className="mb-1"><strong>21.1.h.</strong> Hành vi, dịch vụ hoặc sai sót của Nhà Cung Cấp Vận Chuyển.</p>
            <p className="mt-2"><strong>21.2.</strong> Trách nhiệm tối đa của Ovenly không vượt quá giá trị đơn hàng có vấn đề.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">22. BỒI HOÀN</h2>
            <p className="mb-2"><strong>22.1.</strong> Bạn đồng ý bồi hoàn và bảo vệ Ovenly, giám đốc, nhân viên và đối tác khỏi mọi khiếu nại, thiệt hại và chi phí (kể cả phí pháp lý) phát sinh từ:</p>
            <p className="mb-1"><strong>22.1.a.</strong> Vi phạm các điều khoản này.</p>
            <p className="mb-1"><strong>22.1.b.</strong> Vi phạm pháp luật Việt Nam.</p>
            <p className="mb-1"><strong>22.1.c.</strong> Xâm phạm quyền của bên thứ ba.</p>
            <p className="mb-1"><strong>22.1.d.</strong> Sử dụng Hệ Thống không đúng mục đích hoặc gây thiệt hại.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">23. GIẢI QUYẾT TRANH CHẤP</h2>
            <p className="mb-2"><strong>23.1.</strong> Tranh chấp phát sinh từ các điều khoản này sẽ được giải quyết theo trình tự:</p>
            <p className="mb-1"><strong>23.1.a.</strong> Đàm phán trực tiếp giữa các bên trong 30 ngày.</p>
            <p className="mb-1"><strong>23.1.b.</strong> Nếu không đạt thỏa thuận, chuyển sang Trung tâm Trọng tài Quốc tế Việt Nam (VIAC).</p>
            <p className="mb-1"><strong>23.1.c.</strong> Áp dụng luật: Pháp luật Việt Nam.</p>
            <p className="mb-1"><strong>23.1.d.</strong> Ngôn ngữ: Tiếng Việt.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">24. SỬA ĐỔI ĐIỀU KHOẢN</h2>
            <p className="mb-2"><strong>24.1.</strong> Ovenly có quyền sửa đổi các điều khoản này bất kỳ lúc nào. Thay đổi sẽ được thông báo qua Hệ Thống và/hoặc email ít nhất 5 ngày trước khi áp dụng.</p>
            <p className="mb-2"><strong>24.2.</strong> Việc tiếp tục sử dụng Hệ Thống sau khi thay đổi có hiệu lực được hiểu là bạn chấp nhận các điều khoản mới.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">25. CÁC QUY ĐỊNH BỔ SUNG</h2>
            <p className="mb-2"><strong>25.1.</strong> Nếu bất kỳ điều khoản nào bị xác định là không hợp lệ hoặc không thể thi hành, các điều khoản còn lại vẫn giữ nguyên hiệu lực.</p>
            <p className="mb-2"><strong>25.2.</strong> Ovenly có quyền chuyển giao quyền và nghĩa vụ theo văn bản này cho bên thứ ba mà không cần xin phép bạn.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">26. LIÊN HỆ</h2>
            <p className="mb-2"><strong>26.1.</strong> Nếu có thắc mắc về các điều khoản này, liên hệ:</p>
            <p><strong>Ovenly</strong><br/>Email: <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a><br/>Website: <a href="https://www.ovenly.io" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.ovenly.io</a></p>
          </section>

        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}