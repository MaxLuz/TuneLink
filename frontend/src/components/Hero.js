import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Hero.css";

const Hero = ({ token }) => {
  const [artist, setArtist] = useState([]);
  const [track, setTrack] = useState([]);

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
          setArtist(response.data.items);
        })
        .catch((error) => console.error("Error fetching top artist:", error));
    }
  }, [token]);

  // fetch top song when component mounts
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 1, // Get track
            time_range: `short_term`, // timeframe set to short term, song of the month
          },
        })
        .then((response) => {
          setTrack(response.data.items);
        })
        .catch((error) => console.error("Error fetching top tracks: ", error));
    }
  }, [token]);

  return (
    <div className="hero-container">
      <ul className="topartist-ul">
        {artist.map((artist_) => (
          <li className="topartist-li" key={artist_.id}>
            <img
              className="hero-artist-image"
              src={artist_.images[0]?.url}
              alt={artist_.name}
            />
            <h2 className="hero-artist-title">{artist_.name}</h2>
            <p className="top-title">Top Artist</p>
          </li>
        ))}
      </ul>

      <ul className="topsong-ul">
        {track.map((track_) => (
          <li className="topsong-li" key={track_.id}>
            <img
              className="hero-song-image"
              src={track_.album.images[0].url}
              alt={track_.name}
            />
            <h2 className="hero-song-title">{track_.name}</h2>
            <p className="top-title">Top Track</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hero;
