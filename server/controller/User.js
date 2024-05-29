const userRouter=require('express').Router();
const Contact=require('../models/Contact');
const User = require('../models/User');
const {userVerify} =require('../service/auth')
const LoggedInUser=async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(400).json({message:"invalid token"});
    }
    const user= await userVerify(token);
    if (!user) {
        return res.status(404).json({msg: "invalid user"});
    }
    return user;
}
// route to get details of user with the contacts
// to display on the contact or friends page
userRouter.get('/profile',async(req,res)=>{
    const user=await LoggedInUser(req);
    if(!user)
        res.status(401).json({message:"user not logged in"});
    res.json(user);
})
userRouter.get('/contacts',async(req,res)=>{
    const user=await LoggedInUser(req);
    if(!user)
        res.status(401).json({message:"user not logged in"});
    try{
    const details=await User.findById(user._id).populate('contacts');
    res.json({contactList:details});
    }
    catch(error){
        console.log(error);
    }
})
module.exports=userRouter;