import { createContext, useReducer } from "react";

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