import React from "react";
import "../styles/Inbox.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
const Inbox = () => {
  const [tracks, setTracks] = useState([]);
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const spotifytoken = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    // Fetch top tracks
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/songs/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            username_to: user.username,
          },
        });

        // Set tracks with the returned data
        setTracks(response.data);
        console.log("Fetched tracks: ", response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.response?.data?.error || "An error occurred");
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (tracks.length > 0 && spotifytoken) {
      fetchTrackIDs();
    }
  }, [tracks, spotifytoken]);

  const fetchTrackIDs = async () => {
    try {
      const trackPromises = tracks.map((track) =>
        axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${spotifytoken}`,
          },
          params: {
            q: `${track.title} ${track.artist}`,
            type: "track",
            limit: 1,
          },
        })
      );
      const trackResponses = await Promise.all(trackPromises);

      const fetchedTracks = trackResponses.map((response) => {
        const track = response.data.tracks.items[0];
        return track
          ? {
              id: track.id,
              name: track.name,
              artist: track.artists[0],
              image: track.album.images[0]?.url,
              uri: track.uri,
            }
          : null;
      });
      setSpotifyTracks(fetchedTracks);
      console.log("Fetched Spotify Tracks: " + fetchedTracks);
      console.log("spotifytracks: " + spotifyTracks);
    } catch (error) {
      setError("Failed to fetch tracks. Please try again later.");
      console.error(error);
    }
  };

  const handlePlay = async (trackId) => {
    console.log("handlePlay: " + trackId);

    if (!spotifytoken) {
      console.error("No token available for authentication.");
      return;
    }

    try {
      // Step 1: Check for available devices
      const devicesResponse = await axios.get(
        "https://api.spotify.com/v1/me/player/devices",
        {
          headers: {
            Authorization: `Bearer ${spotifytoken}`,
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
              Authorization: `Bearer ${spotifytoken}`,
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
            Authorization: `Bearer ${spotifytoken}`,
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
    <div className="inbox-container">
      <h2 className="topSongs-h2">Tracks</h2>
      <div className="divider">
        <p>#</p>
        <p>Song</p>
        <p>From</p>
      </div>
      <div className="topSong-ul-wrapper">
        <ul className="topSongs-ul">
          {spotifyTracks.map((track, index) => (
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
                  src={track.image}
                  alt={track.name}
                  width="100"
                />
              </div>
              <div className="song-info">
                <p className="topSongs-name actualname">{track.name}</p>
                <p className="topSongs-artist">{track.artist.name}</p>
              </div>

              <p className="topSongs-name">{tracks[index].username_from}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Inbox;
