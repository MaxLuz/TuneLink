import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";

const FriendRequestDetails = ({ request }) => {
  const { user } = useAuthContext();
  const { dispatch } = useFriendRequestContext();

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
      dispatch({ type: "FRIENDREQUEST_ACTION", payload: json });
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
      dispatch({ type: "FRIENDREQUEST_ACTION", payload: json });
    }
  };

  return (
    <div className="friend-request-object">
      <p className="request-from">{request.from}</p>
      <div className="friend-request-buttons">
        <button onClick={handleAccept} className="accept">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
        </button>
        <button onClick={handleReject} className="reject">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendRequestDetails;
