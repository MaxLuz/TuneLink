const Song = require("../models/songModel.js");
const mongoose = require("mongoose");

// this controller handles the processing for each of the CRUD operations for the favorite songs list.

// get all songs
const getSongs = async (req, res) => {
  const user_id = req.user._id;

  const songs = await Song.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(songs);
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
  const { title, artist, plays } = req.body;

  // add doc to database
  try {
    const user_id = req.user._id;
    const song = await Song.create({ title, artist, plays, user_id });
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

// update a song
module.exports = {
  createSong,
  getSongs,
  getSong,
  deleteSong,
  updateSong,
};
