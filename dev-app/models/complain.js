const mongoose = require("mongoose");
const complainSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  cloudinary_id: String,
  user: {
    type: String,
    required: true,
  },
  createdAt: String,
});
const complain = mongoose.model("Complain", complainSchema);
module.exports = complain;
