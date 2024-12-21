import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TopArtists.css";

const TopArtists = ({ token, timeframe }) => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  // Fetch top artists when component mounts
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 20, // Get top 10 artists
            time_range: `${timeframe}`,
          },
        })
        .then((response) => {
          setArtists(response.data.items);
        })
        .catch((error) => console.error("Error fetching top artists:", error));
    }
  }, [token, timeframe]);

  const handlePlay = async (trackId) => {
    const localtoken = localStorage.getItem("spotify_access_token");

    if (!localtoken) {
      console.error("No token available for authentication.");
      return;
    }

    try {
      // Step 1: Check for available devices
      const devicesResponse = await axios.get(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
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
              Authorization: `Bearer ${localtoken}`,
            },
          }
        );
        console.log(`Playback transferred to device: ${deviceId}`);
      }

      // Step 3: Start playback of the selected track
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          context_uri: `spotify:artist:${trackId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localtoken}`,
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
    <div className="topArtists-wrapper">
      <h2 className="topArtists-h2">Artists</h2>
      <div className="divider divider-artists">
        <p>#</p>
        <p>Artist</p>
        <p>Popularity</p>
      </div>
      <div className="topArtist-ul-wrapper">
        <ul className="topArtists-ul">
          {artists.map((artist, index) => (
            <li className="topArtists-li" key={artist.id}>
              <a
                className="play-button-link-topArtists"
                onClick={() => handlePlay(artist.id)}
              >
                {error && <div className="error player-error">{error}</div>}
                <svg
                  className="play-button-topArtists"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path opacity=".4" d="M48 80l0 352L336 256 48 80z" />
                  <path d="M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432L0 80C0 62.6 9.4 46.6 24.5 38.1z" />
                </svg>
              </a>
              <p className="topSongs-name index-topArtists">{index + 1}</p>
              <div className="image-wrapper">
                <img
                  className="topArtists-img"
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  width="100"
                />
              </div>

              <p className="topArtists-name">{artist.name}</p>
              <p className="topSongs-name">{artist.popularity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopArtists;
