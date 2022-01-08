const mongoose = require('mongoose');
const Profile = require('./Profile');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
    caption: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    hashtag: Array,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    image: Array,
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

postSchema.virtual('commentsPost', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

postSchema.pre('save', function (next) {
  let caption = this.caption.replace(/\s/g, '');
  console.log(caption);
  let hashTagIndex = caption.indexOf('#');
  if (hashTagIndex === -1) {
    this.hashtag = undefined;
    return next();
  }
  let hashTagSplice = caption.slice(hashTagIndex);
  //let res= hashTagSplice.replace(/#/, '').split('#');

  this.hashtag = hashTagSplice.replace(/#/, '').split('#');
  next();
});

// postSchema.pre("save", async function (next) {
//             const { _id } = await Profile.findOne({ user: this.user });
//             this.profile = _id;
//             next();
// })

postSchema.methods.getProfileId = async function (id) {
  const { _id } = await Profile.findOne({ user: id });
  return _id;
};

//Todo
postSchema.pre(/^find/, function (next) {
  this.find().populate('commentsPost');

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
