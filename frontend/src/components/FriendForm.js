import React from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const FriendForm = () => {
  const [frienduser, setFrienduser] = useState("");
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    const from = user.username;
    const to = frienduser;

    const friendRequest = { from, to };

    const response = await fetch("/api/friends/request", {
      method: "POST",
      body: JSON.stringify(friendRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }

    if (response.ok) {
      setFrienduser("");
      setError(null);
      setSuccess(json.message);
    }
  };

  return (
    <div className="friend-form-wrapper">
      <h2>Add a Friend</h2>
      <form className="friendform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Friend Username"
          onChange={(e) => setFrienduser(e.target.value)}
          value={frienduser}
        />
        <button>Send friend request</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default FriendForm;
