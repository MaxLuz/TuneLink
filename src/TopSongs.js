import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/TopSongs.css";

const TopSongs = ({ token, timeframe }) => {
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
            time_range: `${timeframe}`,
          },
        })
        .then((response) => {
          setTracks(response.data.items);
        })
        .catch((error) => console.error("Error fetching top tracks: ", error));
    }
  }, [token, timeframe]);

  return (
    <div className="topSongs-wrapper">
      <h2 className="topSongs-h2">Your Top 10 Songs</h2>
      <ul className="topSongs-ul">
        {tracks.map((track) => (
          <li className="topSongs-li" key={track.id}>
            <img
              className="topSongs-img"
              src={track.album.images[0].url}
              alt={track.name}
              width="100"
            />
            <div className="song-info">
              <p className="topSongs-name">{track.name}</p>
              <p>{track.artists[0].name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSongs;
