const FriendRequest = require("../models/friendrequestModel.js");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");

// this controller handles the processing for friend requests

const sendFriendRequest = async (req, res) => {
  const { from, to } = req.body;

  try {
    // Check if the `to` username exists
    const userTo = await User.findOne({ username: to });

    if (!userTo) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Proceed with saving the friend request
    const request = new FriendRequest({ from, to });

    await request.save();

    res.status(200).json({ message: "Friend request sent!" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { _id } = req.body;
  console.log("_id: " + _id);
  const request = await FriendRequest.findById(_id);

  if (request && request.status == "pending") {
    // Update the `friends` array for the user who sent the request (from)
    await User.findOneAndUpdate(
      { username: request.from }, // Find user by `username`
      { $push: { friends: request.to } } // Add the recipient's username to their `friends` array
    );

    // Update the `friends` array for the user who received the request (to)
    await User.findOneAndUpdate(
      { username: request.to }, // Find user by `username`
      { $push: { friends: request.from } } // Add the sender's username to their `friends` array
    );
    request.status = "accepted";
    await request.save();
    res.status(200).json(request);
  } else {
    res.status(404).json({ message: "Invalid request" });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { _id } = req.body;
  const request = await FriendRequest.findById(_id);

  if (request && request.status == "pending") {
    request.status = "rejected";
    await request.save();
    res.status(200).json(request);
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};

const getFriendRequests = async (req, res) => {
  const user_id = req.user._id;
  const currentuser = await User.findById(user_id).populate("username");
  username = currentuser.username;
  try {
    const friendRequests = await FriendRequest.find({
      to: username,
      status: "pending",
    });

    if (!friendRequests.length) {
      console.log("No friend Requests");
      return res.status(404).json({ message: "No friend requests" });
    }
    res.status(200).json(friendRequests);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFriends = async (req, res) => {
  const user_id = req.user._id;
  try {
    const friends = await User.findById(user_id).populate("friends");
    res.status(200).json(friends.friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getFriendRequests,
};
