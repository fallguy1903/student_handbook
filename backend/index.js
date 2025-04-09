const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');

const app = express();

app.use(bodyParser.json());


// CORS Headers set manually without cors package
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  });


// Error handler, set error.status = NUM and next(error) in the catch block (you can also throw error in the try block)
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({msg: error.message})
})

app.use(userRoutes);
// app.use(postRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(3000);
        console.log('Server running on PORT 3000');
        
    })
    .catch(err => console.log(err));
    