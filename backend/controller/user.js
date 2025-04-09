const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.postRegister = async (req, res, next) => {
    const {password,username,regno,department,batch} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        regno,
        password:hashedPassword,
        batch,
        department
    })

    // SAVE
    const result = await user.save();

    res.json({msg: 'Signup Success: ' + result._id});
};

exports.postLogin = async (req, res, next) => {
    const {regno,password} = req.body;
    try{
        const user = await User.findOne({regno: regno});
        if(!user){
            const error = new Error('User not found');
            error.status = 401;
            throw error;
        }        
        const passwordCheck = await bcrypt.compare(password, user.password);
    
        if(!passwordCheck){
            const error = new Error('Incorrect Password');
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({
            regno: regno,
            id: user._id
        }, 
        process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({msg: 'Login Success: ' + user._id, token: token});
    }
    catch(error){
        next(error);
    }
};