const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  spotifyAccessToken: {
    type: String,
  },
  spotifyRefreshToken: {
    type: String,
  },
  friends: [{ type: String }],
  discoveredTracks: [{ type: String }],
});

// static signup method
userSchema.statics.signup = async function (email, username, password) {
  // validation
  if (!email || !password || !username) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("Username already in use");
  }

  if (!validator.matches(username, /^[a-zA-Z0-9_]+$/)) {
    throw Error("Username must only include alphanumeric characters");
  }

  if (!validator.isLength(username, { min: 3, max: 16 })) {
    throw Error("Username must be between 3 and 16 characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
