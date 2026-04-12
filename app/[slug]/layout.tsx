import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/lodoan-favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
