'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, ShoppingBag, Star, Lock, Receipt } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';
import { useMarketplaceLang } from '@/lib/useMarketplaceLang';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const STATUS_LABELS: Record<string, { vi: string; en: string; color: string }> = {
  pending:          { vi: 'Đang xử lý',    en: 'Pending',     color: 'text-yellow-600 bg-yellow-50' },
  confirmed:        { vi: 'Đã xác nhận',   en: 'Confirmed',   color: 'text-blue-600 bg-blue-50' },
  accepted:         { vi: 'Đang chuẩn bị', en: 'Preparing',   color: 'text-orange-600 bg-orange-50' },
  preparing:        { vi: 'Đang chuẩn bị', en: 'Preparing',   color: 'text-orange-600 bg-orange-50' },
  ready:            { vi: 'Sẵn sàng',      en: 'Ready',       color: 'text-green-600 bg-green-50' },
  delivering:       { vi: 'Đang giao',     en: 'Delivering',  color: 'text-blue-600 bg-blue-50' },
  completed:        { vi: 'Hoàn thành',    en: 'Completed',   color: 'text-green-600 bg-green-50' },
  cancelled:        { vi: 'Đã huỷ',        en: 'Cancelled',   color: 'text-red-600 bg-red-50' },
  declined:         { vi: 'Bị từ chối',    en: 'Declined',    color: 'text-red-600 bg-red-50' },
  timed_out:        { vi: 'Hết thời gian', en: 'Timed out',   color: 'text-gray-600 bg-gray-50' },
  pending_payment:  { vi: 'Chờ thanh toán','en': 'Awaiting payment', color: 'text-yellow-600 bg-yellow-50' },
};

const T = {
  vi: {
    myProfile: 'Thông Tin Cá Nhân', orders: 'Lịch Sử Đơn Hàng',
    fullName: 'Họ và Tên', phone: 'Số Điện Thoại', preferredLang: 'Ngôn ngữ ưa thích',
    saveChanges: 'Lưu Thay Đổi', saving: 'Đang lưu...',
    changePassword: 'Đổi Mật Khẩu', currentPw: 'Mật Khẩu Hiện Tại',
    newPw: 'Mật Khẩu Mới', confirmPw: 'Xác Nhận Mật Khẩu Mới', updatePw: 'Cập Nhật Mật Khẩu',
    noOrders: 'Chưa có đơn hàng nào.',
    rateOrder: 'Đánh Giá', logout: 'Đăng Xuất',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: '✅ Thông tin đã được cập nhật!', pwUpdated: '✅ Mật khẩu đã được cập nhật!',
    pwMismatch: 'Mật khẩu xác nhận không khớp', wrongPw: 'Mật khẩu hiện tại không đúng',
    loadingOrders: 'Đang tải đơn hàng...',
    orderType: { pickup: 'Mang về', delivery: 'Giao hàng' },
    payMethod: { cash_or_transfer: 'Tiền mặt / CK', cod: 'COD', momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay', creditcard: 'Thẻ tín dụng' },
  },
  en: {
    myProfile: 'My Profile', orders: 'Order History',
    fullName: 'Full Name', phone: 'Phone Number', preferredLang: 'Preferred Language',
    saveChanges: 'Save Changes', saving: 'Saving...',
    changePassword: 'Change Password', currentPw: 'Current Password',
    newPw: 'New Password', confirmPw: 'Confirm New Password', updatePw: 'Update Password',
    noOrders: 'No orders yet.',
    rateOrder: 'Rate', logout: 'Logout',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: '✅ Profile updated!', pwUpdated: '✅ Password updated!',
    pwMismatch: 'Passwords do not match', wrongPw: 'Current password is incorrect',
    loadingOrders: 'Loading orders...',
    orderType: { pickup: 'Pickup', delivery: 'Delivery' },
    payMethod: { cash_or_transfer: 'Cash / Transfer', cod: 'COD', momo: 'MoMo', zalopay: 'ZaloPay', vnpay: 'VNPay', creditcard: 'Credit card' },
  },
};

function ProfileInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, setLang } = useMarketplaceLang();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'orders' ? 'orders' : 'profile'
  );
  const [profileForm, setProfileForm] = useState({ full_name: '', phone_number: '', preferred_language: 'vi' });
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    customerAuth.getCustomer().then(c => {
      if (!c) { router.push('/login'); return; }
      setCustomer(c);
      setProfileForm({
        full_name: c.full_name || '',
        phone_number: c.phone_number || '',
        preferred_language: c.preferred_language || 'vi',
      });
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (activeTab !== 'orders' || !customer) return;
    setLoadingOrders(true);
    customerAuth.getOrders()
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [activeTab, customer]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg('');
    try {
      await customerAuth.updateProfile(profileForm);
      setCustomer((prev: any) => ({ ...prev, ...profileForm }));
      setProfileMsg(t.profileSaved);
    } catch (err: any) {
      setProfileMsg('❌ ' + (err.message || 'Error'));
    } finally {
      setSavingProfile(false);
      setTimeout(() => setProfileMsg(''), 3000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg('');
    if (pwForm.new_password !== pwForm.confirm_password) { setPwMsg('❌ ' + t.pwMismatch); return; }
    setSavingPw(true);
    try {
      await customerAuth.changePassword(pwForm.current_password, pwForm.new_password);
      setPwMsg(t.pwUpdated);
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
      if (err.message === 'wrong_current_password') setPwMsg('❌ ' + t.wrongPw);
      else setPwMsg('❌ Error');
    } finally {
      setSavingPw(false);
      setTimeout(() => setPwMsg(''), 3000);
    }
  };

  const handleLogout = async () => {
    await customerAuth.logout();
    router.push('/');
  };

  const TABS = [
    { key: 'profile', label: t.myProfile, icon: User },
    { key: 'orders', label: t.orders, icon: ShoppingBag },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-primary text-lg">LÒ ĐỒ ĂN</Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button onClick={() => setLang('vi')} className={`px-3 py-1 rounded-full transition-all ${lang === 'vi' ? 'bg-primary text-white' : 'text-gray-500'}`}>VI</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-gray-500'}`}>EN</button>
            </div>
            <button onClick={handleLogout} className="text-sm text-red-600 font-semibold hover:underline">{t.logout}</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Customer card */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
            {customer?.full_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-gray-900 truncate">{customer?.full_name}</h1>
            <p className="text-sm text-gray-500 truncate">{customer?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg text-gray-900 mb-4">{t.myProfile}</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.fullName}</label>
                  <input value={profileForm.full_name}
                    onChange={e => setProfileForm(p => ({ ...p, full_name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.phone}</label>
                  <input value={profileForm.phone_number}
                    onChange={e => setProfileForm(p => ({ ...p, phone_number: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.preferredLang}</label>
                  <select value={profileForm.preferred_language}
                    onChange={e => setProfileForm(p => ({ ...p, preferred_language: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="vi">{t.langVi}</option>
                    <option value="en">{t.langEn}</option>
                  </select>
                </div>
                {profileMsg && (
                  <p className={`text-sm font-medium ${profileMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {profileMsg}
                  </p>
                )}
                <button type="submit" disabled={savingProfile}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-colors">
                  {savingProfile ? t.saving : t.saveChanges}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-400" /> {t.changePassword}
              </h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {([
                  { key: 'current_password', label: t.currentPw },
                  { key: 'new_password', label: t.newPw },
                  { key: 'confirm_password', label: t.confirmPw },
                ] as { key: keyof typeof pwForm; label: string }[]).map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                    <input type="password" required value={pwForm[field.key]}
                      onChange={e => setPwForm(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                ))}
                {pwMsg && (
                  <p className={`text-sm font-medium ${pwMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {pwMsg}
                  </p>
                )}
                <button type="submit" disabled={savingPw}
                  className="bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-colors">
                  {savingPw ? t.saving : t.updatePw}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 mb-4">{t.orders}</h2>
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-400">{t.loadingOrders}</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-gray-400 font-medium">{t.noOrders}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => {
                  const s = STATUS_LABELS[order.status];
                  const items = Array.isArray(order.items) ? order.items : [];
                  return (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-2 gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-gray-900 truncate">{order.restaurant_name}</p>
                          <p className="text-xs text-gray-400 mt-0.5 font-mono">#{order.id?.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {order.created_date
                              ? new Date(order.created_date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                              : ''}
                          </p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${s?.color || 'text-gray-600 bg-gray-50'}`}>
                          {lang === 'vi' ? (s?.vi || order.status) : (s?.en || order.status)}
                        </span>
                      </div>

                      {items.length > 0 && (
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {items.map((i: any) => `${i.quantity}× ${i.name}`).join(', ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{(t.orderType as any)[order.order_type] || order.order_type}</span>
                          <span>•</span>
                          <span>{(t.payMethod as any)[order.payment_method] || order.payment_method}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-primary text-sm">{fmt(order.total)}</p>
                          {(order.status === 'completed') && order.rating_token && (
                            <Link href={`/rate/${order.id}?token=${order.rating_token}`}
                              className="text-xs bg-amber-400 text-amber-900 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-amber-500 transition-colors">
                              <Star className="w-3 h-3" /> {t.rateOrder}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <ProfileInner />
    </Suspense>
  );
}