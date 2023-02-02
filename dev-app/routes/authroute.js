const express = require('express')
const router = express.Router()

//validation
const { validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator,
    requireSignin } = require('../helpers/valid')





//Load controllers
const {
    registerController,
    activationController,
    loginController,
    forgotController,
    resetController,
    updateController,
    readController,
    roomController,
    chatLogoutController,
    addEventController,
    findEventController,
    deleteEventController,
    findEventAllController,
    findEventByIdController,
    findEventforDashboardController
} = require('../controllers/authcontroller.js')

router.post('/register', validRegister, registerController)
router.post('/login', validLogin, loginController)
router.post('/activation', activationController)
router.put('/forgotpassword', forgotPasswordValidator, forgotController)
router.put('/resetpassword', resetPasswordValidator, resetController)
router.get('/user/:id', requireSignin, readController)
router.put('/user/update', requireSignin, updateController);



// event routes
router.post('/postevent',  addEventController)
router.post('/eventfind',  findEventController)
router.post('/eventdelete',  deleteEventController)
router.post('/eventfindbyid',  findEventByIdController)
router.get('/eventfindall',  findEventAllController)
router.get('/dashboardevent',  findEventforDashboardController)


//load rooms
router.get('/rooms', roomController)

router.delete('/logout', chatLogoutController)
module.exports = router