import { createContext, useReducer } from "react";

export const FriendRequestContext = createContext();

export const friendrequestReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRIENDREQUESTS":
      return {
        friendrequests: action.payload,
      };
    case "FRIENDREQUEST_ACTION":
      return {
        friendrequests: state.friendrequests.filter(
          (f) => f._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const FriendRequestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendrequestReducer, {
    friendrequests: null,
  });

  return (
    <FriendRequestContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FriendRequestContext.Provider>
  );
};

export default FriendRequestContextProvider;
