const User = require('../models/userSchema')
const catchAsyncError = require('../middleware/asyncError')
const ErrorHandler = require('../error/ErrorHandler')
const sendToken = require('../utils/jwtToken')

/**
 * resister route
 */
exports.userResister = catchAsyncError(async (req, res, next) => {

    const { firstName, lastName, email, telephone, password, confirmPassword } = req.body

    const name = `${firstName} ${lastName}`

    if (password !== confirmPassword) {
        return next(new ErrorHandler("password & confirm password not match"))
    }

    const user = await User.create({
        name,
        email,
        telephone,
        password
    });

    sendToken(user, 200, res)

})


/**
 * Login Route
 */
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("please complete all fields", 400));
    }


    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid Email & Password"))
    }

    const isPasswordMatch = await user.camparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email & Password"))
    }

    sendToken(user, 200, res)

})

/**
 * Logout Route
 */
exports.logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
})


//getUserDetails
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });

})

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.camparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});


// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

// Admin Login Route

exports.AdminLogin = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    const user = await User.findOne({ email: email }).select("+password")



    if(!user){
        return next(
            new ErrorHandler(`You are not a admin. please leave now.`, 404)
        );
    }

    if (user._doc.role !== 'admin') {
        return next(
            new ErrorHandler(`You are not a admin. please leave now.`, 404)
        );
    }

    if(password !== user.password){
        return next(
            new ErrorHandler(`Invalid cradintial.`, 404)
        );
    }

        sendToken(user, 200, res);

})

/**
 * Logout Route Admin
 */
exports.AdminLogout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
})