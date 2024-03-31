const User = require('../models/User');

// @desc    Register a user
// @route  POST /api/v1/auth/register
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