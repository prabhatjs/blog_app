const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config();
//jsonwebtoken has three method decode,sign,verify

//payload we asre pass as an object in generatejwt method
async function generateJWT(payload){
    let token= jwt.sign(payload,"secratekkleyeyey");
    return token;    
}
//verify jwt
async function verifyJwt(token){
    try {
        let data=jwt.verify(token,"secratekkleyeyey");
        return data;
    } catch (error) {
        console.log("Invalid token");
        return false;
    }
}
module.exports={generateJWT,verifyJwt};
