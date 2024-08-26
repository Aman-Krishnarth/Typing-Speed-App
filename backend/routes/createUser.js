const express = require("express");
const user = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/createUser", async (req, res) => {
  console.log("request aayi hai in create user");

  console.log(req.cookies)
  
  const {username: userName,email,password} = req.body;
  console.log(req.body)


  bcrypt.hash(password, 10, async (err,hash)=>{
    const createdUser = await user.create({
      userName,email,password:hash
    })
    
    res.send({
      success: true,
      message: "user created successfully",
    })
  })

});

module.exports = router;
