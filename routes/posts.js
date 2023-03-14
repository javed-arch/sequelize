const express = require('express');
const router = express.Router();
const auth  = require('../middleware/auth');

const { getPosts, getPostBySearch, getPost, createPost, updatePost, deletePost, likePost, commentPost } = require('../controllers/posts.js');


router.get('/', auth, getPosts);
router.get('/search', auth, getPostBySearch);
router.get('/:id', auth, getPost);


router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentPost);

module.exports = router;

