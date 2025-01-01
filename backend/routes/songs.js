const express = require("express");

// sets routes for each of the CRUD operations for favorite songs list

const {
  createSong,
  getSongs,
  getSong,
  deleteSong,
  updateSong,
  getSongCountByUsername,
} = require("../controllers/songController");

const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// requires authorization for any API actions
router.use(requireAuth);

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

// GET total count of songs sent to a specific username
router.get("/count/:username", getSongCountByUsername);

module.exports = router;
