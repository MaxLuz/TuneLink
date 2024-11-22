import React, { useEffect } from "react";
import "../styles/DiscoveryList.css";
import { useState } from "react";
import axios from "axios";

const DiscoveryList = ({ token }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/recommendations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 20, // Get top 20 tracks
            seed_artists: "0Y4inQK6OespitzD6ijMwb,165ZgPlLkK7bf5bDoFc6Sb", // Comma-separated artist IDs
            seed_tracks:
              "60a0Rd6pjrkxjPbaKzXjfq,22JoVWZlY49vSLzssk8RL7,1TEZWG1FdjzDdercCguTwj", // Comma-separated track IDs
          },
        })
        .then((response) => {
          console.log("API response: " + response.data.tracks);
          setTracks(response.data.tracks);
        })
        .catch((error) => {
          console.error(
            "Error fetching recommendations: ",
            error.response ? error.response.data : error
          );
        });
    }
  }, [token]);

  return (
    <div className="discovery-list">
      <h2 className="topSongs-h2 discovery-title">Discovery List</h2>
      <div className="underline">
        <p className="pound">#</p>
        <p className="song-name">Song name</p>
        <p className="popularity">Popularity</p>
      </div>
      <ul className="topSongs-ul discovery-ul">
        {tracks.map((track, index) => (
          <li className="topSongs-li discovery-li" key={track.id}>
            <p className="index">{index + 1}</p>
            <div className="image-wrapper discovery-image">
              <img
                className="topSongs-img"
                src={track.album.images[0].url}
                alt={track.name}
                width="100"
              />
            </div>

            <div className="song-info discovery-song-info">
              <p className="topSongs-name">{track.name}</p>
              <p>{track.artists[0].name}</p>
            </div>

            <div className="popularity-metric">{track.popularity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscoveryList;
