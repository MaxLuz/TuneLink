import React from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/songDetails.css";

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
      <h4 className="song-title">{song.title}</h4>
      <p className="song-artist">{song.artist}</p>
      <button className="delete-song" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default SongDetails;
