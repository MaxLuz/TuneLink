import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TopSongs.css";
import { useTokenRefresh } from "../hooks/useTokenRefresh";
import { useAuthContext } from "../hooks/useAuthContext";

const TopSongs = ({ token, timeframe, username, isFriend }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");
  const { tokenRefresh } = useTokenRefresh();
  const { user } = useAuthContext();

  // fetch top songs when component mounts
  useEffect(() => {
    tokenRefresh(token, username);
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 20, // Get top 10 tracks
            time_range: `${timeframe}`,
          },
        })
        .then((response) => {
          setTracks(response.data.items);
        })
        .catch((error) => console.error("Error fetching top tracks: ", error));
    }
  }, [token, timeframe]);

  const handlePlay = async (trackId) => {
    console.log("handlePlay: " + trackId);
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

      // If viewing a friend's profile, increment their discovered tracks
      if (isFriend && user) {
        try {
          await axios.post(`/api/user/increment-discovered/${user.username}`);
        } catch (error) {
          console.error("Error incrementing discovered tracks:", error);
        }
      }

      // Step 3: Start playback of the selected track
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [`spotify:track:${trackId}`],
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
    <div className="topSongs-wrapper">
      <h2 className="topSongs-h2">Tracks</h2>
      <div className="divider">
        <p>#</p>
        <p>Song</p>
        <p>Popularity</p>
      </div>
      <div className="topSong-ul-wrapper">
        <ul className="topSongs-ul">
          {tracks.map((track, index) => (
            <li
              className="topSongs-li"
              key={track.id}
              onClick={() => handlePlay(track.id)}
            >
              <div className="play-button-link-topSongs">
                {error && <div className="error player-error">{error}</div>}
                <svg
                  className="play-button-topSongs"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path opacity=".4" d="M48 80l0 352L336 256 48 80z" />
                  <path d="M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432L0 80C0 62.6 9.4 46.6 24.5 38.1z" />
                </svg>
              </div>
              <p className="topSongs-name index-topSongs">{index + 1}</p>
              <div className="image-wrapper-songs">
                <img
                  className="topSongs-img"
                  src={track.album.images[0].url}
                  alt={track.name}
                  width="100"
                />
              </div>
              <div className="song-info">
                <p className="topSongs-name actualname">{track.name}</p>
                <p className="topSongs-artist">{track.artists[0].name}</p>
              </div>

              <p className="topSongs-name">{track.popularity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSongs;
