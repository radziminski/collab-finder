const express = require('express');
const authUser = require('../../middleware/authUser');
const authController = require('../../controllers/authController');
const router = express.Router();

router.route('/').get(authUser, authController.getCurrentUser);

router.route('/login').post(authController.loginValidator, authController.login);

router
    .route('/register')
    .post(authController.registerValidator, authController.register)
    .patch(authUser)
    .delete(authUser);

module.exports = router;
