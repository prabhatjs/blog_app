const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv').config();


const app=express();
app.use(cors({}));
// console.log(app.get("env"));
/*
app. use --> It is generally used for introducing middlewares in your application, 
and express.json() is a built-in middleware function in Express.js that parses 
incoming requests with JSON payloads and is based on the body-parser middleware.
*/
app.use(express.json());
// console.log(process.env);
/** Database connection function for mongodb */
async function databaseConnection(){
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('DB connect');
    } catch (error) {
        console.log('error comes from mongodb connection');
        console.log(error);
    }
}

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

app.post("/users",async (req,res)=>{
    const {name,password,email} = req.body;
    console.log(req.body);
    try {
        //check email password and email 
        if(!name){
            return res.status(400).json({
                success:false,
                message:'Please enter the name'
            })
        }if(!password){
            return res.status(400).json({
                success:false,
                message:'Please enter the password'
            });
        }if(!email){
            return res.status(400).json({
                success:false,
                message:'Please enter the Email'
            });
        }
        //check for email in db or not
        const emailAlreadyexist=await User.findOne({email})
        if(emailAlreadyexist){
            return res.status(400).json({
                success:false,
                message:'user already exist with this email ',
            })
        }

        const newUser=await User.create({
            name,
            email,
            password
        });
        //create user and send back response
        return res.status(200).json({
            success:true,
            message:"User Created successfully",
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Please Try Again',
            error:error.message
        })
    }
});
























































//server creation 
app.listen(3000,()=>{
    console.log("server started");
    databaseConnection();
})
