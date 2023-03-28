//validation helpers

//validate registration
const { check } = require("express-validator");
var { expressjwt: jwt } = require("express-jwt");
const jsonWebToken = require("jsonwebtoken");
exports.validRegister = [
  check("name", "Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),
  check("email")
    .matches(/@uregina.ca\s*$/)
    .withMessage("You must have a U of R email!"),
  check("password", "password is required").notEmpty(),
  check("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must minimum eight characters, at least one letter and one number"
    ),
];

//validate login
exports.validLogin = [
  check("email")
    .matches(/@uregina.ca\s*$/)
    .withMessage("You must have a U of R email!"),
  check("password", "password is required").notEmpty(),
  check("password")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must minimum eight characters, at least one letter and one number"
    ),
];

//validate forgot password
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .matches(/@uregina.ca\s*$/)
    .withMessage("You must have a U of R email!"),
];

//validate reset pass
exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must minimum eight characters, at least one letter and one number"
    ),
];

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET_KEY, // req.user._id
  algorithms: ["HS256"],
});

exports.ensureUserExist = (req, res, next) => {
  const token = req.header("accessToken");
  if (!token) {
    console.log(token);
    return res.status(406).json({ err: "No authentication token found" });
  }
  const verified = jsonWebToken.verify(token, process.env.JWT_SECRET_KEY);
  //const { _id, name, email, password, faculty } = jsonWebToken.decode(token)

  if (!verified)
    return res.status(406).json({ err: "token verification failed" });
  
  req.user_id = verified._id;
  next();
};
