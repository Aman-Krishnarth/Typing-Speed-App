const express = require("express");
const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const conf = require("../conf/conf")

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body.id);

  const { token } = req.body;

  const data = jwt.verify(token, conf.jwtSecret)

  const id = data.userId;
  console.log(id)

  const user = await userModel.findOne({ _id: id })


  console.log("required user = ");
  console.log(user)

  res.status(200)
    .json({
        success: true,
        wpm: user.wpm
    })

});

module.exports = router;
