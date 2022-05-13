const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    bcrypt.compare(req.body.oldPassword, user.password, function (err, res) {
      if (err) {
        throw err;
      }
      if (res) {
      } else {
        return res.status(400).send("Old password not matched.");
      }
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
