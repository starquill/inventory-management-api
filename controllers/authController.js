const User = require('../models/User');
const user=require('../models/User');
const bcrypt=require('bcryptjs')

const registerUser= async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email || !password){
        return res.status(400).json({message:'Please provide email and password'});
    }
    const userExists=await User.findOne({email:email});
    if(userExists){
        return res.status(400).json({message:'User already exists'})
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await User.create({
        email:email,
        password:hashedPassword,
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
            message:'User registered successfully'
        });
    }
    else{
        res.status(400).json({ message: 'Invalid user data' });
    }
}catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
const loginUser=async(req,res)=>{
    res.send('login route hit');
};
module.exports={
    registerUser,
    loginUser
}