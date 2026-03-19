export default function Philosophy(){
    return  (
  <section className="philosophy">
    <div className="section-divider" />
    <p className="philosophy-quote">
      Great design isn't decoration — it's the <em>language</em> a brand
      uses to speak before a single word is read.
    </p>
    <div className="phil-grid">
      {[
        {
          title: "Craft Over Speed",
          body: "We refuse to cut corners. Every kerning decision, every color choice is deliberate. Quality is not a deliverable — it's our baseline.",
        },
        {
          title: "Systems Thinking",
          body: "We build design systems, not one-offs. Every identity we create is a living framework that scales across mediums and decades.",
        },
        {
          title: "Honest Collaboration",
          body: "We work with clients as partners, not vendors. Transparency and direct feedback create work we're all genuinely proud of.",
        },
      ].map(({ title, body }) => (
        <div key={title} className="phil-col">
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </div>
  </section>
);
}