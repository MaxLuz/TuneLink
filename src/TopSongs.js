import React, { useEffect, useState } from "react";
import axios from "axios";

const TopSongs = ({ token }) => {
  const [tracks, setTracks] = useState([]);

  // fetch top songs when component mounts
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 10, // Get top 10 tracks
          },
        })
        .then((response) => {
          setTracks(response.data.items);
        })
        .catch((error) => console.error("Error fetching top tracks: ", error));
    }
  }, [token]);

  return (
    <div>
      <h2>Your Top 10 Songs</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <p>{track.name}</p>
            <p>{track.artists.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSongs;
