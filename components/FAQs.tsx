'use client';

import { useState } from 'react';

const PRIMARY = '#9B1C1C';
const BORDER = '#F0E8E0';

interface Props {
  lang: 'vi' | 'en';
}

const FAQS = {
  vi: {
    title: 'Câu hỏi thường gặp',
    items: [
      {
        q: 'Ovenly có hoạt động ngoài TP. Hồ Chí Minh không?',
        a: 'Hiện tại Ovenly đang tập trung phát triển tại TP. Hồ Chí Minh để đảm bảo chất lượng dịch vụ và hỗ trợ tốt nhất cho từng đối tác. Chúng tôi có kế hoạch mở rộng sang Hà Nội, Đà Nẵng và các tỉnh thành khác trong thời gian tới. Nếu bạn đang ở khu vực ngoài TP. Hồ Chí Minh và muốn được thông báo khi Ovenly có mặt tại địa phương của bạn, vui lòng đăng ký để chúng tôi liên hệ ngay khi sẵn sàng.',
      },
      {
        q: 'Ovenly có dịch vụ giao hàng không?',
        a: 'Có. Ovenly hỗ trợ cả hai hình thức là khách đến lấy tại quán và giao tận nơi. Đối với đơn giao hàng, chúng tôi hợp tác với đối tác logistic để giao trong phạm vi 5km tính từ nhà hàng. Nhà hàng không cần lo về việc tự tổ chức đội ngũ giao hàng vì toàn bộ quá trình điều phối tài xế và giao đơn đều được Ovenly và đối tác logistic xử lý tự động.',
      },
      {
        q: 'Nhà hàng của tôi có trang đặt hàng riêng với thương hiệu của mình không?',
        a: 'Có. Mỗi nhà hàng đối tác đều nhận được trang đặt hàng riêng được thiết kế theo logo, màu sắc, và hình ảnh thương hiệu của mình. Trang này hoạt động như một website chính thức của nhà hàng, cho phép khách đặt món trực tiếp mà không cần qua sàn LÒ ĐỒ ĂN. Bạn có thể chia sẻ link trang riêng qua Facebook, Zalo, Instagram, TikTok, hoặc in lên menu, danh thiếp, bảng hiệu để khách quét mã QR đặt món. Đây là kênh bán hàng riêng giúp nhà hàng xây dựng thương hiệu và giữ chân khách hàng quen.',
      },
      {
        q: 'Tôi có thể sử dụng Ovenly cùng với các ứng dụng giao đồ ăn khác không?',
        a: 'Hoàn toàn được. Ovenly không yêu cầu bạn rời khỏi các ứng dụng giao đồ ăn bên thứ ba. Nhiều nhà hàng dùng Ovenly song song với các nền tảng khác để giảm phụ thuộc vào một kênh duy nhất và tối ưu hoá doanh thu. Phần lớn đối tác sử dụng Ovenly cho các đơn hàng có lợi nhuận cao hơn như đơn từ khách quen, đơn lớn, hoặc đơn cho công ty, trong khi vẫn giữ các nền tảng khác cho khách vãng lai.',
      },
      {
        q: 'Mất bao lâu để thiết lập?',
        a: 'Quá trình thiết lập thường mất từ 3 đến 7 ngày làm việc kể từ khi bạn đăng ký. Đội ngũ Ovenly sẽ hỗ trợ trực tiếp tại quán hoặc trực tuyến để nhập menu và hình ảnh, thiết lập trang đặt hàng riêng, kết nối tài khoản ngân hàng, cài ứng dụng Ovenly Partner trên thiết bị, và đào tạo nhân viên trong 30 đến 60 phút. Sau khi hoàn tất, bạn có thể nhận đơn ngay lập tức. Không cần kỹ năng kỹ thuật vì chúng tôi xử lý toàn bộ phần cài đặt cho bạn.',
      },
      {
        q: 'Nếu có vấn đề với đơn hàng thì sao?',
        a: 'Đội hỗ trợ Ovenly hoạt động 24/7 qua điện thoại và chat bao gồm cả ngày lễ Tết. Khi có vấn đề như đơn bị hủy, khách phàn nàn, hoặc lỗi thanh toán, chúng tôi xử lý trực tiếp với khách hàng và bảo vệ doanh thu của bạn. Đối với trường hợp khách bom hàng (đặt rồi không nhận), Ovenly cung cấp mức bảo hiểm giới hạn theo tháng để giảm thiểu thiệt hại cho nhà hàng. Bạn không bao giờ phải đối mặt với khách hàng khó tính một mình.',
      },
      {
        q: 'Tôi có thể hủy bất cứ lúc nào không?',
        a: 'Ovenly không tính phí phạt hủy hợp đồng. Tuy nhiên, để chính thức kết thúc hợp đồng, bạn cần thông báo trước 30 ngày để chúng tôi hoàn tất các thủ tục cần thiết và bàn giao dữ liệu. Sau khi hủy, bạn vẫn có quyền truy cập dữ liệu đơn hàng và báo cáo doanh thu trong 90 ngày để tải xuống. Chúng tôi tin rằng nhà hàng nên ở lại với Ovenly vì giá trị thực sự, không phải vì hợp đồng ràng buộc.',
      },
      {
        q: 'Tôi cần thiết bị gì để bắt đầu?',
        a: 'Bạn chỉ cần một điện thoại hoặc máy tính bảng (Android hoặc iOS) để cài ứng dụng Ovenly Partner để nhận đơn hàng và quản lý menu. Đối với máy in hóa đơn, Ovenly hỗ trợ phần lớn các loại máy in nhiệt Bluetooth theo chuẩn ESC/POS có sẵn trên thị trường. Hiện tại chúng tôi chưa hỗ trợ máy in qua Wi-Fi. Bạn không cần mua thiết bị POS đắt tiền hay hệ thống chuyên dụng nào cả vì Ovenly hoạt động trên thiết bị bạn đã có sẵn để giảm chi phí đầu tư ban đầu.',
      },
    ],
  },
  en: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is Ovenly available outside Ho Chi Minh City?',
        a: 'Ovenly is currently focused on Ho Chi Minh City to ensure the best service quality and support for every partner. We have plans to expand to Hanoi, Da Nang, and other cities soon. If you are located outside Ho Chi Minh City and want to be notified when Ovenly arrives in your area, please register and we will reach out as soon as we are ready.',
      },
      {
        q: 'Does Ovenly offer delivery?',
        a: 'Yes. Ovenly supports both pickup and delivery options. For delivery orders, we work with our logistics partner to fulfill orders within a 5km radius from the restaurant. Restaurants do not need to worry about organizing their own delivery team because the entire process of driver dispatch and order fulfillment is handled automatically by Ovenly and our logistics partner.',
      },
      {
        q: 'Will my restaurant have its own branded ordering page?',
        a: 'Yes. Every partner restaurant receives a dedicated ordering page designed with your own logo, colors, and brand imagery. This page functions as your restaurant\'s official ordering website, allowing customers to order directly without going through the LÒ ĐỒ ĂN marketplace. You can share the link to your branded page via Facebook, Zalo, Instagram, TikTok, or print it on menus, business cards, and signage with a QR code for customers to scan and order. This is a dedicated sales channel that helps your restaurant build brand identity and retain regular customers.',
      },
      {
        q: 'Can I use Ovenly alongside other third party delivery apps?',
        a: 'Absolutely. Ovenly does not require you to leave any third party delivery apps. Many restaurants use Ovenly alongside other platforms to reduce dependency on any single channel and maximize revenue. Most partners use Ovenly for higher margin orders such as repeat customers, large orders, or corporate orders, while keeping other platforms for walk in traffic.',
      },
      {
        q: 'How long does it take to set up?',
        a: 'Setup typically takes 3 to 7 business days from signup. The Ovenly team supports you directly at your restaurant or remotely to upload your menu and photos, set up your dedicated ordering page, connect your bank account, install the Ovenly Partner app on your device, and train your staff in 30 to 60 minutes. Once complete, you can start receiving orders immediately. No technical skills required as we handle the entire setup for you.',
      },
      {
        q: 'What happens if there\'s a problem with an order?',
        a: 'Ovenly\'s support team is available 24/7 by phone and chat including holidays and Tết. When issues arise such as cancellations, customer complaints, or payment errors, we handle them directly with the customer and protect your revenue. For order abandonment cases (customers placing orders but not accepting delivery), Ovenly provides limited monthly coverage to minimize losses for the restaurant. You never have to face difficult customers alone.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Ovenly does not charge any cancellation fees. However, to officially terminate the contract, you must provide 30 days notice so we can complete the necessary procedures and hand over your data. After cancellation, you retain access to your order data and revenue reports for 90 days to download. We believe restaurants should stay with Ovenly because of real value, not because of binding contracts.',
      },
      {
        q: 'What equipment do I need to start?',
        a: 'You only need a phone or tablet (Android or iOS) to install the Ovenly Partner app for receiving orders and managing your menu. For receipt printing, Ovenly supports the majority of Bluetooth thermal printers using the ESC/POS standard available on the market. We currently do not support Wi-Fi printers. You don\'t need to buy expensive POS hardware or any specialized systems because Ovenly works on devices you already own to reduce upfront investment costs.',
      },
    ],
  },
};

export default function FAQs({ lang }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = FAQS[lang];

  return (
    <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, padding: '80px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 48 }}>
          {t.title}
        </h2>
        {t.items.map((item, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 20, marginBottom: 20 }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111', margin: 0, paddingRight: 16 }}>{item.q}</h3>
              <span style={{ fontSize: 24, color: PRIMARY, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
            </button>
            {openFaq === i && (
              <p style={{ fontSize: 15, color: '#666', marginTop: 16, lineHeight: 1.7, animation: 'fadeUp 0.3s ease' }}>{item.a}</p>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}