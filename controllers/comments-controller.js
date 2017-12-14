
const jwt = require('jsonwebtoken'),
crypto = require('crypto'),
CommentsModal = require('../models/Comments'),
config = require('../config/config');

exports.getAllComments = function (req, res, next) {
    CommentsModal.find({'postId': req.params.postId}, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
    }
    
exports.getOneComment = function (req, res, next) {
    CommentsModal.findOne({ 'commentId': req.params.commentId }, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

exports.deleteAllComments = function(req, res, next) {
    CommentsModal.remove({'postId': req.params.postId}, function (err) {
        if (err) return console.error(err);

        res.status(200).json();
    });
}

exports.deleteSingleComment = function(req, res, next) {
    CommentsModal.remove({ 'commentId': req.params.commentId }, function (err) {
        if (err) return console.error(err);

        res.status(200).json();
    });
}


exports.createComment = function (req, res, next) {
    let tempEvent = new CommentsModal({
        commentId: req.body.commentId,
        body: req.body.body,
        author: req.body.author,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        postId: req.body.postId
    })

    tempEvent.save(function (err, obj) {
        if (err) return console.error(err);

        res.status(201).json({
            created: tempEvent.toJson()
        });
    });
}

exports.updateComment = function (req, res, next) {
    
        let tempEvent = new CommentsModal({
            commentId: req.body.commentId,
            body: req.body.body,
            author: req.body.author,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
            postId: req.body.postId
        })
    
        CommentsModal.findOneAndUpdate({ 'commentId': req.params.commentId }, {
            commentId: req.body.commentId,
            body: req.body.body,
            author: req.body.author,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes,
            postId: req.body.postId
        }, function (err) {
            if (err) return console.error(err);
    
            res.status(201).json({
                updated: tempEvent.toJson()
            });
        });
    }