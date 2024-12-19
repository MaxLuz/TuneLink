import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";
import { useFriendListContext } from "../hooks/useFriendListContext";

const FriendRequestDetails = ({ request }) => {
  const { user } = useAuthContext();
  const { dispatch_friendrequests } = useFriendRequestContext();
  const { dispatch_friends } = useFriendListContext();

  const handleAccept = async () => {
    console.log("Accept!");
    const _id = request._id;
    const requestId = { _id };
    const response = await fetch("/api/friends/accept", {
      method: "POST",
      body: JSON.stringify(requestId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("Error handling accept: ", json.error);
    }

    if (response.ok) {
      // handle request list refresh
      dispatch_friendrequests({ type: "FRIENDREQUEST_ACTION", payload: json });
      dispatch_friends({ type: "ADDED_FRIEND", payload: json.from });
    }
  };

  const handleReject = async () => {
    console.log("Reject!");
    const _id = request._id;
    const requestId = { _id };
    const response = await fetch("/api/friends/reject", {
      method: "POST",
      body: JSON.stringify(requestId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("Error handling reject: ", json.error);
    }

    if (response.ok) {
      dispatch_friendrequests({ type: "FRIENDREQUEST_ACTION", payload: json });
    }
  };

  return (
    <div className="friend-request-object">
      <p className="request-from">{request.from}</p>
      <div className="friend-request-buttons">
        <button onClick={handleAccept} className="accept">
          <p>Confirm</p>
        </button>
        <button onClick={handleReject} className="reject">
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default FriendRequestDetails;
