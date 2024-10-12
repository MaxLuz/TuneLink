import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="nav-container">
      <nav className="nav">
        <Link className="logo" to="/">
          <h1>TuneLink</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
