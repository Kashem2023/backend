const ErrorHandler = require('../error/ErrorHandler')
const catchAsyncError = require('./asyncError')
const jwt = require("jsonwebtoken");
const User = require('../models/userSchema')

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const token = req.headers.authorization


    if (!token) {
        return next(new ErrorHandler("please login to access this page", 401))
    }

    const decodedData = jwt.verify(token, 'process.env.JWT_SECRET');

    req.user = await User.findById(decodedData.id);

    next();

})

