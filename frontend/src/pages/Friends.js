import React from "react";
import "../styles/Friends.css";
import { useEffect, useState } from "react";
import FriendForm from "../components/FriendForm";
import { useAuthContext } from "../hooks/useAuthContext";
import FriendRequestDetails from "../components/FriendRequestDetails";

const Friends = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [friendRequests, setFriendRequests] = useState("");

  // fetches all current friend requests for user
  useEffect(() => {
    const fetchFriendRequests = async () => {
      const response = await fetch("api/friends/requests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        setFriendRequests(json);
      }
    };
    if (user) {
      fetchFriendRequests();
    }
  }, [user]);

  return (
    <div className="friends-wrapper">
      <FriendForm />
      <div className="friendrequests">
        {friendRequests &&
          friendRequests.map((request) => (
            <FriendRequestDetails key={request._id} request={request} />
          ))}
      </div>
    </div>
  );
};

export default Friends;
