const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  event: String,
  date: String,

  image: String, // base64

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Certificate", certificateSchema)