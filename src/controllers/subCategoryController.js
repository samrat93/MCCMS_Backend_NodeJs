const Sub_Category = require("../models/complaintSubCatModel");

const Sub_CategoryPost = async (req, res) => {
  try {
    const subcategory = new Sub_Category(req.body);
    await subcategory.save();
    res.send(subcategory);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const Sub_CategoryGet = async (req, res) => {
  try {
    const subcategory = await Sub_Category.find({});
    res.status(200).send(subcategory);
  } catch (e) {
    res.status(400).send();
  }
};

const Sub_CategoryUpdate = async (req, res) => {
  const subcatid = req.params.id;
  const subcategory = await Sub_Category.findById(subcatid);

  if (!subcategory) {
    throw new Error("Sub category not found.");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "sub_category_name",
    "sub_category_desc",
    "category_id",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update." });
  }
  try {
    updates.forEach((update) => (subcategory[update] = req.body[update]));
    await subcategory.save();
    res.json("Sub category updated successfully.");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const Sub_CategoryDelete = async (req, res) => {
  try {
    const subcategory = await Sub_Category.findOneAndDelete({
      _id: req.params.id,
      category_id: req.Category._id,
    });
    if (!subcategory) {
      res.status(404).send();
    }
    res.send(subcategory);
  } catch (e) {
    res.status(500).send("Sub category deleted successfully.");
  }
};

module.exports = {
  Sub_CategoryPost,
  Sub_CategoryGet,
  Sub_CategoryUpdate,
  Sub_CategoryDelete,
};
