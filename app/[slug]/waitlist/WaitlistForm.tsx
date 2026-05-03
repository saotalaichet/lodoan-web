'use client';

import { useEffect, useState } from 'react';
import { customerAuth } from '@/lib/customerAuth';
import { bookingApi, WaitlistEntry } from '@/lib/bookingApi';

interface Props {
  restaurantId: string;
  restaurantName: string;
  maxPartySize: number;
  initialQueueCount: number;
  initialEstimatedWait: number;
  estimatedMinutesPerParty: number;
}

const T = {
  vi: {
    waiting: (n: number, mins: number) => `${n} nhóm đang chờ · ~${mins} phút`,
    empty: 'Hiện không có ai đang chờ',
    name: 'Họ tên *', phone: 'Số điện thoại * (+84...)', email: 'Email *',
    party: 'Số khách *', submit: 'Tham gia ngay', submitting: 'Đang xử lý...',
    error: 'Có lỗi xảy ra. Vui lòng thử lại.',
    confTitle: 'Bạn đã có mặt!',
    confPosition: (p: number, m: number) => `Vị trí #${p} · ~${m} phút`,
    confFoot: (code: string, email: string) =>
      `Khi bàn sẵn sàng, nhân viên sẽ gọi mã ${code}. Email xác nhận đã gửi đến ${email}.`,
    autofilled: 'Đã đăng nhập — thông tin được điền tự động.',
  },
  en: {
    waiting: (n: number, mins: number) => `${n} groups ahead · ~${mins} min wait`,
    empty: 'No one in line right now',
    name: 'Full name *', phone: 'Phone *', email: 'Email *',
    party: 'Party size *', submit: 'Join the line', submitting: 'Joining...',
    error: 'Something went wrong. Please try again.',
    confTitle: "You're on the list!",
    confPosition: (p: number, m: number) => `Position #${p} · ~${m} min wait`,
    confFoot: (code: string, email: string) =>
      `When your table is ready, staff will call code ${code}. Confirmation email sent to ${email}.`,
    autofilled: 'Logged in — fields auto-filled.',
  },
};

export function WaitlistForm({
  restaurantId, maxPartySize, initialQueueCount,
  estimatedMinutesPerParty,
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [loggedIn, setLoggedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<WaitlistEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  useEffect(() => {
    customerAuth.getCustomer().then(c => {
      if (c) {
        setName(c.full_name || '');
        setPhone(c.phone_number || '');
        setEmail(c.email || '');
        setLanguage(c.preferred_language === 'en' ? 'en' : 'vi');
        setLoggedIn(true);
      }
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setSubmitting(true);
    try {
      const token = customerAuth.getToken();
      const entry = await bookingApi.joinWaitlist({
        restaurant_id: restaurantId,
        party_size: partySize,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        language,
        idempotency_key: idempotencyKey,
      }, token);
      setResult(entry);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'submit_failed');
    } finally { setSubmitting(false); }
  }

  const t = T[language];

  if (result) {
    return (
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center bg-slate-100 text-slate-900">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-slate-900 mb-1">{t.confTitle}</h2>
        <div className="my-3">
          <span className="inline-block bg-slate-900 text-slate-50 font-mono font-medium text-3xl px-5 py-2 rounded-lg tracking-wider">
            {result.lineup_code}
          </span>
        </div>
        <p className="text-sm text-slate-600">{t.confPosition(result.position ?? 1, result.estimated_wait_minutes ?? 0)}</p>
        <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
          {t.confFoot(result.lineup_code, email)}
        </p>
      </div>
    );
  }

  const projectedPosition = initialQueueCount + 1;
  const projectedWait = projectedPosition * estimatedMinutesPerParty;
  const queueHasPeople = initialQueueCount > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-3" style={{ scrollMarginTop: 80 }}>
      <div className={queueHasPeople
          ? 'bg-amber-50 text-amber-800 text-center text-sm font-medium py-2.5 rounded-lg mb-3'
          : 'bg-emerald-50 text-emerald-800 text-center text-sm font-medium py-2.5 rounded-lg mb-3'}>
        {queueHasPeople ? t.waiting(initialQueueCount, projectedWait) : t.empty}
      </div>

      <div className="flex justify-end gap-1 mb-2">
        <button type="button" onClick={() => setLanguage('vi')}
          className={`text-xs px-2 py-1 rounded ${language === 'vi' ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500'}`}>VI</button>
        <button type="button" onClick={() => setLanguage('en')}
          className={`text-xs px-2 py-1 rounded ${language === 'en' ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500'}`}>EN</button>
      </div>

      <input type="text" placeholder={t.name} value={name} onChange={e => setName(e.target.value)} required
        autoCapitalize="words"
        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
      <input type="tel" inputMode="tel" placeholder={t.phone} value={phone} onChange={e => setPhone(e.target.value)} required
        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />
      <input type="email" inputMode="email" autoCapitalize="off" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} required
        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900" />

      <div>
        <p className="text-xs text-slate-500 mb-2">{t.party}</p>
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: Math.min(maxPartySize, 6) }, (_, i) => i + 1).map(n => {
            const active = partySize === n;
            return (
              <button key={n} type="button" onClick={() => setPartySize(n)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  active ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'}`}>{n}</button>
            );
          })}
          {maxPartySize > 6 && (
            (() => {
              const active = partySize >= 7;
              return (
                <button type="button" onClick={() => setPartySize(7)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    active ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'}`}>7+</button>
              );
            })()
          )}
        </div>
      </div>

      <button type="submit" disabled={submitting}
        className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium py-3 rounded-lg text-base transition-colors">
        {submitting ? t.submitting : t.submit}
      </button>

      {error && <p className="text-red-600 text-sm text-center">{t.error}</p>}
      {loggedIn && (
        <p className="text-xs text-center text-slate-400">{t.autofilled}</p>
      )}

      <div className="text-center mt-4 pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Powered by{' '}
          <span className="font-semibold" style={{ color: '#8B1A1A' }}>
            Ovenly
          </span>
        </p>
      </div>
    </form>
  );
}
