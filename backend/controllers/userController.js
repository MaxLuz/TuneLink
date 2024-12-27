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

    res
      .status(200)
      .json({ email, username: user.username, token, userId: user._id }); // returns token to the browser, and userId to be used to store spotify refresh token in local storage
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, username, token, userId: user._id }); // returns token to the browser, and userId to be used in the callback function for spotify auth
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const spotifyRedirect = async (req, res) => {
  const { userId } = req.query;

  const scopes =
    "user-top-read user-read-private user-modify-playback-state user-read-playback-state";
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${userId}&scope=${scopes}`
  );
};

// spotify authentication
const spotifyCallback = async (req, res) => {
  const { code, state: userId } = req.query; // state now contains userId
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

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(`Error fetching tokens: ${tokenData.error}`);
    }

    const { access_token, refresh_token, scope, expires_in } = tokenData;

    // identifies the user
    const user = await User.findById(userId); // Fetch the user from the database

    if (user) {
      // Store the Spotify tokens in the user's document
      user.spotifyAccessToken = access_token;
      user.spotifyRefreshToken = refresh_token;
      await user.save(); // Save the updated user document
    }
    // Redirect the user to your front-end application (home page or dashboard)
    res.redirect(
      `https://xlhq7t2v-3000.use.devtunnels.ms/dashboard/?access_token=${access_token}`
    ); // Change to the appropriate frontend route, include access token to be stored in local storage
  } catch (error) {
    console.error("Error during Spotify authentication:", error);
    res.status(500).send("Authentication error");
  }
};

const spotifytoken = async (req, res) => {
  try {
    const username = req.query.username;
    const isRefresh = req.query.refresh;

    const user = await User.findOne({ username });

    console.log("Token for " + username + ": " + user.spotifyAccessToken);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (isRefresh == "false") {
      console.log("sending access token");
      return res.status(200).json(user.spotifyAccessToken);
    }
    if (isRefresh == "true") {
      console.log("sending refresh token");
      return res.status(200).json(user.spotifyRefreshToken);
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const spotifyRefresh = async (req, res) => {
  const { accessToken, username } = req.body;
  console.log("Username for updating tokens: " + username);

  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    { spotifyAccessToken: accessToken },
    { new: true }
  );

  if (!updatedUser) {
    console.log("user not found");
    return res
      .status(401)
      .json({ message: "Error updating tokens, user not found" });
  }
  return res.status(200).json({ message: "Successfully updated tokens" });
};

const getFriendCount = async (req, res) => {
  try {
    const username = req.query.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendCount = user.friends ? user.friends.length : 0;

    return res.status(200).json({ friendCount });
  } catch (error) {
    console.error("Error getting friend count:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get total count of discovered tracks for a user
const getDiscoveredTracksCount = async (req, res) => {
  console.log("makes it to getDiscoveredTracksCount");
  const { username } = req.params;
  console.log("username: " + username);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const count = user.discoveredTracks || 0;
    console.log("count: " + count);
    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// increment discovered tracks for a user
const incrementDiscoveredTracks = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure we're working with numbers
    user.discoveredTracks = Number(user.discoveredTracks || 0) + 1;
    await user.save();

    res.status(200).json({ discoveredTracks: user.discoveredTracks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  spotifyRedirect,
  spotifyCallback,
  spotifytoken,
  spotifyRefresh,
  getFriendCount,
  getDiscoveredTracksCount,
  incrementDiscoveredTracks,
};
