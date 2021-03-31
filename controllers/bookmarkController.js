const Bookmark = require('../models/Bookmark');
const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');

//save post
exports.saveBookmark = catchAsync(async (req, res, next) => {
  const bookmark = await Bookmark.create({
    user: req.user.id,
    post: req.params.id, //req.body.i,
    ...req.body,
  });
  Bookmark.populate(bookmark, { path: 'post' }, function (err, save) {
    if (err) {
      console.log(err);
    }
  });

  res.status(201).json({
    status: 'success',
    bookmark,
  });
});

exports.deleteBookmark = catchAsync(async (req, res, next) => {
  const bookmark = await Bookmark.deleteOne({
    user: req.user.id,
    post: req.params.id,
  });

  if (!bookmark) {
    return next(new AppError('No posts found', 400));
  }

  res.json({
    message: 'success',
  });
});

exports.deleteAll = catchAsync(async (req, res, next) => {
  const bookmark = await Bookmark.deleteMany({});
  res.json({
    status: 'success',
  });
});

exports.getSavedPosts = catchAsync(async (req, res, next) => {
  const bookmark = await Bookmark.find({
    user: req.user.id,
  });

  res.status(200).json({
    data: bookmark,
  });
});
