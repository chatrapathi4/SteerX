require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo").default
const multer = require("multer")
const path = require("path")

const Certificate = require("./models/Certificate")
const passport = require("./config/passport")
const User = require("./models/User")
const Opportunity = require("./models/Opportunity")

const upload = multer()
const app = express()

app.set("trust proxy", 1)

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.RENDER === "true" ||
  Boolean(process.env.RENDER_EXTERNAL_URL)

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173"
].filter(Boolean)

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
  })
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "steerxsecret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

/* ---------------- DATABASE ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {
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
    console.log("CALLBACK SESSION ID:", req.sessionID)
    console.log("CALLBACK COOKIE:", req.headers.cookie)
    console.log("CALLBACK USER:", req.user)
    console.log("SESSION BEFORE SAVE:", req.session)

    return req.session.save((err) => {
      if (err) {
        console.error("SESSION SAVE ERROR (GOOGLE):", err)
        return res.status(500).send("Session save failed")
      }

      console.log("SESSION AFTER SAVE:", req.session)

      if (!req.user.role) {
        return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/select-role`)
      }

      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`)
    })
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
    console.log("CALLBACK SESSION ID:", req.sessionID)
    console.log("CALLBACK COOKIE:", req.headers.cookie)
    console.log("CALLBACK USER:", req.user)
    console.log("SESSION BEFORE SAVE:", req.session)

    return req.session.save((err) => {
      if (err) {
        console.error("SESSION SAVE ERROR (GITHUB):", err)
        return res.status(500).send("Session save failed")
      }

      console.log("SESSION AFTER SAVE:", req.session)

      if (!req.user.role) {
        return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/select-role`)
      }

      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`)
    })
  }
)

app.get("/auth/user", (req, res) => {
  console.log("AUTH CHECK SESSION ID:", req.sessionID)
  console.log("AUTH CHECK COOKIE:", req.headers.cookie)
  console.log("AUTH CHECK PASSPORT:", req.session?.passport)
  console.log("AUTH CHECK USER:", req.user)

  console.log("SESSION PASSPORT:", req.session?.passport)
  console.log("SESSION RAW:", req.session)

  console.log("AUTH USER CHECK", {
    origin: req.headers.origin,
    cookie: req.headers.cookie,
    sessionId: req.sessionID,
    sessionPassport: req.session?.passport,
    isAuthenticated: req.isAuthenticated?.(),
    user: req.user
  })

  if (req.isAuthenticated?.() && req.user) {
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
/* ---------------- SERVE FRONTEND (PRODUCTION) ---------------- */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  })
}

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})