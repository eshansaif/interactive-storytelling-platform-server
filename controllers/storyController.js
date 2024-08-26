const Story = require("../models/Story");

exports.createStory = async (req, res) => {
  const { title, content } = req.body;

  try {
    const story = await Story.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "username");
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id).populate("author", "username");

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStoryStats = async (req, res) => {
  const { id } = req.params;
  const { sectionId, choice, timeSpent } = req.body;

  try {
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (!story.statistics.has(sectionId)) {
      story.statistics.set(sectionId, new Map());
    }

    const sectionStats = story.statistics.get(sectionId);
    sectionStats.set(choice, (sectionStats.get(choice) || 0) + 1);

    story.markModified("statistics");
    await story.save();

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
