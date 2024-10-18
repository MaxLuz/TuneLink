import { createContext, useReducer } from "react";

// this file provides context for the application, calling a dispatch method when the state of the application changes.

export const SongContext = createContext();

export const songReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        songs: action.payload,
      };
    case "CREATE_SONG":
      return {
        songs: [action.payload, ...state.songs],
      };
    case "DELETE_SONG":
      return {
        songs: state.songs.filter((s) => s._id !== action.payload._id), // filters through songs array to display all except the deleted song
      };
    default:
      return state;
  }
};

export const SongContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(songReducer, {
    songs: null,
  });

  return (
    <SongContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;
