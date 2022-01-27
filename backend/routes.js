// import express router to configure routes
const router = require("express").Router();

//import passport middleware
const passport = require("passport");
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");

// import necessary controllers
const userController = require("./controllers/userController");
const reviewController = require("./controllers/reviewController");
const searchController = require("./controllers/searchController");

router.get("/", checkAuthenticated, (req, res) => {
  return res.send("hi");
});

// ======= USER ROUTES =======
router.post("/user/create", userController.createUser);

router.post(
  "/user/login",
  checkNotAuthenticated,
  passport.authenticate("local"),
  userController.loginUser
);

router.delete("/user/logout", checkAuthenticated, userController.logoutUser);

// ======= REVIEWS ROUTES =======

router.get("/reviews", checkAuthenticated, reviewController.getAllReviews);
router.post("/reviews/upload", checkAuthenticated, reviewController.postReview);
router.get("/review", checkAuthenticated, reviewController.getReviewById);
router.get(
  "/reviews/user",
  checkAuthenticated,
  reviewController.getReviewsByUserId
);
router.get(
  "/reviews/filter",
  checkAuthenticated,
  reviewController.getReviewsByMovieId
);
router.put("/review/like", checkAuthenticated, reviewController.likeReview);

// ======= SEARCH ROUTES =======
router.get("/search", checkAuthenticated, searchController.searchMovie);

module.exports = router;
