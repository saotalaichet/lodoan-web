'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRIMARY = '#9B1C1C';
const BORDER = '#F0E8E0';

interface Props { lang: 'vi' | 'en'; }

export default function SavingsCalculator({ lang }: Props) {
  const [orders, setOrders] = useState(20);
  const [ordersDisplay, setOrdersDisplay] = useState('20');
  const [rawValue, setRawValue] = useState(200000);
  const [displayValue, setDisplayValue] = useState('200,000₫');
  const [editing, setEditing] = useState(false);

  const isVI = lang === 'vi';

  const annualSaving = rawValue * 0.125 * orders * 365;
  const usd = annualSaving / 25000;

  function fmt(n: number) {
    if (isVI) {
      if (n >= 1e9) return (n / 1e9).toFixed(1) + ' tỷ';
      if (n >= 1e6) return Math.round(n / 1e6) + ' triệu';
      return new Intl.NumberFormat('vi-VN').format(Math.round(n));
    }
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return Math.round(n / 1e6) + 'M';
    return new Intl.NumberFormat('en').format(Math.round(n));
  }

  function fmtVal(n: number) {
    return new Intl.NumberFormat('en').format(n) + '₫';
  }

  function fmtUSD() {
    return '≈ $' + (usd >= 1000 ? (usd / 1000).toFixed(1) + 'K' : Math.round(usd)) + ' USD';
  }

  // ORDERS handlers
  function adjOrders(d: number) {
    const next = Math.max(1, Math.min(500, orders + d));
    setOrders(next);
    setOrdersDisplay(String(next));
  }

  function onOrdersChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOrdersDisplay(e.target.value);
    const parsed = parseInt(e.target.value);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 500) {
      setOrders(parsed);
    }
  }

  function onOrdersBlur() {
    const parsed = parseInt(ordersDisplay);
    if (isNaN(parsed) || parsed < 1) {
      setOrders(1);
      setOrdersDisplay('1');
    } else if (parsed > 500) {
      setOrders(500);
      setOrdersDisplay('500');
    } else {
      setOrders(parsed);
      setOrdersDisplay(String(parsed));
    }
  }

  // VALUE handlers
  function adjValue(d: number) {
    const next = Math.max(10000, Math.min(5000000, rawValue + d));
    setRawValue(next);
    setDisplayValue(fmtVal(next));
  }

  function onFocus() {
    setEditing(true);
    setDisplayValue(String(rawValue));
  }

  function onBlur() {
    setEditing(false);
    const parsed = parseInt(displayValue.replace(/[^0-9]/g, ''));
    if (isNaN(parsed) || parsed < 10000) {
      setRawValue(10000);
      setDisplayValue(fmtVal(10000));
    } else if (parsed > 5000000) {
      setRawValue(5000000);
      setDisplayValue(fmtVal(5000000));
    } else {
      setRawValue(parsed);
      setDisplayValue(fmtVal(parsed));
    }
  }

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDisplayValue(e.target.value);
    const parsed = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(parsed) && parsed >= 10000 && parsed <= 5000000) {
      setRawValue(parsed);
    }
  }

  const inputStyle: React.CSSProperties = {
    border: 'none', outline: 'none', fontSize: 22, fontWeight: 700,
    color: '#1a1a1a', background: 'transparent', textAlign: 'center',
    width: '100%', minWidth: 0, fontFamily: 'inherit',
  };

  const stepperStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center',
    border: `1.5px solid ${BORDER}`, borderRadius: 12,
    overflow: 'hidden', background: '#fff',
  };

  const btnStyle: React.CSSProperties = {
    width: 52, height: 56, border: 'none', background: '#F7F3EF',
    fontSize: 20, color: '#666', cursor: 'pointer', flexShrink: 0,
  };

  const valWrap: React.CSSProperties = {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderLeft: `1.5px solid ${BORDER}`, borderRight: `1.5px solid ${BORDER}`,
    padding: '0 10px',
  };

  return (
    <section style={{ background: '#FDF5EF', padding: '72px 40px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
          {isVI ? 'Tính toán tiết kiệm' : 'Savings calculator'}
        </p>
        <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 48, maxWidth: 600 }}>
          {isVI ? 'Quán bạn có thể tiết kiệm bao nhiêu?' : 'How much could your restaurant save?'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 56, alignItems: 'center' }}>
          {/* Left — inputs */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
                {isVI ? 'Số đơn mỗi ngày từ app giao hàng' : 'Daily orders from delivery apps'}
              </label>
              <div style={stepperStyle}>
                <button style={btnStyle} onClick={() => adjOrders(-5)}>−</button>
                <div style={valWrap}>
                  <input
                    type="number"
                    value={ordersDisplay}
                    min={1}
                    max={500}
                    onChange={onOrdersChange}
                    onBlur={onOrdersBlur}
                    onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                    style={inputStyle}
                  />
                </div>
                <button style={btnStyle} onClick={() => adjOrders(5)}>+</button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
                {isVI ? 'Giá trị trung bình mỗi đơn' : 'Average order value'}
              </label>
              <div style={stepperStyle}>
                <button style={btnStyle} onClick={() => adjValue(-50000)}>−</button>
                <div style={valWrap}>
                  <input
                    type="text"
                    value={displayValue}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onValueChange}
                    onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                    style={inputStyle}
                  />
                </div>
                <button style={btnStyle} onClick={() => adjValue(50000)}>+</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: BORDER, height: '100%', minHeight: 180 }} />

          {/* Right — result */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 10px' }}>
              {isVI ? 'Bạn có thể tiết kiệm' : 'You could save'}
            </p>
            <p style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-3px', lineHeight: 1, margin: '0 0 6px' }}>
              {fmt(annualSaving)}
            </p>
            <p style={{ fontSize: 16, color: '#555', fontWeight: 500, margin: '0 0 4px' }}>
              {isVI ? '₫ mỗi năm' : '₫ per year'}
            </p>
            <p style={{ fontSize: 14, color: '#999', margin: '0 0 28px' }}>{fmtUSD()}</p>
            <Link href="/register" style={{ display: 'inline-block', background: PRIMARY, color: '#fff', padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {isVI ? 'Đặt lịch Demo →' : 'Book A Demo →'}
            </Link>
          </div>
        </div>

        <p style={{ fontSize: 12, color: '#aaa', marginTop: 32, lineHeight: 1.6 }}>
          {isVI
            ? 'Ước tính dựa trên mức hoa hồng trung bình 27.5% của các ứng dụng giao đồ ăn. Số liệu thực tế có thể thay đổi tùy nền tảng.'
            : 'Annually based on an average 27.5% commission rate charged by third-party apps. Actual figures vary by platform.'}
        </p>
      </div>
    </section>
  );
}