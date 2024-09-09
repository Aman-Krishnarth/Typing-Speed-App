const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../middlewares/authValidation");

const router = express.Router();

router.post("/loginUser", loginValidation, async (req, res) => {
  const { email, password } = req.body;

  let requiredUser = await user.findOne({ email });

  if (requiredUser) {
    bcrypt.compare(password, requiredUser.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            userId: requiredUser._id,
          },
          process.env.JWT_SECRET
        );

        res.send({
          success: true,
          message: "Logged In",
          token,
        });
      } else {
        res.send({
          success: false,
          message: "Incorrect email or passoword",
        });
      }
    });
  } else {
    res.send({
      success: false,
      message: "User does not exist",
    });
  }
});

module.exports = router;
