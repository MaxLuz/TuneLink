import { SongContext } from "../context/SongContext";
import { useContext } from "react";

export const useSongsContext = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw Error("useSongContext must be used inside a SongContextProvider");
  }

  return context;
};
