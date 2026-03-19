import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

export default function Opportunities() {

  return (
    <>
      <Navbar loggedIn={true} />

      <section
        style={{
          padding: "80px 48px",
          background: "#f2f2f2",
          minHeight: "100vh"
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >

          <h1
            style={{
              fontFamily: "Clash Display",
              fontSize: "36px",
              letterSpacing: "-0.04em"
            }}
          >
            Opportunities
          </h1>

          {/* ADD BUTTON */}
          <Link to="/add-opportunity">

            <button
              style={{
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "9999px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e)=>e.target.style.transform="translateY(-2px)"}
              onMouseLeave={(e)=>e.target.style.transform="translateY(0)"}
            >
              + Add Opportunity
            </button>

          </Link>

        </div>

        {/* EMPTY STATE */}
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            color: "#838282"
          }}
        >
          <p>No opportunities yet</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Start by posting your first opportunity
          </p>
        </div>

      </section>
    </>
  )
}