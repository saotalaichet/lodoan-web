import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Ovenly — Công nghệ nhà hàng Việt Nam',
  description: 'Ovenly giúp nhà hàng nhận đơn trực tuyến và tiếp cận khách hàng mới.',
  icons: {
    icon: '/ovenly-apple.jpg',
    apple: '/ovenly-apple.jpg',
  },
};
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}