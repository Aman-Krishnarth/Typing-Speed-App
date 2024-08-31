const joi = require("joi");

const signupValidation = (req, res, next) => {
  console.log("SIGNUP VALIDATION MEIN HU");

  const schema = joi.object({
    username: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(50).required(),
  });
  console.log(req.body)

  const details = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(details)

  const { error } = schema.validate(details);
  if (error) {
    console.log(error.message)
    return res
      .json({ message: error.message, error });
  }

  next();
};

const loginValidation = (req, res, next) => {
  console.log("LOGIN VALIDATION MEIN HU");
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(50).required(),
  });

  const details = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = schema.validate(details);
  if (error) {
    return res
      .json({ message: error.message });
  }

  next();
};

module.exports = { signupValidation, loginValidation };
