import React from "react";
import { useEffect, useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { SpotifyAuth, SpotifyAuthListener } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css"; // Import the styles for the Spotify login button
import { useAuthContext } from "../hooks/useAuthContext";
// components
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import TopArtists from "../components/TopArtists";
import TopSongs from "../components/TopSongs";
import Welcome from "../components/Welcome";
import Buttons from "../components/Buttons";
import Hero from "../components/Hero";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("spotifyAuthToken"));
  const [spotuser, setSpotuser] = useState("not-logged-in");
  const [timeframe, setTimeframe] = useState("short_term");

  const { songs, dispatch } = useSongsContext();
  const { user } = useAuthContext();

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
  return (
    <div className="home">
      <div className="main-content">
        {/* Listener to automatically store the token in localStorage */}
        <SpotifyAuthListener onAccessToken={(token) => setToken(token)} />

        {!token ? (
          // Spotify login button
          <SpotifyAuth
            redirectUri="http://localhost:3000/" // Redirect after Spotify authentication
            clientID="df95797d307541d79a1e2a2d3bc3e072"
            scopes={["user-top-read"]} // Scopes required for your app
          />
        ) : (
          // data displays when user is authenticated
          <div className="isAuthenticated">
            <Welcome
              token={token}
              spotuser={spotuser}
              setSpotuser={setSpotuser}
            />
            <Hero token={token} />
            <Buttons timeframe={timeframe} setTimeframe={setTimeframe} />
            <div className="data-components-wrapper">
              <div className="data-components">
                <TopArtists token={token} timeframe={timeframe} />
                <TopSongs token={token} timeframe={timeframe} />
              </div>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
