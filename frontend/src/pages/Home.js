import React from "react";
import { useEffect, useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import TopArtists from "../components/TopArtists";
import TopSongs from "../components/TopSongs";
import Welcome from "../components/Welcome";
import Buttons from "../components/Buttons";
import Hero from "../components/Hero";
// styles
import "../styles/Home.css";

const Home = () => {
  const spotifytoken = localStorage.getItem("spotify_access_token");
  const [spotuser, setSpotuser] = useState("not-logged-in");
  const [timeframe, setTimeframe] = useState("short_term");

  const { songs, dispatch } = useSongsContext();
  const { user } = useAuthContext();

  // checks for spotify refresh token
  const checkForTokens = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      // Store refresh token in local storage
      localStorage.setItem("spotify_access_token", accessToken);
    }

    // clear the URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // fetches all of the current favorite songs
  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        // dispatches context for all songs
        dispatch({ type: "SET_SONGS", payload: json });
      }
    };
    if (user) {
      fetchSongs();
    }
  }, [dispatch, user]);

  useEffect(() => {
    checkForTokens();
  });

  return (
    <div className="home">
      <div className="main-content">
        {!spotifytoken ? (
          <div className="hello">Hello there</div>
        ) : (
          <div className="isAuthenticated">
            <div className="dashboard-top-container">
              <Welcome
                token={spotifytoken}
                spotuser={spotuser}
                setSpotuser={setSpotuser}
              />
              <Hero token={spotifytoken} />
            </div>
            <div className="dashboard-bottom-container">
              <div className="bottom-fav-songs-container">
                <div className="favorite-songs">
                  <SongForm />
                  <div className="songs">
                    {songs &&
                      songs.map((song) => (
                        <SongDetails key={song._id} song={song} />
                      ))}
                  </div>
                </div>
              </div>
              <div className="bottom-top-stats-container">
                <Buttons timeframe={timeframe} setTimeframe={setTimeframe} />

                <div className="data-components">
                  <TopArtists token={spotifytoken} timeframe={timeframe} />
                  <TopSongs token={spotifytoken} timeframe={timeframe} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
