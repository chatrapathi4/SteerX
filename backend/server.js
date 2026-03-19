require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const multer = require("multer")


const Certificate = require("./models/Certificate")
const passport = require("./config/passport")
const User = require("./models/User")
const Opportunity = require("./models/Opportunity")

const upload = multer()
const app = express()

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

app.use(
  session({
    secret: "steerxsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // ✅ required for production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" // ✅ important for cross-site cookies
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

/* ---------------- DATABASE ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req,res)=>{
  res.send("STEERX backend running")
})

/* ---------------- GOOGLE AUTH ---------------- */

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user.role) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/select-role`)
    }
    return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`)
  }
)

/* ---------------- GITHUB AUTH ---------------- */

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
)

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user.role) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/select-role`)
    }
    return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`)
  }
)

app.get("/auth/user", (req, res) => {

  if (req.user) {
    res.json({
      loggedIn: true,
      user: req.user
    })
  } else {
    res.json({
      loggedIn: false
    })
  }

})

/* ---------------- SAVE USER ROLE ---------------- */

app.post("/user/role", async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const { role } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { role },
      { new: true }
    )

    res.json({
      message: "Role updated",
      user
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})

app.get("/auth/logout", (req, res) => {

  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid")
      res.json({ message: "Logged out" })
    })
  })

})

/* ---------------- CERTIFICATE ROUTES ---------------- */

app.post("/certificate/add", upload.single("image"), async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const { title, event, date } = req.body

    if (!title || !event || !date || !req.file) {
      return res.status(400).json({ error: "All fields required" })
    }

    // convert image → base64
    const base64Image = req.file.buffer.toString("base64")

    const newCert = await Certificate.create({
      userId: req.user._id,
      title,
      event,
      date,
      image: base64Image
    })

    res.json({
      message: "Certificate added",
      certificate: newCert
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})


app.get("/certificate/user", async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const certificates = await require("./models/Certificate")
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })

    res.json(certificates)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})

/* ---------------- OPPORTUNITY ROUTES ---------------- */

app.post("/opportunity/add", async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    if (req.user.role !== "professor") {
      return res.status(403).json({ error: "Only professors can post" })
    }

    const { title, description, image, expiresAt } = req.body

    const opportunity = await Opportunity.create({
      title,
      description,
      image,
      expiresAt: expiresAt || null,
      postedBy: req.user._id
    })

    res.json(opportunity)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})

app.get("/opportunity/all", async (req, res) => {

  try {

    const now = new Date()

    const opportunities = await Opportunity.find({
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: now } }
      ]
    })
    .populate("postedBy", "name profileImage")
    .sort({ createdAt: -1 })

    res.json(opportunities)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})


/* ---------------- UPDATE PROFILE ---------------- */
app.post("/user/update", async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    const { name, profileImage, bio, skills } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || req.user.name,
        profileImage: profileImage || req.user.profileImage,
        bio: bio ?? req.user.bio,
        skills: skills ?? req.user.skills
      },
      { new: true }
    )

    res.json({
      message: "Profile updated",
      user: updatedUser
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})
/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})