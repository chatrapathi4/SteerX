import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

export default function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/opportunity/all", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setPosts([])
        }
      })
  }, [])

  return (
    <>
      <Navbar loggedIn={true} />

      <section
        style={{
          padding: "80px 24px",
          background: "#f2f2f2",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center"
        }}
      >

        <div style={{ width: "100%", maxWidth: "700px" }}>

          <h1
            style={{
              fontFamily: "Clash Display",
              fontSize: "36px",
              marginBottom: "32px"
            }}
          >
            Home
          </h1>

          {posts.length === 0 ? (
            <p style={{ color: "#838282" }}>
              No opportunities yet
            </p>
          ) : (

            posts.map((post) => (
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
            ))

          )}

        </div>

      </section>
    </>
  )
}