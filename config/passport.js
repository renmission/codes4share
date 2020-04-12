const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
        done(err, user);
    });
});

//APP LOGIN
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    User.findOne({ email }).then(user => {
        if (!user) return done(null, false, { errorsMessage: 'Incorrect username or password' });

        bcrypt.compare(password, user.password, (err, matched) => {

            if (err) return err;

            if (matched) {
                return done(null, user);
            } else {
                return done(null, false, { errorsMessage: 'Incorrect username or password' });
            }

        });
    });
}));


module.exports = passport;