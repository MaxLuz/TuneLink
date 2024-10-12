import React from "react";

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
