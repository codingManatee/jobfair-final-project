const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req,res,next) => {
    let token;

    if (req.headers.authorization && req.header.authorization.startsWith('Bearer')) {
        token = req.header.authorization.split(' ')[1];
    }

    if (!token || token == 'null') {
        return res.status(401).json({ success : false , error : "Not authorized to access this route"});
    }

    try {
        const decoded = jwt.verify(token, proccess.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success : false , error : "Not authorized to access this route"});
    }
}

exports.authorization = (... roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success : false , error : `User role ${req.user.role} is not authorized to access this route`});
        }
        next();
    }
}