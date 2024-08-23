const Story = require("../models/Story");

const createStory = async (req, res) => {
  const { title, content, choices } = req.body;
  try {
    const story = new Story({ title, content, choices, author: req.user._id });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error creating story" });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stories" });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error fetching story" });
  }
};

module.exports = { createStory, getStories, getStoryById };
