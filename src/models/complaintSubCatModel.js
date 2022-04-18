const mongoose = require("mongoose");

const subCatSchema = new mongoose.Schema(
  {
    sub_category_name: {
      type: String,
      required: true,
      unique: true,
    },
    sub_category_desc: {
      type: String,
      required: false,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Sub_Category = mongoose.model("Sub_Category", subCatSchema);
module.exports = Sub_Category;
