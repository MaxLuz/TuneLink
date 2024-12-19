import React from "react";
import "../styles/Friends.css";
import { useEffect, useState } from "react";
import FriendForm from "../components/FriendForm";
import { useAuthContext } from "../hooks/useAuthContext";
import FriendRequestDetails from "../components/FriendRequestDetails";
import FriendDetails from "../components/FriendDetails";
import { useFriendRequestContext } from "../hooks/useFriendRequestContext";
import { useFriendListContext } from "../hooks/useFriendListContext";
import { useCurrentFriendDataContext } from "../hooks/useCurrentFriendDataContext";
import FriendsList from "../components/FriendsList";
import FriendRequestsList from "../components/FriendRequestsList";
import Inbox from "../components/Inbox";
import SongForm from "../components/SongForm";
import axios from "axios";
import ListeningHabits from "../components/ListeningHabits";
import TopArtists from "../components/TopArtists";
import TopSongs from "../components/TopSongs";
import { Link } from "react-router-dom";

const Friends = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  // const [friendRequests, setFriendRequests] = useState("");
  // const [friends, setFriends] = useState([]);
  const { friendrequests, dispatch_friendrequests } = useFriendRequestContext();
  const { friends, dispatch_friends } = useFriendListContext();
  const { friendData } = useCurrentFriendDataContext();
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [spotifytoken, setSpotToken] = useState();

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth", // Smooth scroll effect
    });
  };

  // fetches all current friend requests for user
  useEffect(() => {
    const fetchFriendRequests = async () => {
      const response = await fetch("api/friends/requests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.message);
      }
      if (response.ok) {
        // setFriendRequests(json);
        // dispatches context for all friend requests
        dispatch_friendrequests({ type: "SET_FRIENDREQUESTS", payload: json });
      }
    };
    if (user) {
      fetchFriendRequests();
    }
  }, [user]);

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
        // setFriends(json);
        dispatch_friends({ type: "SET_FRIENDS", payload: json });
      }
    };
    if (user) {
      fetchFriends();
    }
  }, [user]);

  // Fetch top artists when component mounts
  useEffect(() => {
    if (spotifytoken) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${spotifytoken}`,
          },
          params: {
            limit: 20, // Get top 20 artists
            time_range: "short_term",
          },
        })
        .then((response) => {
          setArtists(response.data.items);
        })
        .catch((error) => console.error("Error fetching top artists:", error));
    }
  }, [spotifytoken]);

  useEffect(() => {
    const getSpotifyToken = async () => {
      console.log("Username: " + friendData);
      try {
        // Send a GET request to the backend
        const response = await axios.get("/api/user/spotifytoken", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username: `${friendData}`,
          },
        });

        // Extract and return the Spotify token
        setSpotToken(response.data);
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
  }, [friendData, user]);

  // fetch top songs when component mounts
  useEffect(() => {
    if (spotifytoken) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${spotifytoken}`,
          },
          params: {
            limit: 20, // Get top 10 tracks
            time_range: "short_term",
          },
        })
        .then((response) => {
          setTracks(response.data.items);
        })
        .catch((error) => console.error("Error fetching top tracks: ", error));
    }
  }, [spotifytoken]);

  return (
    <div className="friends-wrapper">
      <div className="friends-page-top">
        <div className="dashboard-welcome friends-welcome">
          <div className="welcome-top">
            <h2>Friends</h2>
            <p className="welcome-text">See what your friends listen to!</p>
          </div>
          <div className="welcome-bottom">
            <div className="welcome-bottom-text">
              <h1 className="total-time">
                5 <span className="smaller-size">friends</span>
              </h1>
              <p className="welcome-text friend-text-under">
                To see data, select from friends list!
              </p>
            </div>
          </div>
          <div className="buttons-container-mobile">
            <Link className="toggle-button" onClick={handleScrollToBottom}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path
                  opacity=".4"
                  d="M0 512l448 0L384 304 64 304 0 512zM96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128z"
                />
                <path d="M504 312l0 24 48 0 0-24 0-64 64 0 24 0 0-48-24 0-64 0 0-64 0-24-48 0 0 24 0 64-64 0-24 0 0 48 24 0 64 0 0 64z" />
              </svg>
              Add
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
        <div className="friends-features-wrapper">
          <div className="friendslist-wrapper">
            <FriendsList friends={friends} />
          </div>
          <div id="friendform-top" className="friendform-wrapper">
            <FriendForm />
          </div>

          <div id="friend-requests-top" className="friend-requests-wrapper">
            <FriendRequestsList />
          </div>
        </div>
      </div>
      <div className="friends-page-bottom">
        <div className="listening-habits">
          <div className="listening-habits-top">
            <div className="listening-habits-text">
              <h2 className="lh-title">Listening Habits</h2>
              <p className="lh-text">
                <span className="blue-text">{friendData}'s</span> favorites from
                this month
              </p>
            </div>
          </div>
          <div className="listening-habits-bottom">
            <div className="tracks-container">
              <TopSongs token={spotifytoken} timeframe={"short_term"} />
            </div>
            <div className="artists-container">
              <TopArtists token={spotifytoken} timeframe={"short_term"} />
            </div>
          </div>
        </div>
      </div>
      <div className="hide_on_desktop">
        <div id="friendform-bottom">
          <FriendForm />
        </div>
        <div className="friend-requests-wrapper">
          <FriendRequestsList />
        </div>
      </div>
    </div>
  );
};

export default Friends;
