// import express router to configure routes
const router = require("express").Router();

const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");

//import passport middleware
const passport = require("passport");

// import necessary controllers
const userController = require("./controllers/userController");

router.get("/", checkAuthenticated, (req, res) => {
  return res.send("hi");
});

// define /user route as POST and assign its controller
router.post("/user/create", userController.createUser);

router.post("/user/login", passport.authenticate("local"), (req, res) => {
  return res.send("Authenticated!");
});

module.exports = router;
