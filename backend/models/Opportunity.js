const mongoose = require("mongoose")

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // base64
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Opportunity", opportunitySchema)