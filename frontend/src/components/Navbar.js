import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="nav-container">
      <Link className="logo" to="/">
        <h1>TuneLink</h1>
      </Link>
      <nav className="nav">
        {user && (
          <div className="logout">
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div className="login-signup">
            <Link className="login-btn" to="/login">
              Login
            </Link>
            <Link className="get-started" to="/signup">
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
