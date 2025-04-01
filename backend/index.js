const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173' 
}));


const generateToken = (user)=>{
    return jwt.sign({id:user._id,regno:user.regno},process.env.JWT_SECRET,{
        expiresIn:'1h',
    })
}

const requireLogin = (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({message:"unauthorized"})
    try{
        const verified_token = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified_token;
        next();
    }
    catch (err){
        res.status(404).json({message:"Forbidden"});
    }
};

mongoose.connect(process.env.MONGO_URI)
.then((res)=>
    {
        app.listen(3000,()=>{
        console.log("Running on port 3000")
    })}
)
.catch(err =>{
    console.log(err);
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB:', mongoose.connection.host);
    console.log('Using Database:', mongoose.connection.name);
});


app.post('/register', async(req,res)=>{
    const {password,username,regno,department,batch} = req.body;
    if (!password || !username || !regno || !batch ||!department) {
         res.status(400).json({ message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ regno });
        if (existingUser) {
            res.status(400).json({ message: 'User with this registration number already exists.' });
        }
    
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        regno,
        password:hash,
        batch,
        department
    })
    await user.save();
    
    res.json({valid:true,message:"User Registerd Successfully",user:{username,regno,batch,department}})
})

app.post('/login',async (req,res)=>{
    const {regno,password} = req.body;
    console.log(regno,password)
    const user = await User.findAndValidate(regno,password);
    
    if(user){
        token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production",  
            sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax"  
        });
        
        
         res.json({message:"login successfull",token,user})
    }
    else
     res.status(400).json({user:'null', message: "Invalid credentials" });
})


app.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});


