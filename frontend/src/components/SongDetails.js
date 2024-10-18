import React from "react";

// returns the details of the current song for the favorite songs list
const SongDetails = ({ song }) => {
  return (
    <div className="song-details">
      <h4>{song.title}</h4>
      <p>{song.artist}</p>
      <p>Plays: {song.plays}</p>
      <p>{song.createdAt}</p>
    </div>
  );
};

export default SongDetails;
