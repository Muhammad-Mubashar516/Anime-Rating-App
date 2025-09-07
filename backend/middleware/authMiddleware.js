const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(' ')[1];
              console.log("Token received for verification:", token);
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
             const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
             req.user = user;
            next();
        }catch(error){
            console.error(error);
           return res.status(401).json({message:"Not Authorized ,Token failed"});
        }
    }
    if(!token){
        res.status(401).json({message:"NOT Authorized,no token"});
    }
};

module.exports={protect};