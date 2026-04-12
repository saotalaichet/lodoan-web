import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN — Đặt Đồ Ăn Trực Tuyến',
  description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}