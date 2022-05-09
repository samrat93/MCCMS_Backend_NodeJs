const mongoose = require("mongoose");
const SubCategory = require("../models/complaintSubCatModel");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryDesc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

categorySchema.virtual("subcategory", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "categoryId",
});

categorySchema.pre("remove", async function (next) {
  const category = this;
  await SubCategory.deleteMany({ categoryId: category._id });
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
