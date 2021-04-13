const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail');
const { promisify } = require('util');
const Profile = require('../models/Profile');
const Otp = require('../models/Otp');
const Notification = require('../models/Notification');

//^middlewares
exports.signUpValidations = (req, res, next) => {
  if (
    req.body.passwordChangedAt ||
    req.body.passwordResetToken ||
    req.body.passwordResetExpires
    )
    return next(
      new AppError('This is invalid route for changing password', 400)
        );

      next();
    };

//Authentication
exports.protect = async (req, res, next) => {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
          ) {
          token = req.headers.authorization.split(' ')[1];
        }
        console.log(2, token);
        if (!token) {
          return next(
            new AppError('You are not logged in.Please login to get access', 401)
            );
        }
        let decoded;
        try {
          decoded = await promisify(jwt.verify)(
            token,
      process.env.JWT_LOGIN_TOKEN
      );
        } catch (e) {
          return next(new AppError('Please login to get access', 401));
        }

        const freshUser = await User.findById(decoded.id);

        if (!freshUser) {
          return next(new AppError('User does not exist', 401));
        }

        req.user = freshUser;

        next();
      };

//create profile after login
const createProfile = async (id, email) => {
  await Profile.updateMany({}, { followers: [], following:{}})

  const profile = await Profile.findOne({
    user: id,
  });
  if (!profile) {
    const name = email.split('@')[0];
    const profile = await Profile.create({
      user: id,
      username: name,
      name,
      email,
    });
    // await User.findByIdAndUpdate(id, { profile: _id })
    return profile;
  }
  return profile;
};

//~Generate jwt token

const generateToken = (options, secret, expireTime) => {
  return jwt.sign(options, secret, {
    expiresIn: expireTime,
  });
};

//register
exports.register = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  //^Checking validation errors
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
}
if (req.body.isAuthenticated) {
  return next(new AppError('Not Authorized', 400));
    }
  //^Generating token
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError('Email already taken', 400));
}

let otpForEmailVerification = parseInt(Math.random() * 1000000);
console.log(otpForEmailVerification);
await Otp.create({
  email: req.body.email,
  OtpInsta: otpForEmailVerification,
});

const message = `Your verification code for Instagram-clone application 
is ${otpForEmailVerification}.
`;
try {
  await sendEmail({
    email: req.body.email,
    subject: 'Email Verification for Instagram clone',
    message,
  });

res.status(200).json({
  status: 'success',
  message: 'Token sent to email',
});
} catch (e) {
  console.log(e);

return next(new AppError('Error sending email.Try again later' + e, 500));
}
});

//Activate account
exports.activateAccount = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  //^Checking validation errors
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
}

const otp = req.body.Otp * 1;

const checkOtpIsValid = await Otp.findOne({
  OtpInsta: otp,
  isAuthenticated: false,
});
if (!checkOtpIsValid) {
  return next(new AppError('Invalid Otp', 400));
}
checkOtpIsValid.isAuthenticated = true;
await checkOtpIsValid.save();
return res.status(200).json({
  status: 'success',
  data: checkOtpIsValid,
});
  // const {
  //      email,
  //      password
  // } = await promisify(jwt.verify)(token, process.env.JWT_SIGNIN_TOKEN)

  // await User.create({
  //      email,
  //      password,

  // })

  // return res.status(201).json({
  //      "status": "success",
  //      "data": "Verified.Please login"
  // })
});

exports.activate = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  //^Checking validation errors
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
}
const isEmailVerified = await Otp.findOne({
  email: req.body.email,
  isAuthenticated: true,
});
console.log(isEmailVerified);
if (!isEmailVerified) {
  return next(new AppError('Email is not verified', 400));
}
await Otp.deleteMany({
  email: req.body.email,
});

await User.create({
  email: req.body.email,
  password: req.body.password,
});

return res.status(201).json({
  status: 'success',
  data: 'Verified.Please login',
});
});

//login
exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  //^Checking validation errors
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
}
const user = await User.findOne({
  email: req.body.email,
}).select('+password');
if (
  !user ||
  !(await user.comparePassword(req.body.password, user.password))
    ) {
    return next(new AppError('Invalid email or password', 400));
}

const profile = await createProfile(user._id, user.email);
const token = generateToken(
{
  id: user._id,
},
    process.env.JWT_LOGIN_TOKEN,
    '1d'
    );

res.status(200).json({
  status: 'success',
  data: {
    token,
    profile,
  },
});
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    data: users.length,
    users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    data: users.length,
    users,
  });
});

exports.getProfileId = async (req, res, next) => {
  const id = await Profile.findOne({ user: req.user.id });

  req.profile = id._id;

  next();
};

exports.myProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) next(new AppError('No user found', 400));
    const notification = await Notification.find({to: profile._id, seen: false})
    res.status(200).json({
      profile,
      notification: notification.length
    });
  });

  exports.signUpWeb = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);

  //^Checking validation errors
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
}

const user = await User.findOne({ email: req.body.email });
if (user) {
  return next(new AppError('Email already taken', 400));
}
await User.create({
  email: req.body.email,
  password: req.body.password,
});

return res.status(201).json({
  status: 'success',
  data: 'Verified.Please login',
});
});
