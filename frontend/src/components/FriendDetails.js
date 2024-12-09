import { useEffect, useState } from "react";
import "../styles/FriendDetails.css";
import { useCurrentFriendDataContext } from "../hooks/useCurrentFriendDataContext";
const FriendDetails = ({ friend }) => {
  const { dispatch_friendData } = useCurrentFriendDataContext();

  const handleClick = (event) => {
    dispatch_friendData({ type: "SET_FRIEND", payload: event.target.value });
  };

  return (
    <button className="friend-details" value={friend} onClick={handleClick}>
      {friend}
    </button>
  );
};

export default FriendDetails;
