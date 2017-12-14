
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  commentId: Number,
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  postId: Number
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

CommentSchema.method.downvote = function(cb) {
  if (this.downvotes > 0)
  {
    this.downvotes -= 1;
    this.save(cb)
  }
}

CommentSchema.methods.toJson = function () {
  return {
      commentId: this.commentId,
      body: this.body,
      author: this.author,
      upvotes: this.upvotes,
      downvotes: this.downvotes,
      comments: this.comments,
      postId: this.postId
  }
}

module.exports = mongoose.model('Comment', CommentSchema);
