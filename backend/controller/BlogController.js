const Blog=require('../models/Blog');
const User=require('../models/User');

async function createBlog(req,res){
    //creator is id of user which user created blog 
    const {title,description,draft,creator}=req.body;
    try 
    {
        if(!title||!description){
            return res.status(400).json({
                message:"Plase fill all the required fields",
                success:false
            })
        }
        //user id is not found in user db ..
        const finduser=await User.findById(creator);
        if(!finduser){
            return res.status(400).json({
                message:"who are you",
                success:false
        })
        }

        const blog=await Blog.create({
            title,
            description,
            draft,
            creator
        })
        //update user model blog id push in user model blog array...
        await User.findByIdAndUpdate(creator,{$push : {blogs:blog._id}})
       
        return res.status(200).json({
            message:"Blog Created Successfully",
            success:true,
            blog
        })
    } 
    catch (error)
    {
        return res.status(500).json({
            error:error.message
        })
    }

}
async function getBlogs(req,res){
try {
    // The Populate method provided in mongoose ODM (Object Document Model) is used for replacing the specified path in the document of one collection with the actual document from the other collection.
    //1. const getBlogs=await Blog.find({}).populate("creator");
    const getBlogs=await Blog.find({}).populate({
        path:"creator",
        select:"name",

    });
    return res.status(200).json({
        message:"Blog Fetched",
        success:true,
        getBlogs
    })
} catch (error) {
    
}
}
async function getBlog(req,res){

}

async function updateBlog(req,res){

}

async function deleteBlog(req,res){

}

module.exports={createBlog,getBlog,getBlogs,updateBlog,deleteBlog}