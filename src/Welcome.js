import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "./styles/Welcome.css";

const Welcome = ({ token, spotuser, setSpotuser }) => {
  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            //none
          },
        })
        .then((response) => {
          setSpotuser(response.data.display_name);
        })
        .catch((error) => console.error("Error fetching username:", error));
    }
  }, [token]);

  return <h1 className="welcome-h1">Welcome, {spotuser} </h1>;
};

export default Welcome;
