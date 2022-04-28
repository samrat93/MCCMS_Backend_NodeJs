const User = require("../models/userModel");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const ProfileUpdate = async (req, res) => {
  const updates = req.body;
  try {
    let oldProfile = await User.findById(req.params.id);
    let JSONoldProfile = await oldProfile.toJSON();
    let newProfile = {};

    Object.keys(JSONoldProfile).forEach((val) => {
      newProfile[val] = updates[val];
    });

    if (req.file && req.file.path) {
      newProfile = {
        ...req.body,
        user_image: req.file.path,
      };
    } else {
      newProfile = {
        ...newProfile,
        _id: req.params.id,
      };
    }
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: newProfile },
      { new: true }
    );
    res.send(newProfile);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
// samrat

module.exports = { upload, ProfileUpdate };
