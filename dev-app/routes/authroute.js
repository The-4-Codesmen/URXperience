const express = require('express')
const router = express.Router()

//validation
const {validRegister, 
    validLogin, 
    forgotPasswordValidator, 
    resetPasswordValidator,
    requireSignin} = require('../helpers/valid')





//Load controllers
const{
    registerController,
    activationController,
    loginController,
    forgotController,
    resetController,
    updateController,
    readController
} = require('../controllers/authcontroller.js')

router.post('/register', validRegister, registerController)
router.post('/login', validLogin, loginController)
router.post('/activation', activationController)
router.put('/forgotpassword', forgotPasswordValidator, forgotController)
router.put('/resetpassword', resetPasswordValidator, resetController)
router.get('/user/:id', requireSignin, readController)
router.put('/user/update', requireSignin, updateController);

module.exports = router