const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    reply: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
        profiles: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Profile',
        },
        like: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
          },
        ],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// commentSchema.virtual('replies', {
//             ref: 'Reply',
//             localField: '_id',
//             foreignField: 'comment'

// })

commentSchema.pre(/^find/, function (next) {
  this.find()
    .populate('profile')
    .populate({
      path: 'likes',
      select: 'username user name photo _id',
    })
    .populate({
      path: 'reply.like',
      select: 'username user name photo _id',
    })
    .populate('reply.profiles');

  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
