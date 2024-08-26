const express = require("express");
const {
  createStory,
  getStories,
  getStoryById,
  updateStoryStats,
} = require("../controllers/storyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getStories).post(protect, createStory);
router.route("/:id").get(getStoryById);
router.route("/:id/stats").post(protect, updateStoryStats);

module.exports = router;
