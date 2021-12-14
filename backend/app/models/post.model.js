const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  neighborhood: String,
  description: String,
  username: String,
});

module.exports = mongoose.model("Post", PostSchema);
