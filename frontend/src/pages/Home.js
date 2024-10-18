import React from "react";
import { useEffect } from "react";
import { useSongsContext } from "../hooks/useSongContext";
// components
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";

const Home = () => {
  const { songs, dispatch } = useSongsContext();

  // fetches all of the current favorite songs
  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs");
      const json = await response.json();

      if (response.ok) {
        // dispatches context for all songs
        dispatch({ type: "SET_SONGS", payload: json });
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
      <SongForm />
    </div>
  );
};

export default Home;
