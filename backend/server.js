require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songs");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/songs", songRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only when connected to database
    app.listen(process.env.PORT, () => {
      console.log("connected to db, and listening on port 4000!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
