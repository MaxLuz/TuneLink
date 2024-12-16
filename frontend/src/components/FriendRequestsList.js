import React from "react";
import FriendRequestDetails from "./FriendRequestDetails";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";
import "../styles/FriendRequestsList.css";

const FriendRequestsList = () => {
  const { friendrequests } = useFriendRequestContext();
  return (
    <div className="friendrequests">
      <h2>Friend Requests</h2>
      <div className="friendslist-scroll">
        {friendrequests &&
          friendrequests.map((request) => (
            <FriendRequestDetails key={request._id} request={request} />
          ))}
      </div>
    </div>
  );
};

export default FriendRequestsList;
