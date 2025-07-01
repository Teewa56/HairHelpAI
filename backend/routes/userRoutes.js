const router = require('express').Router();
const { 
    predictSignupInfo,
    saveNLPResultAfterSignUp
} = require('../controller/userController');

router.post('/predict-signup-info', predictSignupInfo);
router.post

module.exports = router;