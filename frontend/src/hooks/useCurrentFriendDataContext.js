import { CurrentFriendDataContext } from "../context/CurrentFriendDataContext";
import { useContext } from "react";

export const useCurrentFriendDataContext = () => {
  const context = useContext(CurrentFriendDataContext);

  if (!context) {
    throw Error(
      "useCurrentFriendDataContext must be used inside a CurrentFriendDataContextProvider"
    );
  }
  return context;
};
