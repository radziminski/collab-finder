const express = require('express');
const authUser = require('../../middleware/authUser');
const authController = require('../../controllers/authController');
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router
    .route('/login')
    .get(authUser, authController.getCurrentUser)
    .post(authController.loginValidator, authController.login);

// @route   POST api/users
// @desc    Register user
// @access  Public
router
    .route('/register')
    .post(authController.registerValidator, authController.register)
    .patch(authUser)
    .delete(authUser);

module.exports = router;
