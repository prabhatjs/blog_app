const express=require('express');
const mongoose=require('mongoose');

const app=express();
/*
app. use --> It is generally used for introducing middlewares in your application, 
and express.json() is a built-in middleware function in Express.js that parses 
incoming requests with JSON payloads and is based on the body-parser middleware.
*/
app.use(express.json());

/** Database connection function for mongodb */
async function databaseConnection(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myblogdb');
        console.log('DB connect');
    } catch (error) {
        console.log('error comes from mongodb connection');
        console.log(error);
    }
}

app.listen(3000,()=>{
    console.log("server started");
    databaseConnection();
})