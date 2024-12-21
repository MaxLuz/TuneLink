import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();
  // const [refreshToken, setRefreshToken] = useState("");

  const grabsSpotifyToken = async () => {
    console.log("Username: " + user.username);
    try {
      const response = await axios.get("/api/user/spotifytoken", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          username: `${user.username}`,
          refresh: "true",
        },
      });

      console.log("response:" + response.data);

      // Pass the token directly to the refresh logic
      await getRefreshToken(response.data);
    } catch (error) {
      console.error(
        "Error fetching Spotify token:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const getRefreshToken = async (token) => {
    console.log("REFRESH TOKEN BEING USED TO REQUEST NEW TOKENS: " + token);

    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token,
      }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();

    if (!response.ok) {
      console.log("ERROR FETCHING A NEW REFRESH FROM SPOTIFY");
    }

    localStorage.setItem("spotify_access_token", response.accessToken);
    console.log("new access token!!!: " + response.accessToken);
    console.log("new refresh token!!!: " + response.refreshToken);

    // Store tokens in backend
    try {
      const storeResponse = await axios.post(
        "/api/user/spotify-refresh",
        {
          accessToken: `${response.accessToken}`,
          refreshToken: `${response.refreshToken}`,
          username: `${user.username}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (storeResponse.ok) {
        console.log("successfully stored new tokens");
      }
    } catch (error) {
      console.error(
        "Error saving Spotify tokens:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      // authenticate with spotify
      // window.location.href = `https://xlhq7t2v-4000.use.devtunnels.ms/api/user/auth/spotify?userId=${json.userId}`;

      window.location.href =
        "https://xlhq7t2v-3000.use.devtunnels.ms/dashboard";
    }
  };
  return { login, isLoading, error };
};
