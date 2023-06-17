import jwt from "jsonwebtoken";
const mysqlconnection = require("../database");

const checkAuth = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, 'secret');
            req.user = decoded;
            return next()
        } catch (error) {
            const e = new Error("FORBIDDEN");
            return res.status(403).json({ message: e.message });
        }
    }
    if (!token) {
        const error = new Error('Not authenticated')
        res.status(403).json({ message: error.message });
    }
    next();
};

export default checkAuth;