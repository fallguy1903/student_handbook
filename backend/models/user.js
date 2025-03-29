const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username cannot be blank']
    },
    regno:{
        type:String,
        required:[true,'register number cannot be blank']
    },
    password:{
        type:String,
        required:[true,'Password cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function(regno,password){
    const userDetail = await this.findOne({regno});
    if (!userDetail) return false;
    const validpassword = await bcrypt.compare(password,userDetail.password)
    return validpassword ? userDetail:false;
}

module.exports = mongoose.model('User',userSchema)