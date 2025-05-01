const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({ "error": "Access Denied. No token provided" })
    }
    jwt.verify(authHeader, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Forbidden" });

        req.user = decoded; 
        next();
    });
}

module.exports = authenticateToken;