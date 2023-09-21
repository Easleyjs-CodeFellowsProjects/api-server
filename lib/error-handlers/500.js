'use strict';

const serverError = (err, req, res, next) => {
    if (err) {
        res.status(err.code).json({ message: err.message });
    } else {
        next();
    }
};

module.exports = serverError;