const User = require('../models/authmodel')

const expressjwt = require('express-jwt')

const{validationResult} = require('express-validator')
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken')
//custom error handler to get usfeul error from database
const{errorHandler} = require('../helpers/dbErrorHandling')


exports.registerController = (req, res) => {
    const{name, email,password} = req.body;
    const errors = validationResult(req)

    //validation to request body params and custom valiadtion in secs
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        })
    }else{
        User.findOne({
            email
        }).exec((err,user)=>{
            //if user exists
            if(user){
                return res.status(400).json({
                    error:"Email is taken"
                })
            }
        })


        //Generate web Token for allow account activation
        const token = jwt.sign({
            name, email, password
        }, process.env.JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: process.env.JWT_EXPIRATION
        })

        //for sending activation mail
        const transporter = nodeMailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth:{
                user:process.env.EMAIL_USERNAME,
                pass:process.env.EMAIL_PASSWORD
            }
        })
    
        const mailOptions = {
            from:process.env.EMAIL_USERNAME,
            to: email,
            subject: "Account Activation",
            html: `
            <h1> Please click the following link to activate your account</h1>
            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
            <hr/>
            <p>This email contains <i><strong>sensitive</strong></i> information</p>
            <p>${process.env.CLIENT_URL}</p>
            `
        }
        transporter.sendMail(mailOptions).then(() => {
            return res.json({
                message:`Email has been sent to ${email}`
            })
        }).catch(err=>{
            return res.status(400).json({
                error:errorHandler(err)
            })
        })

    }
}
