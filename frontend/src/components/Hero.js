import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Hero.css";

const Hero = ({ token }) => {
  const [artist, setArtist] = useState("");

  // Fetch top artists when component mounts
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 1, // Get top artist
            time_range: `short_term`, // timeframe set to short term, artist of the month
          },
        })
        .then((response) => {
          setArtist(response.data.items[0]);
        })
        .catch((error) => console.error("Error fetching top artist:", error));
    }
  }, [token]);

  return (
    <div className="hero-container">
      <h1>{artist.name}</h1>
      <img src={artist.images[0].url} alt="" />
    </div>
  );
};

export default Hero;
