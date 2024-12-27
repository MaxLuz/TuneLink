import React from "react";
import { useEffect, useState } from "react";
import { useSongsContext } from "../hooks/useSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";
import { Link } from "react-router-dom";
// components
import ListeningHabits from "../components/ListeningHabits";
import axios from "axios";
// styles
import "../styles/Home.css";
import "../styles/Navbar.css";

const Home = () => {
  // const [spotifytoken, setSpotToken] = useState();
  const spotifytoken = localStorage.getItem("spotify_access_token");
  const [spotuser, setSpotuser] = useState("not-logged-in");
  const [timeframe, setTimeframe] = useState("short_term");
  const [friends, setFriends] = useState("");
  const [error, setError] = useState(null);
  const { friendrequests, dispatch_friendrequests } = useFriendRequestContext();
  const { songs, dispatch } = useSongsContext();
  const { user } = useAuthContext();
  const [discoveredTracks, setDiscoveredTracks] = useState(0);

  useEffect(() => {
    const fetchDiscoveredTracks = async () => {
      const response = await axios.get(
        `/api/user/discovered/${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDiscoveredTracks(response.data.count);
      console.log(response.data.count);
    };
    if (user) {
      fetchDiscoveredTracks();
    }
  }, [user]);

  useEffect(() => {
    const getSpotifyToken = async () => {
      // console.log("Username: " + user.username);
      try {
        // Send a GET request to the backend
        const response = await axios.get("/api/user/spotifytoken", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username: `${user.username}`,
            refresh: "false",
          },
        });

        // Extract and return the Spotify token
        localStorage.setItem("spotify_access_token", response.data);
        // console.log("response:" + response.data);
      } catch (error) {
        console.error(
          "Error fetching Spotify token:",
          error.response?.data || error.message
        );
        throw error;
      }
    };
    if (user) {
      getSpotifyToken();
    }
  }, [user]);

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth", // Smooth scroll effect
    });
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
                {discoveredTracks} <span className="smaller-size">tracks</span>
              </h1>
              <p className="welcome-text">
                Tracks discovered since signing up on 12/16/24
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
          <div className="buttons-container-mobile">
            <Link className="toggle-button" to="/Friends">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path
                  className="fa-secondary"
                  opacity=".4"
                  fill="#ffffff"
                  d="M352.7 223.1C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112c-31 0-59-12.6-79.3-32.9zM422.4 320L576 320l64 192-158.5 0-2.9-9.4L422.4 320z"
                />
                <path
                  className="fa-primary"
                  fill="#ffffff"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM448 512L384 304 64 304 0 512l448 0z"
                />
              </svg>
              Friends
            </Link>
            <Link className="toggle-button" to="/inbox">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  opacity=".4"
                  d="M0 144L0 448l512 0 0-304L256 320 0 144z"
                />
                <path d="M0 144V64H512v80L256 320 0 144z" />
              </svg>
              Inbox
            </Link>
            <Link
              className="toggle-button"
              to="/inbox"
              onClick={handleScrollToBottom}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  opacity=".4"
                  d="M0 304C0 432 128 480 128 480s-32-32-32-80c0-61.9 50.1-112 112-112l80 0 0-160-112 0C78.8 128 0 206.8 0 304z"
                />
                <path d="M320 384L512 208 320 32l-32 0 0 352 32 0z" />
              </svg>
              Share
            </Link>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-content-left">
            <ListeningHabits
              spotifytoken={spotifytoken}
              timeframe={timeframe}
            />
            {/* <div className="home-dash-friends">
              <div className="share-a-song">
                <h2 className="sas_title">Share a Song</h2>
                <SongForm />
              </div>
              <div className="friends-list">
                <FriendsList friends={friends} />
              </div>
              <div className="friend-requests">
                <FriendRequestsList />
              </div>
            </div> */}
          </div>
          <div className="dashboard-content-left"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
