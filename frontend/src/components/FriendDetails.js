import { useEffect, useState } from "react";
import "../styles/FriendDetails.css";

const FriendDetails = ({ friend }) => {
  return <p>{friend.email}</p>;
};

export default FriendDetails;
