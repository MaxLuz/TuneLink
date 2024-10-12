import React from "react";
import { useEffect, useState } from "react";
// components
import SongDetails from "../components/SongDetails";

const Home = () => {
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs");
      const json = await response.json();

      if (response.ok) {
        setSongs(json);
      }
    };

    fetchSongs();
  }, []);
  return (
    <div className="home">
      <div className="songs">
        {songs &&
          songs.map((song) => <SongDetails key={song._id} song={song} />)}
      </div>
    </div>
  );
};

export default Home;
