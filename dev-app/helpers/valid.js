//validation helpers

//validate registration
const {check} = require('express-validator');
var { expressjwt: jwt } = require("express-jwt");
const jsonWebToken = require('jsonwebtoken');
exports.validRegister = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min:4,
        max:32
    }).withMessage("name must be between 3 to 32 characters"),
    check('email').matches(/@uregina.ca\s*$/).withMessage("You must have a U of R email!"),
    check('password','password is required').notEmpty(),
    check('password').isLength({
        min:8
    }).withMessage("Password must contain at least 8 characters").matches(/\d/).withMessage("Password must contain a number")
]

//validate login
exports.validLogin = [
    check('email').matches(/@uregina.ca\s*$/).withMessage("You must have a U of R email!"),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 8
    }).withMessage('Password must contain at least 8 characters').matches(/\d/).withMessage('password must contain a number')
]


//validate forgot password
exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .matches(/@uregina.ca\s*$/)
        .withMessage('You must have a U of R email!')
];

//validate reset pass
exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must be at least  8 characters long')
        .matches(/\d/).withMessage('password must contain a number')
];

exports.requireSignin = jwt({
    secret: process.env.JWT_SECRET_KEY, // req.user._id
    algorithms: ["HS256"],
  });

  exports.ensureUserExist = (req, res, next)=>{
    const token = req.header('accessToken')
    if(!token){
        console.log(token)
        return res.status(406).json({err:"No authentication token found"})
    }
    const verified = jsonWebToken.verify(token, process.env.JWT_SECRET_KEY)
    //const { _id, name, email, password, faculty } = jsonWebToken.decode(token)
    // console.log(_id)
    if(!verified) return res.status(406).json({err:"token verification failed"})
    //console.log(verified._id, "hello")
    req.user_id = verified._id
    next()
  }