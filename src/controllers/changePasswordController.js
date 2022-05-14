const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.user.email,
      req.body.oldPassword
    );
    user.password = req.body.password;
    await user.save();
    return res.status(200).send("Password changed successfully.");
  } catch (e) {
    if ((e.message = "Invalid User..")) {
      return res.status(401).send("Old Password is not matched.");
    }
    return res.status(400).send(e.message);
  }
};

module.exports = {
  changePassword,
};
