const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
    },
    stateDesc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const StateModel = mongoose.model("StateModel", stateSchema);
module.exports = StateModel;
