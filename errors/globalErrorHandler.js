const AppError = require('./appError');
const config = require('config');

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        staus: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        // Operational error, trusted, send message to clinet
        console.log(err);
        res.status(err.statusCode).json({
            staus: err.status,
            errors: [...err.errors],
        });
    } else {
        // Programming or other unknown error, not good, dont leak details
        console.error('ERROR !!!', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const fieldName = err.errmsg.match(/"([A-Z]*||[a-z]*||\s*)*"/g)[0];
    //fieldName = fieldName[0].slice(1, -1);
    const message = `Duplicate field value: ${fieldName}. Please use another value.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please login again.', 401);

const handleJWTExpiredError = () => new AppError('Your login session expired. Please login again.', 401);

module.exports = (err, rew, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err);

    if (config.get('env') === 'dev') {
        sendErrorDev(err, res);
    } else if (config.get('env') === 'prod') {
        let error = { ...err };
        // MongoDB errors:
        // (1) Cast error
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        // (2) Duplicate fields
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        // (3) Validation error
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

        sendErrorProd(error, res);
    }
};
