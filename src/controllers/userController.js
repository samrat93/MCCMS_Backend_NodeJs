const User = require("../models/userModel");

const Register = async (req, res) => {
  const user = new User(req.body);
  try {
    const emails = await User.findOne({ emial: req.body.email });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user.type !== req.body.type) {
      throw new Error("Login Types is not valid");
    }
    if (user.verify === false) {
      throw new Error("please wait sometime admin can not verify it ");
    }
    const token = await user.generateAuthToken();
    res.status(200).send({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
      mobileNo: user.mobileNo,
      isProfileUpdate: user.isProfileUpdate,
      token,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { Register, Login };
