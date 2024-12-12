import React from "react";
import "../styles/Inbox.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
const Inbox = () => {
  const [tracks, setTracks] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  useEffect(() => {
    // Fetch top tracks
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/songs/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username_to: user.username,
          },
        });

        // Set tracks with the returned data
        setTracks(response.data);
        console.log("Fetched tracks: ", response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchData();
  }, [user]);
  return (
    <div className="inbox-container">
      <h2>Inbox</h2>
      <div className="underline">
        <p className="pound">#</p>
        <p className="song-name">Song name</p>
        <p className="popularity">From</p>
      </div>
      {error && <p>Error: {error}</p>}
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.title} by {track.artist} from {track.username_to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
