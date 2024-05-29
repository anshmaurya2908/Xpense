const contactRouter=require('express').Router();
const Contact=require('../models/Contact');
const User = require('../models/User');
// creating a route that can be used directly in index.js 
// by app.use('/addcontacts',contactRouter); after importing it.
const {userVerify}=require('../service/auth')
//function to add newly saved contactSchema to hte
// contact field of userschema  to provide a ref.
const LoggedInUser=async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(400).json({message:"invalid token"});
    }
    const user= userVerify(token);
    if (!user) {
        return res.status(404).json({msg: "invalid user"});
    }
    return user;
}
const addContactToUserSchema = async (userId, contactData) => {
    const user = await User.findById(userId);
    if (!user) 
      return null;
    // adding savedContact to the list of contacts
    user.contacts=user.contacts.concat(contactData);
    const savedUser=await user.save();
    if(!savedUser)return null;
    return ;
}
const removeContactFromUserSchema = async (userId, contactData) => {
    const user = await User.findById(userId);
    if (!user) 
      return null;
    // removing ContactData From the list of contacts
    user.contacts=user.contacts.filter(contact=>contact._id!=contactData._id);
    const savedUser=await user.save();
    if(!savedUser)return null;
    return ;
}
contactRouter.post('/addcontact',async(req,res)=>{
    const {name,number}=req.body;
    if(!name||!number){
        return res.status(400).send('Please enter all the fields');
    }
    const newContact=new Contact({
        name,
        number
    })
    // adding the new contact to contact schema;
    const savedContact = await newContact.save();
    // update userschema to save the contacts of new user 
    // to add a reference to himself
    // in the user schema add contacts:[contactSchema];
    /* To find userId by token,  then provide it to the next function*/
    const user= await LoggedInUser(req);
    addContactToUserSchema(user._id,savedContact);
    res.status(200).json({success:true,message:"contact added"});
})
contactRouter.post('/removecontact',async(req,res)=>{
    const user=await LoggedInUser(req);
    const {id}=req.body;
    if(!id) res.status(201).json({message:id});
    const deletedContact=await Contact.findByIdAndDelete(id);
    if(!deletedContact) res.status(201).json({message:id});
    removeContactFromUserSchema(user._id,deletedContact);
    res.status(200).json({success:true,message:"contact removed"});
})
module.exports=contactRouter;