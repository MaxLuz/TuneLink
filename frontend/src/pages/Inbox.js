import React from "react";
import "../styles/Inbox.css";
import { Link } from "react-router-dom";
import Inbox from "../components/Inbox";
import SongForm from "../components/SongForm";

const Inbox_Page = () => {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the bottom of the page
      behavior: "smooth", // Smooth scroll effect
    });
  };
  return (
    <div className="inbox-page-wrapper">
      <div className="dashboard-welcome">
        <div className="welcome-top">
          <h2>Inbox</h2>
          <p className="welcome-text">Welcome to your TuneLink inbox!</p>
        </div>
        <div className="welcome-bottom">
          <div className="welcome-bottom-text">
            <h1 className="total-time">
              41 <span className="smaller-size">tracks</span>
            </h1>
            <p className="welcome-text">
              Total tracks sent to you from friends!
            </p>
          </div>
        </div>
        <div className="buttons-container-mobile">
          <Link className="toggle-button" to="/Friends">
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
            Friends
          </Link>
          <Link className="toggle-button" to="/Friends">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path opacity=".4" d="M0 144L0 448l512 0 0-304L256 320 0 144z" />
              <path d="M0 144V64H512v80L256 320 0 144z" />
            </svg>
            Inbox
          </Link>
          <Link className="toggle-button" onClick={handleScrollToBottom}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                opacity=".4"
                d="M0 304C0 432 128 480 128 480s-32-32-32-80c0-61.9 50.1-112 112-112l80 0 0-160-112 0C78.8 128 0 206.8 0 304z"
              />
              <path d="M320 384L512 208 320 32l-32 0 0 352 32 0z" />
            </svg>
            Share
          </Link>
        </div>
      </div>
      <div className="inbox-component-wrapper">
        <Inbox />
      </div>
      <div className="send-song-wrapper">
        <h2 className="share-h2">Share a Song</h2>
        <SongForm />
      </div>
    </div>
  );
};

export default Inbox_Page;
