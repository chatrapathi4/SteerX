const items = [
  "Certificates",
  "Competitions",
  "Internships",
  "Events",
  "Achievements",
  "Certifications",
  "Certificates",
  "Competitions",
  "Internships",
];

export default function Marquee() {
  return (
    <div className="marquee-row">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}