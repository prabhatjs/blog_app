const express=require('express');
const {createuser,getallusers,getuserbyId,updateuser,deleteuser,login}=require('../controller/UserController')
const {}=require('../controller/UserController')

const userRoutes=express.Router();
userRoutes.post("/users",createuser);
//get all users route
 userRoutes.get("/users",getallusers);
//get one user
userRoutes.get("/users/:id",getuserbyId)
userRoutes.patch("/users/:id",updateuser)
userRoutes.delete("/users/:id",deleteuser)
userRoutes.post('/login',login);

module.exports=userRoutes;