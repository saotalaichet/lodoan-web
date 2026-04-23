import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Điều Khoản Dịch Vụ | LÒ ĐỒ ĂN',
  description: 'Điều khoản sử dụng dịch vụ đặt đồ ăn trực tuyến LÒ ĐỒ ĂN. Quy định về đặt hàng, thanh toán và giao hàng.',
  alternates: { canonical: 'https://www.ovenly.io/terms' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}