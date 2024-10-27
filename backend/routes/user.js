const express = require("express");

// set routes for users

// controller functions

const {
  loginUser,
  signupUser,
  spotifyRedirect,
  spotifyCallback,
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

module.exports = router;
