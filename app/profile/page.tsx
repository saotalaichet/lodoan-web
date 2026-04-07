'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ShoppingBag, Star } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const PRIMARY = '#8B1A1A';
const BASE44_URL = `https://api.base44.app/api/apps/${process.env.NEXT_PUBLIC_BASE44_APP_ID}`;
const HEADERS = { 'Content-Type': 'application/json', 'api-key': process.env.NEXT_PUBLIC_BASE44_API_KEY! };

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50',
  confirmed: 'text-blue-600 bg-blue-50',
  accepted: 'text-blue-600 bg-blue-50',
  preparing: 'text-orange-600 bg-orange-50',
  ready: 'text-green-600 bg-green-50',
  delivering: 'text-orange-600 bg-orange-50',
  delivered: 'text-green-600 bg-green-50',
  completed: 'text-green-600 bg-green-50',
  cancelled: 'text-red-600 bg-red-50',
  declined: 'text-red-600 bg-red-50',
};

const T = {
  vi: {
    myProfile: 'Thông Tin Cá Nhân', orders: 'Lịch Sử Đơn Hàng',
    fullName: 'Họ và Tên', phone: 'Số Điện Thoại', preferredLang: 'Ngôn ngữ ưa thích',
    saveChanges: 'Lưu Thay Đổi', saving: 'Đang lưu...',
    changePassword: 'Đổi Mật Khẩu', currentPw: 'Mật Khẩu Hiện Tại',
    newPw: 'Mật Khẩu Mới', confirmPw: 'Xác Nhận Mật Khẩu Mới',
    updatePw: 'Cập Nhật Mật Khẩu', noOrders: 'Chưa có đơn hàng nào.',
    rateOrder: 'Đánh Giá', logout: 'Đăng Xuất',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: 'Thông tin đã được cập nhật!',
    pwUpdated: 'Mật khẩu đã được cập nhật!',
    pwMismatch: 'Mật khẩu xác nhận không khớp',
    wrongPw: 'Mật khẩu hiện tại không đúng',
  },
  en: {
    myProfile: 'My Profile', orders: 'Order History',
    fullName: 'Full Name', phone: 'Phone Number', preferredLang: 'Preferred Language',
    saveChanges: 'Save Changes', saving: 'Saving...',
    changePassword: 'Change Password', currentPw: 'Current Password',
    newPw: 'New Password', confirmPw: 'Confirm New Password',
    updatePw: 'Update Password', noOrders: 'No orders yet.',
    rateOrder: 'Rate Order', logout: 'Logout',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: 'Profile updated!',
    pwUpdated: 'Password updated!',
    pwMismatch: 'Passwords do not match',
    wrongPw: 'Current password is incorrect',
  },
};

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('vi');
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [profileForm, setProfileForm] = useState({ full_name: '', phone_number: '', preferred_language: 'vi' });
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab === 'orders') setActiveTab('orders');
  }, [searchParams]);

  useEffect(() => {
    const stored = localStorage.getItem('ovenly_language') || localStorage.getItem('marketplace_lang') || 'vi';
    setLang(stored);
    customerAuth.getCustomer().then(c => {
      if (!c) { router.push('/login'); return; }
      setCustomer(c);
      setProfileForm({ full_name: c.full_name || '', phone_number: c.phone_number || '', preferred_language: c.preferred_language || 'vi' });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('ovenly_language', lang);
  }, [lang]);

  useEffect(() => {
    if (activeTab !== 'orders' || !customer?.email) return;
    setLoadingOrders(true);
    fetch(`${BASE44_URL}/entities/Order?customer_email=${encodeURIComponent(customer.email)}&_sort=-created_date&_limit=50`, { headers: HEADERS })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoadingOrders(false); })
      .catch(() => setLoadingOrders(false));
  }, [activeTab, customer?.email]);

  const showMsg = (text: string, type: 'success' | 'error') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await customerAuth.updateProfile(profileForm);
      const updated = { ...customer, ...profileForm };
      setCustomer(updated);
      showMsg(t.profileSaved, 'success');
    } catch { showMsg('Error saving profile', 'error'); }
    finally { setSavingProfile(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm_password) { showMsg(t.pwMismatch, 'error'); return; }
    setSavingPw(true);
    try {
      await customerAuth.changePassword(pwForm.current_password, pwForm.new_password);
      showMsg(t.pwUpdated, 'success');
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      if (err.message === 'wrong_current_password') showMsg(t.wrongPw, 'error');
      else showMsg('Error', 'error');
    } finally { setSavingPw(false); }
  };

  const handleLogout = async () => {
    await customerAuth.logout();
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(30,20%,97%)' }}>
      <div className="w-10 h-10 border-4 border-t-red-800 border-red-200 rounded-full animate-spin" style={{ borderTopColor: PRIMARY }} />
    </div>
  );

  const TABS = [
    { key: 'profile', label: t.myProfile, icon: User },
    { key: 'orders', label: t.orders, icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(30,20%,97%)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-lg" style={{ color: PRIMARY }}>LÒ ĐỒ ĂN</Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button onClick={() => setLang('vi')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'vi' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>VI</button>
              <button onClick={() => setLang('en')} className="px-3 py-1 rounded-full transition-all"
                style={lang === 'en' ? { backgroundColor: PRIMARY, color: 'white' } : { color: '#6B7280' }}>EN</button>
            </div>
            <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">{t.logout}</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Customer card */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex items-center gap-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-heading font-bold text-white flex-shrink-0"
            style={{ backgroundColor: PRIMARY }}>
            {customer?.full_name?.[0]?.toUpperCase() || customer?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-gray-900">{customer?.full_name}</h1>
            <p className="text-sm text-gray-500">{customer?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              style={activeTab === tab.key ? { color: PRIMARY } : {}}>
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {msg.text && (
          <div className={`rounded-xl px-4 py-3 mb-4 text-sm ${msg.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {msg.text}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">{t.myProfile}</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.fullName}</label>
                  <input value={profileForm.full_name}
                    onChange={e => setProfileForm(p => ({ ...p, full_name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.phone}</label>
                  <input value={profileForm.phone_number}
                    onChange={e => setProfileForm(p => ({ ...p, phone_number: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.preferredLang}</label>
                  <select value={profileForm.preferred_language}
                    onChange={e => setProfileForm(p => ({ ...p, preferred_language: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all">
                    <option value="vi">{t.langVi}</option>
                    <option value="en">{t.langEn}</option>
                  </select>
                </div>
                <button type="submit" disabled={savingProfile}
                  className="text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-colors"
                  style={{ backgroundColor: PRIMARY }}>
                  {savingProfile ? t.saving : t.saveChanges}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">{t.changePassword}</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {(['current_password', 'new_password', 'confirm_password'] as const).map((field, i) => (
                  <div key={field}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {[t.currentPw, t.newPw, t.confirmPw][i]}
                    </label>
                    <input type="password" required value={pwForm[field]}
                      onChange={e => setPwForm(p => ({ ...p, [field]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:border-red-800 transition-all" />
                  </div>
                ))}
                <button type="submit" disabled={savingPw}
                  className="bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50">
                  {savingPw ? t.saving : t.updatePw}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">{t.orders}</h2>
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-t-red-800 border-red-200 rounded-full animate-spin mx-auto" style={{ borderTopColor: PRIMARY }} />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">{t.noOrders}</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-heading font-bold text-sm text-gray-900">{order.restaurant_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.created_date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || 'text-gray-600 bg-gray-50'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {order.items?.map((i: any) => `${i.quantity}× ${i.name}`).join(', ')}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-heading font-bold" style={{ color: PRIMARY }}>{fmt(order.total)}</p>
                      {(order.status === 'delivered' || order.status === 'completed') && order.rating_token && (
                        <Link href={`/rate/${order.id}?token=${order.rating_token}`}
                          className="text-xs bg-yellow-400 text-yellow-900 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-yellow-500">
                          <Star className="w-3 h-3" /> {t.rateOrder}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-t-red-800 border-red-200 rounded-full animate-spin" /></div>}>
      <ProfileContent />
    </Suspense>
  );
}