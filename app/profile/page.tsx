'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, CreditCard, ShoppingBag, Star, Trash2, Check, Lock } from 'lucide-react';
import { customerAuth } from '@/lib/customerAuth';

const APP_ID = '69c130c9110a89987aae7fb0';
const API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE44 = `https://api.base44.app/api/apps/${APP_ID}`;
const HEADERS = { 'api-key': API_KEY, 'Content-Type': 'application/json' };

const fmt = (v: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v);

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-50',
  confirmed: 'text-blue-600 bg-blue-50',
  preparing: 'text-orange-600 bg-orange-50',
  delivered: 'text-green-600 bg-green-50',
  completed: 'text-green-600 bg-green-50',
  cancelled: 'text-red-600 bg-red-50',
  declined: 'text-red-600 bg-red-50',
};

const T = {
  vi: {
    myProfile: 'Thông Tin Cá Nhân', payments: 'Phương Thức Thanh Toán', orders: 'Lịch Sử Đơn Hàng',
    fullName: 'Họ và Tên', phone: 'Số Điện Thoại', preferredLang: 'Ngôn ngữ ưa thích',
    saveChanges: 'Lưu Thay Đổi', saving: 'Đang lưu...',
    changePassword: 'Đổi Mật Khẩu', currentPw: 'Mật Khẩu Hiện Tại',
    newPw: 'Mật Khẩu Mới', confirmPw: 'Xác Nhận Mật Khẩu Mới', updatePw: 'Cập Nhật Mật Khẩu',
    addPayment: 'Thêm Phương Thức', deleteConfirm: 'Bạn có chắc muốn xóa phương thức thanh toán này?',
    setDefault: 'Đặt mặc định', default: 'Mặc định',
    noPayments: 'Chưa có phương thức thanh toán nào.', noOrders: 'Chưa có đơn hàng nào.',
    rateOrder: 'Đánh Giá', logout: 'Đăng Xuất',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: '✅ Thông tin đã được cập nhật!', pwUpdated: '✅ Mật khẩu đã được cập nhật!',
    pwMismatch: 'Mật khẩu xác nhận không khớp', wrongPw: 'Mật khẩu hiện tại không đúng',
    loadingOrders: 'Đang tải đơn hàng...',
  },
  en: {
    myProfile: 'My Profile', payments: 'Payment Methods', orders: 'Order History',
    fullName: 'Full Name', phone: 'Phone Number', preferredLang: 'Preferred Language',
    saveChanges: 'Save Changes', saving: 'Saving...',
    changePassword: 'Change Password', currentPw: 'Current Password',
    newPw: 'New Password', confirmPw: 'Confirm New Password', updatePw: 'Update Password',
    addPayment: 'Add Payment Method', deleteConfirm: 'Are you sure you want to remove this payment method?',
    setDefault: 'Set as Default', default: 'Default',
    noPayments: 'No payment methods saved yet.', noOrders: 'No orders yet.',
    rateOrder: 'Rate Order', logout: 'Logout',
    langVi: 'Tiếng Việt', langEn: 'English',
    profileSaved: '✅ Profile updated!', pwUpdated: '✅ Password updated!',
    pwMismatch: 'Passwords do not match', wrongPw: 'Current password is incorrect',
    loadingOrders: 'Loading orders...',
  },
};

// Inner component that uses useSearchParams — must be inside Suspense
function ProfileInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('vi');
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') === 'orders' ? 'orders' :
    searchParams.get('tab') === 'payments' ? 'payments' : 'profile'
  );
  const [profileForm, setProfileForm] = useState({ full_name: '', phone_number: '', preferred_language: 'vi' });
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const t = T[lang as keyof typeof T];

  useEffect(() => {
    const stored = localStorage.getItem('marketplace_lang') || localStorage.getItem('ovenly_language') || 'vi';
    setLang(stored);
  }, []);

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
    if (activeTab === 'orders' && customer?.email) {
      setLoadingOrders(true);
      const fetchOrders = async () => {
        try {
          const token = customerAuth.getToken() || '';
          const res = await fetch(
            `/api/orders?email=${encodeURIComponent(customer.email)}&token=${encodeURIComponent(token)}`
          );
          if (res.ok) {
            const data = await res.json();
            const sorted = [...data].sort((a: any, b: any) =>
              new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
            );
            setOrders(sorted);
          }
        } catch {}
        setLoadingOrders(false);
      };
      fetchOrders();
    }
  }, [activeTab, customer?.email]);

  useEffect(() => {
    if (activeTab === 'payments' && customer?.id) {
      const fetchPayments = async () => {
        try {
          const token = customerAuth.getToken() || '';
          const res = await fetch(
            `${BASE44}/entities/PaymentMethod?customer_id=${customer.id}&_limit=50`,
            { headers: { ...HEADERS, 'Authorization': `Bearer ${token}` } }
          );
          if (res.ok) {
            const body = await res.json();
            setPaymentMethods(Array.isArray(body) ? body : (body?.items ?? body?.data ?? []));
          }
        } catch {}
      };
      fetchPayments();
    }
  }, [activeTab, customer?.id]);

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

  const handleDeletePayment = async (pmId: string) => {
    if (!window.confirm(t.deleteConfirm)) return;
    try {
      await fetch(`${BASE44}/entities/PaymentMethod/${pmId}`, { method: 'DELETE', headers: HEADERS });
      setPaymentMethods(prev => prev.filter((pm: any) => pm.id !== pmId));
    } catch {}
  };

  const handleSetDefault = async (pmId: string) => {
    try {
      for (const pm of paymentMethods) {
        if (pm.is_default) {
          await fetch(`${BASE44}/entities/PaymentMethod/${pm.id}`, {
            method: 'PUT', headers: HEADERS, body: JSON.stringify({ is_default: false }),
          });
        }
      }
      await fetch(`${BASE44}/entities/PaymentMethod/${pmId}`, {
        method: 'PUT', headers: HEADERS, body: JSON.stringify({ is_default: true }),
      });
      setPaymentMethods(prev => prev.map((pm: any) => ({ ...pm, is_default: pm.id === pmId })));
    } catch {}
  };

  const handleLogout = async () => {
    await customerAuth.logout();
    router.push('/');
  };

  const TABS = [
    { key: 'profile', label: t.myProfile, icon: User },
    { key: 'payments', label: t.payments, icon: CreditCard },
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
        <div className="bg-white rounded-2xl p-6 mb-6 flex items-center gap-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
            {customer?.full_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-xl text-gray-900 truncate">{customer?.full_name}</h1>
            <p className="text-sm text-gray-500 truncate">{customer?.email}</p>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.key ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
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
                {profileMsg && <p className={`text-sm font-medium ${profileMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{profileMsg}</p>}
                <button type="submit" disabled={savingProfile}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-colors">
                  {savingProfile ? t.saving : t.saveChanges}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
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
                {pwMsg && <p className={`text-sm font-medium ${pwMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{pwMsg}</p>}
                <button type="submit" disabled={savingPw}
                  className="bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-colors">
                  {savingPw ? t.saving : t.updatePw}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── PAYMENTS TAB ── */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">{t.payments}</h2>
              <button
                onClick={() => alert(lang === 'vi' ? 'Tính năng sắp ra mắt' : 'Coming soon')}
                className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-colors">
                + {t.addPayment}
              </button>
            </div>
            {paymentMethods.length === 0 ? (
              <p className="text-gray-400 text-center py-8">{t.noPayments}</p>
            ) : (
              <div className="space-y-3">
                {paymentMethods.map((pm: any) => (
                  <div key={pm.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {pm.payment_type === 'MoMo' ? '💜' : pm.payment_type === 'ZaloPay' ? '🔵' : '💳'}
                      </span>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{pm.display_name}</p>
                        {pm.is_default && (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" />{t.default}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!pm.is_default && (
                        <button onClick={() => handleSetDefault(pm.id)} className="text-xs text-primary font-semibold hover:underline">
                          {t.setDefault}
                        </button>
                      )}
                      <button onClick={() => handleDeletePayment(pm.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 className="font-bold text-lg text-gray-900 mb-4">{t.orders}</h2>
            {loadingOrders ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-400">{t.loadingOrders}</p>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">{t.noOrders}</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-sm text-gray-900">{order.restaurant_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.created_date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || 'text-gray-600 bg-gray-50'}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {Array.isArray(order.items) ? order.items.map((i: any) => `${i.quantity}× ${i.name}`).join(', ') : ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary">{fmt(order.total)}</p>
                      {(order.status === 'delivered' || order.status === 'completed') && order.rating_token && (
                        <Link href={`/rate/${order.id}?token=${order.rating_token}`}
                          className="text-xs bg-yellow-400 text-yellow-900 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-yellow-500 transition-colors">
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

// Outer component wraps inner in Suspense (required for useSearchParams in Next.js)
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