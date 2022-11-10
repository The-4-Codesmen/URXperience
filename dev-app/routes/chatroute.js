const express = require('express')
const router = express.Router()

const {

    activationController,
    loginController,
} = require('../controllers/authcontroller.js')

router.get('/', protect, fetchChats);

// group functions
router.post('/chat', activationController, loginController, createchat);
router.post('/group', activationController, loginController, createGroup);
router.post('/group-add', activationController, loginController, addUser);
router.post('/group-remove', activationController, loginController, removeUser);

module.exports = router;
