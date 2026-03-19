export default function Showcase(){
    return (
  <section className="showcase">
    <p className="section-label">Selected Work — 2024</p>
    <div className="showcase-grid">
      {/* A — Large 8-col rectangle */}
      <div className="sc-card sc-a">
        <div className="sc-img-inner c-slate" />
        <span className="sc-card-label">Velour — Brand Identity</span>
      </div>
 
      {/* B — Vertical 4-col pill */}
      <div className="sc-card sc-b">
        <div className="sc-img-inner c-warm" />
        <div className="pill-overlay">
          <div className="pill-circle">
            <span>View<br />Project</span>
          </div>
        </div>
        <span className="sc-card-label">Maison Editorial</span>
      </div>
 
      {/* C — Circle 5-col */}
      <div className="sc-card sc-c">
        <div className="sc-img-inner c-cool" />
        <span className="sc-card-label">Orbit — Motion</span>
      </div>
 
      {/* D — Wide 7-col */}
      <div className="sc-card sc-d">
        <div className="sc-img-inner c-mid" />
        <span className="sc-card-label">Sable — Web</span>
      </div>
    </div>
  </section>
);
}