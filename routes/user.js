const express = require("express");
const router = express.Router();
const { check } = require("express-validator")

const { register,
            activateAccount,
            signUpValidations,
            login,
            getUsers,
            getUser
} = require("../controllers/authController")

router.route("/").get(getUsers)
//outer.route("/").get(getUser)


router.post("/register",
            signUpValidations,
            [
                        check("email", "Please enter valid email address").isEmail(),
                        check("password", "password is required").isLength({ min: 8 })
            ], register);

router.post("/confirm/:token", activateAccount)
router.post("/login", [
            check("email", "Please enter valid email address").isEmail(),
            check("password", "password is required").not().isEmpty()
], login)

module.exports = router;