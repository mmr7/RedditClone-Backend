const authController = require('./controllers/auth-controller');
const postController = require('./controllers/posts-controller');
const commentsController = require('./controllers/comments-controller');
const express = require('express');

module.exports = function (app) {
    // Initializing route groups
    const authRoutes = express.Router();
    const postRoutes = express.Router();
    const commentRoutes = express.Router();
    
    authRoutes.post('/users/register', authController.register);
    authRoutes.post('/users/login', authController.login);

    authRoutes.get('/users', authController.getUsers);
    postRoutes.get('/posts', postController.getPosts);
    postRoutes.get('/posts/:postId', postController.getSinglePost);
    commentRoutes.get('/comments/:postId', commentsController.getAllComments);
    commentRoutes.get('/comments/comment/:commentId', commentsController.getOneComment);

    postRoutes.put('/posts/:postId', postController.updatePost);
    commentRoutes.put('/comments/:commentId', commentsController.updateComment);

    postRoutes.post('/posts', postController.createPost);
    commentRoutes.post('/comments', commentsController.createComment);

    postRoutes.delete('/posts', postController.deleteAllPost);
    postRoutes.delete('/posts/:postId', postController.deleteSinglePost);
    commentRoutes.delete('/comments/post/:postId', commentsController.deleteAllComments);
    commentRoutes.delete('/comments/:commentId', commentsController.deleteSingleComment);


    app.use('/auth', authRoutes);
    app.use('/post', postRoutes);
    app.use('/comment', commentRoutes);
};