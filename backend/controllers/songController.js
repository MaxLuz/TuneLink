const Song = require("../models/songModel.js");
const mongoose = require("mongoose");

// this controller handles the processing for each of the CRUD operations for the favorite songs list.

// get all songs
const getSongs = async (req, res) => {
  try {
    const { username_to } = req.query;

    const songs = await Song.find({ username_to }).sort({ createdAt: -1 });
    console.log("songs: " + songs);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single song
const getSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }

  const song = await Song.findbyId(id);

  if (!song) {
    return res.status(404).json({ error: "No such song" });
  }

  res.status(200).json(song);
};

// create a new song entry
const createSong = async (req, res) => {
  const { title, artist, username_to, username_from } = req.body;

  // add doc to database
  try {
    const song = await Song.create({
      title,
      artist,
      username_to,
      username_from,
    });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a song
const deleteSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }

  const song = await Song.findOneAndDelete({ _id: id });

  if (!song) {
    return res.status(404).json({ error: "No such song" });
  }

  res.status(200).json(song);
};

// update a song
const updateSong = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }

  const song = await Song.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!song) {
    return res.status(404).json({ error: "No such song" });
  }

  res.status(200).json({ song });
};

// get total count of songs sent to a specific username
const getSongCountByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const count = await Song.countDocuments({ username_to: username });
    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a song
module.exports = {
  createSong,
  getSongs,
  getSong,
  deleteSong,
  updateSong,
  getSongCountByUsername,
};
