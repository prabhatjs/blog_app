const User=require('../models/User');
const bcrypt=require('bcrypt');
const {generateJWT}=require('../Utils/genrateJwtToken');


//create User----------------------------
async function createuser (req,res)
    {
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
            let salt=await bcrypt.genSalt(10);
            const hashedpassword=await bcrypt.hash(password,salt);
    
            const newUser=await User.create({
                name,
                email,
                password:hashedpassword
            });
            //token generateJWT -------------------------------------------------------------------
           let token= await generateJWT({email:newUser.email,id:newUser._id});

        //create user and send back response,and hide password
            return res.status(200).json({
                success:true,
                message:"User Created successfully",
                Users:{
                    name:newUser.name,
                     email:newUser.email,
                },
                token
            })
        } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Please Try Again',
            error:error.message
        })
    }
}

//login user-----------------------------
async function login(req,res){
    const {password,email}=req.body;
    try {
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please eneter the email"
            })
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please enter the Password"
            })
        }
        const checkUserExist=await User.findOne({email});
        if(!checkUserExist){//user is not found
            return res.status(400).json({
                success:false,
                message:"User is not registerd "
            })
        }
        // if(!(checkUserExist.password==password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Password is wrong"
        //     })
        // }
        let checkpassword=await bcrypt.compare(password,checkUserExist.password)
        console.log(checkpassword);
        if(checkpassword){
        return res.status(200).json({
            success:true,
            message:"User Login",
            checkUserExist
        })}
        else{
            return res.status(400).json({
                success:true,
                message:"Password is incorrect",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Please Try again",
            error:error.message
        });
    }}

//get All users--------------------------    
async function getallusers(req,res){
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
}

//get User By ID--------------------------
async function getuserbyId(req,res){
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
 }

 //Update user----------------------------
 async function updateuser(req,res){
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
}

//delete User-----------------------------
async function deleteuser (req,res){
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
}

module.exports={createuser,getallusers,getuserbyId,updateuser,deleteuser,login} 

/**
 * jwt-json web token
 * ---------------------
 * user1 user2 
 * we have blogs-1,2,3,4
 * i am user 1-
 * 
 * 
 */