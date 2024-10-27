const express = require("express");

// set routes for users

// controller functions

const {
  loginUser,
  signupUser,
  spotifyCallback,
} = require("../controllers/userController");

const router = express.Router();

// login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

// spotify callback
router.get("/auth/spotify-callback", spotifyCallback);

module.exports = router;
