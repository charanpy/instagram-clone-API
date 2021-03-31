const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync');
const Post = require('../models/Post');
const AppError = require('../utils/appError');
//const getProfileId = require("../utils/profile");

//check post is in db
exports.checkPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not available', 400));
  }
  next();
};

//comment to a post

exports.addComment = catchAsync(async (req, res, next) => {
  const id = req.profile;

  const comment = await Comment.create({
    user: req.user.id,
    profile: id,
    post: req.params.id,
    ...req.body,
  });

  res.status(200).json({
    status: 'success',
    comment,
  });
});

//like comment
exports.likeComment = catchAsync(async (req, res, next) => {
  const id = req.profile;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('Comment not found', 400));
  }

  const checkLike = comment.likes.findIndex(
    (like) => like._id.toString() === id.toString()
  );

  if (checkLike >= 0) {
    comment.likes.splice(checkLike, 1);
    await comment.save();
  } else {
    comment.likes.unshift(id);
    await comment.save();
  }

  res.status(200).json({
    status: 'success',
  });
});

//delete comment

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  return comment.user.toString() === req.user.id.toString()
    ? (await comment.remove(),
      res.json({
        status: 'success',
      }))
    : next(new AppError('You are not authorized to delete this comment', 401));
});
