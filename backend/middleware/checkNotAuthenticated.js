const checkNotAuthenticated = (req, res, next) => {
  if (req.user.isAuthenticated()) {
    return res.status(400).send();
  }
  next();
};

module.exports = checkNotAuthenticated;
