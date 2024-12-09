import { FriendRequestContext } from "../context/friendrequestContext";
import { useContext } from "react";

export const useFriendRequestContext = () => {
  const context = useContext(FriendRequestContext);

  if (!context) {
    throw Error(
      "useFriendRequestContext must be used inside a FriendRequestProvider"
    );
  }
  return context;
};
