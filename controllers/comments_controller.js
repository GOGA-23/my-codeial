const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require("../mailers/comments_mailer");
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post)
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      // handle error
      post.comments.push(comment);
      post.save();

      comment = await comment.populate('user', 'name email');
      // commentsMailer.newComment(comment)
      let job = queue.create('emails', comment).save((err)=>{
        if(err){
          console.log('error in creating a queue');
          return;
        }
        console.log('job enquired',job.id);
      });


      if (req.xhr) {
        // Similar for comments to fetch the user's id!
        
        
        return res.status(200).json({
          data: {
            comment: comment
          },
          message: "Post created!"
        });
       
      }
      
      req.flash('success', 'Comment published!');
      return res.redirect('/');
    }
  } catch (error) {
    req.flash('error', error);
    return;
  }
}



module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id
          },
          message: "Post deleted"
        });
      }

      req.flash('success', 'Comment deleted by the user');
      return res.redirect('back');
    } else {
      req.flash('success', 'Unauthorized!');
      return res.redirect('back');
    }
  } catch (error) {
    req.flash('error', err);
    return;

  }
}