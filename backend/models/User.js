const mongoose=require('mongoose');
//crate schema of users---------
const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:{
       type:String,
        required:true,
        unique:true,
    }
});

//create model for this schema
const User=mongoose.model("User",userSchema);

module.exports=User;