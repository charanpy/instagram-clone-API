const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const { getProfileId } = require('../controllers/authController');
const {
  createGroup,
  getGroup,
  createMessage,
  getGroupMessage,
  setSeenMessages,
  getUserGroup,
  getNotifications,
} = require('../controllers/group');

const {messagePhoto} = require('../controllers/profileController');
const { protect } = require('../controllers/authController');

router
.route('/')
.get(protect, getProfileId, getUserGroup)
.post(protect, getProfileId, createGroup);

router.route('/notifications').get(protect, getProfileId, getNotifications);
router.route('/:groupId').get(protect, getProfileId, getGroup);
router
.route('/:groupId/message')
.post(protect, getProfileId, createMessage)
.get(protect, getProfileId, getGroupMessage);

router
.route('/:groupId/message/photo/:to')
.post(protect, upload.single('image'), messagePhoto)


router.route('/:groupId/seen').patch(protect, getProfileId, setSeenMessages);
// router.route('/like/:id').post(protect, likePost);
module.exports = router;
