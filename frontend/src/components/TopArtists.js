import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TopArtists.css";

const TopArtists = ({ token, timeframe }) => {
  const [artists, setArtists] = useState([]);

  // Fetch top artists when component mounts
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 10, // Get top 10 artists
            time_range: `${timeframe}`,
          },
        })
        .then((response) => {
          setArtists(response.data.items);
        })
        .catch((error) => console.error("Error fetching top artists:", error));
    }
  }, [token, timeframe]);

  return (
    <div className="topArtists-wrapper">
      <h2 className="topArtists-h2">Your Top Artists</h2>

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
  );
};

export default TopArtists;
