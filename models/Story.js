const mongoose = require("mongoose");

const choiceSchema = new mongoose.Schema({
  text: String,
  next: String,
});

const sectionSchema = new mongoose.Schema({
  text: String,
  choices: [choiceSchema],
});

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Map,
      of: sectionSchema,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    statistics: {
      type: Map,
      of: {
        type: Map,
        of: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
