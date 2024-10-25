const express = require("express");

// set routes for users

// controller functions

const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

module.exports = router;
