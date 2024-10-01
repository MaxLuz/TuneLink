import "./App.css";
import React, { useState } from "react";
import { SpotifyAuth, SpotifyAuthListener } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css"; // Import the styles for the Spotify login button
import TopArtists from "./TopArtists";
import Navbar from "./Navbar";
import TopSongs from "./TopSongs";
import Welcome from "./Welcome";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("spotifyAuthToken"));
  const [spotuser, setSpotuser] = useState("not-logged-in");

  return (
    <div className="App">
      <Navbar />

      <div className="main-content">
        <div>
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
              <div className="data-components">
                <TopArtists token={token} />
                <TopSongs token={token} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
