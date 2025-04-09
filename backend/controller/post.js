const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Post = require('../models/post');

exports.postPost = async (req, res) => {
    const { title, content } = req.body;
    if(!req.file){
        const error = new Error('Image not received');
        error.statusCode = 422;
        throw error;
    } 
    const imageUrl = req.file.path.replace("\\" ,"/");
    const post = new Post({ title: title, content: content, author: req.userId, date: new Date(), imageUrl: imageUrl });
    await post.save();
    res.status(201).json({msg: "Post Added", post: post});
};
  
exports.getPosts = async (req, res) => {
    const posts = await Post.find().sort({ date: -1 }).populate("author", "username");
    res.json({msg: "Posts retreived", posts: posts});
};

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.postId).populate("author", "username");
    res.json({msg: "Post retreived", post: post});
};

exports.deletePost = async (req, res, next) => {
    try{
        const postId = req.params.postId;
        const post = await Post.findOne({_id: postId});
        if(!post){
            const error = new Error('Post not found');
            error.status = 404;
            throw error;
        }
        if (post.author._id.toString() !== req.userId) {
            const error = new Error('Not authorized to delete this post');
            error.status = 401;
            throw error;
        }
        deleteImage(post.imageUrl);
        await Post.deleteOne({_id: postId});
        
        res.status(200).json({message: 'Post Deleted'})
    }
    catch(err) {
        next(err);
    }
}

const deleteImage = filePath => {
    fs.unlink(path.join(__dirname, '..', filePath), err => console.log(err));
};
