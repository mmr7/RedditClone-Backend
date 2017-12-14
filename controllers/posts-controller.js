
PostModal = require('../models/Posts');

exports.getPosts = function (req, res, next) {
    PostModal.find({}, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
}

exports.getSinglePost = function (req, res, next) {
    PostModal.findOne({ 'postId': req.params.postId }, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
}

exports.deleteAllPost = function(req, res, next) {
    PostModal.remove({}, function (err) {
        if (err) return console.error(err);

        res.status(200).json();
    });
}

exports.deleteSinglePost = function(req, res, next) {
    PostModal.remove({ 'postId': req.params.postId }, function (err) {
        if (err) return console.error(err);

        res.status(200).json();
    });
}

exports.createPost = function (req, res, next) {
    let tempEvent = new PostModal({
        postId: req.body.postId,
        commentsIds: req.body.commentsIds,
        title: req.body.title,
        link: req.body.link,
        body: req.body.body,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        author: req.body.author
    })

    tempEvent.save(function (err, obj) {
        if (err) return console.error(err);

        res.status(201).json({
            created: tempEvent.toJson()
        });
    });
}

exports.updatePost = function (req, res, next) {

    let tempEvent = new PostModal({
        postId: req.body.postId,
        commentsIds: req.body.commentsIds,
        title: req.body.title,
        link: req.body.link,
        body: req.body.body,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        author: req.body.author
    })

    PostModal.findOneAndUpdate({ 'postId': req.params.postId }, {
        postId: req.body.postId,
        commentsIds: req.body.commentsIds,
        title: req.body.title,
        link: req.body.link,
        body: req.body.body,
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes,
        author: req.body.author
    }, function (err) {
        if (err) return console.error(err);

        res.status(201).json({
            updated: tempEvent.toJson()
        });
    });
}