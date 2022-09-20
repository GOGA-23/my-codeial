const mongoose = require('mongoose');

const CommentScheme = new mongoose.Schema({
    content:{
      type: String,
      required: true
    },
    // comments belongs to the user   
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    post : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },

    likes : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Like'
    }]
},{
  timestamps: true
});

const Comment = mongoose.model('Comment', CommentScheme);

module.exports = Comment;