const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    feedback: { 
        type: String , 
        required: true 
    },
    date: {
        type: Date, 
        required: true 
    }
});

module.exports = mongoose.model('Feedback', postSchema);