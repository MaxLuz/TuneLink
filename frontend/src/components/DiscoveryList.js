import React, { useEffect } from "react";
import "../styles/DiscoveryList.css";
import { useState } from "react";
import axios from "axios";

const DiscoveryList = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [toptrackids, setToptrackids] = useState([]);
  const [topartistids, setTopartistids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch top tracks
        const tracksResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 2,
              time_range: "short_term",
            },
          }
        );

        const trackIds = tracksResponse.data.items.map((track) => track.id);
        setToptrackids(trackIds);

        // Fetch top artists
        const artistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 3,
              time_range: "short_term",
            },
          }
        );

        const artistIds = artistsResponse.data.items.map((artist) => artist.id);
        setTopartistids(artistIds);

        // Fetch recommendations
        const recommendationsResponse = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              limit: 20,
              seed_artists: artistIds.join(","),
              seed_tracks: trackIds.join(","),
            },
          }
        );

        setTracks(recommendationsResponse.data.tracks);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error
        );
      }
    };

    fetchData();
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
