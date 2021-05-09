const express = require("express");
const Category = require("../models/category");
const auth = require("../middleware/auth");
const router = new express.Router();
const { sendMail } = require("../emails/account");
const jsonfile = require("jsonfile");
const fs = require("fs");
const downloadsFolder = require("downloads-folder");

router.post("/catagories", auth, async (req, res) => {
  const category = new Category({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/catagories", auth, async (req, res) => {
  try {
    const catagories = await Category.find({ owner: req.user._id });

    res.send(catagories);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete("/catagories/:id", auth, async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deleted) {
      console.log("invalid id");
      return res.status(404).send({ error: "invalid id" });
    }
    res.status(200).send(deleted);
  } catch (error) {
    res.status(400).send();
  }
});
router.patch("/catagories/:id", auth, async (req, res) => {
  const valid = ["cat_name", "videos"];
  const update = Object.keys(req.body);
  const isValid = update.every((key) => valid.includes(key));
  if (!isValid) {
    res.status(404).send({ error: "invalid update" });
  }
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!category) {
      res.status(404).send({ error: "invalid category" });
    }
    update.forEach((field) => (category[field] = req.body[field]));
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/catagories/list", auth, async (req, res) => {
  try {
    const file = `${downloadsFolder()}/youTubelist.json`;

    const obj = req.body;
    await jsonfile.writeFileSync(file, obj, { spaces: 2, EOL: "\r\n" });

    const attachment = fs.readFileSync(file).toString("base64");
    await sendMail(req.user.email, req.user.fname, attachment);
    console.log("done");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
