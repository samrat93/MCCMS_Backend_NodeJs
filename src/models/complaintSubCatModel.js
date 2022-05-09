const mongoose = require("mongoose");

const subCatSchema = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
      unique: true,
    },
    subCategoryDesc: {
      type: String,
      required: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCatSchema);
module.exports = SubCategory;
