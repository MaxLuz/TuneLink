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
import axios from "axios";

const Friends = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  // const [friendRequests, setFriendRequests] = useState("");
  // const [friends, setFriends] = useState([]);
  const { friendrequests, dispatch } = useFriendRequestContext();
  const { friends, dispatch_friends } = useFriendListContext();
  const { friendData } = useCurrentFriendDataContext();
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [spotifytoken, setSpotToken] = useState();
  // const spotifytoken = localStorage.getItem("spotify_access_token");

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
        dispatch({ type: "SET_FRIENDREQUESTS", payload: json });
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
      <div className="friends-thirds-container">
        <FriendForm />
        <div className="friendlist-wrapper friendlist-friendspage">
          <h2>Friends List</h2>
          <div className="friendslist-scroll">
            {friends &&
              friends.map((friend, index) => (
                <li key={index}>
                  <FriendDetails friend={friend} />
                </li>
              ))}
          </div>
        </div>
        <div className="friendrequests">
          <h2>Friend Requests</h2>
          <div className="friendslist-scroll">
            {friendrequests &&
              friendrequests.map((request) => (
                <FriendRequestDetails key={request._id} request={request} />
              ))}
          </div>
        </div>
      </div>
      <div className="friends-bottom-container">
        <div className="friends-inbox">
          <h2>Inbox</h2>
        </div>
        <div className="friends-activity">
          <h2>Friend Activity</h2>
          <p className="current-friend">{friendData}</p>
          <div className="friend-data">
            <div className="topArtists-wrapper friends-activity-dash">
              <h2 className="topArtists-h2">Top Artists</h2>

              <ul className="topArtists-ul">
                {artists.map((artist) => (
                  <li className="topArtists-li" key={artist.id}>
                    <div className="image-wrapper">
                      <img
                        className="topArtists-img"
                        src={artist.images[0]?.url}
                        alt={artist.name}
                        width="100"
                      />
                    </div>

                    <p className="topArtists-name">{artist.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="topSongs-wrapper friends-activity-dash">
              <h2 className="topSongs-h2">Top Tracks</h2>
              <ul className="topSongs-ul">
                {tracks.map((track) => (
                  <li className="topSongs-li" key={track.id}>
                    <div className="image-wrapper">
                      <img
                        className="topSongs-img"
                        src={track.album.images[0].url}
                        alt={track.name}
                        width="100"
                      />
                    </div>

                    <div className="song-info">
                      <p className="topSongs-name">{track.name}</p>
                      <p>{track.artists[0].name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
