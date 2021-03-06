const Category = require("../models/complaintCategoryModel");

const CategoryPost = async (req, res) => {
  try {
    let catName = await Category.findOne({
      categoryName: req.body.categoryName,
    });
    if (catName) {
      return res
        .status(400)
        .send({ categoryExist: "Category with this name is already exist." });
    } else {
      const category = new Category(req.body);
      await category.save();
      res.status(201).send("New category added successfully.");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const CategoryList = async (req, res, next) => {
  try {
    const catlist = await Category.find({});

    res.status(200).send(catlist);
  } catch (e) {
    res.status(404).send();
  }
};

const CategoryUpdate = async (req, res) => {
  try {
    const catid = req.params.id;
    const category = await Category.findById(catid);
    if (!category) {
      throw new Error("Category Not Found.");
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ["categoryName", "categoryDesc"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates." });
    }
    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.json("Category updated successfully.");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const CategoryDelete = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    res.status(200).send("Category deleted successfully.");
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { CategoryPost, CategoryList, CategoryUpdate, CategoryDelete };
