const express = require('express');
const authUser = require('../../middleware/authUser');
const authController = require('../../controllers/authController');
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router
    .route('/')
    .get(authUser, authController.getCurrentUser)
    .post(authController.loginValidator, authController.login);

module.exports = router;
