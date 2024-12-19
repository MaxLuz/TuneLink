import React from "react";
import "../styles/Sidenav.css";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const SideNav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  // replace circle with user image, and replace email with username
  return (
    <nav className="sidenav">
      <div className="nav-top">
        {user && (
          <div className="username">
            <div className="circle"> </div>
            <span>{user.username}</span>
            <p className="version">v1.0</p>
          </div>
        )}
        <Link className="sidenavlink" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              className="fa-secondary"
              opacity=".4"
              fill="#ffffff"
              d="M64 272l.1 240L224 512l0-160.3 128 0L352 512l160.6 0-.5-224c-.1-5.3-.1-10.7-.1-16C437.3 210.7 362.7 149.3 288 88C213.3 149.3 138.7 210.7 64 272z"
            />
            <path
              className="fa-primary"
              fill="#ffffff"
              d="M0 240L288 0 576 240v32H512L288 88 64 272H0V240z"
            />
          </svg>
          <p>Home</p>
        </Link>
        <Link className="sidenavlink" to="/friends">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path
              className="fa-secondary"
              opacity=".4"
              fill="#ffffff"
              d="M352.7 223.1C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112c-31 0-59-12.6-79.3-32.9zM422.4 320L576 320l64 192-158.5 0-2.9-9.4L422.4 320z"
            />
            <path
              className="fa-primary"
              fill="#ffffff"
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM448 512L384 304 64 304 0 512l448 0z"
            />
          </svg>
          <p>Friends</p>
        </Link>
        <Link className="sidenavlink" to="/inbox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path opacity=".4" d="M0 144L0 448l512 0 0-304L256 320 0 144z" />
            <path d="M0 144V64H512v80L256 320 0 144z" />
          </svg>

          <p>Inbox</p>
        </Link>
        <button className="logout-btn nodisplayondesktop" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              className="fa-secondary"
              opacity=".4"
              fill="#ffffff"
              d="M0 32L0 64 0 448l0 32 32 0 128 0 32 0 0-64-32 0-96 0L64 96l96 0 32 0 0-64-32 0L32 32 0 32z"
            />
            <path
              className="fa-primary"
              fill="#ffffff"
              d="M512 256L352 96l-32 0 0 96-160 0 0 128 160 0 0 96 32 0L512 256z"
            />
          </svg>
          <p className="logout-label">Log out</p>
        </button>
      </div>
      <div className="nav-bottom">
        <Link className="sidenavlink" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              className="fa-secondary"
              opacity=".4"
              fill="#ffffff"
              d="M192 256a64 64 0 1 0 128 0 64 64 0 1 0 -128 0z"
            />
            <path
              className="fa-primary"
              fill="#ffffff"
              d="M312 0L200 0 182.8 78.4c-15.8 6.5-30.6 15.1-44 25.4L62.3 79.5l-56 97 59.4 54.1C64.6 238.9 64 247.4 64 256s.6 17.1 1.7 25.4L6.3 335.5l56 97 76.5-24.4c13.4 10.3 28.2 18.9 44 25.4L200 512l112 0 17.2-78.4c15.8-6.5 30.6-15.1 44-25.4l76.5 24.4 56-97-59.4-54.1c1.1-8.3 1.7-16.8 1.7-25.4s-.6-17.1-1.7-25.4l59.4-54.1-56-97-76.5 24.4C359.8 93.6 345 85 329.2 78.4L312 0zM256 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            />
          </svg>
          <p>Settings</p>
        </Link>
        <button className="logout-btn" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              className="fa-secondary"
              opacity=".4"
              fill="#ffffff"
              d="M0 32L0 64 0 448l0 32 32 0 128 0 32 0 0-64-32 0-96 0L64 96l96 0 32 0 0-64-32 0L32 32 0 32z"
            />
            <path
              className="fa-primary"
              fill="#ffffff"
              d="M512 256L352 96l-32 0 0 96-160 0 0 128 160 0 0 96 32 0L512 256z"
            />
          </svg>
          <p className="logout-label">Log out</p>
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
