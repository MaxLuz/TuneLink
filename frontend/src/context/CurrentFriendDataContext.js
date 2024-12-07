import { createContext, useReducer, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFriendListContext } from "../hooks/useFriendListContext";

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
  const { user } = useAuthContext();
  const [state, dispatch_friendData] = useReducer(currentfrienddataReducer, {
    friendData: null,
  });

  const { friends } = useFriendListContext();

  // Set the default friendData
  useEffect(() => {
    if (friends && friends.length > 0) {
      dispatch_friendData({ type: "SET_FRIEND", payload: friends[0].username });
    } else if (user) {
      dispatch_friendData({
        type: "SET_FRIEND",
        payload: user.username,
      });
    }
  }, [friends]);

  return (
    <CurrentFriendDataContext.Provider
      value={{ ...state, dispatch_friendData }}
    >
      {children}
    </CurrentFriendDataContext.Provider>
  );
};

export default CurrentFriendDataContextProvider;
