const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  register,
  activateAccount,
  signUpValidations,
  login,
  getUsers,
  getUser,
  activate,
  myProfile,
  protect,
  signUpWeb,
} = require('../controllers/authController');

router.route('/').get(getUsers);
//outer.route("/").get(getUser)
router.route('/me').get(protect, myProfile);

router.post(
  '/register',
  signUpValidations,
  [check('email', 'Please enter valid email address').isEmail()],
  register
);

router.post(
  '/activate',
  [
    check('email', 'Please enter valid email address').isEmail(),

    check('password', 'Password should be minimum of 8 characters')
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
  ],
  activate
);

router.post(
  '/confirm/',
  [
    check('Otp', 'Otp should be minimum of 6 number')
      .not()
      .isEmpty()
      .isInt({ min: 6, maz: 6 }),
  ],
  activateAccount
);
router.post(
  '/login',
  [
    check('email', 'Please enter valid email address').isEmail(),
    check('password', 'Password should be minimum of 8 characters')
      .not()
      .isEmpty(),
  ],
  login
);

router.post(
  '/signup',
  [
    check('email', 'Please enter valid email address').isEmail(),

    check('password', 'Password should be minimum of 8 characters')
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
  ],
  signUpWeb
);

module.exports = router;
