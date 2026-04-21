import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { GoogleAnalytics } from '@next/third-parties/google';
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
    keywords: isOvenly
      ? ['food ordering saas', 'restaurant ordering system vietnam', 'ovenly', 'online ordering vietnam', 'f&b saas vietnam']
      : ['đặt đồ ăn online', 'giao đồ ăn', 'mang về', 'nhà hàng gần đây', 'trà sữa', 'cà phê', 'đặt món online', 'lò đồ ăn', 'lodoan', 'ẩm thực việt nam'],
    alternates: { canonical },
    verification: { google: isOvenly ? 'RUqDDflXwzoNSVLXNhAgLhpyk5jUwRMGUm9aesgmwDU' : lodoanVerification },
    applicationName: isOvenly ? 'Ovenly' : 'LÒ ĐỒ ĂN',
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
  '@id': 'https://www.lodoan.vn/#website',
  name: 'LÒ ĐỒ ĂN',
  alternateName: ['Lò Đồ Ăn', 'LoDoAn', 'lodoan.vn'],
  url: 'https://www.lodoan.vn',
  inLanguage: 'vi-VN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.lodoan.vn/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const ovelyOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.ovenly.io/#organization',
  name: 'Ovenly',
  url: 'https://www.ovenly.io',
  logo: 'https://www.ovenly.io/ovenly-og.png',
  email: 'hello@ovenly.io',
  telephone: '+84938462654',
  description: 'Ovenly là nền tảng SaaS giúp quán ăn, nhà hàng và cơ sở F&B tại Việt Nam nhận đơn hàng online trực tiếp.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thành phố Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: { '@type': 'Country', name: 'Vietnam' },
  sameAs: ['https://www.lodoan.vn'],
};

const ovelyWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.ovenly.io/#website',
  name: 'Ovenly',
  alternateName: ['Ovenly Vietnam', 'Ovenly F&B'],
  url: 'https://www.ovenly.io',
  inLanguage: ['vi-VN', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.ovenly.io/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const isOvenly = host.includes('ovenly.io');

  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {!isOvenly && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
          </>
        )}
        {isOvenly && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ovelyOrganizationSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ovelyWebsiteSchema) }}
            />
          </>
        )}
        {children}
      </body>
      <GoogleAnalytics gaId="G-18CY2R4DY0" />
    </html>
  );
}