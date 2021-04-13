const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Group = require('../models/Group');
const Message = require('../models/Messages');

exports.createGroup = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return next(new AppError('Please select user', 400));
  }
  const group = await Group.findOne({
    $and: [{ users: { $in: req.profile } }, { users: { $in: userId } }],
  });
  if (group) {
    return next(new AppError('Group already exist', 400));
  }
  const createdGroup = await Group.create({
    users: [req.profile, userId],
    createdBy: req.profile,
    groupType: 'public',
  });
  const newGroup = await createdGroup
    .populate({
      path: 'users',
      select: 'username user name photo _id',
    })
    .execPopulate();
  return res.status(201).json({
    status: 'success',
    createdGroup: newGroup,
  });
});

exports.getGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findOne({
    _id: req.params.groupId,
    users: {
      $in: [req.profile],
    },
  });
  return res.status(200).json({
    status: 'success',
    group,
  });
});

exports.getUserGroup = catchAsync(async (req, res, next) => {
  const groups = await Group.find({
    users: {
      $in: [req.profile],
    },
  });

  return res.status(200).json({
    status: 'success',
    groups,
  });
});

exports.createMessage = catchAsync(async (req, res, next) => {
  const { message, to } = req.body;
  if (!message) {
    return next(new AppError('Message should not empty', 400));
  }
  const newMessage = await Message.create({
    message,
    sender: req.profile,
    groupId: req.params.groupId,
    to,
  });

  const populatedMessage = await newMessage
    .populate({
      path: 'sender',
      select: 'username user name photo _id',
    })
    .execPopulate();
  return res.status(201).json({
    status: 'success',
    message: populatedMessage,
  });
});

exports.getGroupMessage = catchAsync(async (req, res, next) => {
  const isMember = await Group.find({
    _id: req.params.groupId,
    users: {
      $in: [req.profile],
    },
  });
  if (!isMember) {
    return next(new AppError('You are not authorized to view messages', 400));
  }
  const messages = await Message.find({ groupId: req.params.groupId });
  return res.status(200).json({
    status: 'success',
    messages,
  });
});

exports.setSeenMessages = catchAsync(async (req, res, next) => {
  const seen = await Message.updateMany(
    {
      groupId: req.params.groupId,
      to: req.profile,
      seen: { $nin: [req.profile] },
    },
    {
      $push: { seen: req.profile },
    },
    {
      new: true,
    }
  );
  return res.status(200).json({
    status: 'success',
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Message.aggregate([
    { $match: { to: req.profile, seen: { $nin: [req.profile] } } },
    {
      $group: {
        _id: '$groupId',
        message: { $push: '$$ROOT' },
      },
    },
  ]);
  return res.status(200).json({
    notifications,
  });
});
