import "./App.css";
import React, { useState } from "react";
import { SpotifyAuth, SpotifyAuthListener } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css"; // Import the styles for the Spotify login button
import TopArtists from "./components/TopArtists";
import Navbar from "./components/Navbar";
import TopSongs from "./components/TopSongs";
import Welcome from "./components/Welcome";
import Buttons from "./components/Buttons";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("spotifyAuthToken"));
  const [spotuser, setSpotuser] = useState("not-logged-in");
  const [timeframe, setTimeframe] = useState("short_term");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>

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
            <Buttons timeframe={timeframe} setTimeframe={setTimeframe} />
            <div className="data-components">
              <TopArtists token={token} timeframe={timeframe} />
              <TopSongs token={token} timeframe={timeframe} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
