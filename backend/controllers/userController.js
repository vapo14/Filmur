const user = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  // TODO: user info validation
  const exists = await user.find({ username: req.body.username });
  if (exists.length >= 1) {
    return res.send("User Exists");
  } else {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      let newUser = new user({
        username: req.body.username,
        password: hashedPassword,
      });
      newUser.save((err) => {
        if (err) res.status(500).send();
        return res.status(200).json({ status: "USER_SAVED" });
      });
    } catch {
      return res.status(500).send();
    }
  }
};

// const loginUser = async (req, res) => {
//   const foundUser = await user.findOne({ username: req.body.username });
//   if (foundUser == null) {
//     return res.status(400).send("Cannot find user");
//   }

//   try {
//     if (await bcrypt.compare(req.body.password, foundUser.password)) {
//       return res.send("success");
//     } else {
//       return res.send("Invalid Credentials");
//     }
//   } catch {
//     return res.send("Not Allowed");
//   }
// };

module.exports = { createUser };
