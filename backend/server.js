require("dotenv").config();

const express = require("express");
const songRoutes = require("./routes/songs");

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

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000!!");
});
