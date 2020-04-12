const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

// @desc      Render login
// @route     GET /login
// @access    Public
exports.login = (req, res, next) => {
    res.render('login', { title: 'login' });
};


// @desc      Login user
// @route     POST /login
// @access    Public
exports.postLogin =
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });


// @desc      Render signup
// @route     GET /signup
// @access    Public
exports.signup = (req, res, next) => {
    res.render('signup', { title: 'signup' });
};


// @desc      SIGNUP user
// @route     POST /signup
// @access    Public
exports.postSignup = async(req, res, next) => {

    const errors = validationResult(req);

    const { name, email, password, confirmPassword } = req.body;

    if (!errors.isEmpty()) {
        return res.render('signup', {
            name,
            email,
            errorsMessage: errors.array()
        });
    }

    let user = new User({
        name,
        email,
        password,
        confirmPassword
    });

    user.save();

    res.redirect('/auth/login');
};

// @desc      GET logout
// @route     GET /logout
// @access    Private
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};