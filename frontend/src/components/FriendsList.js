import React from "react";
import FriendDetails from "./FriendDetails";
import "../styles/FriendsList.css";

const FriendsList = ({ friends }) => {
  return (
    <div className="friendlist-wrapper friendlist-friendspage">
      <h2>Friends List</h2>
      <div className="friendslist-scroll">
        {friends &&
          friends.map((friend, index) => (
            <li key={index}>
              <FriendDetails friend={friend} />
            </li>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
