const express = require("express");

// set routes for users

// controller functions

const {
  loginUser,
  signupUser,
  spotifyRedirect,
  spotifyCallback,
  spotifytoken,
  spotifyRefresh,
  getFriendCount,
  getDiscoveredTracksCount,
  incrementDiscoveredTracks,
} = require("../controllers/userController");

const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

// spotify authenticate redirect
router.get("/auth/spotify", spotifyRedirect);

// spotify callback
router.get("/auth/spotify-callback", spotifyCallback);

// grab a user's spotify token (only for friends)
router.get("/spotifytoken", spotifytoken);

router.post("/spotify-refresh", spotifyRefresh);

router.get("/friend-count", getFriendCount);

// get total count of discovered tracks for a user
router.get("/discovered/:username", getDiscoveredTracksCount);

// increment discovered tracks for a user
router.post("/increment-discovered/:username", incrementDiscoveredTracks);

module.exports = router;
