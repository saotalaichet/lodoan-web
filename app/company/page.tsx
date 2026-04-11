'use client';

import Link from 'next/link';
import { useState } from 'react';

const PRIMARY = '#9B1C1C';
const BG = '#FFFAF5';
const BORDER = '#F0E8E0';

export default function CompanyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: BG, color: '#1a1a1a', lineHeight: 1.6 }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 64, borderBottom: `1px solid ${BORDER}`, background: BG, position: 'sticky', top: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>OVENLY<span style={{ color: PRIMARY }}>.</span></span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="https://lodoan.vn" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>LÒ ĐỒ ĂN</Link>
          <Link href="/register" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>For Restaurants</Link>
          <Link href="/contact" style={{ color: '#555', textDecoration: 'none', fontSize: 14 }}>Contact</Link>
          <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Get Started — Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FDF0EE', color: PRIMARY, border: `1px solid #F5CDC8`, fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 100, letterSpacing: '0.5px', marginBottom: 24, textTransform: 'uppercase' as const }}>
            <span style={{ width: 6, height: 6, background: PRIMARY, borderRadius: '50%', display: 'inline-block' }} />
            Restaurant Technology · Vietnam
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 20, color: '#111' }}>
            Your restaurant,<br />
            <span style={{ color: PRIMARY }}>finally online</span><br />
            and growing.
          </h1>
          <p style={{ fontSize: 18, color: '#666', maxWidth: 420, lineHeight: 1.7, marginBottom: 36, fontWeight: 400 }}>
            Ovenly gives Vietnamese restaurants the technology to take online orders, manage operations, and keep customers coming back — without the complexity.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: PRIMARY, color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              Register Your Restaurant →
            </Link>
            <Link href="https://lodoan.vn" style={{ background: 'transparent', color: '#333', border: `1px solid ${BORDER}`, padding: '14px 28px', borderRadius: 10, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
              See the Marketplace
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#999', marginTop: 16 }}>Free to start. No setup fee. Onboarded personally.</p>
        </div>

        {/* Hero visual */}
        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, boxShadow: '0 4px 32px rgba(155,28,28,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ width: 40, height: 40, background: '#FDF0EE', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏪</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>NYMS Tea & Coffee</div>
              <div style={{ fontSize: 12, color: '#999' }}>Powered by Ovenly</div>
            </div>
            <div style={{ marginLeft: 'auto', background: '#EDFCF2', color: '#16A34A', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>● Open</div>
          </div>
          {[
            { label: 'Orders today', value: '24', icon: '📦', up: true },
            { label: 'Revenue today', value: '1,840,000₫', icon: '💰', up: true },
            { label: 'Avg. rating', value: '4.8 ⭐', icon: '⭐', up: true },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 2 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: '#666' }}>{item.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{item.value}</span>
                <span style={{ fontSize: 11, background: '#EDFCF2', color: '#16A34A', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>↑</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, background: '#FDF0EE', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: PRIMARY, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🔔</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>New order — Mang về</div>
              <div style={{ fontSize: 12, color: '#888' }}>Phở đặc biệt × 2 &nbsp;·&nbsp; 180,000₫</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { num: '7+', label: 'Restaurants onboarded' },
            { num: '0₫', label: 'Setup fee, ever' },
            { num: '< 2 min', label: 'Average order response time' },
            { num: '100%', label: 'Online, 24/7' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '28px 40px', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: PRIMARY, letterSpacing: '-1px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>What We Do</p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 14, lineHeight: 1.1 }}>Everything your restaurant needs<br />to compete online.</h2>
          <p style={{ fontSize: 16, color: '#666', maxWidth: 480, margin: '0 auto', fontWeight: 400, lineHeight: 1.7 }}>No complexity. No 40% commission fees. Just the tools that move the needle.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            {
              icon: '📈',
              title: 'Increase Sales',
              text: 'Get listed on LÒ ĐỒ ĂN marketplace, take direct online orders, run promotions, and reach customers who would never have found you otherwise.',
              items: ['Online ordering page', 'Marketplace listing', 'Promo codes & discounts'],
            },
            {
              icon: '⚡',
              title: 'Streamline Operations',
              text: 'A tablet app rings when a new order comes in. Confirm it in one tap, set a pickup time, and manage your whole menu from the same screen.',
              items: ['Tablet order management', 'Real-time notifications', 'Menu & availability control'],
            },
            {
              icon: '🔁',
              title: 'Retain Customers',
              text: 'Automated feedback emails, a verified review system, and an owner dashboard that shows you exactly what\'s working and what isn\'t.',
              items: ['Post-order feedback emails', 'Google review routing', 'Revenue & order analytics'],
            },
          ].map((f, i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
              <div style={{ width: 48, height: 48, background: '#FDF0EE', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{f.icon}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>{f.text}</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {f.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
                    <span style={{ width: 16, height: 16, background: '#FDF0EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: PRIMARY, fontWeight: 800 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>How It Works</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1 }}>Up and running in days, not months.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, position: 'relative' }}>
            {[
              { step: '01', title: 'Register', text: 'Fill out a quick form. Our team contacts you within 24 hours.' },
              { step: '02', title: 'We set you up', text: 'We onboard your menu, photos, and settings. You don\'t touch a line of code.' },
              { step: '03', title: 'Go live', text: 'Your restaurant goes live on LÒ ĐỒ ĂN and gets its own ordering page.' },
              { step: '04', title: 'Grow', text: 'Orders come in. You manage them on the tablet. We handle the rest.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, background: PRIMARY, color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, margin: '0 auto 16px' }}>{s.step}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Values */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: PRIMARY, letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 12 }}>Our Values</p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>We built this for restaurant owners, not investors.</h2>
            <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7, marginBottom: 0 }}>
              Ovenly exists because Vietnamese restaurants deserve better tools. We charge a fair commission, we onboard you personally, and we answer when you call.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { icon: '🎯', title: 'Client Obsession', text: 'We only build what restaurant owners actually need. Their problem is our problem.' },
              { icon: '💡', title: 'Innovation', text: 'Tools Vietnamese restaurants haven\'t had before — not copies of what exists.' },
              { icon: '🤝', title: 'Collaboration', text: 'We work alongside our restaurants. Their feedback shapes every update we ship.' },
              { icon: '📊', title: 'Data-Driven', text: 'Every decision backed by real order data, not guesswork or assumptions.' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{v.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: PRIMARY }}>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 14, lineHeight: 1.1 }}>
            Ready to put your restaurant online?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Free to start. We'll set everything up for you and have you live within a week.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/register" style={{ background: '#fff', color: PRIMARY, padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Register Your Restaurant →
            </Link>
            <Link href="mailto:hello@ovenly.io" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)', padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
              hello@ovenly.io
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 16 }}>
        <div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px' }}>OVENLY<span style={{ color: PRIMARY }}>.</span></span>
          <span style={{ fontSize: 13, color: '#aaa', marginLeft: 16 }}>© 2026 Ovenly Technology</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
          {[
            ['LÒ ĐỒ ĂN', 'https://lodoan.vn'],
            ['For Restaurants', '/register'],
            ['Privacy', '/privacy'],
            ['Terms', '/terms'],
            ['Contact', '/contact'],
            ['hello@ovenly.io', 'mailto:hello@ovenly.io'],
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>

    </div>
  );
}