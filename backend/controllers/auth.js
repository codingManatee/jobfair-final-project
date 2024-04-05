const User = require('../models/User');

// @desc    Register a user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req,res,next) => {
    try {
        const { name , telephone , email , password } = req.body;
        const user = await User.create({
            name,
            telephone,
            email,
            password
        });
        res.status(201).json({SUCCESS: true, user});
        }
    catch(err) {
        res.status(400).json({SUCCESS: false, message: err.message});
        console.log(err);
    }
};

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req,res,next) => {
    try {
        const { email , password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success : false , error : "Please provide email and password"});
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ success : false , error : "No user in database"});
        }
        const isMatch = user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success : false , error : "Password did not match"});
        }
        res.status(200).json({ success : true , message : "Login completed"});
    } catch (err) {
        console.log(err);
    }
}