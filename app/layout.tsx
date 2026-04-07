import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
  description: 'Khám phá và đặt món từ các nhà hàng tốt nhất tại Việt Nam. Giao hàng nhanh chóng, thực đơn phong phú.',
  keywords: 'đặt món, nhà hàng, giao đồ ăn, Việt Nam, food delivery',
  openGraph: {
    title: 'LÒ ĐỒ ĂN',
    description: 'Khám phá ẩm thực Việt Nam',
    siteName: 'LÒ ĐỒ ĂN by Ovenly',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}