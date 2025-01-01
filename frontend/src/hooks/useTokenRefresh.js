import axios from "axios";
import { useAuthContext } from "./useAuthContext";
export const useTokenRefresh = () => {
  const { user } = useAuthContext();
  const grabsSpotifyRefreshToken = async (token, username) => {
    if (token) {
      try {
        const response = await axios.get("/api/user/spotifytoken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            username: `${username}`,
            refresh: "true",
          },
        });

        console.log("response:" + response.data);

        // Pass the token directly to the refresh logic
        await getRefreshToken(response.data, username);
      } catch (error) {
        console.error(
          "Error fetching Spotify token:",
          error.response?.data || error.message
        );
        throw error;
      }
    }
  };

  const getRefreshToken = async (token, username) => {
    if (token) {
      console.log("REFRESH TOKEN BEING USED TO REQUEST NEW TOKENS: " + token);
      const clientId = "df95797d307541d79a1e2a2d3bc3e072"; // Replace with your Spotify app client ID
      const clientSecret = "01f7d8c79f7d418facaa28d61be69d49"; // Replace with your Spotify app client secret
      const tokenEndpoint = "https://accounts.spotify.com/api/token";

      const params = new URLSearchParams();
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", token);

      console.log("params: " + params);

      try {
        // Make the POST request
        const response = await axios.post(tokenEndpoint, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Base64-encoded client_id:client_secret
          },
        });

        const { access_token, refresh_token } = response.data;
        console.log("refresh-response access token: " + access_token);
        console.log("refresh-response refresh token: " + refresh_token);

        // Store token in backend
        try {
          const storeResponse = await axios.post(
            "/api/user/spotify-refresh",
            {
              accessToken: `${access_token}`,
              username: `${username}`,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          if (storeResponse.status === 200) {
            console.log("successfully stored new tokens");
            window.location.reload();
          }
        } catch (error) {
          console.error(
            "Error saving Spotify token:",
            error.response?.data || error.message
          );
          throw error;
        }
      } catch (error) {
        console.log("ERROR FETCHING A NEW REFRESH FROM SPOTIFY");
        console.log(error.response?.data || error.message);
      }
    }
  };

  const tokenRefresh = async (token, username) => {
    console.log("username for token refresh logic: " + username);
    console.log("token for token refresh logic: " + token);
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 20, // Get top 10 tracks
          },
        })
        .then((response) => {
          // do nothing
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log("Recieved 401 Error, now gonna refresh the token");
            grabsSpotifyRefreshToken(token, username);
          }
        });
    }
  };
  return { tokenRefresh };
};
