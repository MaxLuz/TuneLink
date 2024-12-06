import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SongContextProvider } from "./context/SongContext";
import { AuthContextProvider } from "./context/AuthContext";
import { FriendRequestContextProvider } from "./context/friendrequestContext";
import { FriendListContextProvider } from "./context/FriendListContext";
import { CurrentFriendDataContextProvider } from "./context/CurrentFriendDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CurrentFriendDataContextProvider>
        <FriendRequestContextProvider>
          <FriendListContextProvider>
            <SongContextProvider>
              <App />
            </SongContextProvider>
          </FriendListContextProvider>
        </FriendRequestContextProvider>
      </CurrentFriendDataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
