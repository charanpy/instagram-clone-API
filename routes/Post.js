const express = require('express');
const router = express.Router();

const { getProfileId } = require('../controllers/authController');

const { protect } = require('../controllers/authController');
const {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  likePost,
} = require('../controllers/postController');
const upload = require('../utils/multer');

router
  .route('/')
  .get(protect, getProfileId, getAllPost)
  .post(protect, getProfileId, upload.array('image'), createPost);

router.route('/:id').get(getPostById).delete(protect, deletePost);

router.route('/like/:id').post(protect, likePost);
module.exports = router;
