const express = require("express");
const {
  createStory,
  getStories,
  getStoryById,
} = require("../controllers/storyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createStory);
router.get("/", getStories);
router.get("/:id", getStoryById);

module.exports = router;
