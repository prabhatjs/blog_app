const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
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

module.exports = databaseConnection;