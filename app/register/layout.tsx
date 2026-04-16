import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng Ký | Ovenly',
  icons: {
    icon: '/ovenly-apple.jpg',
    apple: '/ovenly-apple.jpg',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}