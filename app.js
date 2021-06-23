// jshint esversion:6
const express = require('express');

const app = express();

const userRoute = require('./routes/index');
app.use('/', userRoute)


const PORT = process.en.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is live on PORT: ${PORT}`)
});