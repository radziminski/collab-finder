const { validationResult } = require('express-validator');
const AppError = require('../errors/appError');

const validateReq = (req, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new AppError('Wrong data sent.', 400, errors.array()));
};

module.exports = validateReq;
