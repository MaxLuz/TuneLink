import { useAuthContext } from "./useAuthContext";
import { useSongsContext } from "./useSongContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: songsDispatch } = useSongsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    localStorage.removeItem("spotify_refresh_token");

    dispatch({ type: "LOGOUT" });
    songsDispatch({ type: "SET_SONGS", payload: null });
  };

  return { logout };
};
