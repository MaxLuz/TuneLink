import React from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import "../styles/ListeningHabits.css";

const ListeningHabits = ({ timeframe }) => {
  const spotifytoken = localStorage.getItem("spotify_access_token");
  return (
    <div className="listening-habits">
      <div className="listening-habits-top">
        <div className="listening-habits-text">
          <h2 className="lh-title">Listening Habits</h2>
          <p className="lh-text">
            Your favorites from this
            <span className="time-period"> month</span>
          </p>
        </div>
        <button className="toggle-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              class="fa-secondary"
              opacity=".4"
              d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0L224 0l0 32 0 64 0 32 64 0 0-32 0-29.3C378.8 81.9 448 160.9 448 256c0 106-86 192-192 192S64 362 64 256c0-53.7 22-102.3 57.6-137.1L76.8 73.1C29.5 119.6 0 184.4 0 256z"
            />
            <path
              class="fa-primary"
              d="M176 142.1l17 17 80 80 17 17L256 289.9l-17-17-80-80-17-17L176 142.1z"
            />
          </svg>
          Toggle
        </button>
      </div>
      <div className="listening-habits-bottom">
        <div className="tracks-container">
          <TopSongs token={spotifytoken} timeframe={timeframe} />
        </div>
        <div className="artists-container">
          <TopArtists token={spotifytoken} timeframe={timeframe} />
        </div>
      </div>
    </div>
  );
};

export default ListeningHabits;
