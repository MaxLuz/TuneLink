import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SongContextProvider } from "./context/SongContext";
import { AuthContextProvider } from "./context/AuthContext";
import { FriendRequestContextProvider } from "./context/friendrequestContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FriendRequestContextProvider>
        <SongContextProvider>
          <App />
        </SongContextProvider>
      </FriendRequestContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
