
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  postId: Number,
  title: String,
  link: String,
  body: String,
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  commentsIds: [Number],
  author: String
});

PostSchema.methods.toJson = function () {
  return {
      postId: this.postId,
      title: this.title,
      link: this.link,
      body: this.body,
      upvotes: this.upvotes,
      downvotes: this.downvotes,
      comments: this.comments,
      author: this.author
  }
}


module.exports = mongoose.model('Post', PostSchema);
