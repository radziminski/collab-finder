const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const catchAsync = require('../errors/catchAsync');
const validateReq = require('../utils/validateReq');

const AppError = require('../errors/appError');
const User = require('../models/User');

exports.getCurrentUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ status: 'succes', data: { user } });
});

exports.loginValidator = [
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Please enter the password').exists(),
];

exports.login = catchAsync(async (req, res, next) => {
    validateReq(req, next);

    const { email, password } = req.body;

    // 1) See if user with given email exists
    let user = await User.findOne({ email });

    // 3) Encrypt the password and compare
    if (!user || !password || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    // 4) Return JWT
    const payload = {
        user: {
            id: user.id, // mongoose uses abstraction so dont have to use _id
        },
    };

    user.password = undefined;
    user.__v = undefined;
    user.createdAt = undefined;

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 60 * 60 * 5 }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ status: 'success', token, data: { user } });
    });
});
