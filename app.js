// jshint esversion:6
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(expressLayouts);


const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
app.use('/', indexRoute);
app.use('/users', userRoute);


const PORT = process.en.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is live on PORT: ${PORT}`)
});