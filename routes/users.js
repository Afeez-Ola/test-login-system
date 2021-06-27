// jshint esversion:10
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');

const User = require('../model/User');

require('../config/passport')(passport);

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    // console.log(name, email, password, password2);
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all fields.' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match!' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be up to 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    errors.push({ msg: 'Email has been registered by another user' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // console.log(newUser);

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newUser.password, salt, function(err, hash) {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'User is now registered!');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    req.flash('error_msg', 'Email has been registered');
                                    // console.log(err);
                                });

                        });
                    });
                }
            });
    }

});

router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    }

);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out!');
    res.redirect('/users/login');
});


module.exports = router;