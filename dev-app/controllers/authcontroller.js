const User = require('../models/authmodel')
var userId = '';

// const express = require('express')
// const app = express()
// const http = require('http')
// const { Server } = require('socket.io')
// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]

//     },
// })
// Defining Lodash variable 
const _ = require('lodash');

const { validationResult } = require('express-validator')
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken')
//custom error handler to get usfeul error from database
const { errorHandler } = require('../helpers/dbErrorHandling');



exports.registerController = (req, res) => {
    const { name, email, password, faculty } = req.body;
    const errors = validationResult(req)

    //validation to request body params and custom valiadtion in secs
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            //if user exists
            if (user) {
                return res.status(400).json({
                    error: "Email is taken"
                })
            }
        })


        //Generate web Token for allow account activation
        const token = jwt.sign({
            name, email, password, faculty
        }, process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: process.env.JWT_EXPIRATION
            })

        //for sending activation mail
        const transporter = nodeMailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Account Activation",
            html: `
            <h1> Please click the following link to activate your account</h1>
            <a href="${process.env.CLIENT_URL}/users/activate/${token}">Activate your account</a>
            <hr/>
            <p>This email contains <i><strong>sensitive</strong></i> information</p>
            `
        }
        transporter.sendMail(mailOptions).then(() => {
            return res.json({
                message: `Email has been sent to ${email}`
            })
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })

    }
}

//Activation and save to DB
exports.activationController = (req, res) => {
    const { token } = req.body
    if (token) {
        //verify if token is valid or expired
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    error: "Expired Token Please Register again"
                })
            } else {
                //if valid save to DB
                //get name, email, password, and faculty from token
                const { name, email, password, faculty } = jwt.decode(token)
                const user = new User({
                    name, email, password, faculty
                })
                user.save((err, user) => {
                    if (err) {
                        return res.status(401).json({
                            error: "Account has already been activated"

                            // add user to their faculty 




                        })
                    } else {
                        return res.json({
                            success: true,
                            message: "Registration successful",
                            user
                        })
                    }
                })
            }
        })
    } else {
        return res.json({
            message: "Registration failed. Please Try Again"
        })
    }
}

exports.loginController = (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    //validation to request body params and custom valiadtion in secs
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        //check if user exist
        User.findOne({
            email
        }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User with that email does not exist'
                })
            }
            user.status = 'online';
            user.save()
            //Authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email or Password is incorrect'
                })
            }

            //generate token
            const token = jwt.sign({
                _id: user._id,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
            const { _id, name, email, faculty, role, newMessages } = user
            return res.json({
                token, user: {
                    _id, name, email, faculty, role, newMessages
                }
            })
        })
    }
}


exports.forgotController = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req)

    //validation to request body params and custom valiadtion in secs
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        //find if the user exists
        User.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User does not exist!'
                })
            }
            //if user exists
            //generate token which will expire in 10mins
            const token = jwt.sign({
                _id: user._id
            }, process.env.JWT_RESET_PASSWORD,
                {
                    expiresIn: process.env.JWT_EXPIRATION
                })
            //Send email with this token
            //for sending activation mail
            const transporter = nodeMailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: "Password Reset Link",
                html: `
            <h1> Please click the following link to reset your password</h1>
            <a href="${process.env.CLIENT_URL}/users/password/reset/${token}">Reset your password</a>
            <hr/>
            <p>This email contains <i><strong>sensitive</strong></i> information</p>
            `
            }
            return user.updateOne({
                resetPasswordLink: token
            }, (err, success) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                } else {
                    //send email
                    transporter.sendMail(mailOptions).then(() => {
                        return res.json({
                            message: `Email has been sent to ${email}`
                        })
                    }).catch(err => {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    })
                }
            })

        })
    }
}

exports.resetController = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body
    const errors = validationResult(req)

    //validation to request body params and custom valiadtion in secs
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        if (resetPasswordLink) {
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decode) => {
                if (err) {
                    return res.status(400).json({
                        error: "Expired Link"
                    })
                }

                User.findOne({ resetPasswordLink }, (err, user) => {
                    if (err || !user) {
                        return res.status(400).json({
                            error: "Something went wrong"
                        })
                    }
                    const updatedFields = {
                        password: newPassword,
                        resetPasswordLink: ""
                    }
                    user = _.extend(user, updatedFields)
                    user.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Error reseting user password'
                            })
                        }
                        res.json({
                            message: `You can now login in with your new password`
                        })
                    })
                })
            })
        }
    }
}

exports.updateController = (req, res) => {

    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;
    User.findOne({ _id: userId }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }
        if (password) {
            if (password.length < 8 && !password.match(/\d/)) {
                return res.status(400).json({
                    error: 'Password should be min 8 characters long and contains a number'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hash_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

exports.readController = (req, res) => {
    userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hash_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.roomController = (req, res) => {
    const rooms = ['Engineering', 'Nursing', 'Business', "Arts"]
    res.json(rooms)
}
exports.chatLogoutController = (req, res) => {
    try {
        User.findById({ _id: userId }, (err, user) => {
            user.status = "offline"
            user.newMessages = {};
            user.save()
        })
        // const user = User.findById(_id);
        // user.save();
        res.status(200).send()
    } catch (error) {
        return res.status(400).send();
    }

}