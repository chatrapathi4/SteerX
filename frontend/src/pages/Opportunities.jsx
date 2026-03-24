import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

export default function Opportunities() {

  const [opportunities, setOpportunities] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.PROD ? "" : "http://localhost:5000"}/opportunity/all`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOpportunities(data)
        } else {
          setOpportunities([])
        }
      })
      .catch(() => setOpportunities([]))
  }, [])

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
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              + Add Opportunity
            </button>

          </Link>

        </div>

        {opportunities.length === 0 ? (
          /* EMPTY STATE */
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
        ) : (
          /* OPPORTUNITY CARDS */
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {opportunities.map((post) => (
              <div
                key={post._id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  border: "1px solid rgba(0,0,0,0.06)"
                }}
              >

                {/* HEADER */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>

                  <img
                    src={post.postedBy?.profileImage || ""}
                    alt=""
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />

                  <div>
                    <p style={{ fontWeight: "600" }}>
                      {post.postedBy?.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#838282" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                {/* IMAGE */}
                {post.image && (
                  <img
                    src={`data:image/png;base64,${post.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "12px"
                    }}
                  />
                )}

                {/* TITLE */}
                <h3 style={{ fontFamily: "Clash Display" }}>
                  {post.title}
                </h3>

                {/* DESCRIPTION */}
                <p style={{ color: "#555", marginTop: "6px" }}>
                  {post.description}
                </p>

              </div>
            ))}
          </div>
        )}

      </section>
    </>
  )
}