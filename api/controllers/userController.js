const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const catchAsync = require('../errors/catchAsync');
const validateReq = require('../utils/validateReq');
const AppError = require('../errors/appError');
const User = require('../models/User');

exports.registerUserValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Please enter the password with 6 or more characters').isLength({ min: 6 }),
];

exports.registerUser = catchAsync(async (req, res, next) => {
    validateReq(req, next);

    const { email, name, password } = req.body;

    // 1) See if user with given email doesnt exist
    let user = await User.findOne({ email });
    if (user) return next(new AppError('User with given email already exists.', 400));

    // 2) Get user avatar from email
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
    });

    user = new User({
        name,
        email,
        avatar,
    });

    // 3) Encrypt the password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // 4) Return JWT
    const payload = {
        user: {
            id: user.id, // mongoose uses abstraction so dont have to use _id
        },
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 60 * 60 * 5 }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ status: 'success', token });
    });
});
