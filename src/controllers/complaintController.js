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
      complaintFile: pathName,
    });
    await complaint.save();
    res.status(201).send("Complaint registered successfully.");
  } catch (error) {
    res.status(400).send(error.message);
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
        complaintFile: req.file.path,
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
    res.send("Complaint updated successfully.");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const ComplaintGet = async (req, res) => {
  try {
    const userId = req.params.id;
    const complaintList = await Complaint.find({ user_id: userId });
    res.status(200).send(complaintList);
  } catch (e) {
    res.status(404).send();
  }
};

const ListAllComplaint = async (req, res) => {
  try {
    const complaintList = await Complaint.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "complaintCategory",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);

    res.status(200).send(complaintList);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const ComplaintDelete = async (req, res) => {
  try {
    const complaint = await Complaint.findOneAndDelete({ _id: req.params.id });
    if (!complaint) {
      res.status(404).send("Complaint not found.");
    }
    res.send("Complaint deleted successfully.");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const PendingComplaintList = async (req, res) => {
  try {
    const pendingComplaint = await Complaint.find({
      complaint_status: "Pending",
    });
    res.status(200).send(pendingComplaint);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
const ProcessingComplaintList = async (req, res) => {
  try {
    const processingComplaint = await Complaint.find({
      complaint_status: "Processing",
    });
    res.status(200).send(processingComplaint);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const ClosedComplaintList = async (req, res) => {
  try {
    const closedComplaint = await Complaint.find({
      complaint_status: "Closed",
    });
    res.status(200).send(closedComplaint);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

module.exports = {
  ComplaintPost,
  ComplaintGet,
  ComplaintUpdate,
  ComplaintDelete,
  upload,
  ListAllComplaint,
  PendingComplaintList,
  ProcessingComplaintList,
  ClosedComplaintList,
};
