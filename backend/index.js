const express = require('express');
const app = express();
const User = require('./models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:27017/student_webbook');

app.set('view engine','ejs');
app.set('views','views');


const requireLogin = (req,res,next)=>{
    if(!req.session.user_id)
        return res.redirect('/login')
    next();
}
app.use(session({secret:'notagoodsecret'}))
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send("hey there!")
})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register', async(req,res)=>{
    const {password,username,regno} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        regno,
        password:hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/');
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async (req,res)=>{
    const {regno,password} = req.body;
    const user = await User.findAndValidate(regno,password);
    
    if(user){
        req.session.user_id = user._id;
        res.redirect('/secret');
    }
    else
        res.render("login");
})
app.post('/logout',(req,res)=>{
    req.session.user_id = null;
    res.redirect('login');
})
app.get('/secret',requireLogin,(req,res)=>{
        
        res.render('secret')
})

app.listen(3000,()=>{
    console.log("Running on port 3000")
})