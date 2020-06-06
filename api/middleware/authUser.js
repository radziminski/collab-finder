const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ status: 'fail', errors: [{ msg: 'Token not defined' }] });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ status: 'fail', errors: [{ msg: 'Token is not valid.' }] });
    }
};
