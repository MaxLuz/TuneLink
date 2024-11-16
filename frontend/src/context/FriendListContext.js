import { createContext, useReducer } from "react";

export const FriendListContext = createContext();

export const friendlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        friends: action.payload,
      };
    case "ADDED_FRIEND":
      return {
        friends: [action.payload, ...state.friends],
      };
    default:
      return state;
  }
};

export const FriendListContextProvider = ({ children }) => {
  const [state, dispatch_friends] = useReducer(friendlistReducer, {
    friends: null,
  });

  return (
    <FriendListContext.Provider value={{ ...state, dispatch_friends }}>
      {children}
    </FriendListContext.Provider>
  );
};

export default FriendListContextProvider;
