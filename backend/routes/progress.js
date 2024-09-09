const express = require("express");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const conf = require("../conf/conf");

const router = express.Router();

router.post("/", async (req, res) => {
  const { token } = req.body;

  const data = jwt.verify(token, conf.jwtSecret);

  const id = data.userId;

  const user = await userModel.findOne({ _id: id });

  res.status(200).json({
    success: true,
    wpm: user.wpm,
  });
});

module.exports = router;
