'use client';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-primary text-lg">LÒ ĐỒ ĂN</Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black text-primary mb-8">Chính Sách Bảo Mật</h1>
        <div className="bg-white rounded-2xl p-8 space-y-4 text-gray-600 text-sm leading-snug" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-xs text-gray-400">Phiên bản hiện hành: Tháng 4 năm 2026</p>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">THÔNG TIN CHUNG</h2>
            <p className="mb-2">Văn bản này quy định cách thức Ovenly ("chúng tôi") thu thập, sử dụng, tiết lộ và bảo vệ Thông Tin Cá Nhân khi bạn sử dụng nền tảng đặt hàng thực phẩm LÒ ĐỒ ĂN qua giao diện web, ứng dụng di động và các kênh liên quan.</p>
            <p className="mb-2">Ovenly hoạt động với tư cách công ty công nghệ cung cấp và vận hành Hệ Thống LÒ ĐỒ ĂN, kết nối người tiêu dùng với các cơ sở ẩm thực tại Việt Nam.</p>
            <p>Chính Sách này được xây dựng dựa trên Luật Bảo Vệ Dữ Liệu Cá Nhân 91/2025/QH15 có hiệu lực từ 01/01/2026 và Nghị định hướng dẫn liên quan.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">1. ĐỊNH NGHĨA THUẬT NGỮ</h2>
            <p className="mb-1"><strong>1.1. Thông Tin Cá Nhân:</strong> Mọi thông tin dưới dạng ký hiệu, chữ viết, chữ số, hình ảnh, âm thanh hoặc dạng tương tự trên môi trường điện tử gắn liền với một con người cụ thể hoặc giúp xác định một con người cụ thể.</p>
            <p className="mb-1"><strong>1.2. Thông Tin Cá Nhân Nhạy Cảm:</strong> Thông tin liên quan đến đời sống riêng tư mà nếu bị xâm phạm sẽ gây ảnh hưởng trực tiếp tới quyền và lợi ích hợp pháp của chủ thể dữ liệu, bao gồm dữ liệu vị trí, số điện thoại, hồ sơ sức khỏe, thông tin tài chính, thông tin sinh trắc học, dữ liệu về trẻ em dưới 16 tuổi.</p>
            <p className="mb-1"><strong>1.3. Xử Lý Dữ Liệu:</strong> Một hoặc nhiều hoạt động tác động tới Thông Tin Cá Nhân như thu thập, ghi, phân tích, xác nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất, thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp, chuyển giao, xóa, hủy hoặc các hành động khác có liên quan.</p>
            <p className="mb-1"><strong>1.4. Chủ Thể Dữ Liệu:</strong> Cá nhân mà Thông Tin Cá Nhân được thu thập, xử lý.</p>
            <p className="mb-1"><strong>1.5. Đồng Ý:</strong> Sự cho phép của chủ thể dữ liệu để xử lý Thông Tin Cá Nhân của mình dưới hình thức tự nguyện, cụ thể, rõ ràng và có thể xác minh được.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">2. CƠ SỞ PHÁP LÝ VÀ PHẠM VI ÁP DỤNG</h2>
            <p className="mb-2"><strong>2.1. Cơ sở pháp lý:</strong></p>
            <p className="mb-1"><strong>2.1.a.</strong> Luật Bảo Vệ Dữ Liệu Cá Nhân 91/2025/QH15</p>
            <p className="mb-1"><strong>2.1.b.</strong> Nghị định hướng dẫn thi hành Luật BVDLCN</p>
            <p className="mb-1"><strong>2.1.c.</strong> Luật Giao Dịch Điện Tử 20/2023/QH15</p>
            <p className="mb-1"><strong>2.1.d.</strong> Luật Bảo Vệ Quyền Lợi Người Tiêu Dùng 19/2023/QH15</p>
            <p className="mb-1"><strong>2.1.e.</strong> Luật An Ninh Mạng</p>
            <p className="mb-2"><strong>2.2. Phạm vi áp dụng:</strong> Chính Sách này áp dụng cho mọi cá nhân sử dụng Hệ Thống LÒ ĐỒ ĂN, bao gồm Khách Hàng, Chủ Cơ Sở Ẩm Thực, và bất kỳ ai truy cập vào Hệ Thống.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">3. PHƯƠNG THỨC VÀ NỘI DUNG THU THẬP</h2>
            <p className="mb-2"><strong>3.1. Thông tin bạn cung cấp trực tiếp:</strong></p>
            <p className="mb-1"><strong>3.1.a. Thông tin tài khoản:</strong> Họ tên, số điện thoại di động, địa chỉ email (nếu đăng ký tài khoản người dùng).</p>
            <p className="mb-1"><strong>3.1.b. Thông tin giao nhận:</strong> Địa chỉ nhận hàng đầy đủ, tọa độ vị trí, hướng dẫn tìm đường, ghi chú cho Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>3.1.c. Thông tin thanh toán:</strong> Phương thức thanh toán đã chọn (tiền mặt, chuyển khoản ngân hàng, ví điện tử, thẻ ngân hàng), thông tin thanh toán được mã hóa.</p>
            <p className="mb-1"><strong>3.1.d. Thông tin phản hồi:</strong> Đánh giá về Cơ Sở Ẩm Thực, xếp hạng món ăn, nhận xét về dịch vụ, hình ảnh đính kèm.</p>
            <p className="mb-1"><strong>3.1.e. Thông tin liên hệ hỗ trợ:</strong> Nội dung trao đổi với bộ phận chăm sóc khách hàng, khiếu nại, yêu cầu hỗ trợ.</p>
            <p className="mb-2"><strong>3.2. Thông tin thu thập tự động:</strong></p>
            <p className="mb-1"><strong>3.2.a. Dữ liệu giao dịch:</strong> Lịch sử đơn hàng đầy đủ bao gồm món ăn đã chọn, giá trị đơn hàng, Cơ Sở Ẩm Thực đã đặt, tần suất đặt hàng, thời điểm đặt hàng, trạng thái đơn hàng.</p>
            <p className="mb-1"><strong>3.2.b. Thông tin thiết bị:</strong> Địa chỉ IP, loại thiết bị, hệ điều hành, phiên bản trình duyệt, định danh thiết bị duy nhất, mức độ pin, cường độ tín hiệu mạng.</p>
            <p className="mb-1"><strong>3.2.c. Dữ liệu vị trí:</strong> Vị trí chính xác từ GPS (chỉ khi bạn cấp quyền), vị trí ước tính từ địa chỉ IP, dữ liệu Wi-Fi và tín hiệu di động xung quanh.</p>
            <p className="mb-1"><strong>3.2.d. Dữ liệu cookies:</strong> Cookie phiên làm việc, cookie chức năng, cookie phân tích, dữ liệu lưu trữ cục bộ, dữ liệu bộ nhớ đệm.</p>
            <p className="mb-1"><strong>3.2.e. Hành vi sử dụng:</strong> Thời gian duyệt trang, các trang đã xem, thứ tự xem trang, thời gian ở lại từng trang, liên kết đã nhấp, từ khóa tìm kiếm, món ăn đã xem nhưng chưa đặt.</p>
            <p className="mb-2"><strong>3.3. Thông tin từ bên thứ ba:</strong></p>
            <p className="mb-1"><strong>3.3.a. Đối tác thanh toán:</strong> Xác nhận giao dịch, trạng thái thanh toán, mã giao dịch từ MoMo, ZaloPay, 2C2P và các cổng thanh toán khác.</p>
            <p className="mb-1"><strong>3.3.b. Cơ Sở Ẩm Thực:</strong> Xác nhận đơn hàng, thời gian chế biến ước tính, trạng thái sẵn sàng giao hàng, lý do từ chối hoặc hủy đơn.</p>
            <p className="mb-1"><strong>3.3.c. Nhà Cung Cấp Vận Chuyển:</strong> Trạng thái vận chuyển, thời gian giao hàng dự kiến, thời gian giao hàng thực tế, lý do giao không thành công.</p>
            <p className="mb-1"><strong>3.3.d. Nền tảng xác thực:</strong> Xác thực tài khoản qua Google, Facebook, Apple nếu bạn chọn đăng nhập bằng tài khoản mạng xã hội (tên hiển thị, địa chỉ email, ảnh đại diện công khai).</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">4. MỤC ĐÍCH THU THẬP VÀ XỬ LÝ</h2>
            <p className="mb-2"><strong>4.1. Cung cấp và vận hành dịch vụ:</strong></p>
            <p className="mb-1"><strong>4.1.a.</strong> Tiếp nhận, xử lý và quản lý đơn đặt hàng từ Khách Hàng.</p>
            <p className="mb-1"><strong>4.1.b.</strong> Kết nối Khách Hàng với Cơ Sở Ẩm Thực phù hợp.</p>
            <p className="mb-1"><strong>4.1.c.</strong> Xử lý thanh toán qua các phương thức đã chọn.</p>
            <p className="mb-1"><strong>4.1.d.</strong> Phát hành xác nhận đơn hàng và thông báo trạng thái.</p>
            <p className="mb-1"><strong>4.1.e.</strong> Lưu trữ lịch sử giao dịch để hỗ trợ đặt lại.</p>
            <p className="mb-1"><strong>4.1.f.</strong> Tạo điều kiện giao hàng thông qua Nhà Cung Cấp Vận Chuyển.</p>
            <p className="mb-2"><strong>4.2. Bảo vệ an toàn và phát hiện gian lận:</strong></p>
            <p className="mb-1"><strong>4.2.a.</strong> Phát hiện các mẫu hành vi bất thường có dấu hiệu gian lận.</p>
            <p className="mb-1"><strong>4.2.b.</strong> Xác minh danh tính người dùng khi cần thiết.</p>
            <p className="mb-1"><strong>4.2.c.</strong> Ngăn chặn truy cập trái phép vào tài khoản.</p>
            <p className="mb-1"><strong>4.2.d.</strong> Bảo vệ quyền lợi của Khách Hàng và Cơ Sở Ẩm Thực.</p>
            <p className="mb-1"><strong>4.2.e.</strong> Giải quyết tranh chấp phát sinh giữa các bên.</p>
            <p className="mb-1"><strong>4.2.f.</strong> Tuân thủ nghĩa vụ pháp lý về chống rửa tiền.</p>
            <p className="mb-2"><strong>4.3. Hỗ trợ và chăm sóc khách hàng:</strong></p>
            <p className="mb-1"><strong>4.3.a.</strong> Phản hồi các câu hỏi và yêu cầu hỗ trợ kỹ thuật.</p>
            <p className="mb-1"><strong>4.3.b.</strong> Xử lý khiếu nại về chất lượng món ăn hoặc dịch vụ.</p>
            <p className="mb-1"><strong>4.3.c.</strong> Xử lý yêu cầu hoàn tiền hoặc bồi thường.</p>
            <p className="mb-1"><strong>4.3.d.</strong> Cải thiện quy trình hỗ trợ khách hàng.</p>
            <p className="mb-2"><strong>4.4. Phân tích và cải thiện dịch vụ:</strong></p>
            <p className="mb-1"><strong>4.4.a.</strong> Nghiên cứu xu hướng tiêu dùng và thói quen đặt hàng.</p>
            <p className="mb-1"><strong>4.4.b.</strong> Phân tích hiệu suất Hệ Thống và trải nghiệm người dùng.</p>
            <p className="mb-1"><strong>4.4.c.</strong> Phát triển tính năng mới dựa trên nhu cầu người dùng.</p>
            <p className="mb-1"><strong>4.4.d.</strong> Tiến hành nghiên cứu thị trường với dữ liệu đã ẩn danh.</p>
            <p className="mb-1"><strong>4.4.e.</strong> Kiểm thử A/B để tối ưu hóa giao diện.</p>
            <p className="mb-2"><strong>4.5. Tiếp thị và truyền thông (chỉ khi có đồng ý):</strong></p>
            <p className="mb-1"><strong>4.5.a.</strong> Gửi thông báo về chương trình ưu đãi đặc biệt.</p>
            <p className="mb-1"><strong>4.5.b.</strong> Phát hành mã giảm giá cá nhân hóa.</p>
            <p className="mb-1"><strong>4.5.c.</strong> Thông báo về Cơ Sở Ẩm Thực mới trong khu vực.</p>
            <p className="mb-1"><strong>4.5.d.</strong> Mời tham gia khảo sát ý kiến khách hàng.</p>
            <p className="mb-1"><strong>4.5.e.</strong> Gửi bản tin về xu hướng ẩm thực.</p>
            <p className="mb-2 text-xs text-gray-500">Bạn có thể rút lại đồng ý nhận thông tin tiếp thị bất kỳ lúc nào bằng cách nhấp liên kết "Hủy đăng ký" trong email hoặc liên hệ hello@ovenly.io</p>
            <p className="mb-2"><strong>4.6. Tuân thủ pháp lý:</strong></p>
            <p className="mb-1"><strong>4.6.a.</strong> Lưu giữ hồ sơ kế toán và thuế theo quy định.</p>
            <p className="mb-1"><strong>4.6.b.</strong> Phản hồi yêu cầu từ cơ quan có thẩm quyền.</p>
            <p className="mb-1"><strong>4.6.c.</strong> Tuân thủ lệnh tòa án hoặc quyết định hành chính.</p>
            <p className="mb-1"><strong>4.6.d.</strong> Bảo vệ quyền lợi hợp pháp của Ovenly trong các tranh chấp.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">5. CHIA SẺ VÀ TIẾT LỘ THÔNG TIN</h2>
            <p className="mb-2"><strong>5.1. Chia sẻ với Cơ Sở Ẩm Thực:</strong> Khi đặt hàng, chúng tôi cung cấp cho Cơ Sở Ẩm Thực các thông tin: tên và số điện thoại của bạn, địa chỉ giao hàng (nếu chọn giao hàng), chi tiết món ăn đã đặt, ghi chú đặc biệt. Cơ Sở Ẩm Thực có quyền truy cập thông tin này trong 30 ngày từ khi hoàn thành đơn hàng nhằm mục đích hỗ trợ và giải quyết vấn đề phát sinh.</p>
            <p className="mb-2"><strong>5.2. Chia sẻ với đối tác thanh toán:</strong> Khi sử dụng thanh toán điện tử, chúng tôi chia sẻ với MoMo, ZaloPay, 2C2P và các cổng thanh toán khác các thông tin: số tiền giao dịch, mã đơn hàng, thông tin thanh toán đã được mã hóa. Các đối tác này xử lý thông tin thanh toán theo chính sách bảo mật riêng của họ.</p>
            <p className="mb-2"><strong>5.3. Chia sẻ với Nhà Cung Cấp Vận Chuyển:</strong> Đối với đơn hàng giao hàng, chúng tôi chia sẻ với nhà vận chuyển: tên người nhận, số điện thoại liên hệ, địa chỉ giao hàng đầy đủ, hướng dẫn tìm đường. Thông tin này chỉ được sử dụng cho mục đích vận chuyển và sẽ bị xóa sau khi hoàn thành giao hàng.</p>
            <p className="mb-2"><strong>5.4. Chia sẻ với nhà cung cấp dịch vụ kỹ thuật:</strong></p>
            <p className="mb-1"><strong>5.4.a.</strong> Nhà cung cấp lưu trữ đám mây để lưu giữ dữ liệu Hệ Thống.</p>
            <p className="mb-1"><strong>5.4.b.</strong> Nhà cung cấp dịch vụ email để gửi xác nhận đơn hàng và thông báo tự động.</p>
            <p className="mb-1"><strong>5.4.c.</strong> Google Analytics để phân tích lưu lượng truy cập với dữ liệu đã ẩn danh.</p>
            <p className="mb-1"><strong>5.4.d.</strong> Nhà cung cấp bảo mật để giám sát và phòng chống tấn công mạng.</p>
            <p className="mb-2"><strong>5.5. Tiết lộ cho cơ quan nhà nước:</strong> Chúng tôi có thể tiết lộ Thông Tin Cá Nhân khi: có yêu cầu từ tòa án, cơ quan điều tra, cơ quan thuế hoặc cơ quan nhà nước có thẩm quyền khác; cần thiết để tuân thủ luật định về chống rửa tiền, chống khủng bố; cần thiết để bảo vệ quyền lợi hợp pháp của Ovenly; có căn cứ tin rằng việc tiết lộ là cần thiết để ngăn chặn tổn hại nghiêm trọng cho người khác.</p>
            <p className="mb-2"><strong>5.6. Chuyển giao trong giao dịch doanh nghiệp:</strong> Nếu Ovenly tham gia vào giao dịch sáp nhập, mua lại, bán tài sản hoặc phá sản, Thông Tin Cá Nhân có thể được chuyển giao cho bên kế thừa. Bạn sẽ được thông báo trước ít nhất 30 ngày và có quyền phản đối việc chuyển giao. Bên kế thừa phải cam kết tuân thủ Chính Sách này hoặc xin đồng ý mới từ bạn.</p>
            <p className="mb-2"><strong>5.7. Chia sẻ dữ liệu tổng hợp:</strong> Chúng tôi có thể chia sẻ dữ liệu thống kê đã được tổng hợp và ẩn danh (không thể xác định cá nhân) với đối tác kinh doanh, nhà đầu tư, hoặc công chúng nhằm mục đích nghiên cứu thị trường hoặc báo cáo hoạt động kinh doanh.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">6. CHUYỂN GIAO DỮ LIỆU XUYÊN BIÊN GIỚI</h2>
            <p className="mb-2"><strong>6.1. Vị trí lưu trữ:</strong> Thông Tin Cá Nhân của bạn được lưu trữ trên các máy chủ đám mây đặt tại nước ngoài nhằm đảm bảo hiệu suất và độ tin cậy cao. Việc chuyển giao dữ liệu ra nước ngoài tuân thủ đầy đủ Luật Bảo Vệ Dữ Liệu Cá Nhân và các quy định về chuyển giao xuyên biên giới.</p>
            <p className="mb-2"><strong>6.2. Biện pháp bảo vệ:</strong> Chúng tôi đảm bảo mức độ bảo vệ tương đương cho dữ liệu được chuyển ra nước ngoài thông qua: ký kết thỏa thuận xử lý dữ liệu với các nhà cung cấp dịch vụ đám mây, áp dụng điều khoản hợp đồng mẫu về bảo vệ dữ liệu, mã hóa dữ liệu khi truyền tải và lưu trữ, thực hiện đánh giá tác động chuyển giao xuyên biên giới khi cần thiết, kiểm toán bảo mật định kỳ đối với nhà cung cấp dịch vụ.</p>
            <p className="mb-2"><strong>6.3. Quyền của bạn:</strong> Bạn có quyền yêu cầu thông tin chi tiết về việc chuyển giao dữ liệu ra nước ngoài, bao gồm vị trí cụ thể của máy chủ lưu trữ và các biện pháp bảo vệ được áp dụng, bằng cách liên hệ với chúng tôi.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">7. THỜI HẠN LƯU GIỮ DỮ LIỆU</h2>
            <p className="mb-2">Chúng tôi chỉ lưu giữ Thông Tin Cá Nhân trong thời gian cần thiết để đạt được các mục đích đã nêu hoặc theo yêu cầu của pháp luật:</p>
            <p className="mb-1"><strong>7.1.</strong> Thông tin đơn hàng và giao dịch: 30 ngày kể từ khi hoàn thành đơn hàng (để hỗ trợ khách hàng và xử lý khiếu nại), sau đó sẽ được ẩn danh hóa để phục vụ mục đích phân tích.</p>
            <p className="mb-1"><strong>7.2.</strong> Hồ sơ kế toán và thuế: 10 năm theo quy định của Luật Kế Toán và Luật Quản Lý Thuế.</p>
            <p className="mb-1"><strong>7.3.</strong> Thông tin tài khoản người dùng: Cho đến khi bạn yêu cầu xóa tài khoản hoặc 24 tháng kể từ lần truy cập cuối cùng (tài khoản không hoạt động).</p>
            <p className="mb-1"><strong>7.4.</strong> Dữ liệu phân tích đã ẩn danh: Có thể lưu giữ vô thời hạn vì không thể xác định cá nhân.</p>
            <p className="mb-1"><strong>7.5.</strong> Đồng ý tiếp thị: Cho đến khi bạn rút lại đồng ý.</p>
            <p className="mb-1"><strong>7.6.</strong> Dữ liệu cookies: Tùy loại cookie, từ phiên làm việc đến 24 tháng.</p>
            <p className="mb-1"><strong>7.7.</strong> Hồ sơ tranh chấp pháp lý: Cho đến khi tranh chấp được giải quyết hoàn toàn và hết thời hiệu khởi kiện.</p>
            <p className="mb-2 text-xs text-gray-500">Sau khi hết thời hạn lưu giữ, chúng tôi sẽ xóa hoặc ẩn danh hóa Thông Tin Cá Nhân một cách an toàn theo quy trình nội bộ.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">8. COOKIES VÀ CÔNG NGHỆ THEO DÕI</h2>
            <p className="mb-2"><strong>8.1. Các loại cookies chúng tôi sử dụng:</strong></p>
            <p className="mb-1"><strong>8.1.a. Cookies cần thiết:</strong> Duy trì phiên đăng nhập, lưu giỏ hàng, xác thực bảo mật. Cookies này không thể tắt vì cần thiết để Hệ Thống hoạt động.</p>
            <p className="mb-1"><strong>8.1.b. Cookies chức năng:</strong> Ghi nhớ sở thích ngôn ngữ, vị trí giao hàng mặc định, cài đặt hiển thị. Có thể tắt nhưng sẽ ảnh hưởng trải nghiệm.</p>
            <p className="mb-1"><strong>8.1.c. Cookies phân tích:</strong> Google Analytics để hiểu cách bạn sử dụng Hệ Thống, các trang được xem nhiều, thời gian truy cập. Dữ liệu được ẩn danh.</p>
            <p className="mb-2"><strong>8.2. Chúng tôi KHÔNG sử dụng:</strong> Cookies quảng cáo nhắm mục tiêu trên các website khác, theo dõi hành vi xuyên website, bán dữ liệu cho bên thứ ba, cookies từ mạng quảng cáo.</p>
            <p className="mb-2"><strong>8.3. Cách quản lý cookies:</strong> Bạn có thể kiểm soát cookies thông qua cài đặt trình duyệt. Lưu ý rằng việc chặn một số cookies có thể ảnh hưởng đến chức năng của Hệ Thống. Chrome: Cài đặt → Quyền riêng tư và bảo mật → Cookie và dữ liệu trang web khác. Firefox: Tùy chọn → Quyền riêng tư và bảo mật → Cookie và dữ liệu trang web. Safari: Tùy chọn → Quyền riêng tư → Quản lý dữ liệu trang web.</p>
            <p className="mb-2"><strong>8.4. Công nghệ khác:</strong> Chúng tôi cũng sử dụng: Web beacons (pixel trong email để theo dõi tỷ lệ mở email tiếp thị), Local Storage (lưu dữ liệu tạm thời để cải thiện hiệu suất), Session Storage (lưu dữ liệu trong phiên làm việc).</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">9. BIỆN PHÁP BẢO MẬT</h2>
            <p className="mb-2"><strong>9.1. Biện pháp kỹ thuật:</strong></p>
            <p className="mb-1"><strong>9.1.a. Mã hóa:</strong> Tất cả dữ liệu được mã hóa khi truyền tải qua Internet (HTTPS/TLS 1.3), dữ liệu nhạy cảm được mã hóa khi lưu trữ (AES-256).</p>
            <p className="mb-1"><strong>9.1.b. Tường lửa:</strong> Hệ thống tường lửa nhiều lớp bảo vệ máy chủ khỏi truy cập trái phép.</p>
            <p className="mb-1"><strong>9.1.c. Phát hiện xâm nhập:</strong> Hệ thống giám sát 24/7 để phát hiện và ngăn chặn hoạt động bất thường.</p>
            <p className="mb-1"><strong>9.1.d. Sao lưu:</strong> Dữ liệu được sao lưu tự động hàng ngày và lưu trữ ở nhiều vị trí địa lý.</p>
            <p className="mb-1"><strong>9.1.e. Kiểm thử bảo mật:</strong> Thực hiện kiểm thử thâm nhập định kỳ bởi đơn vị độc lập.</p>
            <p className="mb-2"><strong>9.2. Biện pháp tổ chức:</strong></p>
            <p className="mb-1"><strong>9.2.a. Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền và có nhu cầu công việc mới được truy cập Thông Tin Cá Nhân, mỗi nhân viên chỉ truy cập dữ liệu cần thiết cho công việc (nguyên tắc tối thiểu hóa).</p>
            <p className="mb-1"><strong>9.2.b. Đào tạo:</strong> Toàn bộ nhân viên được đào tạo về bảo vệ dữ liệu và ký cam kết bảo mật.</p>
            <p className="mb-1"><strong>9.2.c. Chính sách nội bộ:</strong> Quy định rõ ràng về xử lý, lưu trữ và tiêu hủy dữ liệu.</p>
            <p className="mb-1"><strong>9.2.d. Kiểm toán:</strong> Kiểm toán nội bộ định kỳ về tuân thủ bảo mật.</p>
            <p className="mb-2"><strong>9.3. Hạn chế:</strong> Mặc dù áp dụng các biện pháp bảo mật hợp lý, chúng tôi không thể đảm bảo an toàn tuyệt đối 100%. Bạn cần: sử dụng mật khẩu mạnh và duy nhất, không chia sẻ thông tin đăng nhập, đăng xuất sau khi sử dụng trên thiết bị chung, cập nhật phần mềm và hệ điều hành thường xuyên, cảnh giác với email lừa đảo mạo danh Ovenly.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">10. QUYỀN CỦA CHỦ THỂ DỮ LIỆU</h2>
            <p className="mb-2">Theo Luật Bảo Vệ Dữ Liệu Cá Nhân 91/2025/QH15, bạn có các quyền sau:</p>
            <p className="mb-2"><strong>10.1. Quyền được biết:</strong> Bạn có quyền biết Thông Tin Cá Nhân nào đang được thu thập, mục đích thu thập, ai đang xử lý dữ liệu, dữ liệu được chia sẻ với ai, thời hạn lưu giữ dự kiến.</p>
            <p className="mb-2"><strong>10.2. Quyền đồng ý và rút lại đồng ý:</strong> Bạn có quyền đồng ý hoặc từ chối đồng ý với việc xử lý Thông Tin Cá Nhân (trừ trường hợp pháp luật quy định). Bạn có quyền rút lại đồng ý bất kỳ lúc nào mà không ảnh hưởng đến tính hợp pháp của việc xử lý trước đó. Việc rút lại đồng ý có thể khiến chúng tôi không thể cung cấp một số dịch vụ cho bạn.</p>
            <p className="mb-2"><strong>10.3. Quyền truy cập:</strong> Bạn có quyền yêu cầu một bản sao Thông Tin Cá Nhân mà chúng tôi đang lưu giữ về bạn. Bản sao đầu tiên được cung cấp miễn phí. Chúng tôi có thể thu phí hợp lý cho các bản sao tiếp theo.</p>
            <p className="mb-2"><strong>10.4. Quyền chỉnh sửa:</strong> Bạn có quyền yêu cầu chỉnh sửa Thông Tin Cá Nhân không chính xác, không đầy đủ hoặc đã lỗi thời. Chúng tôi sẽ xác minh danh tính và xác nhận thông tin mới trước khi thực hiện cập nhật.</p>
            <p className="mb-2"><strong>10.5. Quyền xóa (quyền được lãng quên):</strong> Bạn có quyền yêu cầu xóa Thông Tin Cá Nhân trong các trường hợp: Thông tin không còn cần thiết cho mục đích đã thu thập, bạn rút lại đồng ý và không có cơ sở pháp lý nào khác, dữ liệu được xử lý trái pháp luật, cần xóa để tuân thủ nghĩa vụ pháp lý. Chúng tôi có thể từ chối yêu cầu xóa nếu cần giữ lại dữ liệu để: tuân thủ nghĩa vụ pháp lý (như lưu hồ sơ thuế 10 năm), thiết lập, thực hiện hoặc bảo vệ các yêu cầu pháp lý, bảo vệ quyền tự do ngôn luận và thông tin.</p>
            <p className="mb-2"><strong>10.6. Quyền hạn chế xử lý:</strong> Bạn có quyền yêu cầu hạn chế xử lý Thông Tin Cá Nhân khi: đang tranh chấp về tính chính xác của dữ liệu, việc xử lý là trái pháp luật nhưng bạn không muốn xóa, chúng tôi không còn cần dữ liệu nhưng bạn cần để thiết lập yêu cầu pháp lý, bạn đã phản đối việc xử lý và đang chờ xác minh.</p>
            <p className="mb-2"><strong>10.7. Quyền phản đối:</strong> Bạn có quyền phản đối việc xử lý Thông Tin Cá Nhân dựa trên lợi ích chính đáng của chúng tôi. Chúng tôi sẽ ngừng xử lý trừ khi chứng minh được lợi ích chính đáng đè bẹp quyền lợi của bạn. Bạn có quyền phản đối xử lý cho mục đích tiếp thị bất kỳ lúc nào.</p>
            <p className="mb-2"><strong>10.8. Quyền khiếu nại:</strong> Nếu cho rằng quyền của bạn bị vi phạm, bạn có quyền khiếu nại lên cơ quan bảo vệ dữ liệu cá nhân có thẩm quyền tại Việt Nam.</p>
            <p className="mb-2"><strong>10.9. Quyền yêu cầu bồi thường:</strong> Nếu việc xử lý Thông Tin Cá Nhân trái pháp luật gây thiệt hại cho bạn, bạn có quyền yêu cầu bồi thường theo quy định pháp luật.</p>
            <p className="mb-2 p-3 bg-blue-50 rounded-lg text-xs"><strong>Cách thực hiện quyền:</strong> Gửi yêu cầu đến hello@ovenly.io với tiêu đề "Yêu Cầu Dữ Liệu Cá Nhân - [Họ Tên]". Đính kèm bản sao CMND/CCCD để xác minh danh tính. Chúng tôi sẽ phản hồi trong 15 ngày theo quy định. Nếu yêu cầu phức tạp, chúng tôi có thể gia hạn thêm 15 ngày và sẽ thông báo cho bạn.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">11. THÔNG TIN CÁ NHÂN NHẠY CẢM</h2>
            <p className="mb-2"><strong>11.1. Ovenly KHÔNG có chủ ý thu thập</strong> các loại Thông Tin Cá Nhân Nhạy Cảm sau: thông tin về sức khỏe, bệnh tật hoặc khuyết tật, tín ngưỡng tôn giáo hoặc quan điểm chính trị, dữ liệu sinh trắc học (vân tay, nhận dạng khuôn mặt, mống mắt), tiểu sử tư pháp hoặc hồ sơ phạm tội, thông tin về định hướng tính dục hoặc bản dạng giới, thông tin về nguồn gốc chủng tộc hoặc dân tộc.</p>
            <p className="mb-2"><strong>11.2. Dữ liệu vị trí:</strong> Mặc dù dữ liệu vị trí được coi là nhạy cảm theo một số quy định, chúng tôi chỉ thu thập khi bạn cho phép và chỉ sử dụng để cung cấp dịch vụ giao hàng. Bạn có thể tắt quyền truy cập vị trí bất kỳ lúc nào trong cài đặt thiết bị, nhưng điều này sẽ ảnh hưởng đến khả năng giao hàng chính xác.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">12. TRẺ VỊ THÀNH NIÊN</h2>
            <p className="mb-2"><strong>12.1. Yêu cầu độ tuổi:</strong> Hệ Thống dành cho người từ 18 tuổi trở lên. Chúng tôi không cố ý thu thập Thông Tin Cá Nhân từ người dưới 18 tuổi mà không có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp.</p>
            <p className="mb-2"><strong>12.2. Trách nhiệm của cha mẹ:</strong> Nếu bạn là cha mẹ hoặc người giám hộ và phát hiện con bạn đã cung cấp Thông Tin Cá Nhân cho chúng tôi mà không có sự đồng ý, vui lòng liên hệ hello@ovenly.io. Chúng tôi sẽ xóa thông tin đó trong thời gian sớm nhất.</p>
            <p className="mb-2"><strong>12.3. Phát hiện và xử lý:</strong> Nếu chúng tôi phát hiện đã vô tình thu thập Thông Tin Cá Nhân từ người dưới 18 tuổi, chúng tôi sẽ xóa thông tin đó khỏi hệ thống trong vòng 72 giờ.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">13. VI PHẠM DỮ LIỆU</h2>
            <p className="mb-2"><strong>13.1. Nghĩa vụ thông báo:</strong> Trong trường hợp xảy ra vi phạm dữ liệu có thể gây rủi ro cho quyền và lợi ích của bạn, chúng tôi sẽ thông báo cho bạn và cơ quan có thẩm quyền trong vòng 72 giờ kể từ khi phát hiện.</p>
            <p className="mb-2"><strong>13.2. Nội dung thông báo:</strong> Thông báo vi phạm sẽ bao gồm: mô tả bản chất của vi phạm, loại dữ liệu bị ảnh hưởng, số lượng chủ thể dữ liệu bị ảnh hưởng (nếu có thể xác định), hậu quả có thể xảy ra, biện pháp đã và đang thực hiện để khắc phục, khuyến nghị cho bạn để bảo vệ mình.</p>
            <p className="mb-2"><strong>13.3. Quyền của bạn:</strong> Sau khi nhận thông báo vi phạm, bạn có quyền: yêu cầu thông tin chi tiết hơn về vi phạm, yêu cầu các biện pháp khắc phục cụ thể, khiếu nại lên cơ quan có thẩm quyền, yêu cầu bồi thường thiệt hại nếu có.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">14. SỬA ĐỔI CHÍNH SÁCH</h2>
            <p className="mb-2"><strong>14.1. Quyền sửa đổi:</strong> Chúng tôi có quyền cập nhật Chính Sách này để phản ánh thay đổi về hoạt động kinh doanh, yêu cầu pháp lý, công nghệ mới.</p>
            <p className="mb-2"><strong>14.2. Thông báo thay đổi:</strong> Thay đổi quan trọng sẽ được thông báo qua: đăng tải phiên bản mới trên website với ngày hiệu lực rõ ràng, gửi email thông báo đến địa chỉ đã đăng ký (cho thay đổi quan trọng), hiển thị thông báo nổi bật trên Hệ Thống trong 30 ngày.</p>
            <p className="mb-2"><strong>14.3. Đồng ý với thay đổi:</strong> Việc bạn tiếp tục sử dụng Hệ Thống sau khi thay đổi có hiệu lực được hiểu là bạn chấp nhận Chính Sách mới. Nếu không đồng ý, bạn nên ngừng sử dụng Hệ Thống và có thể yêu cầu xóa tài khoản.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">15. THÔNG TIN LIÊN HỆ</h2>
            <p className="mb-2">Nếu có câu hỏi về Chính Sách này hoặc muốn thực hiện quyền của mình, liên hệ:</p>
            <div className="p-3 bg-gray-50 rounded-lg text-xs">
              <p className="font-semibold text-gray-900">CÔNG TY TNHH MTV OVENLY SOFTWARE</p>
              <p className="text-gray-700 mt-1">Bộ phận: Phụ Trách Bảo Vệ Dữ Liệu Cá Nhân</p>
              <p className="text-gray-700">Email: <a href="mailto:hello@ovenly.io" className="text-primary underline">hello@ovenly.io</a></p>
              <p className="text-gray-700">Website: <a href="https://www.ovenly.io" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.ovenly.io</a></p>
            </div>
            <p className="mt-2 text-xs text-gray-500">Chúng tôi cam kết xử lý yêu cầu của bạn trong 15 ngày làm việc kể từ ngày nhận được yêu cầu hợp lệ. Đối với yêu cầu phức tạp, thời hạn có thể kéo dài thêm 15 ngày và chúng tôi sẽ thông báo trước.</p>
          </section>

        </div>
      </div>
    </div>
  );
}