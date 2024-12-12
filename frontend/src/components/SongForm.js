import React from "react";
import { useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/songForm.css";

const SongForm = () => {
  const { dispatch } = useSongsContext();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [username_to, setUsername_to] = useState("");
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
    const username_from = user.username;
    const song = { title, artist, username_to, username_from };

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
      setUsername_to("");
      // setPlays("");
      setError(null);
      console.log("New Song added!", json);
      dispatch({ type: "CREATE_SONG", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Song Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <input
        type="text"
        placeholder="Song Artist"
        onChange={(e) => setArtist(e.target.value)}
        value={artist}
      />

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername_to(e.target.value)}
        value={username_to}
      />

      {/* <label>Song Plays:</label>
      <input
        type="number"
        onChange={(e) => setPlays(e.target.value)}
        value={plays}
      /> */}
      <button>Send Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SongForm;
