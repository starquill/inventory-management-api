const User = require('../models/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

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
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email})
        if(user && (await bcrypt.compare(password,user.password))){
            const token=generateToken(user._id);
            res.status(200).json({
                _id:user._id,
                email:user.email,
                token:token,
            });
        }
        else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

};
const generateToken=(id)=>{
    return (
        {userId:id},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )
}
module.exports={
    registerUser,
    loginUser,
    generateToken
}