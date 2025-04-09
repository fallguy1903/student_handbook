const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Authenticator Header not set');
        error.statusCode = 401; 
        throw error; 
    }
    // const token = authHeader.split(' ')[1];
    const token = authHeader.split(" ")[1] || req.cookies.token;
    console.log(token);
    
    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        error.message = 'Failed to verify';
        error.status = 500;
        throw error;
    }
    if(!decoded){
        const error = new Error('Not Authenticated');
        error.status = 401;
        throw error;
    }
    req.userId = decoded.id;
    next();
}
