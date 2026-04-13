import type { Metadata } from 'next';
export const metadata: Metadata = {
  icons: {
    icon: '/lodoan-favicon.ico',
    apple: '/lodoan-apple.jpg',
  },
};
export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}