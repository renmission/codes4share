const express = require('express');
const router = express.Router();


const { login, signup, postSignup, postLogin, logout } = require('../controllers/auth');

const { signupValidator } = require('../middleware/validation');

// signup
router
    .route('/signup')
    .get(signup)
    .post(signupValidator, postSignup);

// email login
router
    .route('/login')
    .get(login)
    .post(postLogin);

router.get('/logout', logout)



module.exports = router;