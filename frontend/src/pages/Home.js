import React from "react";
import { useEffect, useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
// components
import Navbar from "../components/Navbar";
import SongDetails from "../components/SongDetails";
import SongForm from "../components/SongForm";
import TopArtists from "../components/TopArtists";
import TopSongs from "../components/TopSongs";
import Welcome from "../components/Welcome";
import Buttons from "../components/Buttons";
import Hero from "../components/Hero";
import FriendDetails from "../components/FriendDetails";
import SideNav from "../components/SideNav";
import ListeningHabits from "../components/ListeningHabits";
// styles
import "../styles/Home.css";
import "../styles/Navbar.css";
import DiscoveryList from "../components/DiscoveryList";

const Home = () => {
  const spotifytoken = localStorage.getItem("spotify_access_token");
  const [spotuser, setSpotuser] = useState("not-logged-in");
  const [timeframe, setTimeframe] = useState("short_term");
  const [friends, setFriends] = useState("");
  const [error, setError] = useState(null);

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

  // fetches all current friends of logged in user
  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch("/api/friends", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setFriends(json);
      }
    };
    if (user) {
      fetchFriends();
    }
  }, [user]);

  return (
    <div className="home">
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <div className="welcome-top">
            <h2>Dashboard</h2>
            <p className="welcome-text">Welcome to your TuneLink dashboard!</p>
          </div>
          <div className="welcome-bottom">
            <div className="welcome-bottom-text">
              <h1 className="total-time">
                1,239 <span className="smaller-size">min</span>
              </h1>
              <p className="welcome-text">
                Total time spent listening since signing up on 12/16/24
              </p>
            </div>
            <Link className="add-friends" to="/Friends">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path
                  opacity=".4"
                  d="M0 512l448 0L384 304 64 304 0 512zM96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128z"
                />
                <path d="M504 312l0 24 48 0 0-24 0-64 64 0 24 0 0-48-24 0-64 0 0-64 0-24-48 0 0 24 0 64-64 0-24 0 0 48 24 0 64 0 0 64z" />
              </svg>
              Add friends
            </Link>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-content-right">
            <ListeningHabits timeframe={timeframe} />
            <div className="home-dash-friends">
              <div className="share-a-song"></div>
              <div className="friends-list"></div>
              <div className="friend-requests"></div>
            </div>
          </div>
          <div className="dashboard-content-left"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
