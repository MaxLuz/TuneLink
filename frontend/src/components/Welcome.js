import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "../styles/Welcome.css";
import { Link } from "react-router-dom";

const Welcome = ({ token, spotuser, setSpotuser }) => {
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            //none
          },
        })
        .then((response) => {
          setSpotuser(response.data.display_name);
        })
        .catch((error) => console.error("Error fetching username:", error));
    }
  }, [token]);

  return (
    <div className="welcome-container">
      <h1 className="welcome-h1">Welcome, {spotuser}! </h1>
      <p className="welcome-text">
        Welcome to TuneLink, the best place to find new music! Add friends to
        discover their music preferences, or navigate your dashboard to explore
        on your own!
      </p>
      <Link className="friends-link" to="/Friends">
        <button className="welcome-button">
          Find Friends
          <svg
            className="arrow-button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="white"
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Welcome;
