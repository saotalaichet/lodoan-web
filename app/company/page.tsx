'use client';

import Link from 'next/link';

export default function CompanyPage() {
  return (
    <div style={{ fontFamily: 'var(--font-sans, system-ui)', background: '#FFFAF5', color: '#1a1a1a', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', borderBottom: '1px solid #f0e8e0' }}>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px' }}>OVENLY<span style={{ color: '#9B1C1C' }}>.</span></span>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link href="/register" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>For Restaurants</Link>
          <Link href="/contact" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>Contact</Link>
          <Link href="https://lodoan.vn" style={{ color: '#666', textDecoration: 'none', fontSize: 14 }}>LÒ ĐỒ ĂN</Link>
          <Link href="/register" style={{ background: '#9B1C1C', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '100px 48px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#fdf0ee', color: '#9B1C1C', border: '1px solid #f5cdc8', fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 100, letterSpacing: '0.3px', marginBottom: 28 }}>
          Restaurant Technology · Vietnam
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 5.5vw, 62px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20 }}>
          We help restaurants<br />
          sell more, <span style={{ color: '#9B1C1C' }}>stress less.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#666', maxWidth: 460, margin: '0 auto 36px', fontWeight: 300, lineHeight: 1.7 }}>
          Ovenly builds the tools that let restaurant owners focus on food — not spreadsheets, phone orders, or manual operations.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" style={{ background: '#9B1C1C', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
            Register Your Restaurant
          </Link>
          <Link href="https://lodoan.vn" style={{ background: 'transparent', color: '#1a1a1a', border: '1px solid #ddd', padding: '14px 28px', borderRadius: 8, fontSize: 15, textDecoration: 'none' }}>
            Visit LÒ ĐỒ ĂN
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #f0e8e0', borderBottom: '1px solid #f0e8e0' }}>
        {[
          { num: '7+', label: 'Restaurants onboarded' },
          { num: '0đ', label: 'Setup fee, ever' },
          { num: '24/7', label: 'Order management' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '32px 48px', borderRight: i < 2 ? '1px solid #f0e8e0' : 'none' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#9B1C1C', letterSpacing: '-1px', lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* What we do */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 48px' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#9B1C1C', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>What We Do</p>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 14, lineHeight: 1.1 }}>Three things that actually matter.</h2>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 420, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>We focus on measurable outcomes — not feature checklists.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#f0e8e0' }}>
          {[
            { num: '01', title: 'Increase Sales', text: 'Online ordering, marketplace listing, and promotions that bring in revenue beyond walk-ins.' },
            { num: '02', title: 'Streamline Operations', text: 'A tablet app for your kitchen, automatic order routing, and dashboards that cut daily friction.' },
            { num: '03', title: 'Retain Customers', text: 'Feedback collection, verified reviews, and data that shows which customers keep coming back.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#FFFAF5', padding: '32px 28px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#9B1C1C', marginBottom: 12 }}>{c.num}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#777', lineHeight: 1.65 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: '#f0e8e0', margin: '0 48px' }} />

      {/* Values */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 48px' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#9B1C1C', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 14 }}>How We Work</p>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 14, lineHeight: 1.1 }}>Our values, plainly.</h2>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 400, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>Four things we actually believe in.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {[
            { title: 'Client Obsession', text: "We only build what restaurant owners actually ask for. Their problem is our problem." },
            { title: 'Innovation', text: "We build tools that restaurants in Vietnam haven't had before — not copies of what exists." },
            { title: 'Collaboration', text: "We work alongside our restaurants, not just for them. Their feedback shapes every update." },
            { title: 'Data-Driven', text: "Every decision is backed by real numbers — order data, customer behavior, and sales trends." },
          ].map((v, i) => (
            <div key={i} style={{ paddingTop: 20, borderTop: '2px solid #9B1C1C' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>{v.title}</div>
              <div style={{ fontSize: 14, color: '#777', lineHeight: 1.65 }}>{v.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: '#9B1C1C', padding: '72px 48px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: 12 }}>Ready to grow your restaurant?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28, fontWeight: 300 }}>Free to start. No setup fee. We'll onboard you personally.</p>
        <Link href="/register" style={{ background: '#fff', color: '#9B1C1C', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
          Register Your Restaurant →
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderTop: '1px solid #f0e8e0' }}>
        <div style={{ fontSize: 13, color: '#aaa' }}>© 2026 Ovenly Technology</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['LÒ ĐỒ ĂN', 'https://lodoan.vn'], ['Privacy', '/privacy'], ['Contact', '/contact'], ['hello@ovenly.io', 'mailto:hello@ovenly.io']].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>

    </div>
  );
}