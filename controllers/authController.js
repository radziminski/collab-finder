const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const catchAsync = require('../errors/catchAsync');
const gravatar = require('gravatar');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

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

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Please enter the password with 6 or more characters').isLength({ min: 6 }),
];

exports.register = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));

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
