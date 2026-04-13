import { useState } from "react"
import Navbar from "../components/Navbar"
import { getAuthHeaders } from "../utils/auth"

export default function AddOpportunity() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (file.size > 150 * 1024) {
      setError("Image must be less than 200KB")
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]
      setImage(base64)
    }

    reader.readAsDataURL(file)
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      setError("Title and description are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/opportunity/add`, {
        method: "POST",
        headers: getAuthHeaders({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          title,
          description,
          image,
          expiresAt: expiresAt || null
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed")
      }

      alert("Opportunity posted 🎉")

      // reset form
      setTitle("")
      setDescription("")
      setExpiresAt("")
      setImage(null)

    } catch (err) {
      console.log(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar loggedIn={true} />

      <section
        style={{
          padding: "80px 24px",
          background: "#f2f2f2",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            width: "420px",
            border: "1px solid rgba(0,0,0,0.08)"
          }}
        >

          <h2
            style={{
              fontFamily: "Clash Display",
              marginBottom: "24px"
            }}
          >
            Post Opportunity
          </h2>

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ marginBottom: "16px" }}
          />

          {/* TITLE */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              height: "100px",
              resize: "none"
            }}
          />

          {/* EXPIRY */}
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            style={inputStyle}
          />

          {/* ERROR */}
          {error && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              borderRadius: "9999px",
              border: "none",
              background: "#111",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? "Posting..." : "Post Opportunity"}
          </button>

        </form>

      </section>
    </>
  )
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid rgba(0,0,0,0.1)"
}