import React, { useEffect } from "react";
import "../styles/DiscoveryList.css";
import { useState } from "react";
import axios from "axios";

const DiscoveryList = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

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

  const handlePlay = async (trackId) => {
    console.log("handlePlay: " + trackId);

    if (!token) {
      console.error("No token available for authentication.");
      return;
    }

    try {
      // Step 1: Check for available devices
      const devicesResponse = await axios.get(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const devices = devicesResponse.data.devices;
      console.log("Available devices:", devices);

      if (devices.length === 0) {
        setError(
          "No available Spotify devices. Please open Spotify on one of your devices!"
        );
        return;
      }

      // Step 2: Find an active device or select the first available device
      const activeDevice = devices.find((device) => device.is_active);
      const deviceId = activeDevice ? activeDevice.id : devices[0].id;

      if (!activeDevice) {
        // Transfer playback to the selected device if none is active
        await axios.put(
          "https://api.spotify.com/v1/me/player",
          { device_ids: [deviceId] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`Playback transferred to device: ${deviceId}`);
      }

      // Step 3: Start playback of the selected track
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [`spotify:track:${trackId}`],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Playback started for track:", trackId);
    } catch (error) {
      // Handle errors
      console.error("Error handling playback:", error.response?.data || error);

      if (error.response?.status === 404) {
        setError(
          "No active Spotify device found. Please open Spotify and try again."
        );
      } else {
        setError("Error playing track. Please try again.");
      }
    }
  };

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
            <a
              className="play-button-link"
              onClick={() => handlePlay(track.id)}
            >
              {error && <div className="error player-error">{error}</div>}
              <svg
                className="play"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path opacity=".4" d="M48 80l0 352L336 256 48 80z" />
                <path d="M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432L0 80C0 62.6 9.4 46.6 24.5 38.1z" />
              </svg>
            </a>
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
