const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const sendToken = require("../utils/verifyToken");
const sendEmail = require("../utils/sendEmail");


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {email, name, password} = req.body;
    const user = await User.create({
        email,name,password,
        avatar:{
            public_id:"This is sample id",
            url:"Sample url"
        }
    })
    const token = user.getJWTToken();
    
    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please provide email and password...", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if (!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    
    if (!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);
})

exports.logotUser = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({success:true, message:"Logged out successfully"});
})


exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});
    if (!users){
        res.status(500).json({msg:"Internal Server error"});
    }
    res.status(200).json({users});
})

exports.updateUser = catchAsyncError( async (req, res, next) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate({_id:id}, req.body, {new:true, runValidators:true});
    return res.status(201).json({success:true, user});
})

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete({_id:req.params.id}, {new:true});
    res.status(200).json({user});
})


// forgot password functionality

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});
    if (!user){
        return next(new ErrorHandler("User not found", 404))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is: \n \n ${resetPasswordUrl} \n if you have not requested this email then please ignore it...`;

    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce password recovery",
            message
        })

        res.status(200).json({success:true, message:`Email sent to ${user.email} successfully`})
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
})