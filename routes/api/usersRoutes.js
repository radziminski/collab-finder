const express = require('express');
const userController = require('../../controllers/userController');
const authUser = require('../../middleware/authUser');

const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router
    .route('/')
    .post(userController.registerUserValidator, userController.registerUser)
    .patch(authUser)
    .delete(authUser);

module.exports = router;
