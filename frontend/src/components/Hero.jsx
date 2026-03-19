import EchoStack from "./EchoStack";

export default function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">Student Achievement Platform</p>

      <EchoStack word="STEERX" />

      <p className="hero-sub">
        Store your achievements, certifications, and participation proofs in
        one place. Discover internships, events, and opportunities shared by
        professors.
      </p>

      <div className="hero-ctas">
        <button className="btn-primary">Get Started</button>
        <button className="btn-ghost">Learn More</button>
      </div>
    </section>
  );
}