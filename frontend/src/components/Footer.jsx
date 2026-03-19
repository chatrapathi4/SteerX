export default function Footer(){
    return (
  <footer className="footer">
    <div className="footer-top">
      {/* Brand */}
      <div>
        <div className="footer-brand-name">STEERX</div>
        <p className="footer-brand-desc">
          An independent design studio committed to building identities that endure.
          Based in Amsterdam, working everywhere.
        </p>
      </div>
 
      {/* Nav */}
      <div>
        <p className="footer-col-title">Navigation</p>
        <ul className="footer-links">
          {["Work", "Services", "Philosophy", "About", "Journal"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>
 
      {/* Company */}
      <div>
        <p className="footer-col-title">Company</p>
        <ul className="footer-links">
          {["Studio", "Careers", "Press", "Privacy Policy", "Terms"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>
 
      {/* Contact */}
      <div>
        <p className="footer-col-title">Contact</p>
        {[
          {
            icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17z" />,
            text: "+31 20 456 7890",
          },
          {
            icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
            text: "hello@forma.studio",
          },
          {
            icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
            text: "Keizersgracht 122\nAmsterdam, NL",
          },
        ].map(({ icon, text }, i) => (
          <div key={i} className="footer-contact-item">
            <svg className="footer-contact-icon" viewBox="0 0 24 24">{icon}</svg>
            <span className="footer-contact-text" style={{ whiteSpace: "pre-line" }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
 
    <div className="footer-bottom">
      <p className="footer-copy">© 2024 Forma Studio BV. All rights reserved.</p>
      <div className="footer-socials">
        {/* Instagram */}
        <button className="social-btn" aria-label="Instagram">
          <svg className="social-icon" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </button>
        {/* X / Twitter */}
        <button className="social-btn" aria-label="X">
          <svg className="social-icon" viewBox="0 0 24 24">
            <path d="M4 4l16 16M20 4L4 20" />
          </svg>
        </button>
        {/* LinkedIn */}
        <button className="social-btn" aria-label="LinkedIn">
          <svg className="social-icon" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </button>
      </div>
    </div>
  </footer>
);
}