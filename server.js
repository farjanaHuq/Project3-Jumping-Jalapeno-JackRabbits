require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define routes here
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});