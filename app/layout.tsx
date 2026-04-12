import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN — Đặt Đồ Ăn Trực Tuyến',
  description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}