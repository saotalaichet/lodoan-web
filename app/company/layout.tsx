import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ovenly | Hệ Thống Nhận Đơn Online Trực Tiếp cho Ngành F&B Việt Nam',
  description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng. Quản lý menu, theo dõi đơn hàng theo thời gian thực, tiếp cận khách mới. Đăng ký hôm nay để nhận ưu đãi.',
  icons: {
    icon: '/ovenly-apple.jpg',
    apple: '/ovenly-apple.jpg',
  },
  alternates: {
    canonical: 'https://www.ovenly.io',
    languages: {
      'vi': 'https://www.ovenly.io',
      'en': 'https://www.ovenly.io',
    },
  },
  openGraph: {
    title: 'Ovenly — Phần Mềm Nhận Đơn Online cho Nhà Hàng Việt Nam',
    description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng. Quản lý menu, theo dõi đơn hàng theo thời gian thực, tiếp cận khách mới. Đăng ký hôm nay để nhận ưu đãi.',
    url: 'https://www.ovenly.io',
    siteName: 'Ovenly',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: 'https://i.postimg.cc/Mvp7DzmH/logo-3.png', width: 1200, height: 630, alt: 'Ovenly — Phần Mềm Nhận Đơn Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovenly | Hệ Thống Nhận Đơn Online Trực Tiếp cho Ngành F&B Việt Nam',
    description: 'Ovenly giúp nhà hàng, quán ăn uống và các cơ sở F&B nhận đơn online trực tiếp từ khách hàng. Quản lý menu, theo dõi đơn hàng theo thời gian thực, tiếp cận khách mới. Đăng ký hôm nay để nhận ưu đãi.',
    images: ['https://i.postimg.cc/Mvp7DzmH/logo-3.png'],
  },
  keywords: [
    'phần mềm nhà hàng',
    'nhận đơn online',
    'đặt hàng trực tuyến nhà hàng',
    'quản lý nhà hàng',
    'app nhà hàng Việt Nam',
    'food ordering software Vietnam',
    'restaurant technology Vietnam',
    'phần mềm quản lý quán ăn',
    'phần mềm quán cà phê',
    'phần mềm trà sữa',
    'hệ thống đặt hàng quán trà sữa',
    'nhận đơn online quán cà phê',
    'phần mềm đồ uống',
    'quản lý quán bubble tea',
    'hệ thống order đồ uống',
    'phần mềm thức ăn nhanh',
    'hệ thống nhận đơn fast food',
    'quản lý quán ăn nhanh',
    'phần mềm F&B Việt Nam',
    'hệ thống F&B online',
    'giải pháp công nghệ nhà hàng',
    'coffee shop ordering system Vietnam',
    'bubble tea ordering software',
    'fast food ordering system Vietnam',
    'F&B software Vietnam',
    'beverage ordering system',
    'phần mềm quản lý chuỗi F&B',
    'nhận đơn trực tuyến quán ăn',
    'hệ thống POS nhà hàng Việt Nam'
  ],
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}