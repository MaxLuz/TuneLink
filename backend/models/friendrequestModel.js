const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  from: { type: String, ref: "User" },
  to: { type: String, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
