const express=require('express');
const databaseConnection=require('./config/dbconnect');
const userRoutes=require('./routes/userRoutes');
const Blogroute=require('./routes/blogRoutes');
const cors=require('cors');

const app=express();
app.use(cors({}));
/*
app. use --> It is generally used for introducing middlewares in your application, 
and express.json() is a built-in middleware function in Express.js that parses 
incoming requests with JSON payloads and is based on the body-parser middleware.
*/

app.use(express.json());
app.use("/api/v1",userRoutes);
app.use("/api/v1",Blogroute);

//server creation 
app.listen(3000,()=>{
    console.log("server started");
    databaseConnection();
})
