const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    plays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // adds created and last updated information
);

module.exports = mongoose.model("Song", songSchema);
