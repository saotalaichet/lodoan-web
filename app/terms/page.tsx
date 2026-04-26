'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-primary text-lg">LÒ ĐỒ ĂN</Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl font-black text-primary mb-8">Điều Khoản Dịch Vụ</h1>
        <div className="bg-white rounded-2xl p-8 space-y-6 text-gray-700 leading-relaxed" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <p className="text-sm text-gray-400">Cập nhật lần cuối: Tháng 4 năm 2026</p>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">1. GIỚI THIỆU VÀ CHẤP NHẬN ĐIỀU KHOẢN</h2>
            
            <p className="mb-3"><strong>1.1.</strong> Chào mừng bạn đến với Nền Tảng Đặt Hàng Thực Phẩm LÒ ĐỒ ĂN qua giao diện website hoặc ứng dụng di động ("Nền Tảng" hoặc "Sàn LÒ ĐỒ ĂN"). Trước khi sử dụng Nền Tảng hoặc tạo tài khoản LÒ ĐỒ ĂN ("Tài Khoản"), vui lòng đọc kỹ các Điều Khoản Dịch Vụ dưới đây để hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với Công ty Ovenly và các công ty liên kết (sau đây được gọi là "Ovenly", "chúng tôi", "của chúng tôi"). "Dịch Vụ" chúng tôi cung cấp bao gồm (a) Nền Tảng, (b) các dịch vụ được cung cấp bởi Nền Tảng, và (c) tất cả các thông tin, tính năng, dữ liệu, văn bản, hình ảnh, đánh giá, nội dung có sẵn trên Nền Tảng ("Nội Dung").</p>

            <p className="mb-3"><strong>1.2.</strong> Dịch Vụ bao gồm nền tảng đặt hàng trực tuyến kết nối người tiêu dùng với nhà hàng nhằm tạo cơ hội kinh doanh giữa người mua ("Người Mua" hoặc "Khách Hàng") và nhà hàng ("Nhà Hàng" hoặc "Người Bán") (gọi chung là "bạn", "Người Sử Dụng"). Hợp đồng mua bán thật sự là trực tiếp giữa Người Mua và Nhà Hàng. Các bên liên quan đến giao dịch đó sẽ chịu trách nhiệm đối với hợp đồng mua bán giữa họ, chất lượng sản phẩm, và bảo hành sản phẩm. Ovenly không can thiệp vào giao dịch giữa các Người Sử Dụng. Ovenly có thể hoặc không sàng lọc trước Người Sử Dụng hoặc Nội Dung. Ovenly bảo lưu quyền loại bỏ bất cứ Nội Dung hoặc thông tin nào trên Nền Tảng. Ovenly không bảo đảm cho việc các Người Sử Dụng sẽ thực tế hoàn thành giao dịch.</p>

            <p className="mb-3"><strong>1.3.</strong> Trước khi trở thành Người Sử Dụng của Nền Tảng, bạn cần đọc và chấp nhận mọi điều khoản và điều kiện được quy định trong Điều Khoản Dịch Vụ này và Chính Sách Bảo Mật.</p>

            <p className="mb-3"><strong>1.4.</strong> Ovenly bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm dứt tất cả hoặc bất kỳ phần nào của Nền Tảng hoặc Dịch Vụ vào bất cứ thời điểm nào theo quy định pháp luật.</p>

            <p className="mb-3"><strong>1.5.</strong> Ovenly bảo lưu quyền từ chối yêu cầu mở Tài Khoản hoặc các truy cập của bạn tới Nền Tảng hoặc Dịch Vụ theo quy định pháp luật và Điều Khoản Dịch Vụ.</p>

            <div className="my-4 p-4 bg-red-50 border-l-4 border-red-500">
              <p className="font-bold text-red-700">BẰNG VIỆC SỬ DỤNG DỊCH VỤ HAY TẠO TÀI KHOẢN TẠI LÒ ĐỒ ĂN, BẠN ĐÃ CHẤP NHẬN VÀ ĐỒNG Ý VỚI NHỮNG ĐIỀU KHOẢN DỊCH VỤ NÀY VÀ CHÍNH SÁCH BẢO MẬT.</p>
            </div>

            <div className="my-4 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="font-bold">NẾU BẠN KHÔNG ĐỒNG Ý VỚI NHỮNG ĐIỀU KHOẢN DỊCH VỤ NÀY, VUI LÒNG KHÔNG SỬ DỤNG DỊCH VỤ HOẶC TRUY CẬP VÀO NỀN TẢNG.</p>
              <p className="mt-2">NẾU BẠN LÀ NGƯỜI CHƯA THÀNH NIÊN HOẶC BỊ GIỚI HẠN VỀ NĂNG LỰC HÀNH VI DÂN SỰ THEO QUY ĐỊNH PHÁP LUẬT, BẠN CẦN NHẬN ĐƯỢC SỰ HỖ TRỢ HOẶC CHẤP THUẬN TỪ CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP ĐỂ MỞ TÀI KHOẢN HOẶC SỬ DỤNG DỊCH VỤ. TRONG TRƯỜNG HỢP ĐÓ, CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP CẦN HỖ TRỢ ĐỂ BẠN HIỂU RÕ HOẶC THAY MẶT BẠN CHẤP NHẬN NHỮNG ĐIỀU KHOẢN TRONG THỎA THUẬN DỊCH VỤ NÀY.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">2. ĐỊNH NGHĨA</h2>
            
            <p className="mb-2"><strong>2.1. Nền Tảng:</strong> Ứng dụng web và di động LÒ ĐỒ ĂN do Ovenly cung cấp.</p>
            
            <p className="mb-2"><strong>2.2. Người Dùng hoặc Người Mua:</strong> Khách hàng sử dụng Nền Tảng để đặt hàng thực phẩm.</p>
            
            <p className="mb-2"><strong>2.3. Nhà Hàng hoặc Người Bán:</strong> Các cơ sở kinh doanh thực phẩm đăng ký bán hàng trên Nền Tảng.</p>
            
            <p className="mb-2"><strong>2.4. Đơn Hàng:</strong> Yêu cầu mua thực phẩm được đặt qua Nền Tảng.</p>
            
            <p className="mb-2"><strong>2.5. Phí Dịch Vụ:</strong> Phí Ovenly thu để duy trì và vận hành Nền Tảng (1-2% giá trị đơn hàng).</p>
            
            <p className="mb-2"><strong>2.6. Dữ Liệu Cá Nhân:</strong> Thông tin có thể nhận dạng cá nhân theo Luật Bảo Vệ Dữ Liệu Cá Nhân số 91/2025/QH15.</p>
            
            <p className="mb-2"><strong>2.7. Nội Dung:</strong> Bao gồm văn bản, hình ảnh, đánh giá, và các tài liệu khác có sẵn trên Nền Tảng.</p>
            
            <p className="mb-2"><strong>2.8. Tài Khoản Đảm Bảo:</strong> Tài khoản lưu giữ tạm thời khoản tiền thanh toán của Người Mua cho đến khi hoàn thành giao dịch.</p>
            
            <p className="mb-2"><strong>2.9. Thời Gian Đảm Bảo:</strong> Khoảng thời gian Ovenly giữ tiền trong Tài Khoản Đảm Bảo (thường là 4 ngày kể từ khi giao hàng thành công).</p>

            <p className="mb-2"><strong>2.10. Đơn Vị Vận Chuyển:</strong> Các đối tác vận chuyển bên thứ ba mà Ovenly hợp tác để thực hiện dịch vụ giao hàng.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">3. YÊU CẦU ĐỘ TUỔI VÀ NĂNG LỰC PHÁP LÝ</h2>
            
            <p className="mb-3"><strong>3.1.</strong> Bạn phải đủ 18 tuổi trở lên để sử dụng Nền Tảng. Bằng việc sử dụng dịch vụ, bạn cam đoan rằng bạn có đầy đủ năng lực pháp lý để ký kết hợp đồng theo pháp luật Việt Nam.</p>

            <p className="mb-3"><strong>3.2.</strong> Bạn chỉ có thể sử dụng Dịch Vụ và/hoặc mở Tài Khoản tại LÒ ĐỒ ĂN nếu bạn đáp ứng đủ các điều kiện để chấp nhận Điều Khoản Dịch Vụ này.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">4. CAM ĐOAN VÀ NGHĨA VỤ CỦA NGƯỜI DÙNG</h2>
            
            <p className="mb-3"><strong>4.1.</strong> Khi sử dụng Nền Tảng, bạn cam đoan và đồng ý rằng:</p>
            
            <p className="ml-6 mb-2"><strong>4.1.a.</strong> Tất cả thông tin bạn cung cấp là đúng, chính xác và đầy đủ.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.b.</strong> Bạn sẽ bảo mật mật khẩu tài khoản và thông báo ngay cho chúng tôi nếu có sử dụng trái phép.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.c.</strong> Bạn chỉ sử dụng Nền Tảng cho mục đích hợp pháp và cá nhân.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.d.</strong> Bạn sẽ không cố gắng gây gián đoạn, làm tổn hại hoặc truy cập trái phép vào Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.e.</strong> Bạn sẽ không sử dụng Nền Tảng để gửi nội dung trái pháp luật, vi phạm đạo đức hoặc gây hại cho người khác.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.f.</strong> Bạn chỉ tạo một (1) tài khoản trên Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>4.1.g.</strong> Bạn sẽ tuân thủ tất cả các luật hiện hành của Việt Nam khi sử dụng dịch vụ.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">5. MÔ TẢ DỊCH VỤ</h2>
            
            <p className="mb-3"><strong>5.1.</strong> LÒ ĐỒ ĂN là nền tảng đặt hàng thực phẩm trực tuyến kết nối Người Dùng với các Nhà Hàng đối tác. Ovenly cung cấp công nghệ để:</p>
            
            <p className="ml-6 mb-2"><strong>5.1.a.</strong> Hiển thị thực đơn và giá cả từ các Nhà Hàng.</p>
            
            <p className="ml-6 mb-2"><strong>5.1.b.</strong> Xử lý đơn đặt hàng từ Người Dùng đến Nhà Hàng.</p>
            
            <p className="ml-6 mb-2"><strong>5.1.c.</strong> Tạo điều kiện thanh toán trực tuyến.</p>
            
            <p className="ml-6 mb-2"><strong>5.1.d.</strong> Cung cấp thông tin về trạng thái đơn hàng.</p>
            
            <p className="ml-6 mb-2"><strong>5.1.e.</strong> Kết nối với các đơn vị cung cấp dịch vụ vận chuyển bên thứ ba.</p>

            <p className="mt-3"><strong>5.2. QUAN TRỌNG: OVENLY LÀ NỀN TẢNG CÔNG NGHỆ</strong> kết nối khách hàng với các nhà hàng đối tác. OVENLY KHÔNG PHẢI LÀ NHÀ HÀNG, KHÔNG TỰ CHẾ BIẾN THỰC PHẨM, VÀ KHÔNG PHẢI LÀ BÊN BÁN HÀNG TRỰC TIẾP. Ovenly KHÔNG chịu trách nhiệm về chất lượng thực phẩm, độ an toàn thực phẩm, thời gian chế biến, hoặc dịch vụ của Nhà Hàng. Tất cả các vấn đề liên quan đến thực phẩm là trách nhiệm của Nhà Hàng.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">6. TÀI KHOẢN VÀ BẢO MẬT</h2>
            
            <p className="mb-3"><strong>6.1.</strong> Một vài tính năng của Dịch Vụ yêu cầu phải đăng ký Tài Khoản bằng cách lựa chọn tên người sử dụng và mật khẩu đồng thời cung cấp một cách trung thực và chính xác một số thông tin cá nhân nhất định.</p>

            <p className="mb-3"><strong>6.2.</strong> Bạn có thể tạo tài khoản để lưu địa chỉ giao hàng, xem lịch sử đơn hàng, sử dụng mã giảm giá, nhận thông báo về đơn hàng, và lưu phương thức thanh toán.</p>

            <p className="mb-3"><strong>6.3.</strong> Bạn đồng ý:</p>
            
            <p className="ml-6 mb-2"><strong>6.3.a.</strong> Giữ bí mật mật khẩu và chỉ sử dụng Tên Đăng Nhập và mật khẩu khi đăng nhập.</p>
            
            <p className="ml-6 mb-2"><strong>6.3.b.</strong> Đảm bảo bạn sẽ đăng xuất khỏi tài khoản của mình sau mỗi phiên đăng nhập trên Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>6.3.c.</strong> Thông báo ngay lập tức với Ovenly nếu phát hiện bất kỳ việc sử dụng trái phép nào đối với Tài Khoản, Tên Đăng Nhập và/hoặc mật khẩu của bạn.</p>

            <p className="mb-3"><strong>6.4.</strong> Bạn phải chịu trách nhiệm với hoạt động dưới Tên Đăng Nhập và Tài Khoản của mình, bao gồm tổn thất hoặc thiệt hại phát sinh từ việc sử dụng trái phép liên quan đến mật khẩu hoặc từ việc không tuân thủ Điều Khoản này.</p>

            <p className="mb-3"><strong>6.5.</strong> Bạn đồng ý rằng Ovenly có toàn quyền xóa Tài Khoản và Tên Đăng Nhập của Người Sử Dụng ngay lập tức, gỡ bỏ hoặc hủy từ Nền Tảng bất kỳ Nội Dung nào liên quan đến Tài Khoản với bất kỳ lý do nào. Căn cứ để thực hiện các hành động này có thể bao gồm:</p>
            
            <p className="ml-6 mb-2"><strong>6.5.a.</strong> Tài Khoản không hoạt động trong thời gian dài.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.b.</strong> Vi phạm điều khoản hoặc tinh thần của các Điều Khoản Dịch Vụ này.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.c.</strong> Có hành vi bất hợp pháp, lừa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm dụng.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.d.</strong> Có nhiều tài khoản người dùng khác nhau cho mục đích gian lận.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.e.</strong> Lạm dụng mã giảm giá hoặc quyền lợi khuyến mại.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.f.</strong> Có hành vi gây hại tới những Người Sử Dụng khác hoặc các lợi ích kinh tế của Ovenly.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.g.</strong> Sử dụng thông tin giả mạo hoặc không trung thực khi đăng ký Tài Khoản.</p>
            
            <p className="ml-6 mb-2"><strong>6.5.h.</strong> Mua, bán, cho thuê, cho mượn, đăng ký hộ Tài Khoản.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">7. XÓA TÀI KHOẢN</h2>
            
            <p className="mb-3"><strong>7.1.</strong> Người Sử Dụng có thể yêu cầu xóa Tài Khoản bằng cách thông báo bằng văn bản đến Ovenly tại <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a>.</p>

            <p className="mb-3"><strong>7.2.</strong> Tuy nhiên, Người Sử Dụng vẫn phải chịu trách nhiệm và nghĩa vụ đối với bất kỳ giao dịch nào chưa hoàn thành (phát sinh trước hoặc sau khi Tài Khoản bị xóa) hay việc vận chuyển hàng hóa liên quan đến Tài Khoản bị yêu cầu xóa.</p>

            <p className="mb-3"><strong>7.3.</strong> Người Sử Dụng phải liên hệ với Ovenly sau khi đã nhanh chóng và hoàn tất việc thực hiện và hoàn thành các giao dịch chưa hoàn tất. Người Sử Dụng chịu trách nhiệm đối với yêu cầu xóa Tài Khoản của mình.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">8. ĐẶT HÀNG VÀ XÁC NHẬN</h2>
            
            <p className="mb-3"><strong>8.1.</strong> Quy trình đặt hàng:</p>
            
            <p className="ml-6 mb-2"><strong>8.1.a.</strong> Người Dùng chọn món ăn và đặt hàng trên Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>8.1.b.</strong> Nhà Hàng nhận thông báo và xác nhận đơn hàng.</p>
            
            <p className="ml-6 mb-2"><strong>8.1.c.</strong> Nhà Hàng chế biến và chuẩn bị đơn hàng.</p>
            
            <p className="ml-6 mb-2"><strong>8.1.d.</strong> Người Dùng nhận hàng (tại quầy hoặc giao hàng).</p>
            
            <p className="ml-6 mb-2"><strong>8.1.e.</strong> Người Dùng xác nhận "Đã nhận được hàng" hoặc gửi yêu cầu trả hàng/hoàn tiền nếu có vấn đề.</p>

            <p className="mb-3"><strong>8.2.</strong> Đơn hàng chỉ được xem là hợp lệ sau khi Nhà Hàng xác nhận. Nhà Hàng có quyền từ chối đơn hàng trong trường hợp hết hàng, ngoài giờ phục vụ, hoặc lý do hợp lý khác.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">9. GIÁ CẢ VÀ THANH TOÁN</h2>
            
            <p className="mb-3"><strong>9.1.</strong> Tất cả giá cả được hiển thị bằng đồng Việt Nam (VNĐ) và đã bao gồm thuế GTGT.</p>

            <p className="mb-3"><strong>9.2.</strong> Cấu thành giá đơn hàng:</p>
            
            <p className="ml-6 mb-2"><strong>9.2.a. Giá món ăn:</strong> Do Nhà Hàng quy định.</p>
            
            <p className="ml-6 mb-2"><strong>9.2.b. Phí dịch vụ:</strong> Phí Ovenly thu để vận hành Nền Tảng (1-2% giá trị đơn hàng).</p>
            
            <p className="ml-6 mb-2"><strong>9.2.c. Phí giao hàng:</strong> Nếu chọn giao hàng (do Đơn Vị Vận Chuyển quy định).</p>

            <p className="mb-3"><strong>9.3.</strong> Vào từng thời điểm, phương thức thanh toán cho hàng hóa mua trên Nền Tảng có thể được thực hiện bằng một hoặc nhiều phương thức thanh toán như sau:</p>
            
            <p className="ml-6 mb-2"><strong>9.3.a. Thanh Toán Khi Nhận Hàng (COD):</strong> Người Mua có thể trả tiền mặt trực tiếp cho người vận chuyển vào thời điểm nhận hàng.</p>
            
            <p className="ml-6 mb-2"><strong>9.3.b. Chuyển Khoản Ngân Hàng:</strong> Hình thức thanh toán cho phép Người Mua thanh toán bằng dịch vụ ngân hàng trực tuyến (Internet banking).</p>
            
            <p className="ml-6 mb-2"><strong>9.3.c. Ví Điện Tử (MoMo, ZaloPay, VNPay):</strong> Sau khi đã thiết lập thành công tài khoản ví điện tử và tiến hành nạp đủ số dư, Người Mua có thể sử dụng để thanh toán khi mua sắm trên Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>9.3.d. Thẻ Tín Dụng/Ghi Nợ:</strong> Hình thức thanh toán qua thẻ tín dụng/ghi nợ được thực hiện thông qua kênh thanh toán của bên thứ ba.</p>

            <p className="mb-3"><strong>9.4.</strong> Trường hợp Người Mua đồng ý cho Ovenly liên kết hoặc lưu bất kỳ phương thức thanh toán nào vào Tài Khoản của Người Mua, Người Mua theo đó đồng ý cho Ovenly chia sẻ thông tin phương thức thanh toán đó với bất kỳ bộ xử lý thanh toán, cổng thanh toán nhằm mục đích lưu trữ thông tin phương thức thanh toán và xử lý thanh toán.</p>

            <p className="mb-3"><strong>9.5.</strong> Bạn cho phép chúng tôi xác nhận rằng phương thức thanh toán của bạn ở trạng thái hoạt động tốt, bao gồm nhưng không giới hạn bằng cách gửi yêu cầu ủy quyền thanh toán và/hoặc tín dụng và/hoặc ghi nợ có giá trị thấp cho phương thức thanh toán.</p>

            <p className="mb-3"><strong>9.6.</strong> Người Mua chỉ có thể thay đổi phương thức thanh toán trước khi thực hiện thanh toán.</p>

            <p className="mb-3"><strong>9.7.</strong> Ovenly không chịu trách nhiệm cũng như nghĩa vụ nào đối với bất kỳ tổn thất hoặc thiệt hại nào mà Người Mua hoặc Nhà Hàng phải chịu từ việc nhập sai thông tin vận chuyển và/hoặc thông tin thanh toán cho đơn hàng đã đặt.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">10. CHÍNH SÁCH HỦY ĐƠN VÀ HOÀN TIỀN</h2>
            
            <p className="mb-3"><strong>10.1. Người Dùng hủy đơn:</strong></p>
            
            <p className="ml-6 mb-2"><strong>10.1.a.</strong> Trước khi Nhà Hàng xác nhận: Hoàn tiền 100%.</p>
            
            <p className="ml-6 mb-2"><strong>10.1.b.</strong> Sau khi Nhà Hàng xác nhận: Không hoàn tiền (Nhà Hàng đã bắt đầu chế biến).</p>
            
            <p className="ml-6 mb-2"><strong>10.1.c.</strong> Thanh toán trực tuyến: Hoàn tiền trong 5-7 ngày làm việc.</p>

            <p className="mb-3"><strong>10.2. Nhà Hàng hủy đơn:</strong> Nếu Nhà Hàng hủy đơn sau khi xác nhận, Người Dùng được hoàn tiền 100% trong vòng 24 giờ.</p>

            <p className="mb-3"><strong>10.3. Khiếu nại chất lượng:</strong> Nếu có vấn đề về chất lượng thực phẩm, vui lòng liên hệ <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> trong vòng 24 giờ kèm hình ảnh. Chúng tôi sẽ làm việc với Nhà Hàng để giải quyết.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">11. NGHĨA VỤ CỦA NHÀ HÀNG</h2>
            
            <p className="mb-3"><strong>11.1.</strong> Nhà Hàng đăng ký trên Nền Tảng cam kết:</p>
            
            <p className="ml-6 mb-2"><strong>11.1.a.</strong> Có đầy đủ giấy phép kinh doanh và giấy chứng nhận an toàn thực phẩm theo quy định pháp luật Việt Nam.</p>
            
            <p className="ml-6 mb-2"><strong>11.1.b.</strong> Phát hành hóa đơn GTGT hoặc hóa đơn bán hàng cho mỗi đơn hàng theo Luật Thuế và quy định của Tổng cục Thuế.</p>
            
            <p className="ml-6 mb-2"><strong>11.1.c.</strong> Đảm bảo chất lượng và an toàn thực phẩm.</p>
            
            <p className="ml-6 mb-2"><strong>11.1.d.</strong> Chế biến đơn hàng đúng thời gian cam kết.</p>
            
            <p className="ml-6 mb-2"><strong>11.1.e.</strong> Chịu trách nhiệm hoàn toàn về chất lượng món ăn được cung cấp.</p>
            
            <p className="ml-6 mb-2"><strong>11.1.f.</strong> Cung cấp thông tin tài khoản ngân hàng chính xác để nhận thanh toán.</p>

            <p className="mt-3 text-sm text-gray-600"><strong>11.2.</strong> Ovenly có quyền tạm ngưng hoặc chấm dứt hợp tác với Nhà Hàng vi phạm các nghĩa vụ trên.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">12. ĐÁNH GIÁ VÀ NHẬN XÉT</h2>
            
            <p className="mb-3"><strong>12.1.</strong> Người Dùng có thể đánh giá và để lại nhận xét về Nhà Hàng sau khi hoàn thành đơn hàng. Bạn đồng ý:</p>
            
            <p className="ml-6 mb-2"><strong>12.1.a.</strong> Đánh giá phải trung thực, dựa trên trải nghiệm thực tế.</p>
            
            <p className="ml-6 mb-2"><strong>12.1.b.</strong> Không sử dụng ngôn ngữ thô tục, xúc phạm, hoặc phân biệt đối xử.</p>
            
            <p className="ml-6 mb-2"><strong>12.1.c.</strong> Không thực hiện các hành động làm sai lệch hệ thống đánh giá.</p>
            
            <p className="ml-6 mb-2"><strong>12.1.d.</strong> Ovenly có quyền gỡ bỏ đánh giá vi phạm mà không cần thông báo trước.</p>

            <p className="mb-3"><strong>12.2.</strong> Người Dùng hiểu rằng các Nội Dung (bao gồm đánh giá) là hoàn toàn thuộc trách nhiệm của người đã tạo ra Nội Dung đó. Ovenly không chịu trách nhiệm đối với Nội Dung, bao gồm lỗi hoặc thiếu sót liên quan đến Nội Dung.</p>

            <p className="mb-3"><strong>12.3.</strong> Ovenly và các bên được chỉ định của Ovenly có toàn quyền (nhưng không có nghĩa vụ) sàng lọc, từ chối, xóa, dừng, tạm dừng, gỡ bỏ hoặc dời bất kỳ Nội Dung có sẵn trên Nền Tảng.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">13. QUYỀN SỞ HỮU TRÍ TUỆ</h2>
            
            <p className="mb-3"><strong>13.1.</strong> Ovenly trao cho Người Sử Dụng quyền phù hợp để truy cập và sử dụng các Dịch Vụ theo các điều khoản và điều kiện được quy định trong Điều Khoản Dịch Vụ này. Tất cả các Nội Dung, thương hiệu, nhãn hiệu dịch vụ, tên thương mại, biểu tượng và tài sản sở hữu trí tuệ khác ("Tài Sản Sở Hữu Trí Tuệ") hiển thị trên Nền Tảng đều thuộc sở hữu của Ovenly. Không một bên nào truy cập vào Nền Tảng được cấp quyền hoặc cấp phép trực tiếp hoặc gián tiếp để sử dụng hoặc sao chép bất kỳ Tài Sản Sở Hữu Trí Tuệ nào.</p>

            <p className="mb-3"><strong>13.2.</strong> Bằng cách sử dụng hoặc truy cập Dịch Vụ, bạn đồng ý tuân thủ các quy định pháp luật liên quan đến bản quyền, thương hiệu, nhãn hiệu dịch vụ. Bạn đồng ý không được phép:</p>
            
            <p className="ml-6 mb-2"><strong>13.2.a.</strong> Sao chép, phát tán, tái bản, chuyển giao, công bố công khai, thực hiện công khai, sửa đổi, phỏng tác, cho thuê, bán, hoặc tạo ra các sản phẩm phái sinh của bất cứ phần nào thuộc Dịch Vụ, Nền Tảng và Nội Dung.</p>
            
            <p className="ml-6 mb-2"><strong>13.2.b.</strong> Nhân bản hoặc chỉnh sửa bất kỳ phần nào hoặc toàn bộ nội dung của Nền Tảng trên bất kỳ máy chủ hoặc như là một phần của bất kỳ website nào khác mà chưa nhận được sự chấp thuận bằng văn bản của Ovenly.</p>
            
            <p className="ml-6 mb-2"><strong>13.2.c.</strong> Sử dụng bất kỳ robot, chương trình do thám (spider) hay bất kỳ thiết bị tự động hoặc phương thức thủ công nào để theo dõi, thống kê, thu thập hoặc sao chép Nội Dung khi chưa có sự đồng ý trước bằng văn bản của Ovenly.</p>

            <p className="mb-3"><strong>13.3.</strong> Ovenly cho phép kết nối từ website Người Sử Dụng đến Nền Tảng, với điều kiện website của Người Sử Dụng không được hiểu là bất kỳ việc xác nhận hoặc liên quan nào đến Ovenly.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">14. BÁO CÁO VI PHẠM QUYỀN SỞ HỮU TRÍ TUỆ</h2>
            
            <p className="mb-3"><strong>14.1.</strong> Người Sử Dụng là các cá nhân hoặc tổ chức độc lập và họ không có bất kỳ mối liên kết nào với Ovenly. Ovenly cũng không phải là đại lý của Người Sử Dụng và không nắm giữ và/hoặc sở hữu bất kỳ hàng hóa nào được chào bán trên Nền Tảng.</p>

            <p className="mb-3"><strong>14.2.</strong> Nếu bạn là Chủ Sở Hữu Quyền Sở Hữu Trí Tuệ ("Chủ Sở Hữu Quyền SHTT") hoặc là đại diện được ủy quyền Chủ Sở Hữu Quyền SHTT và bạn tin rằng các quyền sở hữu trí tuệ của bạn hoặc của người mà bạn đại diện đang bị xâm phạm, vui lòng liên hệ với Ovenly tại <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a> và cung cấp cho chúng tôi các tài liệu chứng minh cho yêu cầu của bạn. Ovenly sẽ phản hồi khiếu nại của bạn ngay khi có thể.</p>

            <p className="mb-3"><strong>14.3.</strong> Nhà Hàng đồng ý bồi thường và giữ cho Ovenly không bị tổn hại trước bất kỳ và tất cả các khiếu nại liên quan đến bất kỳ khiếu nại, khiếu kiện hoặc hành vi vi phạm quyền sở hữu trí tuệ nào liên quan đến Nội Dung hoặc sản phẩm đăng bán.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">15. BẢO VỆ DỮ LIỆU CÁ NHÂN</h2>
            
            <p className="mb-3"><strong>15.1.</strong> Ovenly coi trọng việc bảo mật thông tin của bạn. Vui lòng tham khảo <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold">Chính Sách Bảo Mật</a> để biết cách thức Ovenly thu thập và sử dụng Dữ Liệu Cá Nhân. Điều Khoản Dịch Vụ này có liên quan mật thiết với Chính Sách Bảo Mật.</p>

            <p className="mb-3"><strong>15.2.</strong> Bằng cách sử dụng Dịch Vụ hoặc cung cấp thông tin trên Nền Tảng, Người Sử Dụng:</p>
            
            <p className="ml-6 mb-2"><strong>15.2.a.</strong> Cho phép Ovenly thu thập, sử dụng, công bố và/hoặc xử lý các Nội Dung, dữ liệu cá nhân của bạn như được quy định trong Chính Sách Bảo Mật.</p>
            
            <p className="ml-6 mb-2"><strong>15.2.b.</strong> Đồng ý và công nhận rằng các thông tin được cung cấp trên Nền Tảng sẽ thuộc sở hữu chung của bạn và Ovenly.</p>
            
            <p className="ml-6 mb-2"><strong>15.2.c.</strong> Sẽ không, dù là trực tiếp hay gián tiếp, tiết lộ các Thông Tin Người Sử Dụng cho bất kỳ bên thứ ba nào.</p>

            <p className="mb-3"><strong>15.3.</strong> Người Sử Dụng chấp thuận và đồng ý rằng Ovenly có thể truy cập, duy trì và tiết lộ thông tin Tài Khoản, Nội Dung trong trường hợp pháp luật có yêu cầu hoặc theo lệnh của tòa án hoặc cơ quan nhà nước có thẩm quyền.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">16. ĐIỀU KHOẢN SỬ DỤNG VÀ HÀNH VI CẤM</h2>
            
            <p className="mb-3"><strong>16.1.</strong> Quyền được phép sử dụng Nền Tảng và Dịch Vụ có hiệu lực cho đến khi bị chấm dứt. Quyền được phép sử dụng sẽ bị chấm dứt theo Điều Khoản Dịch Vụ này hoặc trường hợp Người Sử Dụng vi phạm bất cứ điều khoản hoặc điều kiện nào.</p>

            <p className="mb-3"><strong>16.2.</strong> Người Sử Dụng không được phép:</p>
            
            <p className="ml-6 mb-2"><strong>16.2.a.</strong> Tải lên, đăng, truyền tải hoặc bằng cách khác công khai bất cứ Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối, gây hoang mang, lo lắng, xuyên tạc, phỉ báng, xúc phạm, khiêu dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, gây căm phẫn, hoặc phân biệt chủng tộc, dân tộc hoặc bất kỳ nội dung không đúng đắn nào khác.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.b.</strong> Vi phạm pháp luật, quyền lợi của bên thứ ba.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.c.</strong> Đăng tải, truyền tin, hoặc bằng bất kỳ hình thức nào khác hiển thị bất kỳ Nội Dung nào có sự xuất hiện của người chưa thành niên hoặc sử dụng Dịch Vụ gây tổn hại cho người chưa thành niên dưới bất kỳ hình thức nào.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.d.</strong> Sử dụng Dịch Vụ hoặc đăng tải Nội Dung để mạo danh bất kỳ cá nhân hoặc tổ chức nào, hoặc bằng cách nào khác xuyên tạc cá nhân hoặc tổ chức.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.e.</strong> Giả mạo các tiêu đề hoặc bằng cách khác ngụy tạo các định dạng nhằm che giấu nguồn gốc của bất kỳ Nội Dung nào.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.f.</strong> Gỡ bỏ bất kỳ thông báo độc quyền nào từ Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.g.</strong> Gây ra, chấp nhận hoặc ủy quyền cho việc sửa đổi, cấu thành các sản phẩm phái sinh, hoặc chuyển thể của Dịch Vụ mà không được sự cho phép rõ ràng của Ovenly.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.h.</strong> Sử dụng Dịch Vụ phục vụ lợi ích của bất kỳ bên thứ ba nào hoặc bất kỳ hành vi nào không được chấp nhận theo Điều Khoản Dịch Vụ này.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.i.</strong> Sử dụng Dịch Vụ hoặc đăng tải Nội Dung cho mục đích gian lận, không hợp lý, sai trái, gây hiểu nhầm hoặc gây nhầm lẫn.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.j.</strong> Mở và/hoặc vận hành nhiều tài khoản người dùng khác nhau liên quan đến bất kỳ hành vi nào vi phạm điều khoản hoặc tinh thần của Điều Khoản Dịch Vụ này.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.k.</strong> Truy cập Nền Tảng, mở tài khoản hoặc bằng cách khác truy cập tài khoản người dùng thông qua bất kỳ phần mềm hoặc phần cứng không được chấp thuận hoặc không được cung cấp bởi Ovenly, bao gồm phần mềm giả lập, thiết bị giả lập, phần mềm tự động, phần mềm thay đổi thông tin thiết bị.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.l.</strong> Chỉnh sửa giá của bất kỳ sản phẩm nào hoặc can thiệp vào danh mục hàng hóa của Nhà Hàng khác.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.m.</strong> Thực hiện bất kỳ hành động nào làm sai lệch hệ thống đánh giá hoặc tiếp nhận phản hồi của Ovenly.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.n.</strong> Cố gắng chuyển đổi mã chương trình, đảo ngược kỹ thuật, tháo gỡ hoặc xâm nhập (hack) Dịch Vụ (hoặc bất cứ hợp phần nào theo đó); hoặc phá bỏ hoặc vượt qua bất kỳ công nghệ mã hóa hoặc biện pháp bảo mật nào được Ovenly áp dụng.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.o.</strong> Khai thác hoặc thu thập bất kỳ thông tin nào liên quan đến Tài Khoản của Người Sử Dụng khác, bao gồm bất kỳ thông tin hoạt động hoặc dữ liệu cá nhân nào.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.p.</strong> Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất kỳ Nội Dung nào mà bạn không được cho phép theo bất kỳ luật hoặc quan hệ hợp đồng hoặc tín thác nào.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.q.</strong> Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất kỳ Nội Dung nào dẫn đến trường hợp vi phạm các quyền về sáng chế, thương hiệu, bí quyết kinh doanh, bản quyền hoặc bất cứ đặc quyền nào của bất cứ bên nào.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.r.</strong> Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất kỳ quảng cáo, các tài liệu khuyến mại, "thư quấy rối", "thư rác", "chuỗi ký tự" không được phép hoặc không hợp pháp.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.s.</strong> Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất cứ tài liệu chứa các loại vi-rút, worm, trojan hoặc bất kỳ các mã, tập tin hoặc chương trình máy tính được thiết kế để gây cản trở, điều khiển, gián đoạn, phá hỏng hoặc hạn chế các chức năng.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.t.</strong> Làm gián đoạn các dòng tương tác thông thường, hoặc bằng cách khác thực hiện thao tác gây ảnh hưởng tiêu cực đến khả năng tham gia giao dịch thực của những Người Sử Dụng khác.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.u.</strong> Can thiệp, điều khiển hoặc làm gián đoạn Dịch Vụ hoặc máy chủ hoặc hệ thống được liên kết với Dịch Vụ, hoặc không tuân thủ bất kỳ các yêu cầu, quy trình, chính sách và luật lệ đối với các hệ thống được liên kết với Nền Tảng.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.v.</strong> Thực hiện bất kỳ hành động hoặc hành vi nào có thể trực tiếp hoặc gián tiếp phá hủy, vô hiệu hóa, làm quá tải, hoặc làm suy yếu Dịch Vụ hoặc máy chủ hoặc hệ thống liên kết với Dịch Vụ.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.w.</strong> Sử dụng Dịch Vụ để vi phạm pháp luật, quy chế, quy tắc, chỉ thị, hướng dẫn, chính sách áp dụng liên quan đến phòng chống rửa tiền hoặc phòng chống khủng bố.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.x.</strong> Sử dụng Dịch Vụ để xâm hại tới quyền riêng tư của người khác hoặc để "lén theo dõi" hoặc bằng cách khác quấy rối người khác.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.y.</strong> Xâm phạm các quyền của Ovenly, bao gồm bất kỳ quyền sở hữu trí tuệ và gây nhầm lẫn cho các quyền đó.</p>
            
            <p className="ml-6 mb-2"><strong>16.2.z.</strong> Sử dụng Dịch vụ để thu thập hoặc lưu trữ dữ liệu cá nhân của Người Sử Dụng khác liên quan đến các hành vi và hoạt động bị cấm như đề cập ở trên.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">17. VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</h2>
            
            <p className="mb-3"><strong>17.1.</strong> Việc vi phạm Điều Khoản Dịch Vụ này có thể dẫn tới một số hành động, bao gồm bất kỳ hoặc tất cả các hành động sau:</p>
            
            <p className="ml-6 mb-2"><strong>17.1.a.</strong> Xóa danh mục sản phẩm.</p>
            
            <p className="ml-6 mb-2"><strong>17.1.b.</strong> Giới hạn quyền sử dụng Tài Khoản.</p>
            
            <p className="ml-6 mb-2"><strong>17.1.c.</strong> Đình chỉ và chấm dứt Tài Khoản.</p>
            
            <p className="ml-6 mb-2"><strong>17.1.d.</strong> Thu hồi tiền/tài sản có được do hành vi gian lận, và các chi phí có liên quan như chi phí vận chuyển của đơn hàng.</p>
            
            <p className="ml-6 mb-2"><strong>17.1.e.</strong> Cáo buộc hình sự.</p>
            
            <p className="ml-6 mb-2"><strong>17.1.f.</strong> Áp dụng biện pháp dân sự, bao gồm khiếu nại bồi thường thiệt hại và/hoặc áp dụng biện pháp khẩn cấp tạm thời.</p>

            <p className="mb-3"><strong>17.2.</strong> Nếu bạn phát hiện Người Sử Dụng trên Nền Tảng có hành vi vi phạm Điều Khoản Dịch Vụ, vui lòng liên hệ Ovenly tại <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a>.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">18. CHÍNH SÁCH ĐẢM BẢO VÀ TÀI KHOẢN ĐẢM BẢO</h2>
            
            <p className="mb-3"><strong>18.1.</strong> Chính Sách Đảm Bảo của Ovenly là dịch vụ cung cấp bởi Ovenly nhằm bảo đảm cho các giao dịch mua bán hàng hóa được thực hiện trên Nền Tảng. Để bảo đảm các rủi ro về trách nhiệm pháp lý, Khoản Tiền Thanh Toán từ Người Mua sẽ được lưu giữ bởi Ovenly ("Tài Khoản Đảm Bảo"). Nhà Hàng sẽ không nhận được lãi hoặc bất kỳ khoản phát sinh nào từ khoản tiền trong Tài Khoản Đảm Bảo.</p>

            <p className="mb-3"><strong>18.2.</strong> Sau khi Người Mua thanh toán đơn hàng, Khoản Tiền Thanh Toán từ Người Mua sẽ được lưu giữ trong Tài Khoản Đảm Bảo cho đến khi:</p>
            
            <p className="ml-6 mb-2"><strong>18.2.a.</strong> Trong trường hợp Người Mua gửi xác nhận "Đã nhận được hàng", Ovenly sẽ chuyển Tiền Thanh Toán từ Tài Khoản Đảm Bảo sang Số Dư Tài Khoản của Nhà Hàng.</p>
            
            <p className="ml-6 mb-2"><strong>18.2.b.</strong> Trong trường hợp Thời Gian Đảm Bảo (thường là 4 ngày kể từ khi giao hàng thành công) đã hết hạn, Ovenly sẽ chuyển Khoản Tiền Thanh Toán từ Tài Khoản Đảm Bảo sang Số Dư Tài Khoản của Nhà Hàng.</p>
            
            <p className="ml-6 mb-2"><strong>18.2.c.</strong> Trường hợp Ovenly xác định được rằng yêu cầu trả hàng/hoàn tiền của Người Mua được chấp thuận, Ovenly sẽ hoàn tiền cho Người Mua và chuyển phần còn lại (nếu có) vào Số Dư Tài Khoản của Nhà Hàng.</p>

            <p className="mb-3"><strong>18.3.</strong> Khoản tiền Người Mua thanh toán đơn hàng cho Nhà Hàng sẽ được ghi nhận vào Số Dư Tài Khoản như sau:</p>
            
            <p className="ml-6 mb-2"><strong>18.3.a.</strong> Đối với trường hợp Người Mua nhấn "Đã nhận được hàng": Ovenly sẽ thanh toán ngay sau khi Người Mua xác nhận.</p>
            
            <p className="ml-6 mb-2"><strong>18.3.b.</strong> Đối với trường hợp Người Mua không nhấn "Đã nhận được hàng": Ovenly sẽ thanh toán vào ngày thứ 4 kể từ khi đơn hàng được cập nhật trạng thái Giao Hàng Thành Công.</p>
            
            <p className="ml-6 mb-2"><strong>18.3.c.</strong> Đối với trường hợp có yêu cầu "Trả hàng/Hoàn tiền": Khoản còn lại (nếu có) sẽ được thanh toán cho Nhà Hàng sau khi yêu cầu được xử lý hoàn tất.</p>

            <p className="mb-3"><strong>18.4.</strong> Trong trường hợp Nhà Hàng không thể liên lạc được và sau thời hạn mười hai (12) tháng kể từ ngày Khoản Tiền Thanh Toán đến hạn nhưng chưa được trả cho Nhà Hàng, Ovenly sẽ xử lý Khoản Tiền Thanh Toán này theo quy định pháp luật.</p>

            <p className="mb-3"><strong>18.5.</strong> Nhà Hàng/Người Mua phải là bên thụ hưởng Tài Khoản và tự thực hiện giao dịch trên Nền Tảng. Ovenly có quyền yêu cầu Nhà Hàng hoặc Người Mua cung cấp các dữ liệu cá nhân như ảnh chân dung, thông tin tài khoản ngân hàng và/hoặc bất cứ tài liệu cần thiết nào khác để sử dụng vào mục đích xác nhận thông tin.</p>

            <p className="mb-3"><strong>18.6.</strong> Chính Sách Đảm Bảo không nhằm mục đích cũng như không được xây dựng nhằm hỗ trợ Nhà Hàng hoặc Người Mua tuân thủ các trách nhiệm pháp lý của chính họ. Trong mọi trường hợp, Chính Sách Đảm Bảo không cấu thành việc bảo hành sản phẩm.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">19. SỐ DƯ TÀI KHOẢN NHÀ HÀNG</h2>
            
            <p className="mb-3"><strong>19.1.</strong> Số Dư Tài Khoản là một tính năng để hỗ trợ việc ghi nhận tiền bán hàng hoặc giá trị tiền được hoàn trả cho các giao dịch trả hàng/hoàn tiền. Tổng giá trị ghi nhận này, trừ đi các khoản đã được thanh toán, sẽ được thể hiện ở mục Số Dư Tài Khoản.</p>

            <p className="mb-3"><strong>19.2.</strong> Nhà Hàng có thể yêu cầu được nhận toàn bộ giá trị được ghi nhận tại Số Dư Tài Khoản bằng yêu cầu chuyển tiền đến tài khoản ngân hàng có thông tin được cung cấp một cách chính xác và trung thực ("Tài Khoản Nhận Tiền") thông qua thao tác gửi yêu cầu chuyển tiền ("Yêu Cầu Thanh Toán"). Ovenly chỉ thực hiện việc chuyển khoản vào ngày làm việc và việc chuyển khoản đó có thể cần tối đa 04 (bốn) ngày làm việc để Tài Khoản Nhận Tiền được ghi có.</p>

            <p className="mb-3"><strong>19.3.</strong> Không ảnh hưởng đến các điều khoản khác, Ovenly có quyền giữ/tạm giữ hoặc tạm hoãn ghi nhận tiền bán hàng hoặc giá trị tiền được hoàn trả trong trường hợp Ovenly có chứng cứ về hành vi gian lận hoặc nghi ngờ có hành vi gian lận, hoặc hành vi vi phạm pháp luật trên Nền Tảng.</p>

            <p className="mb-3"><strong>19.4.</strong> Sau khi đã gửi Yêu Cầu Thanh Toán, Nhà Hàng không thể thay đổi hoặc hủy bỏ yêu cầu này.</p>

            <p className="mb-3"><strong>19.5.</strong> Nếu xảy ra lỗi trong quá trình xử lý bất kỳ giao dịch nào, Nhà Hàng đồng ý ủy quyền cho Ovenly chỉnh sửa lỗi đó và thực hiện ghi có hoặc ghi nợ trong Tài Khoản Nhận Tiền, với điều kiện là việc chỉnh sửa này được thực hiện theo quy định pháp luật có liên quan.</p>

            <p className="mb-3"><strong>19.6.</strong> Nhà Hàng ủy quyền cho Ovenly được thực hiện các bút toán ghi có hoặc ghi nợ liên quan đến giá trị được ghi nhận tại Số Dư Tài Khoản, cho mục đích:</p>
            
            <p className="ml-6 mb-2"><strong>19.6.a.</strong> Điều chỉnh các sai sót trong việc thực hiện bất kỳ giao dịch nào.</p>
            
            <p className="ml-6 mb-2"><strong>19.6.b.</strong> Trường hợp Ovenly cho rằng Nhà Hàng thực hiện hành vi và/hoặc giao dịch gian lận hoặc đáng ngờ.</p>
            
            <p className="ml-6 mb-2"><strong>19.6.c.</strong> Liên quan đến bất kỳ tổn thất, thiệt hại hoặc các khoản không chính xác nào.</p>
            
            <p className="ml-6 mb-2"><strong>19.6.d.</strong> Liên quan đến bất kỳ loại phí chưa được thanh toán nào.</p>
            
            <p className="ml-6 mb-2"><strong>19.6.e.</strong> Liên quan đến việc giải quyết bất kỳ tranh chấp giao dịch nào.</p>
            
            <p className="ml-6 mb-2"><strong>19.6.f.</strong> Liên quan đến việc xử lý các khoản thanh toán còn tồn đọng (hoặc các nghĩa vụ khác) của Nhà Hàng đối với Ovenly.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">20. VẬN CHUYỂN</h2>
            
            <p className="mb-3"><strong>20.1.</strong> Ovenly hợp tác với các đơn vị cung cấp dịch vụ vận chuyển bên thứ ba ("Đơn Vị Vận Chuyển") để thực hiện dịch vụ giao hàng. Ovenly đóng vai trò như một bên trung gian kết nối Nhà Hàng và Người Mua với Đơn Vị Vận Chuyển. Việc vận chuyển thực tế sẽ được thực hiện bởi Đơn Vị Vận Chuyển, không phải do Ovenly hoặc Nhà Hàng trực tiếp thực hiện.</p>

            <p className="mb-3"><strong>20.2.</strong> Nhà Hàng phải luôn nỗ lực để đảm bảo đơn hàng được chuẩn bị và sẵn sàng giao cho Đơn Vị Vận Chuyển đúng hẹn trong Thời Gian Đảm Bảo.</p>

            <p className="mb-3"><strong>20.3.</strong> Người Sử Dụng hiểu rằng Đơn Vị Vận Chuyển chịu rủi ro liên quan đến việc vận chuyển hàng hóa trong quá trình giao hàng. Trong trường hợp hàng hóa được mua bị hư hỏng, thất lạc hoặc không chuyển phát được trong quá trình vận chuyển, Người Sử Dụng thừa nhận và đồng ý rằng Ovenly sẽ không chịu trách nhiệm đối với bất kỳ tổn thất, chi phí, phí tổn hoặc bất kỳ khoản phí nào phát sinh từ sự cố đó.</p>

            <p className="mb-3"><strong>20.4.</strong> Ovenly chịu trách nhiệm hỗ trợ các báo cáo/khiếu nại từ Người Mua nếu Người Mua không nhận được các sản phẩm đã mua trong thời gian dự kiến. Ovenly sẽ chuyển các thông báo của Người Mua sang cho Nhà Hàng và/hoặc Đơn Vị Vận Chuyển để đưa ra giải pháp tốt nhất.</p>

            <p className="mb-3"><strong>20.5.</strong> Để tránh hiểu lầm, trách nhiệm của Ovenly chỉ giới hạn ở việc hỗ trợ thực hiện các báo cáo/khiếu nại của Người Mua đến Nhà Hàng và/hoặc Đơn Vị Vận Chuyển có liên quan. Mỗi Người Mua và Nhà Hàng hiểu rõ và đồng ý rằng Ovenly sẽ không chịu trách nhiệm cho các thiệt hại, chi phí, phí tổn phát sinh từ việc vận chuyển các sản phẩm đã mua.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">21. GIỚI HẠN TRÁCH NHIỆM</h2>
            
            <p className="mb-3"><strong>21.1. Ovenly KHÔNG chịu trách nhiệm về:</strong></p>
            
            <p className="ml-6 mb-2"><strong>21.1.a.</strong> Chất lượng, độ an toàn, hoặc độ tươi ngon của thực phẩm do Nhà Hàng cung cấp.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.b.</strong> Hành vi, dịch vụ, hoặc thiếu sót của Nhà Hàng.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.c.</strong> Ngộ độc thực phẩm hoặc vấn đề sức khỏe liên quan đến thực phẩm.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.d.</strong> Thời gian chế biến hoặc giao hàng chậm do Nhà Hàng hoặc Đơn Vị Vận Chuyển.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.e.</strong> Tranh chấp giữa Người Dùng và Nhà Hàng về chất lượng món ăn.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.f.</strong> Gián đoạn dịch vụ do sự cố kỹ thuật, bảo trì, hoặc yếu tố bất khả kháng.</p>
            
            <p className="ml-6 mb-2"><strong>21.1.g.</strong> Nội Dung, bao gồm lỗi hoặc thiếu sót liên quan đến Nội Dung, hoặc tổn thất hoặc thiệt hại xuất phát từ việc sử dụng Nội Dung.</p>

            <p className="ml-6 mb-2"><strong>21.1.h.</strong> Hành vi, dịch vụ, hoặc thiếu sót của Đơn Vị Vận Chuyển bên thứ ba.</p>

            <p className="mt-3"><strong>21.2.</strong> Trách nhiệm tối đa của Ovenly không vượt quá giá trị đơn hàng bị ảnh hưởng.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">22. BỒI THƯỜNG</h2>
            
            <p className="mb-3"><strong>22.1.</strong> Bạn đồng ý bồi thường và giữ cho Ovenly, các giám đốc, nhân viên, và đối tác của Ovenly không bị tổn hại khỏi mọi khiếu nại, tổn thất, thiệt hại, chi phí (bao gồm phí luật sư) phát sinh từ:</p>
            
            <p className="ml-6 mb-2"><strong>22.1.a.</strong> Việc bạn vi phạm Điều Khoản Dịch Vụ này.</p>
            
            <p className="ml-6 mb-2"><strong>22.1.b.</strong> Việc bạn vi phạm pháp luật Việt Nam.</p>
            
            <p className="ml-6 mb-2"><strong>22.1.c.</strong> Việc bạn vi phạm quyền của bên thứ ba.</p>
            
            <p className="ml-6 mb-2"><strong>22.1.d.</strong> Việc bạn sử dụng Nền Tảng sai mục đích hoặc gây hại.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">23. GIẢI QUYẾT TRANH CHẤP</h2>
            
            <p className="mb-3"><strong>23.1.</strong> Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến Điều Khoản này sẽ được giải quyết theo quy trình sau:</p>
            
            <p className="ml-6 mb-2"><strong>23.1.a.</strong> Thương lượng trực tiếp giữa các bên trong vòng 30 ngày.</p>
            
            <p className="ml-6 mb-2"><strong>23.1.b.</strong> Nếu không thỏa thuận được, tranh chấp sẽ được giải quyết tại Trung tâm Trọng tài Quốc tế Việt Nam (VIAC).</p>
            
            <p className="ml-6 mb-2"><strong>23.1.c.</strong> Luật điều chỉnh: Pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.</p>
            
            <p className="ml-6 mb-2"><strong>23.1.d.</strong> Ngôn ngữ trọng tài: Tiếng Việt.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">24. THAY ĐỔI ĐIỀU KHOẢN</h2>
            
            <p className="mb-3"><strong>24.1.</strong> Ovenly có quyền sửa đổi Điều Khoản Dịch Vụ này bất kỳ lúc nào. Các thay đổi sẽ được thông báo qua Nền Tảng và/hoặc email ít nhất 5 ngày trước khi có hiệu lực.</p>

            <p className="mb-3"><strong>24.2.</strong> Việc bạn tiếp tục sử dụng Nền Tảng sau khi thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận các điều khoản mới.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">25. ĐIỀU KHOẢN CHUNG</h2>
            
            <p className="mb-3"><strong>25.1.</strong> Nếu bất kỳ điều khoản nào trong văn bản này bị coi là không hợp lệ hoặc không thể thi hành, các điều khoản còn lại vẫn có hiệu lực đầy đủ.</p>

            <p className="mb-3"><strong>25.2.</strong> Ovenly có quyền chuyển nhượng quyền và nghĩa vụ theo Điều Khoản này cho bên thứ ba mà không cần sự đồng ý của bạn.</p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">26. THÔNG TIN LIÊN HỆ</h2>
            
            <p className="mb-3"><strong>26.1.</strong> Nếu bạn có câu hỏi về Điều Khoản Dịch Vụ này, vui lòng liên hệ:</p>

            <p className="ml-6"><strong>Ovenly</strong><br/>Email: <a href="mailto:hello@ovenly.io" className="text-primary underline font-semibold">hello@ovenly.io</a><br/>Website: <a href="https://www.lodoan.vn" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.lodoan.vn</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}