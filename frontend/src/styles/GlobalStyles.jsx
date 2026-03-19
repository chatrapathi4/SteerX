export default function GlobalStyles() {
  return (
    <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f2f2f2;
      --ink: #111111;
      --ink-soft: #838282;
      --ink-muted: #b6b5b5;
      --echo-1: #bfbfbf;
      --echo-2: #c9c9c9;
      --echo-3: #d1d1d1;
      --echo-4: #d9d9d9;
      --dark: #1e1e1e;
      --card-border: rgba(30,30,30,0.10);
      --white: #f6f6f6;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'Satoshi', 'DM Sans', sans-serif;
      font-weight: 500;
      overflow-x: hidden;
    }
 
    /* ── NAV ── */
    .nav {
      position: sticky; top: 0; z-index: 100;
      height: 80px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px;
      background: rgba(242,242,242,0.90);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--card-border);
    }
    .nav-logo {
      font-family: 'Clash Display', sans-serif;
      font-weight: 700; font-size: 22px;
      letter-spacing: -0.04em; color: var(--ink);
      text-decoration: none;
    }
    .nav-links { display: flex; gap: 36px; align-items: center; }
    .nav-link {
      font-family: 'Satoshi', sans-serif;
      font-size: 13px; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--ink); text-decoration: none;
      transition: color 120ms ease;
      cursor: pointer;
    }
    .nav-link:hover { color: var(--ink-muted); }
    .nav-cta {
      font-family: 'Satoshi', sans-serif;
      font-size: 13px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--ink); background: transparent;
      border: 1px solid var(--dark);
      padding: 10px 22px; border-radius: 9999px;
      cursor: pointer;
      transition: background 200ms ease, color 200ms ease;
    }
    .nav-cta:hover { background: var(--dark); color: var(--white); }
 
    /* ── HERO ── */
    .hero {
      min-height: 85vh;
      display: flex; flex-direction: column;
      justify-content: center; align-items: center;
      padding: 80px 48px;
      overflow: hidden;
      position: relative;
    }
    .hero-eyebrow {
      font-family: 'Satoshi', sans-serif;
      font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.16em;
      color: var(--ink-muted);
      margin-bottom: 40px;
    }
    .echo-stack {
      position: relative;
      display: inline-block;
      line-height: 0.9;
    }
    .echo-layer {
      font-family: 'Clash Display', sans-serif;
      font-weight: 700;
      font-size: clamp(80px, 11vw, 180px);
      letter-spacing: -0.05em;
      line-height: 0.9;
      white-space: nowrap;
      user-select: none;
    }
    .echo-layer.fg {
      position: relative; z-index: 5;
      color: var(--ink);
    }
    .echo-layer.bg {
      position: absolute; top: 0; left: 0;
      pointer-events: none;
    }
    .echo-layer.e1 { color: var(--echo-1); transform: translate(-0.04em, -0.04em); z-index: 4; }
    .echo-layer.e2 { color: var(--echo-2); transform: translate(-0.08em, -0.08em); z-index: 3; }
    .echo-layer.e3 { color: var(--echo-3); transform: translate(-0.12em, -0.12em); z-index: 2; }
    .echo-layer.e4 { color: var(--echo-4); transform: translate(-0.16em, -0.16em); z-index: 1; }
 
    .hero-sub {
      font-family: 'Satoshi', sans-serif;
      font-size: 17px; font-weight: 500;
      color: var(--ink-soft); max-width: 480px;
      text-align: center; line-height: 1.65;
      margin-top: 48px;
    }
    .hero-ctas {
      display: flex; gap: 16px; margin-top: 40px;
    }
    .btn-primary {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.10em;
      background: var(--ink); color: var(--white);
      border: none; padding: 14px 32px; border-radius: 9999px;
      cursor: pointer;
      transition: background 200ms ease, transform 200ms ease;
    }
    .btn-primary:hover { background: #333; transform: translateY(-2px); }
    .btn-ghost {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.10em;
      background: transparent; color: var(--ink);
      border: 1px solid var(--card-border);
      padding: 14px 32px; border-radius: 9999px;
      cursor: pointer;
      transition: border-color 200ms ease, transform 200ms ease;
    }
    .btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }
 
    /* ── MARQUEE ── */
    .marquee-row {
      overflow: hidden; border-top: 1px solid var(--card-border);
      border-bottom: 1px solid var(--card-border);
      padding: 18px 0; background: var(--bg);
    }
    .marquee-track {
      display: flex; gap: 64px;
      animation: marquee 22s linear infinite;
      width: max-content;
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee-item {
      font-family: 'Clash Display', sans-serif;
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--ink-muted); white-space: nowrap;
    }
    .marquee-dot { color: var(--ink); margin: 0 8px; }
 
    /* ── PHILOSOPHY ── */
    .philosophy {
      padding: 120px 48px;
      max-width: 1200px; margin: 0 auto;
    }
    .section-divider {
      width: 1px; height: 80px;
      background: rgba(30,30,30,0.10);
      margin: 0 auto 64px;
    }
    .philosophy-quote {
      font-family: 'Clash Display', sans-serif;
      font-weight: 700;
      font-size: clamp(32px, 4.5vw, 60px);
      letter-spacing: -0.04em; line-height: 1.08;
      text-align: center; max-width: 900px;
      margin: 0 auto 80px;
      color: var(--ink);
    }
    .philosophy-quote em {
      font-family: 'Playfair Display', serif;
      font-style: italic; font-weight: 400;
    }
    .phil-grid {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 32px; margin-top: 64px;
    }
    .phil-col h3 {
      font-family: 'Clash Display', sans-serif;
      font-size: 20px; font-weight: 700;
      letter-spacing: -0.03em; margin-bottom: 14px;
    }
    .phil-col p {
      font-family: 'Satoshi', sans-serif;
      font-size: 15px; font-weight: 400;
      color: var(--ink-soft); line-height: 1.75;
    }
 
    /* ── SHOWCASE GRID ── */
    .showcase {
      padding: 0 48px 120px;
      max-width: 1400px; margin: 0 auto;
    }
    .section-label {
      font-family: 'Satoshi', sans-serif;
      font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.16em;
      color: var(--ink-muted); margin-bottom: 40px;
    }
    .showcase-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 340px 340px;
      gap: 16px;
    }
    .sc-card {
      overflow: hidden; position: relative;
      background: #d0cfcf;
      cursor: pointer;
    }
    .sc-card img, .sc-card .sc-img-inner {
      width: 100%; height: 100%;
      object-fit: cover;
      filter: grayscale(20%);
      transition: filter 700ms cubic-bezier(0.77,0,0.175,1),
                  transform 700ms cubic-bezier(0.77,0,0.175,1);
    }
    .sc-card:hover img,
    .sc-card:hover .sc-img-inner { filter: grayscale(0%); transform: scale(1.05); }
    .sc-card-label {
      position: absolute; bottom: 20px; left: 20px;
      font-family: 'Satoshi', sans-serif; font-size: 12px;
      font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.10em; color: #fff;
      background: rgba(17,17,17,0.55);
      padding: 6px 14px; border-radius: 9999px;
      backdrop-filter: blur(6px);
      opacity: 0; transition: opacity 300ms ease;
    }
    .sc-card:hover .sc-card-label { opacity: 1; }
 
    /* card layout positions */
    .sc-a { grid-column: 1 / 9; grid-row: 1; border-radius: 4px; }
    .sc-b { grid-column: 9 / 13; grid-row: 1 / 3; border-radius: 9999px; }
    .sc-c { grid-column: 1 / 6; grid-row: 2; border-radius: 9999px; aspect-ratio: 1; }
    .sc-d { grid-column: 6 / 9; grid-row: 2; border-radius: 4px; }
 
    /* pill inner wrapper */
    .pill-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .pill-circle {
      width: 100px; height: 100px; border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.6);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 400ms ease;
      backdrop-filter: blur(4px);
    }
    .sc-b:hover .pill-circle { opacity: 1; }
    .pill-circle span {
      font-family: 'Satoshi', sans-serif;
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.10em; text-transform: uppercase;
      color: #fff; text-align: center; line-height: 1.4;
    }
 
    /* colored placeholder blocks */
    .sc-img-inner {
      display: block;
    }
    .c-slate  { background: linear-gradient(135deg,#8a8a8a,#c0c0c0); }
    .c-warm   { background: linear-gradient(135deg,#b09080,#d4c4b8); }
    .c-cool   { background: linear-gradient(135deg,#7a8fa0,#b8c8d4); }
    .c-mid    { background: linear-gradient(135deg,#a0a090,#c8c8b8); }
 
    /* ── SERVICE CARDS ── */
    .services {
      padding: 0 48px 120px;
      max-width: 1200px; margin: 0 auto;
    }
    .services-header {
      display: flex; justify-content: space-between;
      align-items: flex-end; margin-bottom: 48px;
    }
    .services-heading {
      font-family: 'Clash Display', sans-serif;
      font-size: clamp(32px, 3.5vw, 52px);
      font-weight: 700; letter-spacing: -0.04em;
      line-height: 1.0;
    }
    .services-grid {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 24px;
    }
    .svc-card {
      border: 1px solid var(--card-border);
      padding: 40px 36px;
      background: transparent;
      transition: background 300ms ease;
      cursor: pointer;
      border-radius: 2px;
    }
    .svc-card:hover { background: #ffffff; }
    .svc-icon-wrap {
      width: 64px; height: 64px;
      border: 1px solid var(--card-border);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 32px;
      transition: transform 400ms cubic-bezier(0.77,0,0.175,1);
    }
    .svc-card:hover .svc-icon-wrap { transform: rotate(12deg); }
    .svc-icon {
      width: 28px; height: 28px;
      stroke: var(--ink); fill: none;
      stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round;
    }
    .svc-tag {
      font-family: 'Satoshi', sans-serif;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.14em;
      color: var(--ink-muted); margin-bottom: 12px;
    }
    .svc-title {
      font-family: 'Clash Display', sans-serif;
      font-size: 24px; font-weight: 700;
      letter-spacing: -0.03em; margin-bottom: 16px;
    }
    .svc-body {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 400;
      color: var(--ink-soft); line-height: 1.75;
      margin-bottom: 36px;
    }
    .svc-cta {
      display: flex; align-items: center; gap: 8px;
      font-family: 'Satoshi', sans-serif;
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.10em; text-transform: uppercase;
      color: var(--ink); background: none; border: none;
      cursor: pointer; padding: 0;
      transition: gap 200ms ease;
    }
    .svc-card:hover .svc-cta { gap: 14px; }
    .svc-arrow {
      width: 16px; height: 16px; stroke: var(--ink); fill: none;
      stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
      flex-shrink: 0;
    }
 
    /* ── STATS BAR ── */
    .stats-bar {
      padding: 80px 48px;
      border-top: 1px solid var(--card-border);
      border-bottom: 1px solid var(--card-border);
      display: grid; grid-template-columns: repeat(4,1fr);
      gap: 48px; max-width: 1200px; margin: 0 auto;
    }
    .stat-item { text-align: center; }
    .stat-num {
      font-family: 'Clash Display', sans-serif;
      font-size: clamp(40px, 5vw, 72px);
      font-weight: 700; letter-spacing: -0.05em;
      line-height: 1; margin-bottom: 10px;
    }
    .stat-label {
      font-family: 'Satoshi', sans-serif;
      font-size: 13px; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.12em;
      color: var(--ink-muted);
    }
 
    /* ── FOOTER ── */
    .footer {
      background: var(--dark); padding: 80px 48px 48px;
    }
    .footer-top {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px; padding-bottom: 64px;
      border-bottom: 1px solid rgba(246,246,246,0.05);
    }
    .footer-brand-name {
      font-family: 'Clash Display', sans-serif;
      font-size: 28px; font-weight: 700;
      letter-spacing: -0.04em;
      color: var(--white); margin-bottom: 16px;
    }
    .footer-brand-desc {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 400;
      color: rgba(246,246,246,0.6);
      line-height: 1.75; max-width: 280px;
    }
    .footer-col-title {
      font-family: 'Satoshi', sans-serif;
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.14em;
      color: rgba(246,246,246,0.4);
      margin-bottom: 24px;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 14px; }
    .footer-links a {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 500;
      color: rgba(246,246,246,0.6);
      text-decoration: none;
      transition: color 150ms ease;
    }
    .footer-links a:hover { color: var(--white); }
    .footer-contact-item {
      display: flex; align-items: flex-start; gap: 12px;
      margin-bottom: 14px;
    }
    .footer-contact-icon {
      width: 16px; height: 16px; stroke: rgba(246,246,246,0.4);
      fill: none; stroke-width: 1.5;
      stroke-linecap: round; stroke-linejoin: round;
      flex-shrink: 0; margin-top: 2px;
    }
    .footer-contact-text {
      font-family: 'Satoshi', sans-serif;
      font-size: 14px; font-weight: 400;
      color: rgba(246,246,246,0.6); line-height: 1.5;
    }
    .footer-bottom {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 40px;
    }
    .footer-copy {
      font-family: 'Satoshi', sans-serif;
      font-size: 13px; font-weight: 400;
      color: rgba(246,246,246,0.30);
    }
    .footer-socials { display: flex; gap: 20px; }
    .social-btn {
      width: 36px; height: 36px; border-radius: 9999px;
      border: 1px solid rgba(246,246,246,0.12);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; background: transparent;
      transition: border-color 200ms ease, background 200ms ease;
    }
    .social-btn:hover { border-color: rgba(246,246,246,0.40); background: rgba(246,246,246,0.06); }
    .social-icon {
      width: 14px; height: 14px; stroke: rgba(246,246,246,0.5);
      fill: none; stroke-width: 1.5;
      stroke-linecap: round; stroke-linejoin: round;
    }
 
    @media (max-width: 900px) {
      .nav { padding: 0 24px; }
      .hero { padding: 60px 24px; }
      .philosophy { padding: 80px 24px; }
      .phil-grid { grid-template-columns: 1fr; gap: 40px; }
      .showcase { padding: 0 24px 80px; }
      .showcase-grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
      }
      .sc-a { grid-column: 1 / 3; grid-row: 1; }
      .sc-b { grid-column: 2 / 3; grid-row: 2 / 4; border-radius: 9999px; }
      .sc-c { grid-column: 1 / 2; grid-row: 2; border-radius: 9999px; }
      .sc-d { grid-column: 1 / 2; grid-row: 3; }
      .services { padding: 0 24px 80px; }
      .services-grid { grid-template-columns: 1fr; }
      .stats-bar { grid-template-columns: repeat(2,1fr); padding: 60px 24px; }
      .footer-top { grid-template-columns: 1fr 1fr; padding: 48px 0; }
      .footer { padding: 60px 24px 40px; }
    }
  `}</style>
  );
}