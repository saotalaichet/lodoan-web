import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
  description: 'Đặt đồ ăn online từ các địa điểm ăn uống tại Việt Nam. Mang về hoặc giao hàng tận nơi. Nhanh chóng, tiện lợi!',
  icons: {
    icon: '/lodoan-favicon.ico',
    apple: '/lodoan-apple.jpg',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LÒ ĐỒ ĂN',
  alternateName: 'Lo Do An',
  url: 'https://www.lodoan.vn',
  logo: 'https://www.lodoan.vn/lodoan-favicon.ico',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LÒ ĐỒ ĂN',
  url: 'https://www.lodoan.vn',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.lodoan.vn/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}