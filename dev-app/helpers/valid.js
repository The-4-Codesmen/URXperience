//validation helpers

//validate registration
const {check} = require('express-validator');
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
    }).withMessage("Password must contain at least 8 characters").matches(/\d/).withMessage("Password must contain a number"),
    check('faculty','faculty is required').notEmpty()
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