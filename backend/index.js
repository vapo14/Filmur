// Use dotenv library to configure .env file variables.
require("dotenv").config();

// import express library
const express = require("express");
// instantiate the app
const app = express();

// import mongoose library for MongoDB management
const mongoose = require("mongoose");

// import routes file
const routes = require("./routes");

// set server port to .env PORT variable, or 8000
// if .env has no PORT variable
const port = process.env.PORT || 8000;

// import cors library for cors config
const cors = require("cors");

// import express session for user sessions
const session = require("express-session");

// get passport library
const passport = require("passport");
// passport config
const initializePassport = require("./config/passport-config");
initializePassport(passport);

// configure express for sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// let express app use cors config
app.use(cors());

// let express app use json parsing
app.use(express.json());

// setup routes, default route is /api
app.use("/api", routes);

// connect mongoose to MongoDB database
mongoose.connect(process.env.MONGO_STR);

// start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
