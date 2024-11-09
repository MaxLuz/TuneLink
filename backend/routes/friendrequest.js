const express = require("express");

const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
} = require("../controllers/friendrequestController");

const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// requires authorization for any API actions
router.use(requireAuth);

// send a friend request
router.post("/request", sendFriendRequest);

// accept a friend request
router.post("/accept", acceptFriendRequest);

// reject a friend request
router.post("/reject", rejectFriendRequest);

// get all friends
router.get("/", getFriends);

module.exports = router;
