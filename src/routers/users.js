const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { sendWelcomeMail } = require("../emails/account");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user);
    await user.save();
    sendWelcomeMail(user.email, user.fname);
    const token = await user.generateAuthToken();
    console.log(token);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send(false);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const valid = ["fname", "lname", "password"];
  const update = Object.keys(req.body);
  console.log("req.user");
  const isValid = update.every((key) => valid.includes(key));
  console.log("55");
  if (!isValid) {
    res.status(404).send({ error: "invalid update" });
  }
  try {
    update.forEach((key) => {
      req.user[key] = req.body[key];
    });
    console.log(req.user);
    await req.user.save();
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
