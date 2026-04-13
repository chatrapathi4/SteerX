import { useNavigate } from "react-router-dom"
import Nav from "../components/Navbar"

export default function SelectRole() {

  const navigate = useNavigate()

  const selectRole = async (role) => {
    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/user/role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ role })
      })

      const data = await res.json()

      if (data.user) {
        navigate("/dashboard")
      }

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Nav />

      <section className="hero" style={{ minHeight: "70vh" }}>

        <p className="hero-eyebrow">Account Setup</p>

        <h2
          style={{
            fontFamily: "Clash Display",
            fontSize: "clamp(40px,4vw,60px)",
            letterSpacing: "-0.04em",
            marginBottom: "24px"
          }}
        >
          Select Your Role
        </h2>

        <p className="hero-sub" style={{ marginTop: "0px" }}>
          Tell us who you are so we can personalize your experience.
        </p>

        <div className="hero-ctas">

          <button
            className="btn-primary"
            onClick={() => selectRole("student")}
          >
            Student
          </button>

          <button
            className="btn-ghost"
            onClick={() => selectRole("professor")}
          >
            Professor
          </button>

        </div>

      </section>
    </>
  )
}