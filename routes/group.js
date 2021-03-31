const express = require('express');
const router = express.Router();

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

router.route('/:groupId/seen').patch(protect, getProfileId, setSeenMessages);
// router.route('/like/:id').post(protect, likePost);
module.exports = router;
