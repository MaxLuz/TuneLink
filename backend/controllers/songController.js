const Song = require("../models/songModel.js");

// get all songs

// get a single song

// create a new song entry
const createSong = async (req, res) => {
  const { title, artist, plays } = req.body;

  // add doc to database
  try {
    const song = await Song.create({ title, artist, plays });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a song

// update a song
module.exports = {
  createSong,
};
