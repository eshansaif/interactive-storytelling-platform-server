const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  choices: { type: Array, default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", StorySchema);
