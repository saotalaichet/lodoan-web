import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Liên Hệ | LÒ ĐỒ ĂN',
  description: 'Liên hệ với LÒ ĐỒ ĂN để đăng ký nhà hàng, quán ăn uống, hỗ trợ kỹ thuật hoặc hợp tác kinh doanh. Email: hello@ovenly.io',
  alternates: { canonical: 'https://www.lodoan.vn/contact' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}