import { FriendListContext } from "../context/FriendListContext";
import { useContext } from "react";

export const useFriendListContext = () => {
  const context = useContext(FriendListContext);

  if (!context) {
    throw Error(
      "useFriendListContext must be used inside a FriendListContextProvider"
    );
  }
  return context;
};
