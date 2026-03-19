const services = [
  {
    tag: "01",
    title: "Brand Identity",
    body: "Full-spectrum identity systems — logomarks, typography, color, voice, and the motion rules that tie it all together.",
    icon: (
      <svg className="svc-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    tag: "02",
    title: "Editorial & Print",
    body: "Annual reports, books, and campaign collateral that command attention on every surface — physical and digital.",
    icon: (
      <svg className="svc-icon" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M7 7h10M7 12h10M7 17h6" />
      </svg>
    ),
  },
  {
    tag: "03",
    title: "Digital Experience",
    body: "Websites and interfaces that feel like the brand, not just a digital version of it. Built with obsessive typographic precision.",
    icon: (
      <svg className="svc-icon" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 20h8M12 18v2" />
      </svg>
    ),
  },
];
export default function Services(){
    return (
  <section className="services">
    <div className="services-header">
      <h2 className="services-heading">
        What We<br />Do Best
      </h2>
    </div>
    <div className="services-grid">
      {services.map(({ tag, title, body, icon }) => (
        <div key={title} className="svc-card">
          <div className="svc-icon-wrap">{icon}</div>
          <p className="svc-tag">{tag}</p>
          <h3 className="svc-title">{title}</h3>
          <p className="svc-body">{body}</p>
          <button className="svc-cta">
            Learn more
            <svg className="svc-arrow" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </section>
);
}