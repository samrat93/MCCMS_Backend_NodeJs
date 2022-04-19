const Complaint = require("../models/complaintModel");
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

const ComplaintPost = async (req, res) => {
  try {
    const pathName = req.file.path;

    const complaint = new Complaint({
      ...req.body,
      complaint_file: pathName,
    });
    await complaint.save();
    res.status(201).send(complaint);
  } catch (e) {
    res.status(400).send({ error: error.message });
  }
};

const ComplaintUpdate = async (req, res) => {
  const updates = req.body;
  try {
    let oldComplaint = await Complaint.findById(req.params.id);
    let JSONoldComplaint = oldComplaint.toJSON();
    let newComplaint = {};
    Object.keys(JSONoldComplaint).forEach((val) => {
      newComplaint[val] = updates[val];
    });
    if (req.file && req.file.path) {
      newComplaint = {
        ...newComplaint,
        _id: req.params.id,
        complaint_file: req.file.path,
      };
    } else {
      newComplaint = {
        ...newComplaint,
        _id: req.params.id,
      };
    }
    await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: newComplaint },
      { new: true }
    );
    res.send(newComplaint);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const ComplaintGet = async (req, res) => {
  try {
    const userId = req.params.id;
    // const complaintlist = await Complaint.findById(userId);
    const complaintList = await Complaint.find({ user_id: userId });

    res.status(200).send(complaintList);
  } catch (e) {
    res.status(404).send();
  }
};

const ListAllComplaint = async (req, res) => {
  try {
    const complaintList = await Complaint.find({});
    res.status(200).send(complaintList);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const ComplaintDelete = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndDelete({ _id: req.params.id });
    if (!complaint) {
      res.status(404).send();
    }
    res.send(complaint);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  ComplaintPost,
  ComplaintGet,
  ComplaintUpdate,
  ComplaintDelete,
  upload,
  ListAllComplaint,
};
