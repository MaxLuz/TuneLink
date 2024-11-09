const express = require("express");

const { sendFriendRequest } = require("../controllers/friendrequestController");

const router = express.Router();

router.post("/request", sendFriendRequest);

module.exports = router;
