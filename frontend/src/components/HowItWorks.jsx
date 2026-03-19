import { Link } from "react-router-dom"

export default function HowItWorks() {

  const steps = [
    "Sign in with Google or GitHub",
    "Upload your certificates",
    "Showcase achievements & discover opportunities"
  ]

  return (
    <section id="how"
      style={{
        padding: "120px 48px",
        background: "#ffffff"
      }}
    >

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <h2
          style={{
            fontFamily: "Clash Display",
            fontSize: "clamp(32px,4vw,56px)",
            letterSpacing: "-0.04em",
            marginBottom: "60px"
          }}
        >
          How It Works
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
              }}
            >

              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid #111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600"
                }}
              >
                {i + 1}
              </div>

              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "Satoshi"
                }}
              >
                {step}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}