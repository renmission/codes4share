var { check, validationResult } = require('express-validator');

exports.contactValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('message', 'Message is required').not().isEmpty()
];



exports.signupValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password))
]