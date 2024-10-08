const express=require('express');
const User=require('../models/User');

const userRoutes=express.Router();

userRoutes.post("/users",async (req,res)=>{
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

//get all users route
userRoutes.get("/users",async (req,res)=>{
    try {//find all user find method use 
        const users=await User.find({});
        //check users are present in db or not
        console.log(users.length);
        if(users.length<=0){
            return res.status(400).json({
                success:false,
                message:"Users are not present in db",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            users
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please Try again"
        });
    }
});

//get one user
userRoutes.get("/users/:id",async(req,res)=>{
   try {
    const id = req.params.id;
    const user = await User.findOne({_id:id});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Users fetched successfully",
        user,
    });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Please Try again",
        error:error.message
    });
   }
})

userRoutes.patch("/users/:id",async (req,res)=>{
    try {
        const id=req.params.id
        const {name}=req.body;
        const updatedUser=await User.findByIdAndUpdate({_id:id},{name: name},{new: true})
        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        console.log(updatedUser);
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please Try again",
            error:error.message
        });
    }
})

userRoutes.delete("/users/:id",async(req,res)=>{
    try {
        const id=req.params.id
        const updatedUser=await User.findByIdAndDelete({_id:id})
        if(!updatedUser){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }
        console.log(updatedUser);
        return res.status(200).json({
            success:true,
            message:"Users deleted successfully",
            updatedUser,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please Try again",
            error:error.message
        });
    }
})

module.exports=userRoutes;