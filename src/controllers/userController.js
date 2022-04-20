const User = require("../models/userModel");
const { emailsend } = require("../email/account");
const OtP = require("../models/otpModel");
const { verifyEmail, registerEmail } = require("../email/account");

const Register = async (req, res) => {
  try {
    const user = new User(req.body);
    registerEmail(req.body.email);
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
      throw new Error("Wait for sometimes. Admin can verify you soon...");
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

const listAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.send(400).send(e);
  }
};

const userDelete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      res.status(404).send("User not found.");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const verifyUser = async (req, res) => {
  const userid = req.params.id;
  const user = await User.findById(userid);
  if (!user) {
    throw new Error("User not found");
  }
  verifyEmail(user.email);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["verify"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // console.log("data-in-verify" + isValidOperation);
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verify: user.verify,
      type: user.type,
      mobileNo: user.mobileNo,
      isProfileUpdate: user.isProfileUpdate,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const ForgetPassword = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length === 0) {
      throw new Error("User is not register with this email.");
    }
    const otp = generateOTP();
    const opts = new OtP({ ...req.body, otp });
    emailsend(req.body.email, otp);
    await opts.save();
    res.status(200).send(opts.email);
  } catch (e) {
    res.status(400).send(err.message);
  }
};

const UpdatePassword = async (req, res) => {
  const user = await OtP.find({ otp: req.body.otp, email: req.body.email });
  if (user.length === 0) {
    res.status(400).send("User not found, Sorry 😢");
  } else {
    const userData = await User.findOne({ email: req.body.email });
    userData.password = req.body.password;
    await userData.save();
    res.status(200).send("Password updated successfully.");
  }
};

module.exports = {
  Register,
  Login,
  listAllUser,
  userDelete,
  verifyUser,
  ForgetPassword,
  UpdatePassword,
};
