const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // returns token to the browser
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userId: user._id }); // returns token to the browser, and userId to be used in the callback function for spotify auth
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const spotifyRedirect = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  console.log("Redirecting to Spotify authorization page");
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${userId}`
  );
};

// spotify authentication
const spotifyCallback = async (req, res) => {
  const { code, state: userId } = req.query; // state now contains userId
  console.log("userId: ", userId);
  try {
    // Exchange the authorization code for access and refresh tokens
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        }),
      }
    );
    console.log("makes it past token post");

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(`Error fetching tokens: ${tokenData.error}`);
    }

    const { access_token, refresh_token } = tokenData;

    // identifies the user
    const user = await User.findById(userId); // Fetch the user from the database

    if (user) {
      // Store the Spotify tokens in the user's document
      user.spotifyAccessToken = access_token;
      user.spotifyRefreshToken = refresh_token;
      await user.save(); // Save the updated user document
    }

    // Redirect the user to your front-end application (home page or dashboard)
    res.redirect(`http://localhost:3000/?refresh_token=${refresh_token}`); // Change to the appropriate frontend route, include refresh token to be stored in local storage
  } catch (error) {
    console.error("Error during Spotify authentication:", error);
    res.status(500).send("Authentication error");
  }
};

module.exports = { signupUser, loginUser, spotifyRedirect, spotifyCallback };
