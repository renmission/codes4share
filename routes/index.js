const express = require('express');
const router = express.Router();

const { home, about, contact, login, signup, createContact } = require('../controllers');

const { contactValidator } = require('../middleware/validation');

router.get('/', home);
router.get('/about', about);


router
    .route('/contact')
    .get(contact)
    .post(contactValidator, createContact);

module.exports = router;