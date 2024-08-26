const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/loginUser", async (req, res) => {
  console.log("request aayi hai in create user");

  const { email, password } = req.body;

  let requiredUser = await user.findOne({ email });
  console.log(requiredUser);

  if (requiredUser) {
    bcrypt.compare(password, requiredUser.password, function (err, result) {
		
		if(result){

			const token = jwt.sign({
				userId: requiredUser._id
			},process.env.JWT_SECRET)

			res.send({
				success: true,
				message: "logged in",
				token
			})

		}
		else{
			res.send({
				success: false,
				message: "Incorrect email or passoword"
			})
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
