import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

/* ── Inject fonts once ── */
const injectFonts = () => {
  if (document.getElementById("profile-fonts")) return
  const link = document.createElement("link")
  link.id = "profile-fonts"
  link.rel = "stylesheet"
  link.href =
    "https://api.fontshare.com/v2/css?f[]=clash-display@700,600&f[]=satoshi@400,500,700&display=swap"
  document.head.appendChild(link)
}

const styles = `
  .profile-page {
    background: #f2f2f2;
    min-height: 100vh;
    font-family: 'Satoshi', sans-serif;
  }
 
  /* ── COVER ── */
  .profile-cover {
    height: 260px;
    background: #111111;
    position: relative;
    overflow: visible;
  }
  .profile-cover-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .profile-cover-label {
    position: absolute;
    bottom: 20px;
    left: 48px;
    font-family: 'Clash Display', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
 
  /* ── AVATAR RING ── */
  .profile-avatar-wrap {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .profile-avatar-ring {
    width: 288px;
    height: 288px;
    border-radius: 50%;
    padding: 4px;
    background: #f2f2f2;
    position: relative;
  }
  .profile-avatar-ring img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
  .profile-avatar-edit-btn {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #111;
    border: 2px solid #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }
  .profile-avatar-edit-btn:hover { background: #333; }
  .profile-avatar-edit-btn svg {
    width: 14px; height: 14px;
    stroke: #fff; fill: none;
    stroke-width: 1.8;
    stroke-linecap: round; stroke-linejoin: round;
  }
  .profile-file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    border-radius: 50%;
  }
 
  /* ── IDENTITY BLOCK ── */
  .profile-identity {
    margin-top: 88px;
    text-align: center;
    padding: 0 24px;
  }
  .profile-name-display {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #111;
    line-height: 1.0;
    margin-bottom: 6px;
  }
  .profile-name-input {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(24px, 3.5vw, 36px);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #111;
    background: transparent;
    border: none;
    border-bottom: 2px solid #111;
    text-align: center;
    outline: none;
    padding: 4px 8px;
    width: 320px;
    max-width: 90vw;
    margin-bottom: 6px;
  }
  .profile-email {
    font-size: 14px;
    font-weight: 500;
    color: #838282;
    margin-bottom: 4px;
  }
  .profile-role-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #111;
    border: 1px solid rgba(30,30,30,0.18);
    padding: 4px 14px;
    border-radius: 9999px;
    margin-bottom: 24px;
  }
  .profile-error {
    font-size: 13px;
    color: #c0392b;
    margin-bottom: 12px;
    font-weight: 500;
  }
 
  /* ── ACTION BUTTON ── */
  .profile-action-btn {
    font-family: 'Satoshi', sans-serif;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    padding: 11px 28px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .profile-action-btn.primary {
    background: #111;
    color: #f2f2f2;
  }
  .profile-action-btn.primary:hover {
    background: #333;
    transform: translateY(-1px);
  }
  .profile-action-btn.ghost {
    background: transparent;
    color: #111;
    border: 1px solid rgba(30,30,30,0.18);
    margin-left: 10px;
  }
  .profile-action-btn.ghost:hover {
    border-color: #111;
    transform: translateY(-1px);
  }
  .profile-action-btn svg {
    width: 14px; height: 14px;
    stroke: currentColor; fill: none;
    stroke-width: 2;
    stroke-linecap: round; stroke-linejoin: round;
  }
 
  /* ── CARD GRID ── */
  .profile-cards {
    margin: 40px auto 60px;
    max-width: 860px;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 620px) {
    .profile-cards { grid-template-columns: 1fr; }
  }
 
  /* ── BASE CARD ── */
  .pcard {
    background: #fff;
    border: 1px solid rgba(30,30,30,0.08);
    border-radius: 12px;
    padding: 28px;
    transition: box-shadow 0.25s;
  }
  .pcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
  .pcard-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #b6b5b5;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pcard-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(30,30,30,0.08);
  }
 
  /* ── DETAILS CARD ── */
  .details-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(30,30,30,0.06);
  }
  .details-row:last-child { border-bottom: none; }
  .details-key {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: #b6b5b5;
  }
  .details-val {
    font-size: 14px;
    font-weight: 500;
    color: #111;
  }
 
  /* ── PROVIDER BADGE ── */
  .provider-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 700;
    background: #111;
    color: #f2f2f2;
    padding: 3px 10px;
    border-radius: 9999px;
    text-transform: capitalize;
  }
  .provider-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4ade80;
    display: inline-block;
  }
 
  /* ── BIO CARD ── */
  .bio-text {
    font-size: 15px;
    font-weight: 400;
    color: #555;
    line-height: 1.75;
  }
  .bio-empty {
    font-size: 14px;
    color: #b6b5b5;
    font-style: italic;
  }
  .bio-textarea {
    width: 100%;
    font-family: 'Satoshi', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #111;
    background: #f8f8f8;
    border: 1px solid rgba(30,30,30,0.12);
    border-radius: 8px;
    padding: 12px 14px;
    resize: vertical;
    outline: none;
    line-height: 1.65;
    transition: border-color 0.2s;
  }
  .bio-textarea:focus { border-color: #111; }
 
  /* ── SKILLS CARD (spans full width) ── */
  .pcard.full { grid-column: 1 / -1; }
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: #111;
    color: #f2f2f2;
    padding: 6px 14px;
    border-radius: 9999px;
    transition: background 0.2s;
  }
  .skill-tag:hover { background: #333; }
  .skills-input {
    width: 100%;
    font-family: 'Satoshi', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #111;
    background: #f8f8f8;
    border: 1px solid rgba(30,30,30,0.12);
    border-radius: 8px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .skills-input:focus { border-color: #111; }
  .skills-hint {
    font-size: 12px;
    color: #b6b5b5;
    margin-top: 8px;
  }
`

export default function Profile() {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    injectFonts()

    if (!document.getElementById("profile-styles")) {
      const styleEl = document.createElement("style")
      styleEl.id = "profile-styles"
      styleEl.textContent = styles
      document.head.appendChild(styleEl)
    }

    fetch(`${import.meta.env.PROD ? "" : "http://localhost:5000"}/auth/user`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser(data.user)
          setName(data.user.name || "")
          setBio(data.user.bio || "")
          setSkills((data.user.skills || []).join(", "))
        }
      })
  }, [])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 200 * 1024) {
      setError("Image must be under 200KB")
      return
    }

    setError("")

    const reader = new FileReader()
    reader.onloadend = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`${import.meta.env.PROD ? "" : "http://localhost:5000"}/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          profileImage: image || user.profileImage,
          bio,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean)
        })
      })

      const data = await res.json()

      if (!res.ok) throw new Error()

      setUser(data.user)
      setEditing(false)

    } catch {
      alert("Update failed")
    }
  }

  if (!user) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f2f2f2"
      }}>
        <div style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#b6b5b5"
        }}>
          Loading...
        </div>
      </div>
    )
  }

  const displaySkills = user.skills || []

  return (
    <>
      <Navbar loggedIn={true} />

      <section className="profile-page">

        {/* COVER */}
        <div className="profile-cover">
          <div className="profile-cover-grid" />
          <span className="profile-cover-label">User Profile</span>

          {/* AVATAR */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-ring">
              <img
                src={image || user.profileImage || "https://via.placeholder.com/150"}
                alt={user.name}
              />

              {editing && (
                <label className="profile-avatar-edit-btn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="profile-file-input"
                  />
                  <svg viewBox="0 0 24 24">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* IDENTITY */}
        <div className="profile-identity">
          {editing ? (
            <input
              className="profile-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h1 className="profile-name-display">{user.name}</h1>
          )}

          <p className="profile-email">{user.email}</p>
          <span className="profile-role-badge">{user.role}</span>

          {error && <p className="profile-error">{error}</p>}

          <div>
            {editing ? (
              <>
                <button className="profile-action-btn primary" onClick={handleSave}>
                  Save Profile
                </button>
                <button
                  className="profile-action-btn ghost"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="profile-action-btn primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* CARDS */}
        <div className="profile-cards">

          {/* DETAILS */}
          <div className="pcard">
            <div className="pcard-label">Details</div>

            <div className="details-row">
              <span className="details-key">Name</span>
              <span className="details-val">{user.name}</span>
            </div>

            <div className="details-row">
              <span className="details-key">Email</span>
              <span className="details-val">{user.email}</span>
            </div>

            <div className="details-row">
              <span className="details-key">Role</span>
              <span className="details-val">{user.role}</span>
            </div>

            <div className="details-row">
              <span className="details-key">Provider</span>
              <span className="provider-pill">
                <span className="provider-dot" />
                {user.provider}
              </span>
            </div>
          </div>

          {/* BIO */}
          <div className="pcard">
            <div className="pcard-label">Bio</div>

            {editing ? (
              <textarea
                className="bio-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              user.bio
                ? <p className="bio-text">{user.bio}</p>
                : <p className="bio-empty">No bio added yet.</p>
            )}
          </div>

          {/* SKILLS */}
          <div className="pcard full">
            <div className="pcard-label">Skills</div>

            {editing ? (
              <input
                className="skills-input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            ) : (
              displaySkills.length === 0
                ? <p className="bio-empty">No skills added yet.</p>
                : (
                  <div className="skills-wrap">
                    {displaySkills.map((s, i) => (
                      <span key={i} className="skill-tag">{s}</span>
                    ))}
                  </div>
                )
            )}
          </div>

        </div>
      </section>
    </>
  )
}