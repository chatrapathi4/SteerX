import { useState } from "react"
import Navbar from "../components/Navbar"

export default function AddCertificate() {

  const [title, setTitle] = useState("")
  const [event, setEvent] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]

    if (!file) return

    // 🔴 check size (<100kb)
    if (file.size > 100 * 1024) {
      setError("Image must be less than 100KB")
      return
    }

    setError("")
    setImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !event || !date || !image) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("title", title)
      formData.append("event", event)
      formData.append("date", date)
      formData.append("image", image)

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/certificate/add`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // ✅ Success → redirect
      window.location.href = "/achievements"

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
          padding: "80px 48px",
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
            width: "400px",
            border: "1px solid rgba(0,0,0,0.08)"
          }}
        >

          <h2
            style={{
              fontFamily: "Clash Display",
              marginBottom: "24px"
            }}
          >
            Add Certificate
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
            onChange={(e)=>setTitle(e.target.value)}
            style={inputStyle}
          />

          {/* EVENT */}
          <input
            type="text"
            placeholder="Event Name"
            value={event}
            onChange={(e)=>setEvent(e.target.value)}
            style={inputStyle}
          />

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            style={inputStyle}
          />

          {/* ERROR */}
          {error && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "14px",
              borderRadius: "9999px",
              border: "none",
              background: loading ? "#555" : "#111",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {loading ? "Adding..." : "Add Certificate"}
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