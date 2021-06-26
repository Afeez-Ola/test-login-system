// jshint esversion:6
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
app.use('/', indexRoute);
app.use('/users', userRoute);

mongoose.connect(process.env.Mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Server connected to Database 🚀🚀`);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is live on PORT: ${PORT}`);
});