import Navbar from "../components/Navbar"

export default function Settings() {

  const handleLogout = async () => {
    await fetch(`${import.meta.env.PROD ? "" : "http://localhost:5000"}/auth/logout`, {
      credentials: "include"
    })
    window.location.href = "/"
  }

  return (
    <>
      <Navbar loggedIn={true} />

      <section
        style={{
          padding: "80px 48px",
          background: "#f2f2f2",
          minHeight: "100vh",
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            fontFamily: "Clash Display",
            fontSize: "40px",
            marginBottom: "40px"
          }}
        >
          Settings
        </h1>

        {/* PROFILE */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontFamily: "Clash Display", marginBottom: "10px" }}>
            Profile
          </h3>
          <p style={{ color: "#838282" }}>
            Manage your account details and preferences.
          </p>
        </div>

        {/* ROLE */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontFamily: "Clash Display", marginBottom: "10px" }}>
            Role
          </h3>
          <p style={{ color: "#838282" }}>
            You are currently logged in as a student.
          </p>
        </div>

        {/* LOGOUT */}
        <div style={{ marginTop: "60px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "14px 32px",
              borderRadius: "9999px",
              border: "none",
              background: "#111",
              color: "#fff",
              fontWeight: "600",
              letterSpacing: "0.06em",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

      </section>
    </>
  )
}