import { useNavigate } from "react-router-dom"

export default function About() {

  const navigate = useNavigate()

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 48px",
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#f2f2f2",
        position: "relative"
      }}
    >

      {/* BACK BUTTON */}
      <button
  onClick={() => navigate("/")}
  style={{
    position: "absolute",
    top: "40px",
    left: "48px",

    background: "#111111",
    color: "#f6f6f6",

    border: "none",
    borderRadius: "9999px",

    padding: "10px 20px",

    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: "8px",

    transition: "transform 0.2s ease, background 0.2s ease"
  }}

  onMouseEnter={(e) => {
    e.target.style.transform = "translateY(-2px)"
    e.target.style.background = "#333"
  }}

  onMouseLeave={(e) => {
    e.target.style.transform = "translateY(0)"
    e.target.style.background = "#111111"
  }}
>
  ← Back
</button>

      {/* Label */}
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#b6b5b5",
          marginBottom: "20px",
          fontWeight: "600"
        }}
      >
        About
      </p>

      {/* Title */}
      <h1
        style={{
          fontFamily: "Clash Display",
          fontSize: "clamp(40px,5vw,72px)",
          letterSpacing: "-0.05em",
          marginBottom: "40px"
        }}
      >
        What is STEERX?
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: "18px",
          color: "#838282",
          lineHeight: "1.8",
          marginBottom: "60px"
        }}
      >
        STEERX is a student-first platform designed to help individuals
        store, organize, and showcase their achievements in one place.
        It also enables discovery of internships, events, and academic
        opportunities shared by professors and institutions.
      </p>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(0,0,0,0.1)",
          margin: "60px 0"
        }}
      />

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        <div>
          <h3 style={{ fontFamily: "Clash Display", fontSize: "24px" }}>
            Why STEERX?
          </h3>
          <p style={{ color: "#838282", lineHeight: "1.7" }}>
            Students participate in competitions, complete certifications,
            and attend events — but often lose track of them. STEERX solves
            this by providing a centralized platform.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "Clash Display", fontSize: "24px" }}>
            How it Works
          </h3>
          <p style={{ color: "#838282", lineHeight: "1.7" }}>
            Users sign in, upload certificates, and build a structured
            portfolio. Professors can post opportunities.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "Clash Display", fontSize: "24px" }}>
            Tech Stack
          </h3>
          <p style={{ color: "#838282", lineHeight: "1.7" }}>
            React, Node.js, Express, MongoDB, Passport.js.
          </p>
        </div>

      </div>

    </section>
  )
}