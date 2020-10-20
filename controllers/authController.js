const User = require("../models/User");
const catchAsync = require("../utils/catchAsync")
const { validationResult } = require("express-validator")
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendMail")
const { promisify } = require('util');
const Profile = require("../models/Profile");

//^middlewares
exports.signUpValidations = (req, res, next) => {

            if (
                        req.body.passwordChangedAt ||
                        req.body.passwordResetToken || 
                        req.body.passwordResetExpires
             ) return next(new AppError("This is invalid route for changing password", 400))
            
            next();
}

//Authentication
exports.protect = async (req, res, next) => {
            let token;
            if (
                        req.headers.authorization && 
                        req.headers.authorization.startsWith("Bearer")
            ) {
                        token = req.headers.authorization.split(' ')[1];
            }
            
            if (!token) {
                        return next
                        (
                                    new AppError("You are not logged in.Please login to get access", 401)
                        )
            }
            
            const decoded = await promisify
                                                            (jwt.verify)(token, process.env.JWT_LOGIN_TOKEN);

            const freshUser = await User.findById(decoded.id);
            
            if (!freshUser) {
                        return next
                                    (
                                                new AppError("User does not exist", 401)
                                    )
            }

            req.user = freshUser;
            next();
}

//create profile after login
const createProfile = async (id, email) => {
            const profile = await Profile.findOne(
                        { 
                                    user: id 
                        }
                        )
            
            if (!profile) {
                        const { _id } = await Profile.create(
                                    { user: id, 
                                    username: email
                                     })
                        // await User.findByIdAndUpdate(id, { profile: _id })
                        return _id;
            }
            return profile._id;
}

//~Generate jwt token

const generateToken = (options, secret, expireTime) => {
            return jwt.sign(
                        options,
                        secret,
                        {
                                    expiresIn: expireTime
                        })

}

//register
exports.register = catchAsync(async (req, res, next) => {
            const errors = validationResult(req);

            //^Checking validation errors
            if (!errors.isEmpty()) {
                        return next
                        (
                                    new AppError(errors.array()[0].msg, 400)
                        )
            }

            //^Generating token

            const token = generateToken({
                        email: req.body.email,
                        password: req.body.password
            }, 
            process.env.JWT_SIGNIN_TOKEN, "1d")
            console.log(token);

            const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/confirm/${token}`;

            const message = `Click here to verify your email address  ${resetURL}. `;
            try {
                        await sendEmail(
                                    {
                                    email: req.body.email,
                                    subject: "Account activation link (valid only for 30m)",
                                    message
                        })

                        res.status(200).json({
                                    status: 'success',
                                    message: "Token sent to email"
                        })
            } catch (e) {
                        console.log(e)

                        return next
                        (
                                    new AppError("Error sending email.Try again later", 500)
                        )
            }


})

//Activate account
exports.activateAccount = catchAsync(async (req, res, next) => {
            const token = req.params.token;

            const { 
                        email,
                        password 
            } = await promisify(jwt.verify)(token, process.env.JWT_SIGNIN_TOKEN)

            await User.create({
                        email,
                        password,

            })

            return res.status(201).json({
                        "status": "success",
                        "data": "Verified.Please login"
            })

})

//login
exports.login = catchAsync(async (req, res, next) => {
            const errors = validationResult(req);

            //^Checking validation errors
            if (!errors.isEmpty()) {
                        return next
                        (
                                    new AppError(errors.array()[0].msg, 400)
                        )
            }
            const user = await User.findOne(
                        {
                                     email: req.body.email 
                        }).select("+password");

            if (
                        !user || 
                        !(await user.comparePassword(req.body.password, user.password))
            ) {
                        return next(new AppError("Invalid email or password", 400))
            }
            
            const profile = await createProfile(user._id, user.email)
            
            const token = generateToken({
                        id: user._id

            }, process.env.JWT_LOGIN_TOKEN, "10d")



            res.status(200).json({
                        status: "success",
                        data: {
                                    token,
                                    user: {
                                                _id: user._id,
                                                email: user.email,

                                    },

                        }
            })
})

exports.getUsers = catchAsync(async (req, res, next) => {
            const users = await User.find();
            
            res.status(200).json({
                        data: users.length,
                        users
            })
})


exports.getUser = catchAsync(async (req, res, next) => {
            const users = await User.find({});
            
            res.status(200).json({
                        data: users.length,
                        users
            })
})

exports.getProfileId = async (req, res, next) => {
            const id = await Profile.findOne({ user: req.user.id });

            req.profile = id._id;
            
            next();
}