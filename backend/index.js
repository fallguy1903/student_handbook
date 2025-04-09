const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/images', express.static(path.join(__dirname, '/images')));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const extn = path.extname(file.originalname);
    if(extn !== '.png' && extn !== '.jpg' && extn !== '.gif' && extn !== '.jpeg') 
        cb(null, false);
    else
        cb(null, true);
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

// Error handler, set error.status = NUM and next(error) in the catch block (you can also throw error in the try block)
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({msg: error.message})
})

app.use(userRoutes);
app.use(postRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(3000);
        console.log('Server running on PORT 3000');
        
    })
    .catch(err => console.log(err));
    