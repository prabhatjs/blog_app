const { verifyJwt } = require("../Utils/genrateJwtToken");
const verifyUser=async (req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1];
    console.log("user middleware");
    if(!token){
        return res.status(400).json({
            success:"false",
            message:"Please Sign In"
        });
    }
    try {
        let userinfo=await verifyJwt(token);
        if(!userinfo){
            return res.status(400).json({
                success:"false",
                message:"Please Sign In"
            });
        }
           // console.log(req);
            console.log(userinfo);
            req.user=userinfo.id;
            next();
            console.log(req.user);
        
    } catch (error) {
        
    }
  

}
module.exports=verifyUser;