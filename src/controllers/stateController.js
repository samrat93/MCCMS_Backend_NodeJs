const StateModel = require("../models/stateModel");

const StatePost = async (req, res) => {
  try {
    let stateName = await StateModel.findOne({ stateName: req.body.stateName });
    if (stateName) {
      return res
        .status(400)
        .send({ stateExist: "State with this name is already exist." });
    } else {
      const stateData = new StateModel(req.body);
      await stateData.save();
      res.status(201).send("State added successfully.");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const StateGet = async (req, res) => {
  try {
    const stateList = await StateModel.find({});
    res.status(200).send(stateList);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const StateUpdate = async (req, res) => {
  try {
    const stateId = req.params.id;
    const stateData = await StateModel.findById(stateId);
    if (!stateData) {
      throw new Error("State data not found.");
    }
    const updates = Object.keys(req.body);
    const allowUpdate = ["stateName", "stateDesc"];
    const isValidOperation = updates.every((update) =>
      allowUpdate.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Update" });
    }
    updates.forEach((update) => (stateData[update] = req.body[update]));
    await stateData.save();
    res.json("State updated successfully.");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const StateDelete = async (req, res) => {
  try {
    const stateId = req.params.id;
    const stateData = await StateModel.findByIdAndDelete(stateId);
    if (!stateData) {
      res.status(400).send(e.message);
    }
    res.send("State deleted successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = { StatePost, StateGet, StateUpdate, StateDelete };
