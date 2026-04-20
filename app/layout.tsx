import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isOvenly = host.includes('ovenly.io');
  const lodoanVerification = 'fj1muVSdheopigTSuzIhmQ26HUK7mBor7JTEJ2rBD6Q';
  const canonical = isOvenly ? 'https://www.ovenly.io' : 'https://www.lodoan.vn';
  return {
    metadataBase: new URL(canonical),
    title: isOvenly ? 'Ovenly | Food Ordering SaaS for Vietnam' : 'LÒ ĐỒ ĂN | Khám phá địa điểm ăn uống | Đặt và giao đồ ăn trực tuyến tại Việt Nam',
    description: isOvenly ? 'Ovenly helps restaurants in Vietnam accept online orders with ease.' : 'Đặt đồ ăn online từ các địa điểm ăn uống tại Việt Nam. Mang về hoặc giao hàng tận nơi. Nhanh chóng, tiện lợi!',
    alternates: { canonical },
    verification: { google: isOvenly ? undefined : lodoanVerification },
    icons: {
      icon: isOvenly ? '/favicon.ico' : '/lodoan-favicon.ico',
      apple: isOvenly ? '/ovenly-apple.jpg' : '/lodoan-apple.jpg',
    },
  };
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LÒ ĐỒ ĂN',
  alternateName: 'Lo Do An',
  url: 'https://www.lodoan.vn',
  logo: 'https://www.lodoan.vn/lodoan-og.jpg',
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