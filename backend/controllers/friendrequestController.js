const FriendRequest = require("../models/friendrequestModel.js");
const mongoose = require("mongoose");

// this controller handles the processing for friend requests

const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  const request = new FriendRequest({ from: userId, to: friendId });
  await request.save();
  if (!request) {
    res.status(404).json({ message: "Error sending friend request" });
  }
  res.status(200).json({ message: "Friend request sent!" });
};

module.exports = {
  sendFriendRequest,
};
