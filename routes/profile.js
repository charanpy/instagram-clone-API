const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController")
const { check } = require("express-validator")
const upload = require("../utils/multer")
const { getProfileId } = require("../controllers/authController")
const { updateProfile,
    getProfileById,
    getProfiles,
    uploadPhoto,
    deletePhoto,
    profileValidations,
    updatePhoto,
    search,
    follow,
    userSettings,
    followRequest,
    acceptRequest,
    getFollowRequest
} = require("../controllers/profileController")

router
.route("/search")
.post(search)

router
.route("/")
.get(getProfiles)
.put([protect, profileValidations], updateProfile)


router
.route("/profile-photo")
.post(protect, upload.single("image"), uploadPhoto)
.put(protect, upload.single("image"), updatePhoto)
.delete(protect, deletePhoto)


router
.route("/:userId")
.get(getProfileById)

router
.route("/follow")
.post(protect, getProfileId, follow)

router
.route("/settings")
.put(protect, userSettings)

router
.route("/request-follow")
           // .post(protect, getProfileId, followRequest)

           router
           .route("/request/accept-request")
           .get(protect, getFollowRequest)
           .post(protect, getProfileId, acceptRequest)
           module.exports = router;
