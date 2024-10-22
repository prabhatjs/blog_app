const express=require("express");
const {createBlog,getBlog,getBlogs,updateBlog,deleteBlog}= require('../controller/BlogController')
const verifyUser=require('../middleware/auth')
const Blogroute=express.Router();

Blogroute.post('/blogs',verifyUser,createBlog)

Blogroute.get('/blogs',getBlogs)

Blogroute.get('/blogs/:id',getBlog)

Blogroute.patch('/blogs/:id',updateBlog)

Blogroute.delete('/blogs/:id',deleteBlog)

module.exports=Blogroute
