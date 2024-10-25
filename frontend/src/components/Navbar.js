import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="nav-container">
      <Link className="logo" to="/">
        <h1>TuneLink</h1>
      </Link>
      <nav className="nav">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    </header>
  );
};

export default Navbar;
