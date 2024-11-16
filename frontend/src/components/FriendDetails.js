import { useEffect, useState } from "react";
import "../styles/FriendDetails.css";

const FriendDetails = ({ friend }) => {
  return <p className="friend-details">{friend}</p>;
};

export default FriendDetails;
