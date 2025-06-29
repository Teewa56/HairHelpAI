const router = require('express').Router();
const { signIn, signUp } = require('../controller/authController');

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;