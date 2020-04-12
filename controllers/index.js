const { check, validationResult } = require('express-validator');
const sendmail = require('../utils/sendmail');


exports.home = (req, res, next) => {
    res.render('index', { title: 'Codes4share' });
}

exports.about = (req, res, next) => {
    res.render('about', { title: 'About | Codes4share' });
}

exports.contact = (req, res, next) => {
    res.render('contact', { title: 'Contact | Codes4share' });
}

exports.createContact = async(req, res, next) => {

    const errors = validationResult(req);

    const { name, email, message } = req.body;

    if (!errors.isEmpty()) {
        return res.render('contact', {
            title: 'Codes4Share',
            name,
            email,
            message,
            errorsMessage: errors.array()
        });
    }

    await sendmail(req.body);

    if (!sendmail()) {
        return res.status(400).json({ errorsMessage: errors.array() });
    }

    res.render('thanks', { title: 'Codes4share - a online platform for sharing code.' });
}