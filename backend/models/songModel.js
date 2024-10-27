const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// mongoose schema for songs in the database
const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds created and last updated information
);

module.exports = mongoose.model("Song", songSchema);
