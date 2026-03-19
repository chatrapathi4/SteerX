export default function Features() {

  const items = [
    {
      title: "Store Certificates",
      desc: "Upload and organize your certificates in one place."
    },
    {
      title: "Build Your Portfolio",
      desc: "Create a clean timeline of your achievements."
    },
    {
      title: "Discover Opportunities",
      desc: "Find internships, events, and competitions posted by professors."
    }
  ]

  return (
    <section
      id="features"
      style={{
        padding: "140px 48px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >

      {/* small label */}
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
        Features
      </p>

      <h2
        style={{
          fontFamily: "Clash Display",
          fontSize: "clamp(36px,4vw,60px)",
          letterSpacing: "-0.04em",
          marginBottom: "80px",
          lineHeight: "1.1"
        }}
      >
        Everything You Need
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "48px"
        }}
      >

        {items.map((item) => (
          <div
            key={item.title}
            style={{
              padding: "20px 0",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-4px)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
          >

            <h3
              style={{
                fontFamily: "Clash Display",
                fontSize: "22px",
                marginBottom: "14px",
                letterSpacing: "-0.02em"
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#838282",
                lineHeight: "1.7",
                fontSize: "15px"
              }}
            >
              {item.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}