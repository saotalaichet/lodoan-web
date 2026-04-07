import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN — Đặt Đồ Ăn Trực Tuyến',
  description: 'Đặt đồ ăn trực tuyến từ các nhà hàng tại Việt Nam',
  icons: {
    icon: 'https://i.postimg.cc/wj17FHhc/Ovenly-logo-1-(3).png',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}