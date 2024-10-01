import React, { useEffect, useState } from "react";
import axios from "axios";

const TopArtists = ({ token }) => {
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
          },
        })
        .then((response) => {
          setArtists(response.data.items);
        })
        .catch((error) => console.error("Error fetching top artists:", error));
    }
  }, [token]);

  return (
    <div>
      <h2>Your Top 10 Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <p>{artist.name}</p>
            <img src={artist.images[0]?.url} alt={artist.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
