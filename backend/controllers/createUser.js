const user = require("../models/user");

const createUser = async (req, res) => {
  // TODO: user info validation
  let newUser = new user(req.body);
  newUser.save((err) => {
    if (err) return handleError(err);
    res.status(200).json({ status: "USER_SAVED" });
  });
};

module.exports = { createUser };
