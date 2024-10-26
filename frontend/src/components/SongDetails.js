import React from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";

// returns the details of the current song for the favorite songs list
const SongDetails = ({ song }) => {
  const { dispatch } = useSongsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/songs/" + song._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SONG", payload: json });
    }
  };

  return (
    <div className="song-details">
      <h4>{song.title}</h4>
      <p>{song.artist}</p>
      <p>{song.createdAt}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SongDetails;
