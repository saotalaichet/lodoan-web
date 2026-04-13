import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/ovenly-apple.jpg',
    apple: '/ovenly-apple.jpg',
  },
};

export default function OwnerLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
