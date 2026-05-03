'use client';

import { useEffect, useMemo, useState } from 'react';
import { customerAuth } from '@/lib/customerAuth';
import { bookingApi, Reservation, AvailabilitySlot } from '@/lib/bookingApi';

interface Props {
  restaurantId: string;
  restaurantName: string;
  maxPartySize: number;
  advanceWindowDays: number;
}

const T = {
  vi: {
    date: 'Ngày', party: 'Số khách', time: 'Giờ', name: 'Họ tên *',
    phone: 'Số điện thoại * (+84...)', email: 'Email *',
    notes: 'Ghi chú (không bắt buộc)',
    submit: 'Đặt bàn ngay', submitting: 'Đang xử lý...',
    pickTime: 'Chọn giờ', noSlots: 'Không có giờ trống cho ngày này',
    spotsLeft: (n: number) => `${n} chỗ`,
    today: 'Hôm nay', tomorrow: 'Mai',
    confTitle: 'Đặt bàn thành công!', addCal: 'Thêm vào lịch',
    confFoot: (email: string) => `Thông tin xác nhận đã gửi đến ${email}. Cần thay đổi? Phản hồi email này.`,
    autofilled: 'Đã đăng nhập — thông tin được điền tự động.',
    errorGeneric: 'Có lỗi xảy ra. Vui lòng thử lại.',
    errorTooSoon: 'Thời gian quá gấp.', errorTooFar: 'Thời gian quá xa.',
    errorParty: 'Vượt quá số lượng khách tối đa.',
    weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  },
  en: {
    date: 'Date', party: 'Party size', time: 'Time', name: 'Full name *',
    phone: 'Phone *', email: 'Email *', notes: 'Notes (optional)',
    submit: 'Book now', submitting: 'Booking...',
    pickTime: 'Pick a time', noSlots: 'No available times for this date',
    spotsLeft: (n: number) => `${n} left`,
    today: 'Today', tomorrow: 'Tomorrow',
    confTitle: 'Reservation confirmed!', addCal: 'Add to calendar',
    confFoot: (email: string) => `Confirmation sent to ${email}. Need to change? Reply to that email.`,
    autofilled: 'Logged in — fields auto-filled.',
    errorGeneric: 'Something went wrong. Please try again.',
    errorTooSoon: 'Time is too soon.', errorTooFar: 'Time is too far in advance.',
    errorParty: 'Party size exceeds maximum.',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function generateICS(opts: { uid: string; title: string; description: string; location: string; start: Date; durationMinutes: number }) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = new Date(opts.start.getTime() + opts.durationMinutes * 60 * 1000);
  const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ovenly//OvenHost//EN',
    'BEGIN:VEVENT', `UID:${opts.uid}`, `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(opts.start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${escape(opts.title)}`, `DESCRIPTION:${escape(opts.description)}`,
    `LOCATION:${escape(opts.location)}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

export function ReservationForm({ restaurantId, restaurantName, maxPartySize, advanceWindowDays }: Props) {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [loggedIn, setLoggedIn] = useState(false);

  const datePills = useMemo(() => {
    const days = Math.min(7, advanceWindowDays + 1);
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i); return d;
    });
  }, [advanceWindowDays]);

  const [selectedDate, setSelectedDate] = useState<Date>(datePills[0]);
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState<AvailabilitySlot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Reservation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  useEffect(() => {
    customerAuth.getCustomer().then(c => {
      if (c) {
        setName(c.full_name || ''); setPhone(c.phone_number || '');
        setEmail(c.email || '');
        setLanguage(c.preferred_language === 'en' ? 'en' : 'vi');
        setLoggedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setSlotsLoading(true); setSelectedSlot(null);
    bookingApi.getAvailability(restaurantId, ymd(selectedDate), partySize)
      .then(res => { if (!cancelled) setSlots(res.slots); })
      .catch(() => { if (!cancelled) setSlots([]); })
      .finally(() => { if (!cancelled) setSlotsLoading(false); });
    return () => { cancelled = true; };
  }, [restaurantId, selectedDate, partySize]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setError(null); setSubmitting(true);
    try {
      const token = customerAuth.getToken();
      const reservation = await bookingApi.createReservation({
        restaurant_id: restaurantId, party_size: partySize,
        requested_at: selectedSlot.iso, notes: notes.trim() || undefined,
        customer_name: name.trim(), customer_phone: phone.trim(),
        customer_email: email.trim(), language,
        idempotency_key: idempotencyKey,
      }, token);
      setResult(reservation);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'submit_failed');
    } finally { setSubmitting(false); }
  }

  const t = T[language];

  if (result) {
    const start = new Date(result.requested_at);
    const fmt = start.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US', {
      timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', day: '2-digit',
      month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
    });
    const onDownload = () => {
      downloadICS(`reservation-${result.id}.ics`, generateICS({
        uid: result.id,
        title: language === 'vi' ? `Đặt bàn tại ${restaurantName}` : `Reservation at ${restaurantName}`,
        description: language === 'vi' ? `Đặt bàn cho ${result.party_size} khách` : `Reservation for ${result.party_size}`,
        location: restaurantName, start, durationMinutes: 90,
      }));
    };
    return (
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 mx-auto mb-3 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-slate-900 mb-2">{t.confTitle}</h2>
        <p className="text-sm text-slate-700 font-medium">{fmt}</p>
        <p className="text-sm text-slate-600 mt-0.5">
          {language === 'vi' ? `${result.party_size} khách` : `Party of ${result.party_size}`}
        </p>
        <button type="button" onClick={onDownload}
          className="inline-flex items-center gap-1.5 mt-4 bg-white text-blue-600 border border-blue-200 px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {t.addCal}
        </button>
        <p className="text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">{t.confFoot(email)}</p>
      </div>
    );
  }

  const errorMessage = error === 'requested_time_too_soon' ? t.errorTooSoon
    : error === 'requested_time_too_far' ? t.errorTooFar
    : error === 'party_size_too_large' ? t.errorParty
    : error ? t.errorGeneric : null;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex justify-end gap-1">
        <button type="button" onClick={() => setLanguage('vi')} className={`text-xs px-2 py-1 rounded ${language === 'vi' ? 'bg-blue-100 text-blue-800' : 'text-slate-500'}`}>VI</button>
        <button type="button" onClick={() => setLanguage('en')} className={`text-xs px-2 py-1 rounded ${language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-slate-500'}`}>EN</button>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900 mb-2">{t.date}</p>
        <div className="grid grid-cols-4 gap-1.5">
          {datePills.map((d, idx) => {
            const isActive = ymd(d) === ymd(selectedDate);
            const label = idx === 0 ? t.today : idx === 1 ? t.tomorrow : t.weekdays[d.getDay()];
            return (
              <button key={ymd(d)} type="button" onClick={() => setSelectedDate(d)}
                className={`py-2 rounded-lg border text-center transition-colors ${
                  isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'}`}>
                <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{label}</div>
                <div className="text-sm font-medium mt-0.5">{d.getDate()}/{d.getMonth() + 1}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900 mb-2">{t.party}</p>
        <div className="flex flex-wrap gap-1.5">
          {[2, 4, 6, 8].filter(n => n <= maxPartySize).map(n => (
            <button key={n} type="button" onClick={() => setPartySize(n)}
              className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                partySize === n ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'}`}>{n}</button>
          ))}
          {maxPartySize > 8 && (
            <button type="button" onClick={() => setPartySize(10)}
              className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                partySize >= 10 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'}`}>10+</button>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900 mb-2">{t.time}</p>
        {slotsLoading ? (
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />)}
          </div>
        ) : slots && slots.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">{t.noSlots}</p>
        ) : (
          <div className="grid grid-cols-3 gap-1.5">
            {slots?.map(slot => {
              const isActive = selectedSlot?.iso === slot.iso;
              const showSpotsLeft = slot.available && slot.remaining <= 5;
              return (
                <button key={slot.iso} type="button" disabled={!slot.available} onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white border-blue-600'
                      : slot.available ? 'bg-white text-slate-900 border-slate-300 hover:border-slate-400'
                        : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'}`}>
                  {slot.time}
                  {showSpotsLeft && (
                    <span className={`block text-[10px] font-normal mt-0.5 ${isActive ? 'text-blue-100' : 'text-amber-700'}`}>
                      {t.spotsLeft(slot.remaining)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <input type="text" placeholder={t.name} value={name} onChange={e => setName(e.target.value)} required
          className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        <input type="tel" placeholder={t.phone} value={phone} onChange={e => setPhone(e.target.value)} required
          className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        <input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} required
          className="w-full border border-slate-300 rounded-lg px-3 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
        <textarea placeholder={t.notes} value={notes} onChange={e => setNotes(e.target.value)} rows={2}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>

      <button type="submit" disabled={submitting || !selectedSlot}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg text-base transition-colors">
        {submitting ? t.submitting : !selectedSlot ? t.pickTime : t.submit}
      </button>

      {errorMessage && <p className="text-red-600 text-sm text-center">{errorMessage}</p>}
      {loggedIn && <p className="text-xs text-slate-400 text-center">{t.autofilled}</p>}
    </form>
  );
}
