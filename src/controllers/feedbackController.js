const Feedback = require("../models/feedbackModel");
const { sendFeedbackEmail } = require("../email/account");

const FeedbackPost = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    sendFeedbackEmail(req.body.email);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const FeedbackGet = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({});
    res.status(200).send(feedbackList);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const FeedbackUpdate = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      throw new Error("Feedback data not found.");
    }
    const updates = Object.keys(req.body);
    const allowUpdate = ["name", "email", "subject", "message"];
    const isValidOperation = updates.every((update) =>
      allowUpdate.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Update" });
    }
    updates.forEach((update) => (feedback[update] = req.body[update]));
    await feedback.save();
    res.json("Feedback updated successfully.");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const FeedbackDelete = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findOneAndDelete(feedbackId);
    if (!feedback) {
      res.status(400).send(e.message);
    }

    res.send(feedback);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = { FeedbackPost, FeedbackGet, FeedbackUpdate, FeedbackDelete };
