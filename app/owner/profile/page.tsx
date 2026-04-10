'use client';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { ownerAuth } from '@/lib/ownerAuth';

export default function OwnerProfilePage() {
  const [lang, setLang] = useState('vi');
  const [session, setSession] = useState<any>(null);
  const [form, setForm] = useState({ full_name: '', email: '' });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [saving, setSaving] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [msg, setMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  useEffect(() => {
    setLang(localStorage.getItem('owner_lang') || 'vi');
    const s = ownerAuth.getSession();
    setSession(s);
    if (s) setForm({ full_name: s.ownerName || '', email: s.ownerEmail || '' });
  }, []);

  const t = {
    title: lang === 'vi' ? 'Hồ Sơ' : 'Profile',
    contactInfo: lang === 'vi' ? 'Thông Tin Liên Hệ' : 'Contact Information',
    fullName: lang === 'vi' ? 'Họ và Tên' : 'Full Name',
    email: lang === 'vi' ? 'Email' : 'Email',
    save: lang === 'vi' ? 'Lưu' : 'Save',
    saving: lang === 'vi' ? 'Đang lưu...' : 'Saving...',
    changePw: lang === 'vi' ? 'Đổi Mật Khẩu' : 'Change Password',
    currentPw: lang === 'vi' ? 'Mật Khẩu Hiện Tại' : 'Current Password',
    newPw: lang === 'vi' ? 'Mật Khẩu Mới' : 'New Password',
    confirmPw: lang === 'vi' ? 'Xác Nhận' : 'Confirm',
    change: lang === 'vi' ? 'Cập Nhật' : 'Update',
    saved: lang === 'vi' ? '✅ Đã lưu' : '✅ Saved',
    pwUpdated: lang === 'vi' ? '✅ Mật khẩu đã cập nhật' : '✅ Password updated',
    mismatch: lang === 'vi' ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match',
    wrongPw: lang === 'vi' ? 'Mật khẩu hiện tại không đúng' : 'Current password incorrect',
    tempBanner: lang === 'vi' ? 'Vui lòng đổi mật khẩu tạm thời' : 'Please change your temporary password',
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      await ownerAuth.updateProfile(form);
      setMsg(t.saved);
    } catch { setMsg('❌ Error') }
    finally { setSaving(false); setTimeout(() => setMsg(''), 3000); }
  };

  const handlePw = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg('');
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg('❌ ' + t.mismatch); return; }
    setSavingPw(true);
    try {
      await ownerAuth.changePassword(pwForm.current, pwForm.newPw);
      setPwMsg(t.pwUpdated);
      setPwForm({ current: '', newPw: '', confirm: '' });
    } catch (err: any) {
      setPwMsg('❌ ' + (err.message === 'wrong_current_password' ? t.wrongPw : 'Error'));
    }
    finally { setSavingPw(false); setTimeout(() => setPwMsg(''), 3000); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-bold text-xl text-gray-900">{t.title}</h2>

      {session?.isTempPassword && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-pink-700">{t.tempBanner}</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">{t.contactInfo}</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.fullName}</label>
            <input value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t.email}</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {msg && <p className={`text-sm font-medium ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
          <button type="submit" disabled={saving}
            className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
            {saving ? t.saving : t.save}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">{t.changePw}</h3>
        <form onSubmit={handlePw} className="space-y-4">
          {[
            { key: 'current', label: t.currentPw },
            { key: 'newPw', label: t.newPw },
            { key: 'confirm', label: t.confirmPw },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
              <input type="password" value={(pwForm as any)[f.key]}
                onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
          {pwMsg && <p className={`text-sm font-medium ${pwMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{pwMsg}</p>}
          <button type="submit" disabled={savingPw}
            className="bg-gray-800 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
            {savingPw ? t.saving : t.change}
          </button>
        </form>
      </div>
    </div>
  );
}