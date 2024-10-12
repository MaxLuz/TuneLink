const express = require("express");
const {
  createSong,
  getSongs,
  getSong,
  deleteSong,
  updateSong,
} = require("../controllers/songController");
const router = express.Router();

// GET all songs
router.get("/", getSongs);

// GET a single song
router.get("/:id", getSong);

// POST a new song
router.post("/", createSong);

// DELETE a new song
router.delete("/:id", deleteSong);

// UPDATE a new song
router.patch("/:id", updateSong);

module.exports = router;
