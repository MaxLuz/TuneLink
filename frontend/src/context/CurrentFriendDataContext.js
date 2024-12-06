import { createContext, useReducer, useEffect } from "react";

export const CurrentFriendDataContext = createContext();

export const currentfrienddataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRIEND":
      return {
        friendData: action.payload,
      };
    default:
      return state;
  }
};

export const CurrentFriendDataContextProvider = ({ children }) => {
  const [state, dispatch_friendData] = useReducer(currentfrienddataReducer, {
    friendData: null,
  });

  return (
    <CurrentFriendDataContext.Provider
      value={{ ...state, dispatch_friendData }}
    >
      {children}
    </CurrentFriendDataContext.Provider>
  );
};

export default CurrentFriendDataContextProvider;
