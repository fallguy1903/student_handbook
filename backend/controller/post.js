const User = require('../models/user');
const Post = require('../models/post');

exports.postPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title: title, content: content, author: req.userId, date: new Date() });
    await post.save();
    res.status(201).json({msg: "Post Added", post: post});
};
  
exports.getPosts = async (req, res) => {
    const posts = await Post.find().sort({ date: -1 }).populate("author", "username");
    res.json({msg: "Posts retreived", posts: posts});
};

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.postId).populate("author", "username");
    console.log(post, req.params.postId);
    
    res.json({msg: "Post retreived", post: post});
};
