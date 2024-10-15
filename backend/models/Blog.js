const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
    },
    description:String,
    draft:{
        type:Boolean,
        default:false,
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

    const Blog=mongoose.model("Blog",BlogSchema);

    module.exports=Blog;