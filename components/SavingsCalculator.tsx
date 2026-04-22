'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BORDER = '#F0E8E0';

interface Props { lang: 'vi' | 'en'; }

export default function SavingsCalculator({ lang }: Props) {
  const [orders, setOrders] = useState(20);
  const [rawValue, setRawValue] = useState(200000);
  const [displayValue, setDisplayValue] = useState('200,000₫');

  const isVI = lang === 'vi';
  const annualSaving = rawValue * 0.125 * orders * 365;
  const usd = annualSaving / 25000;

  const fmt = useCallback((n: number) => {
    if (isVI) {
      if (n >= 1e9) return (n / 1e9).toFixed(1) + ' tỷ';
      if (n >= 1e6) return Math.round(n / 1e6) + ' triệu';
      return new Intl.NumberFormat('vi-VN').format(Math.round(n));
    }
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return Math.round(n / 1e6) + 'M';
    return new Intl.NumberFormat('en').format(Math.round(n));
  }, [isVI]);

  const fmtVal = (n: number) => new Intl.NumberFormat('en').format(n) + '₫';
  const fmtUSD = () => '≈ $' + (usd >= 1000 ? (usd / 1000).toFixed(1) + 'K' : Math.round(usd)) + ' USD';

  const clampOrders = (n: number) => Math.max(1, Math.min(500, n));
  const clampValue = (n: number) => Math.max(10000, Math.min(5000000, n));

  const adjOrders = (d: number) => setOrders(o => clampOrders(o + d));
  const adjValue = (d: number) => {
    const next = clampValue(rawValue + d);
    setRawValue(next);
    setDisplayValue(fmtVal(next));
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = String(rawValue);
    setDisplayValue(String(rawValue));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 10000;
    const clamped = clampValue(parsed);
    setRawValue(clamped);
    setDisplayValue(fmtVal(clamped));
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
    const parsed = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
    if (parsed >= 10000) setRawValue(clampValue(parsed));
  };

  return (
    <section style={{ background: '#FDF5EF', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 40px)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <style>{`
        .calc-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 56px; align-items: center; }
        .calc-divider { background: ${BORDER}; height: 100%; min-height: 200px; }
        .calc-result { padding-left: 8px; }
        @media (max-width: 768px) {
          .calc-grid { grid-template-columns: 1fr; gap: 36px; }
          .calc-divider { display: none; }
          .calc-result { padding-left: 0; border-top: 2px dashed ${BORDER}; padding-top: 32px; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
          {isVI ? 'Tính toán tiết kiệm' : 'Savings calculator'}
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 48, maxWidth: 620 }}>
          {isVI ? 'Quán bạn có thể tiết kiệm bao nhiêu?' : 'How much could your restaurant save?'}
        </h2>

        <div className="calc-grid">
          <div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
                {isVI ? 'Số đơn mỗi ngày từ app giao hàng' : 'Daily orders from delivery apps'}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden', background: '#fff', height: 56 }}>
                <button onClick={() => adjOrders(-5)} style={{ width: 52, height: '100%', border: 'none', background: '#F7F3EF', fontSize: 22, color: '#555', cursor: 'pointer', flexShrink: 0 }}>−</button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1.5px solid ${BORDER}`, borderRight: `1.5px solid ${BORDER}`, height: '100%', padding: '0 8px' }}>
                  <input type="number" value={orders} min={1} max={500}
                    onChange={e => setOrders(clampOrders(parseInt(e.target.value) || 1))}
                    style={{ border: 'none', outline: 'none', fontSize: 22, fontWeight: 700, color: '#1a1a1a', background: 'transparent', textAlign: 'center', width: '100%', minWidth: 0, fontFamily: 'inherit' }} />
                </div>
                <button onClick={() => adjOrders(5)} style={{ width: 52, height: '100%', border: 'none', background: '#F7F3EF', fontSize: 22, color: '#555', cursor: 'pointer', flexShrink: 0 }}>+</button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
                {isVI ? 'Giá trị trung bình mỗi đơn' : 'Average order value'}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden', background: '#fff', height: 56 }}>
                <button onClick={() => adjValue(-50000)} style={{ width: 52, height: '100%', border: 'none', background: '#F7F3EF', fontSize: 22, color: '#555', cursor: 'pointer', flexShrink: 0 }}>−</button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1.5px solid ${BORDER}`, borderRight: `1.5px solid ${BORDER}`, height: '100%', padding: '0 8px' }}>
                  <input type="text" value={displayValue}
                    onFocus={onFocus} onBlur={onBlur} onChange={onValueChange}
                    style={{ border: 'none', outline: 'none', fontSize: 22, fontWeight: 700, color: '#1a1a1a', background: 'transparent', textAlign: 'center', width: '100%', minWidth: 0, fontFamily: 'inherit' }} />
                </div>
                <button onClick={() => adjValue(50000)} style={{ width: 52, height: '100%', border: 'none', background: '#F7F3EF', fontSize: 22, color: '#555', cursor: 'pointer', flexShrink: 0 }}>+</button>
              </div>
            </div>
          </div>

          <div className="calc-divider" />

          <div className="calc-result">
            <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>
              {isVI ? 'Bạn có thể tiết kiệm' : 'You could save'}
            </p>
            <p style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-2px', lineHeight: 1, margin: '0 0 8px' }}>
              {fmt(annualSaving)}
            </p>
            <p style={{ fontSize: 16, color: '#444', fontWeight: 600, margin: '0 0 4px' }}>
              {isVI ? '₫ mỗi năm' : '₫ per year'}
            </p>
            <p style={{ fontSize: 14, color: '#888', margin: '0 0 28px' }}>{fmtUSD()}</p>
            <Link href="/register" style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {isVI ? 'Đặt lịch Demo →' : 'Book A Demo →'}
            </Link>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#aaa', marginTop: 32, lineHeight: 1.7, maxWidth: 700 }}>
          {isVI
            ? 'Ước tính dựa trên mức hoa hồng trung bình 27.5% của các ứng dụng giao đồ ăn. Số liệu thực tế có thể thay đổi tùy nền tảng.'
            : 'Annually based on an average 27.5% commission rate charged by third-party apps. Actual figures vary by platform.'}
        </p>
      </div>
    </section>
  );
}