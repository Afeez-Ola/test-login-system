// jshint esversion:10
const express = require('express');
const route = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});



module.exports = route;