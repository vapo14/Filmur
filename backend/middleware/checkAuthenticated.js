const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).send();
  }
};

module.exports = checkAuthenticated;
