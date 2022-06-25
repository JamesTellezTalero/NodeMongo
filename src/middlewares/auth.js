require('dotenv').config({ path: "./process.env" });
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const UserAuth = (req, res, next) => {
    const token = req.cokies.next;
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {}
        })
    }
}

const ValidateErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
        })
    }
    next();
}

module.exports = {
    UserAuth,
    ValidateErrors
}