const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String , 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    date: {
        type: Date, 
        required: true 
    },
    imageUrl: {
        type: String, 
        required: true
    },
});

module.exports = mongoose.model('Post', postSchema);