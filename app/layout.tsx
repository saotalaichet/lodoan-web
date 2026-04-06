import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN — Đặt món trực tuyến',
  description: 'Khám phá và đặt món từ các nhà hàng tốt nhất tại Việt Nam',
  keywords: 'đặt món, nhà hàng, giao đồ ăn, Việt Nam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}