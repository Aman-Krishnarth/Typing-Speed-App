const express = require("express");
const jwt = require("jsonwebtoken");
const conf = require("../conf/conf");
const user = require("../models/user");

const router = express.Router();

router.post("/update", async (req, res) => {
  const { token, wpm, cpm } = req.body;

  const data = jwt.verify(token, conf.jwtSecret);
  console.log("id aayi hai verify ke baad".toUpperCase());

  const currentUser = await user.findOne({ _id: data.userId });

  currentUser.wpm.push({
    wpm,
    cpm,
  });
  await currentUser.save();

  res.status(200).json({
    success: true,
    message: "Go to progress section to see ur progress",
  });
});

module.exports = router;
