import React from "react";
import { useState } from "react";

const SongForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [plays, setPlays] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    const song = { title, artist, plays };

    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setArtist("");
      setPlays("");
      setError(null);
      console.log("New Song added!", json);
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

      <label>Song Plays:</label>
      <input
        type="number"
        onChange={(e) => setPlays(e.target.value)}
        value={plays}
      />
      <button>Add Song</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SongForm;
