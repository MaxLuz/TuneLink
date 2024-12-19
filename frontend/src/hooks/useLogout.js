import { useAuthContext } from "./useAuthContext";
import { useSongsContext } from "./useSongContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: songsDispatch } = useSongsContext();
  const navigate = useNavigate(); // Initialize the navigate function

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    localStorage.removeItem("spotify_access_token");

    dispatch({ type: "LOGOUT" });
    songsDispatch({ type: "SET_SONGS", payload: null });
    navigate("/");
  };

  return { logout };
};
