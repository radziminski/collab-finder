class AppError extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.msg = message;
        this.errors = errors || [{ msg: this.message }];

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
