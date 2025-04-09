const express = require('express');
const postController = require('../controller/post');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// posts GET
router.get('/posts', isAuth, postController.getPosts);

// post GET
router.get('/post/:postId', isAuth, postController.getPost);

// post POST
router.post('/post', isAuth, postController.postPost);

// post DELETE
router.delete('/post/:postId', isAuth, postController.deletePost);

module.exports = router;