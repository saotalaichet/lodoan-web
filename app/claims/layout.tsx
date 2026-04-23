import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Chính Sách Khiếu Nại | LÒ ĐỒ ĂN',
  description: 'Quy trình khiếu nại tại LÒ ĐỒ ĂN.',
  alternates: { canonical: 'https://www.ovenly.io/claims' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}