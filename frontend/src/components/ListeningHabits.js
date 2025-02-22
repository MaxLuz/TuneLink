import React from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import "../styles/ListeningHabits.css";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ListeningHabits = () => {
  const spotifytoken = localStorage.getItem("spotify_access_token");
  const values = ["short_term", "medium_term", "long_term"];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeframe, setTimeframe] = useState("short_term");
  const { user } = useAuthContext();

  const handleToggle = () => {
    setCurrentIndex((currentIndex + 1) % values.length);
    setTimeframe(values[currentIndex]);
  };

  const handleOption = (event) => {
    const option = event.target.value;

    const tracksContainer = document.getElementById("tracks-container");
    const artistsContainer = document.getElementById("artists-container");
    const tracksbtn = document.getElementById("tracks-btn");
    const artistsbtn = document.getElementById("artists-btn");

    if (option === "tracks") {
      tracksContainer.style.display = "flex";
      artistsContainer.style.display = "none";
      tracksbtn.style.color = "white";
      artistsbtn.style.color = "gray";
    } else if (option === "artists") {
      tracksContainer.style.display = "none";
      artistsContainer.style.display = "flex";
      artistsbtn.style.color = "white";
      tracksbtn.style.color = "gray";
    }
  };
  return (
    <div className="listening-habits">
      <div className="listening-habits-top">
        <div className="listening-habits-text">
          <h2 className="lh-title">Listening Habits</h2>
          <p className="lh-text">
            Your favorites from this
            {timeframe === "short_term" ? (
              <span className="time-period"> month</span>
            ) : timeframe === "medium_term" ? (
              <span className="time-period"> 6 months</span>
            ) : timeframe === "long_term" ? (
              <span className="time-period"> year</span>
            ) : null}
          </p>
        </div>
        <button className="toggle-button" onClick={handleToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              opacity=".4"
              d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0L224 0l0 32 0 64 0 32 64 0 0-32 0-29.3C378.8 81.9 448 160.9 448 256c0 106-86 192-192 192S64 362 64 256c0-53.7 22-102.3 57.6-137.1L76.8 73.1C29.5 119.6 0 184.4 0 256z"
            />
            <path d="M176 142.1l17 17 80 80 17 17L256 289.9l-17-17-80-80-17-17L176 142.1z" />
          </svg>
          Toggle
        </button>
      </div>
      <div className="listening-habits-bottom">
        <div className="options">
          <button
            id="tracks-btn"
            className="listening-habits-option"
            value="tracks"
            onClick={handleOption}
          >
            Tracks
          </button>
          <button
            id="artists-btn"
            className="listening-habits-option"
            value="artists"
            onClick={handleOption}
          >
            Artists
          </button>
        </div>

        <div id="tracks-container" className="tracks-container">
          <TopSongs
            token={spotifytoken}
            timeframe={timeframe}
            username={user.username}
            isFriend={false}
          />
        </div>
        <div id="artists-container" className="artists-container">
          <TopArtists
            token={spotifytoken}
            timeframe={timeframe}
            isFriend={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ListeningHabits;
