import React from "react";
import { useSongsContext } from "../hooks/useSongContext";

// returns the details of the current song for the favorite songs list
const SongDetails = ({ song }) => {
  const { dispatch } = useSongsContext();

  const handleDelete = async () => {
    const response = await fetch("/api/songs/" + song._id, {
      method: "DELETE",
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
