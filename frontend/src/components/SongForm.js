import React from "react";
import { useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/songForm.css";

const SongForm = () => {
  const { dispatch } = useSongsContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  // const [plays, setPlays] = useState("");
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  // form gets submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const song = { title, artist };

    // adds a song to the database
    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    // if we get a good response, clear the state data for the song for the next song to be added
    if (response.ok) {
      setTitle("");
      setArtist("");
      // setPlays("");
      setError(null);
      console.log("New Song added!", json);
      dispatch({ type: "CREATE_SONG", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Song</h3>

      <label>Song Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Song Artist:</label>
      <input
        type="text"
        onChange={(e) => setArtist(e.target.value)}
        value={artist}
      />

      {/* <label>Song Plays:</label>
      <input
        type="number"
        onChange={(e) => setPlays(e.target.value)}
        value={plays}
      /> */}
      <button>Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SongForm;
