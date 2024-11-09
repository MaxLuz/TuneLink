const FriendRequest = require("../models/friendrequestModel.js");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");

// this controller handles the processing for friend requests

const sendFriendRequest = async (req, res) => {
  const { from, to } = req.body;
  console.log("userId: ", from + "/nfriendId: ", to);
  const request = new FriendRequest({ from: from, to: to });
  console.log(request.from);
  console.log(request.to);
  await request.save();
  if (!request) {
    res.status(404).json({ message: "Error sending friend request" });
  }
  res.status(200).json({ message: "Friend request sent!" });
};

const acceptFriendRequest = async (req, res) => {
  const { _id } = req.body;
  const request = await FriendRequest.findById(_id);

  if (request && request.status == "pending") {
    await User.findByIdAndUpdate(request.from, {
      $push: { friends: request.to },
    });
    await User.findByIdAndUpdate(request.to, {
      $push: { friends: request.from },
    });
    request.status = "accepted";
    await request.save();
    res.status(200).json({ message: "Friend request accepted!" });
  } else {
    res.status(404).json({ message: "Invalid request" });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
};
