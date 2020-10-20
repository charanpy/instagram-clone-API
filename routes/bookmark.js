const express = require("express");
const router = express.Router();

const { protect } = require("../controllers/authController")
const {
            saveBookmark,
            deleteBookmark,
            deleteAll,
            getSavedPosts

} = require("../controllers/bookmarkController")

router.route("/:id")

            .post(protect, saveBookmark)
            .delete(protect, deleteBookmark)

router.route("/")
            .delete(deleteAll)
            .get(protect, getSavedPosts)

module.exports = router;
