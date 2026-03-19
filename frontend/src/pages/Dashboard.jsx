import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Dashboard() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {

    fetch("http://localhost:5000/auth/user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {

        if (!data.loggedIn) {
          navigate("/login")
        }

        else if (!data.user.role) {
          navigate("/select-role")
        }

        else {
          setUser(data.user)
          setLoading(false)
        }

      })
      .catch(() => navigate("/login"))

  }, [])

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Satoshi"
      }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      <Navbar loggedIn={true} />

      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "#f2f2f2",
          fontFamily: "Satoshi"
        }}
      >

        <h1
          style={{
            fontFamily: "Clash Display",
            fontSize: "clamp(40px,4vw,64px)",
            letterSpacing: "-0.04em",
            marginBottom: "16px"
          }}
        >
          Welcome {user?.name || ""} 👋
        </h1>

        <p
          style={{
            color: "#838282",
            fontSize: "18px",
            maxWidth: "500px",
            marginBottom: "40px"
          }}
        >
          Store your achievements and discover opportunities.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>

          <Link to="/add-certificate">
            <button
              style={{
                padding: "14px 32px",
                borderRadius: "9999px",
                border: "none",
                background: "#111111",
                color: "#fff",
                fontWeight: "600",
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e)=>e.target.style.transform="translateY(-2px)"}
              onMouseLeave={(e)=>e.target.style.transform="translateY(0)"}
            >
              Add Certificate
            </button>
          </Link>

          <Link to="/achievements">
            <button
              style={{
                padding: "14px 32px",
                borderRadius: "9999px",
                border: "1px solid #ccc",
                background: "transparent",
                color: "#111",
                fontWeight: "600",
                letterSpacing: "0.06em",
                cursor: "pointer"
              }}
            >
              View Achievements
            </button>
          </Link>

        </div>

      </section>
    </>
  )
}