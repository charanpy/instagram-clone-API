const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  groupType: {
    type: String,
    required: [true, 'Group type is required'],
    enum: ['private', 'public'],
  },
});

GroupSchema.pre(/^find/, function (next) {
  this.find().populate({
    path: 'users',
    select: 'username user name photo _id',
  });
  next();
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
