import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Về Chúng Tôi | LÒ ĐỒ ĂN',
  description: 'LÒ ĐỒ ĂN là nền tảng đặt đồ ăn trực tuyến kết nối khách hàng với các địa điểm ăn uống tại Việt Nam. Giao hàng nhanh, thanh toán tiện lợi.',
  alternates: { canonical: 'https://www.lodoan.vn/about' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}