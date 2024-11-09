const express = require("express");

const {
  sendFriendRequest,
  acceptFriendRequest,
} = require("../controllers/friendrequestController");

const router = express.Router();

router.post("/request", sendFriendRequest);

router.post("/accept", acceptFriendRequest);

module.exports = router;
