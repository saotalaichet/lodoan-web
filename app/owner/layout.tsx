'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X, Home, ShoppingBag, BarChart2, CalendarDays, User, HelpCircle, FileText } from 'lucide-react';
import { ownerAuth } from '@/lib/ownerAuth';

const NAV = [
  { id: 'orders',   href: '/owner/orders',   vi: 'Đơn Hàng',      en: 'Orders',         icon: ShoppingBag },
  { id: 'monthly',  href: '/owner/monthly',  vi: 'Báo Cáo Tháng', en: 'Monthly Report', icon: BarChart2 },
  { id: 'annual',   href: '/owner/annual',   vi: 'Báo Cáo Năm',   en: 'Annual Report',  icon: CalendarDays },
  { id: 'profile',  href: '/owner/profile',  vi: 'Hồ Sơ',         en: 'Profile',        icon: User },
  { id: 'bills',    href: '/owner/bills',    vi: 'Hóa Đơn',       en: 'Bills',          icon: FileText },
  { id: 'support',  href: '/owner/support',  vi: 'Hỗ Trợ',        en: 'Support',        icon: HelpCircle },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState('vi');
  const [session, setSession] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('owner_lang') || 'vi';
    setLang(stored);
    if (pathname === '/owner/login') {
      setSession({}); // skip auth check on login page
      return;
    }
    const data = ownerAuth.getSession();
    if (!data || !ownerAuth.getToken()) {
      router.push('/owner/login');
      return;
    }
    setSession(data);
  }, [router, pathname]);

  useEffect(() => {
    localStorage.setItem('owner_lang', lang);
  }, [lang]);

  const handleLogout = () => {
    ownerAuth.logout();
    router.push('/owner/login');
  };

  if (!session && pathname !== '/owner/login') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (pathname === '/owner/login') return <>{children}</>;

  const restaurantUrl = session.restaurantSlug ? `https://lodoan.vn/${session.restaurantSlug}` : null;

  return (
    <div className="min-h-screen bg-[#FAF8F0] flex flex-col md:flex-row">
      {/* Mobile header */}
      <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 h-14 flex items-center justify-between">
          <span className="font-heading font-bold text-primary">Ovenly Partner</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed md:relative w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto z-30 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 flex flex-col h-full space-y-6">
          {/* Restaurant info */}
          <div className="text-center">
            {session.restaurantLogo ? (
              <img src={session.restaurantLogo} alt={session.restaurantName}
                className="h-16 w-16 mx-auto mb-3 object-contain rounded-lg border border-gray-100" />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                {session.restaurantName?.charAt(0)}
              </div>
            )}
            <p className="font-bold text-gray-900 text-sm">{session.restaurantName}</p>
            <p className="text-xs text-gray-500 mt-1">{lang === 'vi' ? 'Tài Khoản Chủ Nhà Hàng' : 'Owner Account'}</p>
          </div>

          {/* Open store button */}
          {restaurantUrl && (
            <a href={restaurantUrl} target="_blank" rel="noopener noreferrer"
              className="w-full bg-primary hover:opacity-90 text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-opacity">
              <Home className="w-4 h-4" />
              {lang === 'vi' ? 'Cửa Hàng →' : 'Store →'}
            </a>
          )}

          {/* Nav */}
          <nav className="space-y-1 flex-1">
            {NAV.map(item => {
              const active = pathname === item.href;
              return (
                <Link key={item.id} href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {lang === 'vi' ? item.vi : item.en}
                </Link>
              );
            })}
          </nav>

          {/* Lang + Logout */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex gap-2">
              {['vi', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${lang === l ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition-colors">
              <LogOut className="w-4 h-4" />
              {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
            </button>
            <p className="text-center text-xs text-gray-400">© {new Date().getFullYear()} Ovenly</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen">
        <div className="hidden md:flex bg-white border-b border-gray-200 sticky top-0 z-20 px-8 h-16 items-center justify-between">
          <h1 className="font-heading text-xl font-bold text-gray-900">{session.restaurantName}</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['vi', 'en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition-colors">
              <LogOut className="w-4 h-4" />
              {lang === 'vi' ? 'Đăng Xuất' : 'Logout'}
            </button>
          </div>
        </div>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 md:hidden z-20" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}