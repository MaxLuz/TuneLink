const express = require("express");

const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = require("../controllers/friendrequestController");

const router = express.Router();

router.post("/request", sendFriendRequest);

router.post("/accept", acceptFriendRequest);

router.post("/reject", rejectFriendRequest);

module.exports = router;
