import React from "react";
import "../styles/Friends.css";
import { useEffect, useState } from "react";
import FriendForm from "../components/FriendForm";
import { useAuthContext } from "../hooks/useAuthContext";
import FriendRequestDetails from "../components/FriendRequestDetails";
import FriendDetails from "../components/FriendDetails";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";
import { useFriendListContext } from "../hooks/useFriendListContext";

const Friends = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  // const [friendRequests, setFriendRequests] = useState("");
  // const [friends, setFriends] = useState([]);
  const { friendrequests, dispatch } = useFriendRequestContext();
  const { friends, dispatch_friends } = useFriendListContext();

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
        // setFriendRequests(json);
        // dispatches context for all friend requests
        dispatch({ type: "SET_FRIENDREQUESTS", payload: json });
      }
    };
    if (user) {
      fetchFriendRequests();
    }
  }, [user]);

  // fetches all current friends of logged in user
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch("/api/friends", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        // setFriends(json);
        dispatch_friends({ type: "SET_FRIENDS", payload: json });
      }
    };
    if (user) {
      fetchFriends();
    }
  }, [user]);

  return (
    <div className="friends-wrapper">
      <div className="friends-thirds-container">
        <FriendForm />
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
        <div className="friendrequests">
          <h2>Friend Requests</h2>
          <div className="friendslist-scroll">
            {friendrequests &&
              friendrequests.map((request) => (
                <FriendRequestDetails key={request._id} request={request} />
              ))}
          </div>
        </div>
      </div>
      .
    </div>
  );
};

export default Friends;
