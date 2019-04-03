require('dotenv').config();
const express = require("express");
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.REACT_APP_JWT_SECRET,
  userProperty: 'payload'
});
const path = require("path");
const mongoose = require('mongoose');
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const openSecretsApiRoutes = require("./routes/openSecretsRoutes");
const proPublicaApiRoutes = require("./routes/proPublicaRoutes");
const protectedApiRoutes = require("./routes/protectedApiRoutes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Unprotected Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/opensecrets', openSecretsApiRoutes);
app.use('/api/propublic', proPublicaApiRoutes);
// Auth middleware
app.use(auth);
// Protected routes
app.use('/protectedapi', protectedApiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
// cdmongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:3001/project3", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});