import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | LÒ ĐỒ ĂN',
  description: 'Chính sách bảo mật thông tin cá nhân của LÒ ĐỒ ĂN.',
  alternates: { canonical: 'https://www.lodoan.vn/privacy' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}