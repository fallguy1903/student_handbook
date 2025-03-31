const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session')
const { MongoClient, ServerApiVersion } = require('mongodb');

mongoose.connect('mongodb+srv://harishvijayan2003:fallguy1903@cluster0.mgsf23r.mongodb.net/student_webbook?retryWrites=true&w=majority&appName=Cluster0')
.then((res)=>
    {
        app.listen(3000,()=>{
        console.log("Running on port 3000")
    })}
)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB:', mongoose.connection.host);
    console.log('Using Database:', mongoose.connection.name);
});


app.use(cors({
    origin: 'http://localhost:5173' // 
  }));
  app.use(express.json());

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
    console.log(username)
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        regno,
        password:hash
    })
    await user.save();
    console.log()
    res.json({valid:true})
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async (req,res)=>{
    const {regno,password} = req.body;
    console.log(regno,password)
    const user = await User.findAndValidate(regno,password);
    
    if(user){
        req.session.user_id = user._id;
        res.json({user})
    }
    else
        res.json({user:'null'})
})
app.post('/logout',(req,res)=>{
    req.session.user_id = null;
    res.redirect('login');
})
app.get('/secret',requireLogin,(req,res)=>{
        
        res.render('secret')
})

