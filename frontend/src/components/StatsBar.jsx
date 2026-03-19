const stats = [
  { num: "120+", label: "Brands Crafted" },
  { num: "14", label: "Years of Practice" },
  { num: "3×", label: "D&AD Pencil Winner" },
  { num: "28", label: "Countries Served" },
];
export default function StatsBar(){
    return (
  <div className="stats-bar" style={{ borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)" }}>
    {stats.map(({ num, label }) => (
      <div key={label} className="stat-item">
        <div className="stat-num">{num}</div>
        <div className="stat-label">{label}</div>
      </div>
    ))}
  </div>
);
}