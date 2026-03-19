import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar({ loggedIn = false }) {

  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser(data.user)
        }
      })
  }, [])

  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include"
    })

    window.location.href = "/"
  }

  return (
    <nav className="nav">

      <Link className="nav-logo" to="/">
        STEERX
      </Link>

      <div className="nav-links">

        {!loggedIn && (
          <>
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#how">How it Works</a>
            <Link className="nav-link" to="/about">About</Link>

            <Link to="/login">
              <button className="nav-cta">Login</button>
            </Link>
          </>
        )}

        {loggedIn && user && (
          <>
            {/* HOME */}
            <Link className="nav-link" to="/home">Home</Link>

            {/* DASHBOARD */}
            <Link className="nav-link" to="/dashboard">Dashboard</Link>

            {/* ACHIEVEMENTS */}
            <Link className="nav-link" to="/achievements">Achievements</Link>

            {/* PROFESSOR ONLY */}
            {user.role === "professor" && (
              <Link className="nav-link" to="/opportunities">
                Opportunities
              </Link>
            )}

            {/* 🔔 NOTIFICATIONS */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                🔔
              </div>

              {showNotifications && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50px",
                    width: "260px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "10px",
                    padding: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                  }}
                >
                  {notifications.length === 0 ? (
                    <p style={{ fontSize: "14px", color: "#838282" }}>
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n, i) => (
                      <p key={i}>{n}</p>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div style={{ position: "relative" }}>

              <button
                className="nav-link"
                onClick={() => setOpen(!open)}
              >
                Profile ▼
              </button>

              {open && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "40px",
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    width: "160px",
                    padding: "10px 0",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                  }}
                >

                  <Link
                    to="/profile"
                    style={dropdownItem}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    style={dropdownItem}
                  >
                    Settings
                  </Link>

                  <button
                    onClick={logout}
                    style={dropdownItem}
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          </>
        )}

      </div>

    </nav>
  )
}

const dropdownItem = {
  display: "block",
  padding: "10px 16px",
  textDecoration: "none",
  color: "#111",
  width: "100%",
  textAlign: "left",
  background: "none",
  border: "none",
  cursor: "pointer"
}