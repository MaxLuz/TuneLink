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
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
