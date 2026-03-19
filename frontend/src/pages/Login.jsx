export default function Login() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#111111",
          color: "#f6f6f6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px"
        }}
      >

        <h1
          style={{
            fontFamily: "Clash Display",
            fontSize: "clamp(60px,8vw,120px)",
            letterSpacing: "-0.05em"
          }}
        >
          STEERX
        </h1>

        <p
          style={{
            marginTop: "20px",
            color: "#bfbfbf",
            fontSize: "16px",
            letterSpacing: "0.08em"
          }}
        >
          Store. Showcase. Grow.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          background: "#f2f2f2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px"
        }}
      >

        <h2
          style={{
            fontFamily: "Clash Display",
            fontSize: "32px",
            marginBottom: "20px"
          }}
        >
          Continue to STEERX
        </h2>

        <p
          style={{
            color: "#838282",
            marginBottom: "40px",
            textAlign: "center",
            maxWidth: "300px"
          }}
        >
          Sign in to store achievements and discover opportunities.
        </p>

        {/* GOOGLE */}
        <button
          onClick={() => window.location.href = "http://localhost:5000/auth/google"}
          style={{
            width: "260px",
            padding: "14px",
            borderRadius: "9999px",
            border: "none",
            background: "#111",
            color: "#fff",
            fontWeight: "600",
            marginBottom: "16px",
            cursor: "pointer"
          }}
        >
          CONTINUE WITH GOOGLE
        </button>

        {/* GITHUB */}
        <button
          onClick={() => window.location.href = "http://localhost:5000/auth/github"}
          style={{
            width: "260px",
            padding: "14px",
            borderRadius: "9999px",
            border: "1px solid #ccc",
            background: "transparent",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          CONTINUE WITH GITHUB
        </button>

      </div>

    </div>
  )
}