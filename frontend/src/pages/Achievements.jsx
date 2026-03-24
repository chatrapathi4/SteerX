import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

export default function Achievements() {

  const [certificates, setCertificates] = useState([])
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.PROD ? "" : "http://localhost:5000"}/certificate/user`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCertificates(data)
        } else {
          setCertificates([])
        }
      })
      .catch(err => {
        console.log(err)
        setCertificates([])
      })
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

        {/* TITLE */}
        <h1
          style={{
            fontFamily: "Clash Display",
            fontSize: "40px",
            marginBottom: "40px",
            textAlign: "center"
          }}
        >
          Achievements
        </h1>

        {/* EMPTY STATE */}
        {certificates.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
              color: "#838282"
            }}
          >
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              No achievements yet
            </p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Start by adding your first certificate
            </p>
          </div>
        ) : (

          /* GRID */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >

            {certificates.map((cert) => (
              <div
                key={cert._id}
                onClick={() => setSelectedCert(cert)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s ease"
                }}
              >

                {/* IMAGE */}
                <img
                  src={`data:image/png;base64,${cert.image}`}
                  alt="certificate"
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                {/* CONTENT */}
                <div style={{ padding: "16px" }}>

                  <h3
                    style={{
                      fontFamily: "Clash Display",
                      fontSize: "18px",
                      marginBottom: "6px"
                    }}
                  >
                    {cert.title}
                  </h3>

                  <p style={{ color: "#838282", fontSize: "14px" }}>
                    {cert.event}
                  </p>

                  <p style={{ fontSize: "12px", marginTop: "8px" }}>
                    {cert.date}
                  </p>

                </div>

              </div>
            ))}

          </div>

        )}

        {/* 🔥 MODAL VIEW */}
        {selectedCert && (
          <div
            onClick={() => setSelectedCert(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000
            }}
          >

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                maxWidth: "90%",
                maxHeight: "90%",
                position: "relative"
              }}
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>

              {/* FULL IMAGE */}
              <img
                src={`data:image/png;base64,${selectedCert.image}`}
                alt="certificate"
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />

            </div>

          </div>
        )}

      </section>
    </>
  )
}