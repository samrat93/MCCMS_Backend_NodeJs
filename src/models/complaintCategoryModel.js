const mongoose = require("mongoose");
const Sub_Category = require("../models/complaintSubCatModel");

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    category_desc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

categorySchema.virtual("subcategory", {
  ref: "Sub_Category",
  localField: "_id",
  foreignField: "category_id",
});

categorySchema.pre("remove", async function (next) {
  const category = this;
  await Sub_Category.deleteMany({ category_id: category._id });
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
