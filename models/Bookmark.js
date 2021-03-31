const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Your Collection',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const Bookmark = new mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;
