const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({

  content: {
      type: String,
      required: true
  },
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }

},{
  timestamps: true
});

const Post = mongoose.model('post', postScheme);

module.exports = Post;