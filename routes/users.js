// jshint esversion:10
const express = require('express');
const router = express.Router();

const User = require('../model/User');

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});



module.exports = router;