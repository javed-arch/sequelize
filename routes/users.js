const express = require('express');
const router = express.Router();
const { userSignin, signUp } = require('../controllers/users');

router.post('/signin', userSignin);
router.post('/signup', signUp);

module.exports = router;