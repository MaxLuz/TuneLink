import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();
  // const [refreshToken, setRefreshToken] = useState("");

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
