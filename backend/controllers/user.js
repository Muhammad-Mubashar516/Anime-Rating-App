const User=require("../models/userModel");
const generateToken=require('../utils/generateToken');
const bcrypt=require("bcrypt");
const path=require("path");
const registerUser=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"please fill all the fields"});

        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(409).json({message:"user with this email already exist"});
        }
        const user=await User.create({
            name,
            email,
            password,
            role
        });
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    }catch(error){
        console.error("Error in registerUser",error);
        res.status(500).json({message:`server error :${error.message}`});
    }
};
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.status(200).json({
                _id:user._id,
                 name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }else{
            res.status(401).json({ message: 'Invalid Email or Password' });
        }
    }catch(error){
         res.status(500).json({ message: 'Server Error' });
    }
};
const logoutUser = (req, res) => {
    // Client-side par token remove ho chuka hoga
    // Hum bas ek success message bhej rahe hain
    res.status(200).json({ message: 'Logged out successfully' });
};
module.exports={
    registerUser,
    loginUser,
     logoutUser
};