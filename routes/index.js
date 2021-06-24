// jshint esversion:10
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;