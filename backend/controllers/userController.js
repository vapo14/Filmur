const user = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Creates a new user in the database given that the
 * user object in the request does not exist
 * @param {*} req
 * @param {*} res
 * @returns response
 */
const createUser = async (req, res) => {
  // TODO: user info validation
  const exists = await user.find({ username: req.body.username });
  if (exists.length >= 1) {
    return res.send("User Exists");
  } else {
    try {
      // create salt object with bcrypt
      const salt = await bcrypt.genSalt();
      // hash the password using created salt, can also use shorthand hash(pass, <salt value>)
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // create new user object based on mongoose user schema
      let newUser = new user({
        username: req.body.username,
        password: hashedPassword,
      });
      // save the user, if error is presented send response accordingly
      newUser.save((err) => {
        if (err) res.status(500).send();
        return res.status(200).json({ status: "USER_SAVED" });
      });
    } catch {
      // catch error and send response
      return res.status(500).send();
    }
  }
};

/**
 * Login a user and return its user ID
 *
 * @param {*} req
 * @param {*} res
 * @returns userID
 */
const loginUser = (req, res) => {
  return res.send("Authenticated!" + "User ID: " + req.user._id);
};

/**
 * Logs out the user and clears session. Deletes cookie from client.
 *
 * @param {*} req
 * @param {*} res
 * @returns response with logged out message
 */
const logoutUser = (req, res) => {
  // logout user using passport's interface
  req.logOut();
  // when destroyng the user session, if no error is detected,
  // clear the session cookie from client to prevent session fixation attack
  req.session.destroy((err) => {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
    } else {
      // handle error case...
      res.status(200).json({
        status:
          "Server ran into an error when logging you out. To ensure security, please clear your browser cookies and close your browser.",
      });
    }
  });
};

module.exports = { createUser, loginUser, logoutUser };
